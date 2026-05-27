"use client";

import { motion } from "motion/react";
import { LineShadowText } from "./ui/line-shadow-text";

interface HeroData {
  greeting: string;
  name: string;
  tagline: string;
  splineUrl: string;
}

export default function Hero({ data }: { data?: HeroData }) {
  const greeting = data?.greeting || "Hey, I'm";
  const name = data?.name || "Lucas";
  const tagline = data?.tagline || "Full-stack developer focused on building fast, polished, and reliable digital products.";

  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full items-center overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="hero-orb pointer-events-none absolute left-1/2 top-[43%] h-72 w-72 -translate-x-1/2 -translate-y-1/2 sm:h-80 sm:w-80"
      />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24 sm:px-10 lg:px-16">
        <div className="flex flex-col items-center gap-16">
          <div className="max-w-xl space-y-6 text-center">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-mono text-sm tracking-widest text-muted-foreground uppercase"
            >
              {greeting}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <LineShadowText
                className="text-5xl leading-none font-bold italic sm:text-6xl md:text-7xl lg:text-8xl"
                shadowColor="white"
              >
                {name}
              </LineShadowText>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-lg leading-relaxed text-muted-foreground sm:text-xl"
            >
              {tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-4 pt-2"
            >
              <button
                onClick={() => {
                  const el = document.getElementById("projects");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex h-10 items-center rounded-lg bg-white px-5 text-sm font-medium text-black transition-colors hover:bg-neutral-200 cursor-pointer"
              >
                View Work
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById("contact");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex h-10 items-center rounded-lg border border-white/10 px-5 text-sm font-medium text-neutral-300 transition-colors hover:bg-white/5 cursor-pointer"
              >
                Get in Touch
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
