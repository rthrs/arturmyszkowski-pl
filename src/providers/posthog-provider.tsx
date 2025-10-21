"use client";

import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect, useState } from "react";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
    const [posthog, setPosthog] = useState<typeof import("posthog-js").default | null>(null);

    useEffect(() => {
        // Only load PostHog in production and if key is provided
        if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
            const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;

            if (posthogKey) {
                // Dynamic import to reduce initial bundle size
                import("posthog-js").then((posthogModule) => {
                    const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

                    posthogModule.default.init(posthogKey, {
                        api_host: posthogHost,
                        // Cookie-free configuration
                        persistence: "memory", // No cookies or localStorage
                        disable_session_recording: true, // Can enable if needed
                        capture_pageview: true,
                        capture_pageleave: true,
                        // Privacy settings
                        autocapture: false, // Manual tracking only
                        mask_all_text: false,
                        mask_all_element_attributes: false
                    });

                    setPosthog(posthogModule.default);
                });
            }
        }
    }, []);

    // Return children without PostHog provider if not loaded
    if (!posthog) {
        return <>{children}</>;
    }

    return <PHProvider client={posthog}>{children}</PHProvider>;
}
