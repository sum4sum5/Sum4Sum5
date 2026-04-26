'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, ChevronLeft } from 'lucide-react';

interface SidebarShellProps {
  showSettings: boolean;
  setShowSettings: (show: boolean) => void;
  isMobile: boolean;
  isFullscreen: boolean;
  currentTheme: { primary: string };
  children: React.ReactNode;
}

export default function SidebarShell({
  showSettings,
  setShowSettings,
  isMobile,
  isFullscreen,
  currentTheme,
  children
}: SidebarShellProps) {
  return (
    <>
      {/* Sidebar Toggle Button (Desktop) */}
      <button
        onClick={() => setShowSettings(!showSettings)}
        className={`hidden lg:flex absolute top-1/2 -translate-y-1/2 z-[110] w-11 h-28 shadow-[0_15px_35px_-5px_rgba(255,107,0,0.4)] rounded-2xl items-center justify-center text-white transition-all duration-500 group overflow-hidden border border-white/20 ${!showSettings ? 'left-8' : 'left-[448px]'}`}
        style={{
          background: `linear-gradient(to bottom, ${currentTheme.primary}, ${currentTheme.primary}cc)`,
          boxShadow: `0 15px 35px -5px ${currentTheme.primary}66`
        }}
      >
        <div className="relative flex items-center justify-center w-full h-full">
          {showSettings ? (
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1.5 transition-transform duration-300 drop-shadow-md" />
          ) : (
            <Settings className="w-6 h-6 animate-spin-slow group-hover:rotate-180 transition-transform duration-700 drop-shadow-md" />
          )}
        </div>
      </button>

      {/* Sidebar Panel */}
      <div className={`transition-all duration-500 order-2 lg:order-1 py-4 lg:py-0 ${showSettings ? "w-full lg:w-[440px] shrink-0" : "w-full lg:w-0 h-auto lg:h-auto"}`}>
        <AnimatePresence mode="popLayout" initial={false}>
          {(showSettings || (isMobile && !isFullscreen)) && (
            <motion.div
              initial={isMobile ? false : { opacity: 0, x: -20, width: 0 }}
              animate={{ opacity: 1, x: 0, width: isMobile ? '100%' : 440 }}
              exit={{ opacity: 0, x: -20, width: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className={`w-full lg:w-[440px] flex flex-col self-stretch shrink-0 h-full z-[100] ${isFullscreen ? 'relative' : ''}`}
            >
              <div className={`${isFullscreen ? 'bg-white shadow-2xl' : 'bg-white/70 lg:bg-white/40 backdrop-blur-3xl lg:backdrop-blur-xl'} rounded-[2.5rem] lg:rounded-[3.5rem] p-2 lg:p-3 border border-white flex flex-col h-full overflow-hidden shadow-2xl`}>
                <div className="flex-1 flex flex-col space-y-4 lg:space-y-4 p-4 lg:p-6 h-full min-h-[400px] lg:min-h-[600px] overflow-y-auto custom-scrollbar">
                  {children}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
