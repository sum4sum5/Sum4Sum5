import React from 'react';
import { ShieldCheck, Lock, Eye, Cookie, Info, Mail, Server, UserCheck, Globe, ShieldAlert, Clock, Terminal } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'นโยบายความเป็นส่วนตัว | สุ่มสี่สุ่มห้า (Sum4Sum5)',
  description: 'นโยบายความคุ้มครองข้อมูลส่วนบุคคลของเว็บไซต์สุ่มสี่สุ่มห้า เราให้ความสำคัญกับการปกป้องข้อมูลและการใช้งานที่โปร่งใสตามมาตรฐานปี 2026',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-transparent pb-20">
      <div className="max-w-4xl mx-auto px-6 pt-16 md:pt-24 space-y-16">
        
        {/* Header Section */}
        <section className="text-center space-y-6 mb-20">
          <div className="w-20 h-20 orange-gradient rounded-3xl flex items-center justify-center text-white mx-auto shadow-xl">
            <ShieldCheck className="w-12 h-12" />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-prompt font-black text-slate-900 tracking-tight text-balance">
              นโยบาย <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">ความเป็นส่วนตัว</span>
            </h1>
            <p className="text-lg text-slate-500 font-medium italic">
              ปรับปรุงล่าสุด: 26 เมษายน 2569 (เวอร์ชัน 1.3 - AdSense Standard)
            </p>
          </div>
        </section>

        {/* Content Section */}
        <article className="space-y-10">
          
          {/* Section 1: Introduction */}
          <section className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-sm space-y-6">
            <h2 className="text-2xl font-prompt font-black text-slate-900 flex items-center gap-3">
              <Info className="w-8 h-8 text-primary" /> 1. บทนำและความรับผิดชอบ
            </h2>
            <div className="text-slate-600 leading-relaxed space-y-4 text-lg font-medium">
              <p>
                เว็บไซต์ <strong>สุ่มสี่สุ่มห้า (Sum4Sum5.com)</strong> ให้ความสำคัญกับการคุ้มครองข้อมูลส่วนบุคคลของผู้ใช้งาน นโยบายฉบับนี้อธิบายถึงวิธีการที่เราดูแลข้อมูลของคุณเมื่อมีการใช้งานเครื่องมือสุ่มและระบบ AI ของเรา โดยยึดตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล (PDPA) ของประเทศไทย และมาตรฐานสากล
              </p>
            </div>
          </section>

          {/* Section 2: Technical Data Collection */}
          <section className="space-y-8 px-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-prompt font-black text-slate-900 flex items-center gap-3">
                <Terminal className="w-8 h-8 text-orange-500" /> 2. การเก็บรวบรวมข้อมูลเชิงเทคนิค
              </h2>
              <p className="text-slate-500 font-medium">เราเก็บข้อมูลที่จำเป็นเพื่อการพัฒนาและเพิ่มประสิทธิภาพของระบบเท่านั้น</p>
            </div>
            
            <div className="grid gap-6">
              <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                  <Server className="w-20 h-20 text-slate-900" />
                </div>
                <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Server className="w-5 h-5 text-primary" /> สถิติการใช้งานฟีเจอร์ (Usage Statistics)
                </h3>
                <div className="text-slate-600 leading-relaxed space-y-3">
                  <p>
                    เมื่อมีการใช้งานเครื่องมือ ระบบจะส่งข้อมูลสรุป (Event) ไปยังเซิร์ฟเวอร์ของเราผ่านผู้ให้บริการโครงสร้างพื้นฐานด้านข้อมูลที่ได้มาตรฐานสากล เพื่อบันทึกสถิติ เช่น ฟีเจอร์ที่เข้าถึง, ระยะเวลาที่ใช้งาน และประเภทของอุปกรณ์ 
                  </p>
                  <p className="text-sm bg-white/50 p-3 rounded-lg border border-slate-200">
                    <strong>ข้อมูลที่บันทึก:</strong> ข้อมูลการตั้งค่าฟีเจอร์เบื้องต้นที่จำเป็นต่อการประมวลผล — <span className="text-red-500 font-bold">เราไม่มีการบันทึกข้อความต้นฉบับที่คุณป้อน</span> ลงในระบบจัดเก็บสถิตินี้
                  </p>
                </div>
              </div>

              <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" /> การจัดเก็บข้อมูลบนเบราว์เซอร์
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  รายการที่คุณป้อนในเครื่องมือ (เช่น รายชื่อเพื่อสุ่ม) จะถูกเก็บไว้ในหน่วยความจำชั่วคราวของเบราว์เซอร์คุณโดยเฉพาะ เพื่อให้คุณสามารถกลับมาใช้งานต่อได้สะดวก ข้อมูลนี้จะอยู่บนอุปกรณ์ของคุณ 100% และไม่มีการส่งกลับมายังเซิร์ฟเวอร์หลักเพื่อการระบุตัวตนบุคคล
                </p>
              </div>

              <div className="p-8 bg-white rounded-3xl border-2 border-orange-100 shadow-inner">
                <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-orange-500" /> การประมวลผลข้อมูลอัจฉริยะ
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  สำหรับการใช้เครื่องมือวิเคราะห์และสร้างเนื้อหา ข้อความที่คุณป้อนในช่องป้อนข้อมูลจะถูกส่งไปยังผู้ให้บริการเทคโนโลยีระดับสากลเพื่อประมวลผลตามคำขอของคุณแบบครั้งต่อครั้ง ภายใต้มาตรฐานการส่งข้อมูลที่ปลอดภัยและมีการเข้ารหัสข้อมูลตามมาตรฐานสากล
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Third Party & Cookies - MANDATORY FOR ADSENSE */}
          <section className="bg-slate-900 rounded-[3rem] p-10 md:p-12 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-10 opacity-10">
              <Cookie className="w-32 h-32 text-primary" />
            </div>
            <div className="relative z-10 space-y-6">
              <h2 className="text-2xl font-prompt font-black flex items-center gap-3 text-primary">
                <Cookie className="w-8 h-8 text-primary" /> 3. คุกกี้และเทคโนโลยีติดตามจากบุคคลที่สาม
              </h2>
              <div className="space-y-4 text-slate-300 leading-relaxed text-lg font-medium">
                <p>
                  เราใช้ <strong>Google Analytics 4 (GA4)</strong> เพื่อวิเคราะห์พฤติกรรมการใช้งานภาพรวม โดยจะมีการใช้คุกกี้เพื่อเก็บข้อมูล เช่น หน้าที่เข้าชม, แหล่งที่มาของผู้ใช้ และระยะเวลาที่ใช้งานหน้าเว็บ
                </p>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-4">
                  <p className="text-white font-bold">ข้อมูลสำหรับ Google AdSense:</p>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-slate-400">
                    <li>ผู้ให้บริการบุคคลที่สาม รวมถึง Google อาจใช้คุกกี้เพื่อแสดงโฆษณาตามการเยี่ยมชมเว็บไซต์ก่อนหน้านี้ของผู้ใช้</li>
                    <li>การใช้คุกกี้เพื่อการโฆษณาช่วยให้ Google และพาร์ทเนอร์สามารถแสดงโฆษณาแก่ผู้ใช้ตามการเยี่ยมชมเว็บไซต์ของเรา และ/หรือเว็บไซต์อื่นบนอินเทอร์เน็ต</li>
                    <li>ผู้ใช้สามารถเลือกไม่รับการโฆษณาที่ปรับให้เหมาะสมตามความสนใจได้ที่ <a href="https://www.google.com/settings/ads" className="text-primary underline">Ads Settings</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Children's Privacy */}
          <section className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm space-y-6">
            <h2 className="text-2xl font-prompt font-black text-slate-900 flex items-center gap-3">
              <ShieldAlert className="w-8 h-8 text-red-500" /> 4. ความเป็นส่วนตัวของผู้เยาว์
            </h2>
            <div className="text-slate-600 leading-relaxed text-lg font-medium">
              <p>
                เว็บไซต์สุ่มสี่สุ่มห้าไม่ได้เก็บรวบรวมข้อมูลส่วนบุคคลที่ระบุตัวตนได้จากเด็กอายุต่ำกว่า 13 ปีโดยเจตนา หากคุณเป็นบิดามารดาหรือผู้ปกครองและทราบว่าบุตรหลานของคุณได้ให้ข้อมูลแก่เรา โปรดติดต่อเราเพื่อดำเนินการลบข้อมูลดังกล่าวออกจากระบบ
              </p>
            </div>
          </section>

          {/* Section 5: Data Rights & Retention */}
          <section className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm space-y-4">
              <h2 className="text-xl font-prompt font-black text-slate-900 flex items-center gap-3">
                <UserCheck className="w-6 h-6 text-green-500" /> สิทธิของคุณ (Rights)
              </h2>
              <ul className="text-slate-500 space-y-2 font-medium">
                <li>• สิทธิในการเข้าถึงข้อมูล</li>
                <li>• สิทธิในการขอให้ลบข้อมูล</li>
                <li>• สิทธิในการคัดค้านการประมวลผล</li>
              </ul>
            </div>
            <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm space-y-4">
              <h2 className="text-xl font-prompt font-black text-slate-900 flex items-center gap-3">
                <Clock className="w-6 h-6 text-blue-500" /> การเก็บรักษา (Retention)
              </h2>
              <p className="text-slate-500 font-medium">
                เราจะเก็บรักษาข้อมูลสถิติเป็นระยะเวลาไม่เกิน 1 ปี หรือเท่าที่จำเป็นสำหรับการวิเคราะห์ข้อมูลเพื่อพัฒนาเว็บให้ดียิ่งขึ้น
              </p>
            </div>
          </section>

          {/* Section 6: Contact */}
          <section className="text-center space-y-8 pt-10 pb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-slate-100 shadow-sm text-slate-500 font-bold text-sm">
              <Mail className="w-4 h-4 text-orange-400" />
              <span>ต้องการสอบถามข้อมูลเพิ่มเติม?</span>
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-prompt font-black text-slate-900 underline decoration-primary decoration-4 underline-offset-8 italic">Data Protection Officer</h2>
              <p className="text-lg text-slate-600 font-bold">
                Email: support@sum4sum5.com
              </p>
            </div>
          </section>

        </article>
      </div>
    </div>
  );
}
