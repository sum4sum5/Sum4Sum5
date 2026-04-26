'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Copy, Check, ShoppingBag, Laugh, Moon, 
  Loader2, Trash2, 
  Dice5, Heart, Image as ImageIcon, Globe, X,
  Plus, Minus
 } from 'lucide-react';
import { generateCaptions } from '@/features/caption/server/actions';
import {
  CAPTION_RANDOM_TOPICS,
  CAPTION_TOPIC_CATEGORIES,
  type CaptionTopicCategory,
} from '@/features/caption/prompt-presets';
import { useIsMobile } from '@/hooks/use-is-mobile';
import { pickRandomItem } from '@/lib/client/random-utils';
import { logToolUsage } from '@/lib/supabase';
import SidebarShell from '@/components/shared/SidebarShell';
import * as htmlToImage from 'html-to-image';

const modes = [
  { id: 'post', label: 'สุ่มแคปชั่น', description: 'สร้างโพสต์โซเชียลให้น่าสนใจ' },
];

const vibes = [
  { id: 'funny', label: 'สายฮา/กวนๆ', icon: <Laugh className="w-4 h-4 text-yellow-500" /> },
  { id: 'flirty', label: 'สายอ่อย', icon: <Heart className="w-4 h-4 text-red-500" /> },
  { id: 'mu-telu', label: 'สายมู/พลังบวก', icon: <Moon className="w-4 h-4 text-purple-500" /> },
  { id: 'online-seller', label: 'สายแม่ค้าออนไลน์', icon: <ShoppingBag className="w-4 h-4 text-pink-500" /> },
];

const platforms = [
  { id: 'general', label: 'ทั่วไป', icon: <Globe className="w-3.5 h-3.5" /> },
  { id: 'facebook', label: 'Facebook', icon: (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
  )},
  { id: 'instagram', label: 'Instagram', icon: (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current stroke-2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
  )},
  { id: 'tiktok', label: 'TikTok', icon: (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.59-5.71-.29-2.63.85-5.21 2.8-7 1.25-.89 2.76-1.45 4.31-1.44.33.01.66.04.98.08v4.01c-.5-.14-1.03-.22-1.56-.21-1.05-.03-2.1.34-2.85 1.05-.75.72-1.15 1.77-1.08 2.81.04 1.05.52 2.05 1.35 2.68.79.64 1.83.89 2.85.74 1.04-.12 1.97-.76 2.49-1.66.33-.53.51-1.15.53-1.78.04-3.55.02-7.1.02-10.65z"/></svg>
  )},
  { id: 'x-twitter', label: 'X', icon: (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.49h2.039L6.486 3.24H4.298l13.311 17.403z"/></svg>
  )},
  { id: 'line', label: 'LINE', icon: (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.59.121.303.079.778.039 1.085l-.171 1.027c-.052.303-.242 1.186 1.039.647 1.281-.54 6.911-4.069 9.428-6.967 1.739-1.907 2.572-3.891 2.572-6.002zm-15.825 3.325c0 .341-.277.618-.618.618h-2.31c-.341 0-.618-.277-.618-.618V8.653c0-.341.277-.618.618-.618h.277c.341 0 .618.277.618.618v3.428h1.415c.341 0 .618.277.618.618v.277zm3.177 0c0 .341-.277.618-.618.618h-.277c-.341 0-.618-.277-.618-.618V8.653c0-.341.277-.618.618-.618h.277c.341 0 .618.277.618.618v4.976zm5.27 0c0 .114-.031.221-.084.316-.06.108-.152.195-.262.253-.1.053-.213.084-.333.084h-.277c-.341 0-.618-.277-.618-.618v-3.411l-1.571 2.062c-.067.087-.168.143-.281.152-.012.001-.023.001-.035.001-.11 0-.211-.039-.29-.103-.079-.064-.132-.158-.139-.264v-4.976c0-.341.277-.618.618-.618h.277c.341 0 .618.277.618.618v3.411l1.571-2.062c.068-.088.169-.144.283-.153.011-.001.022-.001.033-.001.11 0 .211.039.29.103.079.064.132.158.139.264v4.976zm4.195-2.278c0 .341-.277.618-.618.618h-1.415v.855h1.415c.341 0 .618.277.618.618v.277c0 .341-.277.618-.618.618h-2.31c-.341 0-.618-.277-.618-.618V8.653c0-.341.277-.618.618-.618h2.31c.341 0 .618.277.618.618v.277c0 .341-.277.618-.618.618h-1.415v.855h1.415c.341 0 .618.277.618.618v.277z"/></svg>
  )},
];

