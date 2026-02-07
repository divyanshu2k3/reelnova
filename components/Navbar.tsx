"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Navbar() {
    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 px-2 sm:px-4 md:px-6 py-3 sm:py-4"
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between glass-card px-2 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 rounded-full border border-white/10 backdrop-blur-xl">
                <Link href="/" className="flex items-center gap-1 sm:gap-1.5 md:gap-2 text-base sm:text-lg md:text-xl lg:text-2xl font-bold tracking-tighter group flex-shrink-0">
                    <div className="relative w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple p-[1px] flex-shrink-0">
                        <div className="w-full h-full bg-black rounded-[7px] flex items-center justify-center group-hover:bg-transparent transition-colors overflow-hidden">
                            <Image src="/logo.svg" alt="ReelNova" width={32} height={32} className="object-contain" />
                        </div>
                    </div>
                    <span className="text-gradient">ReelNova</span>
                </Link>
                <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-400">
                    {["Home", "About", "Privacy", "Terms"].map((item) => (
                        <Link
                            key={item}
                            href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                            className="hover:text-neon-blue transition-colors relative group"
                        >
                            {item}
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-neon-blue transition-all group-hover:w-full" />
                        </Link>
                    ))}
                </div>
                <button className="px-2 sm:px-3 md:px-4 lg:px-5 py-1 sm:py-1.5 md:py-2 rounded-full bg-neon-blue text-black hover:bg-white transition-all text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-bold shadow-[0_0_20px_rgba(0,243,255,0.3)] whitespace-nowrap flex-shrink-0">
                    Get App
                </button>
            </div>
        </motion.nav>
    );
}
