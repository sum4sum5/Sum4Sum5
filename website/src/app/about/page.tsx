import React from 'react';
import { Info, Heart, Target, FerrisWheel, Sparkles, Zap } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'รู้จักสุ่มสี่สุ่มห้า | สุ่มสี่สุ่มห้า (Sum4Sum5)',
  description: 'ทำความรู้จักกับสปีริตของทีมงานสุ่มสี่สุ่มห้า เป้าหมายของเราคือการสร้างเครื่องมือสุ่มที่ดีที่สุดและสนุกที่สุดเพื่อทุกคน',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center space-y-4 mb-20">
          <div className="w-16 h-16 bg-orange-100 rounded-3xl flex items-center justify-center text-primary mx-auto mb-6">
            <Info className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-prompt font-black text-slate-900 leading-tight">
            ทำความรู้จักกับ <br/>
            <span className="text-primary italic">สุ่มสี่สุ่มห้า (Sum4Sum5)</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            เพราะเราเชื่อว่าการตัดสินใจที่สนุกที่สุด คือการปล่อยให้โชคชะตาช่วยนำทางในแบบที่มีสไตล์
          </p>
        </div>

        <div className="space-y-24">
          {/* Our Mission */}
          <section className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-primary font-bold tracking-widest uppercase text-xs">
                <Target className="w-4 h-4" /> Our Mission
              </div>
              <h2 className="text-3xl font-prompt font-black text-slate-900 m-0">เป้าหมายของเรา</h2>
              <p className="text-slate-600 leading-loose text-lg">
                ไม่ว่าจะเป็นการลดความกังวลในการเลือกมื้ออาหาร เพิ่มความตื่นเต้นในกิจกรรมกลุ่ม หรือแม้แต่การใช้ แคปชั่น AI เพื่อสร้างสีสันบนโซเชียลมีเดีย
              </p>
            </div>
            <div className="bg-slate-50 p-12 rounded-[3.5rem] flex items-center justify-center">
               <div className="w-32 h-32 bg-white rounded-[2.5rem] shadow-2xl flex items-center justify-center animate-bounce-slow">
                  <FerrisWheel className="w-16 h-16 text-primary" />
               </div>
            </div>
          </section>

          {/* Core Values */}
          <section className="space-y-12">
            <h2 className="text-3xl font-prompt font-black text-slate-900 text-center">หัวใจสำคัญของเรา</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              <ValueCard 
                icon={<Heart className="w-6 h-6" />}
                title="ใส่ใจในดีไซน์"
                text="เราเชื่อว่าเครื่องมือสุ่มไม่จำเป็นต้องดูน่าเบื่อ เว็บของเราจึงถูกออกแบบด้วยความโมเดิร์นและพรีเมียมเสมอ"
              />
              <ValueCard 
                icon={<Zap className="w-6 h-6" />}
                title="เรียบง่ายและรวดเร็ว"
                text="ลดขั้นตอนการคลิกให้น้อยที่สุด เพื่อให้คุณได้ผลลัพธ์ที่ต้องการภายในไม่กี่วินาที"
              />
              <ValueCard 
                icon={<Sparkles className="w-6 h-6" />}
                title="นวัตกรรม AI"
                text="เราไม่เคยหยุดนิ่ง โดยการนำระบบ AI มาช่วยสร้างสรรค์แคปชั่นและไอเดียต่างๆ ให้คุณ"
              />
            </div>
          </section>

          {/* Call to Action */}
          <section className="bg-slate-900 p-12 rounded-[3.5rem] text-center space-y-8">
            <h2 className="text-3xl font-prompt font-black text-white m-0">มาร่วมสนุกกับเราวันนี้</h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              ลองใช้เครื่องมือวงล้อสุ่ม สุ่มเลข หรือแคปชั่น AI ของเราดู แล้วคุณจะรู้ว่าการสุ่มไม่ใช่เรื่องยากอีกต่อไป
            </p>
            <Link 
              href="/wheel"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-orange-500/20"
            >
              ไปหน้าวงล้อสุ่ม <Zap className="w-5 h-5 fill-white" />
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}

const ValueCard = ({ icon, title, text }: { icon: React.ReactNode, title: string, text: string }) => (
  <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all space-y-4">
    <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-primary">
      {icon}
    </div>
    <h3 className="font-prompt font-bold text-xl text-slate-900 m-0">{title}</h3>
    <p className="text-slate-500 m-0 leading-relaxed text-sm">{text}</p>
  </div>
);
