/**
 * Google Analytics 4 utilities using Next.js @next/third-parties
 * Documentation: https://nextjs.org/docs/app/building-your-application/optimizing/third-party-libraries#google-analytics
 */

import { sendGAEvent } from "@next/third-parties/google";

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/**
 * Check if Google Analytics is enabled
 */
export const isGAEnabled = (): boolean => {
    return !!GA_MEASUREMENT_ID && process.env.NODE_ENV === "production";
};

/**
 * Custom event parameters
 */
export interface GAEvent {
    action: string;
    category?: string;
    label?: string;
    value?: number;
    // Allow additional custom parameters
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

/**
 * Track custom events using Next.js sendGAEvent
 * Examples:
 * - Button clicks
 * - Form submissions
 * - Downloads
 * - External link clicks
 */
export const event = ({ action, category, label, value, ...params }: GAEvent): void => {
    if (!isGAEnabled()) return;

    sendGAEvent("event", action, {
        event_category: category,
        event_label: label,
        value: value,
        ...params
    });
};

/**
 * Pre-defined event helpers for common interactions
 */
export const analytics = {
    /**
     * Track button clicks
     */
    trackButtonClick: (buttonName: string, location?: string) => {
        event({
            action: "button_click",
            category: "engagement",
            label: buttonName,
            location: location
        });
    },

    /**
     * Track external link clicks
     */
    trackExternalLink: (url: string, linkText?: string, location?: string) => {
        event({
            action: "external_link_click",
            category: "outbound",
            label: linkText || url,
            url: url,
            location: location
        });
    },

    /**
     * Track file downloads
     */
    trackDownload: (label: string, fileName: string, fileType?: string, location?: string) => {
        event({
            action: "file_download",
            category: "downloads",
            label: label,
            file_name: fileName,
            file_type: fileType,
            location: location
        });
    },

    /**
     * Track form submissions
     */
    trackFormSubmission: (formName: string, success: boolean = true) => {
        event({
            action: "form_submit",
            category: "engagement",
            label: formName,
            success: success
        });
    },

    /**
     * Track social media clicks
     */
    trackSocialClick: (platform: string, location?: string, action: string = "click") => {
        event({
            action: "social_interaction",
            category: "social",
            label: platform,
            social_action: action,
            location: location
        });
    },

    /**
     * Track section views (when user scrolls to a section)
     */
    trackSectionView: (sectionName: string) => {
        event({
            action: "section_view",
            category: "engagement",
            label: sectionName
        });
    },

    /**
     * Track scroll depth
     */
    trackScrollDepth: (percentage: number, page?: string) => {
        event({
            action: "scroll_depth",
            category: "engagement",
            label: `${percentage}%`,
            value: percentage,
            page: page
        });
    }
};
