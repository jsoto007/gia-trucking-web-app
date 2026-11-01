import { company } from "@/content/site";

// Static export: lastModified is the build date, i.e. the last deploy.
export default function sitemap() {
  return [
    {
      url: company.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      images: [`${company.url}/og.jpg`],
    },
  ];
}
