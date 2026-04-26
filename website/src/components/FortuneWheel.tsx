'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Shuffle, ArrowDownAz, Image as ImageIcon, Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import NextImage from 'next/image';
import { logToolUsage } from '@/lib/supabase';
import ThemeSelector from '@/components/shared/ThemeSelector';
import FullscreenButton from '@/components/shared/FullscreenButton';
import SidebarShell from '@/components/shared/SidebarShell';
import ResultModal from '@/components/shared/ResultModal';
import { FORTUNE_WHEEL_THEMES } from '@/constants/tool-themes';
import { useIsMobile } from '@/hooks/use-is-mobile';
import { shuffleArray } from '@/lib/client/random-utils';
import { useFullscreen } from '@/hooks/use-fullscreen';

const PRESETS = [
  { name: 'วันนี้กินอะไรดี?', items: ['ส้มตำ', 'กะเพรา', 'ยำแซ่บ', 'ต้มยำ', 'ข้าวผัด'] },
  { name: 'ไปเที่ยวไหนดี?', items: ['ห้างสรรพสินค้า', 'ทะเลสุดชิล', 'ขึ้นเขาไปดอย', 'คาเฟ่ถ่ายรูป', 'สวนสาธารณะ', 'วัดทำบุญ'] },
  { name: 'วันนี้ทำอะไรดี?', items: ['ดูหนัง Netflix', 'พักผ่อนนอนยาว', 'อ่านหนังสือดอง', 'ออกกำลังกาย', 'เล่นเกมกับเพื่อน'] },
  { name: 'เกมบทลงโทษ', items: ['วิดพื้น 5 ที', 'ดื่มน้ำ 1 แก้ว', 'เป่ายิ้งฉุบ', 'ร้องเพลง', 'เต้นไก่ย่าง'] },
  { name: 'เอาไงดีกับเรื่องนี้?', items: ['ลุยเลย!', 'พักก่อน', 'รอจังหวะหน้า', 'ถามเพื่อนดู', 'เปลี่ยนแผน'] },
];

const THEMES = FORTUNE_WHEEL_THEMES;

interface WheelOption {
  text: string;
  image?: string;
}

