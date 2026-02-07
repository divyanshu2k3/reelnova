import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    metadataBase: new URL("https://reelnova.in"),
    title: "Instagram Reel Downloader - Fast, Free & HD | ReelNova.in",
    description: "Best Instagram Reel Downloader for 2025. Save IG reels in HD 4K, no watermark. Free, fast and easy tool to download instagram videos, reels and photos instantly.",
    keywords: [
        "instagram reel downloader",
        "download instagram reels",
        "save ig reels",
        "instagram video downloader",
        "insta reel saver",
        "download reels without watermark",
        "best ig downloader 2025",
        "ReelNova",
        "save-from-instagram",
        "story saver",
        "instagram photo download",
        "reelnova.in"
    ],
    authors: [{ name: "SPD" }],
    robots: "index, follow",
    icons: {
        icon: [
            { url: "/favicon.ico", sizes: "any" },
            { url: "/icon.png", type: "image/png", sizes: "192x192" },
            { url: "/favicon.svg", type: "image/svg+xml" },
        ],
        shortcut: ["/favicon.ico"],
        apple: [
            { url: "/icon.png", type: "image/png", sizes: "180x180" },
        ],
    },
    openGraph: {
        title: "Instagram Reel Downloader - Download Reels in HD | ReelNova.in",
        description: "The fastest way to save Instagram Reels without watermark. Free & Secured.",
        url: "https://reelnova.in",
        siteName: "ReelNova",
        images: [
            {
                url: "/logo.svg",
                width: 512,
                height: 512,
                alt: "ReelNova Logo",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Download Instagram Reels - Fast & Free | ReelNova",
        description: "Save Instagram Reels in HD instantly. No app required.",
        images: ["/logo.svg"],
    }
};

// JSON-LD Structured Data for Google
const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "ReelNova Instagram Downloader",
    "operatingSystem": "WINDOWS, Android, iOS, MacOS",
    "applicationCategory": "UtilitiesApplication",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    },
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "8521"
    }
};

import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <script
                    src="https://pl28651930.effectivegatecpm.com/c9/57/3f/c9573fbac4860f1b251eae62942f2eed.js"
                    async
                />
                {children}
                <Analytics />
            </body>
        </html>
    );
}

// redeploy trigger: canonical-url-fix-production-v1
