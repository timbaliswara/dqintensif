import type { MetadataRoute } from "next";

import { listArticles } from "@/lib/articles";
import { listAnnouncements } from "@/lib/announcements";
import { getSiteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const now = new Date();
  const articles = await listArticles();
  const announcements = await listAnnouncements();

  const staticRoutes = [
    "/",
    "/tentang",
    "/program",
    "/agenda",
    "/pengumuman",
    "/fasilitas",
    "/galeri",
    "/asatidz",
    "/manajemen",
    "/testimoni",
    "/psb",
    "/faq",
    "/kontak",
    "/artikel",
    "/legal",
    "/kebijakan-privasi",
    "/syarat-ketentuan",
  ];

  const staticChangeFrequency: NonNullable<
    MetadataRoute.Sitemap[number]["changeFrequency"]
  > = "weekly";
  const articleChangeFrequency: NonNullable<
    MetadataRoute.Sitemap[number]["changeFrequency"]
  > = "monthly";

  const routes: MetadataRoute.Sitemap = [
    ...staticRoutes.map((p) => ({
      url: `${siteUrl}${p}`,
      lastModified: now,
      changeFrequency: staticChangeFrequency,
      priority: p === "/" ? 1 : 0.8,
    })),
    ...articles.map((a) => ({
      url: `${siteUrl}/artikel/${a.slug}`,
      lastModified: now,
      changeFrequency: articleChangeFrequency,
      priority: 0.7,
    })),
    ...announcements.map((a) => ({
      url: `${siteUrl}/pengumuman/${a.slug}`,
      lastModified: now,
      changeFrequency: articleChangeFrequency,
      priority: 0.75,
    })),
  ];

  return routes;
}
