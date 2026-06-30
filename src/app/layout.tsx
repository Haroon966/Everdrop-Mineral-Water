import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { GsapProvider } from "@/components/animations/gsap-provider";
import { Toaster } from "@/components/ui/sonner";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ThemeInit } from "@/components/theme-init";
import { ThemeProvider } from "@/components/theme-provider";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { getNavigation, getSiteConfig } from "@/lib/content";
import { getRootMetadata } from "@/lib/metadata";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = getRootMetadata();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const site = getSiteConfig();
  const navigation = getNavigation();

  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable} h-full`}>
      <body className="flex min-h-full flex-col overflow-x-hidden antialiased">
        <ThemeInit />
        <ThemeProvider>
          <GsapProvider>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
            >
              Skip to main content
            </a>
            <Header navLinks={navigation.header} />
            <main id="main-content" className="flex-1 scroll-pb-20 pt-24 lg:scroll-pb-0">
              {children}
            </main>
            <Footer navigation={navigation} site={site} />
            <WhatsAppFab />
            <GoogleAnalytics />
            <Toaster richColors position="top-center" />
          </GsapProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
