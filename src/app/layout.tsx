import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { PostHogProvider } from "@/providers/posthog-provider";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
    variable: "--font-space-grotesk",
    subsets: ["latin"],
    display: "swap"
});

const title = "Artur Myszkowski - Software Engineer";
const description =
    "Senior Software Engineer with 8+ years experience and Master's degree in Computer Science. Specializing in modern front-end applications, React, TypeScript, and high-performance web development.";

export const metadata: Metadata = {
    title,
    description,
    keywords: [
        "Artur Myszkowski",
        "software Engineer",
        "senior Engineer",
        "senior software engineer",
        "frontend Engineer",
        "react Engineer",
        "react developer",
        "typescript developer",
        "javascript developer",
        "javascript",
        "typescript",
        "computer science",
        "web development",
        "computer science",
        "university of warsaw",
        "mimuw",
        "master's degree in computer science"
    ],
    authors: [{ name: "Artur Myszkowski" }],
    openGraph: {
        title,
        description,
        type: "website"
    }
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth overflow-x-hidden bg-black md:snap-y md:snap-mandatory">
            <body
                className={`${spaceGrotesk.variable} antialiased overflow-x-clip font-[family-name:var(--font-space-grotesk)]`}
            >
                <PostHogProvider>{children}</PostHogProvider>
            </body>
        </html>
    );
}
