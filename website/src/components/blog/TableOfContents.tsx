'use client';

import React, { useState, useEffect } from 'react';

interface TOCItem {
  id: string;
  title: string;
}

interface TableOfContentsProps {
  items: TOCItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0% 0% -80% 0%', threshold: 0 }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  return (
    <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
      <h4 className="font-prompt font-black text-xl text-slate-800 flex items-center gap-3">
        <div className="w-1.5 h-6 bg-orange-500 rounded-full" />
        สรุปหัวข้อสำคัญ
      </h4>
      <nav className="space-y-1">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <a 
              key={item.id}
              href={`#${item.id}`} 
              className={`block p-3 text-sm font-medium rounded-xl transition-all no-underline ${
                isActive 
                ? 'text-orange-600 bg-orange-50 translate-x-1 shadow-sm' 
                : 'text-slate-500 hover:text-orange-600 hover:bg-orange-50/50'
              }`}
            >
              <div className="flex items-center gap-3">
                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />}
                <span>{item.title}</span>
              </div>
            </a>
          );
        })}
      </nav>
    </div>
  );
}
