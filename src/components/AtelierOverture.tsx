/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Sparkles, MapPin, Feather, Gem } from "lucide-react";

interface AtelierOvertureProps {
  onNavigate: (sectionId: string) => void;
  onOpenConsultation: () => void;
}

export function AtelierOverture({ onNavigate, onOpenConsultation }: AtelierOvertureProps) {
  const handleScrollTo = (id: string) => {
    onNavigate(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      id="root-overture" 
      className="relative pt-20 pb-10 flex items-center justify-center overflow-hidden z-10 px-4 sm:px-6 md:px-12 min-h-[90vh]"
    >
      {/* Background Cinematic Video Layer */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-35"
          src="/hero-saree-loop.mp4"
        />
        {/* Editorial atmospheric gradient overlay to maintain impeccable text contrast and luxury aesthetic */}
        <div className="absolute inset-0 bg-gradient-to-r from-kora/85 via-kora/50 to-kora/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-kora/30 via-transparent to-kora/90" />
      </div>

      {/* Background Script Watermark */}
      <div className="absolute right-[-5%] top-[15%] text-[18vw] font-serif text-alta/[0.025] select-none pointer-events-none font-bold leading-none tracking-widest z-0">
        IRAAYA
      </div>

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Editorial Narrative Panel */}
        <div className="lg:col-span-7 flex flex-col space-y-5 z-10 text-left">
          
          {/* Tagline - Hidden on mobile as requested */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="hidden sm:flex items-center gap-3 text-alta font-sans text-xs uppercase tracking-[0.3em] font-medium"
          >
            <Feather className="w-3.5 h-3.5 text-zari" />
            <span>Pure Benarasi Silk Saree Archive</span>
          </motion.div>

          {/* Heading - Refined smaller scale on mobile view */}
          <div className="space-y-2 sm:space-y-3">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-charcoal font-normal tracking-tight leading-[1.15] sm:leading-[1.05]"
            >
              Let the <span className="font-cinzel text-alta font-bold">World</span> See You <br />
              <span className="italic font-light text-zari">With Our Designs.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-[11px] sm:text-xs md:text-sm font-sans tracking-[0.2em] sm:tracking-[0.25em] text-alta/80 font-semibold uppercase flex items-center gap-2"
            >
              <span>IRAAYA</span>
              <span>•</span>
              <span className="font-serif text-zari">BANARAS (WAZIR & CO)</span>
            </motion.p>
          </div>

          {/* Premium Core Mission Statement - Quote and 100% Pure Benarasi Silk hidden on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="sm:border-l-2 sm:border-zari/40 sm:pl-6 space-y-3 sm:space-y-4 max-w-xl"
          >
            <p className="hidden sm:block text-sm md:text-base text-charcoal/80 leading-relaxed font-serif italic font-light">
              "Minimal, timeless, effortless. Iraaya celebrates the majestic grace of pure Banarasi sarees—handwoven with authentic gold and silver zari for your grand celebrations and cherished bridal trousseau."
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-charcoal/60 font-sans">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-alta/80" />
                <span>Godowlia, Banaras (Varanasi)</span>
              </span>
              <span 
                style={{
                  backgroundColor: "transparent",
                  color: "#1a1717",
                  fontStyle: "italic",
                  fontFamily: "Georgia",
                }}
                className="hidden sm:inline-flex items-center gap-1 font-bold"
              >
                <Gem className="w-3 h-3 text-current" />
                <span>100% Pure Benarasi Silk</span>
              </span>
            </div>
          </motion.div>

          {/* Editorial CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="pt-4 flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 w-full"
          >
            <button
              onClick={() => handleScrollTo("boutique-shop")}
              className="w-full sm:w-auto px-6 py-3 bg-[#4A121A] text-[#FDFBF7] font-sans text-[10px] tracking-[0.2em] uppercase hover:bg-alta/90 hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>Explore Banarasi Collection</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onOpenConsultation}
              className="w-full sm:w-auto px-6 py-3 border border-dashed border-zari text-[#4A121A] hover:text-alta/80 font-sans text-[10px] tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-2 group"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880] group-hover:animate-pulse" />
              <span>Bespoke Bridal Request</span>
            </button>
          </motion.div>

          {/* Highlights ticker */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="pt-4 border-t border-zari/15 max-w-lg grid grid-cols-3 gap-4 text-left"
          >
            <div>
              <p className="text-xl md:text-2xl font-serif text-alta">Since 1995</p>
              <p className="text-[10px] uppercase tracking-wider font-sans text-charcoal/50">Wazir & Co Guild</p>
            </div>
            <div>
              <p className="text-xl md:text-2xl font-serif text-alta">100%</p>
              <p className="text-[10px] uppercase tracking-wider font-sans text-charcoal/50">Pure Katan Silk</p>
            </div>
            <div>
              <p className="text-xl md:text-2xl font-serif text-alta">Global</p>
              <p className="text-[10px] uppercase tracking-wider font-sans text-charcoal/50">Express Shipping</p>
            </div>
          </motion.div>

        </div>

        {/* Right Collaged Immersive Campaign Visuals */}
        <div className="lg:col-span-5 relative mt-8 lg:mt-0 flex justify-center z-10">
          
          <div className="absolute -inset-4 border border-zari/15 pointer-events-none rotate-2 z-0" />
          <div className="absolute -inset-2 border border-alta/10 pointer-events-none -rotate-1 z-0" />

          {/* Main Campaign Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="relative w-[280px] sm:w-[340px] aspect-[3/4] overflow-hidden border-[6px] border-kora shadow-2xl z-10 group"
          >
            <div className="absolute inset-0 bg-alta/5 group-hover:bg-transparent transition-all duration-700 z-10" />
            <img
              src="https://i.pinimg.com/1200x/12/c1/85/12c18577097b2bb2ecf1cb10e2fb67ec.jpg"
              alt="Iraaya Pure Benarasi Silk Saree Campaign"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Overlay card */}
            <div className="absolute bottom-4 left-4 right-4 bg-kora/95 backdrop-blur-sm p-4 border border-zari/20 z-20 text-left">
              <span className="text-[9px] tracking-widest uppercase font-sans text-zari font-bold">IRAAYA CAMPAIGN</span>
              <h3 className="font-serif text-sm text-alta font-medium">Pure Benarasi Silk Heritage Weave</h3>
              <p className="text-[10px] text-charcoal/60 mt-1">Authentic Gold & Silver Zari Loom</p>
            </div>
          </motion.div>

          {/* Secondary Collage Detail Image */}
          <motion.div
            initial={{ opacity: 0, x: 40, y: -20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1.4, delay: 0.8 }}
            className="absolute -right-4 -bottom-10 w-[140px] sm:w-[180px] aspect-[4/5] overflow-hidden border-[4px] border-kora shadow-xl z-20 hidden sm:block group"
          >
            <div className="absolute inset-0 bg-zari/5 group-hover:bg-transparent transition-all duration-700 z-10" />
            <img
              src="https://i.pinimg.com/736x/2e/d3/c3/2ed3c30fe413a33e28bdb63519d5862f.jpg"
              alt="Royal Benarasi Silk Weave Detail"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute top-2 right-2 bg-alta text-kora text-[8px] tracking-widest px-2 py-0.5 uppercase font-sans font-semibold">
              Detail
            </div>
          </motion.div>

          {/* Tag */}
          <div className="absolute top-6 -left-6 z-30 bg-zari text-kora font-mono text-[9px] tracking-widest py-1.5 px-3 uppercase -rotate-90 hidden md:block">
            Iraaya
          </div>
        </div>

      </div>

      {/* Floating scroll indicator */}
      <div 
        onClick={() => handleScrollTo("boutique-shop")}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer select-none text-charcoal/50 hover:text-alta transition-colors"
      >
        <span className="text-[9px] tracking-widest uppercase font-sans">Discover Collection</span>
        <motion.div 
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-1 h-3 rounded-full bg-zari/80" 
        />
      </div>
    </section>
  );
}

