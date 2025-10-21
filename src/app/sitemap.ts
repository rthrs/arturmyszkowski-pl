import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://arturmyszkowski.pl";

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1.0
        },
        {
            url: `${baseUrl}#about`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8
        },
        {
            url: `${baseUrl}#frontend-expertise`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8
        },
        {
            url: `${baseUrl}#full-stack-solutions`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8
        },
        {
            url: `${baseUrl}#featured-projects`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.9
        },
        {
            url: `${baseUrl}#resume`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7
        },
        {
            url: `${baseUrl}#contact`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.6
        }
    ];
}
