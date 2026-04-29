import React from 'react';
import { BookOpen, Dices, Brain, Zap, Target, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';
import BlogListClient from '@/components/blog/BlogListClient';

export const metadata: Metadata = {
  title: 'บทความและไอเดียการสุ่ม | สุ่มสี่สุ่มห้า (Sum4Sum5)',
  description: 'รวมเทคนิค วิธีการ และไอเดียการใช้เครื่องมือสุ่มเพื่อความสนุกและความยุติธรรม ไม่ว่าจะเป็นสุ่มเลขจับฉลาก หรือสุ่มไอเดียต่างๆ',
};

const articles = [
  {
    title: '10 วิธีสุ่มชื่อนักเรียนให้ตื่นเต้น ไม่น่าเบื่อ (ฉบับคุณครูยุคใหม่)',
    description: 'เปลี่ยนชั่วโมงเรียนที่น่าเบื่อให้กลายเป็นความสนุก ด้วย 10 เทคนิคการสุ่มรายชื่อนักเรียนที่ช่วยสร้างบรรยากาศตื่นเต้นและเป็นกันเอง',
    slug: '10-ways-to-random-students-names',
    date: '29 เม.ย. 2026',
    readTime: '12 นาที',
    category: 'ไอเดียห้องเรียน',
    icon: <Sparkles className="w-6 h-6 text-yellow-500" />,
    image: '/images/blog/random_students.png',
  },
  {
    title: 'วิธีสุ่มเลข 2 ตัว 3 ตัว สำหรับกิจกรรมแจกรางวัลแบบยุติธรรม',
    description: 'แชร์เทคนิคการสุ่มเลขรางวัลให้โปร่งใสและน่าตื่นเต้น พร้อมวิธีใช้เครื่องมือสุ่มออนไลน์ให้ได้ผลลัพธ์ที่ทุกคนยอมรับ',
    slug: 'how-to-random-numbers-for-giveaway',
    date: '28 เม.ย. 2026',
    readTime: '15 นาที',
    category: 'เทคนิคการสุ่ม',
    icon: <Dices className="w-6 h-6 text-orange-500" />,
    image: '/images/blog/fair_giveaway.png',
  },
  {
    title: 'หมดปัญหาฝันเห็นอะไรก็ตีเป็นเลขไม่ได้! มาลองใช้ "ตรรกะแห่งการสุ่ม" ตัดใจก่อนวันหวยออก',
    description: 'ก้าวข้ามความวุ่นวายของการตีเลขฝัน ไปสู่โลกแห่งการสุ่มแบบมีตรรกะที่จะทำให้การลุ้นโชคของคุณสนุกและผ่อนคลายกว่าที่เคย',
    slug: 'logic-of-random-numbers-before-lottery',
    date: '28 เม.ย. 2026',
    readTime: '12 นาที',
    category: 'ไลฟ์สไตล์',
    icon: <Brain className="w-6 h-6 text-purple-500" />,
    image: '/images/blog/logic_vs_dream.png',
  },
  {
    title: '5 เหตุผลที่ "การสุ่มเลข" คือทางเลือกที่ฉลาดที่สุด สำหรับสายลุ้นโชคยุคดิจิทัล',
    description: 'ทำไมคนรุ่นใหม่ถึงเลือกใช้ระบบสุ่ม? มาดู 5 เหตุผลที่การสุ่มคือวิธีที่ชาญฉลาดที่สุดในการลุ้นโชคยุค 2026',
    slug: '5-reasons-why-randomizing-is-smart-for-luck',
    date: '28 เม.ย. 2026',
    readTime: '10 นาที',
    category: 'เทคโนโลยี',
    icon: <Zap className="w-6 h-6 text-blue-500" />,
    image: '/images/blog/smart_random.png',
  },
  {
    title: 'ส่องสไตล์ "เลขสุ่ม" ปะทะ "เลขดัง": เมื่อโชคชะตามักจะมาในตอนที่เราไม่ตั้งใจ',
    description: 'ทำไมเลขดังมักจะเกลี้ยงแผง? ลองมาเปลี่ยนแนวเป็นสายเลขนอกสายตาที่ระบบสุ่มมอบให้ บางทีรางวัลใหญ่อาจรอคุณอยู่ตรงนั้น',
    slug: 'random-numbers-vs-famous-numbers',
    date: '28 เม.ย. 2026',
    readTime: '11 นาที',
    category: 'ไลฟ์สไตล์',
    icon: <Target className="w-6 h-6 text-red-500" />,
    image: '/images/blog/random_vs_famous.png',
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen pt-4 pb-12 bg-white">
      {/* Decorative Background Elements - isolated to prevent horizontal overflow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-50 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 opacity-60" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-50 rounded-full blur-[100px] translate-x-[-30%] translate-y-[30%] opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-4 md:pt-6 pb-8 md:pb-12">
        {/* Header Section */}
        <div className="max-w-2xl mx-auto mb-8 md:mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 rounded-full mb-4">
            <BookOpen className="w-3.5 h-3.5 text-orange-500" />
            <span className="text-[11px] font-black text-orange-600 uppercase tracking-widest">Sum4Sum5 Knowledge Hub</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-prompt font-black text-slate-900 mb-4 leading-[1.2]">
            คลังสาระและ<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-400 italic">ไอเดียการสุ่ม</span>
          </h1>

          <p className="text-base md:text-lg text-slate-500 leading-relaxed font-light">
            แหล่งรวมความรู้ที่จะช่วยให้การตัดสินใจของคุณเป็นเรื่องง่าย สนุก และยุติธรรมที่สุด
          </p>
        </div>

        {/* Article Grid with Category Filter */}
        <BlogListClient articles={articles} />

        {/* Bottom Banner */}
        <div className="p-12 md:p-20 bg-slate-900 rounded-[4rem] text-center relative overflow-hidden group shadow-2xl border border-slate-800">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          <div className="relative z-10">
            <Sparkles className="w-16 h-16 text-orange-400 mx-auto mb-8 animate-pulse" />
            <h3 className="text-3xl md:text-5xl font-prompt font-black text-white mb-6">เราอัปเดตบทความใหม่ทุกสัปดาห์!</h3>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed">
              ติดตามเทคนิคการสุ่มเจ๋งๆ และไอเดียสร้างสรรค์เพื่อช่วยให้ชีวิตคุณง่ายขึ้นได้ที่นี่ที่เดียว
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
