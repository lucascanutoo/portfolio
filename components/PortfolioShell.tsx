"use client";

import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { Particles } from "@/components/ui/particles";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function PortfolioShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  if (isAdmin) return null;

  return (
    <>
      {!prefersReducedMotion && (
        <Particles
          className="fixed inset-0 -z-10"
          variant="snow"
          style={isDesktop
            ? { count: 160, size: 1.1, speed: 0.8, opacity: 0.5 }
            : { count: 48, size: 1, speed: 0.5, opacity: 0.35 }}
          customOptions={{
            detectRetina: false,
            fpsLimit: isDesktop ? 60 : 30,
            particles: {
              move: {
                speed: isDesktop ? { min: 1, max: 1.8 } : { min: 0.25, max: 0.65 },
              },
              opacity: {
                animation: {
                  speed: 1,
                },
              },
            },
          }}
        />
      )}
      <Suspense>{children}</Suspense>
    </>
  );
}
