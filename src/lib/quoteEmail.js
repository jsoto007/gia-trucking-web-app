// The email a quote request turns into: subject, plain text and HTML.
// Takes data already checked by validateQuote() (src/lib/quote.js). Every
// customer value is HTML-escaped; the HTML is table-based with inline styles
// so it renders the same in Gmail, Apple Mail and Outlook.

const C = {
  ink: "#0B1426",
  inkDeep: "#070D1A",
  sun: "#F28C28",
  sunText: "#9C5310",
  sand: "#F5EFE5",
  sandLight: "#FBF8F3",
  line: "#E9DFCF",
  steel: "#5E6B85",
  steelLight: "#B7C1D3",
  white: "#FFFFFF",
};
const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

const firstName = (name) => (name.split(/\s+/)[0] || "the customer").slice(0, 24);

/** "2026-11-10" → "Tue, Nov 10, 2026" (no time zone shift). */
export function formatReadyDate(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(Date.UTC(y, m - 1, d)));
}

/** When the request came in, in the shop's zone (New Jersey). */
export function formatReceived(date) {
  const s = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
  return `${s} ET`;
}

/** A dialable tel: target, or "" if the number is too short to be real. */
export function telHref(phone) {
  const digits = phone.replace(/[^\d+]/g, "");
  return digits.replace(/\D/g, "").length >= 7 ? `tel:${digits}` : "";
}

export function quoteSubject(d) {
  const who = d.company ? `${d.name} (${d.company})` : d.name;
  return `Quote request: ${d.pickup} → ${d.delivery} · ${who}`;
}

function replyHref(d) {
  const subject = `Re: your quote request, ${d.pickup} → ${d.delivery}`;
  return `mailto:${d.email}?subject=${encodeURIComponent(subject)}`;
}

export function quoteText(d, { receivedAt = new Date(), site = "giablessedtrucking.com" } = {}) {
  const ready = formatReadyDate(d.date);
  const row = (k, v) => `${`${k}:`.padEnd(10)}${v}`;
  return [
    "NEW QUOTE REQUEST",
    `${d.pickup} → ${d.delivery}`,
    [d.freight, ready && `Ready ${ready}`].filter(Boolean).join(" · "),
    "",
    "CUSTOMER",
    d.company ? `${d.name}, ${d.company}` : d.name,
    d.phone,
    d.email,
    "",
    "SHIPMENT",
    row("Pickup", d.pickup),
    row("Delivery", d.delivery),
    row("Freight", d.freight),
    row("Ready", ready || "Not given"),
    "",
    "NOTES",
    d.details || "No extra details.",
    "",
    "--",
    `Received ${formatReceived(receivedAt)} from the quote form on ${site}.`,
    `Reply to this email to answer ${firstName(d.name)} directly.`,
  ].join("\n");
}

function sectionLabel(text) {
  return `<p style="margin:0 0 10px;font:700 11px/1.4 ${FONT};letter-spacing:1.6px;text-transform:uppercase;color:${C.sunText};">${text}</p>`;
}

function rows(pairs) {
  return pairs
    .map(
      ([k, v], i) => `<tr>
        <td style="padding:10px 0;${i ? `border-top:1px solid ${C.line};` : ""}width:110px;vertical-align:top;font:13px/1.5 ${FONT};color:${C.steel};">${k}</td>
        <td style="padding:10px 0;${i ? `border-top:1px solid ${C.line};` : ""}vertical-align:top;font:600 15px/1.5 ${FONT};color:${C.ink};">${v}</td>
      </tr>`,
    )
    .join("");
}

// Left-aligned tables sit side by side and wrap onto a new line on phones.
function button(href, label, primary) {
  const bg = primary ? C.sun : C.white;
  const border = primary ? C.sun : C.ink;
  return `<table role="presentation" align="left" cellpadding="0" cellspacing="0" border="0" style="margin:0 10px 10px 0;"><tr>
      <td style="border-radius:999px;background:${bg};border:2px solid ${border};">
        <a href="${esc(href)}" style="display:inline-block;padding:11px 22px;font:700 14px/1.2 ${FONT};color:${C.inkDeep};text-decoration:none;white-space:nowrap;border-radius:999px;">${label}</a>
      </td>
    </tr></table>`;
}

