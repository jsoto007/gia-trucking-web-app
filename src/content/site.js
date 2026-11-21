// Every business fact on the site lives here. Authority, cargo and fleet size
// come from the company's FMCSA SAFER snapshot — keep them in step with that
// record, and don't add a claim the record can't back.
// The USDOT and MC numbers are kept off the site on purpose (Nov 2026): don't
// add them back to copy, metadata, structured data, llms.txt or photos.

export const company = {
  name: "GIA Blessed Trucking",
  legalName: "GIA Blessed Trucking Inc",
  tagline: "Your freight, in good hands.",
  url: "https://giablessedtrucking.com",
  phone: "+13478251155",
  phoneDisplay: "(347) 825-1155",
  email: "officemanager@giablessedtrucking.com",
  region: "New Jersey",
};

export const nav = [
  { label: "Services", href: "#services" },
  { label: "How we work", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Credentials", href: "#credentials" },
  { label: "FAQ", href: "#faq" },
];

export const services = [
  {
    id: "01",
    title: "Full truckload freight",
    body: "Dedicated capacity for general freight. One truck, one load, picked up on schedule and run straight through to the dock.",
    points: ["Dry general freight", "Scheduled pickups", "Direct to the receiver"],
  },
  {
    id: "02",
    title: "Intermodal container trucking",
    body: "Intermodal container loads moved between terminals and warehouses, with delivery booked around your appointments.",
    points: ["Intermodal container loads", "Terminal to warehouse", "Appointment-based delivery"],
  },
  {
    id: "03",
    title: "Regional & long-haul trucking",
    body: "Interstate authority to run your lanes out of New Jersey and across the lower 48, one-off loads or recurring.",
    points: ["Interstate authority", "Recurring lanes welcome", "Updates from dispatch en route"],
  },
];

export const process = [
  {
    step: "1",
    title: "Tell us about the load",
    body: "Pickup, delivery, dates and what you're shipping. Call, email or use the quote form.",
  },
  {
    step: "2",
    title: "Get a straight rate",
    body: "A clear quote with any accessorials spelled out up front, and a confirmed pickup window.",
  },
  {
    step: "3",
    title: "We keep you posted",
    body: "Dispatch is reachable around the clock, so you can get a status on your load whenever you need it.",
  },
  {
    step: "4",
    title: "Delivered & documented",
    body: "Signed proof of delivery sent to you promptly after the load is delivered.",
  },
];

export const values = [
  {
    title: "Integrity",
    body: "Honest rates, honest ETAs. If something changes on the road, you hear it from us first.",
  },
  {
    title: "Reliability",
    body: "Our own trucks and our own drivers, so the commitment we make is the one that shows up.",
  },
  {
    title: "Excellence",
    body: "Careful handling and clean paperwork on every load, the small one and the big one.",
  },
];

export const ticker = [
  "Your freight, in good hands",
  "24/7 dispatch",
  "Open 365 days a year",
  "Lower 48",
  "General freight",
  "Intermodal containers",
];

// Shown in the FAQ section and published as FAQPage structured data, so every
// answer must stay true to the FMCSA record and the owner's own claims.
export const faqs = [
  {
    q: "What freight does GIA Blessed Trucking haul?",
    a: "Full truckload general freight and intermodal containers. We are authorized by FMCSA as a for-hire motor carrier of property (except household goods).",
  },
  {
    q: "Where are you based, and where do you deliver?",
    a: "We are a New Jersey trucking company with interstate operating authority, so we run loads from New Jersey across the lower 48 states.",
  },
  {
    q: "Are you a carrier or a freight broker?",
    a: "We are a motor carrier, not a broker: your load moves on our trucks with our drivers.",
  },
  {
    q: "How can I verify your authority and insurance?",
    a: "Ask us for our full carrier packet. It includes our operating authority details and a current certificate of insurance.",
  },
  {
    q: "When can I reach dispatch?",
    a: `Any time. Dispatch is available 24 hours a day, 365 days a year at ${company.phoneDisplay}.`,
  },
  {
    q: "How do I get a freight quote?",
    a: "Send the pickup and delivery locations, dates and freight details through the quote form, by email or by phone. We come back with a clear rate and a confirmed pickup window.",
  },
];
