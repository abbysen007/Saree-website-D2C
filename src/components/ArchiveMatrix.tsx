/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { textileDisciplines } from "../data/editorialData";
import { TextileDiscipline } from "../types";
import { Sparkles, Calendar, Award, MapPin, Layers, X, BookOpen } from "lucide-react";

export function ArchiveMatrix() {
  const [selectedDiscipline, setSelectedDiscipline] = useState<TextileDiscipline | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section 
      id="archive-matrix" 
      className="relative py-10 md:py-14 bg-kora silk-texture border-t border-zari/15 z-10 px-4 sm:px-6 md:px-12"
    >
      {/* Decorative vertical lines representing weft threads */}
      <div className="absolute left-[8%] top-0 bottom-0 w-[0.5px] bg-zari/10 z-0 pointer-events-none" />
      <div className="absolute right-[8%] top-0 bottom-0 w-[0.5px] bg-zari/10 z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 text-left">
          <div>
            <span className="text-[11px] tracking-[0.3em] font-sans text-alta font-bold uppercase block mb-2">
              SECTION 02 // THE CHRONICLES
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-charcoal font-normal tracking-tight">
              The Heritage <span className="italic font-light text-alta">Archives</span>
            </h2>
            <p className="text-xs text-charcoal/50 font-sans mt-2 tracking-widest uppercase">
              A curated chronicle of Banaras’ finest Benarasi silk weaves
            </p>
          </div>
          <div className="mt-4 md:mt-0 max-w-sm">
            <p className="text-sm font-serif italic text-charcoal/60 leading-relaxed">
              "Weavers represent physical databases of ancestral math. Every pattern is an ancient blueprint preserved in muscle memory and transmitted across centuries."
            </p>
          </div>
        </div>

        {/* Mobile Horizontal Scroll Indicator */}
        <div className="md:hidden flex items-center justify-between text-[10px] font-sans text-alta font-bold uppercase tracking-wider mb-3 px-1">
          <span className="flex items-center gap-1.5 text-zari">
            <span>← Swipe sideways to explore heritage looms →</span>
          </span>
          <span className="text-charcoal/50 font-mono">{textileDisciplines.length} Looms</span>
        </div>

        {/* MOBILE LAYOUT: Single horizontal scrollable row with all items */}
        <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 scrollbar-none">
          {textileDisciplines.map((discipline) => (
            <motion.div
              key={discipline.id}
              id={`archive-card-mob-${discipline.id}`}
              className="relative bg-[#F5F2ED] border border-zari/20 shadow-xs group overflow-hidden rounded-xl transition-all duration-300 w-[74vw] sm:w-[260px] flex-shrink-0 snap-start"
              onClick={() => setSelectedDiscipline(discipline)}
            >
              {/* Decorative Zari Grid corners */}
              <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-zari/40 z-20 pointer-events-none" />
              <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-zari/40 z-20 pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-zari/40 z-20 pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-zari/40 z-20 pointer-events-none" />

              <div className="relative aspect-[4/3] overflow-hidden bg-alta/5 rounded-t-xl">
                <img
                  src={discipline.mainImage}
                  alt={discipline.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ease-out"
                />

                {discipline.subTagline && (
                  <div className="absolute top-2.5 left-2.5 z-20 bg-kora/90 backdrop-blur-xs border border-zari/30 py-0.5 px-2 rounded-full">
                    <span className="font-serif italic text-[10px] font-semibold text-alta tracking-wider">
                      {discipline.subTagline}
                    </span>
                  </div>
                )}

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3 z-20 text-left">
                  <span className="text-[8.5px] tracking-widest text-amber-200 font-sans uppercase font-bold block">
                    {discipline.subtitle}
                  </span>
                  <h3 className="text-sm font-serif text-white font-medium leading-snug">
                    {discipline.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* DESKTOP LAYOUT: Standard 3-column grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {textileDisciplines.map((discipline) => {
            return (
              <motion.div
                key={discipline.id}
                id={`archive-card-${discipline.id}`}
                className="relative bg-[#F5F2ED] border border-zari/20 shadow-sm group overflow-hidden rounded-xl transition-all duration-300 w-auto"
                onClick={() => setSelectedDiscipline(discipline)}
                layoutId={`discipline-card-container-${discipline.id}`}
              >
                {/* Decorative Zari Grid corners */}
                <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-zari/40 z-20 pointer-events-none" />
                <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-zari/40 z-20 pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-zari/40 z-20 pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-zari/40 z-20 pointer-events-none" />

                {/* Reduced Aspect Ratio Compact Image Container (aspect-[4/3]) */}
                <div className="relative aspect-[4/3] overflow-hidden bg-alta/5 rounded-t-xl">
                  <img
                    src={discipline.mainImage}
                    alt={discipline.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ease-out"
                  />

                  {/* Absolute Tag: Subtagline */}
                  {discipline.subTagline && (
                    <div className="absolute top-3 left-3 z-20 bg-kora/90 backdrop-blur-xs border border-zari/30 py-1 px-2.5 rounded-full">
                      <span className="font-serif italic text-[11px] font-semibold text-alta tracking-wider">
                        {discipline.subTagline}
                      </span>
                    </div>
                  )}

                  {/* Card Title Overlay */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 z-20 text-left">
                    <span className="text-[9px] tracking-widest text-amber-200 font-sans uppercase font-bold block">
                      {discipline.subtitle}
                    </span>
                    <h3 className="text-base sm:text-lg font-serif text-white font-medium leading-snug">
                      {discipline.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Living Loom Footnote */}
        <div className="mt-20 text-center px-4">
          <div className="inline-block bg-[#FAF6EE] border border-amber-800/30 px-6 py-3.5 rounded-full shadow-sm">
            <p className="text-xs sm:text-sm tracking-[0.18em] font-sans uppercase font-semibold text-amber-950">
              * ALL PIECES ARE CERTIFIED UNDER THE BENARASI SILK MARK OF INDIA • AUTHENTICITY GUARANTEED
            </p>
          </div>
        </div>

      </div>

      {/* Narrative Story Modal (Expanded Overlay) */}
      <AnimatePresence>
        {selectedDiscipline && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            {/* Dark blur backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDiscipline(null)}
              className="fixed inset-0 bg-alta/40 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="bg-kora max-w-4xl w-full silk-texture shadow-2xl relative z-10 overflow-hidden border border-zari/30 max-h-[90vh] flex flex-col md:flex-row text-left"
              layoutId={`discipline-card-container-${selectedDiscipline.id}`}
            >
              {/* Gold frame */}
              <div className="absolute inset-3 border border-zari/15 pointer-events-none" />

              {/* Left Column: Visual & Weaver Profile */}
              <div className="w-full md:w-5/12 h-64 sm:h-80 md:h-auto relative bg-alta/5 flex flex-col justify-between flex-shrink-0">
                <div className="absolute inset-0 z-0">
                  <img
                    src={selectedDiscipline.mainImage}
                    alt={selectedDiscipline.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-alta via-alta/30 to-transparent" />
                </div>

                <button 
                  onClick={() => setSelectedDiscipline(null)}
                  className="absolute top-5 left-5 p-2 bg-kora text-alta border border-zari/30 rounded-full hover:bg-alta hover:text-kora transition-colors z-20 md:hidden"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Weaver Showcase overlay on bottom of column */}
                <div className="relative mt-auto p-6 z-10 text-kora">
                  <span className="text-[9px] text-zari font-sans tracking-widest uppercase font-bold flex items-center gap-1 mb-1">
                    <Award className="w-3.5 h-3.5 text-zari" />
                    <span>Loom-Master Identity</span>
                  </span>
                  <div className="flex gap-3 items-center mt-2">
                    <img
                      src={selectedDiscipline.weaver.photo}
                      alt={selectedDiscipline.weaver.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 object-cover rounded-full border border-zari/40 shadow-inner"
                    />
                    <div>
                      <h4 className="font-serif text-sm font-medium text-zari leading-tight">{selectedDiscipline.weaver.name}</h4>
                      <p className="text-[10px] text-kora/60 font-sans flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-zari/70" />
                        <span>{selectedDiscipline.weaver.region}</span>
                      </p>
                    </div>
                  </div>
                  <p className="text-[11px] text-kora/70 italic mt-3 font-light leading-relaxed">
                    "{selectedDiscipline.weaver.bio}"
                  </p>
                  <div className="flex gap-4 border-t border-zari/20 pt-2.5 mt-2.5 text-[10px] font-sans">
                    <div>
                      <span className="text-zari font-mono font-semibold">{selectedDiscipline.weaver.experienceYears} Years</span>
                      <p className="text-kora/50 text-[9px] uppercase">Experience</p>
                    </div>
                    <div>
                      <span className="text-zari font-mono font-semibold">{selectedDiscipline.weaver.generations}th Gen</span>
                      <p className="text-kora/50 text-[9px] uppercase">Loom Dynasty</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Historical Prose & Heritage Metadata */}
              <div className="w-full md:w-7/12 p-6 md:p-10 overflow-y-auto max-h-[50vh] md:max-h-none flex flex-col justify-between z-10 flex-grow">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] tracking-[0.25em] font-sans text-alta font-bold uppercase">
                        THE LIVING CHRONICLE
                      </p>
                      <h3 className="text-2xl md:text-3xl font-serif text-charcoal font-normal mt-1 leading-tight">
                        {selectedDiscipline.title}
                      </h3>
                    </div>
                    <button 
                      onClick={() => setSelectedDiscipline(null)}
                      className="p-2 border border-zari/20 rounded-full hover:border-alta text-charcoal hover:text-alta transition-colors hidden md:block"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Poetic story */}
                  <div className="space-y-4 text-sm text-charcoal/80 leading-relaxed font-serif">
                    <p className="italic border-l border-zari/40 pl-4 text-charcoal/70">
                      "{selectedDiscipline.craftStory}"
                    </p>
                    
                    <div className="space-y-2">
                      <h5 className="font-sans text-[11px] tracking-widest text-alta font-semibold uppercase">
                        HISTORICAL SIGNIFICANCE
                      </h5>
                      <p className="font-sans text-xs font-light text-charcoal/70">
                        {selectedDiscipline.historicalContext}
                      </p>
                    </div>
                  </div>

                  {/* Specifications and Motifs */}
                  <div className="border-t border-b border-zari/15 py-4">
                    <div>
                      <span className="text-[9px] text-zari font-sans tracking-widest uppercase block mb-1">
                        Weft Thread Density
                      </span>
                      <span className="font-serif italic text-sm text-alta font-medium">
                        {selectedDiscipline.threadCount} Count Pure Banarasi Silk
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[9px] text-zari font-sans tracking-widest uppercase block mb-2 font-bold">
                      AUTHENTIC BLUEPRINT MOTIFS
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {selectedDiscipline.motifs.map((motif, mIdx) => (
                        <div key={mIdx} className="flex items-center gap-2 bg-kora p-2 border border-zari/10 rounded-sm">
                          <Sparkles className="w-3 h-3 text-zari" />
                          <span className="font-sans text-charcoal/80">{motif}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-8 flex justify-end gap-3">
                  <button
                    onClick={() => setSelectedDiscipline(null)}
                    className="px-6 py-2.5 border border-zari/40 text-charcoal text-[11px] uppercase tracking-widest hover:border-alta transition-colors font-sans"
                  >
                    Close Chronicle
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
