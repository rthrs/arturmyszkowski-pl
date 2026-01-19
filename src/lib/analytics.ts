/**
 * PostHog Analytics utilities - Cookie-free implementation
 * Documentation: https://posthog.com/docs/libraries/next-js
 */

import posthog from "posthog-js";

/**
 * Detect pageview source from URL params or referrer
 * Priority: query params ("source" or "s") > referrer detection
 */
export const getPageviewSource = (): string => {
    if (typeof window === "undefined") return "direct";

    // Check URL params first ("source" param takes priority, fallback to "s")
    const params = new URLSearchParams(window.location.search);
    const sourceParam = params.get("source") || params.get("s");
    if (sourceParam) return sourceParam;

    // Fall back to referrer detection
    const referrer = document.referrer || "";
    if (referrer.includes("linkedin")) return "linkedin";
    if (referrer.includes("google")) return "google_search";
    if (referrer.includes("instagram")) return "instagram";

    return "direct";
};

export const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;

/**
 * Check if PostHog is enabled
 */
export const isAnalyticsEnabled = (): boolean => {
    return !!POSTHOG_KEY && process.env.NODE_ENV === "production" && typeof window !== "undefined";
};

/**
 * Custom event parameters
 */
export interface AnalyticsEvent {
    [key: string]: string | number | boolean | undefined;
}

/**
 * Track custom events using PostHog
 */
export const trackEvent = (eventName: string, properties?: AnalyticsEvent): void => {
    if (!isAnalyticsEnabled()) return;

    posthog.capture(eventName, properties);
};

/**
 * Pre-defined event helpers for common interactions
 */
export const analytics = {
    /**
     * Track button clicks
     */
    trackButtonClick: (buttonName: string, location?: string) => {
        trackEvent("button_click", {
            button_name: buttonName,
            location: location
        });
    },

    /**
     * Track external link clicks
     */
    trackExternalLink: (url: string, linkText?: string, location?: string) => {
        trackEvent("external_link_click", {
            url: url,
            link_text: linkText,
            location: location
        });
    },

    /**
     * Track file downloads
     */
    trackDownload: (fileName: string, fileType?: string, location?: string) => {
        trackEvent("file_download", {
            file_name: fileName,
            file_type: fileType,
            location: location
        });
    },

    /**
     * Track form submissions
     */
    trackFormSubmission: (formName: string, location?: string, success: boolean = true) => {
        trackEvent("form_submit", {
            form_name: formName,
            success: success,
            location: location
        });
    },

    /**
     * Track social media clicks
     */
    trackSocialClick: (platform: string, location?: string, action: string = "click") => {
        trackEvent("social_interaction", {
            platform: platform,
            social_action: action,
            location: location
        });
    },

    /**
     * Track section views (when user scrolls to a section)
     */
    trackSectionView: (sectionName: string) => {
        trackEvent("section_view", {
            section_name: sectionName
        });
    },

    /**
     * Track scroll depth
     */
    trackScrollDepth: (percentage: number) => {
        trackEvent("scroll_depth", {
            percentage: percentage,
            depth_label: `${percentage}%`
        });
    },

    /**
     * Track pageview with source attribution
     */
    trackPageviewWithSource: (source: string) => {
        trackEvent("pageview_source", {
            source: source
        });
    }
};
