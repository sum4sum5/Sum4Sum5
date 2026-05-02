'use client';

import React from 'react';
import { 
  ChevronRight, HelpCircle, ShieldCheck, Zap, Sparkles, MessageSquare, 
  Lock, BarChart3, Rocket, Heart, BookOpen, Fingerprint, Brain, Target, ShieldAlert,
  Search, Info, Share2, MousePointer2
} from 'lucide-react';
import Link from 'next/link';

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Premium Hero Section */}
      <section className="relative pt-24 pb-20 px-6 overflow-hidden bg-slate-50 border-b border-slate-100">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-100/40 via-transparent to-transparent -z-10" />
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-orange-100 text-primary font-bold text-sm shadow-sm">
            <Search className="w-4 h-4 animate-pulse" />
            <span>ศูนย์การเรียนรู้เรื่องการสุ่มและ AI (AdSense Ready 2026)</span>
          </div>
          <h1 className="text-4xl md:text-8xl font-prompt font-black text-slate-900 leading-[1.05] tracking-tight">
            คู่มือเจาะลึก <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">ศาสตร์แห่งการสุ่ม</span>
          </h1>
          <p className="text-slate-500 text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed font-medium">
            ไม่ใช่แค่การกดปุ่มสุ่ม แต่คือการผสมผสานระหว่างคณิตศาสตร์ระดับสูง และปัญญาประดิษฐ์ (AI) เพื่อช่วยให้ชีวิตคุณง่ายขึ้นในทุกมิติ
          </p>
        </div>
      </section>

      {/* Main Long-form Article Container */}
      <div className="max-w-5xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-[1fr_320px] gap-16">
          
          <main className="space-y-32">
            
            {/* Topic 1: Algorithm & Transparency */}
            <article id="prng" className="space-y-10">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-widest text-xs">
                  <Fingerprint className="w-4 h-4" />
                  Transparency & Technology
                </div>
                <h2 className="text-3xl md:text-5xl font-prompt font-black text-slate-900 leading-tight">
                  1. ระบบสุ่มของเราทำงานอย่างไร? ความลับของ PRNG
                </h2>
              </div>
              
              <div className="prose prose-slate max-w-none space-y-6 text-slate-600 leading-[1.9] text-lg font-medium">
                <p>
                  ที่ <strong>สุ่มสี่สุ่มห้า (Sum4Sum5)</strong> เรายึดมั่นในความโปร่งใสเป็นอันดับหนึ่ง ระบบการสุ่มทุกประเภทบนเว็บไซต์ของเรา ทำงานผ่านสิ่งที่เรียกว่า <strong>PRNG (Pseudo-Random Number Generator)</strong> 
                  ซึ่งเป็นมาตรฐานเดียวกันกับที่ใช้ในซอฟต์แวร์ระดับโลกและเครื่องคอมพิวเตอร์สมัยใหม่
                </p>
                <p>
                  PRNG ไม่ใช่แค่การเดาสุ่มมั่วๆ แต่มันคือการนำค่าเริ่มต้นที่เรียกว่า <strong>Seed</strong> (ซึ่งเราดึงมาจากตัวแปรที่มีความเปลี่ยนแปลงสูง เช่น เวลาในระดับมิลลิวินาทีจาก Browser ของคุณ) 
                  มาเข้ากระบวนการทางคณิตศาสตร์ที่ซับซ้อนจนได้ตัวเลขที่มีการกระจายตัวอย่างสม่ำเสมอ จนมนุษย์ไม่สามารถคาดเดาหรือสังเกตรูปแบบได้เลย
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 pt-6">
                  <div className="p-10 bg-orange-50/50 rounded-[3rem] border border-orange-100 shadow-sm space-y-4">
                    <h4 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <Lock className="w-5 h-5 text-primary" /> ล็อคผลได้ไหม?
                    </h4>
                    <p className="text-sm">
                      คำตอบคือ <strong>"ไม่ได้ 100%"</strong> ครับ ระบบของเราทำงานฝั่ง Client (เครื่องของผู้ใช้) 
                      และไม่มีโค้ดส่วนไหนที่เขียนไว้เพื่อเอื้อประโยชน์ให้ตัวเลือกใดตัวเลือกหนึ่ง ทุกครั้งที่คุณกด SPIN ระบบจะคำนวณใหม่เสมอโดยไม่มีการเก็บประวัติมาอ้างอิง
                    </p>
                  </div>
                  <div className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100 shadow-sm space-y-4">
                    <h4 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <ShieldAlert className="w-5 h-5 text-slate-400" /> การเก็บข้อมูล
                    </h4>
                    <p className="text-sm">
                      เราให้ความสำคัญกับความเป็นส่วนตัว ข้อมูลที่คุณพิมพ์ลงในวงล้อหรือรายชื่อสุ่ม จะถูกเก็บไว้เพียงชั่วคราวในหน่วยความจำของ Browser (Local Storage) และจะไม่ถูกส่งกลับมาที่ Server ของเราแต่อย่างใด
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* Topic 2: Probability Psychology */}
            <article id="probability" className="space-y-10">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-blue-500 font-black uppercase tracking-widest text-xs">
                  <BarChart3 className="w-4 h-4" />
                  The Science of Probability
                </div>
                <h2 className="text-3xl md:text-5xl font-prompt font-black text-slate-900 leading-tight">
                  2. ทำไมสุ่มได้คำเดิมซ้ำๆ? (ศาสตร์แห่งความน่าจะเป็น)
                </h2>
              </div>
              
              <div className="prose prose-slate max-w-none space-y-6 text-slate-600 leading-[1.9] text-lg font-medium">
                <p>
                  หลายคนมักสงสัยว่า "ทำไมสุ่ม 3 ครั้งแล้วได้ผลลัพธ์เดิม 2 ครั้ง?" คำตอบอยู่ที่ศาสตร์ของ <strong>ความน่าจะเป็น (Probability)</strong> ที่เกิดขึ้นจริงตามธรรมชาติ (True Randomness)
                </p>
                <p>
                  ในทางสถิติ การสุ่มที่ยุติธรรมคือการที่ "ทุกตัวเลือกมีโอกาสออกเท่ากันในทุกครั้ง" นั่นหมายความว่า การที่คุณเพิ่งสุ่มได้ "ส้มตำ" ไปในรอบที่แล้ว ไม่ได้หมายความว่าในรอบถัดไปโอกาสของ "ส้มตำ" จะลดลงแต่อย่างใด
                </p>
                <div className="bg-blue-50/50 p-10 rounded-[3rem] border border-blue-100">
                   <p className="m-0 italic">
                     "ความน่าจะเป็นไม่มีความจำ" — นี่คือหลักการสำคัญที่ทำให้การสุ่มที่ Sum4Sum5 มีความตื่นเต้น เพราะคุณจะไม่มีทางรู้เลยว่าโชคจะเข้าข้างใครในรอบถัดไป
                   </p>
                </div>
              </div>
            </article>

            {/* Topic 3: Decision Fatigue */}
            <article id="fatigue" className="space-y-10">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-purple-500 font-black uppercase tracking-widest text-xs">
                  <Brain className="w-4 h-4" />
                  Decision Fatigue
                </div>
                <h2 className="text-3xl md:text-5xl font-prompt font-black text-slate-900 leading-tight">
                  3. ก้าวข้ามความล้าในการตัดสินใจด้วยเครื่องมือสุ่ม
                </h2>
              </div>
              
              <div className="prose prose-slate max-w-none space-y-6 text-slate-600 leading-[1.9] text-lg font-medium">
                <p>
                  นักวิทยาศาสตร์พบว่าในแต่ละวัน มนุษย์เราต้องตัดสินใจมากกว่า 35,000 ครั้ง ตั้งแต่เรื่องเล็กอย่าง "เที่ยงนี้กินอะไร?" ไปจนถึงเรื่องใหญ่อย่างการวางแผนธุรกิจ ภาวะนี้เรียกว่า <strong>Decision Fatigue</strong> หรือความล้าจากการตัดสินใจ
                </p>
                <p>
                  การใช้เครื่องมือสุ่มอย่าง <strong>Sum4Sum5</strong> ไม่ใช่แค่เรื่องของโชคชะตา แต่เป็นการโอนย้ายภาระการตัดสินใจในเรื่องที่ไม่จำเป็นออกไป เพื่อให้สมองของคุณมีพลังเหลือไปใช้กับเรื่องที่สำคัญกว่าในชีวิต การให้โชคชะตาช่วยตัดสินใจในเรื่องเล็กๆ จึงเป็นวิธีหนึ่งในการรักษาสุขภาพจิตที่ดีครับ
                </p>
              </div>
            </article>

            {/* Topic 4: AI Caption Mastery */}
            <article id="ai-tips" className="space-y-10">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 bg-pink-50 rounded-[2rem] flex items-center justify-center text-pink-500 shadow-sm border border-pink-100">
                  <Rocket className="w-8 h-8" />
                </div>
                <h2 className="text-3xl md:text-5xl font-prompt font-black text-slate-900">4. เคล็ดลับการใช้ AI เขียนแคปชั่นให้ปัง</h2>
              </div>
              
              <div className="grid gap-6">
                <div className="flex gap-6 p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm items-start">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-lg font-bold text-slate-900">เลือกโหมดให้ตรง Vibe</h4>
                    <p className="text-slate-500 text-sm">หากลงรูปคาเฟ่ชิลๆ ลองโหมด "กวนๆ" เพื่อเรียกคอมเมนต์ หรือโหมด "ทั่วไป" เพื่อความมินิมอลครับ</p>
                  </div>
                </div>
                <div className="flex gap-6 p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm items-start">
                  <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center shrink-0">
                    <Heart className="w-6 h-6 text-orange-500" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-lg font-bold text-slate-900">Golden Hour</h4>
                    <p className="text-slate-500 text-sm">สุ่มแคปชั่นเตรียมไว้ แล้วโพสต์ในช่วงเวลาที่มีคนใช้งานหนาแน่น เช่น 19.00 - 21.00 น. จะช่วยให้เอนเกจเมนต์พุ่งขึ้นครับ</p>
                  </div>
                </div>
              </div>
            </article>

            {/* Final FAQ Accordion Section */}
            <section className="space-y-12 pt-16 border-t border-slate-100">
               <h2 className="text-3xl font-prompt font-black text-slate-900 text-center">คำถามอื่นๆ ที่พบบ่อย</h2>
               <div className="grid gap-4">
                  <FAQItem 
                    q="สุ่มสี่สุ่มห้า (Sum4Sum5) คืออะไร?" 
                    a="เราคือแพลตฟอร์มรวมเครื่องมือสุ่มออนไลน์คุณภาพสูง ทั้งวงล้อสุ่ม สุ่มตัวเลข สุ่มรายชื่อ และ AI ช่วยคิดแคปชั่น ออกแบบมาให้ใช้งานง่าย ดีไซน์พรีเมียม และแชร์ผลลัพธ์ลงโซเชียลได้ทันทีครับ" 
                  />
                  <FAQItem 
                    q="ใช้งานฟรีตลอดไปจริงไหม?" 
                    a="แน่นอนครับ ทุกเครื่องมือบนเว็บไซต์ของเราเปิดให้ใช้งานฟรี 100% โดยไม่ต้องสมัครสมาชิก เราได้รับรายได้จากการโฆษณาเพื่อนำมาพัฒนาฟีเจอร์ใหม่ๆ ให้คุณใช้งานครับ" 
                  />
                  <FAQItem 
                    q="บันทึกรูปภาพไปใช้ได้ยังไง?" 
                    a="ในหน้าสรุปผลของทุกเครื่องมือ จะมีปุ่ม 'บันทึกรูปภาพ' ระบบจะเจนรูปภาพขนาด 1:1 ที่สวยงามมาให้คุณเซฟลงเครื่องได้ทันที เหมาะสำหรับโพสต์ลง TikTok, Instagram หรือ Facebook ครับ" 
                  />
                  <FAQItem 
                    q="ต้องดาวน์โหลดแอปเพิ่มไหม?" 
                    a="ไม่ต้องครับ! เว็บไซต์ของเราถูกออกแบบมาให้เป็น Progressive Web App (PWA) ที่ใช้งานได้ลื่นไหลผ่าน Browser บนมือถือได้ทันทีเหมือนมีแอปอยู่ในเครื่องเลยครับ" 
                  />
                  <FAQItem 
                    q="ทำไม AI ถึงสุ่มแคปชั่นได้ตรงใจขนาดนี้?" 
                    a="เราใช้โมเดล AI ล่าสุด (Gemini 3 Flash) ที่มีความเข้าใจภาษาไทยและบริบทของวัยรุ่นไทยเป็นอย่างดี ทำให้แคปชั่นที่ได้มีความเป็นธรรมชาติและทันสมัยครับ" 
                  />
                  <FAQItem 
                    q="เปลี่ยนธีมสีแล้วดียังไง?" 
                    a="การเปลี่ยนธีมสีช่วยให้การสุ่มของคุณมีอารมณ์ที่แตกต่างกัน เช่น ธีม Vibrant สำหรับงานปาร์ตี้ หรือธีม Pastel สำหรับการตัดสินใจที่ผ่อนคลาย ช่วยเพิ่มความสนุกในการใช้งานครับ" 
                  />
               </div>
            </section>

          </main>

          {/* Sidebar Section */}
          <aside className="space-y-10">
            <div className="sticky top-24 space-y-8">
              <div className="bg-slate-900 rounded-[3rem] p-8 text-white space-y-6 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl" />
                <h3 className="text-xl font-black font-prompt">สารบัญคู่มือ</h3>
                <nav className="flex flex-col gap-4 text-sm font-bold text-slate-400">
                  <Link href="#prng" className="hover:text-primary transition-colors flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> ระบบสุ่ม PRNG</Link>
                  <Link href="#probability" className="hover:text-primary transition-colors flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> ศาสตร์ความน่าจะเป็น</Link>
                  <Link href="#fatigue" className="hover:text-primary transition-colors flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500" /> ก้าวข้ามความล้า</Link>
                  <Link href="#ai-tips" className="hover:text-primary transition-colors flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-pink-500" /> เคล็ดลับ AI</Link>
                </nav>
              </div>

              <div className="bg-orange-50 rounded-[3rem] p-8 space-y-4 border border-orange-100">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 leading-tight">มีข้อสงสัยเพิ่มเติม?</h3>
                <p className="text-slate-500 text-xs leading-relaxed">ทีมงานสุ่มสี่สุ่มห้ายินดีรับฟังทุกข้อเสนอแนะและพร้อมช่วยเหลือคุณเสมอครับ</p>
                <Link href="/contact" className="inline-flex items-center gap-2 text-primary font-black text-sm hover:gap-3 transition-all">
                  ติดต่อเรา <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}

function FAQItem({ q, a }: { q: string, a: string }) {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-50 transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 group">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left flex items-start justify-between gap-4"
      >
        <h4 className="text-lg font-bold text-slate-800 font-prompt leading-tight group-hover:text-primary transition-colors">{q}</h4>
        <div className={`p-2 rounded-xl transition-all ${isOpen ? 'bg-primary text-white rotate-180' : 'bg-white text-slate-300'}`}>
          <ChevronRight className="w-4 h-4" />
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
        <p className="text-slate-500 leading-relaxed text-[15px] font-medium border-l-2 border-primary/20 pl-6">{a}</p>
      </div>
    </div>
  );
}
