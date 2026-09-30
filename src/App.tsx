/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { WeaveBackground } from "./components/WeaveBackground";
import { Navbar } from "./components/Navbar";
import { AtelierOverture } from "./components/AtelierOverture";
import { ArchiveMatrix } from "./components/ArchiveMatrix";
import { ProductCurator } from "./components/ProductCurator";
import { AllSareesPage } from "./components/AllSareesPage";
import { SareeVideoShowcase } from "./components/SareeVideoShowcase";
import { ArtisanalAppointment } from "./components/ArtisanalAppointment";
import { AairaGallery } from "./components/AairaGallery";
import { UserProfileModal } from "./components/UserProfileModal";
import { CheckoutModal } from "./components/CheckoutModal";
import { AuthModal } from "./components/AuthModal";
import { 
  ReadyToShipModal, 
  CustomTailoringModal, 
  TrackOrderModal, 
  VirtualVideoModal, 
  SilkCareModal, 
  RealBridesModal, 
  StorePoliciesModal 
} from "./components/LuxuryStoreFeatures";
import { ProductDetailPage } from "./components/ProductDetailPage";
import { WishlistModal } from "./components/WishlistModal";
import { BoutiqueProduct, UserProfile, Order } from "./types";
import { curatedProducts } from "./data/editorialData";
import { MapPin, Phone, Mail, Instagram, ShieldCheck, Heart, Sparkles, ArrowUp, Youtube } from "lucide-react";

