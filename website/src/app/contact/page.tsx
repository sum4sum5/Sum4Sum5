'use client';

import React, { useState } from 'react';
import { Mail, MessageSquare, Send, Zap, CheckCircle2, User, AtSign, Type, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-transparent pb-20">
      <div className="max-w-6xl mx-auto px-6 pt-16 md:pt-24">
        
        {/* Header Section */}
        <div className="text-center space-y-6 mb-20">
          <div className="w-20 h-20 orange-gradient rounded-[2rem] flex items-center justify-center text-white mx-auto shadow-xl">
            <Mail className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-6xl font-prompt font-black text-slate-900 tracking-tight leading-tight">
            ติดต่อทีมงาน <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">สุ่มสี่สุ่มห้า</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            มีข้อเสนอแนะ แจ้งปัญหาการใช้งาน หรือติดต่องานสปอนเซอร์? <br className="hidden md:block" />
            เรายินดีรับฟังทุกข้อความจากคุณ
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-10 items-start">
          
          {/* Contact Form Section */}
          <div className="bg-white p-8 md:p-12 rounded-[3.5rem] shadow-xl shadow-slate-200/40 border border-slate-50 relative overflow-hidden">
            {isSubmitted ? (
              <div className="py-20 text-center space-y-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto animate-bounce">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h2 className="text-3xl font-prompt font-black text-slate-900">ส่งข้อความสำเร็จ!</h2>
                <p className="text-slate-500 font-medium text-lg">ขอบคุณที่ติดต่อเรา ทีมงานจะรีบตอบกลับโดยเร็วที่สุด</p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="px-8 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-colors"
                >
                  เขียนข้อความใหม่
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-500 ml-1 flex items-center gap-2">
                      <User className="w-4 h-4" /> ชื่อของคุณ
                    </label>
                    <input 
                      required
                      type="text" 
                      placeholder="สมชาย ใจดี"
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium text-slate-900"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-500 ml-1 flex items-center gap-2">
                      <AtSign className="w-4 h-4" /> อีเมลติดต่อ
                    </label>
                    <input 
                      required
                      type="email" 
                      placeholder="somchai@example.com"
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium text-slate-900"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-500 ml-1 flex items-center gap-2">
                    <Type className="w-4 h-4" /> หัวเรื่อง
                  </label>
                  <input 
                    required
                    type="text" 
                    placeholder="แจ้งปัญหาการใช้งาน / ติดต่อโฆษณา"
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium text-slate-900"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-500 ml-1 flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" /> ข้อความของคุณ
                  </label>
                  <textarea 
                    required
                    rows={5}
                    placeholder="พิมพ์ข้อความที่คุณต้องการสื่อสาร..."
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium resize-none text-slate-900"
                  ></textarea>
                </div>

                <div className="flex items-center gap-3 px-2">
                  <input required type="checkbox" id="privacy" className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary cursor-pointer" />
                  <label htmlFor="privacy" className="text-sm text-slate-500 font-medium cursor-pointer">
                    ฉันยอมรับ <a href="/privacy" className="text-primary underline">นโยบายความเป็นส่วนตัว</a> และอนุญาตให้ทีมงานติดต่อกลับ
                  </label>
                </div>

                <button 
                  type="submit"
                  className="w-full py-5 bg-slate-900 hover:bg-slate-800 text-white font-prompt font-black text-xl rounded-[2rem] shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3 active:scale-95"
                >
                  <Send className="w-6 h-6" /> ส่งข้อความหาเรา
                </button>
              </form>
            )}
          </div>

          {/* Contact Sidebar */}
          <div className="space-y-6">
            <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all space-y-6 group">
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Mail className="w-7 h-7" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">อีเมลติดต่อหลัก</div>
                <div className="text-lg font-prompt font-black text-slate-900 group-hover:text-primary transition-colors">support@sum4sum5.com</div>
                <div className="text-sm text-slate-400 font-medium">ตอบกลับทุกข้อสงสัยภายใน 24 ชม.</div>
              </div>
            </div>

            <div className="bg-slate-900 p-8 rounded-[3rem] text-white space-y-6 shadow-2xl relative overflow-hidden group">
               <div className="absolute -right-6 -bottom-6 opacity-10 group-hover:scale-125 transition-transform duration-1000">
                  <Zap className="w-48 h-48 fill-primary text-primary" />
               </div>
               <div className="relative z-10 space-y-4">
                 <h3 className="font-prompt font-black text-2xl leading-tight">ร่วมสร้างรอยยิ้ม <br/> ไปกับเรา</h3>
                 <p className="text-slate-400 text-sm leading-relaxed font-medium">
                   เราเปิดรับทุกไอเดียและข้อเสนอแนะเพื่อพัฒนา "สุ่มสี่สุ่มห้า" ให้เป็นพื้นที่แห่งความสุขของทุกคน
                 </p>
                 <div className="pt-2">
                   <div className="inline-block px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest">
                     Partnership open
                   </div>
                 </div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
