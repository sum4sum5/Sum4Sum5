import React from 'react';
import { Metadata } from 'next';
import FortuneWheel from '@/components/FortuneWheel';
import StickyAd from '@/components/StickyAd';
import { FerrisWheel, Sparkles, Image as ImageIcon, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'วงล้อเสี่ยงดวง ออนไลน์ (Fortune Wheel) - วงล้อสุ่มชื่อ สุ่มอาหาร หมุนวงล้อฟรี!',
  description: 'สร้างวงล้อเสี่ยงดวงออนไลน์ฟรี! วงล้อสุ่มชื่อ สุ่มรายชื่ออาหาร สุ่มชื่อเพื่อน หรือจับฉลากออนไลน์ ดีไซน์พรีเมียม ใช้งานง่าย หมุนลื่นที่สุดในไทย บันทึกรูปผลลัพธ์ได้ทันที',
  keywords: ['วงล้อเสี่ยงดวง', 'วงล้อสุ่มชื่อ', 'วงล้อสุ่มอาหาร', 'สุ่มวงล้อ', 'หมุนวงล้อ', 'สุ่มรายชื่อ', 'fortune wheel online', 'สุ่มจับฉลาก', 'โปรแกรมสุ่ม'],
};

export default function WheelPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "วงล้อเสี่ยงดวง ออนไลน์ (Fortune Wheel) - Sum4Sum5",
    "operatingSystem": "All",
    "applicationCategory": "UtilitiesApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "THB"
    },
    "description": "เครื่องมือสร้างวงล้อเสี่ยงดวงออนไลน์ที่สวยและพรีเมียมที่สุด รองรับทั้งการใส่ชื่อและรูปภาพ บันทึกผลลัพธ์ได้ทันที",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "2450"
    }
  };

  return (
    <div className="min-h-screen bg-transparent pb-24 lg:pb-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Subtle Top Ad space - Maximize Revenue */}
      <div className="w-full bg-white border-b border-slate-100 py-1 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6">
          <div className="w-full h-12 md:h-16 bg-slate-50 border border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-400 text-[10px] md:text-xs font-bold">
            พื้นที่โฆษณา (Ad Banner)
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-4 lg:pt-8 pb-4 space-y-4 lg:space-y-6">
        {/* Main Tool - Now at the very top for best UX */}
        <div className="w-full">
           <FortuneWheel />
        </div>

        {/* Deep Content & SEO Section - Making it AdSense Friendly */}
        <div className="grid lg:grid-cols-[1fr_350px] gap-12 pt-16 border-t border-slate-100">
           <div className="space-y-16">
              {/* Expert Article Section */}
              <article className="prose prose-slate max-w-none px-4">
                <h2 className="font-prompt font-black text-3xl lg:text-4xl text-slate-900 leading-tight mb-8">
                  ทำไมสุ่มสี่สุ่มห้าถึงเป็น <span className="text-primary italic">วงล้อสุ่ม</span> อันดับ 1 ของคุณ?
                </h2>
                <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-medium">
                  <p>
                    ในยุคที่เรามีทางเลือกมากมายจนบางครั้งเกิดภาวะ <strong>&quot;Decision Fatigue&quot;</strong> หรือความล้าในการตัดสินใจ 
                    เว็บไซต์ <strong>สุ่มสี่สุ่มห้า (Sum4Sum5)</strong> จึงถูกพัฒนาขึ้นมาเพื่อเป็นเครื่องมือสุดทันสมัย 
                    ที่จะเปลี่ยนการเลือกที่ยุ่งยากให้กลายเป็นเรื่องสนุกและยุติธรรมที่สุด
                  </p>
                  <p>
                    เรารู้ว่าความสนุกของการสุ่มคือการได้ลุ้นผลลัพธ์ เราจึงออกแบบทุกองค์ประกอบด้วยความเข้าใจใน UX (User Experience) 
                    ไม่ว่าจะเป็นวงล้อที่หมุนได้อย่างลื่นไหล เสียงประกอบที่ตื่นเต้น และฟีเจอร์การปรับแต่งธีมสีที่หลากหลาย 
                    รวมถึงการรองรับภาษาไทยอย่างสมบูรณ์แบบ ทำให้คุณมั่นใจได้ว่าทุกการสุ่มจะเป็นไปอย่างราบรื่น
                  </p>
                </div>

                <div className="mt-12 bg-orange-50/50 rounded-3xl p-8 border border-orange-100/50">
                  <h3 className="font-prompt font-black text-2xl text-slate-900 mb-6 flex items-center gap-2">
                    <Zap className="w-6 h-6 text-primary" /> วิธีการใช้งานวงล้อสุ่มออนไลน์
                  </h3>
                  <ol className="space-y-4 text-slate-600 font-medium list-none p-0">
                    <li className="flex gap-4">
                      <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shrink-0 font-bold">1</span>
                      <span>พิมพ์ <strong>รายชื่อ</strong> หรือ <strong>ตัวเลือก</strong> ที่ต้องการลงในเมนูตั้งค่าด้านซ้าย (รองรับการใส่รูปภาพ)</span>
                    </li>
                    <li className="flex gap-4">
                      <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shrink-0 font-bold">2</span>
                      <span>เลือก <strong>ธีมสี</strong> ที่ต้องการเพื่อให้วงล้อของคุณสวยโดดเด่นไม่ซ้ำใคร</span>
                    </li>
                    <li className="flex gap-4">
                      <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shrink-0 font-bold">3</span>
                      <span>กดปุ่ม <strong>SPIN!</strong> หรือคลิกที่กึ่งกลางวงล้อเพื่อให้มันเริ่มหมุน</span>
                    </li>
                    <li className="flex gap-4">
                      <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shrink-0 font-bold">4</span>
                      <span>รอผลลัพธ์และกด <strong>บันทึกภาพ</strong> เพื่อแชร์ความโชคดีของคุณลงโซเชียล!</span>
                    </li>
                  </ol>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-6 mt-12">
                   <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                      <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-primary mb-6">
                        <FerrisWheel className="w-7 h-7" />
                      </div>
                      <h3 className="font-prompt font-bold text-xl text-slate-900 m-0 mb-3">ปรับแต่งได้อิสระ</h3>
                      <p className="text-slate-500 m-0 leading-relaxed">เพิ่มรูปภาพ ใส่รายชื่อในรูปแบบข้อความดิบ หรือเลือกธีมสีที่ชอบได้ตามต้องการ</p>
                   </div>
                   <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                      <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-500 mb-6">
                        <ImageIcon className="w-7 h-7" />
                      </div>
                      <h3 className="font-prompt font-bold text-xl text-slate-900 m-0 mb-3">บันทึกรูปภาพได้ทันที</h3>
                      <p className="text-slate-500 m-0 leading-relaxed">เมื่อสุ่มเสร็จ ระบบจะสร้างการ์ดผลลัพธ์ที่สวยงามให้คุณบันทึกเป็นรูปภาพเพื่อแชร์ต่อ</p>
                   </div>
                </div>

                {/* FAQ Section - Crucial for AdSense & SEO */}
                <div className="mt-20 space-y-10">
                  <h2 className="font-prompt font-black text-3xl text-slate-900">คำถามที่พบบ่อย (FAQ)</h2>
                  <div className="divide-y divide-slate-100">
                    <FAQItem 
                      question="วงล้อเสี่ยงดวงของสุ่มสี่สุ่มห้ายุติธรรมจริงไหม?"
                      answer="แน่นอนครับ ระบบของเราใช้อัลกอริทึมการสุ่มเชิงคณิตศาตร์แบบ Random Number Generation (RNG) ที่ได้มาตรฐานสูง ทุกซีกของวงล้อมีโอกาสถูกสุ่มโดนเท่ากันตามสัดส่วนพื้นที่ครับ"
                    />
                    <FAQItem 
                      question="สามารถใส่รายชื่อได้สูงสุดกี่ชื่อ?"
                      answer="ปัจจุบันระบบของเรารองรับการใส่รายชื่อได้มากถึง 100 รายชื่อในครั้งเดียวเพื่อให้การแสดงผลตัวอักษรยังคงความสวยงามและอ่านง่ายครับ"
                    />
                    <FAQItem 
                      question="ใช้งานฟรีและไม่ต้องสมัครสมาชิกใช่ไหม?"
                      answer="ใช่ครับ เป้าหมายของเราคือการเป็นเครื่องมือที่ดีที่สุดให้ทุกคนใช้งานได้ฟรี 100% โดยไม่มีข้อจำกัดและไม่ต้องเสียเวลาสมัครสมาชิกครับ"
                    />
                    <FAQItem 
                      question="สามารถตั้งค่าให้ชื่อที่ซ้ำออกไปหลังจากสุ่มได้ไหม?"
                      answer="ได้ครับ เพียงเข้าไปที่ลิสต์รายชื่อในเมนูตั้งค่า คุณสามารถเลือกจัดการรายชื่อที่ต้องการได้ทันที เพื่อให้การสุ่มครั้งถัดไปไม่มีชื่อเดิมซ้ำครับ"
                    />
                  </div>
                </div>
              </article>
           </div>

           <aside className="space-y-6 px-4">
              <div className="sticky top-24 space-y-6">
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                  <h3 className="font-black text-xl font-prompt text-slate-800">ไอเดียการใช้งาน</h3>
                  <div className="space-y-3">
                    <IdeaCard icon="🍱" title="เที่ยงนี้กินอะไรดี?" text="สุ่มเลือกร้านอาหารกับเพื่อนร่วมงาน" />
                    <IdeaCard icon="🎁" title="จับฉลากผู้โชคดี" text="ใช้สำหรับกิจกรรมแจกรางวัลหรืองานปาร์ตี้" />
                    <IdeaCard icon="🕹️" title="เกมบทลงโทษ" text="สร้างสีสันให้กับวงเหล้าหรือกิจกรรมรับน้อง" />
                  </div>
                </div>

                {/* Sidebar Ad space */}
                <div className="w-full aspect-[300/600] bg-slate-50/50 border border-dashed border-slate-200 rounded-[3rem] flex flex-col items-center justify-center text-slate-400 text-sm text-center px-8 font-bold gap-4 backdrop-blur-sm">
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

const IdeaCard = ({ icon, title, text }: { icon: string; title: string; text: string }) => (
  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-3 hover:bg-orange-50 transition-colors">
    <span className="text-2xl">{icon}</span>
    <div>
      <div className="font-bold text-slate-800 text-sm">{title}</div>
      <div className="text-xs text-slate-500">{text}</div>
    </div>
  </div>
);
