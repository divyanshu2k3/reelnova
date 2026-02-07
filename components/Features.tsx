"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Zap, Video, Smartphone } from "lucide-react";

const features = [
    {
        icon: <Video className="w-8 h-8 text-neon-blue" />,
        title: "HD 4K Quality",
        description: "Download reels in original quality. We don't compress your videos. Experience crystal clear playback."
    },
    {
        icon: <Zap className="w-8 h-8 text-neon-purple" />,
        title: "Lightning Fast",
        description: "Our advanced servers process your request in milliseconds. No waiting queues, just instant downloads."
    },
    {
        icon: <ShieldCheck className="w-8 h-8 text-neon-pink" />,
        title: "100% Secure & Privacy",
        description: "We don't store your history or personal data. Your privacy is our top priority. Completely anonymous."
    },
    {
        icon: <Smartphone className="w-8 h-8 text-green-400" />,
        title: "Device Independent",
        description: "Works perfectly on iPhone, Android, PC, and Mac. No app installation required."
    }
];

export default function Features() {
    return (
        <section className="py-20 relative z-10 px-6">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Why Choose <span className="text-gradient">ReelNova?</span></h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">The ultimate tool tailored for content creators and social media enthusiasts.</p>
                </motion.div>

                <div className="bento-grid">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`glass-card p-8 rounded-[2rem] hover:neon-border transition-all duration-500 group relative overflow-hidden ${index === 0 || index === 3 ? "md:col-span-2" : ""
                                }`}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="bg-white/5 p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-black mb-4 text-white group-hover:text-neon-blue transition-colors">{feature.title}</h3>
                                <p className="text-gray-400 leading-relaxed text-base font-medium">{feature.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
