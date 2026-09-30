/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from "react";
import { 
  ShoppingBag, Menu, X, ArrowRight, Sparkles, Heart, User, ShieldCheck, 
  Truck, Scissors, Video, Clock, Globe, HelpCircle, Home, LayoutGrid, Search 
} from "lucide-react";
import { BoutiqueProduct, UserProfile } from "../types";
import { curatedProducts } from "../data/editorialData";
import { AvhoronLogo } from "./AvhoronLogo";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  cart: BoutiqueProduct[];
  wishlist: BoutiqueProduct[];
  userProfile: UserProfile | null;
  isLoggedIn?: boolean;
  removeFromCart: (id: string) => void;
  addToCart?: (product: BoutiqueProduct) => void;
  isInCart?: (id: string) => boolean;
  toggleWishlist?: (product: BoutiqueProduct) => void;
  onNavigate: (sectionId: string) => void;
  onOpenConsultation: () => void;
  onOpenProfile: () => void;
  onOpenCheckout: () => void;
  onOpenAuth?: () => void;
  onOpenWishlist?: () => void;
  onLogout?: () => void;
  onOpenReadyToShip?: () => void;
  onOpenCustomTailoring?: () => void;
  onOpenTrackOrder?: () => void;
  onOpenVirtualVideo?: () => void;
  onOpenSilkCare?: () => void;
  onOpenRealBrides?: () => void;
  onOpenStorePolicies?: () => void;
  onOpenAllSarees?: (query?: string) => void;
  onSelectProduct?: (product: BoutiqueProduct) => void;
}

