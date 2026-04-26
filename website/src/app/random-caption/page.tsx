import React from 'react';
import { Metadata } from 'next';
import ContentAssistant from '@/components/CaptionGenerator';
import StickyAd from '@/components/StickyAd';
import { Sparkles, Heart, Share2, HelpCircle, Wand2, Laugh } from 'lucide-react';

export const metadata: Metadata = {
  title: 'สุ่มแคปชั่นกวนๆ สายฮา สายอ่อย แคปชั่นไอจี (AI Caption Generator) - สุ่มสี่สุ่มห้า',
  description: 'เครื่องมือสุ่มแคปชั่นกวนๆ แคปชั่นไอจี สายฮา สายอ่อย และแคปชั่นคาเฟ่ ช่วยคิดแคปชั่นโดนๆ ให้โพสต์โซเชียลของคุณมี engagement พุ่งกระจาย ครบทุกเทรนด์ปี 2026 ใช้งานง่ายที่สุด',
  keywords: ['สุ่มแคปชั่น', 'สุ่มแคปชั่นกวนๆ', 'แคปชั่นไอจี', 'แคปชั่นสายฮา', 'แคปชั่นสายอ่อย', 'แคปชั่นคาเฟ่', 'คิดแคปชั่นให้หน่อย', 'AI เขียนแคปชั่น', 'สุ่มสี่สุ่มห้า'],
};

