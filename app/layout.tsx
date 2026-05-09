
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DockSection from "@/components/sections/DockSection";
import { PortfolioShell } from "@/components/PortfolioShell";
import DesktopHint from "@/components/DesktopHint";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lucas | Full Stack Developer",
  description:
    "Portfolio of Lucas, a full stack developer focused on React, Next.js, Node.js, APIs, databases, and polished digital products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`} suppressHydrationWarning
      >
        {/* Particles + Dock — hidden on /admin routes */}
        <PortfolioShell>
          <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
            <DockSection />
          </div>
          <DesktopHint />
        </PortfolioShell>

        {children}
      </body>
    </html>
  );
}

