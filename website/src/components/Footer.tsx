'use client';

import React from 'react';
import Link from 'next/link';
import { FerrisWheel, Dices, Users, Sparkles, Mail, ShieldCheck, FileText, Info, BookOpen } from 'lucide-react';
import { version } from '../../package.json';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: 'เครื่องมือของเรา',
      links: [
        { name: 'วงล้อสุ่ม', href: '/wheel', icon: <FerrisWheel className="w-4 h-4" /> },
        { name: 'สุ่มเลข', href: '/random-number', icon: <Dices className="w-4 h-4" /> },
        { name: 'สุ่มรายชื่อ', href: '/random-name', icon: <Users className="w-4 h-4" /> },
        { name: 'แคปชั่น AI', href: '/random-caption', icon: <Sparkles className="w-4 h-4" /> },
      ],
    },
    {
      title: 'เกี่ยวกับเรา',
      links: [
        { name: 'บทความ / สาระน่ารู้', href: '/blog', icon: <BookOpen className="w-4 h-4" /> },
        { name: 'รู้จักสุ่มสี่สุ่มห้า', href: '/about', icon: <Info className="w-4 h-4" /> },
        { name: 'คำถามที่พบบ่อย (FAQ)', href: '/faq', icon: <Info className="w-4 h-4" /> },
        { name: 'ติดต่องาน / แจ้งปัญหา', href: '/contact', icon: <Mail className="w-4 h-4" /> },
      ],
    },
    {
      title: 'นโยบายสาระสำคัญ',
      links: [
        { name: 'นโยบายความเป็นส่วนตัว', href: '/privacy', icon: <ShieldCheck className="w-4 h-4" /> },
        { name: 'ข้อตกลงการใช้งาน', href: '/terms', icon: <FileText className="w-4 h-4" /> },
      ],
    },
  ];

  return (
    <footer className="relative bg-white border-t border-slate-100 pt-16 pb-32">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="w-12 h-12 orange-gradient rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg border border-white/20 group-hover:rotate-12 transition-transform">
                ส
              </div>
              <div className="flex flex-col">
                <span className="font-prompt font-black text-xl tracking-tight leading-none">
                  สุ่มสี่<span className="text-primary text-2xl">สุ่มห้า</span>
                </span>
                <span className="text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase mt-1">SUM4SUM5.COM</span>
              </div>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              แพลตฟอร์มเครื่องมือสุ่มออนไลน์ที่สนุกที่สุด ดีไซน์สวยที่สุด และใช้งานง่ายที่สุด 
              เราสร้างสรรค์เครื่องมือเพื่อช่วยคุณตัดสินใจในทุกเรื่องของชีวิต ไม่ว่าจะเป็นการสุ่มอาหาร สุ่มชื่อ หรือสุ่มเลขโชคลาภ 
              รวมถึงนวัตกรรม AI ที่จะช่วยให้การสร้างคอนเทนต์ของคุณง่ายขึ้นเพียงปลายนิ้วสัมผัส
            </p>
          </div>

          {/* Links Sections */}
          {sections.map((section) => (
            <div key={section.title} className="space-y-6">
              <h4 className="font-prompt font-black text-slate-900 text-sm uppercase tracking-widest">{section.title}</h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="flex items-center gap-3 text-slate-600 hover:text-primary transition-all font-semibold text-[15px] group active:scale-95"
                    >
                      <span className="p-2 bg-orange-50/50 rounded-xl group-hover:bg-white group-hover:shadow-lg group-hover:shadow-orange-200/50 group-hover:scale-110 transition-all text-orange-400 group-hover:text-primary border border-orange-100/50 group-hover:border-primary/20">
                        {link.icon}
                      </span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <p className="text-slate-400 text-[13px] font-bold tracking-wide">
              © {currentYear} SUM4SUM5.COM - ALL RIGHTS RESERVED.
            </p>
            <span className="hidden md:block text-slate-200">|</span>
            <span className="text-[11px] font-bold px-2 py-1 bg-slate-50 text-slate-400 rounded-lg border border-slate-100">
              VERSION {version}
            </span>
          </div>
          <div className="flex items-center gap-8 text-slate-400 text-[13px] font-bold">
            <span className="flex items-center gap-2">
              MADE WITH <Sparkles className="w-4 h-4 text-orange-400 fill-orange-400/20" /> IN THAILAND
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
