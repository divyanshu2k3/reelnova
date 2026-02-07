import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full py-12 px-6 border-t border-white/10 bg-black/50 backdrop-blur-md mt-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-xl font-bold mb-4 text-gradient">ReelNova</h3>
                    <p className="text-gray-400 text-sm">
                        The fastest and most secure Instagram Reel Downloader.
                        Download high-quality videos instantly.
                    </p>
                </div>
                <div>
                    <h4 className="font-bold mb-4 text-white">Legal</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                        <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
                        <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-4 text-white">Company</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><Link href="/about" className="hover:text-white">Our Story</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-4 text-white">Connect</h4>
                    <div className="flex space-x-4">
                        {/* Social Icons would go here */}
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center text-sm text-gray-500">
                <p>© {new Date().getFullYear()} ReelNova. All rights reserved.</p>
                <p className="mt-2 text-gray-400">Made by <span className="text-neon-blue font-bold">SPD</span></p>
            </div>
        </footer>
    );
}
