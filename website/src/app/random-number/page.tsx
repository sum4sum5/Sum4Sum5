import React from 'react';
import { Metadata } from 'next';
import NumberRandomizer from '@/components/NumberRandomizer';
import StickyAd from '@/components/StickyAd';
import { Sparkles, Zap, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'สุ่มเลข ออนไลน์ (Number Randomizer) - สุ่มตัวเลข สุ่มหวย จับฉลากตัวเลขฟรี!',
  description: 'เครื่องมือสุ่มตัวเลขออนไลน์ฟรี สุ่มเลข 2 ตัว 3 ตัว หรือ 6 ตัว (สุ่มหวย) กำหนดช่วงได้อิสระ รวดเร็ว แม่นยำ บันทึกรูปผลลัพธ์พรีเมียมได้ทันที เหมาะสำหรับจับฉลากและเสี่ยงโชคทุกประเภท',
  keywords: ['สุ่มเลข', 'สุ่มตัวเลข', 'สุ่มหวย', 'สุ่มเลข 2 ตัว', 'สุ่มเลข 3 ตัว', 'สุ่มเลข 6 ตัว', 'โปรแกรมสุ่มเลข', 'จับฉลากออนไลน์', 'จับฉลากตัวเลข'],
};

export default function NumberPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "สุ่มเลข ออนไลน์ (Number Randomizer) - Sum4Sum5",
    "operatingSystem": "All",
    "applicationCategory": "UtilitiesApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "THB"
    },
    "description": "เครื่องมือสุ่มตัวเลขออนไลน์ฟรีที่สวยและลื่นไหลที่สุด กำหนดช่วงตัวเลขได้อิสระ มีโหมดเต็มจอ และบันทึกภาพผลลัพธ์ได้ทันที",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "1280"
    }
  };

  return (
    <div className="min-h-screen bg-transparent pb-24 lg:pb-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Subtle Top Ad space - Restored to top */}
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
           <NumberRandomizer />
        </div>

        {/* Deep Content & SEO Section */}
        <div className="grid lg:grid-cols-[1fr_350px] gap-12 pt-16 border-t border-slate-100">
           <div className="space-y-16">
              {/* Expert Article Section */}
              <article className="prose prose-slate max-w-none px-4">
                <h2 className="font-prompt font-black text-3xl lg:text-4xl text-slate-900 leading-tight mb-8">
                  ต้องการ <span className="text-primary italic">สุ่มเลข</span> แบบแม่นยำและยุติธรรม?
                </h2>
                <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-medium">
                  <p>
                    ไม่ว่าคุณจะต้องการสุ่มเลขเพื่อหาผู้โชคดี, สุ่มเลขในใจสำหรับกิจกรรมสนุกๆ หรือสุ่มตัวเลขเพื่อการทดลองเชิงสถิติ 
                    เครื่องมือ <strong>สุ่มตัวเลขออนไลน์</strong> ของเราถูกออกแบบมาให้ตอบโจทย์ทุกความต้องการ ด้วยระบบการคำนวณที่แม่นยำ 
                    และหน้าตาส่วนติดต่อผู้ใช้งาน (UI) ที่สะอาดตาและลื่นไหลที่สุด
                  </p>
                  <p>
                    คุณสามารถกำหนดช่วงตัวเลขที่ต้องการได้อย่างอิสระ ตั้งแต่เลขหลักหน่วย (1-9) ไปจนถึงเลขหลักล้าน 
                    โดยระบบจะทำการประมวลผลทันทีที่กดปุ่มสุ่ม พร้อมฟีเจอร์การแสดงผลลัพธ์แบบ Animation ที่ช่วยให้การลุ้นรางวัลของคุณตื่นเต้นยิ่งขึ้น
                  </p>
                </div>

                <div className="mt-12 bg-orange-50/50 rounded-3xl p-8 border border-orange-100/50">
                  <h3 className="font-prompt font-black text-2xl text-slate-900 mb-6 flex items-center gap-2">
                    <Zap className="w-6 h-6 text-primary" /> วิธีการใช้งานเครื่องสุ่มเลข
                  </h3>
                  <ol className="space-y-4 text-slate-600 font-medium list-none p-0">
                    <li className="flex gap-4">
                      <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shrink-0 font-bold">1</span>
                      <span>กำหนด <strong>ช่วงตัวเลข</strong> ที่ต้องการ (เริ่มต้น และ สิ้นสุด)</span>
                    </li>
                    <li className="flex gap-4">
                      <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shrink-0 font-bold">2</span>
                      <span>เลือก <strong>จำนวน</strong> ที่ต้องการสุ่ม (สุ่มครั้งละกี่ตัวพร้อมกัน)</span>
                    </li>
                    <li className="flex gap-4">
                      <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shrink-0 font-bold">3</span>
                      <span>กดปุ่ม <strong>START!</strong> หรือลาก <strong>คันโยกสล็อต</strong> เพื่อเริ่มสุ่มเลข</span>
                    </li>
                    <li className="flex gap-4">
                      <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shrink-0 font-bold">4</span>
                      <span>แชร์ผลลัพธ์โดยการกดปุ่ม <strong>บันทึกภาพ</strong> หรือเปิดโหมด <strong>ขยายเต็มจอ</strong> เพื่อความตื่นเต้น!</span>
                    </li>
                  </ol>
                </div>

                <div className="mt-20 space-y-10">
                  <h2 className="font-prompt font-black text-3xl text-slate-900 flex items-center gap-3">
                    <HelpCircle className="w-8 h-8 text-primary" /> คำถามที่พบบ่อย (FAQ)
                  </h2>
                  <div className="divide-y divide-slate-100">
                    <FAQItem 
                      question="สุ่มเลข 2 ตัว หรือ 3 ตัว ได้ไหม?"
                      answer="ได้แน่นอนครับ เพียงแค่คุณกำหนดช่วงเริ่มต้นเป็น 0 และตัวเลขสุดท้ายเป็น 99 สำหรับเลข 2 ตัว หรือ 999 สำหรับเลข 3 ตัว ระบบจะสุ่มภายในช่วงนั้นให้ทันทีครับ"
                    />
                    <FAQItem 
                      question="ผลลัพธ์การสุ่มมีการล็อคค่าไว้ล่วงหน้าไหม?"
                      answer="ไม่มีการล็อคค่าครับ ระบบของเราใช้การสุ่มแบบกระจายตัวที่สมบูรณ์ (Pseudo-Random Generation) ทุกตัวเลขมีโอกาสถูกสุ่มได้เท่ากันตามหลักสถิติครับ"
                    />
                    <FAQItem 
                      question="ใช้สุ่มเลข 6 หลัก (สลากกินแบ่ง) ได้อย่างไร?"
                      answer="ใช้ฟีเจอร์ '6-digit (Lottery)' ในเมนูตั้งค่าได้เลยครับ ระบบจะทำการสุ่มเลข 6 หลักพร้อมแอนิเมชั่นตู้สล็กที่สมบูรณ์แบบที่สุด"
                    />
                  </div>
                </div>
              </article>
           </div>

           <aside className="space-y-6 px-4">
              <div className="sticky top-24 space-y-6">
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                  <h3 className="font-black text-xl font-prompt text-slate-800">การใช้งานยอดนิยม</h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-3">
                      <span className="text-2xl">🗳️</span>
                      <div>
                        <div className="font-bold text-slate-800 text-sm">สุ่มหาผู้โชคดี</div>
                        <div className="text-xs text-slate-500">ใช้สุ่มเลขลำดับคิวหรือรางวัล</div>
                      </div>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-3">
                      <span className="text-2xl">🎲</span>
                      <div>
                        <div className="font-bold text-slate-800 text-sm">ทอยเต๋าแบบดิจิทัล</div>
                        <div className="text-xs text-slate-500">สุ่มเลข 1-6 ง่ายๆ ได้ทันที</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar Ad space */}
                <div className="w-full aspect-square bg-slate-50/50 border border-dashed border-slate-200 rounded-[3rem] flex flex-col items-center justify-center text-slate-400 text-sm text-center px-8 font-bold gap-4 backdrop-blur-sm">
                  <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shadow-sm">
                    <Sparkles className="w-8 h-8 opacity-20" />
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
