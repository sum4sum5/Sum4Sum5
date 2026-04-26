import React from 'react';
import { FileText, CheckCircle, AlertTriangle, Scale, Mail, Activity } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ข้อตกลงการใช้งาน | สุ่มสี่สุ่มห้า (Sum4Sum5)',
  description: 'เงื่อนไขและข้อกำหนดในการเข้าใช้งานเว็บไซต์สุ่มสี่สุ่มห้า โปรดศึกษารายละเอียดเพื่อประโยชน์สูงสุดในการใช้งานเครื่องมือของเรา',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center space-y-4 mb-16">
          <div className="w-16 h-16 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-500 mx-auto mb-6">
            <FileText className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-prompt font-black text-slate-900">ข้อตกลงการใช้งาน</h1>
          <p className="text-slate-500 font-medium italic">ปรับปรุงล่าสุดเมื่อ: 25 เมษายน 2569</p>
        </div>

        <article className="prose prose-slate max-w-none space-y-12 text-slate-600 leading-loose">
          <section className="space-y-4">
            <h2 className="text-2xl font-prompt font-bold text-slate-900 flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-blue-500" /> 1. การยอมรับข้อตกลง
            </h2>
            <p>
              โดยการเข้าถึงหรือใช้งานเว็บไซต์ <strong>สุ่มสี่สุ่มห้า (Sum4Sum5.com)</strong> ท่านตกลงที่จะผูกพันตามข้อตกลงและเงื่อนไขการใช้งานเหล่านี้ 
              หากท่านไม่ตกลงตามข้อตกลงเหล่านี้ โปรดงดเว้นการใช้งานเว็บไซต์ของเรา
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-prompt font-bold text-slate-900 flex items-center gap-3">
              <Scale className="w-6 h-6 text-blue-500" /> 2. การอนุญาตให้ใช้งาน
            </h2>
            <p>
              เราอนุญาตให้ท่านใช้งานเครื่องมือต่างๆ บนเว็บไซต์เพื่อวัตถุประสงค์ส่วนตัวหรือเชิงพาณิชย์ขนาดเล็กได้ฟรี 
              แต่ไม่อนุญาตให้นำโค้ดหรือการออกแบบของเว็บไซต์ไปทำซ้ำ ดัดแปลง หรือนำไปใช้งานในเชิงพาณิชย์โดยไม่ได้รับอนุญาตเป็นลายลักษณ์อักษรจากเรา
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-prompt font-bold text-slate-900 flex items-center gap-3">
              <Activity className="w-6 h-6 text-blue-500" /> 3. สถิติการใช้งานและบริการบุคคลที่สาม
            </h2>
            <p>
              เพื่อพัฒนาและดูแลเว็บไซต์ เราอาจบันทึกเหตุการณ์การใช้งานฟีเจอร์ในรูปแบบสรุปผ่านระบบของเรา
              (เช่น ชื่อฟีเจอร์ การตั้งค่า หรือตัวเลขสถิติที่ไม่ใช่เนื้อหาที่คุณพิมพ์ทั้งหมด) ตามที่ระบุในนโยบายความเป็นส่วนตัว
              การใช้งานเครื่องมือ AI หมายถึงคุณยอมให้ส่งข้อความคำขอไปยังผู้ให้บริการ AI ภายนอกเพื่อประมวลผล
            </p>
          </section>

          <section className="space-y-4 p-8 bg-blue-50/50 rounded-[2.5rem] border border-blue-100">
            <h2 className="text-2xl font-prompt font-bold text-slate-900 flex items-center gap-3 m-0">
              <AlertTriangle className="w-6 h-6 text-blue-500" /> 4. การจำกัดความรับผิดชอบ (รวมถึง AI)
            </h2>
            <div className="m-0 mt-4 leading-relaxed space-y-4">
              <p>
                ผลลัพธ์จากการใช้เครื่องมือสุ่ม (เช่น วงล้อ, ตัวเลข) เป็นไปตามกระบวนการทางสถิติและเทคโนโลยี 
                เราไม่รับผิดชอบต่อการตัดสินใจหรือความสูญเสียใดๆ ที่อาจเกิดขึ้นจากการใช้ผลลัพธ์ของเครื่องมือของเรา
              </p>
              <p>
                <strong>สำหรับการสุ่มแคปชั่น AI:</strong> ข้อความที่ถูกสร้างขึ้นเป็นผลผลิตจากปัญญาประดิษฐ์ (AI) 
                เราไม่รับรองความถูกต้อง ความเหมาะสม หรือความน่าเชื่อถือของเนื้อหา 
                ท่านมีหน้าที่ตรวจสอบเนื้อหาก่อนนำไปใช้งานจริง และเราจะไม่รับผิดชอบต่อความเสียหายใดๆ ที่เกิดจากเนื้อหาที่ AI สร้างขึ้น
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-prompt font-bold text-slate-900 flex items-center gap-3">
              <Mail className="w-6 h-6 text-blue-500" /> 5. การติดต่อ
            </h2>
            <p>
              หากท่านมีข้อสงสัยเกี่ยวกับข้อตกลงนี้ ท่านสามารถติดต่อเราได้ที่ช่องทางเดียวกับนโยบายความเป็นส่วนตัวครับ
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
