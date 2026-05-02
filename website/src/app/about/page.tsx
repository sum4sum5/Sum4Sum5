'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Code, Smile, Coffee, Rocket } from 'lucide-react';
import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen bg-transparent pb-20">
      <div className="max-w-4xl mx-auto px-6 pt-16 md:pt-24 space-y-20">
        
        {/* Header Section */}
        <section className="text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-20 h-20 orange-gradient rounded-3xl flex items-center justify-center text-white mx-auto shadow-xl"
          >
            <Smile className="w-12 h-12" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-6xl font-prompt font-black text-slate-900 tracking-tight">
              ทำความรู้จักกับ <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">สุ่มสี่สุ่มห้า</span>
            </h1>
            <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
              พื้นที่เล็กๆ ที่สร้างขึ้นมาเพื่อเปลี่ยน &quot;ความลังเล&quot; ให้เป็น &quot;รอยยิ้ม&quot;
            </p>
          </motion.div>
        </section>

        {/* Story Section */}
        <section className="bg-white rounded-[3rem] p-10 md:p-16 border border-slate-100 shadow-sm space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
            <Sparkles className="w-40 h-40" />
          </div>
          
          <div className="relative z-10 space-y-6 text-lg text-slate-600 leading-relaxed font-medium">
            <h2 className="text-3xl font-prompt font-black text-slate-900 flex items-center gap-3">
              <Heart className="w-8 h-8 text-rose-500 fill-rose-500" /> ที่มาของชื่อนี้...
            </h2>
            <p>
              ชื่อ <strong className="text-slate-900">“สุ่มสี่สุ่มห้า”</strong> อาจจะฟังดูเหมือนการทำอะไรแบบไม่คิดหน้าคิดหลัง แต่สำหรับเรา มันคือเสน่ห์ของการใช้ชีวิต! ในโลกที่เต็มไปด้วยข้อมูลและการตัดสินใจที่เคร่งเครียด เราเชื่อว่าบางครั้ง การปล่อยให้ &quot;ดวง&quot; หรือ &quot;การสุ่ม&quot; ได้ทำหน้าที่ของมันบ้าง ก็ช่วยลดความเหนื่อยล้าในใจได้ไม่น้อยเลย
            </p>
            <p>
              พวกเราเริ่มต้นจากการเป็นกลุ่มนักพัฒนาและนักสร้างสรรค์คอนเทนต์ที่ชอบเจอปัญหาคลาสสิกอย่าง <em className="italic text-slate-400">&quot;เที่ยงนี้กินอะไรดี?&quot;, &quot;จะลงรูปแล้ว แต่คิดแคปชั่นไม่ออก&quot;</em> หรือแม้แต่ <em className="italic text-slate-400">&quot;จะเลือกใครมาเป็นผู้โชคดีดีนะ?&quot;</em>
            </p>
            <p>
              เราเลยตั้งคำถามว่า <strong className="text-slate-900">&quot;จะดีแค่ไหนถ้าเรามีพื้นที่ที่ช่วยตัดสินใจเรื่องพวกนี้แบบสนุกๆ และดูพรีเมียมที่สุด?&quot;</strong> นั่นคือจุดเริ่มต้นที่ทำให้เราเขียนโค้ดบรรทัดแรกของ Sum4Sum5 ขึ้นมาเลย
            </p>
          </div>
        </section>

        {/* Mission/Philosophy Grid */}
        <section className="grid md:grid-cols-2 gap-8">
          <div className="bg-orange-50 rounded-[2.5rem] p-10 space-y-4 border border-orange-100">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm mb-4">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-prompt font-black text-slate-900">สร้างรอยยิ้มบนโซเชียล</h3>
            <p className="text-slate-600 leading-relaxed">
              เป้าหมายสูงสุดของเราคือการเห็นผลลัพธ์จากการสุ่มของเราไปปรากฏอยู่ในหน้าไทม์ไลน์ของคุณ ไม่ว่าจะเป็นวงล้อสุ่มอาหารที่ช่วยให้มื้อเที่ยงสนุกขึ้น หรือแคปชั่นกวนๆ ที่เรียกยอดไลก์จากเพื่อนๆ ทุกรอยยิ้มคือความสำเร็จของเราเลย
            </p>
          </div>

          <div className="bg-slate-900 rounded-[2.5rem] p-10 space-y-4 text-white shadow-xl relative overflow-hidden">
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/20 blur-3xl rounded-full" />
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-primary shadow-sm mb-4 backdrop-blur-md">
              <Code className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-prompt font-black">เบื้องหลังที่จริงจัง</h3>
            <p className="text-slate-400 leading-relaxed">
              แม้หน้าตาจะดูขี้เล่น แต่เบื้องหลังเราให้ความสำคัญกับเทคโนโลยีมาก เว็บไซต์นี้ถูกพัฒนาด้วย Next.js และ Framer Motion เพื่อให้มั่นใจว่าทุกการหมุนวงล้อจะลื่นไหลที่สุด การสุ่มจะยุติธรรมที่สุด และแสดงผลได้สวยงามที่สุดในทุกอุปกรณ์
            </p>
          </div>
        </section>

        {/* Team/Contact Section */}
        <section className="text-center space-y-10 pt-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-slate-100 shadow-sm text-slate-500 font-bold text-sm">
            <Coffee className="w-4 h-4 text-orange-400" />
            <span>เราพัฒนาด้วยความรักและกาแฟ</span>
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-prompt font-black text-slate-900">ร่วมเป็นส่วนหนึ่งกับเรา</h2>
            <p className="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
              สุ่มสี่สุ่มห้าเป็นโปรเจกต์ที่เติบโตได้เพราะผู้ใช้งานทุกคน หากคุณมีไอเดียเครื่องมือสุ่มใหม่ๆ หรืออยากแนะนำอะไร สามารถติดต่อเราได้เสมอ เพราะเราอยากให้ที่นี่เป็นที่สุ่มที่สนุกที่สุดในโลกอินเทอร์เน็ต!
            </p>
          </div>
          
          <div className="flex justify-center gap-4 pt-4">
            <Link href="/wheel">
              <button className="btn-primary px-8 py-4 rounded-2xl flex items-center gap-2 group">
                <Rocket className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                <span>เริ่มสุ่มกับเราเลย</span>
              </button>
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
