import assert from "node:assert/strict";
import { test } from "node:test";
import { buildMessage, freightTypes, quoteSubject, validateQuote } from "./quote.js";

const good = {
  name: "Dana Ruiz",
  company: "Acme Foods",
  email: "dana@acme.example",
  phone: "(973) 555-0100",
  pickup: "Newark, NJ",
  delivery: "Atlanta, GA",
  freight: freightTypes[0],
  date: "2026-11-10",
  details: "22 pallets\n38,000 lb",
  website: "",
};

test("accepts a complete request and trims it", () => {
  const r = validateQuote({ ...good, name: "  Dana Ruiz  " });
  assert.equal(r.ok, true);
  assert.equal(r.spam, undefined);
  assert.equal(r.data.name, "Dana Ruiz");
  assert.equal(r.data.details, "22 pallets\n38,000 lb");
});

test("optional fields may be empty", () => {
  const r = validateQuote({ ...good, company: "", date: "", details: "" });
  assert.equal(r.ok, true);
});

test("a filled honeypot is accepted as spam and carries no data", () => {
  const r = validateQuote({ ...good, website: "http://spam.example" });
  assert.deepEqual(r, { ok: true, spam: true });
});

test("required fields are enforced", () => {
  const r = validateQuote({ ...good, name: " ", pickup: undefined });
  assert.equal(r.ok, false);
  assert.equal(r.errors.name, "required");
  assert.equal(r.errors.pickup, "required");
});

test("rejects bad email, freight, date and non-string values", () => {
  const r = validateQuote({ ...good, email: "dana@", freight: "Hazmat", date: "11/10/2026", phone: 9735550100 });
  assert.equal(r.errors.email, "invalid");
  assert.equal(r.errors.freight, "invalid");
  assert.equal(r.errors.date, "invalid");
  assert.equal(r.errors.phone, "invalid");
});

test("rejects an email with header-breaking characters", () => {
  assert.equal(validateQuote({ ...good, email: "a@b.com>, x@y.com" }).ok, false);
  assert.equal(validateQuote({ ...good, email: "a@b.com\nBcc: x@y.com" }).ok, false);
});

test("caps field lengths", () => {
  const r = validateQuote({ ...good, details: "x".repeat(4001), name: "n".repeat(101) });
  assert.equal(r.errors.details, "too_long");
  assert.equal(r.errors.name, "too_long");
});

test("line breaks never reach the subject", () => {
  const r = validateQuote({ ...good, pickup: "Newark\r\nBcc: x@y.com", delivery: "Atlanta" });
  assert.equal(r.ok, true);
  assert.equal(quoteSubject(r.data).includes("\n"), false);
  assert.equal(quoteSubject(r.data), "Quote request: Newark Bcc: x@y.com → Atlanta");
});

test("rejects non-object payloads", () => {
  assert.equal(validateQuote(null).ok, false);
  assert.equal(validateQuote("hi").ok, false);
});

test("message lists every field and skips empty optionals", () => {
  const msg = buildMessage(validateQuote({ ...good, company: "", date: "" }).data);
  assert.match(msg, /^Name: Dana Ruiz\nPhone: \(973\) 555-0100\nEmail: dana@acme\.example\n/);
  assert.doesNotMatch(msg, /Company:|Ready date:/);
  assert.match(msg, /\n\n22 pallets\n38,000 lb$/);
});
