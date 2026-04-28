import React from 'react';
import { BookOpen, Dices, Search } from 'lucide-react';
import type { Metadata } from 'next';
import BlogCard from '@/components/blog/BlogCard';

export const metadata: Metadata = {
  title: 'บทความและไอเดียการสุ่ม | สุ่มสี่สุ่มห้า (Sum4Sum5)',
  description: 'รวมเทคนิค วิธีการ และไอเดียการใช้เครื่องมือสุ่มเพื่อความสนุกและความยุติธรรม ไม่ว่าจะเป็นสุ่มเลขจับฉลาก หรือสุ่มไอเดียต่างๆ',
};

const articles = [
  {
    title: 'วิธีสุ่มเลข 2 ตัว 3 ตัว สำหรับกิจกรรมแจกรางวัลแบบยุติธรรม',
    description: 'แชร์เทคนิคการสุ่มเลขรางวัลให้โปร่งใสและน่าตื่นเต้น พร้อมวิธีใช้เครื่องมือสุ่มออนไลน์ให้ได้ผลลัพธ์ที่ทุกคนยอมรับ',
    slug: 'how-to-random-numbers-for-giveaway',
    date: '28 เม.ย. 2026',
    readTime: '8 นาที',
    category: 'เทคนิคการสุ่ม',
    icon: <Dices className="w-6 h-6 text-orange-500" />,
    image: 'https://images.unsplash.com/photo-1596838132731-163486289b42?q=80&w=2070&auto=format&fit=crop',
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 rounded-full mb-6 font-medium">
            <BookOpen className="w-4 h-4" />
            <span>Sum4Sum5 Knowledge Hub</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-prompt font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            บทความและไอเดียการสุ่ม
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            แหล่งรวมความรู้ที่จะช่วยให้การตัดสินใจของคุณเป็นเรื่องง่าย สนุก และยุติธรรมที่สุด
          </p>
        </div>

        {/* Featured Search/Filter (Visual only for now) */}
        <div className="relative max-w-xl mx-auto mb-16">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-slate-400" />
          </div>
          <input 
            type="text" 
            placeholder="ค้นหาบทความที่คุณสนใจ..."
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
          />
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {articles.map((article) => (
            <BlogCard key={article.slug} article={article} />
          ))}
        </div>

        {/* Empty State / Coming Soon */}
        <div className="mt-20 p-12 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200 text-center">
          <Sparkles className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-prompt font-bold text-slate-400">บทความอื่นๆ กำลังตามมา...</h3>
          <p className="text-slate-400 text-sm mt-2">เรากำลังเตรียมไอเดียการสุ่มเจ๋งๆ อีกมากมายมาฝากคุณ</p>
        </div>
      </div>
    </main>
  );
}

const Sparkles = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
);
