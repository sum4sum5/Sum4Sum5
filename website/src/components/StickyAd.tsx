'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronUp, Megaphone } from 'lucide-react';

const StickyAd = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="sticky-ad-container fixed bottom-0 left-0 right-0 z-[100] px-3 pb-3 pointer-events-none">
      <div className="max-w-4xl mx-auto w-full flex flex-col items-end gap-2">
        
        {/* Toggle Button when hidden */}
        <AnimatePresence>
          {!isVisible && (
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              onClick={() => setIsVisible(true)}
              className="pointer-events-auto bg-slate-900 text-white p-3 rounded-2xl shadow-2xl border border-slate-700/50 hover:bg-primary transition-colors flex items-center gap-2 group"
            >
              <Megaphone className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-wider hidden group-hover:inline">โฆษณา</span>
              <ChevronUp className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* The Ad Main Bar */}
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="pointer-events-auto w-full h-[50px] md:h-[65px] bg-white/80 backdrop-blur-2xl border border-white/50 rounded-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] flex items-center justify-center overflow-hidden relative group"
            >
              <div className="absolute top-1 right-1">
                <button 
                  onClick={() => setIsVisible(false)}
                  className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
                  title="ปิดโฆษณา"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Ad Content Placeholder */}
              <div className="w-full h-full flex items-center justify-between px-6">
                <div className="flex items-center gap-3 opacity-40 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 bg-slate-100 rounded-xl flex items-center justify-center">
                    <Megaphone className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Advertisement</span>
                    <span className="text-xs md:text-sm text-slate-500 font-bold">พื้นที่โฆษณา (Slim Anchor)</span>
                  </div>
                </div>
                
                {/* Visual call to action mockup */}
                <div className="hidden md:flex items-center gap-2 px-4 py-1.5 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-bold text-slate-400">
                  สปอนเซอร์เว็บได้ที่นี่
                </div>
              </div>

              {/* Decorative side accent */}
              <div className="absolute left-0 top-0 w-1 h-full bg-primary" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StickyAd;
