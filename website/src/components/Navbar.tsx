'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Dices, Sparkles, Users, Home, FerrisWheel, Menu, X, ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: 'หน้าแรก', href: '/', icon: <Home className="w-5 h-5" /> },
    { name: 'วงล้อสุ่ม', href: '/wheel', icon: <FerrisWheel className="w-5 h-5" /> },
    { name: 'สุ่มเลข', href: '/random-number', icon: <Dices className="w-5 h-5" /> },
    { name: 'สุ่มรายชื่อ', href: '/random-name', icon: <Users className="w-5 h-5" /> },
    { name: 'แคปชั่น AI', href: '/random-caption', icon: <Sparkles className="w-5 h-5" /> },
  ];

  return (
    <nav className="sticky top-0 z-[10000] px-4 py-2">
      <div className="max-w-7xl mx-auto glass rounded-3xl px-6 py-3 flex items-center justify-between shadow-sm border border-white/50 relative">
        <Link href="/" className="flex items-center gap-2 group active:scale-95 transition-transform">
          <div className="w-10 h-10 orange-gradient rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-inner group-hover:rotate-12 transition-transform shadow-orange-200">
            ส
          </div>
          <span className="font-prompt font-bold text-xl tracking-tight">
            สุ่มสี่<span className="text-primary text-2xl font-black">สุ่มห้า</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-1 font-medium">
          {menuItems.map((item) => (
            <NavLink key={item.href} href={item.href} icon={item.icon} active={pathname === item.href}>
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Action Buttons & Mobile Toggle */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2.5 bg-orange-50 text-primary rounded-2xl transition-all active:scale-90"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden rounded-[2.5rem]"
              />
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-[calc(100%+12px)] left-0 right-0 p-4 bg-white/95 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/50 lg:hidden flex flex-col gap-2 overflow-hidden z-50"
              >
                {menuItems.map((item, idx) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between px-5 py-4 rounded-2xl transition-all active:scale-[0.98] active:opacity-80 ${
                        pathname === item.href 
                          ? 'bg-orange-500 text-white shadow-lg shadow-orange-200' 
                          : 'bg-white border border-slate-100 text-slate-600'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className={pathname === item.href ? 'text-white' : 'text-orange-500'}>
                          {item.icon}
                        </span>
                        <span className="font-prompt font-bold">{item.name}</span>
                      </div>
                      <ChevronRight className={`w-5 h-5 opacity-50 ${pathname === item.href ? 'text-white' : ''}`} />
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

const NavLink = ({ href, children, icon, active }: { href: string; children: React.ReactNode; icon: React.ReactNode; active: boolean }) => (
  <Link 
    href={href} 
    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all group font-prompt font-bold text-[14px] active:scale-95 ${
      active 
        ? 'text-orange-600 bg-orange-50 shadow-sm border border-orange-100' 
        : 'text-slate-600 hover:bg-orange-50 hover:text-primary border border-transparent'
    }`}
  >
    <span className={`transition-transform group-hover:scale-110 ${active ? 'text-orange-600' : 'text-orange-500'}`}>
      {icon}
    </span>
    <span>{children}</span>
  </Link>
);

export default Navbar;