export function quoteHtml(d, { receivedAt = new Date(), site = "giablessedtrucking.com" } = {}) {
  const ready = formatReadyDate(d.date);
  const tel = telHref(d.phone);
  const link = (href, text) => `<a href="${esc(href)}" style="color:${C.ink};text-decoration:underline;">${esc(text)}</a>`;
  const meta = [esc(d.freight), ready && `Ready ${esc(ready)}`].filter(Boolean).join(" &nbsp;·&nbsp; ");
  const preheader = `${d.name}${d.company ? `, ${d.company}` : ""} · ${d.freight}${ready ? ` · ready ${ready}` : ""}`;
  const notes = d.details
    ? esc(d.details).replace(/\r?\n/g, "<br>")
    : `<span style="color:${C.steel};">No extra details.</span>`;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${esc(quoteSubject(d))}</title>
</head>
<body style="margin:0;padding:0;background:${C.sand};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${C.sand};">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.sand};">
<tr><td align="center" style="padding:28px 12px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;">

    <tr><td style="background:${C.ink};border-radius:16px 16px 0 0;padding:22px 28px 0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
        <td style="font:800 13px/1.3 ${FONT};letter-spacing:2px;color:${C.sandLight};">GIA BLESSED<br><span style="font-weight:600;font-size:10px;letter-spacing:2.6px;color:${C.steelLight};">TRUCKING INC</span></td>
        <td align="right" style="vertical-align:top;">
          <span style="display:inline-block;padding:6px 12px;border-radius:999px;background:${C.sun};font:800 11px/1 ${FONT};letter-spacing:1.4px;color:${C.inkDeep};">NEW QUOTE REQUEST</span>
        </td>
      </tr></table>
      <p style="margin:26px 0 0;font:800 26px/1.25 ${FONT};color:${C.white};">${esc(d.pickup)} <span style="color:${C.sun};">&rarr;</span> ${esc(d.delivery)}</p>
      <p style="margin:10px 0 0;padding-bottom:26px;font:15px/1.5 ${FONT};color:${C.steelLight};">${meta}</p>
    </td></tr>
    <tr><td style="background:${C.sun};height:4px;line-height:4px;font-size:0;">&nbsp;</td></tr>

    <tr><td style="background:${C.white};border-radius:0 0 16px 16px;padding:26px 28px 28px;">
      ${button(replyHref(d), `Reply to ${esc(firstName(d.name))}`, true)}
      ${tel ? button(tel, `Call ${esc(d.phone)}`, false) : ""}
      <div style="clear:both;height:8px;line-height:8px;font-size:0;">&nbsp;</div>

      <div style="height:10px;line-height:10px;font-size:0;">&nbsp;</div>
      ${sectionLabel("Customer")}
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${rows([
        ["Name", esc(d.name)],
        ...(d.company ? [["Company", esc(d.company)]] : []),
        ["Phone", tel ? link(tel, d.phone) : esc(d.phone)],
        ["Email", link(`mailto:${d.email}`, d.email)],
      ])}</table>

      <div style="height:24px;line-height:24px;font-size:0;">&nbsp;</div>
      ${sectionLabel("Shipment")}
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${rows([
        ["Pickup", esc(d.pickup)],
        ["Delivery", esc(d.delivery)],
        ["Freight", esc(d.freight)],
        ["Ready date", ready ? esc(ready) : `<span style="font-weight:400;color:${C.steel};">Not given</span>`],
      ])}</table>

      <div style="height:24px;line-height:24px;font-size:0;">&nbsp;</div>
      ${sectionLabel("Notes")}
      <div style="background:${C.sandLight};border-left:3px solid ${C.sun};border-radius:0 8px 8px 0;padding:14px 16px;font:15px/1.6 ${FONT};color:${C.ink};">${notes}</div>
    </td></tr>

    <tr><td style="padding:18px 28px 0;font:12px/1.6 ${FONT};color:${C.steel};text-align:center;">
      Received ${esc(formatReceived(receivedAt))} from the quote form on ${esc(site)}.<br>
      Replying to this email goes straight to ${esc(firstName(d.name))}.
    </td></tr>

  </table>
</td></tr>
</table>
</body>
</html>`;
}

export function quoteEmail(d, opts) {
  return { subject: quoteSubject(d), text: quoteText(d, opts), html: quoteHtml(d, opts) };
}
