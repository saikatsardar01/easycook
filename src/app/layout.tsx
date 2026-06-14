import React from 'react';
import { Nunito, Quicksand } from 'next/font/google';
import ScrollToTop from '@/components/ScrollToTop';
import type { Metadata, Viewport } from "next";
import Navbar from '@/components/Navbar';
import './globals.css';
import Footer from '@/components/Footer';

// Configure Fonts
const nunito = Nunito({ 
  subsets: ['latin'],
  variable: '--font-nunito',
  weight: ['400', '600', '700', '800'],
  display: 'swap',
});

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

// 2. PWA Viewport Settings (Theme Color for Mobile Bars)
export const viewport: Viewport = {
  themeColor: '#059669', // Matches your Emerald Green brand
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5, // Accessibility: Allow seniors to zoom in!
};

// 3. SEO METADATA (The most important part for Google)
export const metadata: Metadata = {
  // The 'template' allows subpages to look like: "Paneer Butter Masala | EasyCook"
  title: {
    default: 'EasyCook | Best Simple Indian Cooking Recipes',
    template: '%s | EasyCook India',
  },
  description: 'Find 7,000+ easy, healthy, and authentic Indian cooking recipes. Filter by ingredients, diet (Veg/Non-Veg), and cooking time. Designed for beginners and seniors.',
  icons: {
    icon: '/icon-512.png', // Reference from the /public directory
    apple: '/icon.png', // For Apple devices
  },
  // Keywords Google looks for
  keywords: [
    'cooking recipe', 
    'easy recipes', 
    'Indian food recipes', 
    'vegetarian dinner ideas', 
    'healthy breakfast indian', 
    'quick lunch recipes', 
    'EasyCook India',
    'senior friendly cooking'
  ],

  // PWA Manifest Link
  manifest: '/manifest.webmanifest',

  // Instructions for Google Bot
  robots: {
    index: true,     // "Please index this site"
    follow: true,    // "Please follow links to my recipes"
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Social Media Cards (When someone shares your link on WhatsApp/Facebook)
  openGraph: {
    title: 'EasyCook | Simple Recipes for Everyone',
    description: 'Stop wondering what to cook. Find simple, healthy Indian recipes in seconds.',
    url: 'https://easycook.in', // Change this to your real domain later
    siteName: 'EasyCook',
    locale: 'en_IN',
    type: 'website',
  },

  // Verification (You will need this for Google Search Console)
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION, 
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${nunito.variable} ${quicksand.variable}`}>
      <body className="min-h-screen bg-stone-200 font-sans text-stone-800 selection:bg-emerald-100 selection:text-emerald-900 flex flex-col">
        
        <Navbar />

        {/* Main Content Area */}
        <div className="flex-grow">
          {children}
          <ScrollToTop />
        </div>

        {/* Accessible Footer */}
        <Footer />
        
      </body>
    </html>
  );
}