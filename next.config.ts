import type { NextConfig } from "next";

import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
    enabled: process.env.ANALYZE === "true"
});

const nextConfig: NextConfig = {
    experimental: {
        optimizePackageImports: ["framer-motion", "react-icons", "three"]
    },

    compiler: {
        removeConsole: process.env.NODE_ENV === "production"
    },

    images: {
        formats: ["image/webp", "image/avif"],
        minimumCacheTTL: 31536000, // 1 year
        qualities: [10, 25, 50, 75, 90, 100], // Configured quality values
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
    },

    async headers() {
        return [
            {
                // HTML documents and API routes - short cache
                source: "/((?!_next/static).*)",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=0, must-revalidate"
                    },
                    {
                        key: "X-DNS-Prefetch-Control",
                        value: "on"
                    },
                    {
                        key: "X-Frame-Options",
                        value: "DENY"
                    },
                    {
                        key: "X-Content-Type-Options",
                        value: "nosniff"
                    }
                ]
            },
            {
                // Static assets with hashes - long cache (safe)
                source: "/_next/static/(.*)",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable"
                    }
                ]
            },
            {
                // Images - moderate cache
                source: "/images/(.*)",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=2592000" // 30 days
                    }
                ]
            }
        ];
    },

    async rewrites() {
        return [
            {
                source: "/relay-p5g/static/:path*",
                destination: "https://eu-assets.i.posthog.com/static/:path*"
            },
            {
                source: "/relay-p5g/:path*",
                destination: "https://eu.i.posthog.com/:path*"
            }
        ];
    },
    // This is required to support PostHog trailing slash API requests
    skipTrailingSlashRedirect: true
};

export default withBundleAnalyzer(nextConfig);
