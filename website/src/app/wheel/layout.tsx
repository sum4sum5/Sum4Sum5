import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'วงล้อเสี่ยงดวง ออนไลน์ (Fortune Wheel) - วงล้อสุ่มชื่อ สุ่มอาหาร หมุนวงล้อฟรี!',
  description: 'สร้างวงล้อเสี่ยงดวงออนไลน์ฟรี! วงล้อสุ่มชื่อ สุ่มรายชื่ออาหาร สุ่มชื่อเพื่อน หรือจับฉลากออนไลน์ ดีไซน์พรีเมียม ใช้งานง่าย หมุนลื่นที่สุดในไทย บันทึกรูปผลลัพธ์ได้ทันที',
  keywords: ['วงล้อเสี่ยงดวง', 'วงล้อสุ่ม', 'สุ่มชื่อ', 'สุ่มอาหาร', 'จับฉลากออนไลน์', 'วงล้อฟรี', 'Fortune Wheel'],
};

export default function WheelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
