'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Megaphone, X } from 'lucide-react';
import Link from 'next/link';

interface AdBannerProps {
  slot: 'home-horizontal' | 'sidebar-sq' | 'tool-bottom' | 'footer-top' | 'sticky-bottom' | 'article_middle' | 'article_sidebar';
  className?: string;
}

export default function AdBanner({ slot, className = '' }: AdBannerProps) {
  const [isVisible, setIsVisible] = React.useState(true);
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use environment variable to toggle ads globally
  const showAds = process.env.NEXT_PUBLIC_SHOW_ADS === 'true';

  if (!mounted || !showAds || !isVisible) return null;

  const slotConfig = {
    'home-horizontal': {
      label: 'Leaderboard',
      dimensions: 'w-full min-h-[90px] lg:min-h-[120px] rounded-3xl mb-8',
      sizeText: '728 x 90'
    },
    'sidebar-sq': {
      label: 'Sidebar Square',
      dimensions: 'w-full aspect-square max-w-[300px] mx-auto rounded-3xl',
      sizeText: '300 x 250'
    },
    'tool-bottom': {
      label: 'Large Rectangle',
      dimensions: 'w-full min-h-[250px] max-w-[728px] mx-auto rounded-3xl',
      sizeText: '728 x 250'
    },
    'footer-top': {
      label: 'Small Banner',
      dimensions: 'w-full min-h-[60px] rounded-3xl',
      sizeText: 'Adaptive'
    },
    'sticky-bottom': {
      label: 'Slim Anchor',
      dimensions: 'fixed bottom-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:max-w-4xl z-[10000] h-[75px] md:h-[85px] rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] bg-white/95 backdrop-blur-md border border-slate-200',
      sizeText: '728 x 90'
    },
    'article_middle': {
      label: 'Article Inline',
      dimensions: 'w-full min-h-[150px] rounded-3xl my-8',
      sizeText: '728 x 150'
    },
    'article_sidebar': {
      label: 'Sidebar Vertical',
      dimensions: 'w-full min-h-[400px] rounded-3xl',
      sizeText: '300 x 600'
    }
  };

  const config = slotConfig[slot];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: slot === 'sticky-bottom' ? 100 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={`${slot === 'sticky-bottom' ? 'fixed' : 'relative'} overflow-hidden flex flex-col items-center justify-center ${config.dimensions} ${className}`}
      >
        {slot === 'sticky-bottom' ? (
          <div className="w-full h-full px-6 flex items-center justify-between relative">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-orange-50 flex items-center justify-center text-primary">
                <Megaphone className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Advertisement</p>
                <p className="text-sm font-bold text-slate-600">พื้นที่โฆษณา (Slim Anchor)</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link 
                href="/contact"
                className="hidden md:flex px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-400 font-bold text-[11px] rounded-xl border border-slate-100 transition-all"
              >
                สปอนเซอร์เว็บได้ที่นี่
              </Link>
              <button 
                onClick={() => setIsVisible(false)}
                className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-slate-500 transition-colors bg-white/50 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full h-full bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-[inherit] flex flex-col items-center justify-center p-4">
            <div className="relative z-10 flex flex-col items-center gap-2 text-center">
              <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-200 group-hover:text-primary transition-colors">
                <Megaphone className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Space for Advertisement</p>
                <p className="text-[9px] font-bold text-slate-400 opacity-50 font-mono italic">{config.label} ({config.sizeText})</p>
              </div>
            </div>
            <div className="absolute top-3 right-4 px-1.5 py-0.5 bg-slate-100 rounded text-[8px] font-bold text-slate-400 uppercase tracking-tighter">
              Ad
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
