'use client';

import React from 'react';
import Link from 'next/link';
import { FerrisWheel, Dices, Users, Sparkles, Mail, ShieldCheck, FileText, Info } from 'lucide-react';
import { version } from '../../package.json';

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const YoutubeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.46 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.89 23 12 23 12s0-3.89-.46-5.58z"/><path d="m9.75 15.02 5.75-3.02-5.75-3.02v6.04z"/></svg>
);

const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

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
        { name: 'รู้จักสุ่มสี่สุ่มห้า', href: '/about', icon: <Info className="w-4 h-4" /> },
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
            <div className="flex items-center gap-4">
              <SocialLink href="#" icon={<FacebookIcon />} label="Facebook" />
              <SocialLink href="#" icon={<YoutubeIcon />} label="Youtube" />
              <SocialLink href="#" icon={<GithubIcon />} label="Github" />
            </div>
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
                      className="flex items-center gap-3 text-slate-500 hover:text-primary transition-colors font-semibold text-[15px] group"
                    >
                      <span className="p-2 bg-slate-50 rounded-xl group-hover:bg-orange-50 group-hover:scale-110 transition-all text-slate-400 group-hover:text-primary border border-slate-100">
                        {link.icon}
                      </span>
                      {link.name}
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

const SocialLink = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => (
  <Link 
    href={href} 
    aria-label={label}
    className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-white hover:text-primary hover:shadow-xl hover:shadow-orange-200 transition-all active:scale-90"
  >
    {icon}
  </Link>
);

export default Footer;
