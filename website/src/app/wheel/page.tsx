'use client';

import React from 'react';
import FortuneWheel from '@/components/FortuneWheel';
import AdBanner from '@/components/shared/AdBanner';
import { FerrisWheel, Sparkles, Image as ImageIcon, Zap, BarChart3, HelpCircle, Fingerprint } from 'lucide-react';

export default function WheelPage() {

  return (
    <div className="min-h-screen bg-transparent pb-24 lg:pb-32">
      {/* 1. Top Ad Banner - Maximum Visibility */}
      <div className="w-full">
        <AdBanner slot="home-horizontal" />
      </div>

      {/* 2. Main Tool Area */}
      <div className="w-full pt-4 lg:pt-8 pb-4 space-y-4 lg:space-y-6 scroll-mt-24">
        <div className="w-full">
           <FortuneWheel />
        </div>
      </div>

      {/* 3. Deep SEO Content Section */}
      <div className="max-w-7xl mx-auto px-6 pt-16 border-t border-slate-100">
        <div className="grid lg:grid-cols-[1fr_350px] gap-12">
          
          <div className="space-y-24">
            {/* Article 1: 10 Creative Ideas */}
            <article className="space-y-8">
              <div className="flex items-center gap-4 text-primary">
                <div className="p-3 bg-orange-50 rounded-2xl">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h2 className="text-3xl md:text-4xl font-prompt font-black text-slate-900 leading-tight">
                  10 ไอเดียสุดเจ๋งในการใช้ "วงล้อสุ่ม" ตัดสินใจให้ชีวิตง่ายขึ้น
                </h2>
              </div>

              <div className="prose prose-slate max-w-none text-slate-600 leading-loose space-y-6">
                <p className="text-lg font-medium">
                  คุณเคยเป็นไหม? จะกินอะไรดี? จะไปเที่ยวที่ไหน? หรือแม้แต่จะเลือกใครมาทำงานกลุ่มดี? 
                  <strong>วงล้อสุ่มออนไลน์</strong> ของสุ่มสี่สุ่มห้าออกแบบมาเพื่อแก้ปัญหานี้โดยเฉพาะ! 
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { t: "สุ่มเมนูอาหาร", d: "เบื่อไหมกับคำว่า 'กินอะไรก็ได้'? ลองใส่เมนูที่ชอบลงไปแล้วหมุนเลย!" },
                    { t: "สุ่มชื่อผู้โชคดี", d: "เหมาะสำหรับแม่ค้าออนไลน์หรือครูที่ต้องการสุ่มนักเรียนมาตอบคำถาม" },
                    { t: "สุ่มสถานที่เที่ยว", d: "ตัดสินใจไม่ได้ว่าจะไปคาเฟ่ไหนดี ให้วงล้อช่วยนำทางครับ" },
                    { t: "สุ่มกิจกรรมวันหยุด", d: "นอนพัก, ออกกำลังกาย, หรือไปดูหนังดี? สุ่มเลย!" }
                  ].map((item, idx) => (
                    <div key={idx} className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                      <span className="text-primary font-black block text-lg mb-1">{item.t}</span>
                      <span className="text-sm font-medium">{item.d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </article>

            {/* Article 2: Why Choose Us? */}
            <article className="prose prose-slate max-w-none">
              <h2 className="font-prompt font-black text-3xl lg:text-4xl text-slate-900 leading-tight mb-8">
                ทำไมสุ่มสี่สุ่มห้าถึงเป็น <span className="text-primary italic">วงล้อสุ่ม</span> อันดับ 1 ของคุณ?
              </h2>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  ในยุคที่เรามีทางเลือกมากมายจนบางครั้งเกิดภาวะ <strong>&quot;Decision Fatigue&quot;</strong> หรือความล้าในการตัดสินใจ 
                  เราจึงพัฒนาเครื่องมือที่เปลี่ยนการเลือกที่ยุ่งยากให้กลายเป็นเรื่องสนุกและยุติธรรมที่สุด
                </p>
                <div className="bg-orange-50/50 p-6 lg:p-8 rounded-[2rem] lg:rounded-3xl border border-orange-100/50 my-8">
                  <h3 className="font-prompt font-black text-xl lg:text-2xl text-slate-900 mb-6 flex items-start lg:items-center gap-3">
                    <Zap className="w-7 h-7 lg:w-8 lg:h-8 text-primary flex-shrink-0 mt-1 lg:mt-0" />
                    <span>วิธีการใช้งานวงล้อสุ่มออนไลน์</span>
                  </h3>
                  <ol className="list-none p-0 space-y-4 lg:space-y-5 text-slate-600 font-medium">
                    <li className="flex items-start gap-3 lg:gap-4">
                      <span className="flex-shrink-0 w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm lg:text-base mt-0.5">1</span>
                      <span className="text-base lg:text-lg leading-relaxed">พิมพ์รายชื่อหรือตัวเลือกที่ต้องการลงในเมนูตั้งค่าด้านซ้าย (รองรับการใส่รูปภาพ)</span>
                    </li>
                    <li className="flex items-start gap-3 lg:gap-4">
                      <span className="flex-shrink-0 w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm lg:text-base mt-0.5">2</span>
                      <span className="text-base lg:text-lg leading-relaxed">เลือกธีมสีที่ต้องการเพื่อให้วงล้อของคุณสวยโดดเด่นไม่ซ้ำใคร</span>
                    </li>
                    <li className="flex items-start gap-3 lg:gap-4">
                      <span className="flex-shrink-0 w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm lg:text-base mt-0.5">3</span>
                      <span className="text-base lg:text-lg leading-relaxed">กดปุ่ม SPIN! หรือคลิกที่กึ่งกลางวงล้อเพื่อให้มันเริ่มหมุน</span>
                    </li>
                  </ol>
                </div>

                <div className="mt-20 space-y-10">
                  <h2 className="font-prompt font-black text-3xl text-slate-900 flex items-center gap-3">
                    <HelpCircle className="w-8 h-8 text-primary" /> คำถามที่พบบ่อย (FAQ)
                  </h2>
                  <div className="divide-y divide-slate-100">
                    <FAQItem 
                      question="วงล้อสุ่มมีการล็อคผลลัพธ์หรือไม่?"
                      answer="ไม่มีการล็อคผล 100% ครับ เราใช้อัลกอริทึมสุ่มที่ยุติธรรม (PRNG) ทุกครั้งที่กดหมุน ทุกตัวเลือกมีโอกาสออกเท่ากันตามหลักความน่าจะเป็น"
                    />
                    <FAQItem 
                      question="จะแชร์ผลลัพธ์ให้เพื่อนดูได้ยังไง?"
                      answer="เมื่อวงล้อหยุดหมุน จะมีปุ่ม 'บันทึกรูปภาพ' ปรากฏขึ้น คุณสามารถกดเพื่อเซฟรูปภาพสรุปผลสวยๆ ไปโพสต์ลงโซเชียล หรือส่งเข้าแชทกลุ่มได้ทันที"
                    />
                    <FAQItem 
                      question="ใส่ตัวเลือกได้สูงสุดกี่ช่อง?"
                      answer="เพื่อประสิทธิภาพสูงสุด คุณสามารถใส่ตัวเลือกได้มากถึง 100 รายชื่อ แต่เพื่อให้ตัวอักษรไม่เล็กจนเกินไป เราแนะนำให้อยู่ที่ 2-30 ตัวเลือกครับ"
                    />
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar Section */}
          <aside className="space-y-6">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                <h3 className="font-black text-xl font-prompt text-slate-800">ไอเดียการใช้งาน</h3>
                <div className="space-y-3">
                  <IdeaCard icon="🍱" title="เที่ยงนี้กินอะไรดี?" text="สุ่มเลือกร้านอาหารกับเพื่อน" />
                  <IdeaCard icon="🎁" title="จับฉลากผู้โชคดี" text="ใช้สำหรับกิจกรรมแจกรางวัล" />
                  <IdeaCard icon="🕹️" title="เกมบทลงโทษ" text="สร้างสีสันให้กับกิจกรรมปาร์ตี้" />
                </div>
              </div>
              <AdBanner slot="sidebar-sq" />
            </div>
          </aside>

        </div>
      </div>

      {/* 4. Bottom Ad Banner */}
      <div className="max-w-7xl mx-auto w-full px-6 py-12">
        <AdBanner slot="tool-bottom" />
      </div>
    </div>
  );
}

const IdeaCard = ({ icon, title, text }: { icon: string; title: string; text: string }) => (
  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-3 hover:bg-orange-50 transition-colors cursor-default">
    <span className="text-2xl">{icon}</span>
    <div>
      <div className="font-bold text-slate-800 text-sm">{title}</div>
      <div className="text-xs text-slate-500">{text}</div>
    </div>
  </div>
);

const FAQItem = ({ question, answer }: { question: string; answer: string }) => (
  <div className="py-6 space-y-3">
    <h3 className="font-prompt font-bold text-xl text-slate-800 m-0">{question}</h3>
    <p className="text-slate-500 m-0 leading-relaxed text-lg">{answer}</p>
  </div>
);
