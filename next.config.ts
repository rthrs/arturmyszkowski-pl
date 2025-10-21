import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Performance optimizations
    experimental: {
        optimizePackageImports: ["framer-motion", "react-icons"]
    },

    // Compiler optimizations
    compiler: {
        removeConsole: process.env.NODE_ENV === "production"
    },

    // Image optimization
    images: {
        formats: ["image/webp", "image/avif"],
        minimumCacheTTL: 31536000, // 1 year
        qualities: [10, 25, 50, 75, 90, 100] // Configured quality values
    },

    // Headers for better caching and performance
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
    }
};

export default nextConfig;
