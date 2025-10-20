import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { PostHogProvider } from "@/providers/posthog-provider";
import StructuredData from "@/components/StructuredData";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
    variable: "--font-space-grotesk",
    subsets: ["latin"],
    display: "swap",
    preload: true,
    adjustFontFallback: true
});

const title = "Artur Myszkowski - Senior Software Engineer";
const description =
    "Senior Software Engineer with 8+ years experience and Master's degree in Computer Science from University of Warsaw. Specializing in React, TypeScript, WebGL, WebAssembly, and high-performance web applications with interactive data visualization.";
const siteUrl = "https://arturmyszkowski.pl";

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title,
    description,
    keywords: [
        // Personal branding
        "Artur Myszkowski",
        "Artur Myszkowski Software Engineer",
        "Artur Myszkowski Poland",
        "Artur Myszkowski Warsaw",
        // Job titles
        "Senior Software Engineer",
        "Senior Frontend Engineer",
        "Full-Stack Developer",
        // Technologies - Frontend
        "React Developer",
        "React Engineer",
        "TypeScript Developer",
        "JavaScript Developer",
        "Next.js Developer",
        // Technologies - Advanced
        "WebGL Developer",
        "WebAssembly Developer",
        "Three.js Developer",
        "Data Visualization Developer",
        // Specializations
        "High-Performance Web Applications",
        "Interactive Data Visualization",
        "Network Analysis Visualization",
        "Graph Visualization",
        // Education & Location
        "Computer Science",
        "University of Warsaw",
        "MIMUW",
        "Master's Degree Computer Science",
        "Software Engineer Warsaw",
        "Software Engineer Poland",
        "React Developer Warsaw",
        "React Developer Poland",
        // Skills
        "Web Development",
        "Frontend Development",
        "Full-Stack Development",
        "Modern Web Applications"
    ],
    authors: [{ name: "Artur Myszkowski", url: siteUrl }],
    creator: "Artur Myszkowski",
    publisher: "Artur Myszkowski",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1
        }
    },
    alternates: {
        canonical: siteUrl
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: siteUrl,
        siteName: "Artur Myszkowski Portfolio",
        title,
        description,
        images: [
            {
                url: "/opengraph-image",
                width: 1200,
                height: 630,
                alt: "Artur Myszkowski - Senior Software Engineer"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title,
        description,
        creator: "@arturmyszkowski",
        images: ["/opengraph-image"]
    },
    verification: {
        google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    }
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth snap-y snap-mandatory overflow-x-hidden bg-black">
            <head>
                <StructuredData />
                {/* Preload critical resources */}
                <link rel="preload" href="/images/profile.jpeg" as="image" type="image/jpeg" />
                {/* Preconnect to external domains */}
                {/* Fixme: not sure it we need this, cdouble check from where fonts are coming from */}
                {/* <link rel="preconnect" href="https://fonts.googleapis.com" /> */}
                {/* <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" /> */}
            </head>
            <body
                className={`${spaceGrotesk.variable} antialiased overflow-x-clip font-[family-name:var(--font-space-grotesk)]`}
            >
                <PostHogProvider>{children}</PostHogProvider>
            </body>
        </html>
    );
}
