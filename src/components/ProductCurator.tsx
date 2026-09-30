/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { curatedProducts } from "../data/editorialData";
import { BoutiqueProduct } from "../types";
import { Sparkles, ShoppingBag, Heart, ArrowRight, ShieldCheck, Check, Info, Star, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ProductDetailPage } from "./ProductDetailPage";
import { AllSareesPage } from "./AllSareesPage";

interface ProductCuratorProps {
  addToCart: (product: BoutiqueProduct) => void;
  isInCart: (id: string) => boolean;
  onEnquire: (product: BoutiqueProduct) => void;
  wishlist: BoutiqueProduct[];
  toggleWishlist: (product: BoutiqueProduct) => void;
  onOpenAllSarees?: () => void;
}

export function ProductCurator({ addToCart, isInCart, onEnquire, wishlist, toggleWishlist, onOpenAllSarees }: ProductCuratorProps) {
  const [selectedProduct, setSelectedProduct] = useState<BoutiqueProduct | null>(null);
  const [showAllSarees, setShowAllSarees] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "bestseller" | "premium">("all");

  const filteredProducts = curatedProducts.filter(p => {
    if (activeTab === "all") return true;
    if (activeTab === "bestseller") return p.isBestSeller === true;
    if (activeTab === "premium") return p.isPremium === true;
    return true;
  });

  return (
    <section 
      id="boutique-shop" 
      className="relative py-12 md:py-16 bg-kora silk-texture border-t border-b border-zari/15 z-10 px-4 sm:px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 text-left">
          <div>
            <span className="text-[11px] tracking-[0.3em] font-sans text-alta font-bold uppercase block mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-zari" />
              <span>IRAAYA CURATION // BANARASI SAREE ARCHIVE</span>
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-charcoal font-normal tracking-tight">
              Pure Benarasi Silk <span className="italic font-light text-alta">Sarees</span>
            </h2>
            <p className="text-xs text-charcoal/60 font-sans mt-2 tracking-widest uppercase">
              IRAAYA • Handwoven in Godowlia & Chowk, Banaras
            </p>
          </div>
          
          {/* Main Category Filter Tabs */}
          <div className="mt-6 md:mt-0 flex overflow-x-auto whitespace-nowrap gap-2 text-[10px] uppercase font-sans tracking-widest pb-2 scrollbar-none max-w-full">
            {[
              { id: "all", label: "All Banarasi Sarees" },
              { id: "bestseller", label: "🔥 Best Seller" },
              { id: "premium", label: "👑 Premium Collection" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 border rounded-full transition-all duration-300 flex-shrink-0 ${
                  activeTab === tab.id
                    ? "bg-alta border-alta text-kora shadow-md font-bold"
                    : "border-zari/20 text-charcoal/60 hover:border-alta hover:text-alta"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Horizontal Scroll Indicator */}
        <div className="md:hidden flex items-center justify-between text-[10px] font-sans text-alta font-bold uppercase tracking-wider mb-3 px-1">
          <span className="flex items-center gap-1.5 text-zari">
            <span>← Swipe sideways to view sarees →</span>
          </span>
          <span className="text-charcoal/50 font-mono">{Math.min(filteredProducts.length, 8)} Sarees</span>
        </div>

        {/* Product Cards Layout */}
        {/* MOBILE LAYOUT: Clean 2-column grid fitting mobile screen width (2 items per row) */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-4 md:hidden">
          {filteredProducts.slice(0, 8).map((product) => {
            const added = isInCart(product.id);
            const isFav = wishlist.some((item) => item.id === product.id);

            return (
              <div
                key={product.id}
                id={`product-card-mob-${product.id}`}
                className="bg-white rounded-xl border border-stone-200/80 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between group w-full"
              >
                {/* Visual Anchor / Image Container */}
                <div 
                  className="relative aspect-[3/4] overflow-hidden bg-stone-100 rounded-t-xl cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Absolute Badges */}
                  <div className="absolute top-1.5 left-1.5 flex flex-col gap-1 z-10">
                    {product.isBestSeller && (
                      <span className="bg-amber-900/90 text-amber-100 border border-amber-500/50 py-0.5 px-1.5 text-[8px] font-sans tracking-wider uppercase font-bold flex items-center gap-0.5 shadow-xs rounded-full">
                        🔥 Best
                      </span>
                    )}
                    {product.isPremium && (
                      <span className="bg-alta/90 text-kora border border-zari/50 py-0.5 px-1.5 text-[8px] font-sans tracking-wider uppercase font-bold flex items-center gap-0.5 shadow-xs rounded-full">
                        👑 Premium
                      </span>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <div className="absolute top-1.5 right-1.5 z-20">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product);
                      }}
                      className={`p-1.5 rounded-full border bg-white/90 backdrop-blur-xs shadow-xs transition-all ${
                        isFav ? "text-alta border-alta bg-alta/10" : "text-stone-400 border-stone-200"
                      }`}
                      title={isFav ? "Remove from wishlist" : "Save to wishlist"}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isFav ? "fill-alta text-alta" : ""}`} />
                    </button>
                  </div>

                  {/* OVERLAY BUTTONS */}
                  <div className="absolute bottom-1.5 left-0 right-0 flex items-center justify-center gap-1 px-1 z-20">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProduct(product);
                      }}
                      className="bg-white/95 backdrop-blur-xs text-charcoal font-semibold text-[10px] px-2 py-1 rounded-full shadow-xs border border-stone-200 flex items-center gap-1 cursor-pointer"
                    >
                      <Info className="w-3 h-3 text-stone-700" />
                      <span>View</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="bg-alta text-kora font-semibold text-[10px] px-2 py-1 rounded-full shadow-xs flex items-center gap-1 cursor-pointer"
                    >
                      <ShoppingBag className="w-3 h-3 text-zari" />
                      <span>{added ? "Added" : "Add"}</span>
                    </button>
                  </div>
                </div>

                {/* Metadata & Details */}
                <div 
                  className="p-2.5 text-center space-y-1 bg-white flex-1 flex flex-col justify-between cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  <div>
                    <h3 className="font-serif text-xs text-charcoal font-normal leading-snug line-clamp-2 tracking-tight">
                      {product.title}
                    </h3>
                    <p className="font-serif italic font-bold text-xs text-alta mt-1">
                      Rs. {product.price.toLocaleString("en-IN")}.00
                    </p>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* DESKTOP LAYOUT: Standard 4-column grid */}
        <div className="hidden md:grid md:grid-cols-2 xl:grid-cols-4 md:gap-6">
          {filteredProducts.slice(0, 8).map((product) => {
            const added = isInCart(product.id);
            const isFav = wishlist.some((item) => item.id === product.id);

            return (
              <div
                key={product.id}
                id={`product-card-${product.id}`}
                className="bg-white rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group w-auto"
              >
                {/* Visual Anchor / Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 rounded-t-2xl">
                  <img
                    src={product.image}
                    alt={product.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Absolute Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                    {product.isBestSeller && (
                      <span className="bg-amber-900/90 text-amber-100 border border-amber-500/50 py-0.5 px-2.5 text-[9px] font-sans tracking-wider uppercase font-bold flex items-center gap-1 shadow-md rounded-full">
                        🔥 Best Seller
                      </span>
                    )}
                    {product.isPremium && (
                      <span className="bg-alta/90 text-kora border border-zari/50 py-0.5 px-2.5 text-[9px] font-sans tracking-wider uppercase font-bold flex items-center gap-1 shadow-md rounded-full">
                        👑 Premium
                      </span>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <div className="absolute top-3 right-3 z-20">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product);
                      }}
                      className={`p-2 rounded-full border bg-white/90 backdrop-blur-xs shadow-md hover:scale-110 transition-all ${
                        isFav ? "text-alta border-alta bg-alta/10" : "text-stone-400 border-stone-200 hover:text-alta"
                      }`}
                      title={isFav ? "Remove from wishlist" : "Save to wishlist"}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isFav ? "fill-alta text-alta" : ""}`} />
                    </button>
                  </div>

                  {/* HOVER OVERLAY BUTTONS (View and Add) */}
                  <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2.5 px-3 z-20 transition-all duration-300 opacity-100 sm:opacity-0 sm:group-hover:opacity-100">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProduct(product);
                      }}
                      className="bg-white/95 backdrop-blur-xs text-charcoal font-semibold hover:bg-white text-xs px-4 py-2 rounded-full shadow-md border border-stone-200 transition-transform active:scale-95 flex items-center gap-1.5"
                    >
                      <Info className="w-3.5 h-3.5 text-stone-700" />
                      <span>View</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="bg-white/95 backdrop-blur-xs text-charcoal font-semibold hover:bg-white text-xs px-4 py-2 rounded-full shadow-md border border-stone-200 transition-transform active:scale-95 flex items-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-stone-700" />
                      <span>{added ? "Added" : "Add"}</span>
                    </button>
                  </div>
                </div>

                {/* Metadata & Details (Matching The Heritage Archives typography) */}
                <div className="p-4 text-center space-y-1.5 bg-white flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-sm sm:text-base text-charcoal font-normal leading-snug line-clamp-2 tracking-tight">
                      {product.title}
                    </h3>
                    <p className="font-serif italic font-bold text-sm sm:text-base text-alta mt-1.5">
                      Rs. {product.price.toLocaleString("en-IN")}.00
                    </p>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* View All Sarees Button */}
        <div className="mt-10 text-center">
          <button
            onClick={() => {
              if (onOpenAllSarees) {
                onOpenAllSarees();
              } else {
                setShowAllSarees(true);
              }
            }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#3D5A47] hover:bg-[#2F4738] text-white rounded-full font-sans text-xs sm:text-sm font-bold uppercase tracking-widest shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-emerald-900/40"
          >
            <span>View All Sarees</span>
            <ArrowRight className="w-4 h-4 text-amber-300" />
          </button>
        </div>

        {/* Guarantee Banner */}
        <div className="mt-10 p-5 border border-dashed border-zari bg-kora/40 rounded-xl text-left max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="space-y-1">
            <h4 className="text-xs font-sans font-bold text-alta uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Iraaya Pure Benarasi Silk & Silk Mark Guarantee</span>
            </h4>
            <p className="text-xs text-charcoal/70 font-serif max-w-2xl leading-relaxed">
              Every Banarasi saree from Iraaya is 100% pure Benarasi silk certified under Silk Mark India, handwoven by master weavers in Banaras.
            </p>
          </div>
          <button
            onClick={() => {
              const element = document.getElementById("artisanal-consultation");
              if (element) element.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-5 py-2.5 bg-zari text-alta text-[10px] font-sans uppercase font-bold tracking-widest hover:bg-alta hover:text-kora transition-all flex items-center gap-2 flex-shrink-0 rounded-full"
          >
            <span>Custom Saree Form</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Standalone Product Detail Page & All Sarees Full Catalog Page */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetailPage
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            addToCart={addToCart}
            isInCart={isInCart}
          />
        )}

        {showAllSarees && (
          <AllSareesPage
            onClose={() => setShowAllSarees(false)}
            addToCart={addToCart}
            isInCart={isInCart}
            toggleWishlist={toggleWishlist}
            wishlist={wishlist}
          />
        )}
      </AnimatePresence>

    </section>
  );
}


