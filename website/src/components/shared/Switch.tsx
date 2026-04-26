'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SwitchProps {
  active: boolean;
  label: string;
  onChange: () => void;
  className?: string;
}

export default function Switch({ active, label, onChange, className = "" }: SwitchProps) {
  return (
    <div className={`flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-100 shadow-sm ${className}`}>
      <span className="text-xs font-black text-slate-700 font-prompt">{label}</span>
      <button
        onClick={onChange}
        className={`w-10 h-6 rounded-full relative transition-all duration-300 ${active ? 'bg-slate-900' : 'bg-slate-200'}`}
      >
        <motion.div
          animate={{ x: active ? 18 : 2 }}
          className="w-4.5 h-4.5 bg-white rounded-full absolute top-0.5 shadow-sm"
        />
      </button>
    </div>
  );
}
