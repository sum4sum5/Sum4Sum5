'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Sparkles, Trash2, Trophy, LayoutGrid, Heart, Star, Box, RefreshCcw, User, Gift
} from 'lucide-react';
import confetti from 'canvas-confetti';
import NextImage from 'next/image';
import ThemeSelector from '@/components/shared/ThemeSelector';
import FullscreenButton from '@/components/shared/FullscreenButton';
import SidebarShell from '@/components/shared/SidebarShell';
import Switch from '@/components/shared/Switch';
import ResultModal from '@/components/shared/ResultModal';
import { NAME_RANDOMIZER_THEMES } from '@/constants/tool-themes';
import { useIsMobile } from '@/hooks/use-is-mobile';
import { shuffleArray } from '@/lib/client/random-utils';
import { logToolUsage } from '@/lib/supabase';

import { useFullscreen } from '@/hooks/use-fullscreen';

const THEMES = NAME_RANDOMIZER_THEMES;

type Mode = 'winner' | 'teams';

const DEFAULT_NAMES = [
  'สมชาย',
  'สมหญิง',
  'มานี',
  'ชูใจ',
  'ปิติ',
  'มานะ',
  'วีระ',
  'สมศักดิ์',
  'สมใจ',
  'จรัญ'
];

export default function NameRandomizer() {
  const [namesText, setNamesText] = useState('');
  const [mode, setMode] = useState<Mode>('winner');
  const [winnerCount, setWinnerCount] = useState(1);
  const [groupCount, setGroupCount] = useState(2);
  const [removeWinner, setRemoveWinner] = useState(false);

  const [results, setResults] = useState<string[]>([]);
  const [groups, setGroups] = useState<string[][]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const [showSettings, setShowSettings] = useState(true);
  const [currentTheme, setCurrentTheme] = useState(THEMES[0]);
  const isMobile = useIsMobile();
  const [showResultModal, setShowResultModal] = useState(false);
  const [rollingName, setRollingName] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { isFullscreen, toggleFullscreen } = useFullscreen(containerRef, {
    onToggle: (active) => {
      if (active && isMobile) setShowSettings(false);
    }
  });

  const names = namesText.split('\n').map(n => n.trim()).filter(n => n !== '');

  useEffect(() => {
    queueMicrotask(() => {
      setIsMounted(true);
      const saved = localStorage.getItem('randomizer_names');
      if (saved && saved.trim() !== '') {
        setNamesText(saved);
      } else {
        setNamesText(DEFAULT_NAMES.join('\n'));
      }
    });
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('randomizer_names', namesText);
    }
  }, [namesText, isMounted]);


  const spin = async () => {
    if (names.length === 0 || isRolling) return;
    setIsRolling(true);
    setShowResultModal(false);
    logToolUsage('สุ่มรายชื่อ', { names: names.length, mode, winners: winnerCount });

    // Optimized interval for mobile performance
    const rollSpeed = isMobile ? 100 : 70;
    const interval = setInterval(() => {
      setRollingName(names[Math.floor(Math.random() * names.length)]);
    }, rollSpeed);

    setTimeout(() => {
      clearInterval(interval);
      const shuffled = shuffleArray(names);

      if (mode === 'winner') {
        const finalWinners = shuffled.slice(0, Math.min(winnerCount, shuffled.length));
        setResults(finalWinners);
        setGroups([]);

        if (removeWinner) {
          const remaining = names.filter(n => !finalWinners.includes(n));
          setNamesText(remaining.join('\n'));
        }
      } else {
        const teamResults: string[][] = Array.from({ length: groupCount }, () => []);
        shuffled.forEach((name, i) => {
          teamResults[i % groupCount].push(name);
        });
        setGroups(teamResults);
        setResults([]);
      }

      setIsRolling(false);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.4 },
        colors: [currentTheme.primary, '#FFFFFF'],
        zIndex: 20000
      });
      
      // Auto-show the beautiful result popup after a brief moment
      setTimeout(() => {
        setShowResultModal(true);
      }, 800);
    }, 2500);
  };

  return (
    <div className="relative flex-1 flex flex-col min-h-0 pt-0 pb-12 overflow-x-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{ x: [0, 60, 0], y: [0, 40, 0] }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="absolute top-[5%] -left-[5%] w-[600px] h-[600px] rounded-full blur-[140px] transition-colors duration-1000 opacity-60"
          style={{ backgroundColor: currentTheme.bgGlow1 }}
        />
        <motion.div
          animate={{ x: [0, -60, 0], y: [0, -40, 0] }} transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="absolute bottom-[5%] -right-[5%] w-[700px] h-[700px] rounded-full blur-[160px] transition-colors duration-1000 opacity-50"
          style={{ backgroundColor: currentTheme.bgGlow2 }}
        />
      </div>

      <div className="relative flex-1 flex flex-col min-h-0">
        <div
          ref={containerRef}
          className={`flex flex-col lg:flex-row gap-4 lg:gap-8 items-stretch justify-center max-w-7xl mx-auto w-full px-4 relative ${isFullscreen ? 'max-w-none px-0 !gap-0 h-screen overflow-y-auto bg-white z-[9999] pt-0 lg:pt-0' : ''}`}
        >

          <SidebarShell
            showSettings={showSettings}
            setShowSettings={setShowSettings}
            isMobile={isMobile}
            isFullscreen={isFullscreen}
            currentTheme={currentTheme}
          >
            {/* 1. Mode Selection - Segmented Control Style */}
            <div className="space-y-2">
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 px-1">โหมดการสุ่ม</span>
              <div className="flex p-1 bg-slate-100 rounded-2xl border border-slate-200/50">
                <button 
                  onClick={() => setMode('winner')}
                  className={`flex-1 py-3 px-2 rounded-xl font-black text-[11px] uppercase tracking-wider transition-all flex items-center justify-center gap-2 group outline-none border ${mode === 'winner' ? 'bg-white text-primary shadow-sm border-slate-100' : 'text-slate-500 hover:text-primary hover:bg-white/50 border-transparent'}`}
                >
                  <Trophy className={`w-3.5 h-3.5 transition-colors ${mode === 'winner' ? 'text-primary' : 'text-slate-400 group-hover:text-primary'}`} />
                  สุ่มผู้ชนะ
                </button>
                <button 
                  onClick={() => setMode('teams')}
                  className={`flex-1 py-3 px-2 rounded-xl font-black text-[11px] uppercase tracking-wider transition-all flex items-center justify-center gap-2 group outline-none border ${mode === 'teams' ? 'bg-white text-primary shadow-sm border-slate-100' : 'text-slate-500 hover:text-primary hover:bg-white/50 border-transparent'}`}
                >
                  <LayoutGrid className={`w-3.5 h-3.5 transition-colors ${mode === 'teams' ? 'text-primary' : 'text-slate-400 group-hover:text-primary'}`} />
                  แบ่งกลุ่ม
                </button>
              </div>
            </div>

            {/* 2. Mode Specific Settings */}
            <div className="space-y-3">
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 px-1">การตั้งค่าผลลัพธ์</span>
              <div className="space-y-2">
                {mode === 'winner' ? (
                  <>
                    <div className="flex items-center justify-between p-3 bg-white rounded-2xl border border-slate-100 shadow-sm">
                      <span className="text-xs font-black text-slate-700 font-prompt">จำนวนผู้ชนะ</span>
                      <div className="flex items-center bg-slate-50 rounded-xl p-0.5">
                        <button onClick={() => setWinnerCount(Math.max(1, winnerCount - 1))} className="w-8 h-8 font-black text-slate-400 hover:text-primary transition-colors">-</button>
                        <span className="px-4 font-black text-primary font-prompt text-sm">{winnerCount}</span>
                        <button onClick={() => setWinnerCount(Math.min(names.length || 1, winnerCount + 1))} className="w-8 h-8 font-black text-slate-400 hover:text-primary transition-colors">+</button>
                      </div>
                    </div>
                    <div className="px-1">
                      <Switch active={removeWinner} label="ลบชื่อผู้ชนะออกจากรายการอัตโนมัติ" onChange={() => setRemoveWinner(!removeWinner)} />
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-between p-3 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <span className="text-xs font-black text-slate-700 font-prompt">จำนวนกลุ่ม</span>
                    <div className="flex items-center bg-slate-50 rounded-xl p-0.5">
                      <button onClick={() => setGroupCount(Math.max(2, groupCount - 1))} className="w-8 h-8 font-black text-slate-400 hover:text-primary transition-colors">-</button>
                      <span className="px-4 font-black text-primary font-prompt text-sm">{groupCount}</span>
                      <button onClick={() => setGroupCount(Math.min(names.length || 2, groupCount + 1))} className="w-8 h-8 font-black text-slate-400 hover:text-primary transition-colors">+</button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 3. Name List Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">รายชื่อผู้ร่วมลุ้น</span>
              </div>
              <div className="relative group">
                <textarea
                  value={namesText}
                  onChange={(e) => setNamesText(e.target.value)}
                  placeholder="วางรายชื่อที่นี่ (1 ชื่อต่อบรรทัด)..."
                  className="w-full h-72 lg:h-[420px] p-6 bg-white/50 border-2 border-slate-100 rounded-[2.5rem] focus:border-primary/30 outline-none font-kanit text-[16px] shadow-inner text-slate-800 leading-relaxed resize-none custom-scrollbar transition-all"
                />
                <div className="absolute bottom-6 right-6 px-3 py-1 bg-slate-50 rounded-full text-[10px] font-black text-slate-400">
                  {names.length} รายชื่อ
                </div>
              </div>
            </div>
            {/* Clear Button - Bottom aligned */}
            {names.length > 0 && (
              <button
                onClick={() => setNamesText('')}
                className="w-full py-4 bg-red-50 text-[11px] font-black uppercase text-red-500 hover:bg-red-100 transition-all rounded-2xl border border-dashed border-red-200 flex items-center justify-center gap-2 mt-2"
              >
                <Trash2 className="w-4 h-4" /> ล้างรายชื่อทั้งหมด
              </button>
            )}
          </SidebarShell>

          <motion.div
            className={`flex-1 flex flex-col items-center order-1 lg:order-2 relative transition-all duration-500 ${isFullscreen ? 'justify-center h-full' : 'justify-start pt-0 lg:pt-0 min-w-0'}`}
          >
            <div className={`w-full flex items-center justify-between px-4 lg:px-10 transition-all duration-500 z-[1000] ${isFullscreen ? 'absolute top-6 lg:top-10 left-0 right-0' : 'mb-2'}`}>
              <ThemeSelector themes={THEMES} currentTheme={currentTheme} setCurrentTheme={setCurrentTheme} />
              <FullscreenButton isFullscreen={isFullscreen} onToggle={toggleFullscreen} />
            </div>

            <div
              className={`bg-white/80 backdrop-blur-2xl rounded-[3rem] lg:rounded-[3.5rem] py-8 lg:py-12 px-6 lg:px-14 border border-white relative flex flex-col items-center justify-center shadow-[0_35px_70px_-15px_rgba(0,0,0,0.1)] transition-all duration-700 w-full ${isFullscreen ? '!border-none !rounded-0 !bg-transparent !shadow-none !p-0' : ''}`}
            >
              <motion.div
                id="results-board-container"
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className={`relative w-full flex flex-col items-center gap-10 justify-center ${isFullscreen ? (showSettings ? 'max-w-[850px]' : 'max-w-[1000px]') : (showSettings ? 'max-w-[800px]' : 'max-w-[850px]')}`}
              >
                <div className="relative w-full aspect-[4/3] lg:aspect-[1.6/1] flex flex-col items-center justify-center">

                  <div className="absolute inset-0 bg-white/40 backdrop-blur-3xl rounded-[3.5rem] border-4 border-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] overflow-hidden">
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                      {isMounted && [...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{
                            y: [0, -40, 0],
                            opacity: [0.1, 0.4, 0.1],
                            scale: [1, 1.2, 1]
                          }}
                          transition={{
                            duration: 5 + i,
                            repeat: Infinity,
                            delay: i * 0.7
                          }}
                          className="absolute text-primary"
                          style={{
                            top: `${((i * 13 + 7) % 90) + 5}%`,
                            left: `${((i * 17 + 3) % 90) + 5}%`,
                          }}
                        >
                          <Star className="w-6 h-6 fill-current" />
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-10">
                    <AnimatePresence mode="wait">
                      {isRolling ? (
                        <motion.div
                          key="rolling"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1.2 }}
                          className="flex flex-col items-center gap-6"
                        >
                          <div className="relative w-32 h-32 lg:w-44 lg:h-44">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                              className="absolute inset-0 rounded-full border-[10px]"
                              style={{ borderColor: `${currentTheme.primary}1a` }}
                            />
                            <motion.div
                              animate={{ rotate: -360 }}
                              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                              className="absolute inset-0 rounded-full border-t-[10px]"
                              style={{ 
                                borderTopColor: currentTheme.primary,
                                filter: `drop-shadow(0 0 20px ${currentTheme.primary}66)`
                              }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <motion.div
                                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 0.5, repeat: Infinity }}
                              >
                                <Gift 
                                  className="w-16 h-16 lg:w-24 lg:h-24 drop-shadow-xl" 
                                  style={{ color: currentTheme.primary }}
                                />
                              </motion.div>
                            </div>
                          </div>
                          <div className="space-y-2 text-center w-full max-w-full overflow-hidden min-w-0 flex flex-col items-center">
                            <div 
                              className="text-sm font-black uppercase tracking-widest animate-pulse"
                              style={{ color: `${currentTheme.primary}99` }}
                            >
                              กำลังสุ่มหาผู้โชคดี...
                            </div>
                            <div className="w-full max-w-[95%] overflow-hidden min-w-0">
                              <div 
                                className="text-3xl lg:text-5xl font-prompt font-black drop-shadow-sm italic py-2 truncate text-center"
                                style={{ color: currentTheme.primary, lineHeight: '1.2' }}
                              >
                                {rollingName}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ) : (results.length === 0 && groups.length === 0) ? (
                        <motion.div
                          key="ready"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex flex-col items-center gap-10"
                        >
                          <div className="text-center space-y-2">
                            <div 
                              className="text-2xl lg:text-4xl font-prompt font-black uppercase tracking-tight inline-block"
                              style={{ 
                                backgroundImage: `linear-gradient(to bottom, ${currentTheme.primary}, ${currentTheme.primary}dd)`,
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                color: currentTheme.primary,
                                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.05))'
                              }}
                            >
                              พร้อมหาผู้โชคดีหรือยัง?
                            </div>
                            <p className="text-slate-400 font-bold text-xs lg:text-sm">เตรียมรายชื่อให้พร้อม แล้วกดปุ่มเพื่อลุ้นภาพประกาศผลสุดเท่!</p>
                          </div>

                          <button
                            onClick={spin}
                            disabled={names.length === 0}
                            className={`group relative w-48 h-48 lg:w-64 lg:h-64 flex items-center justify-center transition-all active:scale-95 disabled:opacity-30 disabled:grayscale`}
                          >
                            <div 
                              className="absolute inset-0 blur-[60px] rounded-full animate-pulse group-hover:scale-125 transition-all duration-700" 
                              style={{ backgroundColor: `${currentTheme.primary}33` }} 
                            />

                            <div
                              className="relative w-full h-full rounded-full bg-white border-8 border-white shadow-[0_30px_60px_-12px_rgba(0,0,0,0.15)] flex flex-col items-center justify-center overflow-hidden group-hover:scale-105 transition-all duration-500"
                            >
                              <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                                <Box className="w-full h-full rotate-12 scale-150" />
                              </div>

                              <div
                                className="w-32 h-32 lg:w-44 lg:h-44 rounded-full flex flex-col items-center justify-center text-white shadow-2xl relative overflow-hidden group-hover:shadow-primary/40 transition-all duration-500"
                                style={{ background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.primary}dd)` }}
                              >
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.4)_0%,transparent_70%)]" />
                                <Gift className="w-10 h-10 lg:w-14 lg:h-14 mb-1 drop-shadow-xl animate-bounce-slow" />
                                <div className="flex flex-col items-center leading-none">
                                  <span className="font-prompt font-black text-xl lg:text-3xl italic tracking-tighter">START</span>
                                  <span className="mt-2 text-[8px] lg:text-[10px] font-black uppercase tracking-[0.2em] opacity-80 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    กดเพื่อเริ่มสุ่ม
                                  </span>
                                </div>
                              </div>
                            </div>
                          </button>
                        </motion.div>
                      ) : (results.length > 0 || groups.length > 0) ? (
                        <motion.div
                          key="results-celebration"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="w-full flex flex-col items-center gap-6 lg:gap-8 py-4 relative"
                        >
                          {/* Export Branding (Hidden) */}
                          <div className="hidden absolute bottom-0 left-0 right-0 items-center justify-between px-8 py-4 opacity-30">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-white text-xs font-black">ส</div>
                              <span className="text-sm font-black text-slate-800 font-prompt">สุ่มสี่สุ่มห้า</span>
                            </div>
                            <span className="text-xs font-bold text-slate-400">Sum4Sum5.com</span>
                          </div>
                          {/* 1. Header with Celebration Style */}
                          <div className="text-center relative flex flex-col items-center justify-center w-full">
                            {/* Modern Aura Glow */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-80 h-80 pointer-events-none">
                              <motion.div 
                                animate={{ 
                                  scale: [1, 1.1, 1],
                                  opacity: [0.15, 0.25, 0.15] 
                                }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute inset-0 rounded-full blur-[80px]"
                                style={{ background: `radial-gradient(circle, ${currentTheme.primary} 0%, transparent 70%)` }}
                              />
                              
                              {/* Subtle Modern Streaks */}
                              <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 opacity-[0.08]"
                                style={{
                                  background: `conic-gradient(from 0deg, transparent 0deg, ${currentTheme.primary} 45deg, transparent 90deg, ${currentTheme.primary} 135deg, transparent 180deg, ${currentTheme.primary} 225deg, transparent 270deg, ${currentTheme.primary} 315deg, transparent 360deg)`,
                                  WebkitMaskImage: 'radial-gradient(circle, black 20%, transparent 80%)',
                                  maskImage: 'radial-gradient(circle, black 20%, transparent 80%)'
                                }}
                              />
                            </div>

                            <motion.div
                              initial={{ scale: 0, rotate: -30 }}
                              animate={{ scale: 1, rotate: 0 }}
                              className="relative w-20 h-20 lg:w-28 lg:h-28 bg-white/20 backdrop-blur-xl rounded-[2.5rem] flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.1)] mb-6 mx-auto z-10 border border-white/40 overflow-hidden"
                            >
                              {/* Inner Background Glow */}
                              <div 
                                className="absolute inset-0 opacity-90" 
                                style={{ background: `linear-gradient(to bottom right, ${currentTheme.primary}, ${currentTheme.primary}dd)` }}
                              />
                              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.4)_0%,transparent_70%)]" />
                              
                              <motion.div
                                animate={{ 
                                  y: [0, -8, 0],
                                  rotate: [0, 5, -5, 0]
                                }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                              >
                                <Trophy className="w-10 h-10 lg:w-14 lg:h-14 text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.2)]" />
                              </motion.div>
                              
                              {/* Floating Particles - Refined */}
                              {[...Array(6)].map((_, i) => (
                                <motion.div
                                  key={i}
                                  animate={{ 
                                    scale: [1, 1.4, 1],
                                    opacity: [0.2, 0.5, 0.2],
                                    y: [0, i % 2 === 0 ? -30 : 30, 0]
                                  }}
                                  transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.7 }}
                                  className="absolute w-1 h-1 rounded-full bg-white/60"
                                  style={{
                                    top: `${20 + (i * 15)}%`,
                                    left: `${15 + (i * 15)}%`
                                  }}
                                />
                              ))}
                            </motion.div>
                            <h2 className="text-2xl lg:text-4xl font-black text-slate-800 font-prompt tracking-tight">
                              {mode === 'winner' ? 'สุ่มเสร็จเรียบร้อย!' : 'แบ่งกลุ่มสำเร็จ!'}
                            </h2>
                            <p className="text-slate-400 font-bold font-prompt text-xs lg:text-sm mt-1">
                              {mode === 'winner' ? 'ขอแสดงความยินดีกับผู้โชคดีทุกท่านครับ 🎉' : 'จัดสรรสมาชิกเข้ากลุ่มเรียบร้อยแล้วครับ 📋'}
                            </p>
                          </div>

                          {/* 2. Results Content */}
                          <div 
                            id="results-capture-area"
                            className="w-full bg-slate-50/50 backdrop-blur-sm rounded-[3rem] p-4 lg:p-8 border border-slate-100 shadow-inner overflow-hidden max-h-[600px] flex flex-col transition-all duration-500 [.exporting-mode_&]:max-h-none [.exporting-mode_&]:bg-white"
                          >
                            <div className="flex items-center justify-between mb-6 px-2">
                              <div className="flex items-center gap-2">
                                <div 
                                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                                  style={{ backgroundColor: `${currentTheme.primary}1a` }}
                                >
                                  {mode === 'winner' ? <Trophy className="w-4 h-4" style={{ color: currentTheme.primary }} /> : <LayoutGrid className="w-4 h-4" style={{ color: currentTheme.primary }} />}
                                </div>
                                <span className="text-xs lg:text-sm font-black uppercase tracking-widest text-slate-400">
                                  {mode === 'winner' ? 'รายชื่อผู้โชคดี' : 'ผลการแบ่งกลุ่ม'}
                                </span>
                              </div>
                              <div className="text-xs lg:text-sm font-black text-slate-300 uppercase tracking-widest">
                                {mode === 'winner' ? `${results.length} รางวัล` : `${groups.length} กลุ่ม`}
                              </div>
                            </div>

                            <div className="overflow-y-auto pr-1 scrollbar-hide">
                              {mode === 'winner' ? (
                                <div className="grid grid-cols-1 gap-4">
                                  {results.map((name, i) => (
                                    <motion.div
                                      key={i}
                                      initial={{ opacity: 0, x: -20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: i * 0.1 }}
                                      className="relative group"
                                    >
                                      <div 
                                        className="absolute -inset-0.5 rounded-2xl blur opacity-10 group-hover:opacity-30 transition duration-300"
                                        style={{ background: `linear-gradient(to right, ${currentTheme.primary}, ${currentTheme.primary}aa)` }}
                                      ></div>
                                      <div className="relative flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                                        <div 
                                          className="w-10 h-10 shrink-0 rounded-xl flex items-center justify-center text-white shadow-lg"
                                          style={{ 
                                            background: `linear-gradient(to bottom right, ${currentTheme.primary}, ${currentTheme.primary}dd)`,
                                            boxShadow: `0 10px 20px ${currentTheme.primary}33`
                                          }}
                                        >
                                          <User className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1 min-w-0 py-1">
                                          <p className="text-[10px] lg:text-xs font-black text-slate-400 uppercase tracking-wider mb-0.5">Winner #{i + 1}</p>
                                          <p className="text-lg lg:text-2xl font-black text-slate-800 font-prompt truncate" style={{ lineHeight: '1.5' }}>
                                            {name}
                                          </p>
                                        </div>
                                      </div>
                                    </motion.div>
                                  ))}
                                </div>
                              ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                  {groups.map((team, i) => (
                                    <motion.div
                                      key={i}
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: i * 0.1 }}
                                      className="flex flex-col bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden"
                                    >
                                      <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                                        <span className="font-black text-slate-700 text-sm lg:text-lg font-prompt uppercase tracking-widest flex items-center gap-2.5">
                                          <div 
                                            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                                            style={{ backgroundColor: `${currentTheme.primary}15` }}
                                          >
                                            <Users className="w-4 h-4 lg:w-4.5 lg:h-4.5" style={{ color: currentTheme.primary }} />
                                          </div>
                                          กลุ่มที่ {i + 1}
                                        </span>
                                        <span className="px-3 py-1 rounded-full bg-slate-200 text-[10px] lg:text-xs font-black text-slate-500 uppercase">{team.length} คน</span>
                                      </div>
                                      <div className="p-4 grid grid-cols-1 gap-2">
                                        {team.map((name, j) => (
                                          <div 
                                            key={j} 
                                            className="bg-white px-3 py-2 rounded-2xl flex items-center gap-3 border border-slate-50 shadow-sm transition-all hover:translate-x-1 w-full"
                                          >
                                            <div 
                                              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-md text-white"
                                              style={{ background: `linear-gradient(to bottom right, ${currentTheme.primary}, ${currentTheme.primary}dd)` }}
                                            >
                                              <User className="w-4 h-4" />
                                            </div>
                                            <span className="text-sm lg:text-base font-bold text-slate-700 font-prompt truncate flex-1" style={{ lineHeight: '1.4' }}>
                                              {name}
                                            </span>
                                          </div>
                                        ))}
                                      </div>
                                    </motion.div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* 3. Footer Action Buttons */}
                          <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
                            <button
                              onClick={spin}
                              className="w-full sm:w-auto px-14 py-4 text-white rounded-2xl font-black text-sm font-prompt flex items-center justify-center gap-3 hover:shadow-lg transition-all active:scale-95 shadow-xl"
                              style={{ 
                                background: `linear-gradient(to right, ${currentTheme.primary}, ${currentTheme.primary}dd)`,
                                boxShadow: `0 10px 25px ${currentTheme.primary}44`
                              }}
                            >
                              <RefreshCcw className="w-5 h-5 animate-spin-slow" />
                              สุ่มอีกรอบ
                            </button>
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                </div>

              </motion.div>

            </div>
          </motion.div>

          <ResultModal
            isOpen={showResultModal}
            onClose={() => setShowResultModal(false)}
            theme={currentTheme}
            captureId="name-randomizer"
            title={mode === 'winner' ? 'THE WINNER IS' : 'THE GROUPS ARE'}
            exportChildren={
              <div className="w-full flex flex-col items-center">
                {mode === 'winner' ? (
                  results.map((name, i) => (
                    <div key={i} className="flex flex-col items-center w-full">
                      <p className={`font-prompt font-black text-slate-800 break-words w-full text-center leading-tight mb-8 ${name.length > 20 ? 'text-4xl' : 'text-6xl'}`}>
                        {name}
                      </p>
                      <div className="w-24 h-[1px] bg-slate-100 mb-8 last:hidden" />
                    </div>
                  ))
                ) : (
                  <div className="grid grid-cols-1 gap-8 w-full">
                    {groups.map((team, i) => (
                      <div key={i} className="flex flex-col items-center w-full">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="h-[1px] w-8 bg-slate-100" />
                          <span className="text-sm font-black text-slate-300 uppercase tracking-widest">Team {i + 1}</span>
                          <div className="h-[1px] w-8 bg-slate-100" />
                        </div>
                        <div className="flex flex-wrap justify-center gap-3 w-full">
                          {team.map((name, j) => (
                            <div key={j} className="bg-slate-50 px-5 py-2 rounded-2xl border border-slate-100">
                              <span className="text-xl font-black text-slate-700">{name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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
                  {/* Floating Decor Particles (Sync with Wheel/Number) */}
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
            <div className="w-full flex flex-col items-center">
              {mode === 'winner' ? (
                results.map((name, i) => (
                  <div key={i} className="text-4xl lg:text-5xl font-black text-slate-800 text-center mb-2">
                    {name}
                  </div>
                ))
              ) : (
                <div className="w-full max-h-[40vh] overflow-y-auto custom-scrollbar px-4">
                  {groups.map((team, i) => (
                    <div key={i} className="mb-6 last:mb-0">
                      <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2 text-center">Team {i + 1}</div>
                      <div className="flex flex-wrap justify-center gap-2">
                        {team.map((name, j) => (
                          <span key={j} className="bg-slate-50 px-3 py-1 rounded-full text-sm font-bold text-slate-600 border border-slate-100">{name}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ResultModal>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
