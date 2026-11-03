import { buildMessage, quoteSubject, validateQuote } from "@/lib/quote";

// Sends quote requests through Mailgun. The API key and the recipient live only
// in server env vars (see README), so the browser never sees either.
//   MAILGUN_API_KEY   sending key for MAILGUN_DOMAIN
//   MAILGUN_DOMAIN    e.g. mail.sotodev.com
//   MAILGUN_REGION    "us" (default) or "eu"
//   MAILGUN_FROM      optional, defaults to "GIA Quote Form <quotes@MAILGUN_DOMAIN>"
//   QUOTE_TO          who receives the requests
//   MAILGUN_TEST_MODE "yes" → Mailgun accepts the message but never delivers it

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY = 16_000;

const json = (body, status = 200) => Response.json(body, { status });

export async function POST(request) {
  // Browsers always send Origin on a fetch POST; refuse other sites' pages.
  const origin = request.headers.get("origin");
  if (origin) {
    let sameSite = false;
    try {
      sameSite = new URL(origin).host === request.headers.get("host");
    } catch {}
    if (!sameSite) return json({ ok: false, error: "forbidden" }, 403);
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY) return json({ ok: false, error: "too_large" }, 413);
  let input;
  try {
    input = JSON.parse(raw);
  } catch {
    return json({ ok: false, error: "invalid" }, 400);
  }

  const result = validateQuote(input);
  if (!result.ok) return json({ ok: false, error: "invalid", fields: result.errors }, 400);
  if (result.spam) return json({ ok: true });

  const { MAILGUN_API_KEY, MAILGUN_DOMAIN, MAILGUN_REGION, MAILGUN_FROM, QUOTE_TO, MAILGUN_TEST_MODE } = process.env;
  if (!MAILGUN_API_KEY || !MAILGUN_DOMAIN || !QUOTE_TO) {
    console.error("quote: Mailgun is not configured (MAILGUN_API_KEY, MAILGUN_DOMAIN, QUOTE_TO)");
    return json({ ok: false, error: "unavailable" }, 503);
  }

  const d = result.data;
  const form = new URLSearchParams({
    from: MAILGUN_FROM || `GIA Quote Form <quotes@${MAILGUN_DOMAIN}>`,
    to: QUOTE_TO,
    subject: quoteSubject(d),
    text: buildMessage(d),
    "h:Reply-To": d.name ? `${d.name.replace(/["<>]/g, "")} <${d.email}>` : d.email,
  });
  if (MAILGUN_TEST_MODE === "yes") form.set("o:testmode", "yes");

  const host = MAILGUN_REGION === "eu" ? "api.eu.mailgun.net" : "api.mailgun.net";
  try {
    const res = await fetch(`https://${host}/v3/${MAILGUN_DOMAIN}/messages`, {
      method: "POST",
      headers: { Authorization: `Basic ${Buffer.from(`api:${MAILGUN_API_KEY}`).toString("base64")}` },
      body: form,
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error(`quote: Mailgun responded ${res.status}`);
      return json({ ok: false, error: "send_failed" }, 502);
    }
  } catch (err) {
    console.error(`quote: Mailgun request failed (${err.name})`);
    return json({ ok: false, error: "send_failed" }, 502);
  }
  return json({ ok: true });
}
