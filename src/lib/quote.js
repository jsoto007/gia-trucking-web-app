// Quote request rules, shared by the form (Quote.js) and the server route
// (app/api/quote/route.js). Pure functions, no imports, so `node --test` can
// load them directly.

export const freightTypes = ["Full truckload (general freight)", "Intermodal container", "Not sure yet"];

// Field → max length. Anything not listed here is ignored.
const LIMITS = {
  name: 100,
  company: 120,
  email: 200,
  phone: 40,
  pickup: 120,
  delivery: 120,
  freight: 60,
  date: 10,
  details: 4000,
};
const REQUIRED = ["name", "email", "phone", "pickup", "delivery", "freight"];
const EMAIL = /^[^\s@<>()",;]+@[^\s@<>()",;]+\.[^\s@<>()",;]+$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;

// Single-line fields end up in the subject and headers: no line breaks.
const oneLine = (s) => s.replace(/[\r\n\t]+/g, " ").trim();

/**
 * Validate a raw quote payload.
 * Returns { ok: true, data } with trimmed strings, or { ok: false, errors }.
 * `spam: true` means the honeypot was filled: accept quietly, send nothing.
 */
export function validateQuote(input) {
  if (!input || typeof input !== "object") return { ok: false, errors: { form: "invalid" } };
  if (typeof input.website === "string" && input.website.trim() !== "") return { ok: true, spam: true };

  const data = {};
  const errors = {};
  for (const [field, max] of Object.entries(LIMITS)) {
    const raw = input[field];
    if (raw != null && typeof raw !== "string") {
      errors[field] = "invalid";
      continue;
    }
    const value = field === "details" ? (raw ?? "").trim() : oneLine(raw ?? "");
    if (value.length > max) errors[field] = "too_long";
    data[field] = value;
  }
  for (const field of REQUIRED) {
    if (!errors[field] && !data[field]) errors[field] = "required";
  }
  if (!errors.email && data.email && !EMAIL.test(data.email)) errors.email = "invalid";
  if (!errors.freight && data.freight && !freightTypes.includes(data.freight)) errors.freight = "invalid";
  if (!errors.date && data.date && !DATE.test(data.date)) errors.date = "invalid";

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data };
}

export function quoteSubject(d) {
  return `Quote request: ${d.pickup} → ${d.delivery}`;
}

export function buildMessage(d) {
  return [
    `Name: ${d.name}`,
    d.company ? `Company: ${d.company}` : null,
    `Phone: ${d.phone}`,
    `Email: ${d.email}`,
    `Freight: ${d.freight}`,
    `Pickup: ${d.pickup}`,
    `Delivery: ${d.delivery}`,
    d.date ? `Ready date: ${d.date}` : null,
    "",
    d.details || "(no extra details)",
  ]
    .filter((line) => line !== null)
    .join("\n");
}
