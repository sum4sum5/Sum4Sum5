'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import {
  Dices, Sparkles, Heart
} from 'lucide-react';
import confetti from 'canvas-confetti';
import NextImage from 'next/image';
import ThemeSelector from '@/components/shared/ThemeSelector';
import FullscreenButton from '@/components/shared/FullscreenButton';
import SidebarShell from '@/components/shared/SidebarShell';
import Switch from '@/components/shared/Switch';
import ResultModal from '@/components/shared/ResultModal';
import { NUMBER_RANDOMIZER_THEMES } from '@/constants/tool-themes';
import { useIsMobile } from '@/hooks/use-is-mobile';
import { useFullscreen } from '@/hooks/use-fullscreen';
import { logToolUsage } from '@/lib/supabase';

const THEMES = NUMBER_RANDOMIZER_THEMES;

const PRESETS = [
  { id: '1-99', name: '1 - 99', min: 1, max: 99, count: 1 },
  { id: '2-digit', name: 'เลข 2 ตัว', min: 0, max: 99, count: 1 },
  { id: '3-digit', name: 'เลข 3 ตัว', min: 0, max: 999, count: 1 },
  { id: '6-digit', name: 'เลข 6 ตัว', min: 0, max: 999999, count: 1 },
];

const DigitReel = ({ value, isRolling, themeColor, isBig, digitCount }: { value: string, isRolling: boolean, themeColor: string, isBig?: boolean, digitCount: number }) => {
  const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const [unitHeight, setUnitHeight] = useState(128);
  const reelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!reelRef.current) return;
    const updateSize = () => {
      setUnitHeight(reelRef.current?.offsetHeight || 128);
    };
    const observer = new ResizeObserver(updateSize);
    observer.observe(reelRef.current);
    updateSize();
    return () => observer.disconnect();
  }, []);

  const reelWidth = isBig 
    ? (digitCount > 4 ? 'w-[10vw] lg:w-[8.5vw] max-w-[130px] min-w-[35px] lg:min-w-[55px]' : 'w-[11vw] max-w-[170px] min-w-[70px]') 
    : (digitCount > 4 ? 'w-[9vw] max-w-[90px] min-w-[35px]' : 'w-[11vw] max-w-[110px] min-w-[40px]');

  const borderRadius = isBig
    ? (digitCount > 4 ? 'rounded-[0.8rem] lg:rounded-[1.5rem]' : 'rounded-[1.5rem] lg:rounded-[2.5rem]')
    : (digitCount > 4 ? 'rounded-[0.4rem] lg:rounded-[0.8rem]' : 'rounded-[1rem]');

  return (
    <div
      ref={reelRef}
      className={`relative ${reelWidth} aspect-[2/3] bg-white ${borderRadius} shadow-[inset_0_4px_12px_rgba(0,0,0,0.15),0_8px_20px_rgba(0,0,0,0.1)] border-[3px] lg:border-[5px] border-white overflow-hidden mx-0.5 lg:mx-1 shrink`}
    >
      <motion.div
        animate={isRolling
          ? { y: [0, -unitHeight * 10] }
          : { y: -(parseInt(value) || 0) * unitHeight }
        }
        transition={isRolling
          ? { repeat: Infinity, duration: 0.4, ease: "linear" }
          : { type: "spring", stiffness: 120, damping: 14 }
        }
        className="flex flex-col"
      >
        {digits.concat(digits).map((d, i) => (
          <div key={i} className="flex items-center justify-center font-prompt font-black shrink-0" style={{ height: unitHeight, color: themeColor, fontSize: `calc(${unitHeight}px * 0.7)` }}>
            {d}
          </div>
        ))}
      </motion.div>
      <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-b from-black/20 to-transparent z-10" />
      <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-t from-black/20 to-transparent z-10" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/5 via-transparent to-black/5" />
    </div>
  );
};

