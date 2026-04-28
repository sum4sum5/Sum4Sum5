'use client';

import React, { useState, useEffect } from 'react';
import { Share2, Bookmark, Check } from 'lucide-react';

interface ArticleActionsProps {
  title: string;
  slug: string;
}

export default function ArticleActions({ title, slug }: ArticleActionsProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [isShared, setIsShared] = useState(false);

  useEffect(() => {
    // Check if article is already saved in localStorage
    const savedArticles = JSON.parse(localStorage.getItem('sum4sum5_saved_articles') || '[]');
    setIsSaved(savedArticles.includes(slug));
  }, [slug]);

  const handleShare = async () => {
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url,
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      // Fallback: Copy to clipboard
      await navigator.clipboard.writeText(url);
      setIsShared(true);
      setTimeout(() => setIsShared(false), 2000);
    }
  };

  const handleSave = () => {
    const savedArticles = JSON.parse(localStorage.getItem('sum4sum5_saved_articles') || '[]');
    let newSaved;
    
    if (isSaved) {
      newSaved = savedArticles.filter((s: string) => s !== slug);
    } else {
      newSaved = [...savedArticles, slug];
    }
    
    localStorage.setItem('sum4sum5_saved_articles', JSON.stringify(newSaved));
    setIsSaved(!isSaved);
  };

  return (
    <div className="flex items-center gap-4">
      <button 
        onClick={handleShare}
        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all font-bold text-sm shadow-sm ${
          isShared 
          ? 'bg-green-500 text-white shadow-green-500/20' 
          : 'bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 active:scale-95 border border-slate-100'
        }`}
      >
        {isShared ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
        {isShared ? 'คัดลอกลิงก์แล้ว!' : 'แชร์บทความ'}
      </button>

      <button 
        onClick={handleSave}
        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all font-bold text-sm shadow-sm border active:scale-95 ${
          isSaved 
          ? 'bg-orange-500 text-white border-orange-500 shadow-orange-500/20' 
          : 'bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border-slate-100'
        }`}
      >
        <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
        {isSaved ? 'บันทึกแล้ว' : 'บันทึกไว้'}
      </button>
    </div>
  );
}
