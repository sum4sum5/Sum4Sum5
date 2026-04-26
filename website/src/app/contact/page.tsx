import React from 'react';
import { Mail, MessageSquare, Send, Zap } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ติดต่อเรา | สุ่มสี่สุ่มห้า (Sum4Sum5)',
  description: 'มีข้อสงสัย แจ้งปัญหาการใช้งาน หรือติดต่องานสปอนเซอร์โฆษณา ติดต่อทีมงานสุ่มสี่สุ่มห้าได้ที่นี่ เรายินดีรับฟังทุกคำติชม',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center space-y-4 mb-20">
          <div className="w-16 h-16 bg-orange-100 rounded-3xl flex items-center justify-center text-primary mx-auto mb-6">
            <Mail className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-prompt font-black text-slate-900 leading-tight">
            ติดต่อทีมงาน <br/>
            <span className="text-primary italic">สุ่มสี่สุ่มห้า</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            มีข้อสงสัย แจ้งปัญหา หรืออยากร่วมเป็นพาร์ทเนอร์กับเรา? ส่งข้อความหาเราได้เลยครับ
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-start">
          {/* Contact Form */}
          <div className="bg-white p-8 md:p-12 rounded-[3.5rem] shadow-xl shadow-slate-200/50 border border-white">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-2">ชื่อของคุณ</label>
                  <input 
                    type="text" 
                    placeholder="สมชาย ใจดี"
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-2">อีเมลติดต่อ</label>
                  <input 
                    type="email" 
                    placeholder="somchai@example.com"
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-2">หัวเรื่อง</label>
                <input 
                  type="text" 
                  placeholder="แจ้งปัญหาการใช้งาน / ติดต่อโฆษณา"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-2">ข้อความของคุณ</label>
                <textarea 
                  rows={5}
                  placeholder="พิมพ์ข้อความที่นี่..."
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium resize-none"
                ></textarea>
              </div>
              <button 
                type="button"
                className="w-full py-5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3 active:scale-95"
              >
                <Send className="w-5 h-5" /> ส่งข้อความหาเรา
              </button>
            </form>
          </div>

          {/* Contact Info Cards */}
          <div className="space-y-6">
            <ContactInfoCard 
              icon={<Mail className="w-6 h-6" />}
              title="อีเมลหลัก"
              value="contact@sum4sum5.com"
              sub="ตอบกลับภายใน 24 ชม."
            />
            <ContactInfoCard 
              icon={<MessageSquare className="w-6 h-6" />}
              title="Line Official"
              value="@sum4sum5"
              sub="แชทคุยกับทีมงานโดยตรง"
            />
            <div className="bg-gradient-to-br from-orange-500 to-primary p-8 rounded-[2.5rem] text-white space-y-4 shadow-xl shadow-orange-500/20 relative overflow-hidden group">
               <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
                  <Zap className="w-40 h-40 fill-white" />
               </div>
               <h3 className="font-prompt font-black text-xl m-0 leading-tight">ร่วมเป็นส่วนหนึ่ง <br/> ของการสุ่มที่สนุกที่สุด</h3>
               <p className="text-white/80 text-sm leading-relaxed">
                 เราเปิดรับทุกไอเดียและทุกความร่วมมือ เพื่อพัฒนาเครื่องมือให้ดียิ่งขึ้นสำหรับทุกคน
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ContactInfoCard = ({ icon, title, value, sub }: { icon: React.ReactNode, title: string, value: string, sub: string }) => (
  <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all space-y-4 group">
    <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <div>
      <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{title}</div>
      <div className="text-lg font-prompt font-black text-slate-900 group-hover:text-primary transition-colors">{value}</div>
      <div className="text-xs text-slate-400 font-medium">{sub}</div>
    </div>
  </div>
);
