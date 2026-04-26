import React from 'react';
import { FileText, CheckCircle, AlertTriangle, Scale, Mail, Activity, ShieldAlert, Zap } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ข้อตกลงการใช้งาน | สุ่มสี่สุ่มห้า (Sum4Sum5)',
  description: 'เงื่อนไขและข้อกำหนดในการเข้าใช้งานเว็บไซต์สุ่มสี่สุ่มห้า โปรดศึกษารายละเอียดเพื่อประโยชน์สูงสุดในการใช้งานเครื่องมือของเราอย่างถูกต้องและปลอดภัย',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-transparent pb-20">
      <div className="max-w-4xl mx-auto px-6 pt-16 md:pt-24 space-y-16">
        
        {/* Header Section */}
        <section className="text-center space-y-6 mb-20">
          <div className="w-20 h-20 bg-slate-900 rounded-3xl flex items-center justify-center text-primary mx-auto shadow-xl">
            <FileText className="w-12 h-12" />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-prompt font-black text-slate-900 tracking-tight">
              ข้อตกลง <span className="text-primary">การใช้งาน</span>
            </h1>
            <p className="text-lg text-slate-500 font-medium italic">
              มีผลบังคับใช้ตั้งแต่วันที่: 26 เมษายน 2569
            </p>
          </div>
        </section>

        {/* Content Section */}
        <article className="space-y-12">
          
          {/* Section 1: Acceptance */}
          <section className="bg-white rounded-[2.5rem] p-10 md:p-12 border border-slate-100 shadow-sm space-y-6">
            <h2 className="text-2xl font-prompt font-black text-slate-900 flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-primary" /> 1. การยอมรับข้อตกลง
            </h2>
            <div className="text-slate-600 leading-relaxed text-lg font-medium">
              <p>
                เมื่อคุณเข้าสู่เว็บไซต์ <strong>สุ่มสี่สุ่มห้า (Sum4Sum5.com)</strong> ถือว่าคุณได้ยอมรับและตกลงที่จะปฏิบัติตามข้อกำหนดและเงื่อนไขการใช้งานเหล่านี้ หากคุณไม่เห็นด้วยกับข้อตกลงใดๆ โปรดงดเว้นการใช้งานเว็บไซต์ของเรา
              </p>
            </div>
          </section>

          {/* Section 2: Intellectual Property */}
          <section className="space-y-8 px-4">
            <h2 className="text-2xl font-prompt font-black text-slate-900 flex items-center gap-3">
              <Scale className="w-8 h-8 text-orange-500" /> 2. สิทธิ์ในทรัพย์สินทางปัญญา
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2 text-primary">
                  <Zap className="w-5 h-5" /> เนื้อหาที่คุณสร้าง
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  ผลลัพธ์จากการใช้เครื่องมือสุ่ม หรือแคปชั่นที่สร้างโดย AI คุณมีสิทธิ์นำไปใช้ในเชิงพาณิชย์หรือส่วนตัวได้โดยอิสระ
                </p>
              </div>
              <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2 text-primary">
                  <ShieldAlert className="w-5 h-5" /> ทรัพย์สินของเว็บไซต์
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  ซอร์สโค้ด, การออกแบบ UI, โลโก้ และอัลกอริทึมของเว็บไซต์เป็นลิขสิทธิ์ของสุ่มสี่สุ่มห้า ห้ามมิให้ผู้ใดคัดลอกหรือดัดแปลงเพื่อผลประโยชน์ทางการค้าโดยไม่ได้รับอนุญาต
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: AI & Disclaimer - CRITICAL FOR ADSENSE */}
          <section className="bg-orange-50 rounded-[3rem] p-10 md:p-12 border border-orange-100 relative overflow-hidden shadow-sm">
            <div className="space-y-6">
              <h2 className="text-2xl font-prompt font-black flex items-center gap-3 text-slate-900">
                <AlertTriangle className="w-8 h-8 text-primary" /> 3. การจำกัดความรับผิดชอบ
              </h2>
              <div className="space-y-6 text-slate-700 leading-relaxed text-lg font-medium">
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-orange-200">
                  <p className="font-bold text-slate-900 mb-2 underline decoration-orange-300">ความถูกต้องของผลลัพธ์:</p>
                  เครื่องมือสุ่มทั้งหมดทำงานบนพื้นฐานของความน่าจะเป็นทางสถิติ เราไม่รับผิดชอบต่อความสูญเสียหรือผลกระทบจากการตัดสินใจโดยใช้ผลลัพธ์ของเครื่องมือเหล่านี้
                </div>
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-orange-200">
                  <p className="font-bold text-slate-900 mb-2 underline decoration-orange-300">เนื้อหาจาก AI:</p>
                  แคปชั่นที่สร้างโดย AI เป็นเพียงการประมวลผลของปัญญาประดิษฐ์ เราไม่รับรองความเหมาะสมหรือความถูกต้องของเนื้อหา ผู้ใช้ต้องตรวจสอบความถูกต้องด้วยตนเองก่อนนำไปใช้งานจริง
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Prohibited Use */}
          <section className="bg-white rounded-[2.5rem] p-10 md:p-12 border border-slate-100 shadow-sm space-y-6">
            <h2 className="text-2xl font-prompt font-black text-slate-900 flex items-center gap-3">
              <Activity className="w-8 h-8 text-red-500" /> 4. ข้อห้ามในการใช้งาน
            </h2>
            <div className="text-slate-600 leading-relaxed space-y-4 text-lg font-medium">
              <p>ผู้ใช้ตกลงที่จะไม่กระทำการใดๆ ต่อไปนี้:</p>
              <ul className="list-disc pl-6 space-y-3">
                <li>การใช้งานเพื่อวัตถุประสงค์ที่ผิดกฎหมายหรือละเมิดสิทธิผู้อื่น</li>
                <li>การพยายามแทรกแซง หรือทำลายความมั่นคงของระบบคอมพิวเตอร์</li>
                <li>การใช้บอทหรือเครื่องมืออัตโนมัติในการดึงข้อมูลโดยไม่ได้รับอนุญาต</li>
              </ul>
            </div>
          </section>

          {/* Section 5: Termination */}
          <section className="text-center space-y-8 pt-10 pb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-900 text-white shadow-lg font-bold text-sm">
              <Mail className="w-4 h-4 text-primary" />
              <span>ต้องการความช่วยเหลือเพิ่มเติม?</span>
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-prompt font-black text-slate-900 underline decoration-primary decoration-4 underline-offset-8">ติดต่อเราได้ตลอดเวลา</h2>
              <p className="text-lg text-slate-600 font-bold">
                หากพบปัญหาหรือต้องการติดต่อสื่อสาร: support@sum4sum5.com
              </p>
            </div>
          </section>

        </article>
      </div>
    </div>
  );
}
