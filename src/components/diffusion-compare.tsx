"use client";

import { motion } from "framer-motion";

export default function DiffusionCompare() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <motion.div
        className="relative aspect-square overflow-hidden rounded-[28px] bg-canopy"
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 45%, #ffffff 0%, #ffffff 3%, rgba(255,255,255,0.35) 5%, transparent 9%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-vellum/50">
            A bare bulb
          </p>
          <p className="mt-1 text-sm text-vellum/70">
            One hard edge. A room split into lit and unlit, nothing between.
          </p>
        </div>
      </motion.div>

      <motion.div
        className="relative aspect-square overflow-hidden rounded-[28px] bg-canopy"
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 45%, #ff6a1a 0%, rgba(255,106,26,0.6) 18%, rgba(255,106,26,0.22) 42%, transparent 78%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-vellum/50">
            Through opal glass
          </p>
          <p className="mt-1 text-sm text-vellum/70">
            The same bulb, spread across a gradient. Shadow becomes a
            question of degree, not a line.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