export default function ContentAssistant() {
  const [topic, setTopic] = useState('');
  const mode = modes[0].id;
  const [vibe, setVibe] = useState(vibes[0].id);
  const [platform, setPlatform] = useState('general');
  const [captions, setCaptions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [showSettings, setShowSettings] = useState(true);
  const isMobile = useIsMobile();
  const [annoyanceLevel, setAnnoyanceLevel] = useState(3);
  const captionLength = 'กลาง';
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedCaptionForShare, setSelectedCaptionForShare] = useState('');
  const [showHashtagsInShare, setShowHashtagsInShare] = useState(true);
  const [shareFontSize, setShareFontSize] = useState(20);
  const cardRef = React.useRef<HTMLDivElement>(null);

  const handleCategoryClick = (cat: CaptionTopicCategory) => {
    setTopic(pickRandomItem(cat.topics));
  };

  const handleRandomTopic = () => {
    setTopic(pickRandomItem(CAPTION_RANDOM_TOPICS));
  };

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setIsLoading(true);
    setCaptions([]);
    
    const selectedVibeLabel = vibes.find(v => v.id === vibe)?.label || vibe;
    const selectedPlatformLabel = platforms.find(p => p.id === platform)?.label || platform;
    logToolUsage('แคปชั่น AI', {
      mode,
      vibe,
      platform,
      topicLength: topic.trim().length,
      annoyanceLevel,
    });
    
    // Call with simplified parameters and annoyance level
    const result = await generateCaptions(topic, selectedVibeLabel, mode, selectedPlatformLabel, 'ทุกเพศ', 'ทุกวัย', '', annoyanceLevel, captionLength);
    
    if (result.captions) {
      setCaptions(result.captions);
    } else {
      alert(result.error || 'เกิดข้อผิดพลาด');
    }
    setIsLoading(false);
  };

  const handleShareToStory = (text: string) => {
    // Ensure hashtags are separated by a double newline
    const formattedText = text.replace(/([^\n])\s*(#[\w\u0E00-\u0E7F]+)/g, '$1\n\n$2');
    setSelectedCaptionForShare(formattedText);
    setShowShareModal(true);
    logToolUsage('แชร์ลง Story', { length: text.length });
  };

  const handleSaveImage = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await htmlToImage.toPng(cardRef.current, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        filter: (node) => {
          const className = (node as HTMLElement).className;
          return typeof className === 'string' ? !className.includes('export-ignore') : true;
        }
      });
      const link = document.createElement('a');
      link.download = `caption-sum4sum5-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      logToolUsage('บันทึกรูปภาพ', { length: selectedCaptionForShare.length });
    } catch (err) {
      console.error('oops, something went wrong!', err);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    logToolUsage('คัดลอกเนื้อหา', { length: text.length });
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="relative flex-1 flex flex-col min-h-0 pt-0 pb-12 overflow-x-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] -left-[5%] w-[400px] h-[400px] rounded-full blur-[120px] bg-orange-400/10" />
        <div className="absolute bottom-[10%] -right-[5%] w-[500px] h-[500px] rounded-full blur-[140px] bg-red-400/5" />
      </div>

      <div className={`flex flex-col lg:flex-row gap-4 lg:gap-8 items-stretch justify-center max-w-7xl mx-auto w-full px-4 relative z-10`}>
        <SidebarShell
          showSettings={showSettings}
          setShowSettings={setShowSettings}
          isMobile={isMobile}
          isFullscreen={false}
          currentTheme={{ primary: '#FF8C00' }} // Standard theme for content assistant
        >
          <div className="space-y-6">
            {/* Platform Selection */}
            <div className="space-y-3">
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">แพลตฟอร์ม</span>
              <div className="grid grid-cols-2 gap-2">
                {platforms.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPlatform(p.id)}
                    className={`text-[12px] font-bold px-3 py-2 rounded-xl transition-all flex items-center gap-2 border ${
                      platform === p.id
                        ? 'bg-slate-900 border-slate-900 text-white shadow-lg scale-105'
                        : 'bg-white border-slate-100 text-slate-500 hover:bg-orange-50'
                    }`}
                  >
                    {p.icon}
                    <span>{p.label}</span>
                    {platform === p.id && <div className="w-1 h-1 bg-primary rounded-full animate-pulse ml-auto" />}
                  </button>
                ))}
              </div>
            </div>



            {/* Vibe Selection */}
            <div className="space-y-3">
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">โทนเสียง (Vibe)</span>
              <div className="grid grid-cols-2 gap-1.5">
                {vibes.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setVibe(v.id)}
                    className={`flex items-center gap-2 py-2 px-3 rounded-lg border transition-all font-bold text-[11px] font-prompt ${
                      vibe === v.id 
                        ? 'bg-orange-50 border-primary text-primary shadow-sm' 
                        : 'bg-white border-slate-100 text-slate-400 hover:bg-slate-50'
                    }`}
                  >
                    {v.icon}
                    {v.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Annoyance Level Slider */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">ระดับความกวน</span>
                <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                  annoyanceLevel <= 2 ? 'bg-green-100 text-green-600' :
                  annoyanceLevel <= 4 ? 'bg-orange-100 text-orange-600' :
                  'bg-red-100 text-red-600 animate-pulse'
                }`}>
                  {annoyanceLevel === 1 ? 'กวนน้อย' : 
                   annoyanceLevel === 2 ? 'กวนนิดๆ' : 
                   annoyanceLevel === 3 ? 'กวนกำลังดี' : 
                   annoyanceLevel === 4 ? 'กวนแสบๆ' : 'กวนประสาท'}
                </span>
              </div>
              <div className="relative pt-1">
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={annoyanceLevel}
                  onChange={(e) => setAnnoyanceLevel(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
                <div className="flex justify-between mt-1 px-1">
                  {[1, 2, 3, 4, 5].map((lvl) => (
                    <div key={lvl} className={`w-1 h-1 rounded-full ${annoyanceLevel >= lvl ? 'bg-orange-400' : 'bg-slate-200'}`} />
                  ))}
                </div>
              </div>
            </div>

            {/* Reset Button */}
            {(platform !== 'general' || vibe !== 'funny' || annoyanceLevel !== 3) && (
              <button
                onClick={() => {
                  setPlatform('general');
                  setVibe('funny');
                  setAnnoyanceLevel(3);
                }}
                className="w-full py-3 text-[11px] font-black text-slate-300 hover:text-red-400 transition-colors font-prompt uppercase tracking-widest border border-dashed border-slate-100 rounded-xl"
              >
                รีเซ็ตการตั้งค่า
              </button>
            )}
          </div>
        </SidebarShell>

        <div className="flex-1 flex flex-col items-center order-1 lg:order-2">
          <div className="w-full max-w-5xl space-y-6">


            {/* Input Section */}
            <div className="bg-white p-6 lg:p-10 rounded-[2rem] lg:rounded-[2.5rem] shadow-xl shadow-slate-200/50 space-y-8 border border-white overflow-hidden relative">
              <div className="space-y-6 relative z-10">
                {/* Popular Categories */}
                <div className="space-y-3">
                   <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] font-prompt flex items-center gap-2">
                     <Sparkles className="w-3 h-3 text-orange-400" /> หมวดหมู่ยอดนิยม
                   </label>
                   <div className="flex flex-wrap gap-2">
                     {CAPTION_TOPIC_CATEGORIES.map((cat) => (
                       <button
                         key={cat.label}
                         onClick={() => handleCategoryClick(cat)}
                         className="px-4 py-2 bg-slate-50 hover:bg-orange-500 hover:text-white text-slate-600 rounded-xl text-[12px] font-bold font-prompt border border-slate-100 hover:border-orange-400 transition-all active:scale-95 shadow-sm"
                       >
                         {cat.label}
                       </button>
                     ))}
                   </div>
                </div>

                {/* Dynamic Title Field */}
                <div className="space-y-3">
                  <label className="text-[12px] font-black text-slate-800 uppercase tracking-widest font-prompt">
                    สถานการณ์/หัวข้อที่อยากได้
                  </label>
                  <div className="relative">
                    <input 
                      type="text"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="เช่น แอบชอบคนมีเจ้าของ, ลาออกวันละร้อยรอบ..."
                      className="w-full pl-5 lg:pl-6 pr-14 py-5 lg:py-6 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 ring-primary/20 transition-all font-prompt text-[16px] lg:text-[18px] text-slate-800 shadow-inner"
                      maxLength={150}
                    />
                    <button
                      onClick={handleRandomTopic}
                      disabled={isLoading}
                      className={`absolute right-2 top-1/2 -translate-y-1/2 p-3.5 rounded-xl shadow-lg transition-all active:scale-90 group ${
                        isLoading 
                          ? 'bg-slate-100 text-slate-300 cursor-not-allowed shadow-none' 
                          : 'bg-gradient-to-br from-orange-400 to-red-500 text-white shadow-orange-200/50 hover:shadow-orange-300'
                      }`}
                      title="สุ่มหัวข้อ"
                    >
                      <Dice5 className={`w-5 h-5 transition-transform duration-500 ${isLoading ? '' : 'group-hover:rotate-180'}`} />
                    </button>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleGenerate}
                disabled={isLoading || !topic}
                className={`w-full h-16 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl font-black font-prompt text-lg flex items-center justify-center gap-3 transition-all shadow-xl shadow-orange-200 group ${
                  isLoading || !topic 
                    ? 'opacity-40 cursor-not-allowed pointer-events-none' 
                    : 'hover:opacity-90 active:scale-[0.98]'
                }`}
              >
                {isLoading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-yellow-300" />
                    <span>สุ่มแคปชั่นให้เลย!</span>
                  </>
                )}
              </button>
            </div>              
            
            {/* Results Section */}
            <AnimatePresence mode="wait">
              {isLoading && captions.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="py-12 flex flex-col items-center space-y-4"
                >
                  <div className="relative flex flex-col items-center">
                    <motion.div 
                      animate={{ 
                        y: [0, -15, 0],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center shadow-lg shadow-orange-200 mb-6"
                    >
                       <Sparkles className="w-10 h-10 text-white" />
                    </motion.div>
                    
                    <div className="w-64 h-2 bg-slate-100 rounded-full overflow-hidden mb-6 relative">
                       <motion.div 
                         initial={{ x: "-100%" }}
                         animate={{ x: "100%" }}
                         transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                         className="h-full w-1/2 bg-gradient-to-r from-transparent via-primary to-transparent"
                       />
                    </div>
                    
                    <div className="text-center">
                      <p className="text-slate-800 font-black font-prompt text-xl">กำลังเสกคำคม...</p>
                      <p className="text-slate-400 text-sm font-bold font-prompt mt-1">วิเคราะห์ความกวนระดับ {annoyanceLevel}/5</p>
                    </div>
                  </div>
                </motion.div>
              ) : captions.length > 0 ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-4 px-2">
                    <div className="h-px flex-1 bg-slate-100" />
                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest font-prompt">เลือกผลลัพธ์ที่โดนใจที่สุด</span>
                    <div className="h-px flex-1 bg-slate-100" />
                  </div>

                  <div className="flex flex-col gap-8 relative pb-12">
                    {captions.slice(0, 3).map((cap, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.15, type: "spring", stiffness: 100 }}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        className="group relative bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-white hover:border-orange-300 transition-all flex flex-col lg:flex-row overflow-hidden min-h-[180px] hover:shadow-2xl hover:shadow-orange-200/30"
                      >
                        {/* Style Indicator Side */}
                        <div className="w-full lg:w-20 bg-slate-50 flex lg:flex-col items-center justify-center gap-2 p-4 lg:p-0 border-b lg:border-b-0 lg:border-r border-slate-100">
                          <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest font-prompt lg:[writing-mode:vertical-lr]">สไตล์ที่ {idx + 1}</span>
                          <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm">
                             <span className="text-[10px] font-black text-orange-400">0{idx + 1}</span>
                          </div>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 p-8 lg:p-10 flex flex-col justify-center">
                          <p className="text-slate-700 leading-relaxed font-kanit whitespace-pre-line text-[16px] lg:text-[18px]">
                            {cap}
                          </p>
                        </div>
                        
                        {/* Actions Side */}
                        <div className="w-full lg:w-64 p-6 lg:p-8 bg-slate-50/50 flex flex-col justify-center gap-3 border-t lg:border-t-0 lg:border-l border-slate-100">
                          <button 
                            onClick={() => copyToClipboard(cap, idx)}
                            className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-[13px] font-prompt transition-all ${
                              copiedIndex === idx 
                                ? 'bg-green-500 text-white scale-105 shadow-lg shadow-green-200' 
                                : 'bg-slate-900 text-white hover:bg-black hover:shadow-lg shadow-slate-200'
                            }`}
                          >
                            {copiedIndex === idx ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            {copiedIndex === idx ? 'คัดลอกสำเร็จ!' : 'คัดลอกข้อความ'}
                          </button>
                          
                          <button 
                            className="w-full flex items-center justify-center gap-2 py-4 bg-white text-orange-600 border border-orange-100 rounded-2xl font-black text-[13px] font-prompt transition-all hover:bg-orange-500 hover:text-white active:scale-[0.98] shadow-sm hover:shadow-orange-200"
                            onClick={() => handleShareToStory(cap)}
                          >
                            <ImageIcon className="w-4 h-4" />
                            สร้างรูปภาพเพื่อแชร์
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex items-center justify-center py-4">
                    <button 
                      onClick={() => setCaptions([])} 
                      className="flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-red-50 text-[11px] font-black text-slate-400 hover:text-red-500 border border-slate-100 hover:border-red-100 rounded-xl transition-all font-prompt active:scale-95 shadow-sm hover:shadow-md"
                    >
                      <Trash2 className="w-4 h-4" /> ล้างผลลัพธ์ทั้งหมด
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className="py-10 text-center"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-slate-50 to-slate-100 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-inner relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-red-500/10 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Dice5 className="w-10 h-10 text-slate-300 group-hover:text-orange-400 group-hover:rotate-45 transition-all duration-500" />
                  </div>
                  <h3 className="text-slate-400 font-black font-prompt uppercase tracking-widest text-[14px] lg:text-[16px]">ลองพิมพ์อะไรสักนิด แล้วกดปุ่มสุ่มได้เลย!</h3>
                  <p className="text-slate-300 text-[11px] font-bold font-prompt mt-2">ใส่สถานการณ์หรือหัวข้อที่คุณต้องการให้ AI ช่วยสุ่มแคปชั่น</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      {/* Share to Story Modal */}
      <AnimatePresence>
        {showShareModal && (
          <>
            {/* Global Hide Overrides */}
            <style dangerouslySetInnerHTML={{ __html: `
              nav, 
              .ad-container, 
              .ad-banner, 
              .sticky-ad-container, 
              aside, 
              [class*="SidebarShell_toggle"], 
              button[class*="absolute top-1/2 -translate-y-1/2"] { 
                display: none !important; 
              }
            `}} />
            
            <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowShareModal(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white rounded-[2rem] lg:rounded-[2.5rem] shadow-2xl overflow-hidden max-w-[580px] w-full my-auto"
            >
              {/* Close Button (X) */}
              <button 
                onClick={() => setShowShareModal(false)}
                className="absolute top-4 right-4 z-[100] w-9 h-9 bg-slate-100/80 backdrop-blur-md rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-all hover:rotate-90 shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Preview Area (1:1 Square) */}
              <div className="p-4 lg:p-6">
                <div 
                  ref={cardRef}
                  className="bg-gradient-to-br from-[#FF8C00] via-[#FF5F1F] to-[#E63946] p-4 lg:p-6 rounded-[2rem] shadow-2xl w-full aspect-square relative overflow-hidden flex flex-col items-center justify-center"
                >
                  {/* Decorative background elements */}
                  <div className="absolute top-[-10%] right-[-10%] w-48 h-48 bg-white/10 rounded-full blur-3xl" />
                  <div className="absolute bottom-[-5%] left-[-5%] w-40 h-40 bg-black/5 rounded-full blur-2xl" />
                  
                  {/* The White Content Box */}
                  <div className="bg-white/95 backdrop-blur-xl p-4 lg:p-6 rounded-[1.5rem] shadow-2xl w-full max-h-[92%] relative z-10 flex flex-col items-center justify-center overflow-hidden">
                    {/* Floating Edit Indicator (Corner) */}
                    <div className="absolute top-4 right-4 w-7 h-7 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-lg z-30 animate-pulse pointer-events-none border-2 border-white export-ignore">
                      <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                    </div>

                    {/* Decorative Quote Icon */}
                    <div className="mb-2 relative z-10 flex flex-col items-center shrink-0">
                       <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-orange-500/20">
                          <path d="M11.192 15.757c0-4.074 1.282-6.563 3.974-7.615l.504.99c-1.76.681-2.481 2.022-2.481 3.811 0 .68.35 1.05.68 1.05 1.07 0 1.84.81 1.84 1.81 0 1.31-1.05 2.2-2.17 2.2-1.35 0-2.347-1.02-2.347-2.246zm-7.192 0c0-4.074 1.282-6.563 3.974-7.615l.504.99c-1.76.681-2.481 2.022-2.481 3.811 0 .68.35 1.05.68 1.05 1.07 0 1.84.81 1.84 1.81 0 1.31-1.05 2.2-2.17 2.2-1.35 0-2.347-1.02-2.347-2.246z"></path>
                       </svg>
                       <div className="mt-1.5 flex items-center gap-1.5 text-[9px] font-black font-prompt text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full border border-slate-100 shadow-sm export-ignore">
                          <Dice5 className="w-2.5 h-2.5 text-orange-500" />
                          แตะที่ข้อความเพื่อแก้ไข
                       </div>
                    </div>

                    <div className="relative w-full overflow-y-auto hide-scrollbar flex flex-col items-center">
                      <div className="w-full py-1">
                        {/* Main Caption Textarea */}
                        <textarea 
                          value={selectedCaptionForShare.split(/#[\w\u0E00-\u0E7F]+/)[0].trim()}
                          onChange={(e) => {
                            const hashtags = selectedCaptionForShare.match(/#[\w\u0E00-\u0E7F]+/g) || [];
                            setSelectedCaptionForShare(e.target.value + '\n\n' + hashtags.join(' '));
                          }}
                          className="w-full bg-transparent border-none focus:ring-0 text-slate-800 font-kanit font-bold leading-[1.6] tracking-tight relative z-10 text-center resize-none p-0 overflow-hidden"
                          placeholder="พิมพ์ข้อความที่นี่..."
                          rows={1}
                          style={{ fontSize: `${shareFontSize}px` }}
                          ref={(el) => {
                            if (el) {
                              el.style.height = 'auto';
                              el.style.height = `${el.scrollHeight}px`;
                            }
                          }}
                          onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement;
                            target.style.height = 'auto';
                            target.style.height = `${target.scrollHeight}px`;
                          }}
                        />

                        {/* Hashtags Section (Smaller and Lighter) */}
                        {showHashtagsInShare && (
                          <div className="mt-4 pt-4 border-t border-slate-200/30">
                            <textarea 
                              value={(selectedCaptionForShare.match(/#[\w\u0E00-\u0E7F]+/g) || []).join(' ')}
                              onChange={(e) => {
                                const mainText = selectedCaptionForShare.split(/#[\w\u0E00-\u0E7F]+/)[0].trim();
                                setSelectedCaptionForShare(mainText + '\n\n' + e.target.value);
                              }}
                              className="w-full bg-transparent border-none focus:ring-0 text-slate-400 font-kanit text-[14px] lg:text-[15px] font-medium leading-[1.6] tracking-tight relative z-10 text-center resize-none p-0 overflow-hidden"
                              placeholder="#แฮทแท็ก"
                              rows={1}
                              ref={(el) => {
                                if (el) {
                                  el.style.height = 'auto';
                                  el.style.height = `${el.scrollHeight}px`;
                                }
                              }}
                              onInput={(e) => {
                                const target = e.target as HTMLTextAreaElement;
                                target.style.height = 'auto';
                                target.style.height = `${target.scrollHeight}px`;
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 w-12 h-0.5 bg-slate-100 rounded-full opacity-50 relative z-10" />
                    
                    <div className="mt-4 flex flex-col items-center gap-2 relative z-10">
                       <div className="flex items-center gap-2 px-4 py-1.5 bg-slate-50 rounded-full border border-slate-100/50 shadow-sm">
                         <div className="w-5 h-5 bg-gradient-to-br from-orange-400 to-orange-600 rounded-md flex items-center justify-center text-white text-[11px] font-black font-kanit shadow-sm">
                            ส
                         </div>
                         <span className="text-[12px] font-black font-prompt text-slate-500 tracking-tight flex items-center gap-1.5">
                           <span>สุ่มสี่<span className="text-orange-500">สุ่มห้า</span></span>
                           <span className="opacity-20">|</span>
                           <span className="text-slate-400">sum4sum5.com</span>
                         </span>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-4 lg:px-8 lg:py-5 bg-white border-t border-slate-50 space-y-4">
                {/* Control Options */}
                <div className="flex flex-wrap items-center justify-between gap-4 export-ignore px-1">
                  {/* Font Size Adjuster */}
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-prompt">ขนาดตัวอักษร</span>
                    <div className="flex items-center bg-slate-50 p-1 rounded-2xl border border-slate-100">
                      <button 
                        onClick={() => setShareFontSize(Math.max(12, shareFontSize - 2))}
                        className="w-9 h-9 flex items-center justify-center bg-white rounded-xl shadow-sm text-slate-400 hover:text-orange-500 hover:shadow-md active:scale-90 transition-all"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <div className="w-10 flex flex-col items-center">
                        <span className="font-black text-slate-700 font-prompt text-[16px]">{shareFontSize}</span>
                      </div>
                      <button 
                        onClick={() => setShareFontSize(Math.min(48, shareFontSize + 2))}
                        className="w-9 h-9 flex items-center justify-center bg-white rounded-xl shadow-sm text-slate-400 hover:text-orange-500 hover:shadow-md active:scale-90 transition-all"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Hashtag Switch */}
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-prompt">แสดง HASHTAG</span>
                    <button 
                      onClick={() => setShowHashtagsInShare(!showHashtagsInShare)}
                      className={`w-12 h-6 rounded-full relative transition-all duration-500 ${showHashtagsInShare ? 'bg-gradient-to-r from-orange-500 to-red-600 shadow-lg shadow-orange-100' : 'bg-slate-200'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-500 shadow-sm ${showHashtagsInShare ? 'left-7' : 'left-1'}`} />
                    </button>
                  </div>
                </div>

                <button 
                  onClick={handleSaveImage}
                  className="w-full py-5 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-[1.5rem] font-black font-prompt text-[16px] shadow-xl shadow-orange-100 hover:shadow-orange-300 hover:-translate-y-0.5 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                >
                  <ImageIcon className="w-6 h-6" />
                  บันทึกเป็นรูปภาพ
                </button>
              </div>
            </motion.div>
          </div>
        </>
        )}
      </AnimatePresence>
    </div>
  </div>
  );
}
