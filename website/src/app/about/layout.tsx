import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'เกี่ยวกับเรา | สุ่มสี่สุ่มห้า (Sum4Sum5)',
  description: 'ทำความรู้จักกับสุ่มสี่สุ่มห้า พื้นที่สร้างสรรค์ที่เปลี่ยนความลังเลให้เป็นรอยยิ้มด้วยเครื่องมือสุ่มออนไลน์ระดับพรีเมียม ดีไซน์สวย ใช้งานง่าย และฟรี 100%',
  keywords: ['เกี่ยวกับสุ่มสี่สุ่มห้า', 'ผู้พัฒนา Sum4Sum5', 'เครื่องมือสุ่มออนไลน์', 'เบื้องหลังสุ่มสี่สุ่มห้า'],
  openGraph: {
    title: 'เกี่ยวกับเรา | สุ่มสี่สุ่มห้า (Sum4Sum5)',
    description: 'พื้นที่ที่เปลี่ยนความลังเลให้เป็นรอยยิ้ม ทำความรู้จักเบื้องหลังโปรเจกต์สุ่มสี่สุ่มห้าได้ที่นี่',
    images: ['/og-image.png'],
  }
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
