import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-stone-100 border-t border-stone-200 text-stone-600 py-10 rounded-t-[2.5rem] mt-auto relative overflow-hidden">

            {/* Decorative Background Pattern (Very Subtle) */}
            <div className="absolute top-0 left-0 w-full h-full opacity-[0.2] pointer-events-none">
                <div className="absolute top-10 right-10 text-8xl transform rotate-12">🥘</div>
                <div className="notranslate absolute bottom-10 left-10 text-8xl transform -rotate-12">🥦</div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

                    {/* COLUMN 1: BRAND */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2 group w-fit">
                            <span className="text-3xl filter grayscale group-hover:grayscale-0 transition-all duration-300">🥘</span>
                            <div className="flex flex-col">
                                <span className="notranslate font-display font-black text-2xl text-stone-800 tracking-tight leading-none">
                                    EasyCook<span className="text-emerald-600">.in</span>
                                </span>
                            </div>
                        </Link>
                        <p className="text-stone-500 text-base font-bold leading-relaxed max-w-xs">
                            Simple, accessible recipes for every Indian kitchen.
                            <span className="block mt-2 text-emerald-700">From our kitchen to yours.</span>
                        </p>
                    </div>

                    {/* COLUMN 2: DISCOVER */}
                    <div>
                        <h3 className="font-display font-bold text-stone-800 text-lg mb-4 uppercase tracking-widest">Discover</h3>
                        <ul className="space-y-2 text-sm font-bold">
                            <li>
                                <Link href="/" className="hover:text-emerald-600 transition-colors flex items-center gap-2">
                                    <span>🏠</span> Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/fridge" className="hover:text-emerald-600 transition-colors flex items-center gap-2">
                                    <span>🧊</span> Fridge Search
                                </Link>
                            </li>
                            <li>
                                <Link href="/submit" className="hover:text-emerald-600 transition-colors flex items-center gap-2">
                                    <span>✨</span> Submit Recipe
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* COLUMN 3: COMPANY */}
                    <div>
                        <h3 className="font-display font-bold text-stone-800 text-lg mb-4 uppercase tracking-widest">Company</h3>
                        <ul className="space-y-2 text-sm font-bold">
                            <li><Link href="/about" className="hover:text-emerald-600 transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-emerald-600 transition-colors">Contact Support</Link></li>
                            <li><Link href="/privacy" className="hover:text-emerald-600 transition-colors">Privacy & Terms</Link></li>
                        </ul>
                    </div>

                    {/* COLUMN 4: BADGE */}
                    <div className="bg-white p-5 rounded-2xl border border-stone-200 text-center flex flex-col items-center justify-center shadow-sm">
                        <div className="notranslate text-3xl mb-2">🇮🇳</div>
                        <p className="text-stone-800 font-bold text-sm mb-0.5">Made in India</p>
                        <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wide">Built for Seniors ❤️</p>
                    </div>

                </div>

                {/* BOTTOM BAR */}
                <div className="border-t border-stone-200 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-s font-bold text-stone-400">
                    <p>&copy; {new Date().getFullYear()} EasyCook India. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-stone-600 transition-colors">Instagram</a>
                        <a href="#" className="hover:text-stone-600 transition-colors">Twitter</a>
                        <a href="#" className="hover:text-stone-600 transition-colors">Facebook</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}