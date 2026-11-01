import { company } from "@/content/site";

export default function manifest() {
  return {
    name: company.legalName,
    short_name: "GIA Trucking",
    description: "New Jersey trucking company: full truckload freight and intermodal containers, 24/7 dispatch.",
    start_url: "/",
    display: "standalone",
    background_color: "#0B1426",
    theme_color: "#0B1426",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