export default function FortuneWheel() {
  const [options, setOptions] = useState<WheelOption[]>(PRESETS[0].items.map(t => ({ text: t })));
  const [selectedPreset, setSelectedPreset] = useState<string | null>(PRESETS[0].name);
  const [newOption, setNewOption] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<WheelOption | null>(null);
  const [soundEnabled] = useState(true);
  const [currentTheme, setCurrentTheme] = useState(THEMES[0]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');
  const [isBulkMode, setIsBulkMode] = useState(true);
  const [bulkText, setBulkText] = useState(PRESETS[0].items.join('\n'));
  const [showSettings, setShowSettings] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wheelContainerRef = useRef<HTMLDivElement>(null);
  const imageCache = useRef<Map<string, HTMLImageElement>>(new Map());
  const lastSliceRef = useRef<number>(-1);
  const rotationRef = useRef(0);
  const isMobile = useIsMobile();

  const { isFullscreen, toggleFullscreen } = useFullscreen(wheelContainerRef, {
    onToggle: (active) => {
      if (active && isMobile) setShowSettings(false);
    }
  });

  const shuffleOptions = () => {
    const shuffled = shuffleArray(options);
    setOptions(shuffled);
    setBulkText(shuffled.map(o => o.text).join('\n'));
    setSelectedPreset('กำหนดเอง');
  };

  const sortOptions = () => {
    const sorted = [...options].sort((a, b) => a.text.localeCompare(b.text, 'th'));
    setOptions(sorted);
    setBulkText(sorted.map(o => o.text).join('\n'));
    setSelectedPreset('กำหนดเอง');
  };

  const syncFromBulk = (text: string) => {
    setBulkText(text);
    const lines = text.split('\n').map(l => l.trim()).filter(l => l !== '');
    // Preserve existing images if names match, or just create new ones
    setOptions(lines.map(line => {
      const existing = options.find(o => o.text === line);
      return { text: line, image: existing?.image };
    }));
    setSelectedPreset('กำหนดเอง');
  };

  const handleImageUpload = (index: number, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const updated = [...options];
      updated[index] = { ...updated[index], image: dataUrl };
      setOptions(updated);

      // Clear cache for this image to force redrawing
      if (dataUrl) {
        const img = new Image();
        img.onload = () => {
          imageCache.current.set(dataUrl, img);
          drawWheel();
        };
        img.src = dataUrl;
      }
    };
    reader.readAsDataURL(file);
  };

  const playTick = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const audioCtx = new AudioContextClass();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.type = 'triangle';
      oscillator.frequency.setValueAtTime(600, audioCtx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(10, audioCtx.currentTime + 0.05);
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.05);
    } catch {
      // Ignore audio errors on unsupported browsers/devices.
    }
  }, [soundEnabled]);

  const drawWheel = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = canvas.width;
    const center = size / 2;
    const radius = center - 40;
    const rotation = rotationRef.current;
    const sliceAngle = (2 * Math.PI) / options.length;

    ctx.clearRect(0, 0, size, size);

    ctx.beginPath();
    ctx.arc(center, center, radius + 25, 0, 2 * Math.PI);
    const outerGradient = ctx.createLinearGradient(0, 0, size, size);
    outerGradient.addColorStop(0, currentTheme.ring);
    outerGradient.addColorStop(1, currentTheme.colors[0]);
    ctx.fillStyle = outerGradient;
    ctx.shadowColor = 'rgba(0,0,0,0.2)';
    ctx.shadowBlur = 15;
    ctx.fill();

    const dotCount = Math.max(options.length * 2, 16);
    const bulbDistance = radius + 12.5;
    for (let i = 0; i < dotCount; i++) {
      const baseAngle = (i * (2 * Math.PI / dotCount));
      const angle = baseAngle + rotation;
      const dotX = center + bulbDistance * Math.cos(angle);
      const dotY = center + bulbDistance * Math.sin(angle);
      ctx.beginPath();
      ctx.arc(dotX, dotY, 4.5, 0, 2 * Math.PI);
      const bulbGrad = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, 4.5);
      bulbGrad.addColorStop(0, '#fff');
      bulbGrad.addColorStop(1, (i % 2 === 0) ? '#fff' : 'rgba(255,255,255,0.6)');
      ctx.fillStyle = bulbGrad;
      if (isSpinning) {
        const flicker = Math.sin(rotation * 10 + i) > 0;
        if (flicker) { ctx.shadowColor = '#fff'; ctx.shadowBlur = 15; } else { ctx.shadowBlur = 0; }
      }
      ctx.fill();
    }
    ctx.shadowBlur = 0;

    options.forEach((option, i) => {
      const startAngle = i * sliceAngle + rotation;
      const endAngle = (i + 1) * sliceAngle + rotation;

      ctx.beginPath();
      ctx.fillStyle = currentTheme.colors[i % currentTheme.colors.length];
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius, startAngle, endAngle);
      ctx.fill();

      // Draw Image if exists and cached
      if (option.image) {
        const img = imageCache.current.get(option.image);
        if (img) {
          ctx.save();
          ctx.translate(center, center);
          ctx.rotate(startAngle + sliceAngle / 2);

          const imgDist = radius * 0.42; // Moved closer to center to give more room for labels
          const imgSize = Math.min(90, radius * 0.22 + 15); // Standardized size (Increased for better visibility)

          // Subtle Glow/Background for Image
          ctx.beginPath();
          ctx.arc(imgDist, 0, imgSize / 2 + 3, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255,255,255,0.25)';
          ctx.fill();

          // Clip to Circle
          ctx.save();
          ctx.beginPath();
          ctx.arc(imgDist, 0, imgSize / 2, 0, Math.PI * 2);
          ctx.clip();
          ctx.drawImage(img, imgDist - imgSize / 2, -imgSize / 2, imgSize, imgSize);
          ctx.restore();
          ctx.restore();
        }
      }

      const sliceGrad = ctx.createRadialGradient(center, center, 0, center, center, radius);
      sliceGrad.addColorStop(0, 'rgba(255,255,255,0.15)');
      sliceGrad.addColorStop(1, 'rgba(0,0,0,0.1)');
      ctx.fillStyle = sliceGrad;
      ctx.fill();

      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.textAlign = 'right';

      // Intelligent font scaling based on item count and text length
      let baseSize = 22;
      if (options.length <= 3) baseSize = 48;
      else if (options.length <= 6) baseSize = 34;
      else if (options.length <= 12) baseSize = 26;

      let fontSize = baseSize;
      const lengthThreshold = options.length <= 6 ? 6 : 10;
      if (option.text.length > lengthThreshold) {
        fontSize = Math.max(12, baseSize - (option.text.length - lengthThreshold) * 1.5);
      }
      ctx.font = `bold ${fontSize}px Prompt, Kanit, sans-serif`;

      ctx.fillStyle = 'white';
      ctx.shadowColor = 'rgba(0,0,0,0.5)';
      ctx.shadowBlur = 6;

      // Adjust text position if image exists to prevent overlap
      const textDist = option.image ? radius - 15 : radius - 45;
      ctx.fillText(option.text, textDist, fontSize / 3);
      ctx.restore();
    });

    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 2;
    options.forEach((_, i) => {
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.lineTo(center + radius * Math.cos(i * sliceAngle + rotation), center + radius * Math.sin(i * sliceAngle + rotation));
      ctx.stroke();
    });

    ctx.beginPath();
    ctx.arc(center, center, 65, 0, 2 * Math.PI);
    const grad = ctx.createRadialGradient(center, center, 0, center, center, 65);
    grad.addColorStop(0, currentTheme.button);
    grad.addColorStop(1, currentTheme.ring);
    ctx.fillStyle = grad;
    ctx.shadowBlur = 15;
    ctx.shadowColor = 'rgba(0,0,0,0.4)';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(center, center, 55, 0, 2 * Math.PI);
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 5;
    ctx.stroke();
  }, [options, currentTheme]);

  useEffect(() => {
    if (document.fonts) {
      document.fonts.ready.then(() => drawWheel());
    } else {
      drawWheel();
    }
  }, [drawWheel]);

  const spin = () => {
    if (isSpinning || options.length < 2) return;
    setIsSpinning(true);
    setWinner(null);
    logToolUsage('วงล้อสุ่ม', { options: options.length, theme: currentTheme.name });
    const spinRotation = Math.random() * 1440 + 1440;
    const duration = 8500;
    const start = performance.now();
    const initialRotation = rotationRef.current;
    const animate = (time: number) => {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 4);
      const currentRotation = initialRotation + (spinRotation * (Math.PI / 180)) * easedProgress;
      rotationRef.current = currentRotation;
      drawWheel();
      
      const sliceAngle = (2 * Math.PI) / options.length;
      const currentSlice = Math.floor((currentRotation % (2 * Math.PI)) / sliceAngle);
      if (currentSlice !== lastSliceRef.current) { lastSliceRef.current = currentSlice; playTick(); }
      if (progress < 1) { requestAnimationFrame(animate); } else {
        setIsSpinning(false);
        const totalRotation = currentRotation % (2 * Math.PI);
        const wheelAngleAtPointer = (1.5 * Math.PI - totalRotation + 2 * Math.PI * 10) % (2 * Math.PI);
        const winningIndex = Math.floor(wheelAngleAtPointer / sliceAngle);
        setWinner(options[winningIndex]);
        confetti({
          particleCount: isMobile ? 100 : 250,
          spread: isMobile ? 70 : 100,
          origin: { y: 0.6 },
          colors: currentTheme.colors,
          zIndex: 20000
        });
      }
    };

    requestAnimationFrame(animate);
  };

  const addOption = () => {
    if (newOption.trim()) {
      const updated = [...options, { text: newOption.trim() }];
      setOptions(updated);
      setBulkText(updated.map(o => o.text).join('\n'));
      setNewOption('');
      setSelectedPreset('กำหนดเอง');
    }
  };



  return (
    <div className="relative flex-1 flex flex-col min-h-0 pt-0 pb-12 overflow-x-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-orange-400/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-red-400/10 rounded-full blur-[100px]" />
      </div>

      <div
        ref={wheelContainerRef}
        className={`flex flex-col lg:flex-row gap-2 lg:gap-8 items-stretch justify-center max-w-7xl mx-auto w-full px-4 min-h-[600px] lg:min-h-[700px] relative ${isFullscreen ? 'max-w-none px-0 !gap-0 h-screen overflow-y-auto bg-white z-[9999]' : ''}`}
      >
        <SidebarShell
          showSettings={showSettings}
          setShowSettings={setShowSettings}
          isMobile={isMobile}
          isFullscreen={isFullscreen}
          currentTheme={currentTheme}
        >
          {/* Categories */}
          <div className="space-y-4">
            <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">หมวดหมู่แนะนำ</span>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p.name}
                  onClick={() => {
                    const newOpts = p.items.map(t => ({ text: t }));
                    setOptions(newOpts);
                    setBulkText(p.items.join('\n'));
                    setSelectedPreset(p.name);
                    setWinner(null);
                  }}
                  className={`text-[12px] font-bold px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${selectedPreset === p.name ? 'bg-slate-900 text-white shadow-lg scale-105' : 'bg-white border border-slate-100 text-slate-500 hover:bg-orange-50'}`}
                >
                  {p.name}
                  {selectedPreset === p.name && <div className="w-1 h-1 bg-primary rounded-full animate-pulse" />}
                </button>
              ))}
              <button
                onClick={() => {
                  setOptions([]);
                  setBulkText('');
                  setSelectedPreset('กำหนดเอง');
                  setWinner(null);
                }}
                className={`text-[12px] font-bold px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${selectedPreset === 'กำหนดเอง' ? 'bg-orange-500 text-white shadow-lg scale-105' : 'bg-white border border-slate-100 text-slate-400 hover:bg-slate-100 shadow-sm'}`}
              >
                <Plus className="w-3.5 h-3.5" />
                กำหนดเอง
              </button>
            </div>
          </div>

          <div className="flex p-1 bg-slate-100 rounded-2xl border border-slate-200/50">
            <button
              onClick={() => setIsBulkMode(true)}
              className={`flex-1 py-3 px-2 rounded-xl font-black text-[11px] uppercase tracking-wider transition-all flex items-center justify-center gap-2 group outline-none border ${
                isBulkMode
                  ? 'bg-white text-primary shadow-sm border-slate-100'
                  : 'text-slate-500 hover:text-primary hover:bg-white/50 border-transparent'
              }`}
            >
              วางรายชื่อ
            </button>
            <button
              onClick={() => setIsBulkMode(false)}
              className={`flex-1 py-3 px-2 rounded-xl font-black text-[11px] uppercase tracking-wider transition-all flex items-center justify-center gap-2 group outline-none border ${
                !isBulkMode
                  ? 'bg-white text-primary shadow-sm border-slate-100'
                  : 'text-slate-500 hover:text-primary hover:bg-white/50 border-transparent'
              }`}
            >
              พิมพ์ทีละชื่อ
            </button>
          </div>

          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">จัดการรายการ</span>
              <div className="flex gap-2">
                <button onClick={shuffleOptions} className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl text-[11px] font-bold text-slate-600 shadow-sm"><Shuffle className="w-3.5 h-3.5" /> สลับลำดับ</button>
                <button onClick={sortOptions} className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl text-[11px] font-bold text-slate-600 shadow-sm"><ArrowDownAz className="w-3.5 h-3.5" /> เรียง ก-ฮ</button>
              </div>
            </div>

            {isBulkMode ? (
              <textarea
                value={bulkText}
                onChange={(e) => syncFromBulk(e.target.value)}
                className="w-full min-h-[300px] p-6 bg-white/50 border-2 border-slate-100 rounded-[2.5rem] focus:border-primary/30 outline-none font-kanit text-[16px] shadow-inner text-slate-800 leading-relaxed resize-none custom-scrollbar"
                placeholder="วางรายชื่อที่นี่..."
              />
            ) : (
              <div className="space-y-5">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newOption}
                    onChange={(e) => setNewOption(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addOption()}
                    placeholder="พิมพ์สิ่งที่อยากสุ่ม..."
                    className="flex-1 px-5 py-4 bg-white/50 border-2 border-slate-100 rounded-2xl focus:border-primary/30 outline-none transition-all font-kanit text-[16px] shadow-inner"
                  />
                  <button
                    onClick={addOption}
                    className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center hover:bg-black transition-all shadow-lg active:scale-90"
                  >
                    <Plus className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-2 min-h-[300px] max-h-[400px] overflow-y-auto custom-scrollbar pr-1">
                  {options.map((opt, idx) => (
                    <motion.div
                      layout
                      key={idx}
                      className="flex items-center justify-between p-3 bg-white/60 rounded-2xl border border-slate-100 shadow-sm group backdrop-blur-sm"
                    >
                      {editingIndex === idx ? (
                        <input
                          autoFocus
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onBlur={() => {
                            const updated = [...options];
                            updated[idx].text = editValue.trim() || opt.text;
                            setOptions(updated);
                            setBulkText(updated.map(o => o.text).join('\n'));
                            setEditingIndex(null);
                          }}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              const updated = [...options];
                              updated[idx].text = editValue.trim() || opt.text;
                              setOptions(updated);
                              setBulkText(updated.map(o => o.text).join('\n'));
                              setEditingIndex(null);
                            }
                          }}
                          className="flex-1 px-3 py-1 bg-white border border-primary/30 rounded-lg outline-none font-bold text-slate-700"
                        />
                      ) : (
                        <div className="flex items-center gap-3 flex-1 overflow-hidden">
                          {/* Image Upload/Preview */}
                          <div className="relative shrink-0 group/img">
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              id={`img-upload-${idx}`}
                              onChange={(e) => e.target.files?.[0] && handleImageUpload(idx, e.target.files[0])}
                            />
                            <label
                              htmlFor={`img-upload-${idx}`}
                              className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center cursor-pointer overflow-hidden hover:bg-slate-200 transition-all"
                            >
                              {opt.image ? (
                                <NextImage
                                  src={opt.image}
                                  width={40}
                                  height={40}
                                  className="w-full h-full object-cover"
                                  alt="upload preview"
                                  unoptimized
                                />
                              ) : (
                                <ImageIcon className="w-4 h-4 text-slate-400" />
                              )}
                            </label>
                          </div>

                          <div
                            className="flex items-center gap-3 flex-1 overflow-hidden font-bold text-slate-700 cursor-text py-2"
                            onClick={() => {
                              setEditingIndex(idx);
                              setEditValue(opt.text);
                            }}
                          >
                            <div className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm" style={{ backgroundColor: currentTheme.colors[idx % currentTheme.colors.length] }} />
                            <span className="truncate">{opt.text}</span>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setOptions(options.filter((_, i) => i !== idx))}
                          className="p-2 text-slate-300 hover:text-red-500 transition-all active:scale-110"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {options.length > 0 && (
              <button
                onClick={() => { setOptions([]); setBulkText(''); setSelectedPreset('กำหนดเอง'); }}
                className="w-full py-4 bg-red-50 text-[11px] font-black uppercase text-red-500 hover:bg-red-100 transition-all rounded-2xl border border-dashed border-red-200 flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" /> ล้างรายการทั้งหมด
              </button>
            )}
          </div>
        </SidebarShell>

        <motion.div layout className="flex-1 flex justify-center order-1 lg:order-2 self-stretch items-center relative min-h-[400px] max-h-[75vh] lg:max-h-none lg:min-h-[600px] pt-4 pb-0 lg:py-0">
          <div
            id="wheel-result-card"
            className={`bg-[#fffdf5]/30 md:backdrop-blur-md rounded-[2.5rem] lg:rounded-[3.5rem] pt-16 lg:pt-20 pb-4 lg:pb-8 px-4 lg:p-14 border border-white relative flex flex-col items-center justify-center shadow-xl transition-all duration-700 ${showSettings ? 'w-full h-full' : 'w-full lg:w-full h-full'} ${isFullscreen ? '!border-none !rounded-0 !bg-transparent !shadow-none !p-0' : ''}`}
          >
            <div className={`w-full flex items-center justify-between px-4 lg:px-10 transition-all duration-500 z-[1000] ${isFullscreen ? 'absolute top-6 lg:top-10 left-0 right-0' : 'absolute top-4 left-0 right-0'}`}>
              <ThemeSelector themes={THEMES} currentTheme={currentTheme} setCurrentTheme={setCurrentTheme} />
              <FullscreenButton isFullscreen={isFullscreen} onToggle={toggleFullscreen} />
            </div>

            <div className={`relative w-full aspect-square flex items-center justify-center transition-all duration-700 ${showSettings ? 'max-w-[550px]' : 'max-w-[85vh] lg:max-w-[650px]'}`}>
              <div className="absolute inset-0 rounded-full blur-[100px] opacity-10 animate-pulse" style={{ backgroundColor: currentTheme.ring }} />
              {/* Premium Wheel Pin */}
              <div className="absolute -top-4 lg:-top-6 left-1/2 -translate-x-1/2 z-40 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] scale-75 lg:scale-100">
                <div className="w-14 h-20 clip-sharp-pin bg-gradient-to-b from-slate-700 via-slate-900 to-black relative flex items-center justify-center border-t border-white/20">
                  {/* Highlight Ridge */}
                  <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-white/20 via-transparent to-transparent opacity-50" />

                  {/* Glowing Anchor Dot */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-5 h-5 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                    <div className="w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_10px_#fff] animate-pulse" />
                  </div>
                </div>
              </div>
              <div className="relative w-full h-full">
                <canvas ref={canvasRef} width={800} height={800} className="w-full h-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-transform" />
                <button
                  onClick={spin}
                  disabled={isSpinning || options.length < 2}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-[120px] h-[120px] rounded-full flex flex-col items-center justify-center transition-all transform active:scale-95 hover:scale-105 disabled:cursor-not-allowed group shadow-[0_0_50px_rgba(255,140,0,0.3)] border-4 border-white/40 backdrop-blur-sm"
                  style={{ backgroundColor: currentTheme.button }}
                >
                  <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse-slow scale-110 -z-10" />
                  <div className="absolute inset-0 bg-white/30 rounded-full animate-ping group-hover:block hidden opacity-50" />
                  <div className={`relative text-white font-black italic font-prompt transition-all ${isSpinning ? 'text-xl' : 'text-2xl'} drop-shadow-md`}>{isSpinning ? 'รอลุ้น' : 'START'}</div>
                  {!isSpinning && <div className="text-[10px] text-white/90 font-bold uppercase -mt-1 tracking-wider drop-shadow-sm">กดเพื่อหมุน</div>}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
        
        <ResultModal
          isOpen={!!winner}
          onClose={() => setWinner(null)}
          theme={currentTheme}
          title="THE WINNER IS"
          exportChildren={
            winner && (
              <div
                className={`font-prompt font-black text-slate-800 break-words w-full text-center ${
                  winner.text.length > 30 ? 'text-3xl leading-tight' :
                  winner.text.length > 18 ? 'text-4xl leading-tight' :
                  winner.text.length > 10 ? 'text-5xl leading-tight' :
                  winner.text.length > 4 ? 'text-7xl leading-tight' :
                  'text-8xl leading-tight'
                }`}
              >
                {winner.text}
              </div>
            )
          }
          showOkButton={false}
          extraActions={
            <button
              onClick={(e) => {
                e.stopPropagation();
                const newOpts = options.filter(o => o.text !== winner?.text);
                setOptions(newOpts);
                setBulkText(newOpts.map(o => o.text).join('\n'));
                setWinner(null);
              }}
              className="flex-1 py-4 bg-white border border-slate-200 rounded-2xl text-slate-500 font-bold flex items-center justify-center gap-2 text-[14px] hover:bg-slate-50 transition-all active:scale-95"
            >
              <Trash2 className="w-4 h-4" /> ตัดออกจากรายการ
            </button>
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

                {winner?.image ? (
                  <div className="relative w-full h-full rounded-full border-4 border-white shadow-2xl overflow-hidden bg-slate-100">
                    <NextImage
                      src={winner.image}
                      alt="winner"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ) : (
                  <NextImage
                    src="/images/wheel/icon-lucky-draw.png"
                    width={176}
                    height={176}
                    className="w-full h-full object-contain"
                    alt="winner"
                  />
                )}
              </div>
            </motion.div>
          }
        >

          <div
            className={`font-prompt font-black text-slate-800 drop-shadow-sm break-words transition-all duration-300 w-full max-w-xl px-4 text-center mt-1 sm:mt-2 ${!winner ? '' :
              winner.text.length > 30 ? 'text-2xl leading-tight' :
                winner.text.length > 18 ? 'text-3xl leading-tight' :
                  winner.text.length > 10 ? 'text-4xl leading-tight' :
                    winner.text.length > 4 ? 'text-6xl leading-tight' :
                      'text-7xl leading-tight'
              }`}
          >
            {winner?.text}
          </div>
        </ResultModal>
      </div>


      <style jsx>{`
        .clip-sharp-pin { clip-path: path('M28 0 C45 0, 56 15, 56 30 C56 45, 28 80, 28 80 C28 80, 0 45, 0 30 C0 15, 11 0, 28 0 Z'); transform: translateY(-5px); }
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        @keyframes pulse-slow { 0%, 100% { opacity: 0.1; transform: scale(1.05); } 50% { opacity: 0.4; transform: scale(1.15); } }
        .animate-pulse-slow { animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        #wheel-result-card:fullscreen {
          width: 100vw !important; height: 100vh !important; max-width: none !important; border-radius: 0 !important;
          background: radial-gradient(circle at center, #fffdf5 0%, #fff5e6 100%) !important;
        }
        #wheel-result-card:fullscreen .relative.w-full.aspect-square { max-width: 90vh !important; max-height: 90vh !important; }
      `}</style>
    </div>
  );
}
