/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from "react";
import { sareeVideos } from "../data/editorialData";
import { SareeVideo, BoutiqueProduct } from "../types";
import { Play, Pause, Volume2, VolumeX, Sparkles, ShoppingBag, Eye, ArrowRight, Video } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface SareeVideoShowcaseProps {
  addToCart: (product: BoutiqueProduct) => void;
  onEnquire: (product: BoutiqueProduct) => void;
}

export function SareeVideoShowcase({ addToCart, onEnquire }: SareeVideoShowcaseProps) {
  const [activeVideo, setActiveVideo] = useState<SareeVideo | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleOpenModal = (video: SareeVideo) => {
    setActiveVideo(video);
    setIsPlaying(true);
    setIsMuted(true);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section 
      id="saree-video-showcase" 
      className="relative py-12 md:py-16 bg-kora silk-texture border-t border-b border-zari/15 z-10 px-4 sm:px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto text-left">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-[11px] tracking-[0.3em] font-sans text-alta font-bold uppercase block mb-2 flex items-center gap-1.5">
              <Video className="w-4 h-4 text-zari" />
              <span>LIVE LOOM & DRAPE REELS // WEAVE IN MOTION</span>
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-charcoal font-normal tracking-tight">
              Banarasi <span className="italic font-light text-alta">Sarees in Motion</span>
            </h2>
            <p className="text-xs text-charcoal/60 font-sans mt-2 tracking-widest uppercase">
              Experience the sheen of pure silk, zari reflections & handwoven fluidity
            </p>
          </div>
          <div className="mt-4 md:mt-0 text-right">
            <span className="text-xs font-mono text-alta border border-zari/40 bg-white/70 px-3 py-1.5 rounded-full inline-block font-semibold">
              {sareeVideos.length} Artisanal Video Demos Available
            </span>
          </div>
        </div>

        {/* Video Cards Container */}
        {/* MOBILE LAYOUT: Rows of 4 video reels side-by-side (horizontally scrollable), stacked vertically */}
        <div className="md:hidden space-y-6">
          {Array.from({ length: Math.ceil(sareeVideos.length / 4) }, (_, rowIndex) => {
            const rowVideos = sareeVideos.slice(rowIndex * 4, rowIndex * 4 + 4);
            return (
              <div key={rowIndex} className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-sans text-alta font-bold uppercase tracking-wider px-1">
                  <span>Reels Row {rowIndex + 1} ({rowVideos.length} Reels)</span>
                  <span className="text-charcoal/50 font-mono">Swipe ← →</span>
                </div>

                <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-3 -mx-4 px-4 scrollbar-none">
                  {rowVideos.map((vid) => (
                    <div 
                      key={vid.id}
                      className="w-[70vw] sm:w-[240px] flex-shrink-0 snap-start bg-[#2A3435] border border-zari/20 rounded-sm overflow-hidden flex flex-col justify-between group hover:border-zari transition-all duration-300 shadow-lg"
                    >
                      {/* Thumbnail Container */}
                      <div 
                        className="relative aspect-[9/16] bg-black/40 overflow-hidden cursor-pointer"
                        onClick={() => handleOpenModal(vid)}
                      >
                        <img 
                          src={vid.thumbnail} 
                          alt={vid.title} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                        {/* Duration Badge */}
                        <span className="absolute top-3 right-3 bg-black/70 text-zari text-[10px] font-mono px-2 py-0.5 border border-zari/30 rounded-xs">
                          {vid.duration}
                        </span>

                        {/* Saree Type Badge */}
                        <span className="absolute top-3 left-3 bg-alta/90 text-kora text-[9px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 border border-zari/30">
                          {vid.sareeType}
                        </span>

                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-alta/80 text-kora border border-zari flex items-center justify-center group-hover:scale-110 group-hover:bg-zari group-hover:text-alta transition-all shadow-xl">
                            <Play className="w-5 h-5 ml-0.5 fill-current" />
                          </div>
                        </div>

                        {/* Bottom Overlay Info */}
                        <div className="absolute bottom-3 left-3 right-3 text-left">
                          <h3 className="font-serif text-xs sm:text-sm text-[#FDFBF7] font-normal leading-snug line-clamp-1 tracking-tight">
                            {vid.title}
                          </h3>
                          <p className="font-serif italic font-bold text-xs sm:text-sm text-zari mt-0.5">
                            Rs. {vid.price.toLocaleString("en-IN")}.00
                          </p>
                        </div>
                      </div>

                      {/* Card Footer Actions */}
                      <div className="p-2.5 bg-[#232C2D] border-t border-zari/15 flex items-center justify-between gap-2">
                        <button
                          onClick={() => handleOpenModal(vid)}
                          className="flex-1 py-1 text-[10px] font-sans font-bold uppercase tracking-wider border border-zari/30 text-zari hover:bg-zari hover:text-alta transition-all flex items-center justify-center gap-1"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Watch</span>
                        </button>
                        <button
                          onClick={() => {
                            const sampleProduct: BoutiqueProduct = {
                              id: vid.id,
                              title: vid.title,
                              category: "Sarees",
                              subCategory: vid.sareeType,
                              price: vid.price,
                              image: vid.thumbnail,
                              secondaryImage: vid.thumbnail,
                              description: vid.description,
                              threadCount: "Pure Banarasi Silk",
                              artisanName: "Master Loom Weaver, Banaras",
                              motifsUsed: ["Jaal", "Zari Brocade"],
                              isBestSeller: true,
                              isPremium: true
                            };
                            addToCart(sampleProduct);
                          }}
                          className="py-1 px-2.5 text-[10px] font-sans font-bold uppercase tracking-wider bg-alta text-kora border border-zari/50 hover:bg-alta/90 transition-all flex items-center justify-center gap-1"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Bag</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* DESKTOP LAYOUT: Standard 4-column grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sareeVideos.map((vid) => (
            <div 
              key={vid.id}
              className="bg-[#2A3435] border border-zari/20 rounded-sm overflow-hidden flex flex-col justify-between group hover:border-zari transition-all duration-300 shadow-lg"
            >
              {/* Thumbnail Container */}
              <div 
                className="relative aspect-[9/16] bg-black/40 overflow-hidden cursor-pointer"
                onClick={() => handleOpenModal(vid)}
              >
                <img 
                  src={vid.thumbnail} 
                  alt={vid.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                {/* Duration Badge */}
                <span className="absolute top-3 right-3 bg-black/70 text-zari text-[10px] font-mono px-2 py-0.5 border border-zari/30 rounded-xs">
                  {vid.duration}
                </span>

                {/* Saree Type Badge */}
                <span className="absolute top-3 left-3 bg-alta/90 text-kora text-[9px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 border border-zari/30">
                  {vid.sareeType}
                </span>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-alta/80 text-kora border border-zari flex items-center justify-center group-hover:scale-110 group-hover:bg-zari group-hover:text-alta transition-all shadow-xl">
                    <Play className="w-5 h-5 ml-0.5 fill-current" />
                  </div>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <h3 className="font-serif text-sm sm:text-base text-[#FDFBF7] font-normal leading-snug line-clamp-1 tracking-tight">
                    {vid.title}
                  </h3>
                  <p className="font-serif italic font-bold text-sm sm:text-base text-zari mt-0.5">
                    Rs. {vid.price.toLocaleString("en-IN")}.00
                  </p>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-3 bg-[#232C2D] border-t border-zari/15 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleOpenModal(vid)}
                  className="flex-1 py-1.5 text-[10px] font-sans font-bold uppercase tracking-wider border border-zari/30 text-zari hover:bg-zari hover:text-alta transition-all flex items-center justify-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Watch Reel</span>
                </button>
                <button
                  onClick={() => {
                    const sampleProduct: BoutiqueProduct = {
                      id: vid.id,
                      title: vid.title,
                      category: "Sarees",
                      subCategory: vid.sareeType,
                      price: vid.price,
                      image: vid.thumbnail,
                      secondaryImage: vid.thumbnail,
                      description: vid.description,
                      threadCount: "Pure Banarasi Silk",
                      artisanName: "Master Loom Weaver, Banaras",
                      motifsUsed: ["Jaal", "Zari Brocade"],
                      isBestSeller: true,
                      isPremium: true
                    };
                    addToCart(sampleProduct);
                  }}
                  className="py-1.5 px-3 text-[10px] font-sans font-bold uppercase tracking-wider bg-alta text-kora border border-zari/50 hover:bg-alta/90 transition-all flex items-center justify-center gap-1"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Bag</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Video Reel Modal */}
        <AnimatePresence>
          {activeVideo && (
            <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-md"
                onClick={() => setActiveVideo(null)}
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-[#2A3435] max-w-2xl w-full border border-zari/40 relative z-10 shadow-2xl overflow-hidden flex flex-col md:flex-row text-left"
              >
                {/* Left: Video Player */}
                <div className="md:w-1/2 relative bg-black aspect-[9/16] max-h-[75vh] flex items-center justify-center overflow-hidden">
                  <video 
                    ref={videoRef}
                    src={activeVideo.videoUrl}
                    poster={activeVideo.thumbnail}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    className="w-full h-full object-cover"
                  />

                  {/* Player Controls */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center z-20">
                    <button 
                      onClick={togglePlay}
                      className="p-2 rounded-full bg-black/60 text-zari border border-zari/30 hover:bg-zari hover:text-alta transition-all"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <button 
                      onClick={toggleMute}
                      className="p-2 rounded-full bg-black/60 text-zari border border-zari/30 hover:bg-zari hover:text-alta transition-all"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Right: Details & Actions */}
                <div className="md:w-1/2 p-6 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[10px] font-sans font-bold uppercase text-zari tracking-widest block mb-1">
                      {activeVideo.sareeType}
                    </span>
                    <h3 className="font-serif text-2xl text-[#FDFBF7] leading-tight">
                      {activeVideo.title}
                    </h3>
                    <p className="text-lg font-mono font-bold text-zari mt-2">
                      ₹{activeVideo.price.toLocaleString("en-IN")}
                    </p>
                    <p className="text-xs text-[#FDFBF7]/80 font-serif italic mt-3 leading-relaxed border-t border-zari/15 pt-3">
                      "{activeVideo.description}"
                    </p>

                    <div className="mt-4 p-3 bg-black/20 border border-zari/20 text-xs font-sans text-[#FDFBF7]/80 space-y-1">
                      <p className="flex justify-between">
                        <span className="text-[#FDFBF7]/50">Certification:</span>
                        <span className="text-emerald-400 font-bold">100% Pure Silk Mark</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-[#FDFBF7]/50">Handloom Loom:</span>
                        <span>Godowlia Crossing, Banaras</span>
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-zari/20">
                    <button
                      onClick={() => {
                        const sampleProduct: BoutiqueProduct = {
                          id: activeVideo.id,
                          title: activeVideo.title,
                          category: "Sarees",
                          subCategory: activeVideo.sareeType,
                          price: activeVideo.price,
                          image: activeVideo.thumbnail,
                          secondaryImage: activeVideo.thumbnail,
                          description: activeVideo.description,
                          threadCount: "Pure Banarasi Silk",
                          artisanName: "Master Loom Weaver, Banaras",
                          motifsUsed: ["Jaal", "Zari Brocade"],
                          isBestSeller: true,
                          isPremium: true
                        };
                        addToCart(sampleProduct);
                        setActiveVideo(null);
                      }}
                      className="w-full py-3 bg-alta text-kora border border-zari text-xs font-sans font-bold uppercase tracking-widest hover:bg-alta/90 transition-all flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add Saree to Bag</span>
                    </button>

                    <button
                      onClick={() => setActiveVideo(null)}
                      className="w-full py-2 bg-transparent text-[#FDFBF7]/70 border border-zari/20 text-xs font-sans uppercase tracking-widest hover:text-[#FDFBF7]"
                    >
                      Close Reel
                    </button>
                  </div>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
