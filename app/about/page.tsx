import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdBanner from "@/components/AdBanner";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About ReelNova - Our Mission & Technology",
    description: "Learn more about ReelNova, the fastest Instagram Reel downloader. Our mission is to provide a seamless, secure, and watermark-free experience.",
    alternates: {
        canonical: "/about",
    },
};

export default function About() {
    return (
        <main className="min-h-screen bg-black text-white">
            <Navbar />
            <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
                <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-purple mb-8">
                    About ReelNova
                </h1>

                <div className="prose prose-invert prose-lg">
                    <p className="text-xl text-gray-300 mb-6">
                        ReelNova was born from a simple need: to download high-quality Instagram Reels without the hassle of ads, watermarks, or slow speeds.
                    </p>

                    <h2 className="text-3xl font-bold text-white mt-12 mb-6">Our Mission</h2>
                    <p className="text-gray-400">
                        We believe content archiving should be simple, fast, and secure. Whether you&apos;re a content creator saving your own work or a fan keeping a collection of favorites, ReelNova provides the most seamless experience on the web.
                    </p>

                    <AdBanner />

                    <h2 className="text-3xl font-bold text-white mt-12 mb-6">Technology</h2>
                    <ul className="space-y-4 text-gray-400">
                        <li className="flex items-center gap-2">
                            <span className="text-neon-blue">⚡</span> Next.js 15 for lightning-fast performance
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-neon-purple">🎨</span> Tailwind CSS & Framer Motion for a premium UI
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-neon-pink">🔒</span> Secure, privacy-focused architecture
                        </li>
                    </ul>
                </div>
            </div>
            <Footer />
        </main>
    );
}
