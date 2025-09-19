import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Artur Myszkowski - Senior Software Engineer",
  description: "Senior Software Engineer looking for new opportunities. Experienced in modern web technologies, passionate about clean code and innovative solutions.",
  keywords: ["software engineer", "developer", "programmer", "web development", "react", "typescript"],
  authors: [{ name: "Artur Myszkowski" }],
  openGraph: {
    title: "Artur Myszkowski - Senior Software Engineer",
    description: "Senior Software Engineer looking for new opportunities",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}