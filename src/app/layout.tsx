import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
    variable: "--font-space-grotesk",
    subsets: ["latin"],
    display: "swap"
});

export const metadata: Metadata = {
    title: "Artur Myszkowski | Senior Software Engineer",
    description:
        "Senior Software Engineer with 7+ years experience and Master's degree in Computer Science. Specializing in modern front-end applications, React, TypeScript, and high-performance web development.",
    keywords: [
        "software Engineer",
        "senior Engineer",
        "frontend Engineer",
        "react Engineer",
        "typescript",
        "web development",
        "computer science",
        "university of warsaw"
    ],
    authors: [{ name: "Artur Myszkowski" }],
    openGraph: {
        title: "Artur Myszkowski | Senior Software Engineer",
        description: "Senior Software Engineer with 7+ years experience specializing in modern front-end applications",
        type: "website"
    }
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${spaceGrotesk.variable} antialiased`}>{children}</body>
        </html>
    );
}
