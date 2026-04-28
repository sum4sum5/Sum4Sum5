import React from 'react';
import { Metadata } from 'next';
import HomeClient from '@/components/home/HomeClient';

export const metadata: Metadata = {
  title: 'สุ่มสี่สุ่มห้า (Sum4Sum5) | รวมเครื่องมือสุ่มออนไลน์พรีเมียม วงล้อ สุ่มเลข สุ่มชื่อ จับฉลาก',
  description: 'ตัดสินใจไม่ถูก? ให้เราสุ่มให้สิ! รวมเครื่องมือสุ่มที่ดีที่สุด ทั้งวงล้อสุ่มออนไลน์ สุ่มเลขออนไลน์ สุ่มชื่อจับฉลาก และสุ่มแคปชั่น AI ดีไซน์พรีเมียม ใช้งานง่าย และฟรี 100%',
  keywords: ['สุ่มสี่สุ่มห้า', 'Sum4Sum5', 'เครื่องมือสุ่ม', 'สุ่มเลขออนไลน์', 'สุ่มชื่อจับฉลาก', 'วงล้อเสี่ยงดวง', 'วงล้อสุ่ม', 'สุ่มแคปชั่นกวนๆ'],
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "สุ่มสี่สุ่มห้า (Sum4Sum5)",
    "operatingSystem": "Web",
    "applicationCategory": "UtilityApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "THB"
    },
    "description": "แพลตฟอร์มเครื่องมือสุ่มออนไลน์ฟรี รวมวงล้อเสี่ยงดวง สุ่มเลขออนไลน์ และสุ่มชื่อจับฉลาก",
    "featureList": [
      "สุ่มเลขออนไลน์ แม่นยำ 100% (PRNG)",
      "วงล้อเสี่ยงดวง ออนไลน์ ดีไซน์พรีเมียม",
      "สุ่มรายชื่อผู้โชคดี พร้อมภาพประกาศผล 3D",
      "แคปชั่น AI ภาษาไทยล่าสุด (Gemini)"
    ]
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "สุ่มสี่สุ่มห้า (Sum4Sum5) คืออะไร?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "เป็นแพลตฟอร์มรวมเครื่องมือสุ่มออนไลน์ฟรี เช่น วงล้อสุ่ม สุ่มตัวเลข สุ่มรายชื่อ และสุ่มแคปชั่นกวนๆ ออกแบบมาเพื่อช่วยในการตัดสินใจและสร้างคอนเทนต์โซเชียลมีเดีย"
        }
      },
      {
        "@type": "Question",
        "name": "ใช้งานฟรีจริงหรือไม่?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "ใช่ ทุกเครื่องมือบนเว็บไซต์ของเราใช้งานได้ฟรี 100% โดยไม่ต้องสมัครสมาชิก"
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <HomeClient />
    </>
  );
}