export default function NumberRandomizer() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(99);
  const [quantity, setQuantity] = useState(1);
  const [allowDuplicates, setAllowDuplicates] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [results, setResults] = useState<number[]>([0]);
  const [isRolling, setIsRolling] = useState(false);
  const [showSettings, setShowSettings] = useState(true);
  const [currentTheme, setCurrentTheme] = useState(THEMES[0]);
  const isMobile = useIsMobile();
  const [selectedPreset, setSelectedPreset] = useState<string | null>('1-99');
  const [showResultModal, setShowResultModal] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { isFullscreen, toggleFullscreen } = useFullscreen(containerRef, {
    onToggle: (active) => {
      if (active && isMobile) setShowSettings(false);
    }
  });
  const leverControls = useAnimation();


  const spin = async () => {
    if (min >= max || isRolling) return;
    setIsRolling(true);
    setShowResultModal(false);
    logToolUsage('สุ่มตัวเลข', { min, max, quantity, allowDuplicates });

    leverControls.start({
      rotateX: [0, 50, 0],
      transition: { duration: 0.4, ease: "easeInOut" }
    });

    const rangeSize = max - min + 1;
    const finalQuantity = Math.min(quantity, allowDuplicates ? 10 : rangeSize);

    const finalResults: number[] = [];
    if (!allowDuplicates) {
      const pool = Array.from({ length: rangeSize }, (_, i) => min + i);
      for (let i = 0; i < finalQuantity; i++) {
        const idx = Math.floor(Math.random() * pool.length);
        finalResults.push(pool.splice(idx, 1)[0]);
      }
    } else {
      for (let i = 0; i < finalQuantity; i++) {
        finalResults.push(Math.floor(Math.random() * (max - min + 1)) + min);
      }
    }

    if (isSorted) finalResults.sort((a, b) => a - b);

    const spinDuration = 2000;
    setTimeout(() => {
      setResults(finalResults);
      setIsRolling(false);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.4 },
        colors: [currentTheme.primary, '#FFFFFF'],
        zIndex: 20000
      });
      setTimeout(() => setShowResultModal(true), 1000);
    }, spinDuration);
  };

  const applyPreset = (preset: typeof PRESETS[0]) => {
    setMin(preset.min);
    setMax(preset.max);
    setQuantity(preset.count);
    setResults([0]);
    setSelectedPreset(preset.id);
  };

  const getPadLength = () => {
    if (selectedPreset === '6-digit' || max >= 100000) return 6;
    if (selectedPreset === '3-digit' || max >= 100) return 3;
    if (selectedPreset === '2-digit' || max >= 10) return 2;
    return 0;
  };

  return (
    <div className="relative flex-1 flex flex-col min-h-0 pt-0 pb-12 overflow-x-hidden">

      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,rgba(249,250,251,0.4)_100%)]" />
      </div>



        <div className="relative flex-1 flex flex-col min-h-0">
          <div
            ref={containerRef}
            className={`flex flex-col lg:flex-row gap-4 lg:gap-8 items-stretch justify-center max-w-7xl mx-auto w-full px-4 relative ${isFullscreen ? 'max-w-none px-0 !gap-0 h-screen overflow-y-auto bg-white z-[9999] pt-0 lg:pt-0 items-center' : ''}`}
          >
            <ResultModal 
              isOpen={showResultModal} 
              onClose={() => setShowResultModal(false)}
              theme={currentTheme}
              title="LUCKY NUMBER IS"
              exportChildren={
                <div className="flex flex-col gap-2 items-center w-full">
                  {results.map((v, i) => {
                    const displayVal = v.toString().padStart(getPadLength(), '0');
                    return (
                      <div
                        key={i}
                        className={`font-prompt font-black text-slate-800 w-full text-center ${
                          displayVal.length > 6 ? 'text-6xl' :
                          displayVal.length > 4 ? 'text-7xl' :
                          displayVal.length > 2 ? 'text-8xl' :
                          'text-9xl'
                        }`}
                      >
                        {displayVal}
                      </div>
                    );
                  })}
                </div>
              }
              topIcon={
                <motion.div
                  initial={{ scale: 0.5, opacity: 0, y: 50, rotate: -10 }}
                  animate={{ scale: 1.6, opacity: 1, y: 0, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", damping: 12, stiffness: 90 }}
                  className="drop-shadow-[0_25px_50px_rgba(0,0,0,0.3)]"
                >
                  <div className="relative w-32 h-32 lg:w-44 lg:h-44 flex items-center justify-center">
                    {/* Floating Decor Particles (Continuous Stream - Balanced & Fainter) */}
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <motion.div
                          initial={{ y: 20, opacity: 0, scale: 0.3, x: 0 }}
                          animate={{ 
                            y: [-20, -100 - (i * 10)], 
                            opacity: [0, 0.4, 0], 
                            scale: [0.3, 0.8, 0.2], 
                            x: [(i - 3.5) * 5, (i - 3.5) * 15 + Math.sin(i) * 10] 
                          }}
                          transition={{ duration: 4 + i * 0.2, repeat: Infinity, delay: i * 0.4, ease: "easeOut" }}
                          className="absolute text-pink-500"
                        >
                          <Heart className="w-3 h-3 fill-current" />
                        </motion.div>
                        <motion.div
                          initial={{ y: 20, opacity: 0, scale: 0.3, x: 0 }}
                          animate={{ 
                            y: [-20, -120 - (i * 8)], 
                            opacity: [0, 0.5, 0], 
                            scale: [0.3, 1, 0.2], 
                            x: [(i - 3.5) * -5, (i - 3.5) * -20 + Math.cos(i) * 15] 
                          }}
                          transition={{ duration: 5 + i * 0.2, repeat: Infinity, delay: i * 0.6, ease: "easeOut" }}
                          className="absolute text-yellow-400"
                        >
                          <Sparkles className="w-4 h-4 fill-current" />
                        </motion.div>
                      </div>
                    ))}

                    <NextImage
                      src="/images/wheel/icon-lucky-draw.png"
                      width={176}
                      height={176}
                      className="w-full h-full object-contain"
                      alt="winner"
                    />
                  </div>
                </motion.div>
              }
            >
              <div className="flex flex-col gap-2 items-center w-full mt-0 py-0 justify-center">
                {results.map((v, i) => {
                  const displayVal = v.toString().padStart(getPadLength(), '0');
                  return (
                    <motion.div
                      key={i}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 + (i * 0.1) }}
                      className={`font-prompt font-black text-slate-800 drop-shadow-sm break-words transition-all duration-300 w-full max-w-xl px-4 text-center ${displayVal.length > 6 ? 'text-4xl' :
                          displayVal.length > 4 ? 'text-5xl' :
                            displayVal.length > 2 ? 'text-6xl' :
                              'text-7xl'
                        }`}
                    >
                      {displayVal}
                    </motion.div>
                  );
                })}
              </div>
            </ResultModal>

            {/* Hidden Export Box (Consistent with Wheel Design) */}
            <div className="fixed -left-[9999px] top-0 pointer-events-none overflow-hidden">
              <div
                id="lucky-number-export-box"
                className="w-[600px] bg-white flex flex-col overflow-hidden"
                style={{ fontFamily: 'Prompt, sans-serif' }}
              >
                {/* Header Section */}
                <div
                  className="relative w-full pt-20 pb-16 px-10 flex flex-col items-center justify-center overflow-visible"
                  style={{
                    background: `linear-gradient(135deg, ${currentTheme.primary}, #ff6b6b, ${currentTheme.primary})`
                  }}
                >
                  {/* Floating Trophy - Scaled for Export */}
                  <div className="relative z-50 mb-10 transform scale-[1.8] drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
                    <div className="w-44 h-44 flex items-center justify-center">
                      <NextImage
                        src="/images/wheel/icon-lucky-draw.png"
                        width={176}
                        height={176}
                        className="w-full h-full object-contain"
                        alt="winner"
                      />
                    </div>
                  </div>

                  <div className="relative z-10 text-white font-black text-[14px] uppercase tracking-[0.5em] mt-12 drop-shadow-md opacity-95">
                    LUCKY NUMBER IS
                  </div>

                  {/* Wave Divider */}
                  <div className="absolute bottom-0 left-0 w-full leading-[0] transform translate-y-[1px]">
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-24 text-white fill-current">
                      <path d="M0,0 C150,110 400,20 600,80 C800,140 1050,40 1200,80 L1200,120 L0,120 Z"></path>
                    </svg>
                  </div>
                </div>

                {/* Content Section */}
                <div className="relative w-full bg-white pt-10 pb-16 px-10 flex flex-col items-center text-center">
                  <div className="flex flex-col gap-4 items-center w-full">
                    {results.map((v, i) => {
                      const displayVal = v.toString().padStart(getPadLength(), '0');
                      return (
                        <div
                          key={i}
                          className={`font-prompt font-black text-slate-800 drop-shadow-sm break-words w-full text-center ${displayVal.length > 6 ? 'text-5xl' :
                              displayVal.length > 4 ? 'text-7xl' :
                                'text-[8.5rem] leading-none'
                            }`}
                        >
                          {displayVal}
                        </div>
                      );
                    })}
                  </div>

                  {/* Footer Branding */}
                  <div className="mt-12 text-slate-300 font-bold text-[12px] tracking-[0.4em] uppercase flex items-center justify-center gap-6 font-prompt opacity-70">
                    <div className="w-12 h-[2px] bg-slate-100" />
                    สุ่มสี่สุ่มห้า | sum4sum5.com
                    <div className="w-12 h-[2px] bg-slate-100" />
                  </div>
                </div>

                {/* Decoration Bar */}
                <div className="h-4 w-full" style={{ background: currentTheme.primary }} />
              </div>
            </div>
            <SidebarShell
              showSettings={showSettings}
              setShowSettings={setShowSettings}
              isMobile={isMobile}
              isFullscreen={isFullscreen}
              currentTheme={currentTheme}
            >
              <div className="space-y-3">
                <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">ช่วงตัวเลขยอดนิยม</span>
                <div className="flex flex-wrap gap-2">
                  {PRESETS.map((p) => {
                    const isActive = selectedPreset === p.id;
                    return (
                      <button
                        key={p.id} onClick={() => applyPreset(p)}
                        className={`text-[12px] font-bold px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 font-prompt ${isActive ? 'bg-slate-900 text-white shadow-lg scale-105' : 'bg-white border border-slate-100 text-slate-500 hover:bg-orange-50'}`}
                      >
                        {p.name}
                        {isActive && <div className="w-1 h-1 bg-primary rounded-full animate-pulse" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3">
                <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">กำหนดช่วงตัวเลข</span>
                <div className="grid grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 px-2 opacity-70">เริ่มจาก</label>
                    <input type="number" value={min} onChange={(e) => setMin(Number(e.target.value))} className="w-full py-2.5 px-4 bg-white border border-slate-100 rounded-2xl outline-none font-black font-prompt text-slate-700 text-center focus:ring-2 focus:ring-primary/20 shadow-sm transition-all text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 px-2 opacity-70">ไปถึง</label>
                    <input type="number" value={max} onChange={(e) => setMax(Number(e.target.value))} className="w-full py-2.5 px-4 bg-white border border-slate-100 rounded-2xl outline-none font-black font-prompt text-slate-700 text-center focus:ring-2 focus:ring-primary/20 shadow-sm transition-all text-sm" />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">การตั้งค่าแสดงผล</span>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-100 shadow-sm">
                    <span className="text-xs font-black text-slate-700 font-prompt">จำนวนที่สุ่ม</span>
                    <div className="flex items-center bg-slate-50 rounded-xl p-0.5">
                      <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-6 h-6 font-black text-slate-400 hover:text-primary transition-colors">-</button>
                      <span className="px-3 font-black text-primary font-prompt text-sm">{quantity}</span>
                      <button onClick={() => setQuantity(Math.min(10, quantity + 1))} className="w-6 h-6 font-black text-slate-400 hover:text-primary transition-all">+</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-1.5">
                    <Switch active={allowDuplicates} label="สุ่มซ้ำได้" onChange={() => setAllowDuplicates(!allowDuplicates)} />
                    <Switch active={isSorted} label="เรียงเลข" onChange={() => setIsSorted(!isSorted)} />
                  </div>
                </div>
              </div>
            </SidebarShell>

            <div className={`flex-1 flex flex-col items-center order-1 lg:order-2 relative ${isFullscreen ? 'justify-center h-full' : 'justify-start pt-0 lg:pt-0'}`}>
              <div className={`w-full flex items-center justify-between px-4 lg:px-10 transition-all duration-500 z-[1000] ${isFullscreen ? 'absolute top-6 lg:top-10 left-0 right-0' : 'mb-2'}`}>
                <ThemeSelector themes={THEMES} currentTheme={currentTheme} setCurrentTheme={setCurrentTheme} />
                <FullscreenButton isFullscreen={isFullscreen} onToggle={toggleFullscreen} />
              </div>

                <motion.div 
                  layout
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className={`relative w-[95%] lg:w-full flex flex-col items-center gap-3 justify-start pt-0 lg:pt-0 ${isFullscreen ? (showSettings ? 'max-w-[820px]' : 'max-w-[950px]') : 'max-w-[620px]'}`}
                >

                <div className="relative w-full flex items-center justify-center py-0">
                  <div id="lucky-machine-capture" className="relative flex-1 rounded-[3rem] lg:rounded-[3.5rem] border border-white shadow-[0_35px_70px_-15px_rgba(0,0,0,0.1)] bg-white md:bg-white/80 md:backdrop-blur-2xl transition-all duration-700 overflow-hidden">
                    <div className={`flex items-center justify-center relative overflow-hidden transition-all duration-500 border-b border-white/20 shadow-lg ${isFullscreen ? 'h-16 lg:h-24' : 'h-12 lg:h-16'}`} style={{ background: `linear-gradient(to bottom, ${currentTheme.machineTop}, ${currentTheme.primary})` }}>
                      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:10px_10px]" />
                      <span className={`text-white font-prompt font-black italic tracking-[0.1em] relative z-20 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] uppercase transition-all ${isFullscreen ? 'text-2xl lg:text-3xl' : 'text-xs lg:text-lg'}`}>
                        LUCKY NUMBER
                      </span>
                      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/20 via-transparent to-transparent z-10" />
                    </div>

                    <div className={`flex-1 flex flex-col items-center justify-center relative overflow-hidden transition-all duration-500 ${isFullscreen ? 'min-h-[250px] lg:min-h-[440px]' : 'min-h-[160px] lg:min-h-[220px]'}`} style={{ backgroundColor: currentTheme.primary }}>
                      <div className={`absolute inset-y-0 flex flex-col justify-center gap-4 lg:gap-6 z-20 ${isFullscreen ? 'left-3 lg:left-14' : 'left-2 lg:left-8'}`}>
                        {[...Array(6)].map((_, i) => (
                          <motion.div
                            key={i}
                            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                            transition={{ repeat: Infinity, duration: 2, delay: i * 0.15 }}
                            className={`${isFullscreen ? 'w-5 h-5 lg:w-7 lg:h-7' : 'w-3 h-3 lg:w-4 lg:h-4'} rounded-full shadow-[0_0_15px_#fff,0_0_5px_#fff]`}
                            style={{ backgroundColor: currentTheme.accent }}
                          />
                        ))}
                      </div>
                      <div className={`absolute inset-y-0 flex flex-col justify-center gap-4 lg:gap-6 z-20 ${isFullscreen ? 'right-3 lg:right-14' : 'right-2 lg:right-8'}`}>
                        {[...Array(6)].map((_, i) => (
                          <motion.div
                            key={i}
                            animate={{ opacity: [1, 0.3, 1], scale: [1.2, 0.8, 1.2] }}
                            transition={{ repeat: Infinity, duration: 2, delay: i * 0.15 }}
                            className={`${isFullscreen ? 'w-5 h-5 lg:w-7 lg:h-7' : 'w-3 h-3 lg:w-4 lg:h-4'} rounded-full shadow-[0_0_15px_#fff,0_0_5px_#fff]`}
                            style={{ backgroundColor: currentTheme.accent }}
                          />
                        ))}
                      </div>
                      <div className="relative w-full flex items-center justify-center py-2 lg:py-4 z-10">
                        <div className={`flex items-center justify-center w-full ${isFullscreen ? 'px-14 lg:px-28' : 'px-12 lg:px-20'}`}>
                          {results.length === 0 ? (
                            <div className="flex flex-col items-center">
                              <motion.div animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 3 }}>
                                <Dices className="w-24 h-24 lg:w-32 lg:h-32 text-white/80 drop-shadow-2xl" />
                              </motion.div>
                              <span className="text-[10px] font-black text-white/40 tracking-[0.4em] font-prompt mt-4 uppercase">READY TO ROLL</span>
                            </div>
                          ) : (
                            <div className="flex flex-col gap-4 lg:gap-6 w-full items-center">
                              {results.map((val, rIdx) => {
                                const padLen = getPadLength();
                                const displayStr = val.toString().padStart(padLen, '0');
                                return (
                                  <motion.div key={rIdx} initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} className={`flex flex-nowrap justify-center items-center ${displayStr.length > 4 ? 'gap-0.5 lg:gap-1.5' : 'gap-1 lg:gap-3'} w-full overflow-visible`}>
                                    {displayStr.split('').map((digit, dIdx) => (
                                      <DigitReel key={`${rIdx}-${dIdx}`} value={digit} isRolling={isRolling} themeColor={currentTheme.primary} isBig={isFullscreen} digitCount={displayStr.length} />
                                    ))}
                                  </motion.div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/20 via-transparent to-black/20 z-10" />
                      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.1)_100%)] z-10" />
                    </div>

                    <div className={`${isFullscreen ? 'h-16 lg:h-26' : 'h-20 lg:h-26'} flex flex-col items-center justify-center p-4 lg:p-6 relative bg-white/30 border-t border-slate-50`}>
                      <button
                        onClick={spin} disabled={isRolling}
                        className="w-full max-w-xs py-3 rounded-[2rem] font-bold text-white text-base lg:text-lg transition-all active:scale-95 shadow-xl disabled:opacity-50 flex flex-col items-center justify-center gap-0 font-prompt italic hover:brightness-105 border-b-4 border-black/10"
                        style={{ backgroundColor: currentTheme.primary, boxShadow: `0 15px 30px -8px ${currentTheme.glow}` }}
                      >
                        <span>{isRolling ? 'ROLLING...' : 'START!'}</span>
                        {!isRolling && <span className="text-[7px] font-bold opacity-70 not-italic uppercase tracking-widest font-prompt">กดเพื่อสุ่มเลข</span>}
                      </button>
                    </div>
                  </div>

                  <div className="w-14 hidden xl:flex flex-col items-center relative -ml-1">
                    <div className="relative w-10 h-16 bg-gradient-to-r from-slate-300 via-slate-100 to-slate-300 rounded-r-3xl border-y-2 border-r-2 border-white/50 shadow-[4px_0_15px_rgba(0,0,0,0.1)] flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.05)_0%,transparent_50%,rgba(0,0,0,0.05)_100%)]" />
                      <div className="w-4 h-4 rounded-full bg-slate-400 shadow-inner relative z-10">
                        <div className="absolute inset-1 rounded-full bg-slate-600 shadow-lg" />
                      </div>
                    </div>
                    <motion.div
                      animate={leverControls}
                      style={{ originY: 1, originX: 0.5 }}
                      className="absolute bottom-[45%] left-1/2 -translate-x-1/2 w-4 flex flex-col items-center cursor-pointer z-50 group"
                      onClick={spin}
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-12 h-12 rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.2),inset_-4px_-4px_12px_rgba(0,0,0,0.3),inset_4px_4px_12px_rgba(255,255,255,0.6)] border-2 border-white/30 relative z-[60]"
                        style={{ backgroundColor: currentTheme.lever, backgroundImage: `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.8) 0%, transparent 60%)` }}
                      >
                        <div className="absolute top-2 left-2 w-3 h-3 bg-white/40 blur-[1px] rounded-full" />
                      </motion.div>
                      <div className="h-28 w-4 bg-gradient-to-r from-slate-400 via-slate-100 to-slate-400 border-x border-white/40 shadow-xl rounded-t-lg -mt-2">
                        <div className="w-full h-full bg-[linear-gradient(transparent_0%,rgba(0,0,0,0.1)_100%)]" />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
      </div>
    </div>
  );
}
