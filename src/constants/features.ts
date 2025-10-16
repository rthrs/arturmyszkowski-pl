/**
 * Feature flags for experimental or in-progress features
 */

export const FEATURES = {
    /**
     * Slant design system for sections and navbar
     * When false: Uses simple borders for visual separation
     * When true: Uses clip-path slanted edges from @theme CSS variables
     *
     * To enable: Set to true and update values in globals.css @theme
     */
    SLANT_ENABLED: false
} as const;
