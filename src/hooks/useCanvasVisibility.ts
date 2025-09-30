"use client";

import { useCallback, useEffect, useState } from "react";

type UseCanvasVisibilityOptions = {
    threshold?: number | number[];
    rootMargin?: string;
};

type UseCanvasVisibilityReturn<T extends HTMLElement> = {
    ref: (node: T | null) => void;
    isClient: boolean;
    shouldAnimate: boolean;
};

export function useCanvasVisibility<T extends HTMLElement>(
    options?: UseCanvasVisibilityOptions
): UseCanvasVisibilityReturn<T> {
    const [isClient, setIsClient] = useState(false);
    const [element, setElement] = useState<T | null>(null);
    const [isDocumentVisible, setIsDocumentVisible] = useState<boolean>(() => {
        if (typeof document === "undefined") {
            return true;
        }
        return !document.hidden;
    });
    const [isIntersecting, setIsIntersecting] = useState<boolean>(true);

    const ref = useCallback((node: T | null) => {
        setElement(node);
    }, []);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient || typeof document === "undefined") {
            return;
        }

        const handleVisibilityChange = () => {
            setIsDocumentVisible(!document.hidden);
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [isClient]);

    useEffect(() => {
        if (!isClient || !element || typeof IntersectionObserver === "undefined") {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsIntersecting(entry.isIntersecting);
            },
            {
                threshold: options?.threshold ?? 0.1,
                rootMargin: options?.rootMargin
            }
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [isClient, element, options?.threshold, options?.rootMargin]);

    return {
        ref,
        isClient,
        shouldAnimate: isClient && isDocumentVisible && isIntersecting
    };
}
