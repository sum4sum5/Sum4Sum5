'use client';

import React, { useState } from 'react';
import BlogCard from './BlogCard';

interface Article {
  title: string;
  description: string;
  slug: string;
  date: string;
  readTime: string;
  category: string;
  icon: React.ReactNode;
  image: string;
}

interface BlogListClientProps {
  articles: Article[];
}

export default function BlogListClient({ articles }: BlogListClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>('ทั้งหมด');

  // Derive unique categories from articles
  const categories = ['ทั้งหมด', ...Array.from(new Set(articles.map((a) => a.category)))];

  const filtered = activeCategory === 'ทั้งหมด'
    ? articles
    : articles.filter((a) => a.category === activeCategory);

  return (
    <>
      {/* Category Filter Pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-8 md:mb-10">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 border ${
                isActive
                  ? 'bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/20 scale-105'
                  : 'bg-white text-slate-500 border-slate-200 hover:border-orange-300 hover:text-orange-500'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Article Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16 mb-16">
        {filtered.length > 0 ? (
          filtered.map((article) => (
            <BlogCard key={article.slug} article={article} />
          ))
        ) : (
          <div className="col-span-full text-center py-16 text-slate-400">
            <p className="text-lg font-medium">ยังไม่มีบทความในหมวดนี้ครับ</p>
          </div>
        )}
      </div>
    </>
  );
}
