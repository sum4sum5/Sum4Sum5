'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAccepted = localStorage.getItem('sum4sum5_cookies_accepted');
    if (!hasAccepted) {
      // Delay showing the banner slightly for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('sum4sum5_cookies_accepted', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-6 left-6 right-6 z-[10001] md:left-auto md:max-w-md lg:max-w-lg"
        >
          <div className="bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 shadow-2xl relative overflow-hidden group">
            {/* Decoration */}
            <div className="absolute -right-6 -top-6 p-10 opacity-5 group-hover:scale-110 transition-transform duration-1000">
              <Cookie className="w-32 h-32 text-primary" />
            </div>

            <div className="relative z-10 flex flex-col gap-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 orange-gradient rounded-xl flex items-center justify-center text-white shadow-lg">
                    <Cookie className="w-6 h-6" />
                  </div>
                  <h3 className="font-prompt font-black text-white text-lg tracking-tight">เราใช้คุกกี้!</h3>
                </div>
                <button 
                  onClick={() => setIsVisible(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-slate-300 text-[13px] leading-relaxed font-medium">
                สุ่มสี่สุ่มห้าใช้คุกกี้เพื่อเพิ่มประสบการณ์การใช้งานให้ลื่นไหล วิเคราะห์การเข้าชม และแสดงโฆษณาที่ตรงใจคุณ 
                คุณสามารถศึกษารายละเอียดได้ที่ 
                <Link href="/privacy" className="text-primary hover:underline ml-1 font-bold">นโยบายความเป็นส่วนตัว</Link>
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={acceptCookies}
                  className="flex-1 py-3.5 bg-primary hover:bg-orange-600 text-white font-bold rounded-2xl shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2 group/btn active:scale-95"
                >
                  ยอมรับทั้งหมด
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => setIsVisible(false)}
                  className="px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl transition-all border border-white/5 active:scale-95"
                >
                  ตั้งค่า
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
