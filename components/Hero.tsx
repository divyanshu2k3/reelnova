"use client";

import { motion } from "framer-motion";
import { Download, Instagram, Sparkles } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative flex flex-col items-center justify-center pt-32 sm:pt-40 pb-20 sm:pb-32 px-4 sm:px-6 text-center overflow-hidden max-w-full">
            {/* Background Glows */}
            <div className="absolute top-0 left-1/4 w-[200px] sm:w-[300px] md:w-[500px] h-[200px] sm:h-[300px] md:h-[500px] bg-neon-purple/20 rounded-full blur-[60px] sm:blur-[80px] md:blur-[120px] -z-10 animate-pulse-slow" />
            <div className="absolute bottom-0 right-1/4 w-[180px] sm:w-[250px] md:w-[400px] h-[180px] sm:h-[250px] md:h-[400px] bg-neon-blue/20 rounded-full blur-[50px] sm:blur-[70px] md:blur-[100px] -z-10 animate-pulse-slow" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-5xl mx-auto relative"
            >
                {/* Floating Elements */}
                <div className="absolute -top-10 -left-10 w-20 h-20 bg-neon-blue/10 rounded-full blur-xl animate-float hidden sm:block" />
                <div className="absolute top-40 -right-20 w-32 h-32 bg-neon-pink/10 rounded-full blur-2xl animate-float hidden sm:block" style={{ animationDelay: '2s' }} />

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-white/10 mb-8 mx-auto shadow-lg shadow-black/50 overflow-hidden relative group">
                    <Sparkles className="w-4 h-4 text-neon-blue group-hover:rotate-12 transition-transform" />
                    <span className="text-[10px] sm:text-xs font-bold text-gray-300 uppercase tracking-[0.2em]">
                        Next-Gen Instagram Downloader
                    </span>
                </div>

                <h1 className="text-4xl sm:text-6xl md:text-8xl font-black mb-6 sm:mb-8 tracking-tighter leading-[1.1] sm:leading-[0.9] text-white">
                    SAVE REELS <br />
                    <span className="text-gradient">IN SECONDS</span>
                </h1>

                <p className="text-sm sm:text-base md:text-lg text-gray-400 mb-8 sm:mb-12 max-w-xl mx-auto leading-relaxed font-medium px-4">
                    Experience the fastest way to download Instagram content in
                    <span className="text-white px-2">Ultra HD</span> without watermarks or limits.
                </p>
            </motion.div>
        </section>
    );
}
