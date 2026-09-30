/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export function WeaveBackground() {
  const { scrollYProgress } = useScroll();
  
  // Transform scroll position into intersecting warp and weft thread line positions
  // Crimson weft line moving from top to bottom
  const weftY1 = useTransform(scrollYProgress, [0, 1], ["5%", "95%"]);
  const weftY2 = useTransform(scrollYProgress, [0, 1], ["85%", "15%"]);
  
  // Golden warp line moving from left to right
  const warpX1 = useTransform(scrollYProgress, [0, 1], ["10%", "90%"]);
  const warpX2 = useTransform(scrollYProgress, [0, 1], ["90%", "10%"]);

  return (
    <div id="weave-background-container" className="fixed inset-0 pointer-events-none z-0 overflow-hidden silk-texture">
      {/* Background Silk Sheen Accent */}
      <div className="absolute inset-0 bg-radial-[circle_at_50%_120%] from-[rgba(197,168,128,0.06)] via-transparent to-transparent" />
      
      {/* Sophisticated Dark Loom Grid Overlay */}
      <div 
        id="sophisticated-loom-grid"
        className="absolute inset-0 opacity-70"
        style={{ 
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(47, 62, 70, 0.025), rgba(47, 62, 70, 0.025) 1px, transparent 1px, transparent 20px), repeating-linear-gradient(90deg, rgba(47, 62, 70, 0.025), rgba(47, 62, 70, 0.025) 1px, transparent 1px, transparent 20px)' 
        }}
      />
      
      {/* Warp and Weft Lines - Dynamic Loom Threads */}
      
      {/* 1. Weft Thread (Horizontal, moves vertically on scroll) - Alta Crimson */}
      <motion.div 
        id="weft-thread-1"
        style={{ top: weftY1 }}
        className="absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-alta/25 to-transparent shadow-[0_0_8px_rgba(74,18,26,0.3)]"
      />
      
      {/* 2. Weft Thread (Horizontal, inverse vertical motion) - Zari Gold */}
      <motion.div 
        id="weft-thread-2"
        style={{ top: weftY2 }}
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zari/35 to-transparent"
      />

      {/* 3. Warp Thread (Vertical, moves horizontally) - Zari Gold */}
      <motion.div 
        id="warp-thread-1"
        style={{ left: warpX1 }}
        className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-zari/30 to-transparent"
      />

      {/* 4. Warp Thread (Vertical, inverse horizontal motion) - Alta Crimson */}
      <motion.div 
        id="warp-thread-2"
        style={{ left: warpX2 }}
        className="absolute top-0 bottom-0 w-[1.5px] bg-gradient-to-b from-transparent via-alta/20 to-transparent"
      />

      {/* Editorial Watermarks & Margins */}
      <div className="absolute top-12 left-6 text-[10px] tracking-[0.25em] font-cinzel text-zari/60 hidden md:block writing-vertical-lr select-none">
        IRAAYA BANARAS • PURE SILK ARCHIVE
      </div>
      <div className="absolute bottom-12 right-6 text-[10px] tracking-[0.25em] font-cinzel text-zari/60 hidden md:block writing-vertical-rl select-none">
        IRAAYA • BANARASI SILK HERITAGE
      </div>

      {/* Golden Loom Grid Pattern Border */}
      <div className="absolute inset-4 md:inset-8 border border-zari/10 z-0 pointer-events-none" />
      <div className="absolute inset-[18px] md:inset-[34px] border border-zari/5 z-0 pointer-events-none" />
    </div>
  );
}