export function Navbar({
  cart,
  wishlist,
  userProfile,
  isLoggedIn = false,
  removeFromCart,
  addToCart,
  isInCart,
  toggleWishlist,
  onNavigate,
  onOpenConsultation,
  onOpenProfile,
  onOpenCheckout,
  onOpenAuth,
  onOpenWishlist,
  onLogout,
  onOpenReadyToShip,
  onOpenCustomTailoring,
  onOpenTrackOrder,
  onOpenVirtualVideo,
  onOpenSilkCare,
  onOpenRealBrides,
  onOpenStorePolicies,
  onOpenAllSarees,
  onSelectProduct
}: NavbarProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilterTag, setActiveFilterTag] = useState("All");
  const [searchSortBy, setSearchSortBy] = useState<"featured" | "price-low" | "price-high">("featured");
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Global Keyboard Shortcut for Search (Cmd+K, Ctrl+K, or /)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      } else if (e.key === "/" && !["INPUT", "TEXTAREA", "SELECT"].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        setIsSearchOpen(true);
      } else if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen]);

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price, 0);
  };

  const handleScrollTo = (id: string) => {
    onNavigate(id);
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const filteredSearchProducts = useMemo(() => {
    let list = [...curatedProducts];

    // Filter by tag if selected
    if (activeFilterTag !== "All") {
      if (activeFilterTag === "Under ₹20,000") {
        list = list.filter((p) => p.price <= 20000);
      } else if (activeFilterTag === "Under ₹30,000") {
        list = list.filter((p) => p.price <= 30000);
      } else if (activeFilterTag === "Best Sellers") {
        list = list.filter((p) => p.isBestSeller);
      } else if (activeFilterTag === "Heirloom Premium") {
        list = list.filter((p) => p.isPremium);
      } else {
        const tag = activeFilterTag.toLowerCase();
        list = list.filter(
          (p) =>
            p.title.toLowerCase().includes(tag) ||
            p.description.toLowerCase().includes(tag) ||
            (p.subCategory && p.subCategory.toLowerCase().includes(tag)) ||
            (p.threadCount && p.threadCount.toLowerCase().includes(tag)) ||
            p.motifsUsed?.some((m) => m.toLowerCase().includes(tag))
        );
      }
    }

    // Filter by text search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (product) =>
          product.title.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q) ||
          (product.subCategory && product.subCategory.toLowerCase().includes(q)) ||
          (product.threadCount && product.threadCount.toLowerCase().includes(q)) ||
          (product.artisanName && product.artisanName.toLowerCase().includes(q)) ||
          product.motifsUsed?.some((m) => m.toLowerCase().includes(q)) ||
          product.specs?.some((s) => s.toLowerCase().includes(q))
      );
    }

    // Sort
    if (searchSortBy === "price-low") {
      list.sort((a, b) => a.price - b.price);
    } else if (searchSortBy === "price-high") {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [searchQuery, activeFilterTag, searchSortBy]);

  return (
    <>
      {/* -------------------------------------------------------------------------- */}
      {/* MOBILE TOP NAVBAR HEADER (Matches Desktop Glassmorphism & Floating Effect) */}
      {/* -------------------------------------------------------------------------- */}
      <header
        id="boutique-navbar-mobile"
        className={`fixed top-0 left-0 right-0 z-40 md:hidden transition-all duration-500 ${
          scrolled 
            ? "bg-kora/95 backdrop-blur-md border-b border-zari/20 py-2.5 shadow-[0_4px_30px_rgba(74,18,26,0.03)]" 
            : "bg-transparent py-3.5"
        }`}
      >
        <div className="w-full px-4 flex items-center justify-between">
          {/* Left: Hamburger Menu Icon */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 border border-zari/40 rounded-full hover:border-alta text-charcoal hover:text-alta bg-white/80 backdrop-blur-sm shadow-xs flex items-center justify-center transition-all cursor-pointer"
            aria-label="Toggle Mobile Menu"
            title="Open Menu"
          >
            {isMenuOpen ? <X className="w-5 h-5 text-alta" /> : <Menu className="w-5 h-5 text-alta" />}
          </button>

          {/* Center: Brand Logo / Title */}
          <div 
            onClick={() => {
              setActiveTab("home");
              handleScrollTo("root-overture");
            }}
            className="cursor-pointer select-none text-center"
          >
            <AvhoronLogo size="sm" showTagline={!scrolled} />
          </div>

          {/* Right: Search Icon */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 border border-zari/40 rounded-full hover:border-alta text-charcoal hover:text-alta bg-white/80 backdrop-blur-sm shadow-xs flex items-center justify-center transition-all cursor-pointer"
            aria-label="Search Sarees"
            title="Search Collection"
          >
            <Search className="w-5 h-5 text-alta" />
          </button>
        </div>
      </header>

      {/* -------------------------------------------------------------------------- */}
      {/* DESKTOP TOP NAVBAR HEADER */}
      {/* -------------------------------------------------------------------------- */}
      <header
        id="boutique-navbar-desktop"
        className={`hidden md:block fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled 
            ? "bg-kora/95 backdrop-blur-md border-b border-zari/20 py-2.5 shadow-[0_4px_30px_rgba(74,18,26,0.03)]" 
            : "bg-transparent py-4"
        }`}
      >
        <div className="w-full px-6 lg:px-8 xl:px-10 flex items-center justify-between gap-4">
          
          {/* Brand Emblem */}
          <div 
            onClick={() => handleScrollTo("root-overture")}
            className="cursor-pointer select-none group flex-shrink-0"
          >
            <AvhoronLogo size="md" showTagline={!scrolled} />
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3 flex-shrink-0">
            
            {/* 3-line Hamburger Menu Icon */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 border border-zari/40 rounded-full hover:border-alta text-charcoal hover:text-alta bg-white/80 shadow-xs flex items-center justify-center transition-all cursor-pointer"
              aria-label="Toggle Navigation Menu"
              title="Open Navigation Menu"
            >
              {isMenuOpen ? <X className="w-5 h-5 text-alta" /> : <Menu className="w-5 h-5 text-alta" />}
            </button>

            {/* Desktop Search Trigger Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="px-3.5 py-1.5 border border-zari/40 hover:border-alta rounded-full text-charcoal hover:text-alta bg-white/80 hover:bg-white shadow-xs flex items-center gap-2 transition-all cursor-pointer group"
              aria-label="Search Sarees"
              title="Search Banarasi Handloom Sarees"
            >
              <Search className="w-4 h-4 text-alta group-hover:scale-110 transition-transform" />
              <span className="text-xs font-sans text-charcoal/80 group-hover:text-alta font-medium">
                Search Sarees
              </span>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist || (isLoggedIn ? onOpenProfile : onOpenAuth)}
              className="p-2 relative border border-zari/30 hover:border-alta rounded-full transition-all text-charcoal hover:text-alta bg-white/50 cursor-pointer"
              title="My Saved Wishlist"
            >
              <Heart className="w-4 h-4 text-alta" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-alta text-kora text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-sans font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Auth / Account Profile Button */}
            {isLoggedIn && userProfile ? (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={onOpenProfile}
                  className="px-3 py-1.5 relative border border-zari/30 hover:border-alta rounded-full transition-all text-charcoal hover:text-alta bg-white/50 flex items-center gap-1.5 cursor-pointer"
                  title="User Account & Orders"
                >
                  <User className="w-4 h-4 text-alta" />
                  <span className="text-[10px] font-sans uppercase font-bold tracking-wider text-alta whitespace-nowrap">
                    {userProfile.name ? userProfile.name.split(" ")[0] : "Account"}
                  </span>
                </button>
                {onLogout && (
                  <button
                    onClick={onLogout}
                    className="text-[10px] font-sans font-bold uppercase tracking-wider text-charcoal/60 hover:text-alta px-2 py-1 transition-colors whitespace-nowrap cursor-pointer"
                    title="Sign Out"
                  >
                    Logout
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-3.5 py-1.5 border border-alta/80 hover:border-alta text-alta bg-alta/5 hover:bg-alta hover:text-kora rounded-full transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                title="Login or Register Account"
              >
                <User className="w-4 h-4 text-alta" />
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider whitespace-nowrap">
                  Login / Sign Up
                </span>
              </button>
            )}

            {/* Shopping Bag Button */}
            <button
              id="shopping-bag-toggle-desktop"
              onClick={() => setIsCartOpen(true)}
              className="px-3 py-1.5 relative border border-alta bg-alta text-kora rounded-full transition-all hover:bg-alta/90 flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-zari" />
              <span className="text-[10px] font-sans font-bold uppercase tracking-wider whitespace-nowrap">
                Bag
              </span>
              {cart.length > 0 && (
                <span className="bg-zari text-alta text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-sans font-bold">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* -------------------------------------------------------------------------- */}
      {/* MOBILE BOTTOM NAVIGATION TAB BAR (like reference image) */}
      {/* -------------------------------------------------------------------------- */}
      <nav
        id="boutique-mobile-tabbar"
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200/80 px-2 py-1.5 shadow-[0_-4px_25px_rgba(0,0,0,0.08)] pb-[max(0.5rem,env(safe-area-inset-bottom))]"
      >
        <div className="grid grid-cols-5 items-center text-center">
          
          {/* Tab 1: Home */}
          <button
            onClick={() => {
              setActiveTab("home");
              handleScrollTo("root-overture");
            }}
            className={`flex flex-col items-center justify-center py-1 transition-colors cursor-pointer ${
              activeTab === "home" ? "text-[#E03E1A]" : "text-gray-500 hover:text-gray-900"
            }`}
          >
            <Home className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-sans font-medium tracking-tight">Home</span>
          </button>

          {/* Tab 2: Collection */}
          <button
            onClick={() => {
              setActiveTab("collection");
              if (onOpenAllSarees) {
                onOpenAllSarees();
              } else {
                handleScrollTo("boutique-shop");
              }
            }}
            className={`flex flex-col items-center justify-center py-1 transition-colors cursor-pointer ${
              activeTab === "collection" ? "text-[#E03E1A]" : "text-gray-500 hover:text-gray-900"
            }`}
          >
            <LayoutGrid className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-sans font-medium tracking-tight">Collection</span>
          </button>

          {/* Tab 3: Center Elevated Floating Cart Button */}
          <div className="flex items-center justify-center">
            <button
              onClick={() => setIsCartOpen(true)}
              className="w-13 h-13 -mt-6 bg-[#E03E1A] text-white rounded-full flex items-center justify-center shadow-[0_6px_20px_rgba(224,62,26,0.45)] border-4 border-white active:scale-95 transition-transform relative cursor-pointer"
              title="Shopping Bag"
              aria-label="Open Cart"
            >
              <ShoppingBag className="w-5 h-5 text-white" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-300 text-slate-950 text-[10px] w-5 h-5 rounded-full font-bold flex items-center justify-center shadow-xs border border-white">
                  {cart.length}
                </span>
              )}
            </button>
          </div>

          {/* Tab 4: Wishlist */}
          <button
            onClick={() => {
              setActiveTab("wishlist");
              if (isLoggedIn) {
                onOpenProfile();
              } else if (onOpenAuth) {
                onOpenAuth();
              }
            }}
            className={`flex flex-col items-center justify-center py-1 transition-colors relative cursor-pointer ${
              activeTab === "wishlist" ? "text-[#E03E1A]" : "text-gray-500 hover:text-gray-900"
            }`}
          >
            <div className="relative">
              <Heart className="w-5 h-5 mb-0.5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-[#E03E1A] text-white text-[9px] w-3.5 h-3.5 rounded-full font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </div>
            <span className="text-[10px] font-sans font-medium tracking-tight">Wishlist</span>
          </button>

          {/* Tab 5: Log In / Account */}
          <button
            onClick={() => {
              setActiveTab("account");
              if (isLoggedIn) {
                onOpenProfile();
              } else if (onOpenAuth) {
                onOpenAuth();
              }
            }}
            className={`flex flex-col items-center justify-center py-1 transition-colors cursor-pointer ${
              activeTab === "account" ? "text-[#E03E1A]" : "text-gray-500 hover:text-gray-900"
            }`}
          >
            <User className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-sans font-medium tracking-tight">
              {isLoggedIn ? "Account" : "Log In"}
            </span>
          </button>

        </div>
      </nav>

      {/* Navigation Drawer Overlay - Active on all device sizes */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-0 bg-kora z-[100] flex flex-col justify-between p-6 sm:p-10 overflow-y-auto max-h-screen silk-texture shadow-2xl"
          >
            <div className="absolute inset-4 border border-zari/10 pointer-events-none" />

            <div>
              {/* Drawer Dedicated Top Header Bar */}
              <div className="flex items-center justify-between border-b border-zari/20 pb-4 mb-6">
                <div 
                  onClick={() => handleScrollTo("root-overture")}
                  className="cursor-pointer select-none"
                >
                  <AvhoronLogo size="sm" showTagline={false} />
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-2 bg-alta text-kora rounded-full font-sans text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-alta/90 transition-all active:scale-95 shadow-md cursor-pointer border border-zari/40"
                  title="Close Navigation Menu"
                >
                  <X className="w-4 h-4 text-zari" />
                  <span>Close Menu</span>
                </button>
              </div>

              <nav className="flex flex-col gap-4 text-base sm:text-lg font-serif text-charcoal max-w-2xl mx-auto">
                {/* Quick Search trigger button in drawer */}
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsSearchOpen(true);
                  }}
                  className="w-full text-left p-3 bg-white hover:bg-alta/5 border border-zari/30 hover:border-alta rounded-lg transition-all flex items-center justify-between text-charcoal/80 group cursor-pointer shadow-xs"
                >
                  <span className="flex items-center gap-2.5 text-xs font-sans font-medium">
                    <Search className="w-4 h-4 text-alta group-hover:scale-110 transition-transform" />
                    <span>Search Handloom Sarees by Name, Fabric, Motif...</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold text-alta tracking-wider">Search →</span>
                </button>

                <div className="text-[10px] tracking-[0.2em] font-cinzel text-zari border-b border-zari/15 pb-2 flex items-center justify-between pt-1">
                  <span>IRAAYA • BANARAS</span>
                  <span className="text-[10px] font-sans font-bold text-alta">WAZIR & CO</span>
                </div>
                <motion.button whileTap={{ scale: 0.97 }} onClick={() => handleScrollTo("root-overture")} className="text-left hover:text-alta transition-colors flex items-center justify-between py-1 border-b border-zari/10">
                  <span>01. The Atelier Overture</span>
                  <ArrowRight className="w-4 h-4 text-zari" />
                </motion.button>
                <motion.button whileTap={{ scale: 0.97 }} onClick={() => handleScrollTo("boutique-shop")} className="text-left hover:text-alta transition-colors flex items-center justify-between py-1 border-b border-zari/10">
                  <span>02. Pure Banarasi Saree Collection</span>
                  <ArrowRight className="w-4 h-4 text-zari" />
                </motion.button>
                <motion.button whileTap={{ scale: 0.97 }} onClick={() => handleScrollTo("saree-video-showcase")} className="text-left hover:text-alta transition-colors flex items-center justify-between py-1 border-b border-zari/10">
                  <span>03. Sarees in Motion Reels</span>
                  <ArrowRight className="w-4 h-4 text-zari" />
                </motion.button>
                <motion.button whileTap={{ scale: 0.97 }} onClick={() => handleScrollTo("archive-matrix")} className="text-left hover:text-alta transition-colors flex items-center justify-between py-1 border-b border-zari/10">
                  <span>04. Heritage Saree Archives</span>
                  <ArrowRight className="w-4 h-4 text-zari" />
                </motion.button>
                <motion.button 
                  whileTap={{ scale: 0.97 }} 
                  onClick={() => {
                    setIsMenuOpen(false);
                    if (onOpenTrackOrder) onOpenTrackOrder();
                  }} 
                  className="text-left hover:text-alta transition-colors flex items-center justify-between font-bold text-emerald-950 bg-emerald-50/90 p-3.5 rounded-lg border border-emerald-800/30 shadow-xs my-1"
                >
                  <span className="flex items-center gap-2">
                    <Truck className="w-5 h-5 text-emerald-800" />
                    <span>05. Track & View Orders</span>
                  </span>
                  <ArrowRight className="w-4 h-4 text-emerald-800" />
                </motion.button>

                {/* Extra Services Navigation Links */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 text-xs font-sans text-charcoal/80">
                  {onOpenCustomTailoring && (
                    <button 
                      onClick={() => { setIsMenuOpen(false); onOpenCustomTailoring(); }} 
                      className="p-2.5 bg-white text-charcoal border border-zari/30 rounded-xs text-[10px] uppercase font-bold flex items-center gap-1.5 hover:border-alta transition-all"
                    >
                      <Scissors className="w-3.5 h-3.5 text-zari" />
                      <span>Blouse Studio</span>
                    </button>
                  )}
                  {onOpenVirtualVideo && (
                    <button 
                      onClick={() => { setIsMenuOpen(false); onOpenVirtualVideo(); }} 
                      className="p-2.5 bg-white text-charcoal border border-zari/30 rounded-xs text-[10px] uppercase font-bold flex items-center gap-1.5 hover:border-alta transition-all"
                    >
                      <Video className="w-3.5 h-3.5 text-zari" />
                      <span>Video Shopping</span>
                    </button>
                  )}
                  {onOpenSilkCare && (
                    <button 
                      onClick={() => { setIsMenuOpen(false); onOpenSilkCare(); }} 
                      className="p-2.5 bg-white text-charcoal border border-zari/30 rounded-xs text-[10px] uppercase font-bold flex items-center gap-1.5 hover:border-alta transition-all"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-zari" />
                      <span>Silk Mark Care</span>
                    </button>
                  )}
                </div>

                {/* Wishlist Shortcut in Mobile Menu */}
                <motion.button 
                  whileTap={{ scale: 0.97 }} 
                  onClick={() => {
                    setIsMenuOpen(false);
                    if (onOpenWishlist) {
                      onOpenWishlist();
                    } else if (isLoggedIn) {
                      onOpenProfile();
                    } else if (onOpenAuth) {
                      onOpenAuth();
                    }
                  }} 
                  className="text-left hover:text-alta transition-colors flex items-center justify-between font-bold text-alta bg-alta/5 p-3 rounded-lg border border-alta/20 shadow-xs"
                >
                  <span className="flex items-center gap-2">
                    <Heart className="w-4 h-4 fill-alta" />
                    <span>06. Saved Wishlist ({wishlist.length} {wishlist.length === 1 ? "Saree" : "Sarees"})</span>
                  </span>
                  <ArrowRight className="w-4 h-4 text-alta" />
                </motion.button>

                {isLoggedIn ? (
                  <div className="flex flex-col gap-2 border-t border-zari/15 pt-3">
                    <motion.button 
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setIsMenuOpen(false);
                        onOpenProfile();
                      }} 
                      className="text-left hover:text-alta transition-colors flex items-center justify-between text-alta font-bold"
                    >
                      <span>07. My Profile & Orders ({userProfile?.name ? userProfile.name.split(" ")[0] : "Account"})</span>
                      <User className="w-4 h-4 text-zari" />
                    </motion.button>
                    {onLogout && (
                      <motion.button 
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setIsMenuOpen(false);
                          onLogout();
                        }}
                        className="text-left text-xs font-sans text-charcoal/60 hover:text-alta uppercase font-bold tracking-wider pl-1"
                      >
                        → Logout
                      </motion.button>
                    )}
                  </div>
                ) : (
                  <motion.button 
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setIsMenuOpen(false);
                      if (onOpenAuth) onOpenAuth();
                    }} 
                    className="text-left hover:text-alta transition-colors flex items-center justify-between text-alta font-bold border-t border-zari/15 pt-3"
                  >
                    <span>07. Login / Sign Up</span>
                    <User className="w-4 h-4 text-zari" />
                  </motion.button>
                )}
                <motion.button 
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setIsMenuOpen(false);
                    onOpenConsultation();
                  }} 
                  className="text-left hover:text-alta transition-colors text-alta font-medium flex items-center justify-between pt-2"
                >
                  <span>08. Bespoke Styling Request</span>
                  <Sparkles className="w-4 h-4 text-zari" />
                </motion.button>
              </nav>
            </div>
            
            {/* Quick Info */}
            <div className="mt-8 space-y-1 text-xs text-charcoal/70 border-t border-zari/20 pt-4 max-w-2xl mx-auto w-full">
              <p className="font-serif italic text-alta">"Banarasi Elegance Since 1995 • Wazir & Co"</p>
              <p className="font-sans text-[11px]">Godowlia Crossing, LUXA Road, Banaras (Varanasi), UP 221001</p>
              <p className="font-mono text-[10px] text-zari font-bold">INSTAGRAM: @iraaya_official_demo</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shopping Bag Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-alta/40 backdrop-blur-sm transition-opacity"
              onClick={() => setIsCartOpen(false)}
            />
            
            {/* Panel */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="absolute inset-y-0 right-0 max-w-md w-full bg-kora silk-texture shadow-2xl flex flex-col z-50 border-l border-zari/30"
            >
              <div className="p-6 border-b border-zari/20 flex items-center justify-between bg-alta text-kora">
                <div className="flex flex-col">
                  <span className="text-lg font-cinzel tracking-wider text-kora">Shopping Bag</span>
                  <span className="text-[10px] font-sans tracking-widest text-zari uppercase">Iraaya • Wazir & Co</span>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 border border-zari/30 rounded-full hover:bg-zari/20 text-kora"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Cart Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 z-10">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                    <div className="w-16 h-16 rounded-full border border-zari/30 flex items-center justify-center text-zari">
                      <ShoppingBag className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-serif text-lg italic text-charcoal/80">"Your bag is empty."</p>
                      <p className="text-xs text-charcoal/60 max-w-[240px] leading-relaxed">
                        Discover our handcrafted sarees to initiate your purchase.
                      </p>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setIsCartOpen(false);
                        handleScrollTo("boutique-shop");
                      }}
                      className="px-6 py-2.5 bg-alta text-kora text-xs uppercase tracking-widest hover:bg-alta/90 transition-colors font-sans"
                    >
                      View Curated Collection
                    </motion.button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <motion.div 
                        key={item.id} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex gap-4 p-3 border border-zari/20 bg-white/70 backdrop-blur-sm relative"
                      >
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          referrerPolicy="no-referrer"
                          className="w-20 h-24 object-cover border border-zari/10 flex-shrink-0"
                        />
                        <div className="flex flex-col justify-between flex-1 py-0.5">
                          <div>
                            <div className="flex justify-between items-start">
                              <h4 className="font-serif text-xs font-bold text-charcoal leading-tight pr-2">{item.title}</h4>
                              <span className="text-xs font-mono font-bold text-alta">₹{item.price.toLocaleString("en-IN")}</span>
                            </div>
                            <p className="text-[10px] font-sans text-zari uppercase mt-0.5">{item.category}</p>
                            {item.isSkinFriendly && (
                              <span className="inline-block text-[9px] text-emerald-800 bg-emerald-50 px-1 mt-1 border border-emerald-200">
                                ✨ Skin-Friendly
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-[10px] text-alta font-sans underline text-left hover:text-alta/85 transition-colors self-start mt-2"
                          >
                            Remove Item
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart Footer */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-zari/20 bg-kora/95 space-y-4">
                  <div className="flex justify-between items-baseline font-serif border-b border-zari/10 pb-3">
                    <span className="text-sm">Subtotal</span>
                    <span className="text-xl font-bold text-alta">₹{calculateTotal().toLocaleString("en-IN")}</span>
                  </div>
                  <div className="space-y-2">
                    <motion.button 
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setIsCartOpen(false);
                        onOpenCheckout();
                      }}
                      className="w-full bg-alta text-kora text-xs uppercase tracking-widest py-3.5 hover:bg-alta/90 transition-colors font-sans flex items-center justify-center gap-2 shadow-lg font-bold"
                    >
                      <span>Proceed to Checkout</span>
                      <ArrowRight className="w-4 h-4 text-zari" />
                    </motion.button>
                    <p className="text-[9px] text-center text-charcoal/60 leading-relaxed max-w-[280px] mx-auto flex items-center justify-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-700" />
                      <span>Free Shipping across India • Instant UPI or COD</span>
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* -------------------------------------------------------------------------- */}
      {/* LUXURY SEARCH MODAL / DIALOG (Responsive Desktop, Tablet & Mobile) */}
      {/* -------------------------------------------------------------------------- */}
      <AnimatePresence>
        {isSearchOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6 font-sans">
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSearchOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative w-full h-full sm:h-auto sm:max-h-[88vh] sm:max-w-4xl bg-[#FBF9F4] sm:rounded-2xl shadow-2xl border border-zari/30 flex flex-col overflow-hidden z-10"
            >
              {/* Modal Top Header with Search Input */}
              <div className="p-4 sm:p-6 bg-white border-b border-zari/20 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-alta font-serif text-base sm:text-xl font-bold">
                    <Sparkles className="w-4 h-4 text-zari" />
                    <span>Search Handloom Banarasi Sarees</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsSearchOpen(false)}
                      className="p-2 border border-zari/30 rounded-full text-charcoal hover:text-alta hover:border-alta bg-white transition-all cursor-pointer"
                      title="Close Search Dialog"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Search Text Input */}
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-alta" />
                  <input
                    type="text"
                    placeholder="Search by Katan, Kadwa, Organza, Red Silk, Gold Zari, Master Wazir..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="w-full pl-12 pr-10 py-3 sm:py-3.5 bg-[#FAF8F5] border border-zari/40 rounded-xl text-sm sm:text-base text-charcoal focus:outline-none focus:border-alta focus:bg-white transition-all shadow-inner placeholder:text-charcoal/40 font-serif"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-charcoal/50 hover:text-alta p-1 cursor-pointer"
                      title="Clear search text"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Popular Search & Quick Filter Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-charcoal/50 whitespace-nowrap">
                    Filter:
                  </span>
                  {[
                    "All",
                    "Pure Katan",
                    "Kadwa Jaal",
                    "Bridal Benarasi",
                    "Organza",
                    "Gold Zari",
                    "Under ₹20,000",
                    "Under ₹30,000",
                    "Best Sellers",
                    "Heirloom Premium",
                  ].map((tag) => {
                    const isActive = activeFilterTag === tag;
                    return (
                      <button
                        key={tag}
                        onClick={() => {
                          setActiveFilterTag(tag);
                        }}
                        className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer border ${
                          isActive
                            ? "bg-alta text-kora border-alta font-bold shadow-xs"
                            : "bg-white text-charcoal/80 border-zari/30 hover:border-alta hover:text-alta"
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Results Control Sub-header */}
              <div className="px-4 sm:px-6 py-2.5 bg-[#F4F0E6] border-b border-zari/15 flex items-center justify-between text-xs text-charcoal/70">
                <span className="font-medium">
                  {filteredSearchProducts.length > 0
                    ? `Showing ${filteredSearchProducts.length} authentic handloom saree${filteredSearchProducts.length === 1 ? "" : "s"}`
                    : "No matching sarees"}
                </span>

                {/* Sort selector */}
                <div className="flex items-center gap-1.5 text-[11px]">
                  <span className="text-charcoal/60">Sort:</span>
                  <select
                    value={searchSortBy}
                    onChange={(e) => setSearchSortBy(e.target.value as any)}
                    className="bg-transparent text-charcoal font-bold focus:outline-none cursor-pointer"
                  >
                    <option value="featured">Featured Archive</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>

              {/* Scrollable Results Grid Area */}
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto max-h-[55vh]">
                {filteredSearchProducts.length === 0 ? (
                  <div className="text-center py-12 px-4 space-y-4 max-w-md mx-auto">
                    <div className="w-12 h-12 rounded-full bg-alta/10 border border-alta/20 flex items-center justify-center mx-auto text-alta">
                      <Search className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-serif italic text-lg text-charcoal">
                        No handloom sarees found matching "{searchQuery}"
                      </p>
                      <p className="text-xs text-charcoal/60 leading-relaxed">
                        Try searching for 'Katan', 'Kadwa', 'Organza', 'Red Silk', or choose a filter above.
                      </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2 pt-2">
                      {["Pure Katan Silk", "Kadwa Jaal", "Bridal Benarasi", "Organza"].map((sug) => (
                        <button
                          key={sug}
                          onClick={() => {
                            setSearchQuery(sug);
                            setActiveFilterTag("All");
                          }}
                          className="px-3 py-1 bg-white border border-zari/40 rounded-full text-xs text-alta font-medium hover:bg-alta hover:text-white transition-all cursor-pointer"
                        >
                          {sug}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {filteredSearchProducts.map((product) => {
                      const itemInCart = isInCart ? isInCart(product.id) : cart.some((c) => c.id === product.id);
                      const itemInWishlist = wishlist.some((w) => w.id === product.id);

                      return (
                        <div
                          key={product.id}
                          onClick={() => {
                            setIsSearchOpen(false);
                            if (onSelectProduct) {
                              onSelectProduct(product);
                            } else if (onOpenAllSarees) {
                              onOpenAllSarees(product.title);
                            } else {
                              handleScrollTo("boutique-shop");
                            }
                          }}
                          className="group flex gap-3.5 p-3 bg-white border border-zari/25 rounded-xl hover:border-alta hover:shadow-md transition-all cursor-pointer relative"
                        >
                          {/* Saree Thumbnail Image */}
                          <div className="relative w-20 h-24 sm:w-24 sm:h-28 flex-shrink-0 overflow-hidden rounded-lg bg-black/5 border border-zari/15">
                            <img
                              src={product.image}
                              alt={product.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {product.isBestSeller && (
                              <span className="absolute top-1 left-1 bg-amber-400 text-charcoal text-[8px] font-bold px-1.5 py-0.5 rounded shadow-xs uppercase">
                                Best Seller
                              </span>
                            )}
                          </div>

                          {/* Saree Meta & Actions */}
                          <div className="flex-1 flex flex-col justify-between min-w-0">
                            <div>
                              <div className="flex items-start justify-between gap-1">
                                <h4 className="font-serif text-xs sm:text-sm font-bold text-charcoal group-hover:text-alta line-clamp-2 leading-snug">
                                  {product.title}
                                </h4>
                                {toggleWishlist && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleWishlist(product);
                                    }}
                                    className={`p-1.5 rounded-full transition-colors flex-shrink-0 ${
                                      itemInWishlist
                                        ? "text-alta bg-alta/10"
                                        : "text-charcoal/40 hover:text-alta hover:bg-gray-100"
                                    }`}
                                    title={itemInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                                  >
                                    <Heart className={`w-4 h-4 ${itemInWishlist ? "fill-alta" : ""}`} />
                                  </button>
                                )}
                              </div>

                              <p className="text-[10px] text-charcoal/60 font-sans mt-0.5 truncate">
                                {product.threadCount || product.subCategory || "Pure Banarasi Silk"}
                              </p>
                              {product.artisanName && (
                                <p className="text-[9px] text-zari font-sans uppercase font-bold tracking-wider truncate">
                                  {product.artisanName}
                                </p>
                              )}
                            </div>

                            <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-zari/10">
                              <span className="text-sm sm:text-base font-bold text-alta font-mono">
                                ₹{product.price.toLocaleString("en-IN")}
                              </span>

                              <div className="flex items-center gap-1.5">
                                {addToCart && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      addToCart(product);
                                    }}
                                    className={`px-2.5 py-1 text-[10px] font-sans font-bold uppercase tracking-wider rounded-md transition-all flex items-center gap-1 ${
                                      itemInCart
                                        ? "bg-emerald-800 text-white"
                                        : "bg-alta text-kora hover:bg-alta/90 active:scale-95"
                                    }`}
                                  >
                                    <ShoppingBag className="w-3 h-3" />
                                    <span>{itemInCart ? "In Bag" : "Add"}</span>
                                  </button>
                                )}
                                <span className="text-[10px] font-sans text-alta font-bold flex items-center group-hover:translate-x-0.5 transition-transform">
                                  View →
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Bottom Footer Bar */}
              <div className="p-3.5 sm:p-4 bg-white border-t border-zari/20 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 text-[10px] text-charcoal/70 uppercase font-sans tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>100% Certified Pure Banarasi Silk • Silk Mark Guaranteed</span>
                </div>

                {onOpenAllSarees && (
                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      onOpenAllSarees(searchQuery);
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 bg-alta text-kora rounded-xl text-xs uppercase font-bold tracking-wider hover:bg-alta/90 transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    <span>Explore All {filteredSearchProducts.length} Sarees in Full Catalog</span>
                    <ArrowRight className="w-4 h-4 text-zari" />
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </>
  );
}
