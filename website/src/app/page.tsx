'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dices, Sparkles, ChevronRight, Play, Users, FerrisWheel } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "สุ่มสี่สุ่มห้า (Sum4Sum5)",
    "operatingSystem": "Web",
    "applicationCategory": "UtilityApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "THB"
    },
    "description": "แพลตฟอร์มเครื่องมือสุ่มออนไลน์ฟรี รวมวงล้อเสี่ยงดวง สุ่มเลขออนไลน์ และสุ่มชื่อจับฉลาก",
    "featureList": [
      "สุ่มเลขออนไลน์",
      "วงล้อเสี่ยงดวง",
      "สุ่มชื่อผู้โชคดี",
      "สุ่มแคปชั่นกวนๆ"
    ]
  };

  const webSiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "สุ่มสี่สุ่มห้า",
    "url": "https://sum4sum5.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://sum4sum5.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "สุ่มสี่สุ่มห้า (Sum4Sum5) คืออะไร?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "เป็นแพลตฟอร์มรวมเครื่องมือสุ่มออนไลน์ฟรี เช่น วงล้อเสี่ยงดวง สุ่มตัวเลข สุ่มรายชื่อ และสุ่มแคปชั่นกวนๆ ออกแบบมาเพื่อช่วยในการตัดสินใจและสร้างคอนเทนต์โซเชียลมีเดีย"
        }
      },
      {
        "@type": "Question",
        "name": "ใช้งานฟรีจริงหรือไม่?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "ใช่ครับ ทุกเครื่องมือบนเว็บไซต์ของเราใช้งานได้ฟรี 100% โดยไม่ต้องสมัครสมาชิก"
        }
      }
    ]
  };


  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="flex flex-col gap-20 pb-20">
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 px-6 overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] bg-gradient-radial from-orange-200/50 via-transparent to-transparent blur-[120px] -z-10" />
          <div className="absolute top-1/4 -right-20 w-80 h-80 bg-blue-200/30 blur-[100px] rounded-full -z-10 animate-pulse" />
          <div className="absolute bottom-0 -left-20 w-96 h-96 bg-purple-200/30 blur-[120px] rounded-full -z-10 animate-pulse" />
          
          {/* Floating Icons for Modern Feel */}
          <div className="absolute inset-0 pointer-events-none -z-10">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 100 }}
                animate={{ 
                  opacity: [0.1, 0.3, 0.1], 
                  y: [0, -40, 0],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 5 + i, 
                  repeat: Infinity, 
                  delay: i * 0.8,
                  ease: "easeInOut" 
                }}
                className="absolute text-orange-200/50"
                style={{
                  top: `${20 + (i * 15)}%`,
                  left: `${10 + (i * 15)}%`,
                }}
              >
                {i % 3 === 0 ? <Dices className="w-16 h-16" /> : i % 3 === 1 ? <FerrisWheel className="w-12 h-12" /> : <Sparkles className="w-20 h-20" />}
              </motion.div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto text-center space-y-10 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-orange-50/80 backdrop-blur-md border border-orange-100 text-primary font-bold text-sm mb-6 shadow-sm">
                <Sparkles className="w-4 h-4" />
                <span>เครื่องมือสุ่มที่ทุกคนควรมีติดเครื่องไว้!</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-prompt font-black leading-[1.1] text-slate-900 tracking-tight">
                ตัดสินใจไม่ถูก? <br /> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">ให้เราสุ่มให้สิ!</span>
              </h1>
              <p className="mt-8 text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
                เครื่องมือสุ่มที่แม่นยำ ดีไซน์สวยระดับพรีเมียม และฟรี 100% 
                ช่วยให้การตัดสินใจและการทำคอนเทนต์เป็นเรื่องสนุกที่สุด
              </p>
            </motion.div>

            <motion.div 
              className="pt-6 flex flex-wrap justify-center gap-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Link href="/wheel" className="btn-primary inline-flex items-center gap-3 text-xl px-10 py-5 group shadow-[0_15px_30px_-5px_rgba(255,140,0,0.4)]">
                เริ่มสุ่มเลย <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Features Portal Grid */}
        <section className="max-w-7xl mx-auto w-full px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* 1. Fortune Wheel Card */}
            <FeatureCard 
              href="/wheel"
              icon={FerrisWheel}
              title="วงล้อสุ่ม"
              description="สร้างวงล้อส่วนตัว ใส่รายชื่ออาหาร เพื่อน หรือรางวัล แล้วหมุนเพื่อลุ้นผลลัพธ์!"
              color="orange"
            />

            {/* 2. Number Randomizer Card */}
            <FeatureCard 
              href="/random-number"
              icon={Dices}
              title="สุ่มเลข"
              description="สุ่มเลขตามช่วงที่ต้องการ (Min/Max) แม่นยำ รวดเร็ว บันทึกรูปผลลัพธ์ได้ทันที"
              color="blue"
            />

            {/* 3. Name Randomizer Card */}
            <FeatureCard 
              href="/random-name"
              icon={Users}
              title="สุ่มรายชื่อ"
              description="สุ่มรายชื่อผู้โชคดีด้วยดีไซน์พรีเมียม พร้อมภาพประกาศผล 3D สุดอลังการ แชร์ลงโซเชียลได้ทันที เหมาะสำหรับทุกกิจกรรม"
              color="purple"
            />

            {/* 4. Caption Randomizer Card */}
            <FeatureCard 
              href="/random-caption"
              icon={Sparkles}
              title="แคปชั่น AI"
              description="สุ่มแคปชั่นสายฮา สายอ่อย สายมู หรือแคปชั่นขายของ พร้อมอิโมจิสุดน่ารัก ช่วยคิดแคปชั่นลงไอจี/เฟซบุ๊กให้ปังกว่าเดิม"
              color="pink"
            />
          </div>
        </section>

        {/* How It Works Section */}
        <section className="max-w-7xl mx-auto px-6 py-10">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-prompt font-black text-slate-900">เริ่มสุ่มง่ายๆ ใน 3 ขั้นตอน</h2>
            <p className="text-slate-500 text-lg">ไม่ต้องดาวน์โหลด ไม่ต้องสมัครสมาชิก เริ่มใช้งานได้ทันที</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 relative">
             {/* Connection Line (Desktop) */}
             <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-slate-100 to-transparent -z-10" />
             
             <StepCard 
               number="01"
               title="เลือกเครื่องมือ"
               description="เลือกวงล้อ สุ่มเลข สุ่มชื่อ หรือสุ่มแคปชั่น ตามที่คุณต้องการใช้งาน"
             />
             <StepCard 
               number="02"
               title="ใส่ข้อมูล"
               description="กรอกรายชื่อ ช่วงตัวเลข หรือหัวข้อแคปชั่นที่คุณอยากให้ AI ช่วยคิด"
             />
             <StepCard 
               number="03"
               title="สุ่มและแชร์"
               description="กดปุ่มสุ่ม แล้วบันทึกผลลัพธ์เป็นรูปภาพสวยๆ ไปลงโซเชียลได้ทันที"
             />
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="bg-slate-900 rounded-[4rem] p-12 md:p-20 text-center space-y-16 overflow-hidden relative shadow-2xl">
            {/* Background Glows */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 blur-[100px] rounded-full" />
            <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-orange-500/10 blur-[100px] rounded-full" />

            <div className="relative z-10 space-y-4">
              <h2 className="text-4xl md:text-5xl font-prompt font-black text-white tracking-tight">ทำไมต้องสุ่มที่ Sum4Sum5?</h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">ทางเลือกอันดับหนึ่งสำหรับการสุ่มออนไลน์ที่ทั้งไวและสนุกที่สุด</p>
            </div>

            <div className="relative z-10 grid sm:grid-cols-3 gap-12">
              <div className="group space-y-6">
                <div className="w-20 h-20 bg-white/10 backdrop-blur-xl border border-white/10 text-primary rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <Sparkles className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white">ใช้งานฟรี 100%</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">ไม่ต้องสมัครสมาชิก ไม่มีค่าใช้จ่ายแอบแฝงใดๆ ทั้งสิ้น</p>
                </div>
              </div>
              <div className="group space-y-6 text-center">
                <div className="w-20 h-20 bg-white/10 backdrop-blur-xl border border-white/10 text-orange-400 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500">
                  <Play className="w-10 h-10 ml-1" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white">รวดเร็ว ทันใจ</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">ออกแบบมาให้กดปุ่มเดียวแล้วรู้ผลทันที ไม่ต้องรอนาน</p>
                </div>
              </div>
              <div className="group space-y-6">
                <div className="w-20 h-20 bg-white/10 backdrop-blur-xl border border-white/10 text-blue-400 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <Users className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white">แชร์ง่ายได้ทุกที่</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">บันทึกผลสุ่มเป็นรูปภาพสวยๆ เพื่อโพสต์โซเชียลได้ทันที</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEO & Platform Content Section */}
        <section className="max-w-4xl mx-auto px-6 text-center space-y-12 pb-10">
          <div className="space-y-6">
            <h2 className="text-3xl font-prompt font-black text-slate-900">เครื่องมือสุ่มที่ตอบโจทย์ทุกแพลตฟอร์ม</h2>
            <p className="text-slate-500 leading-loose text-lg">
              ไม่ว่าคุณจะหา <strong>สุ่มเลข</strong>, <strong>วงล้อสุ่ม</strong>, หรือ <strong>แคปชั่น AI</strong> 
              สุ่มสี่สุ่มห้าถูกออกแบบมาให้แสดงผลสวยงามแบบ 1:1 เหมาะสำหรับบันทึกภาพไปลง TikTok, Instagram, Facebook หรือ LINE Story 
              ช่วยให้การทำคอนเทนต์ของคุณง่ายและดูเป็นมืออาชีพที่สุด
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 opacity-60">
            {['#สุ่มเลข', '#วงล้อสุ่ม', '#สุ่มรายชื่อ', '#แคปชั่นAI', '#คิดแคปชั่นไอจี', '#AIช่วยคิดแคปชั่น'].map(tag => (
              <span key={tag} className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1.5 rounded-full">{tag}</span>
            ))}
          </div>
        </section>

        {/* FAQ Section for Home SEO */}
        <section className="max-w-4xl mx-auto px-6 py-20 border-t border-slate-100">
          <div className="text-center mb-16">
             <h2 className="text-4xl font-prompt font-black text-slate-900">คำถามที่พบบ่อย (FAQ)</h2>
             <p className="text-slate-500 mt-4">รวมข้อสงสัยที่คุณอาจอยากรู้เกี่ยวกับสุ่มสี่สุ่มห้า</p>
          </div>
          
          <div className="space-y-4">
             <FAQAccordion 
               question="สุ่มสี่สุ่มห้า (Sum4Sum5) คืออะไร?"
               answer="เราคือแพลตฟอร์มรวมเครื่องมือสุ่มออนไลน์ที่ดีที่สุดในไทย ทั้งวงล้อสุ่ม สุ่มเลข สุ่มรายชื่อ และแคปชั่น AI ที่ออกแบบมาให้ใช้งานง่าย ดีไซน์พรีเมียม และเหมาะกับการแชร์ลงโซเชียลมีเดียที่สุดครับ"
             />
             <FAQAccordion 
               question="ผลการสุ่มยุติธรรมหรือไม่?"
               answer="แน่นอนครับ ระบบของเราใช้อัลกอริทึมการสุ่มมาตรฐานสากล (PRNG) ที่มีความแม่นยำและยุติธรรม 100% มั่นใจได้เลยว่าไม่มีการล็อคผลครับ"
             />
             <FAQAccordion 
               question="บันทึกภาพไปลง TikTok หรือ Instagram ได้อย่างไร?"
               answer="ในหน้าสรุปผลการสุ่มทุกอัน จะมีปุ่ม 'บันทึกรูปภาพ' หรือ 'แชร์' ระบบจะเจนรูปภาพขนาด 1:1 ที่สวยงามมาให้คุณเซฟลงเครื่องได้ทันทีครับ"
             />
             <FAQAccordion 
               question="ใช้งานบนมือถือได้สะดวกไหม?"
               answer="เว็บไซต์ของเราถูกออกแบบมาให้เป็น Mobile-First ครับ ใช้งานบนมือถือได้ลื่นไหลเหมือนแอปพลิเคชัน โดยไม่ต้องโหลดแอปเพิ่มให้หนักเครื่องครับ"
             />
          </div>
        </section>
      </div>
    </>
  );
}

