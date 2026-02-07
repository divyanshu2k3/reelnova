"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import DownloadForm from "@/components/DownloadForm";
import Footer from "@/components/Footer";
import Features from "@/components/Features";
import ThreeDElement from "@/components/ThreeDElement";
import { motion } from "framer-motion";

export default function HomeContent() {
    return (
        <main className="min-h-screen bg-[#050505] text-white selection:bg-neon-pink selection:text-white relative overflow-x-hidden max-w-full">
            <Navbar />

            {/* Ambient Background Blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon-blue/10 rounded-full blur-[120px] pointer-events-none -z-10" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-neon-pink/10 rounded-full blur-[120px] pointer-events-none -z-10" />

            <ThreeDElement />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <Hero />
                <div className="relative z-10 -mt-20">
                    <DownloadForm />
                </div>
            </motion.div>

            <Features />

            {/* How It Works Section */}
            <section className="py-24 px-6 max-w-7xl mx-auto relative">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">
                        HOW TO <span className="text-gradient">DOWNLOAD?</span>
                    </h2>
                    <p className="text-gray-400 font-medium">Get your favorite reels in 3 lightning-fast steps.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { step: "01", title: "Copy Link", desc: "Open Instagram and copy the URL of the Reel you love." },
                        { step: "02", title: "Paste URL", desc: "Paste the link into our secure AI download engine." },
                        { step: "03", title: "Save HD", desc: "Instantly save the ultra high-quality video to your device." }
                    ].map((item, i) => (
                        <div key={i} className="glass-card p-10 rounded-[2.5rem] relative overflow-hidden group hover:neon-border transition-all duration-700">
                            <span className="text-8xl font-black opacity-5 absolute -right-4 -top-4 group-hover:opacity-10 transition-opacity grayscale">{item.step}</span>
                            <div className="relative z-10">
                                <h3 className="text-2xl font-black mb-4 text-white">{item.title}</h3>
                                <p className="text-gray-400 leading-relaxed font-medium">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* SEO FAQ Section */}
            <section className="py-32 px-6 max-w-5xl mx-auto relative">
                <div className="absolute inset-0 bg-neon-purple/5 blur-[100px] -z-10 rounded-full" />
                <div className="text-center mb-20">
                    <h2 className="text-4xl font-black mb-6 tracking-tighter">FREQUENTLY ASKED <span className="text-gradient">QUESTIONS</span></h2>
                    <p className="text-gray-400 font-medium">Everything you need to know about ReelNova&apos;s technology.</p>
                </div>
                <div className="grid gap-4">
                    {[
                        { q: "What is ReelNova Engine?", a: "ReelNova is an advanced web-based engine optimized for fetching Instagram content in original quality without watermarks." },
                        { q: "Is it really free?", a: "Yes, our high-speed servers are free for all users, supported by minimal non-intrusive advertisements." },
                        { q: "Any hidden requirements?", a: "No login, no credentials, and no app installs. We prioritize your privacy and speed above all else." },
                        { q: "Supported platforms?", a: "Fully compatible with iOS, Android, macOS, and Windows. If it has a browser, it works." }
                    ].map((faq, i) => (
                        <div key={i} className="glass-card p-8 rounded-3xl border border-white/5 hover:border-white/10 transition-all group">
                            <h3 className="text-xl font-bold text-neon-blue mb-3 group-hover:text-white transition-colors flex items-center gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-neon-blue group-hover:bg-neon-pink transition-colors" />
                                {faq.q}
                            </h3>
                            <p className="text-gray-400 font-medium leading-relaxed pl-4.5">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
