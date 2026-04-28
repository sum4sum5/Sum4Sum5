'use client';

import React, { useState } from 'react';

interface ArticleHeroImageProps {
  src: string;
  alt: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  onBackClick: () => void;
}

import { Calendar, Clock, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function ArticleHeroImage({ src, alt, title, category, date, readTime, author }: any) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative w-full h-[65vh] md:h-[60vh] overflow-hidden bg-slate-900">
      {!imageError ? (
        <img 
          src={src} 
          alt={alt || title}
          className="w-full h-full object-cover opacity-60 transition-opacity duration-700"
          onError={() => setImageError(true)}
        />
      ) : null}
      
      {/* Fallback Background if image fails */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-orange-900/20 -z-10" />
      
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
      
      {/* Back Button - Positioned at the top to avoid being pushed by long titles */}
      <div className="absolute top-0 left-0 right-0 p-6 pt-8 md:pt-12 z-20">
        <div className="max-w-7xl mx-auto px-6">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-all font-medium bg-white/5 backdrop-blur-xl px-5 py-2.5 rounded-full border border-white/10 hover:bg-white/10 hover:scale-105 active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
            กลับไปหน้าบทความ
          </Link>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-16 pb-10 md:pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-4 py-1.5 bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-orange-500/20">
              {category}
            </span>
          </div>
          
          <h1 className="text-2xl md:text-5xl font-prompt font-bold text-white mb-6 md:mb-8 leading-[1.3] md:leading-[1.2] tracking-tight">
            {title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-8 text-white/70 text-xs font-bold uppercase tracking-widest">
            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-orange-400" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-orange-400" />
              <span>อ่านประมาณ {readTime}</span>
            </div>
            <div className="flex items-center gap-3 py-1 pl-1 pr-4 bg-white/5 rounded-full border border-white/5">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 flex items-center justify-center text-[10px] font-black text-white shadow-inner">
                S4
              </div>
              <span className="text-white">โดย {author}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
