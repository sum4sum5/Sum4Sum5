import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Info, CheckCircle2, BookOpen, ChevronRight, Sparkles, ShieldCheck, HelpCircle, Share2, ClipboardCheck, History, FerrisWheel, Users } from 'lucide-react';
import type { Metadata } from 'next';
import AdBanner from '@/components/shared/AdBanner';
import ArticleHeroImage from '@/components/blog/ArticleHeroImage';
import ArticleActions from '@/components/blog/ArticleActions';
import TableOfContents from '@/components/blog/TableOfContents';

interface ArticleProps {
  params: Promise<{ slug: string }>;
}

// In a real app, this would come from a CMS or local markdown files
const getArticleData = (slug: string) => {
  if (slug === 'how-to-random-numbers-for-giveaway') {
    return {
      title: 'แจกรางวัลยังไงให้คนไม่ดราม่า? เจาะลึกวิธีสุ่มเลข 2 ตัว 3 ตัว ให้โปร่งใสจนใครก็เถียงไม่ได้ (2026)',
      date: '28 เมษายน 2026',
      readTime: '15 นาที',
      category: 'เทคนิคการสุ่ม',
      author: 'ทีมสุ่มสี่สุ่มห้า',
      image: 'https://images.unsplash.com/photo-1596838132731-163486289b42?q=80&w=2070&auto=format&fit=crop',
      toc: [
        { id: 'why-fairness', title: 'ทำไมความเชื่อมั่นถึงสำคัญกว่ารางวัล?' },
        { id: 'logic-of-random', title: 'จิตวิทยาการเลือกเลข 2 ตัว vs 3 ตัว' },
        { id: 'tools', title: 'อาวุธลับ: การเลือกเครื่องมือสุ่มแบบโปร' },
        { id: 'step-by-step', title: 'ขั้นตอนจัดกิจกรรม (Step-by-Step)' },
        { id: 'prevent-cheating', title: 'เทคนิคสยบดราม่าและการโกง' },
        { id: 'faq', title: 'คำถามที่พบบ่อย (FAQ)' },
        { id: 'other-tools', title: 'เครื่องมือสุ่มแนะนำอื่นๆ' },
        { id: 'conclusion', title: 'บทสรุปส่งท้าย' },
      ],
      content: (
        <article className="prose prose-slate max-w-none font-kanit">
          <p className="lead text-lg md:text-xl text-slate-600 mb-10 leading-relaxed font-medium border-l-4 border-orange-500 pl-6 py-2">
            "สุ่มได้แต่เพื่อนตัวเองหรือเปล่า?" หรือ "ล็อคผลไว้แล้วใช่ไหม?"... นี่คือคำถามแทงใจที่คนจัดกิจกรรมแจกรางวัลหลายคนต้องเคยเจอครับ เอาเข้าจริงปัญหาไม่ได้อยู่ที่รางวัลใหญ่หรือเล็ก แต่อยู่ที่ "ความโปร่งใส" ของกระบวนการสุ่มต่างหาก คู่มือฉบับนี้ทีมงาน <strong>"สุ่มสี่สุ่มห้า"</strong> จะมาแชร์วิธีสุ่มเลข 2 ตัว และ 3 ตัว แบบมือโปรที่ทำให้นักเลงคีย์บอร์ดต้องยอมจำนนด้วยหลักฐานและความยุติธรรมครับ
          </p>

          <section id="why-fairness" className="scroll-mt-24 mb-12">
            <h2 className="font-prompt font-black text-2xl lg:text-3xl text-slate-900 leading-tight mb-5 flex items-center gap-3">
              <span className="text-orange-500/20 text-4xl italic font-serif">01</span>
              ทำไม "ความเชื่อมั่น" ถึงมีมูลค่าสูงกว่ารางวัลที่คุณแจก?
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p className="indent-12">
                ลองนึกภาพดูนะครับ ถ้าคุณจัดกิจกรรมแจก iPhone 16 แต่ตอนสุ่มดันใช้โปรแกรมที่หน้าตาดูไม่น่าเชื่อถือ หรือไม่มีการพิสูจน์ผลให้เห็นชัดๆ สิ่งที่จะเกิดขึ้นไม่ใช่แค่ดราม่าครับ แต่คือการที่ลูกค้า "เลิกเชื่อใจ" แบรนด์ของคุณไปเลย 
              </p>
              <p className="indent-12">
                ในมุมมองของการทำกิจกรรมชุมชนหรือการตลาด (Community Engagement) ความยุติธรรมคือพื้นฐานของการสร้าง User Experience (UX) ที่ดีที่สุดครับ เมื่อผู้เข้าร่วมรู้สึกว่าพวกเขามีโอกาสชนะ "จริงๆ" (Equal Opportunity) พวกเขาจะเกิดอารมณ์ร่วมและการรอคอย (Anticipation) ที่ส่งผลดีต่อภาพลักษณ์ของแบรนด์ในระยะยาว
              </p>
              <p className="indent-12">
                การเลือกใช้เครื่องมือที่แสดงผลได้ชัดเจนและตรวจสอบได้ จึงไม่ใช่แค่เรื่องของทางเทคนิค แต่เป็นเรื่องของ "จิตวิทยาความเชื่อมั่น" ที่นักจัดกิจกรรมรุ่นใหม่ห้ามมองข้ามเด็ดขาดครับ
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-100 p-6 my-8 rounded-2xl shadow-sm flex gap-4 items-start relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-full -mr-12 -mt-12" />
              <ShieldCheck className="w-6 h-6 text-orange-500 shrink-0 mt-1 relative z-10" />
              <div className="relative z-10">
                <p className="font-bold text-slate-900 mb-1 font-prompt">ความลับของระบบสุ่มที่คุณควรรู้:</p>
                <p className="text-slate-600 m-0 leading-relaxed text-sm md:text-base indent-8">
                  ระบบคอมพิวเตอร์ส่วนใหญ่ไม่ได้ "สุ่ม" แบบไร้ที่มาที่ไปครับ แต่มันใช้สิ่งที่เรียกว่า <strong>PRNG (Pseudo-Random Number Generator)</strong> โดยนำค่าตั้งต้น (Seed) อย่างเวลาปัจจุบันในระดับเสี้ยววินาทีมาคำนวณผ่านอัลกอริทึมที่ซับซ้อน ผลลัพธ์ที่ได้จึงมีความอิสระจนมนุษย์ไม่สามารถคาดเดาหรือล็อคผลได้ด้วยมือเปล่าแน่นอนครับ
                </p>
              </div>
            </div>
          </section>

          <section id="logic-of-random" className="scroll-mt-24 mb-12">
            <h2 className="font-prompt font-black text-2xl lg:text-3xl text-slate-900 leading-tight mb-5 flex items-center gap-3">
              <span className="text-orange-500/20 text-4xl italic font-serif">02</span>
              ถอดรหัสจิตวิทยา: สุ่มเลข 2 ตัว vs 3 ตัว แบบไหนที่กระชากใจคนดู?
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p className="indent-12">
                เชื่อไหมครับว่าจำนวนหลักของตัวเลขส่งผลต่อความรู้สึกของคนอ่านอย่างไม่น่าเชื่อ! การสุ่มเลข 2 หลัก (00-99) คือการเล่นกับความรู้สึก "เป็นไปได้" เพราะโอกาส 1 ใน 100 นั้นดูไม่ไกลเกินเอื้อม เหมาะกับกิจกรรมที่แจกรางวัลเล็กๆ จำนวนมากๆ 
              </p>
              <p className="indent-12">
                ส่วนเลข 3 ตัว (000-999) คือการยกระดับความตื่นเต้นขึ้นมาอีกขั้นครับ ด้วยความน่าจะเป็น 1 ใน 1,000 มันจึงเหมาะกับ "รางวัลใหญ่" ที่ต้องการสร้างความขลังและความน่าเกรงขามให้กับกิจกรรม
              </p>
              <p className="indent-12">
                นอกจากเรื่องจิตวิทยาแล้ว การใช้ตัวเลขยังช่วยให้การจัดการรายชื่อจำนวนมหาศาลทำได้ง่ายขึ้นมากครับ เพราะเราสามารถใช้เลขลำดับ (Index) อ้างอิงถึงตัวบุคคลได้ทันที ซึ่งเป็นวิธีที่ดูสะอาดตา เป็นระเบียบ และดูเป็นมืออาชีพที่สุดสำหรับการประกาศผลในที่สาธารณะครับ
              </p>
            </div>
          </section>

          <section id="tools" className="scroll-mt-24 mb-12">
            <h2 className="font-prompt font-black text-2xl lg:text-3xl text-slate-900 leading-tight mb-5 flex items-center gap-3">
              <span className="text-orange-500/20 text-4xl italic font-serif">03</span>
              สแกนเครื่องมือสุ่ม: แบบไหนที่เรียกว่า "โปร" จริง?
            </h2>
            <p className="text-slate-600 mb-6 leading-relaxed indent-12">
              อย่าปล่อยให้ความตั้งใจพังเพราะเลือกใช้เว็บสุ่มที่หน้าตาดูเหมือนเว็บโฆษณาในยุค 90 นะครับ นี่คือ 3 สิ่งที่ผมมักจะเช็คก่อนกดสุ่มโชว์คนดูเสมอ:
            </p>
            <ul className="space-y-4 mb-8 list-none p-0">
              <li className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all hover:border-orange-200">
                <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block mb-1">ความลื่นไหลของอนิเมชัน (Visual Proof):</span>
                  <p className="text-slate-500 text-sm m-0 leading-relaxed">คนไทยชอบความลุ้นครับ การเห็นตัวเลขกลิ้งๆ เหมือนตู้สล็อต หรือวงล้อที่ค่อยๆ ช้าลงจนหยุดที่เลขผู้โชคดี มันช่วยพิสูจน์ด้วยตาเปล่าว่าระบบไม่ได้ดีดผลลัพธ์ที่ล็อคไว้ออกมาทันที</p>
                </div>
              </li>
              <li className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all hover:border-orange-200">
                <History className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block mb-1">ระบบ Log หรือ History:</span>
                  <p className="text-slate-500 text-sm m-0 leading-relaxed">เครื่องมือระดับพรีเมียมควรบันทึกผลการสุ่มก่อนหน้าไว้ได้ เพื่อป้องกันกรณีคนดูแย้งว่า "เมื่อกี้เห็นเลขนี้แวบๆ" เราจะสามารถตรวจสอบประวัติย้อนหลังได้ทันที</p>
                </div>
              </li>
              <li className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all hover:border-orange-200">
                <Sparkles className="w-6 h-6 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block mb-1">หน้าสรุปผลที่แชร์ได้ (Shareable Summary):</span>
                  <p className="text-slate-500 text-sm m-0 leading-relaxed">เมื่อสุ่มเสร็จ ระบบควรมีหน้าสรุปเลขผู้โชคดีทั้งหมดไว้ในเฟรมเดียว เพื่อให้เรา Screenshot หรือเซฟภาพไปประกาศผลต่อได้โดยไม่ต้องมานั่งตัดต่อเองครับ</p>
                </div>
              </li>
            </ul>
            <p className="text-slate-600 leading-relaxed indent-12">
              ถ้าอยากได้ความมั่นใจแบบ 100% ลองใช้ <strong>โปรแกรมสุ่มตัวเลขของ "สุ่มสี่สุ่มห้า"</strong> ดูครับ ทีมงานเราตั้งใจปั้นอัลกอริทึมให้ยุติธรรมที่สุด และที่สำคัญคือดีไซน์สวยมากจนคนดูต้องร้องว้าวแน่นอนครับ
            </p>
          </section>

          <div className="my-16">
             <AdBanner slot="article_middle" />
          </div>

          <section id="step-by-step" className="scroll-mt-24 mb-16">
            <h2 className="font-prompt font-black text-2xl lg:text-3xl text-slate-900 leading-tight mb-10 text-center">
              จัดกิจกรรมยังไงไม่ให้โดนดราม่า? (Step-by-Step)
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 relative group transition-all hover:bg-white hover:shadow-xl hover:-translate-y-2">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shrink-0 font-black mb-6 shadow-lg group-hover:bg-orange-500 transition-colors">1</div>
                <h4 className="font-prompt font-bold text-xl mb-3 text-slate-900">เตรียม Data ให้โปร่งใส</h4>
                <p className="text-slate-500 text-sm leading-loose indent-4">
                  รวบรวมรายชื่อลง Google Sheet แล้วให้เลขลำดับ 1 ถึงคนสุดท้าย แนะนำให้แชร์ลิงก์แบบ "อ่านได้อย่างเดียว" ให้ทุกคนเช็คเลขตัวเองก่อนเริ่มสุ่ม 15-30 นาทีครับ
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 relative group transition-all hover:bg-white hover:shadow-xl hover:-translate-y-2">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shrink-0 font-black mb-6 shadow-lg group-hover:bg-orange-500 transition-colors">2</div>
                <h4 className="font-prompt font-bold text-xl mb-3 text-slate-900">Live & Proof</h4>
                <p className="text-slate-500 text-sm leading-loose indent-4">
                  ตอนกดปุ่มสุ่ม แนะนำให้ Live Stream หรืออัดคลิปโดยให้เห็น "นาฬิกาเวลาจริง" บนหน้าจอด้วย เพื่อพิสูจน์ว่านี่คือการสุ่มสดๆ ไม่ได้มีการถ่ายแก้หลายรอบครับ
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 relative group transition-all hover:bg-white hover:shadow-xl hover:-translate-y-2">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shrink-0 font-black mb-6 shadow-lg group-hover:bg-orange-500 transition-colors">3</div>
                <h4 className="font-prompt font-bold text-xl mb-3 text-slate-900">ประกาศผลทันที</h4>
                <p className="text-slate-500 text-sm leading-loose indent-4">
                  เมื่อได้ผลลัพธ์จาก <strong>"สุ่มสี่สุ่มห้า"</strong> ให้ใช้ฟีเจอร์ <strong>"บันทึกผลเป็นรูปภาพ"</strong> จากระบบโดยตรง เพื่อให้ได้ภาพประกาศผลที่สวยงามและดูเป็นทางการ พร้อมโพสต์ลงคอมเมนต์ปิดจบงานอย่างมืออาชีพครับ
                </p>
              </div>
            </div>
          </section>

          <section id="prevent-cheating" className="scroll-mt-24 mb-16">
            <h2 className="font-prompt font-black text-2xl lg:text-3xl text-slate-900 leading-tight mb-6">
              วิชามารป้องกันโกง: เทคนิคสุ่มครั้งเดียวจบ สยบทุกดราม่า
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed mb-8">
              <p className="indent-12">
                หนึ่งในชนวนดราม่าที่พบบ่อยที่สุดคือการกดสุ่มทีละคนแล้วดันได้คนเดิมครับ! วิธีแก้ที่ขาดลอยที่สุดคือการใช้ฟีเจอร์ <strong>"สุ่มหลายตัวเลขพร้อมกัน" (Multiple Generate)</strong> 
              </p>
              <p className="indent-12">
                การตั้งค่าให้ระบบดีดผลลัพธ์ออกมาเป็นชุดเลขที่ไม่ซ้ำกัน (Unique Set) ในการกดเพียงครั้งเดียว จะช่วยลดความเคลือบแคลงสงสัยได้มากกว่าการกดทีละปุ่มหลายๆ รอบเป็นสิบเท่าตัวเลยครับ นอกจากนี้ระบบยังมีฟีเจอร์ <strong>"บันทึกภาพผลลัพธ์"</strong> ที่รวมเลขผู้โชคดีทั้งหมดไว้ในกราฟิกที่สวยงาม ช่วยให้คุณแชร์ต่อได้ทันทีโดยไม่ต้องมานั่งแคปหน้าจอหรือครอปรูปเองให้เสียเวลาครับ
              </p>
            </div>
            <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group border border-slate-800">
              <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full -mr-24 -mt-24 blur-3xl group-hover:bg-orange-500/20 transition-all duration-700" />
              <div className="flex gap-4 items-center mb-6">
                <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20 animate-pulse">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h5 className="text-orange-400 font-bold m-0 text-lg font-prompt uppercase tracking-wide">💡 Pro Insight:</h5>
              </div>
              <p className="m-0 text-slate-300 leading-loose text-lg italic pl-4 border-l-2 border-orange-500/30 indent-8">
                "ถ้าคุณมีรางวัลหลายชิ้น ลองเริ่มจากรางวัลที่เล็กที่สุดไล่ขึ้นไปหารางวัลใหญ่ครับ เทคนิคนี้จะช่วยดึงคนดู (Viewer Retention) ให้ลุ้นไปกับคุณจนวินาทีสุดท้าย และที่สำคัญคือมันสร้างบรรยากาศความสนุกได้ดีกว่าการประกาศรางวัลใหญ่โครมเดียวจบเยอะเลยครับ!"
              </p>
            </div>
          </section>

          <section id="faq" className="scroll-mt-24 mb-16">
            <h2 className="font-prompt font-black text-2xl lg:text-3xl text-slate-900 leading-tight mb-8">
              ตอบข้อสงสัย: เรื่องการสุ่มที่คุณอาจยังไม่รู้ (FAQ)
            </h2>
            <div className="bg-slate-50 rounded-[2.5rem] p-6 divide-y divide-slate-200 border border-slate-100 shadow-inner">
              <div className="p-6 space-y-3">
                <h4 className="font-prompt font-bold text-xl text-slate-800 flex items-start gap-4 group cursor-help">
                  <HelpCircle className="w-6 h-6 text-primary shrink-0 mt-1 transition-transform group-hover:rotate-12" />
                  คอมพิวเตอร์สุ่มได้ "มั่ว" จริงๆ หรือเปล่า?
                </h4>
                <p className="text-slate-600 text-base leading-relaxed pl-10 indent-8">
                  ต้องบอกตามตรงว่าคอมพิวเตอร์ทำงานตามตรรกะครับ แต่มันใช้ค่าที่เปลี่ยนแปลงตลอดเวลาอย่างมิลลิวินาทีของนาฬิกาเครื่องมาเป็นตัวคำนวณ ทำให้การสุ่มมีความอิสระและเป็นกลางจนมนุษย์ไม่มีทางจับทางได้แน่นอนครับ สบายใจได้เลย!
                </p>
              </div>
              <div className="p-6 space-y-3">
                <h4 className="font-prompt font-bold text-xl text-slate-800 flex items-start gap-4 group cursor-help">
                  <HelpCircle className="w-6 h-6 text-primary shrink-0 mt-1 transition-transform group-hover:rotate-12" />
                  ถ้าสุ่มได้เลขที่ไม่มีเจ้าของ (ไม่มีผู้มารายงานตัว) ต้องทำไง?
                </h4>
                <p className="text-slate-600 text-base leading-relaxed pl-10 indent-8">
                  นี่คือเหตุผลที่เราควรประกาศกติกาล่วงหน้าครับ! ให้ระบุไว้เลยว่า "หากสุ่มได้เลขที่ไม่มีเจ้าของ หรือผู้โชคดีไม่มารายงานตัวภายในเวลาที่กำหนด จะถือว่าเป็นการสละสิทธิ์หรือถูกตัดสิทธิ์ทันทีตามกติกา" การระบุเงื่อนไขการตัดสิทธิ์ที่ชัดเจนจะช่วยป้องกันปัญหาความขัดแย้งได้ดีที่สุดครับ
                </p>
              </div>
              <div className="p-6 space-y-3">
                <h4 className="font-prompt font-bold text-xl text-slate-800 flex items-start gap-4 group cursor-help">
                  <HelpCircle className="w-6 h-6 text-primary shrink-0 mt-1 transition-transform group-hover:rotate-12" />
                  สุ่มผ่านมือถือกับคอมพิวเตอร์ แม่นต่างกันไหม?
                </h4>
                <p className="text-slate-600 text-base leading-relaxed pl-10 indent-8">
                  เทคนิคเดียวกันเป๊ะครับ! เพราะระบบของ <strong>"สุ่มสี่สุ่มห้า"</strong> รันบนเบราว์เซอร์มาตรฐานสากล ผลลัพธ์ที่ได้จึงยุติธรรมและแม่นยำเท่ากันทุกอุปกรณ์ครับ
                </p>
              </div>
            </div>
          </section>

          <section id="other-tools" className="scroll-mt-24 mb-16">
            <h2 className="font-prompt font-black text-2xl lg:text-3xl text-slate-900 leading-tight mb-10">
              ไม่ได้มีแค่สุ่มเลข! ลองใช้เครื่องมืออื่นๆ ของเรา
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/wheel" className="group p-6 rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center mb-4 group-hover:bg-orange-500 group-hover:text-white transition-all duration-500">
                  <FerrisWheel className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">วงล้อสุ่ม</h4>
                <p className="text-slate-500 text-xs leading-relaxed">ลุ้นระทึกกับวงล้อสุดพรีเมียม สุ่มอาหาร สุ่มรางวัล ได้ในคลิกเดียว</p>
              </Link>

              <Link href="/random-name" className="group p-6 rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center mb-4 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500">
                  <Users className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">สุ่มรายชื่อ</h4>
                <p className="text-slate-500 text-xs leading-relaxed">สุ่มผู้โชคดีจากรายชื่อ พร้อมแอนิเมชัน 3D สุดอลังการ</p>
              </Link>

              <Link href="/random-caption" className="group p-6 rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-purple-50 text-purple-500 flex items-center justify-center mb-4 group-hover:bg-purple-500 group-hover:text-white transition-all duration-500">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">แคปชั่น AI</h4>
                <p className="text-slate-500 text-xs leading-relaxed">คิดแคปชั่นไม่ออก? ให้ AI ช่วยสุ่มแคปชั่นเด็ดๆ ให้คุณ</p>
              </Link>
            </div>
          </section>

          <section id="conclusion" className="scroll-mt-24 mb-16">
            <h2 className="font-prompt font-black text-2xl lg:text-3xl text-slate-900 leading-tight mb-6">
              บทสรุป: ความยุติธรรมเริ่มที่ตัวเรา
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed text-lg">
              <p className="indent-12 font-medium">
                สุดท้ายแล้ว การสุ่มตัวเลข 2-3 ตัว อาจจะดูเป็นเรื่องเล็กน้อย แต่หากเราใส่ใจใน "ความโปร่งใส" และใช้เครื่องมือที่น่าเชื่อถือ มันคือการสร้างสังคมออนไลน์ที่มีความเชื่อมั่นต่อกันครับ 
              </p>
              <p className="indent-12">
                หวังว่าบทความนี้จะช่วยให้เพื่อนๆ จัดกิจกรรมได้อย่างสนุกและราบรื่นนะครับ ถ้าพร้อมแล้วก็เตรียมรายชื่อให้พร้อม แล้วไปใช้ระบบสุ่มที่ยุติธรรมที่สุดได้เลยที่หน้าเว็บของเราครับ!
              </p>
            </div>
          </section>

          <div className="mt-24 p-12 bg-gradient-to-br from-slate-900 to-slate-800 rounded-[4rem] text-white text-center relative overflow-hidden group shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
            <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-orange-500/20 rounded-full blur-[100px] transition-all duration-700 group-hover:bg-orange-500/40" />
            <div className="relative z-10">
              <div className="w-24 h-24 rounded-3xl bg-white/10 backdrop-blur-2xl flex items-center justify-center mb-10 border border-white/20 mx-auto group-hover:rotate-12 transition-transform duration-500 shadow-inner">
                <Sparkles className="w-12 h-12 text-orange-400" />
              </div>
              <h3 className="text-3xl md:text-5xl font-black font-prompt mb-8 tracking-tighter uppercase">แจกรางวัลอย่างมือโปรวันนี้!</h3>
              <p className="text-slate-400 mb-12 max-w-2xl mx-auto text-xl leading-relaxed">ใช้ระบบจาก <strong>"สุ่มสี่สุ่มห้า"</strong> เพื่อความโปร่งใสขั้นสุด สวยงาม และใช้งานง่ายในทุกอุปกรณ์</p>
              <Link 
                href="/random-number" 
                className="inline-flex items-center gap-5 px-14 py-6 bg-orange-500 hover:bg-orange-600 text-white font-black rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-orange-500/40 text-2xl uppercase tracking-wider group/btn"
              >
                เริ่มสุ่มตัวเลข 
                <ArrowRight className="w-8 h-8 group-hover/btn:translate-x-3 transition-transform" />
              </Link>
            </div>
          </div>
        </article>
      )
    };
  }
  return null;
};

