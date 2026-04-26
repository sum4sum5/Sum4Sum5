'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download } from 'lucide-react';
import { toPng } from 'html-to-image';
import { BaseTheme } from '@/constants/themes';

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: BaseTheme;
  title?: string;
  children: React.ReactNode;
  exportChildren?: React.ReactNode; // Optional: larger content for saved image
  onSave?: () => void;
  captureId?: string;
  extraActions?: React.ReactNode;
  topIcon?: React.ReactNode;
  showOkButton?: boolean;
}

export default function ResultModal({
  isOpen,
  onClose,
  theme,
  title = "CONGRATULATIONS",
  children,
  exportChildren,
  captureId = "result-capture-box",
  extraActions,
  topIcon,
  showOkButton = true
}: ResultModalProps) {
  const saveAsImage = async () => {
    const node = document.getElementById(`${captureId}-export-template`);
    if (!node) return;

    try {
      const dataUrl = await toPng(node, {
        backgroundColor: '#ffffff',
        cacheBust: true,
        style: {
          visibility: 'visible',
          opacity: '1'
        }
      });
      const link = document.createElement('a');
      link.download = `sum4sum5-result-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Save image error:", err);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="relative w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl overflow-visible"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-[100] w-10 h-10 flex items-center justify-center bg-black/10 rounded-full text-slate-800 hover:bg-black/20 transition-all font-bold"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col">
              {/* Visual Content Block (Visible in Modal) */}
              <div className="relative w-full bg-white rounded-t-[2.5rem] overflow-visible flex flex-col shadow-sm">

                {/* Floating Icon Slot (Restored high float) */}
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none w-full flex justify-center">
                  {topIcon}
                </div>

                {/* Visual Header (Ultra Compact) */}
                <div
                  className="relative w-full pt-12 lg:pt-20 pb-6 lg:pb-8 px-6 lg:px-10 flex flex-col items-center justify-center rounded-t-[2.5rem]"
                  style={{
                    background: `linear-gradient(135deg, ${theme.primary}, #ff6b6b, ${theme.primary}aa)`
                  }}
                >
                  <div className="absolute inset-0 bg-white/10 mix-blend-overlay pointer-events-none" />
                  <div className="relative z-10 text-white font-black text-[10px] lg:text-[12px] uppercase tracking-[0.4em] drop-shadow-md opacity-90 mt-12">
                    {title}
                  </div>
                  <div className="absolute bottom-0 left-0 w-full leading-[0] transform translate-y-[1px]">
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-10 lg:h-14 text-white fill-current">
                      <path d="M0,0 C150,110 400,20 600,80 C800,140 1050,40 1200,80 L1200,120 L0,120 Z"></path>
                    </svg>
                  </div>
                </div>

                {/* Content Section (Ultra-Tightened) */}
                <div className="relative w-full bg-white pt-3 pb-4 px-6 lg:px-10 flex flex-col items-center text-center min-h-[130px] justify-center">
                  {children}

                  {/* Branding Footer */}
                  <div className="mt-2 text-slate-300 font-bold text-[8px] lg:text-[9px] tracking-[0.3em] lg:tracking-[0.4em] uppercase flex items-center justify-center gap-3 lg:gap-4 font-prompt opacity-60">
                    <div className="w-6 lg:w-8 h-[1px] bg-slate-100" />
                    สุ่มสี่สุ่มห้า | sum4sum5.com
                    <div className="w-6 lg:w-8 h-[1px] bg-slate-100" />
                  </div>
                </div>
                <div className="h-1.5 w-full" style={{ backgroundColor: theme.primary }} />
              </div>

              {/* Ultra Compact Action Buttons */}
              <div className="px-5 lg:px-10 py-3 lg:py-4 bg-slate-50 rounded-b-[2.5rem] border-t border-slate-100 flex flex-row gap-3">
                {extraActions}
                {showOkButton && (
                  <button
                    onClick={onClose}
                    className="flex-1 py-4 bg-white border border-slate-200 rounded-2xl flex items-center justify-center gap-2 text-slate-500 font-bold hover:bg-slate-100 transition-all active:scale-95 text-sm"
                  >
                    ตกลง
                  </button>
                )}
                <button
                  onClick={saveAsImage}
                  className="flex-1 py-4 text-white rounded-2xl font-black shadow-lg flex items-center justify-center gap-3 text-sm active:scale-95 transition-all hover:brightness-110"
                  style={{ backgroundColor: theme.primary }}
                >
                  <Download className="w-5 h-5" /> บันทึกภาพ
                </button>
              </div>
            </div>
          </motion.div>

          {/* HIDDEN EXPORT TEMPLATE - Exactly 600px for consistent high-quality export */}
          <div className="fixed -top-[9999px] left-0 pointer-events-none opacity-0">
            <div
              id={`${captureId}-export-template`}
              className="w-[600px] bg-white flex flex-col overflow-hidden"
              style={{ fontFamily: 'Prompt, sans-serif' }}
            >
              <div
                className="relative w-full pt-20 pb-16 px-10 flex flex-col items-center justify-center overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${theme.primary}, #ff6b6b, ${theme.primary})`
                }}
              >
                {/* Floating Icon in Export (Removed double scale) */}
                <div className="relative z-50 mb-8 drop-shadow-[0_15px_30px_rgba(0,0,0,0.3)]">
                  {topIcon}
                </div>

                <div className="relative z-10 text-white font-black text-[14px] uppercase tracking-[0.5em] mt-10 drop-shadow-md">
                  {title}
                </div>

                <div className="absolute bottom-0 left-0 w-full leading-[0] transform translate-y-[1px]">
                  <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-24 text-white fill-current">
                    <path d="M0,0 C150,110 400,20 600,80 C800,140 1050,40 1200,80 L1200,120 L0,120 Z"></path>
                  </svg>
                </div>
              </div>

              <div className="relative w-full bg-white pt-10 pb-16 px-10 flex flex-col items-center text-center">
                {/* Use exportChildren for larger display in saved image, fallback to children */}
                {exportChildren ?? children}
                {/* Branding Footer */}
                <div className="mt-2 text-slate-300 font-bold text-[10px] tracking-[0.4em] uppercase flex items-center justify-center gap-4 font-prompt opacity-60">
                  <div className="w-12 h-[2px] bg-slate-100" />
                  สุ่มสี่สุ่มห้า | sum4sum5.com
                  <div className="w-12 h-[2px] bg-slate-100" />
                </div>
              </div>

              <div className="h-4 w-full" style={{ backgroundColor: theme.primary }} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
