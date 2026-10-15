import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = "https://karvionlabs.com";
	const staticDate = "2026-10-15T00:00:00.000Z";

	return [
		{
			url: baseUrl,
			lastModified: staticDate,
			changeFrequency: "weekly",
			priority: 1.0,
		},
		{
			url: `${baseUrl}/#services`,
			lastModified: staticDate,
			changeFrequency: "weekly",
			priority: 0.9,
		},
		{
			url: `${baseUrl}/#projects`,
			lastModified: staticDate,
			changeFrequency: "weekly",
			priority: 0.9,
		},
		{
			url: `${baseUrl}/#tech-stack`,
			lastModified: staticDate,
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${baseUrl}/#testimonials`,
			lastModified: staticDate,
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${baseUrl}/#contact`,
			lastModified: staticDate,
			changeFrequency: "monthly",
			priority: 0.9,
		},
	];
}