function StepCard({ number, title, description }: { number: string, title: string, description: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 p-4 opacity-[0.05] group-hover:opacity-10 transition-opacity">
        <span className="text-8xl font-black font-prompt">{number}</span>
      </div>
      <div className="relative z-10 space-y-4">
        <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center font-bold shadow-lg shadow-orange-200">
          {number}
        </div>
        <h3 className="text-xl font-bold text-slate-900">{title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

function FAQAccordion({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <div className="border border-slate-100 rounded-3xl overflow-hidden bg-white hover:border-orange-100 transition-colors">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
      >
        <span className="font-bold text-slate-800 font-prompt">{question}</span>
        <ChevronRight className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 text-slate-500 text-sm leading-relaxed bg-slate-50/50">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FeatureCard({ href, icon, title, description, color }: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: 'orange' | 'blue' | 'purple' | 'pink';
}) {
  const Icon = icon;
  const colorMap = {
    orange: {
      bg: 'from-orange-400 to-orange-600',
      light: 'bg-orange-50',
      text: 'text-orange-600',
      border: 'group-hover:border-orange-200',
      glow: 'group-hover:shadow-orange-200/50'
    },
    blue: {
      bg: 'from-blue-400 to-blue-600',
      light: 'bg-blue-50',
      text: 'text-blue-600',
      border: 'group-hover:border-blue-200',
      glow: 'group-hover:shadow-blue-200/50'
    },
    purple: {
      bg: 'from-purple-400 to-purple-600',
      light: 'bg-purple-50',
      text: 'text-purple-600',
      border: 'group-hover:border-purple-200',
      glow: 'group-hover:shadow-purple-200/50'
    },
    pink: {
      bg: 'from-pink-400 to-pink-600',
      light: 'bg-pink-50',
      text: 'text-pink-600',
      border: 'group-hover:border-pink-200',
      glow: 'group-hover:shadow-pink-200/50'
    },
  };

  const style = colorMap[color];

  return (
    <Link href={href}>
      <motion.div
        whileHover={{ y: -10, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`group relative bg-white/70 backdrop-blur-xl p-10 rounded-[3rem] border border-gray-100 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] transition-all h-full flex flex-col items-start ${style.border} ${style.glow}`}
      >
        {/* Abstract Background element */}
        <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity bg-gradient-to-br ${style.bg}`} />
        
        <div className={`relative w-20 h-20 rounded-3xl bg-gradient-to-br ${style.bg} flex items-center justify-center text-white mb-8 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
          <div className="absolute inset-0 rounded-3xl bg-white/20 animate-pulse opacity-0 group-hover:opacity-100" />
          <Icon className="w-10 h-10 drop-shadow-md" />
        </div>
        
        <div className="relative z-10 flex-1 space-y-4">
          <h3 className="text-3xl font-prompt font-black text-slate-900 tracking-tight leading-tight">
            {title}
          </h3>
          <p className="text-lg text-slate-500 leading-relaxed max-w-[90%]">
            {description}
          </p>
        </div>

        <div className="relative z-10 mt-10 flex items-center gap-3">
          <div className={`flex items-center gap-2 font-bold ${style.text} px-6 py-3 rounded-2xl ${style.light} group-hover:gap-4 transition-all duration-300`}>
            เข้าใช้งานฟีเจอร์นี้
            <ChevronRight className="w-5 h-5" />
          </div>
        </div>

        {/* Bottom decorative pattern */}
        <div className="absolute bottom-6 right-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
           <Icon className="w-8 h-8" />
        </div>
      </motion.div>
    </Link>
  );
}
