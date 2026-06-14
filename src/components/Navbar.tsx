'use client';
import { useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import LanguageSelector from '@/components/LanguageSelector';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-paper/80 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-3xl filter grayscale group-hover:grayscale-2 transition-all duration-300">🥘</span>
            <div className="notranslate flex flex-col">
              <span className="font-display font-black text-2xl text-emerald-800 tracking-tight leading-none">
                EasyCook<span className="text-emerald-500">.in</span>
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            <LanguageSelector />
            <Link href="/" className="font-bold text-stone-600 hover:text-emerald-700 transition-colors">Home</Link>
            <Link href="/about" className="font-bold text-stone-600 hover:text-emerald-700 transition-colors">About</Link>
            <Link href="/privacy" className="font-bold text-stone-600 hover:text-emerald-700 transition-colors">Privacy</Link>
            <Link href="/contact" className="font-bold text-stone-600 hover:text-emerald-700 transition-colors">Contact</Link>
            <Link href="/submit" className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full transition-all shadow-sm hover:shadow-emerald-200">
              SUBMIT
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white border border-stone-200 text-stone-600 hover:bg-stone-50"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {/* Mobile Menu Dropdown */}
      <div className={clsx(
        "md:hidden overflow-hidden transition-all duration-300 bg-white border-b border-stone-100",
        // FIX: Changed max-h-64 to max-h-[500px] so it fits all links!
        isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="px-4 py-4 flex flex-col gap-4">
          
          {/* Mobile Language Switcher */}
          <div className="flex justify-between items-center bg-stone-50 p-3 rounded-xl border border-stone-100">
             <span className="font-bold text-stone-500 text-sm">Language / भाषा</span>
             <LanguageSelector />
          </div>

          {/* Mobile Submit Button (Added this back in case you missed it) */}
          <Link 
              href="/submit" 
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-3 bg-stone-900 text-white font-bold text-center rounded-xl shadow-sm"
            >
              ✨ Submit Recipe
          </Link>

          <Link href="/" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 font-bold text-stone-600 hover:bg-stone-50 rounded-lg">Home</Link>
          <Link href="/about" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 font-bold text-stone-600 hover:bg-stone-50 rounded-lg">About Us</Link>
          <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 font-bold text-stone-600 hover:bg-stone-50 rounded-lg">Contact</Link>
          <Link href="/privacy" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 font-bold text-stone-600 hover:bg-stone-50 rounded-lg">Privacy Policy</Link>
        </div>
      </div>
    </nav>
  );
}