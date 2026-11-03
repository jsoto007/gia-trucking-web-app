import assert from "node:assert/strict";
import { test } from "node:test";
import { freightTypes, validateQuote } from "./quote.js";
import { formatReadyDate, formatReceived, quoteEmail, quoteSubject, telHref } from "./quoteEmail.js";

const data = (over = {}) =>
  validateQuote({
    name: "Dana Ruiz",
    company: "Acme Foods",
    email: "dana@acme.example",
    phone: "(973) 555-0100",
    pickup: "Newark, NJ",
    delivery: "Atlanta, GA",
    freight: freightTypes[0],
    date: "2026-11-10",
    details: "22 pallets\n38,000 lb",
    ...over,
  }).data;

// 15:29 UTC on Nov 3 2026 is 10:29 in New York (EST).
const receivedAt = new Date("2026-11-03T15:29:00Z");

test("subject names the lane and who asked", () => {
  assert.equal(quoteSubject(data()), "Quote request: Newark, NJ → Atlanta, GA · Dana Ruiz (Acme Foods)");
  assert.equal(quoteSubject(data({ company: "" })), "Quote request: Newark, NJ → Atlanta, GA · Dana Ruiz");
});

test("dates read like a person wrote them", () => {
  assert.equal(formatReadyDate("2026-11-10"), "Tue, Nov 10, 2026");
  assert.equal(formatReadyDate(""), "");
  assert.equal(formatReceived(receivedAt), "Tue, Nov 3, 2026, 10:29 AM ET");
});

test("tel links keep only dialable characters", () => {
  assert.equal(telHref("(973) 555-0100"), "tel:9735550100");
  assert.equal(telHref("+1 973.555.0100 ext"), "tel:+19735550100");
  assert.equal(telHref("12"), "");
});

test("plain text has every section", () => {
  const { text } = quoteEmail(data(), { receivedAt });
  for (const part of [
    "NEW QUOTE REQUEST",
    "Newark, NJ → Atlanta, GA",
    "Full truckload (general freight) · Ready Tue, Nov 10, 2026",
    "Dana Ruiz, Acme Foods",
    "Pickup:   Newark, NJ",
    "22 pallets\n38,000 lb",
    "Received Tue, Nov 3, 2026, 10:29 AM ET",
    "answer Dana directly",
  ]) {
    assert.ok(text.includes(part), `missing: ${part}`);
  }
});

test("HTML has the lane, actions and details", () => {
  const { html } = quoteEmail(data(), { receivedAt });
  assert.match(html, /Newark, NJ <span[^>]*>&rarr;<\/span> Atlanta, GA/);
  assert.match(html, /href="mailto:dana@acme\.example\?subject=Re%3A%20your%20quote%20request/);
  assert.match(html, />Reply to Dana</);
  assert.match(html, /href="tel:9735550100"[^>]*>Call \(973\) 555-0100</);
  assert.ok(html.includes("22 pallets<br>38,000 lb"));
  assert.ok(html.includes("Tue, Nov 10, 2026"));
});

test("optional fields fall back cleanly", () => {
  const { html, text } = quoteEmail(data({ company: "", date: "", details: "" }), { receivedAt });
  assert.doesNotMatch(html, />Company</);
  assert.ok(html.includes("No extra details."));
  assert.ok(html.includes("Not given"));
  assert.ok(text.includes("Ready:    Not given"));
});

test("customer text is escaped everywhere in the HTML", () => {
  const evil = '<script>alert(1)</script>"><img src=x onerror=alert(1)>';
  const { html } = quoteEmail(
    data({ name: `Eve ${evil}`, company: evil, pickup: evil, delivery: evil, details: evil }),
    { receivedAt },
  );
  assert.doesNotMatch(html, /<script|<img/i);
  assert.ok(html.includes("&lt;script&gt;"));
});

test("a phone too short to dial gets no call button", () => {
  const { html } = quoteEmail(data({ phone: "12" }), { receivedAt });
  assert.doesNotMatch(html, /Call 12/);
  assert.doesNotMatch(html, /href="tel:/);
});
