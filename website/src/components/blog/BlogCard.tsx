'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, ChevronRight } from 'lucide-react';

interface BlogCardProps {
  article: {
    title: string;
    description: string;
    slug: string;
    date: string;
    readTime: string;
    category: string;
    icon: React.ReactNode;
    image: string;
  };
}

export default function BlogCard({ article }: BlogCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <Link 
      href={`/blog/${article.slug}`}
      className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(255,140,0,0.1)] hover:-translate-y-2 transition-all duration-500 flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="aspect-[16/10] overflow-hidden bg-slate-50 relative shrink-0">
        {!imageError ? (
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={() => setImageError(true)}
          />
        ) : null}
        
        {/* Visual Placeholder - Shown when image is missing or loading fails */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-100/30 transition-opacity duration-500 ${imageError ? 'opacity-100' : 'opacity-100'}`}>
          <div className="relative">
            {/* Decorative circles */}
            <div className="absolute inset-0 bg-orange-200/20 blur-3xl rounded-full scale-150 animate-pulse" />
            <div className="relative w-20 h-20 rounded-[2rem] bg-white shadow-[0_10px_40px_rgba(255,140,0,0.15)] flex items-center justify-center text-orange-500 border border-orange-50">
              <div className="scale-[2]">
                {article.icon}
              </div>
            </div>
          </div>
          <p className="mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-orange-300/60">Sum4Sum5 Visual</p>
        </div>

        <div className="absolute top-5 left-5 px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-wider text-orange-600 border border-white/50 shadow-sm z-10">
          {article.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col flex-1">
        <div className="flex items-center gap-4 text-[11px] font-bold text-slate-400 mb-5 uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-orange-400" />
            <span>{article.date}</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-slate-200" />
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-orange-400" />
            <span>{article.readTime}</span>
          </div>
        </div>
        
        <h2 className="text-2xl font-prompt font-bold mb-4 text-slate-800 group-hover:text-primary transition-colors leading-[1.3]">
          {article.title}
        </h2>
        
        <p className="text-slate-500 text-sm mb-8 line-clamp-3 leading-relaxed font-light">
          {article.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-50 flex items-center justify-center shadow-inner shadow-orange-100/50">
              <div className="scale-75 text-orange-500">
                {article.icon}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-tighter leading-none mb-1">Author</p>
              <p className="text-xs font-bold text-slate-700 leading-none">ทีมสุ่มสี่สุ่มห้า</p>
            </div>
          </div>
          <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 group-hover:text-primary group-hover:border-primary/20 group-hover:bg-primary/5 transition-all">
            <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}
