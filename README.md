# GIA Blessed Trucking — website

Marketing site for GIA Blessed Trucking Inc (USDOT 3875433, MC-1420159).
Next.js 16 (App Router, static) + React 19 + Tailwind 3, deployed on Netlify.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
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

Sends through EmailJS from the browser (`src/components/Quote.js`). The
existing template reads `subject`, `email`, `phone_number` and `message`;
every quote field is folded into `message`, and the individual fields are
also sent so the template can be extended. A hidden honeypot field drops
bot submissions.
