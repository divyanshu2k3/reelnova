import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service - ReelNova",
    description: "Please read our terms of service before using ReelNova's Instagram downloader tools.",
    alternates: {
        canonical: "/terms",
    },
};

export default function Terms() {
    return (
        <main className="min-h-screen bg-black text-white">
            <Navbar />
            <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-gradient mb-8">Terms of Service</h1>

                <div className="space-y-8 text-gray-300">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                        <p>By using ReelNova, you agree to these terms. If you do not agree, please do not use our service.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. Usage Restrictions</h2>
                        <p>You agree to use this tool only for personal, non-commercial purposes. You must respect the intellectual property rights of the content creators.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. Disclaimer</h2>
                        <p>ReelNova is not affiliated with Instagram or Meta. We are a standalone tool.</p>
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    );
}
