import React from 'react';
import { ShieldCheck, Lock, Eye, Cookie, Info, Mail, Server } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'นโยบายความเป็นส่วนตัว | สุ่มสี่สุ่มห้า (Sum4Sum5)',
  description: 'นโยบายความคุ้มครองข้อมูลส่วนบุคคลของเว็บไซต์สุ่มสี่สุ่มห้า เราให้ความสำคัญกับการปกป้องข้อมูลและการใช้งานที่โปร่งใส',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center space-y-4 mb-16">
          <div className="w-16 h-16 bg-orange-100 rounded-3xl flex items-center justify-center text-primary mx-auto mb-6">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-prompt font-black text-slate-900">นโยบายความเป็นส่วนตัว</h1>
          <p className="text-slate-500 font-medium italic">ปรับปรุงล่าสุดเมื่อ: 25 เมษายน 2569</p>
        </div>

        <article className="prose prose-slate max-w-none space-y-12 text-slate-600 leading-loose">
          <section className="space-y-4">
            <h2 className="text-2xl font-prompt font-bold text-slate-900 flex items-center gap-3">
              <Info className="w-6 h-6 text-primary" /> 1. บทนำ
            </h2>
            <p>
              ยินดีต้อนรับสู่ <strong>สุ่มสี่สุ่มห้า (Sum4Sum5.com)</strong> เราให้ความสำคัญกับการคุ้มครองข้อมูลส่วนบุคคลของคุณอย่างสูงสุด
              นโยบายฉบับนี้อธิบายว่าเราเก็บรวบรวม ใช้ และป้องกันข้อมูลอย่างไรเมื่อคุณใช้งานเว็บไซต์ของเรา โดยอิงจากการทำงานจริงของระบบ ณ วันที่ปรับปรุงล่าสุด
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-prompt font-bold text-slate-900 flex items-center gap-3">
              <Lock className="w-6 h-6 text-primary" /> 2. ข้อมูลที่เราเก็บรวบรวม
            </h2>
            <p>เราเก็บข้อมูลเท่าที่จำเป็นเพื่อให้บริการและปรับปรุงเว็บไซต์:</p>
            <ul className="list-disc pl-6 space-y-2 font-medium">
              <li>
                <strong>สถิติการใช้งานฟีเจอร์ (ฝั่งเซิร์ฟเวอร์):</strong> เมื่อคุณใช้เครื่องมือบางอย่าง
                เบราว์เซอร์ของคุณอาจส่งคำขอไปยัง API ภายในโดเมนของเรา (เช่น <strong>/api/usage</strong>)
                เพื่อบันทึกเหตุการณ์ในรูปแบบที่ไม่ระบุตัวตนโดยตรง เช่น ชื่อฟีเจอร์ที่ใช้ จำนวนตัวเลือกบนวงล้อ ชื่อธีมที่เลือก
                หรือสำหรับเครื่องมือแคปชั่น AI อาจมี <strong>การตั้งค่าสไตล์ (vibe)</strong> แพลตฟอร์ม และ
                <strong>ความยาวหัวข้อเป็นตัวเลข (topicLength)</strong> — <em>เราไม่บันทึกข้อความหัวข้อแคปชั่นดิบ</em> ลงในสถิติการใช้งานนี้
                ข้อมูลเหล่านี้ถูกจัดเก็บผ่านบริการฐานข้อมูล (เช่น Supabase) ที่เราควบคุมการเข้าถึงฝั่งเซิร์ฟเวอร์
              </li>
              <li>
                <strong>ข้อมูลในอุปกรณ์ของคุณ (เบราว์เซอร์):</strong> รายชื่อหรือข้อความที่คุณกรอกในเครื่องมือสุ่ม (เช่น วงล้อ สุ่มชื่อ)
                อาจถูกเก็บใน <strong>LocalStorage</strong> เพื่อให้คุณกลับมาใช้งานต่อได้สะดวก — ข้อมูลนี้อยู่บนเครื่องของคุณ ไม่ถูกส่งไปเก็บเป็นข้อความเต็มในสถิติการใช้งานตามข้อด้านบน
              </li>
              <li>
                <strong>การสร้างแคปชั่นด้วย AI:</strong> ข้อความที่คุณพิมพ์ในช่องหัวข้อจะถูกส่งไปยังผู้ให้บริการ AI (ปัจจุบันใช้บริการของ <strong>Google Gemini</strong>)
                เพื่อสร้างข้อความตามคำขอของคุณ การประมวลผลอยู่ภายใต้เงื่อนไขของผู้ให้บริการรายนั้น
                เราแนะนำให้คุณหลีกเลี่ยงการใส่ข้อมูลส่วนบุคคลที่ไม่จำเป็นในช่องป้อนข้อมูล
              </li>
              <li>
                <strong>หน้าแอดมิน:</strong> หากคุณเป็นเจ้าของระบบและเข้าสู่ระบบแอดมิน เราใช้คุกกี้เซสชันแบบฝั่งเซิร์ฟเวอร์ (HttpOnly)
                เพื่อรักษาสถานะการล็อกอิน — คุกกี้นี้ใช้เฉพาะการเข้าถึงแดชบอร์ดภายใน ไม่ใช่สำหรับผู้ใช้ทั่วไป
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-prompt font-bold text-slate-900 flex items-center gap-3">
              <Cookie className="w-6 h-6 text-primary" /> 3. คุกกี้และเทคโนโลยีที่คล้ายกัน
            </h2>
            <p>
              เว็บไซต์อาจใช้คุกกี้ที่จำเป็นสำหรับการทำงานของระบบ (รวมถึงเซสชันแอดมินตามข้อ 2)
              ในปัจจุบัน <strong>เรายังไม่ได้ฝังสคริปต์ Google AdSense หรือแพลตฟอร์มโฆษณาอื่นในโค้ดหลักของเว็บ</strong>
              — มีเพียงพื้นที่แสดงผลสำหรับโฆษณาแบบ placeholder เพื่อเตรียมการออกแบบ
              หากมีการเปิดใช้งานโฆษณาจริงในอนาคต เราจะปรับปรุงนโยบายนี้ให้สอดคล้องและระบุผู้ให้บริการให้ชัดเจน
            </p>
          </section>

          <section className="space-y-4 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
            <h2 className="text-2xl font-prompt font-bold text-slate-900 flex items-center gap-3 m-0">
              <Eye className="w-6 h-6 text-primary" /> 4. ผู้ให้บริการและบุคคลที่สาม
            </h2>
            <div className="m-0 mt-4 leading-relaxed space-y-4">
              <p>
                เราใช้ผู้ให้บริการภายนอกเพื่อให้บริการบางส่วนของเว็บไซต์ ได้แก่ ผู้ให้บริการ AI (Google Gemini)
                และผู้ให้บริการโฮสต์/ฐานข้อมูล (เช่น Supabase สำหรับจัดเก็บสถิติการใช้งานแบบรวม)
                การส่งข้อมูลไปยังผู้ให้บริการเหล่านี้อยู่ภายใต้นโยบายความเป็นส่วนตัวของแต่ละราย
              </p>
              <p className="flex gap-3 items-start m-0">
                <Server className="w-5 h-5 text-primary shrink-0 mt-1" />
                <span>
                  หากคุณต้องการรายละเอียดว่าเหตุการณ์ใดถูกบันทึกในแต่ละฟีเจอร์ สามารถสอบถามเราได้ที่อีเมลด้านล่าง
                  เราจะอธิบายในเชิง “ประเภทข้อมูล” และ “วัตถุประสงค์” โดยไม่จำเป็นต้องเปิดเผยข้อมูลของผู้ใช้รายอื่น
                </span>
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-prompt font-bold text-slate-900 flex items-center gap-3">
              <Mail className="w-6 h-6 text-primary" /> 5. ติดต่อเรา
            </h2>
            <p>
              หากคุณมีคำถามเกี่ยวกับนโยบายความเป็นส่วนตัวนี้ สามารถติดต่อเราได้ที่อีเมล: <strong>support@sum4sum5.com</strong>
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
