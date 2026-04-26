'use client';

import React from 'react';
import { Expand, Shrink } from 'lucide-react';

interface FullscreenButtonProps {
  isFullscreen: boolean;
  onToggle: () => void;
  className?: string;
}

export default function FullscreenButton({ isFullscreen, onToggle, className = "" }: FullscreenButtonProps) {
  return (
    <button 
      onClick={onToggle} 
      className={`px-3 lg:px-4 h-9 bg-white/40 lg:bg-white border border-white/40 lg:border-slate-100 lg:shadow-xl rounded-xl flex items-center gap-2 text-slate-600 font-black text-[11px] uppercase transition-all hover:bg-white/60 active:scale-95 ${className}`}
    >
      {isFullscreen ? (
        <>
          <Shrink className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">ย่อหน้าจอ</span>
        </>
      ) : (
        <>
          <Expand className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">ขยายเต็มจอ</span>
        </>
      )}
    </button>
  );
}
