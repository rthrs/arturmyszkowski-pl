import posthog from "posthog-js";

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: "/relay-p5g",
    ui_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    // Cookie-free configuration for privacy
    persistence: "memory",
    disable_session_recording: false,
    capture_pageview: true,
    capture_pageleave: true,
    // Privacy settings
    autocapture: false, // Manual tracking only
    mask_all_text: false,
    mask_all_element_attributes: false
});
