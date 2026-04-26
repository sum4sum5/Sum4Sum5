"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import AdBanner from "@/components/shared/AdBanner";
import BackToTop from "@/components/BackToTop";
import { usePathname } from "next/navigation";

type AppShellProps = {
  children: React.ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const hideSiteChrome = pathname.startsWith("/admin");

  if (hideSiteChrome) {
    return <main className="flex-grow">{children}</main>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
      <CookieBanner />
      <AdBanner slot="sticky-bottom" />
      <BackToTop />
    </>
  );
}