export default function CaptionPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "สุ่มแคปชั่น (Caption Generator) by Sum4Sum5",
    "operatingSystem": "Web",
    "applicationCategory": "BusinessApplication",
    "description": "เครื่องมือสุ่มแคปชั่นอัจฉริยะ ทั้งแคปชั่นกวนๆ สายฮา สายอ่อย และสายมู สำหรับโซเชียลมีเดียทุกแพลตฟอร์ม",
    "featureList": [
      "สุ่มแคปชั่นสายฮา/กวนๆ",
      "สุ่มแคปชั่นสายอ่อย",
      "สุ่มแคปชั่นสายมู/พลังบวก",
      "สุ่มแคปชั่นสายแม่ค้าออนไลน์"
    ],
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "THB"
    }
  };

  return (
    <div className="min-h-screen bg-transparent pb-24 lg:pb-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Subtle Top Ad space */}
      <div className="w-full bg-white border-b border-gray-100 py-1 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6">
          <div className="w-full h-12 md:h-16 bg-slate-50 border border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-400 text-[10px] md:text-xs">
            พื้นที่โฆษณา (Ad Banner)
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-4 lg:pt-8 pb-4 space-y-4 lg:space-y-6">
        {/* Main Tool - Top Priority */}
        <div className="w-full">
           <ContentAssistant />
        </div>

        {/* Deep Content & SEO Section */}
        <div className="grid lg:grid-cols-[1fr_350px] gap-12 pt-16 border-t border-slate-100">
           <div className="space-y-16">
              {/* Expert Article Section */}
              <article className="prose prose-slate max-w-none px-4">
                <header>
                  <h2 className="font-prompt font-black text-3xl lg:text-4xl text-slate-900 leading-tight mb-8">
                    <span className="text-primary italic">แคปชั่น AI</span> อัจฉริยะ! ไอเดียเรียกยอดไลก์ที่ดีที่สุด
                  </h2>
                </header>
                
                <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-medium">
                  <p>
                    เบื่อไหมกับการนั่งจ้องจอนานๆ แต่คิดแคปชั่นไม่ออก? <strong>เครื่องมือสุ่มแคปชั่น AI</strong> ของเราคือคำตอบที่ดีที่สุด 
                    ไม่ว่าคุณจะหา <strong>สุ่มแคปชั่นกวนๆ</strong>, <strong>แคปชั่นสายฮา</strong>, <strong>แคปชั่นสายอ่อย</strong> หรือแม้แต่ <strong>แคปชั่นสายมู</strong> เราช่วยหาคำพูดที่ &quot;โดนใจ&quot; และ &quot;เพิ่ม Engagement&quot; ได้ในคลิกเดียว
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-6 my-10">
                    <div className="bg-orange-50/50 p-6 rounded-3xl border border-orange-100">
                      <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-4">
                        <Laugh className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-bold text-slate-800 mb-2">สายฮา & กวนๆ</h3>
                      <p className="text-sm text-slate-500">แคปชั่นสั้นๆ คมๆ ที่ทำให้คนอ่านต้องอมยิ้มและอยากแชร์ต่อ</p>
                    </div>
                    <div className="bg-red-50/50 p-6 rounded-3xl border border-red-100">
                      <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-4">
                        <Heart className="w-5 h-5 text-red-500" />
                      </div>
                      <h3 className="font-bold text-slate-800 mb-2">สายอ่อย & น่ารัก</h3>
                      <p className="text-sm text-slate-500">คำพูดอ้อนๆ อ่อยๆ แบบน่ารักที่ทำให้ยอดไลก์พุ่งกระฉูด</p>
                    </div>
                  </div>

                  <p>
                    ด้วยเทคโนโลยี AI ภาษาไทยล่าสุด ระบบของเราเข้าใจ &quot;จริต&quot; การสื่อสารที่หลากหลาย 
                    คุณสามารถเลือก Vibe ที่ต้องการได้ทันที เพื่อให้แคปชั่นที่ได้นั้นตรงกับรูปภาพและอารมณ์ของคุณที่สุด
                  </p>
                </div>

                <div className="mt-20 space-y-10">
                  <h2 className="font-prompt font-black text-3xl text-slate-900 flex items-center gap-3">
                    <HelpCircle className="w-8 h-8 text-primary" /> คำถามที่พบบ่อย (FAQ)
                  </h2>
                  <div className="divide-y divide-slate-100">
                    <FAQItem 
                      question="สุ่มแคปชั่นกวนๆ ไปใช้ที่ไหนได้บ้าง?"
                      answer="ใช้ได้ทุกที่เลยครับ! ไม่ว่าจะเป็น Facebook, Instagram, TikTok หรือแม้แต่ Twitter (X) ระบบของเราปรับจริตภาษาให้เข้ากับทุกแพลตฟอร์มครับ"
                    />
                    <FAQItem 
                      question="AI ช่วยคิดแคปชั่นได้จริงไหม?"
                      answer="จริงแท้แน่นอนครับ! เราใช้โมเดล AI ล่าสุดที่ถูกฝึกฝนมาให้เข้าใจภาษาไทยและมุกตลกของคนไทยโดยเฉพาะ ทำให้ได้แคปชั่นที่ดูเป็นธรรมชาติเหมือนคนเขียนเองเลย"
                    />
                    <FAQItem 
                      question="ใช้งานฟรีและสุ่มได้ไม่จำกัดใช่ไหม?"
                      answer="ใช่ครับ สุ่มสี่สุ่มห้าให้บริการฟรี 100% คุณสามารถกดสุ่มได้เรื่อยๆ จนกว่าจะได้แคปชั่นที่โดนใจที่สุดครับ"
                    />
                  </div>
                </div>
              </article>
           </div>

           <aside className="space-y-6 px-4">
              <div className="sticky top-24 space-y-6">
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Wand2 className="w-5 h-5 text-primary" />
                    <h3 className="font-black text-xl font-prompt text-slate-800">ฟีเจอร์ไฮไลต์</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-3">
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        <Sparkles className="w-4 h-4 text-orange-400" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-800 text-sm">ไอเดียหลากหลาย</div>
                        <div className="text-[10px] text-slate-500">รับไอเดีย 3 สไตล์ต่อการคลิกครั้งเดียว</div>
                      </div>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-3">
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        <Share2 className="w-4 h-4 text-blue-400" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-800 text-sm">แชร์ต่อได้ทันที</div>
                        <div className="text-[10px] text-slate-500">คัดลอกไปลงโซเชียลได้ในคลิกเดียว</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar Ad space */}
                <div className="w-full aspect-square bg-slate-50/50 border border-dashed border-slate-200 rounded-[3rem] flex flex-col items-center justify-center text-slate-400 text-sm text-center px-8 font-bold gap-4 backdrop-blur-sm">
                  <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shadow-sm">
                    <Heart className="w-8 h-8 opacity-20 text-red-500" />
                  </div>
                  พื้นที่โฆษณา (Ad Space)
                </div>
              </div>
           </aside>
        </div>
      </div>

      <StickyAd />
    </div>
  );
}

const FAQItem = ({ question, answer }: { question: string; answer: string }) => (
  <div className="py-6 space-y-3">
    <h3 className="font-prompt font-bold text-xl text-slate-800 m-0">{question}</h3>
    <p className="text-slate-500 m-0 leading-relaxed text-lg">{answer}</p>
  </div>
);
