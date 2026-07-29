import type { Metadata } from "next";
import { Onest, JetBrains_Mono } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import SmoothScroll from "@/components/smooth-scroll";

/**
 * Onest carries the whole site. Chosen over a display/body split because the
 * product is one extrusion in six forms: a single type family reinforces
 * that. It is also the family aircenter.space uses, which is the reference
 * for this site's white ground.
 */
const onest = Onest({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

/** Mono is reserved for photometric figures. Never for body or headings. */
const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lumatree. One bar, six fixtures.",
  description:
    "A wood-clad linear LED bar with deep-recessed optics, built in six mounts. UGR9, CRI92 and dim-to-warm across the range.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${onest.variable} ${mono.variable} antialiased`}>
      <body className="flex min-h-[100dvh] flex-col">
        <SmoothScroll />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
