import React from 'react';
import { Metadata } from 'next';
import NameRandomizer from '@/components/NameRandomizer';
import StickyAd from '@/components/StickyAd';
import { Trophy, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'สุ่มชื่อ ออนไลน์ - จับฉลากสุ่มผู้โชคดี โปรแกรมจับสลากพรีเมียม (Random Name Picker)',
  description: 'เครื่องมือสุ่มชื่อออนไลน์ จับฉลากออนไลน์ฟรี ดีไซน์สวยระดับพรีเมียม สุ่มรายชื่อผู้โชคดี จับสลากของรางวัลพร้อมภาพประกาศผลระดับมืออาชีพ แชร์ลงโซเชียลได้ทันที ใช้งานง่ายที่สุด',
  keywords: ['สุ่มชื่อ', 'สุ่มรายชื่อ', 'จับฉลากออนไลน์', 'จับสลากออนไลน์', 'โปรแกรมสุ่มชื่อ', 'สุ่มผู้โชคดี', 'จับรางวัล', 'สุ่มกลุ่ม', 'เว็บสุ่มชื่อ'],
};

export default function NamePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "เครื่องมือสุ่มชื่อ ออนไลน์ - สุ่มสี่สุ่มห้า",
    "operatingSystem": "Web",
    "applicationCategory": "UtilityApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "THB"
    },
    "description": "เครื่องมือสุ่มชื่อออนไลน์ที่สวยที่สุด สุ่มรายชื่อผู้โชคดีพร้อมภาพประกาศผลระดับมืออาชีพ ดีไซน์ 3D พรีเมียม แชร์ลงโซเชียลได้ทันที",
    "featureList": [
      "สุ่มรายชื่อผู้โชคดี",
      "สุ่มแบ่งกลุ่ม",
      "บันทึกผลลัพธ์เป็นรูปภาพ",
      "ดีไซน์พรีเมียม 3D"
    ]
  };

  const howToLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "วิธีใช้งานเครื่องมือสุ่มชื่อ ออนไลน์",
    "step": [
      {
        "@type": "HowToStep",
        "name": "ใส่รายชื่อ",
        "text": "กรอกรายชื่อที่คุณต้องการสุ่มลงในช่องรับข้อมูลด้านซ้ายมือ"
      },
      {
        "@type": "HowToStep",
        "name": "กดปุ่มสุ่ม",
        "text": "เลือกโหมดที่ต้องการ (สุ่มผู้ชนะ หรือ สุ่มกลุ่ม) แล้วกดปุ่ม Start"
      },
      {
        "@type": "HowToStep",
        "name": "บันทึกและแชร์",
        "text": "ระบบจะแสดง Popup ผลลัพธ์ที่สวยงาม คุณสามารถกดปุ่ม บันทึกภาพ เพื่อเซฟรูปไปแชร์ต่อได้ทันที"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-transparent pb-24 lg:pb-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }}
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
        <NameRandomizer />

        {/* Deep Content & SEO Section */}
        <div className="grid lg:grid-cols-[1fr_350px] gap-12 pt-16 border-t border-slate-100">
           <div className="space-y-16">
              {/* Expert Article Section */}
              <article className="prose prose-slate max-w-none px-4">
                <header className="mb-12">
                  <h2 className="font-prompt font-black text-3xl lg:text-5xl text-slate-900 leading-tight mb-6">
                    โปรแกรม <span className="text-primary italic">สุ่มรายชื่อ</span> และจับฉลากออนไลน์ที่แม่นยำที่สุด
                  </h2>
                  <p className="text-xl text-slate-500 leading-relaxed font-medium">
                    ไม่ว่าจะเป็นการจับสลากของขวัญ สุ่มรายชื่อผู้โชคดีรับรางวัล หรือการสุ่มแบ่งกลุ่มทีมงาน ระบบของเราคือ <strong>เว็บสุ่มชื่อ</strong> ที่ตอบโจทย์คุณมากที่สุด
                  </p>
                </header>

                <div className="space-y-12 text-lg text-slate-600 leading-relaxed font-medium">
                  <section className="space-y-6">
                    <h3 className="text-2xl font-black text-slate-800 font-prompt">ทำไมต้องเลือก โปรแกรมจับฉลาก กับ Sum4Sum5?</h3>
                    <p>
                      การหา <strong>โปรแกรมสุ่มชื่อ</strong> หรือ <strong>โปรแกรมจับฉลากออนไลน์</strong> ที่ใช้งานง่ายและดีไซน์สวยนั้นไม่ใช่เรื่องง่าย 
                      เราจึงสร้างเครื่องมือนี้ขึ้นมาเพื่อให้การจับรางวัลของคุณดูเป็นมืออาชีพ ด้วยระบบแสดงผล 3D และภาพประกาศผลที่สวยงาม 
                      ไม่ว่าคุณจะเป็นแม่ค้าออนไลน์ที่ต้องการ <strong>สุ่มผู้โชคดี</strong> หรือครูที่ต้องการ <strong>สุ่มรายชื่อนักเรียน</strong> 
                      ก็สามารถใช้งานได้ฟรี 100%
                    </p>
                  </section>

                  <section className="bg-orange-50/50 p-8 rounded-[3rem] border border-orange-100 space-y-6">
                    <h3 className="text-2xl font-black text-slate-800 font-prompt">วิธีใช้ เว็บสุ่มชื่อ ง่ายๆ ใน 3 ขั้นตอน</h3>
                    <ol className="list-none p-0 space-y-4">
                      <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">1</span>
                        <span><strong>ใส่รายชื่อ:</strong> คัดลอกรายชื่อสำหรับ <strong>จับสลาก</strong> จาก Excel หรือพิมพ์ลงไปโดยตรง</span>
                      </li>
                      <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">2</span>
                        <span><strong>เลือกโหมด:</strong> เลือกว่าจะสุ่มหาผู้โชคดีเพียงคนเดียว หรือ <strong>สุ่มแบ่งกลุ่ม (สุ่มทีม)</strong></span>
                      </li>
                      <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">3</span>
                        <span><strong>ลุ้นผลและแชร์:</strong> กดปุ่มสุ่ม แล้วบันทึกภาพผลลัพธ์การ <strong>จับฉลาก</strong> ไปลงโซเชียลได้ทันที</span>
                      </li>
                    </ol>
                  </section>

                  <section className="space-y-6">
                    <h3 className="text-2xl font-black text-slate-800 font-prompt">เหมาะสำหรับแม่ค้าออนไลน์และครูผู้สอน</h3>
                    <p>
                      เครื่องมือนี้รองรับการใช้งานที่หลากหลาย เช่น การ <strong>สุ่มรายชื่อผู้โชคดี</strong> เพื่อรับรางวัลในกิจกรรมไลฟ์สด (Live Stream) 
                      หรือการ <strong>สุ่มแบ่งกลุ่มนักเรียน</strong> เพื่อทำกิจกรรมในห้องเรียน ระบบของเราไม่มีการล็อคผล มั่นใจได้ว่ายุติธรรม 100% 
                      และยังสามารถใช้งานบนมือถือได้ลื่นไหล ไม่ต้องโหลดแอปเพิ่ม
                    </p>
                  </section>
                </div>

                <div className="mt-20 space-y-10">
                  <h2 className="font-prompt font-black text-3xl text-slate-900 flex items-center gap-3">
                    <HelpCircle className="w-8 h-8 text-primary" /> คำถามที่พบบ่อย (FAQ)
                  </h2>
                  <div className="divide-y divide-slate-100 border-t border-slate-100">
                    <FAQItem 
                      question="สุ่มชื่อแล้วสามารถบันทึกเป็นรูปภาพได้ไหม?"
                      answer="ได้ครับ! ระบบของเราจะสร้างภาพประกาศผลที่สวยงามระดับพรีเมียม (Premium Wave Poster) พร้อมไอคอนถ้วยรางวัล 3D คุณสามารถกดปุ่ม 'บันทึกภาพ' เพื่อเซฟรูปลงเครื่องและนำไปแชร์ต่อได้ทันทีครับ"
                    />
                    <FAQItem 
                      question="สุ่มแบ่งกลุ่มได้มากที่สุดกี่กลุ่ม?"
                      answer="คุณสามารถสุ่มแบ่งกลุ่มได้ตามจำนวนรายชื่อที่มีครับ ระบบจะกระจายรายชื่อลงในแต่ละกลุ่มให้เท่าๆ กันอย่างยุติธรรมที่สุด เหมาะสำหรับการจัดทีมทำงานหรือจับฉลากแข่งกีฬาครับ"
                    />
                    <FAQItem 
                      question="สามารถสุ่มรายชื่อได้มากที่สุดกี่คน?"
                      answer="ระบบของเรารองรับการสุ่มรายชื่อได้หลายร้อยรายชื่อในคราวเดียวครับ โดยไม่มีการสะดุดหรือช้าลงแต่อย่างใดครับ"
                    />
                    <FAQItem 
                      question="ข้อมูลรายชื่อจะปลอดภัยไหม?"
                      answer="ปลอดภัยแน่นอนครับ ข้อมูลรายชื่อจะถูกเก็บไว้ในระดับเบราว์เซอร์ของคุณเท่านั้น เราไม่มีการบันทึกข้อมูลส่วนบุคคลลงเซิร์ฟเวอร์ และข้อมูลจะถูกล้างออกเมื่อคุณปิดหน้าเว็บหรือกดปุ่มล้างรายชื่อครับ"
                    />
                  </div>
                </div>
              </article>
           </div>

           <aside className="space-y-6 px-4">
              <div className="sticky top-24 space-y-6">
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                  <h3 className="font-black text-xl font-prompt text-slate-800">ไอเดียการสุ่ม</h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-3">
                      <span className="text-2xl">🏆</span>
                      <div>
                        <div className="font-bold text-slate-800 text-sm">สุ่มผู้โชคดีรับรางวัล</div>
                        <div className="text-xs text-slate-500">สำหรับแม่ค้าออนไลน์หรือกิจกรรมอีเวนต์</div>
                      </div>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-3">
                      <span className="text-2xl">👥</span>
                      <div>
                        <div className="font-bold text-slate-800 text-sm">สุ่มแบ่งกลุ่มทำงาน</div>
                        <div className="text-xs text-slate-500">จับฉลากแบ่งกลุ่มเพื่อนหรือนักเรียน</div>
                      </div>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-3">
                      <span className="text-2xl">🎁</span>
                      <div>
                        <div className="font-bold text-slate-800 text-sm">สุ่มลำดับจับฉลาก</div>
                        <div className="text-xs text-slate-500">สำหรับกิจกรรมสอยดาวหรือสลากภาระ</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar Ad space */}
                <div className="w-full aspect-square bg-slate-50/50 border border-dashed border-slate-200 rounded-[3rem] flex flex-col items-center justify-center text-slate-400 text-sm text-center px-8 font-bold gap-4 backdrop-blur-sm">
                  <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shadow-sm">
                    <Trophy className="w-8 h-8 opacity-20 text-orange-500" />
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
