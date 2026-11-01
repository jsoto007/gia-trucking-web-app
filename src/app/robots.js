import { company } from "@/content/site";

export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${company.url}/sitemap.xml`,
  };
}
