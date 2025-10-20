"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect } from "react";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        if (typeof window !== "undefined") {
            const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
            const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

            // Only initialize in production and if key is provided
            if (posthogKey && process.env.NODE_ENV === "production") {
                posthog.init(posthogKey, {
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
            }
        }
    }, []);

    return <PHProvider client={posthog}>{children}</PHProvider>;
}
