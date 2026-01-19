import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import StructuredData from "@/components/StructuredData";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
    variable: "--font-space-grotesk",
    subsets: ["latin"],
    display: "swap",
    preload: true,
    adjustFontFallback: true
});

const title = "Artur Myszkowski | Software Engineer";
const description =
    "Senior Software Engineer with 8+ years of experience and Master's degree in Computer Science from University of Warsaw. Specializing in React, TypeScript, WebGL, WebAssembly, and high-performance web applications with interactive data visualization.";
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
        "Senior Software Developer",
        "Senior Full-Stack Engineer",
        "Senior Full-Stack Developer",
        "Senior Frontend Engineer",
        "Senior Frontend Developer",
        "Software Engineer",
        "Software Developer",
        "Full-Stack Engineer",
        "Full-Stack Developer",
        "Frontend Engineer",
        "Frontend Developer",
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
                alt: "Artur Myszkowski | Software Engineer"
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
            </head>
            <body
                className={`${spaceGrotesk.variable} antialiased overflow-x-clip font-[family-name:var(--font-space-grotesk)]`}
            >
                {children}
                <SpeedInsights />
            </body>
        </html>
    );
}
