"use client";

import { useEffect, useState } from "react";

/**
 * Hook that determines if scroll snap should be enabled based on whether
 * all sections fit within the viewport. This prevents content from being
 * cropped when sections overflow.
 */
export function useScrollSnap() {
    const [snapEnabled, setSnapEnabled] = useState(false);

    useEffect(() => {
        const checkSectionHeights = () => {
            const sections = document.querySelectorAll(".section-base");
            const viewportHeight = window.innerHeight;

            // Check if all sections fit within the viewport
            const allSectionsFit = Array.from(sections).every((section) => {
                const sectionHeight = section.scrollHeight;
                return sectionHeight <= viewportHeight;
            });

            setSnapEnabled(allSectionsFit);
        };

        // Check multiple times as layout settles
        // Initial check after paint
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                checkSectionHeights();
            });
        });

        // Check after animations typically complete (Framer Motion default is 0.8s = 800ms)
        // Add buffer for safety
        const timeouts = [
            setTimeout(checkSectionHeights, 300),
            setTimeout(checkSectionHeights, 600),
            setTimeout(checkSectionHeights, 1000)
        ];

        // Debounced resize handler
        let resizeTimeout: NodeJS.Timeout;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(checkSectionHeights, 150);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            clearTimeout(resizeTimeout);
            timeouts.forEach(clearTimeout);
        };
    }, []);

    return snapEnabled;
}
