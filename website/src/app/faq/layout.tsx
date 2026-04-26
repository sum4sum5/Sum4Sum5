import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'คู่มือการใช้งานและคำถามที่พบบ่อย (Ultimate Guide & FAQ) | สุ่มสี่สุ่มห้า',
  description: 'เรียนรู้ทุกเรื่องเกี่ยวกับการสุ่มออนไลน์ ความโปร่งใสของระบบ PRNG จิตวิทยาการตัดสินใจ และเคล็ดลับการใช้ AI เขียนแคปชั่นแบบเจาะลึกที่ Sum4Sum5',
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
