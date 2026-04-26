'use client';

import React from 'react';
import { Palette } from 'lucide-react';

interface BaseTheme {
  name: string;
  primary: string;
  secondary?: string;
}

interface ThemeSelectorProps<T extends BaseTheme> {
  themes: T[];
  currentTheme: T;
  setCurrentTheme: (theme: T) => void;
  className?: string;
}

export default function ThemeSelector<T extends BaseTheme>({ 
  themes, 
  currentTheme, 
  setCurrentTheme, 
  className = "" 
}: ThemeSelectorProps<T>) {
  return (
    <div className={`flex items-center gap-1 lg:gap-2 p-1 lg:p-1.5 bg-white/40 backdrop-blur-xl border border-white/40 rounded-xl shadow-sm ${className}`}>
      <Palette className="w-3.5 h-3.5 text-slate-400 ml-1 hidden sm:block" />
      <div className="flex gap-1 pr-1 ml-1 sm:ml-0">
        {themes.map((t) => (
          <button
            key={t.name}
            onClick={() => setCurrentTheme(t)}
            className={`w-5 h-5 rounded-full border-2 transition-all ${
              currentTheme.name === t.name 
                ? 'border-primary ring-2 ring-primary/20 scale-110 shadow-md' 
                : 'border-white'
            }`}
            style={{ 
              background: `linear-gradient(135deg, ${t.primary}, ${t.secondary || t.primary})` 
            }}
          />
        ))}
      </div>
    </div>
  );
}