export async function generateMetadata({ params }: ArticleProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleData(slug);
  if (!article) return { title: 'ไม่พบหน้าบทความ' };

  return {
    title: `${article.title} | สุ่มสี่สุ่มห้า`,
    description: `เจาะลึกเทคนิคการสุ่มเลข 2 ตัว 3 ตัว และจิตวิทยาการแจกรางวัลให้โปร่งใส ยุติธรรม กับเว็บ "สุ่มสี่สุ่มห้า"`,
    keywords: ['สุ่มสี่สุ่มห้า', 'สุ่มเลข', 'สุ่มตัวเลข', 'วิธีสุ่มเลข', 'แจกรางวัล', 'สุ่มเลข 2 ตัว', 'สุ่มเลข 3 ตัว', 'โปรแกรมสุ่มเลข'],
  };
}

export default async function ArticleDetail({ params }: ArticleProps) {
  const { slug } = await params;
  const article = getArticleData(slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen pb-20 bg-white">
      {/* Article Hero */}
      <ArticleHeroImage 
        src={article.image}
        title={article.title}
        category={article.category}
        date={article.date}
        readTime={article.readTime}
        author={article.author}
      />

      <div className="max-w-7xl mx-auto px-6 mt-12 border-t border-slate-100 pt-12">
        <div className="grid lg:grid-cols-[1fr_320px] gap-16">
          {/* Main Content */}
          <div className="space-y-12">
            {article.content}
            
            <div className="mt-16 pt-12 border-t border-slate-100">
               <ArticleActions title={article.title} slug={slug} />
            </div>
          </div>

          {/* Sidebar / Sticky Sections */}
          <aside className="space-y-10">
             <div className="sticky top-28 space-y-10">
               {/* New Sticky Table of Contents with Scroll Highlighting */}
               {article.toc && <TableOfContents items={article.toc} />}

               {/* Recommended Content */}
               <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
                 <h4 className="font-prompt font-black text-xl text-slate-800 flex items-center gap-3">
                   <div className="w-1.5 h-6 bg-primary rounded-full" />
                   เนื้อหาแนะนำ
                 </h4>
                 
                 <div className="space-y-4">
                   <div className="p-4 bg-white transition-all rounded-[2rem] border border-orange-100 flex items-center gap-4 group/item shadow-sm hover:shadow-xl hover:shadow-orange-500/10 hover:-translate-y-1 relative overflow-hidden">
                     <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center text-white shadow-lg transition-all duration-300">
                       <BookOpen className="w-5 h-5" />
                     </div>
                     <div className="flex-1 min-w-0">
                       <div className="font-bold text-slate-900 text-sm truncate">วงล้อสุ่มอาหารยอดฮิต</div>
                       <div className="text-[10px] text-orange-500 mt-1 font-black uppercase tracking-wider italic">Coming Soon</div>
                     </div>
                     <ChevronRight className="w-4 h-4 text-orange-200" />
                   </div>

                   <div className="p-4 bg-white transition-all rounded-[2rem] border border-orange-100 flex items-center gap-4 group/item shadow-sm hover:shadow-xl hover:shadow-orange-500/10 hover:-translate-y-1 relative overflow-hidden">
                     <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center text-white shadow-lg transition-all duration-300">
                       <BookOpen className="w-5 h-5" />
                     </div>
                     <div className="flex-1 min-w-0">
                       <div className="font-bold text-slate-900 text-sm truncate">ไอเดียกิจกรรมจับฉลาก</div>
                       <div className="text-[10px] text-orange-500 mt-1 font-black uppercase tracking-wider italic">Coming Soon</div>
                     </div>
                     <ChevronRight className="w-4 h-4 text-orange-200" />
                   </div>
                 </div>
               </div>

               <AdBanner slot="article_sidebar" />
             </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
