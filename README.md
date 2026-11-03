# GIA Blessed Trucking — website

Marketing site for GIA Blessed Trucking Inc (USDOT 3875433, MC-1420159).
Next.js 16 (App Router; static pages plus one server route) + React 19 +
Tailwind 3, deployed on Netlify.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm test         # node --test (quote validation)
npm run build && npm start
```

Node 22 (`.nvmrc`); Next 16 needs Node ≥ 20.9.

## Where things live

- `src/content/site.js` — every business fact and all section copy. Authority,
  cargo and operation must match the FMCSA SAFER record for USDOT 3875433.
- `src/components/` — `Header`, `Hero`, `Sections` (statement, services,
  process, about, credentials), `Quote` (form), `Footer`.
- `tailwind.config.js` — brand palette (`ink` navy, `sun` orange, `sand`),
  taken from the logo. `sun-700` is the orange for small text on light
  backgrounds (AA contrast).
- `public/icon.svg` — favicon; same drawing as `SunMark` in `Icons.js`.
- `public/og.jpg` — social share image (crop of `giaBlueTruck.jpeg` that
  leaves out the door decal).

## Quote form

The form (`src/components/Quote.js`) posts JSON to `POST /api/quote`
(`src/app/api/quote/route.js`), which Netlify runs as a function. The route
checks the request comes from this site, validates it with
`src/lib/quote.js` (same rules the form uses), and sends a plain-text email
through Mailgun with Reply-To set to the customer. A hidden honeypot field is
accepted quietly and sends nothing.

Set these in Netlify → Project configuration → Environment variables
(Functions scope), and in `.env.local` for local runs (gitignored):

| Variable | Value |
|---|---|
| `MAILGUN_API_KEY` | a sending key for the domain below (secret) |
| `MAILGUN_DOMAIN` | e.g. `mail.sotodev.com` |
| `MAILGUN_REGION` | `us` (default) or `eu` |
| `MAILGUN_FROM` | optional; default `GIA Quote Form <quotes@MAILGUN_DOMAIN>` |
| `QUOTE_TO` | who receives the requests |
| `MAILGUN_TEST_MODE` | `yes` makes Mailgun accept but not deliver (local testing) |

If `MAILGUN_API_KEY`, `MAILGUN_DOMAIN` or `QUOTE_TO` is missing the route returns
503 and the form shows the call/email fallback.
