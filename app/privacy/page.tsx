import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy - ReelNova",
    description: "Your privacy is our priority. Learn how ReelNova handles your data and ensures a secure downloading experience.",
    alternates: {
        canonical: "/privacy",
    },
};

export default function Privacy() {
    return (
        <main className="min-h-screen bg-black text-white">
            <Navbar />
            <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-gradient mb-8">Privacy Policy</h1>

                <div className="space-y-8 text-gray-300">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Data Collection</h2>
                        <p>We do not store any videos you download on our servers. All downloads are processed directly from Instagram&apos;s CDN to your device.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. Cookies</h2>
                        <p>We use essential cookies to ensure the website functions properly and analytical cookies (like Google Analytics) to understand how you use our tool.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. Third-Party Services</h2>
                        <p>We use third-party advertising partners who may collect data for processing ad personalization.</p>
                    </section>

                    <p className="text-sm text-gray-500 mt-12">Last updated: {new Date().toLocaleDateString()}</p>
                </div>
            </div>
            <Footer />
        </main>
    );
}
// redeploy trigger
