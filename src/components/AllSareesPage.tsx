/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from "react";
import { BoutiqueProduct } from "../types";
import { curatedProducts } from "../data/editorialData";
import { 
  X, ChevronLeft, SlidersHorizontal, Heart, ShoppingBag, 
  Info, Star, Check, Sparkles, MessageCircle, ArrowLeft, Search, Filter, Menu, User
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ProductDetailPage } from "./ProductDetailPage";

interface AllSareesPageProps {
  onClose: () => void;
  addToCart: (product: BoutiqueProduct) => void;
  isInCart: (id: string) => boolean;
  toggleWishlist: (product: BoutiqueProduct) => void;
  wishlist: BoutiqueProduct[];
  initialSearchQuery?: string;
}

const allSareesList: BoutiqueProduct[] = curatedProducts;

export function AllSareesPage({
  onClose,
  addToCart,
  isInCart,
  toggleWishlist,
  wishlist,
  initialSearchQuery = "",
}: AllSareesPageProps) {
  const [selectedProduct, setSelectedProduct] = useState<BoutiqueProduct | null>(null);
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);

  useEffect(() => {
    if (initialSearchQuery !== undefined) {
      setSearchQuery(initialSearchQuery);
    }
  }, [initialSearchQuery]);

  // Filter logic
  const filteredSarees = useMemo(() => {
    let list = [...allSareesList];

    if (selectedCategory !== "All") {
      list = list.filter((item) => 
        item.subCategory?.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        item.title.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        item.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((item) => 
        item.title.toLowerCase().includes(q) || 
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.subCategory && item.subCategory.toLowerCase().includes(q)) ||
        (item.threadCount && item.threadCount.toLowerCase().includes(q)) ||
        (item.artisanName && item.artisanName.toLowerCase().includes(q)) ||
        item.motifsUsed?.some((m) => m.toLowerCase().includes(q)) ||
        item.specs?.some((s) => s.toLowerCase().includes(q))
      );
    }

    if (sortBy === "low-to-high") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "high-to-low") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "bestseller") {
      list.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    }

    return list;
  }, [selectedCategory, sortBy, searchQuery]);

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto bg-[#F7F5EE] text-charcoal font-sans flex flex-col">
      
      {/* 1. TOP HERO BANNER WITH OUR BRAND HEADER & REQUESTED BG IMAGE */}
      <div className="relative w-full text-white pt-8 sm:pt-10 md:pt-14 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-8 md:px-12 overflow-hidden shadow-2xl bg-[#0D0907] min-h-[380px] sm:min-h-[440px] md:min-h-[480px] flex flex-col justify-between">
        
        {/* Background Image requested by user */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-80 scale-105 transition-transform duration-1000 pointer-events-none"
          style={{ backgroundImage: `url('https://i.pinimg.com/736x/8c/4e/29/8c4e299eb0e6a5f6044a414421ebcbe2.jpg')` }}
        />
        {/* Dark Vignette Overlay for Crisp Legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/50 to-[#0D0907] pointer-events-none" />

        {/* Top Header with Iraaya Branding */}
        <div className="relative z-20 max-w-7xl mx-auto w-full text-center pb-5 border-b border-white/20">
          <h1 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold tracking-[0.25em] text-[#F3E5C8] drop-shadow-2xl">
            IRAAYA
          </h1>
          <span className="text-[11px] sm:text-xs font-sans text-[#E5D7B5]/90 tracking-[0.35em] uppercase block mt-1.5 font-semibold">
            BANARAS • PURE BENARASI SILK
          </span>
        </div>

        {/* Hero Title & Breadcrumb (Centered layout) */}
        <div className="relative z-10 max-w-7xl mx-auto w-full text-center pt-6 sm:pt-8 pb-4">
          
          {/* Breadcrumbs */}
          <div className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-black/50 border border-white/25 backdrop-blur-md text-xs sm:text-sm text-[#E5D7B5] font-sans mb-5 shadow-lg">
            <button onClick={onClose} className="hover:text-white transition-colors flex items-center gap-1.5 font-medium cursor-pointer">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>
            <span className="text-white/40">/</span>
            <span className="cursor-pointer hover:text-white font-medium">All Sarees Collection</span>
          </div>

          {/* Large Serif Heading */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#F3E5C8] font-normal tracking-wide drop-shadow-2xl">
            New Arrivals
          </h2>
          <p className="text-sm sm:text-base md:text-lg font-serif italic text-white/95 max-w-3xl mx-auto mt-3 leading-relaxed drop-shadow-md">
            Handwoven Certified Pure Banarasi Silk, Katan, Mashru & Satin Sarees
          </p>
        </div>
      </div>


      {/* 2. FILTER & SORTING BAR CONTAINER (Image 1 & 2 style) */}
      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 py-6">
        
        <div className="bg-[#FAF8F3] border border-stone-200/80 rounded-2xl p-3 md:p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Filter Drawer Toggle & Options */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              onClick={() => setShowFilterDrawer(!showFilterDrawer)}
              className="px-5 py-2.5 rounded-full border border-stone-400/80 bg-white hover:border-emerald-800 text-charcoal font-sans text-xs font-semibold flex items-center gap-2 shadow-xs transition-all active:scale-95 flex-shrink-0"
            >
              <SlidersHorizontal className="w-4 h-4 text-emerald-800" />
              <span>{showFilterDrawer ? "Hide filters" : "Show filters"}</span>
            </button>

            {/* Quick Search Input */}
            <div className="relative flex-1 sm:w-64">
              <input
                type="text"
                placeholder="Search sarees..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white border border-stone-300 rounded-full text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700/50"
              />
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-black text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end text-xs font-sans">
            <span className="text-stone-500 font-medium whitespace-nowrap">Sort by:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-stone-400/80 rounded-full px-4 py-2 pr-8 text-xs font-semibold text-charcoal cursor-pointer shadow-xs focus:outline-none focus:ring-2 focus:ring-emerald-700/50"
              >
                <option value="featured">Featured •</option>
                <option value="bestseller">Best Selling</option>
                <option value="low-to-high">Price: Low to High</option>
                <option value="high-to-low">Price: High to Low</option>
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 text-xs">
                ▼
              </span>
            </div>
          </div>

        </div>

        {/* Collapsible Filter Categories Bar */}
        <AnimatePresence>
          {showFilterDrawer && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mt-3"
            >
              <div className="p-4 bg-white border border-stone-200 rounded-2xl shadow-sm flex flex-wrap items-center gap-2 text-xs font-sans">
                <span className="text-stone-400 font-bold uppercase tracking-wider text-[10px] mr-2">
                  Fabrics:
                </span>
                {["All", "Pure Banarasi", "Mashru Silk", "Satin Silk", "Katan", "Georgette"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs transition-all font-medium ${
                      selectedCategory === cat
                        ? "bg-emerald-800 text-white font-bold shadow-xs"
                        : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>


      {/* 3. MAIN PRODUCT GRID */}
      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 pb-16 flex-1">
        
        {filteredSarees.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 p-8 my-6">
            <p className="text-base font-serif text-stone-600 mb-2">No sarees match your criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-3 px-5 py-2 bg-emerald-800 text-white rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            {/* MOBILE LAYOUT: Clean 2-column grid fitting mobile screen width (2 items per row) */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-4 md:hidden my-4">
              {filteredSarees.map((product) => {
                const added = isInCart(product.id);
                const isFav = wishlist.some((item) => item.id === product.id);

                return (
                  <div
                    key={product.id}
                    className="w-full bg-white rounded-xl border border-stone-200/90 overflow-hidden shadow-xs flex flex-col justify-between group relative"
                  >
                    {/* Card Top Image Container */}
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

                      {/* Wishlist Heart Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(product);
                        }}
                        className={`absolute top-2 right-2 p-1.5 rounded-full border bg-white/90 backdrop-blur-xs shadow-xs transition-transform active:scale-90 z-10 ${
                          isFav ? "text-alta border-alta bg-alta/10" : "text-stone-400 border-stone-200"
                        }`}
                        title={isFav ? "Remove from wishlist" : "Add to wishlist"}
                      >
                        <Heart className={`w-3.5 h-3.5 ${isFav ? "fill-alta text-alta" : ""}`} />
                      </button>

                      {/* Image Overlay "Add to cart" Button */}
                      <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center px-2 z-10 transition-all duration-300">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product);
                          }}
                          className={`w-auto px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-md backdrop-blur-xs transition-all active:scale-95 flex items-center gap-1 ${
                            added 
                              ? "bg-stone-900 text-white border border-stone-700" 
                              : "bg-[#3D5A47] text-white border border-[#2F4738]"
                          }`}
                        >
                          {added ? (
                            <>
                              <Check className="w-3 h-3 text-amber-300" />
                              <span>Added</span>
                            </>
                          ) : (
                            <span>Add</span>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Card Bottom Meta */}
                    <div 
                      className="p-2.5 text-left bg-white flex-1 flex flex-col justify-between cursor-pointer"
                      onClick={() => setSelectedProduct(product)}
                    >
                      <div>
                        <h3 className="font-serif text-xs text-charcoal font-medium leading-snug line-clamp-2 tracking-tight hover:text-emerald-800 transition-colors">
                          {product.title}
                        </h3>
                      </div>

                      <div className="pt-1.5 border-t border-stone-100 mt-1.5">
                        <p className="font-serif italic font-bold text-xs text-alta">
                          Rs. {product.price.toLocaleString("en-IN")}.00
                        </p>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* DESKTOP LAYOUT: Standard 4-column responsive grid */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {filteredSarees.map((product) => {
                const added = isInCart(product.id);
                const isFav = wishlist.some((item) => item.id === product.id);

                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative"
                  >
                    {/* Card Top Image Container */}
                    <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
                      <img
                        src={product.image}
                        alt={product.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />

                      {/* Wishlist Heart Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(product);
                        }}
                        className={`absolute top-3 right-3 p-2 rounded-full border bg-white/90 backdrop-blur-xs shadow-md transition-transform active:scale-90 z-10 ${
                          isFav ? "text-alta border-alta bg-alta/10" : "text-stone-400 border-stone-200 hover:text-alta"
                        }`}
                        title={isFav ? "Remove from wishlist" : "Add to wishlist"}
                      >
                        <Heart className={`w-4 h-4 ${isFav ? "fill-alta" : ""}`} />
                      </button>

                      {/* Image Overlay "Add to cart" Button */}
                      <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center px-4 z-10 transition-all duration-300">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product);
                          }}
                          className={`w-auto px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg backdrop-blur-xs transition-all active:scale-95 flex items-center gap-2 ${
                            added 
                              ? "bg-stone-900 text-white border border-stone-700" 
                              : "bg-[#3D5A47] hover:bg-[#2F4738] text-white border border-[#2F4738]"
                          }`}
                        >
                          {added ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-amber-300" />
                              <span>Added to cart</span>
                            </>
                          ) : (
                            <span>Add to cart</span>
                          )}
                        </button>
                      </div>

                      {/* View Specs Trigger overlay on image click */}
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="absolute inset-0 w-full h-full cursor-pointer opacity-0 z-0"
                        aria-label="View Product Details"
                      />
                    </div>

                    {/* Card Bottom Meta */}
                    <div className="p-4 text-left bg-white flex-1 flex flex-col justify-between">
                      <div>
                        <h3 
                          onClick={() => setSelectedProduct(product)}
                          className="font-serif text-sm sm:text-base text-charcoal font-normal leading-snug line-clamp-2 tracking-tight hover:text-emerald-800 cursor-pointer transition-colors"
                        >
                          {product.title}
                        </h3>
                      </div>

                      <div className="pt-2 border-t border-stone-100 mt-2">
                        <p className="font-serif italic font-bold text-sm sm:text-base text-alta">
                          Rs. {product.price.toLocaleString("en-IN")}.00
                        </p>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </>
        )}

      </div>


      {/* Floating WhatsApp Quick Concierge Button */}
      <a
        href="https://wa.me/919800000000?text=Hello%20Iraaya,%20I%20am%20viewing%20the%20All%20Sarees%20Collection."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed left-5 bottom-6 z-40 p-3.5 bg-emerald-600 text-white rounded-full shadow-2xl hover:bg-emerald-700 hover:scale-110 transition-all flex items-center justify-center border border-white/40"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-white text-emerald-600" />
      </a>

      {/* Floating Back to Home Button */}
      <button
        onClick={onClose}
        className="fixed right-5 bottom-6 z-40 px-5 py-3 bg-[#0D0907]/90 text-[#F3E5C8] border border-[#F3E5C8]/40 backdrop-blur-md rounded-full shadow-2xl hover:bg-black hover:scale-105 active:scale-95 transition-all flex items-center gap-2 text-xs sm:text-sm font-sans font-bold uppercase tracking-wider cursor-pointer"
        title="Return to Main Homepage"
      >
        <ArrowLeft className="w-4 h-4 text-amber-300" />
        <span>Back to Home</span>
      </button>


      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetailPage
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            addToCart={addToCart}
            isInCart={isInCart}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