export default function App() {
  const [cart, setCart] = useState<BoutiqueProduct[]>([]);
  const [wishlist, setWishlist] = useState<BoutiqueProduct[]>([]);

  // Auth & User Profile State (Starts empty/logged out)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Orders State (Starts empty)
  const [orders, setOrders] = useState<Order[]>([]);

  // Modal Visibility Controls
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAllSareesOpen, setIsAllSareesOpen] = useState(false);
  const [allSareesSearchQuery, setAllSareesSearchQuery] = useState("");
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<BoutiqueProduct | null>(null);
  const [preSelectedProduct, setPreSelectedProduct] = useState<BoutiqueProduct | null>(null);

  // Extra Luxury Pages / Modals State
  const [isReadyToShipOpen, setIsReadyToShipOpen] = useState(false);
  const [isCustomTailoringOpen, setIsCustomTailoringOpen] = useState(false);
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState(false);
  const [isVirtualVideoOpen, setIsVirtualVideoOpen] = useState(false);
  const [isSilkCareOpen, setIsSilkCareOpen] = useState(false);
  const [isRealBridesOpen, setIsRealBridesOpen] = useState(false);
  const [isStorePoliciesOpen, setIsStorePoliciesOpen] = useState(false);

  const handleLoginSuccess = (user: UserProfile) => {
    setUserProfile(user);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUserProfile(null);
    setIsLoggedIn(false);
    setIsProfileModalOpen(false);
  };

  const addToCart = (product: BoutiqueProduct) => {
    if (!cart.some((item) => item.id === product.id)) {
      setCart((prev) => [...prev, product]);
    }
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const isInCart = (id: string) => {
    return cart.some((item) => item.id === id);
  };

  const toggleWishlist = (product: BoutiqueProduct) => {
    setWishlist((prev) =>
      prev.some((item) => item.id === product.id)
        ? prev.filter((item) => item.id !== product.id)
        : [...prev, product]
    );
  };

  const removeFromWishlist = (id: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const handleOrderPlaced = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  const handleEnquire = (product: BoutiqueProduct) => {
    setPreSelectedProduct(product);
    const element = document.getElementById("artisanal-consultation");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenConsultation = () => {
    const element = document.getElementById("artisanal-consultation");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavigate = (sectionId: string) => {
    console.log(`Navigating to section: ${sectionId}`);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div id="iraaya-boutique-root" className="relative min-h-screen selection:bg-alta/10 selection:text-alta pb-20 md:pb-0">
      
      {/* 1. Fluid Background Weave */}
      <WeaveBackground />

      {/* 2. Brand Navigation */}
      <Navbar 
        cart={cart}
        wishlist={wishlist}
        userProfile={userProfile}
        isLoggedIn={isLoggedIn}
        removeFromCart={removeFromCart} 
        addToCart={addToCart}
        isInCart={isInCart}
        toggleWishlist={toggleWishlist}
        onNavigate={handleNavigate} 
        onOpenConsultation={handleOpenConsultation}
        onOpenProfile={() => {
          if (isLoggedIn) {
            setIsProfileModalOpen(true);
          } else {
            setIsAuthModalOpen(true);
          }
        }}
        onOpenCheckout={() => setIsCheckoutModalOpen(true)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onLogout={handleLogout}
        onOpenReadyToShip={() => setIsReadyToShipOpen(true)}
        onOpenCustomTailoring={() => setIsCustomTailoringOpen(true)}
        onOpenTrackOrder={() => setIsTrackOrderOpen(true)}
        onOpenVirtualVideo={() => setIsVirtualVideoOpen(true)}
        onOpenSilkCare={() => setIsSilkCareOpen(true)}
        onOpenRealBrides={() => setIsRealBridesOpen(true)}
        onOpenStorePolicies={() => setIsStorePoliciesOpen(true)}
        onOpenAllSarees={(query?: string) => {
          setAllSareesSearchQuery(query || "");
          setIsAllSareesOpen(true);
        }}
        onSelectProduct={(product: BoutiqueProduct) => {
          setSelectedProductForDetail(product);
        }}
      />

      {/* Core Pages / Content Flow */}
      <main className="relative z-10">
        
        {/* Module 1: The Atelier Overture (Hero Canvas) */}
        <AtelierOverture 
          onNavigate={handleNavigate} 
          onOpenConsultation={handleOpenConsultation} 
        />

        {/* Module 2: Staggered Heritage Saree Lookbook */}
        <ArchiveMatrix />

        {/* Module 3: Curated Pure Banarasi Saree Archive */}
        <ProductCurator 
          addToCart={addToCart} 
          isInCart={isInCart} 
          onEnquire={handleEnquire}
          wishlist={wishlist}
          toggleWishlist={toggleWishlist}
          onOpenAllSarees={() => setIsAllSareesOpen(true)}
        />

        {/* Module 4: Live Loom Video Reels */}
        <SareeVideoShowcase 
          addToCart={addToCart}
          onEnquire={handleEnquire}
        />

        {/* Module 5: Saree Customization Form */}
        <ArtisanalAppointment 
          preSelectedProduct={preSelectedProduct} 
          clearPreSelectedProduct={() => setPreSelectedProduct(null)} 
        />

        {/* Module 6: Aaira Gallery (Customer Review Photos) */}
        <AairaGallery />

      </main>

      {/* User Profile, Wishlist, and Orders Modal */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        userProfile={userProfile}
        setUserProfile={setUserProfile}
        orders={orders}
        wishlist={wishlist}
        removeFromWishlist={removeFromWishlist}
        addToCart={addToCart}
      />

      {/* Checkout Modal (Address & UPI / COD) */}
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        cart={cart}
        clearCart={clearCart}
        userProfile={userProfile}
        onOrderPlaced={handleOrderPlaced}
      />

      {/* Patron Auth Modal (Login / Sign Up) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Modern Curated Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        removeFromWishlist={removeFromWishlist}
        addToCart={addToCart}
        isInCart={isInCart}
        onSelectProduct={(product) => setSelectedProductForDetail(product)}
        onOpenConsultation={handleOpenConsultation}
        onExploreCatalog={() => setIsAllSareesOpen(true)}
      />

      {/* ----------------- EXTRA LUXURY FEATURE MODALS ----------------- */}
      <ReadyToShipModal
        isOpen={isReadyToShipOpen}
        onClose={() => setIsReadyToShipOpen(false)}
        products={curatedProducts}
        addToCart={addToCart}
        isInCart={isInCart}
      />

      <CustomTailoringModal
        isOpen={isCustomTailoringOpen}
        onClose={() => setIsCustomTailoringOpen(false)}
        product={preSelectedProduct}
      />

      <TrackOrderModal
        isOpen={isTrackOrderOpen}
        onClose={() => setIsTrackOrderOpen(false)}
        isLoggedIn={isLoggedIn}
        userProfile={userProfile}
        orders={orders}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenBoutique={() => setIsAllSareesOpen(true)}
      />

      <VirtualVideoModal
        isOpen={isVirtualVideoOpen}
        onClose={() => setIsVirtualVideoOpen(false)}
      />

      <SilkCareModal
        isOpen={isSilkCareOpen}
        onClose={() => setIsSilkCareOpen(false)}
      />

      <RealBridesModal
        isOpen={isRealBridesOpen}
        onClose={() => setIsRealBridesOpen(false)}
        onOpenConsultation={handleOpenConsultation}
      />

      <StorePoliciesModal
        isOpen={isStorePoliciesOpen}
        onClose={() => setIsStorePoliciesOpen(false)}
      />

      {/* Full All Sarees Collection Overlay Page */}
      {isAllSareesOpen && (
        <AllSareesPage
          onClose={() => setIsAllSareesOpen(false)}
          addToCart={addToCart}
          isInCart={isInCart}
          toggleWishlist={toggleWishlist}
          wishlist={wishlist}
          initialSearchQuery={allSareesSearchQuery}
        />
      )}

      {/* Individual Saree Detail Page Modal */}
      {selectedProductForDetail && (
        <ProductDetailPage
          product={selectedProductForDetail}
          onClose={() => setSelectedProductForDetail(null)}
          addToCart={addToCart}
          isInCart={isInCart}
        />
      )}

      {/* 3. Luxury Brand Editorial Footer */}
      <footer id="boutique-footer" className="relative bg-alta text-kora py-10 md:py-12 px-4 sm:px-6 md:px-12 z-20 border-t border-zari/30 overflow-hidden">
        
        {/* Background Watermark Overlay */}
        <div className="absolute left-[-2%] bottom-0 text-[16vw] font-serif text-kora/[0.025] select-none pointer-events-none font-bold leading-none tracking-widest">
          IRAAYA
        </div>

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-zari/20 pb-8">
          
          {/* Col 1: Editorial Vision & Brand */}
          <div className="md:col-span-4 space-y-6 text-left">
            <div className="flex flex-col">
              <span className="text-xl font-cinzel tracking-widest text-zari font-bold">IRAAYA</span>
              <span className="text-[10px] font-sans text-kora/60 tracking-widest uppercase">BANARAS • WAZIR & CO • ESTD 1995</span>
            </div>
            
            <p className="text-xs md:text-sm font-serif italic text-kora/80 leading-relaxed pl-4 border-l border-zari/30 max-w-sm">
              "Pure Banarasi Silk Sarees from Banaras Since 1995."
            </p>

            <div className="text-[10px] text-zari font-sans tracking-widest uppercase flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Certified Pure Benarasi Silk & Silk Mark Authenticity</span>
            </div>
          </div>

          {/* Col 2: Flagship Boutique Location & Extra Service Links */}
          <div className="md:col-span-4 text-left space-y-4">
            <span className="text-[10px] tracking-widest font-sans uppercase font-bold text-zari">
              Banaras Flagship Studio & Services
            </span>
            <div className="space-y-2 text-xs text-kora/70 font-sans">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-zari mt-0.5 flex-shrink-0" />
                <span>Godowlia Crossing, LUXA Road, Banaras (Varanasi), Uttar Pradesh 221001</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-zari flex-shrink-0" />
                <span>Concierge & WhatsApp: +91 98000 00000 (10 AM - 8 PM IST)</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-zari flex-shrink-0" />
                <span>concierge@iraaya-demo.com</span>
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-2 text-[10px] font-sans uppercase text-zari">
              <button onClick={() => setIsReadyToShipOpen(true)} className="hover:underline">Ready To Ship</button>
              <span>•</span>
              <button onClick={() => setIsCustomTailoringOpen(true)} className="hover:underline">Blouse Studio</button>
              <span>•</span>
              <button onClick={() => setIsVirtualVideoOpen(true)} className="hover:underline">Video Shopping</button>
              <span>•</span>
              <button onClick={() => setIsTrackOrderOpen(true)} className="hover:underline">Track Order</button>
              <span>•</span>
              <button onClick={() => setIsSilkCareOpen(true)} className="hover:underline">Silk Mark</button>
              <span>•</span>
              <button onClick={() => setIsStorePoliciesOpen(true)} className="hover:underline">Shipping & FAQs</button>
            </div>
          </div>

          {/* Col 3: Social Curation */}
          <div className="md:col-span-4 text-left space-y-4">
            <span className="text-[10px] tracking-widest font-sans uppercase font-bold text-zari">
              Official Instagram
            </span>
            <p className="text-xs text-kora/70 leading-relaxed font-sans">
              Follow Iraaya on Instagram for fresh Banarasi loom releases, bridal trousseau showcases, and behind-the-scenes artisan stories from Banaras.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a 
                href="https://www.instagram.com/#" 
                target="_blank" 
                rel="noreferrer" 
                className="px-4 py-2 border border-zari/30 bg-kora/10 text-zari hover:border-kora hover:text-kora rounded-full transition-all flex items-center gap-2 text-xs font-sans"
              >
                <Instagram className="w-4 h-4 text-pink-300" />
                <span>@iraaya_official_demo</span>
              </a>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="max-w-7xl mx-auto relative z-10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-sans text-kora/50">
          <p>© 2026 Iraaya (Wazir & Co). Pure Benarasi Silk House. All Rights Reserved.</p>
          
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest hover:text-kora transition-colors bg-transparent border-none cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-zari" />
          </button>
        </div>

      </footer>
    </div>
  );
}



