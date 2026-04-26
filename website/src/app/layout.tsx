import type { Metadata, Viewport } from "next";
import { Kanit, Prompt } from "next/font/google";
import AppShell from "@/components/AppShell";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const kanit = Kanit({
  weight: ["300", "400", "500", "600"],
  subsets: ["thai", "latin"],
  variable: "--font-kanit",
});

const prompt = Prompt({
  weight: ["300", "400", "500", "600"],
  subsets: ["thai", "latin"],
  variable: "--font-prompt",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sum4sum5.com";

export const viewport: Viewport = {
  themeColor: "#FF8C00",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "สุ่มสี่สุ่มห้า (Sum4Sum5) | รวมเครื่องมือสุ่มออนไลน์ วงล้อ สุ่มเลข สุ่มชื่อ สุ่มแคปชั่น",
    template: "%s | สุ่มสี่สุ่มห้า (Sum4Sum5)",
  },
  description: "รวมเครื่องมือสุ่มที่คุณต้องการ! สุ่มเลขออนไลน์ วงล้อเสี่ยงดวง สุ่มชื่อจับฉลาก และสุ่มแคปชั่นกวนๆ สายฮา ครบจบในที่เดียว ใช้งานง่าย ดีไซน์สวย และฟรี 100%",
  keywords: ["สุ่มเลขออนไลน์", "สุ่มชื่อจับฉลาก", "วงล้อเสี่ยงดวง", "สุ่มแคปชั่นกวนๆ", "สุ่มสี่สุ่มห้า", "Sum4Sum5", "เครื่องมือสุ่ม", "สุ่มกลุ่ม", "AI เขียนแคปชั่น"],
  authors: [{ name: "Sum4Sum5 Team" }],
  openGraph: {
    type: "website",
    locale: "th_TH",
    url: "https://sum4sum5.com",
    title: "สุ่มสี่สุ่มห้า (Sum4Sum5) - แพลตฟอร์มสุ่มที่สนุกที่สุด",
    description: "ตัดสินใจไม่ถูก? ให้เราสุ่มให้สิ! วงล้อเสี่ยงดวง สุ่มเลข สุ่มชื่อ และ AI แคปชั่น ครบจบในเว็บเดียว",
    siteName: "Sum4Sum5",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "สุ่มสี่สุ่มห้า Platform Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "สุ่มสี่สุ่มห้า (Sum4Sum5)",
    description: "แพลตฟอร์มสุ่มออนไลน์ที่ครบครันและสนุกที่สุด",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: "Qqy3gTIegAfH4_7A8_lDj3N31PoJFTTejpQAKdRxMpk",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "สุ่มสี่สุ่มห้า (Sum4Sum5)",
    "alternateName": "Sum4Sum5",
    "url": siteUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${siteUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="th" className={`${kanit.variable} ${prompt.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-kanit antialiased bg-gray-50 text-slate-900 min-h-screen">
        <AppShell>{children}</AppShell>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
