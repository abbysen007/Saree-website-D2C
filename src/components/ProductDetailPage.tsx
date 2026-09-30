/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { BoutiqueProduct } from "../types";
import { 
  X, ChevronLeft, ChevronRight, Star, Check, ShoppingBag, 
  MessageCircle, Scissors, Sparkles, Truck, ShieldCheck, HelpCircle,
  Plus, Minus, Info, ArrowLeft
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ProductDetailPageProps {
  product: BoutiqueProduct;
  onClose: () => void;
  addToCart: (product: BoutiqueProduct) => void;
  isInCart: (id: string) => boolean;
}

export function ProductDetailPage({
  product,
  onClose,
  addToCart,
  isInCart,
}: ProductDetailPageProps) {
  // Gallery images list
  const galleryImages = [
    product.image,
    product.secondaryImage || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1200&q=80"
  ];

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Upgrades
  const [fallPico, setFallPico] = useState(false);
  const [tassels, setTassels] = useState(false);
  const [blouseStitching, setBlouseStitching] = useState(false);
  const [showUpgrades, setShowUpgrades] = useState(true);

  // Accordions
  const [showDescription, setShowDescription] = useState(false);
  const [showDelivery, setShowDelivery] = useState(false);

  // Quantity
  const [quantity, setQuantity] = useState(1);

  // Custom Blouse Measurement Drawer
  const [showBlouseModal, setShowBlouseModal] = useState(false);
  const [bustSize, setBustSize] = useState("36");
  const [waistSize, setWaistSize] = useState("30");
  const [blouseLength, setBlouseLength] = useState("14");
  const [sleeveLength, setSleeveLength] = useState("10");
  const [neckType, setNeckType] = useState("Sweetheart Neck");
  const [blouseSaved, setBlouseSaved] = useState(false);

  // Added state feedback
  const [addedSuccess, setAddedSuccess] = useState(false);

  // Total price calculation
  const basePrice = product.price;
  const fallPicoPrice = fallPico ? 200 : 0;
  const tasselsPrice = tassels ? 150 : 0;
  const blousePrice = blouseStitching ? 2000 : 0;

  const unitPrice = basePrice + fallPicoPrice + tasselsPrice + blousePrice;
  const totalPrice = unitPrice * quantity;

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        ...product,
        price: unitPrice,
      });
    }
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2500);
  };

  const skuCode = (product as any).sku || `SK-${product.id.slice(0, 5).toUpperCase()}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#F7F5EE] text-charcoal flex flex-col font-sans">
      
      {/* Top Header & Breadcrumb Bar */}
      <div className="sticky top-0 z-40 bg-[#F7F5EE]/95 backdrop-blur-md border-b border-zari/20 px-4 md:px-8 py-3 flex items-center justify-between text-xs font-sans">
        
        {/* Back Button & Breadcrumb Links */}
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full bg-emerald-900 text-white font-sans text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md hover:bg-emerald-950 transition-all active:scale-95 cursor-pointer flex-shrink-0 border border-emerald-700"
            title="Go back to previous page"
          >
            <ArrowLeft className="w-4 h-4 text-amber-200" />
            <span>Go Back</span>
          </button>

          <div className="hidden sm:flex items-center gap-1.5 text-charcoal/70 overflow-x-auto whitespace-nowrap text-[11px]">
            <button onClick={onClose} className="hover:text-alta transition-colors flex items-center gap-1 font-medium">
              <span>🏠 Home</span>
            </button>
            <span>/</span>
            <span onClick={onClose} className="hover:text-alta transition-colors cursor-pointer">Collections</span>
            <span>/</span>
            <span className="text-charcoal font-semibold line-clamp-1 max-w-[200px] sm:max-w-xs">
              {product.title}
            </span>
          </div>
        </div>

        {/* Close Page Button */}
        <button
          onClick={onClose}
          className="p-2 rounded-full border border-zari/40 bg-white/80 hover:bg-alta hover:text-kora hover:border-alta transition-all flex items-center justify-center ml-2 cursor-pointer"
          title="Return to Saree Collection"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Main Page Content Container */}
      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 py-6 md:py-10 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Image Gallery & Thumbnails (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col sm:flex-row gap-4">
            
            {/* Vertical Thumbnails Column */}
            <div className="flex sm:flex-col gap-2.5 overflow-x-auto sm:overflow-y-auto max-h-[550px] scrollbar-none order-2 sm:order-1 flex-shrink-0">
              {galleryImages.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-20 sm:w-20 sm:h-24 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 bg-stone-100 ${
                    activeImageIndex === idx 
                      ? "border-emerald-700 ring-2 ring-emerald-700/20 shadow-sm" 
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`${product.title} view ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Stage Image Display */}
            <div className="relative flex-1 aspect-[3/4] rounded-2xl overflow-hidden bg-[#FAF8F5] border border-stone-200/80 shadow-md group order-1 sm:order-2">
              <img
                src={galleryImages[activeImageIndex]}
                alt={product.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-500"
              />

              {/* Overlay Go Back Button */}
              <button
                onClick={onClose}
                className="absolute top-3 left-3 z-20 px-3.5 py-1.5 bg-black/70 hover:bg-black text-white border border-white/30 backdrop-blur-md rounded-full shadow-lg transition-all active:scale-95 flex items-center gap-1.5 text-xs font-sans font-semibold cursor-pointer"
                title="Go back to saree collection"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-amber-300" />
                <span>Go Back</span>
              </button>

              {/* Prev & Next Arrows */}
              <button
                onClick={handlePrevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/90 text-charcoal hover:bg-white shadow-lg transition-transform active:scale-90"
                title="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/90 text-charcoal hover:bg-white shadow-lg transition-transform active:scale-90"
                title="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* WhatsApp Floating Button */}
              <a
                href={`https://wa.me/919800000000?text=${encodeURIComponent(`Hello Iraaya, I am inquiring about ${product.title} (${skuCode})`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute left-4 bottom-4 p-3 bg-emerald-600 text-white rounded-full shadow-xl hover:bg-emerald-700 transition-transform hover:scale-105 flex items-center justify-center z-10"
                title="Inquire on WhatsApp"
              >
                <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
              </a>

              {/* Silk Mark Seal Badge */}
              <div className="absolute right-4 bottom-4 bg-white/90 backdrop-blur-xs border border-amber-300/50 rounded-lg px-2.5 py-1 text-[10px] font-sans font-bold text-amber-900 uppercase tracking-widest flex items-center gap-1 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                <span>100% Pure Silk Mark</span>
              </div>
            </div>

          </div>


          {/* RIGHT COLUMN: Product Information & Purchase Options (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-5 text-left">
            
            {/* SKU & Title */}
            <div>
              <span className="text-xs font-mono font-bold text-emerald-800 tracking-wider uppercase block mb-1">
                {skuCode}
              </span>
              <h1 className="text-2xl md:text-3xl font-serif text-charcoal font-medium leading-snug">
                {product.title}
              </h1>

              {/* Price & Rating Row */}
              <div className="flex items-center justify-between mt-3 pb-2 border-b border-stone-200">
                <span className="text-2xl font-bold font-sans text-charcoal">
                  Rs. {basePrice.toLocaleString("en-IN")}.00
                </span>
                
                <div className="flex items-center gap-1">
                  <div className="flex text-amber-400">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  </div>
                  <span className="text-xs font-mono text-gray-500 font-bold ml-1">(4.8)</span>
                </div>
              </div>
            </div>

            {/* END OF SEASON SALE PROMO BANNER */}
            <div className="bg-[#1C261D] text-[#E5D7B5] rounded-xl p-3.5 shadow-md border border-[#384A3B]">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-300 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>END OF SEASON SALE</span>
              </div>
              <p className="text-xs font-sans text-[#E5D7B5]/90 tracking-wide">
                <strong className="text-amber-200">10% OFF</strong> on 1 Saree • <strong className="text-amber-200">12% OFF</strong> on 3 Sarees • <strong className="text-amber-200">15% OFF</strong> on 5 Sarees
              </p>
            </div>

            {/* POPULAR UPGRADES SECTION */}
            <div className="bg-[#F2F5F0] border border-[#D5E0D2] rounded-2xl p-4 space-y-3 shadow-xs">
              
              <div className="flex items-center justify-between text-xs font-bold text-emerald-900 uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <span>📦 Popular upgrades</span>
                </span>
                <button 
                  onClick={() => setShowUpgrades(!showUpgrades)} 
                  className="text-emerald-700 hover:text-emerald-950 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {showUpgrades && (
                <div className="space-y-2.5 text-xs font-sans pt-1">
                  
                  {/* Fall Pico Checkbox */}
                  <label className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-stone-200 hover:border-emerald-600 cursor-pointer transition-colors select-none">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={fallPico}
                        onChange={(e) => setFallPico(e.target.checked)}
                        className="w-4 h-4 rounded text-emerald-700 focus:ring-emerald-600 accent-emerald-700"
                      />
                      <span className="font-medium text-charcoal">Fall Pico</span>
                    </div>
                    <span className="font-semibold text-charcoal/80">Rs. 200.00</span>
                  </label>

                  {/* Tassels Checkbox */}
                  <label className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-stone-200 hover:border-emerald-600 cursor-pointer transition-colors select-none">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={tassels}
                        onChange={(e) => setTassels(e.target.checked)}
                        className="w-4 h-4 rounded text-emerald-700 focus:ring-emerald-600 accent-emerald-700"
                      />
                      <span className="font-medium text-charcoal">Tassels</span>
                    </div>
                    <span className="font-semibold text-charcoal/80">Rs. 150.00</span>
                  </label>

                  {/* Blouse Stitching Checkbox */}
                  <label className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-stone-200 hover:border-emerald-600 cursor-pointer transition-colors select-none">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={blouseStitching}
                        onChange={(e) => setBlouseStitching(e.target.checked)}
                        className="w-4 h-4 rounded text-emerald-700 focus:ring-emerald-600 accent-emerald-700"
                      />
                      <span className="font-medium text-charcoal">Blouse Stitching</span>
                    </div>
                    <span className="font-semibold text-charcoal/80">Rs. 2,000.00</span>
                  </label>

                </div>
              )}
            </div>

            {/* Note & Custom Blouse Measurement Button */}
            <div className="space-y-2 pt-1">
              <p className="text-xs text-emerald-900 font-medium italic">
                Note : Submit custom blouse measurement only after payment
              </p>

              <button
                onClick={() => setShowBlouseModal(true)}
                className="w-full py-3 bg-black text-white text-xs font-sans font-bold uppercase tracking-widest rounded-xl hover:bg-stone-800 transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <Scissors className="w-4 h-4 text-amber-300" />
                <span>Blouse Stitching Measurement</span>
              </button>
            </div>

            {/* ACCORDIONS */}
            <div className="border-t border-stone-200 pt-3 space-y-2 text-xs">
              
              {/* Product Description Accordion */}
              <div className="border border-stone-200 rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => setShowDescription(!showDescription)}
                  className="w-full p-3.5 flex items-center justify-between font-semibold text-charcoal hover:bg-stone-50 text-left transition-colors"
                >
                  <span className="font-serif text-sm">Product Description</span>
                  <span className="text-lg text-emerald-800">{showDescription ? "−" : "+"}</span>
                </button>
                {showDescription && (
                  <div className="p-4 pt-1 text-charcoal/70 space-y-2 font-sans border-t border-stone-100 bg-[#FAF9F5]">
                    <p className="leading-relaxed font-serif italic text-xs text-charcoal">
                      "{product.description}"
                    </p>
                    <ul className="space-y-1 text-xs pt-2 font-sans border-t border-stone-200/60">
                      <li>• <strong>Fabric:</strong> 100% Pure Certified Banarasi Silk</li>
                      <li>• <strong>Craftsmanship:</strong> Handloom Kadwa / Cutwork Zari Weave</li>
                      <li>• <strong>Loom Thread Count:</strong> {product.threadCount || "120/2 Pure Silk"}</li>
                      <li>• <strong>Origin:</strong> Handcrafted in Chowk & Godowlia, Banaras</li>
                      <li>• <strong>Care Instructions:</strong> Dry Clean Only</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Dispatch & Delivery Timeline Accordion */}
              <div className="border border-stone-200 rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => setShowDelivery(!showDelivery)}
                  className="w-full p-3.5 flex items-center justify-between font-semibold text-charcoal hover:bg-stone-50 text-left transition-colors"
                >
                  <span className="font-serif text-sm">Dispatch & Delivery Timeline</span>
                  <span className="text-lg text-emerald-800">{showDelivery ? "−" : "+"}</span>
                </button>
                {showDelivery && (
                  <div className="p-4 pt-1 text-charcoal/70 space-y-2 font-sans border-t border-stone-100 bg-[#FAF9F5]">
                    <p className="leading-relaxed">
                      ⚡ <strong>Express Dispatch:</strong> Dispatched within 24 to 48 hours directly from our Banaras master loom studio.
                    </p>
                    <p className="leading-relaxed">
                      ✈️ <strong>Delivery:</strong> 3-5 business days across India via BlueDart/DTDC Air courier. International shipping available worldwide via DHL Express.
                    </p>
                  </div>
                )}
              </div>

            </div>


            {/* STICKY BOTTOM ACTION BAR (Quantity Selector & Add To Cart Button) */}
            <div className="pt-4 border-t border-stone-300 flex items-center gap-3">
              
              {/* Quantity Selector < 1 > */}
              <div className="flex items-center justify-between border border-stone-300 rounded-full px-3 py-2 bg-white w-28 flex-shrink-0 shadow-xs">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="text-gray-500 hover:text-black font-bold p-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="font-bold text-sm text-charcoal font-mono">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="text-gray-500 hover:text-black font-bold p-1"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Main Green Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3.5 px-6 bg-[#4A6B56] hover:bg-[#3D5A47] text-white font-sans font-bold text-sm uppercase tracking-wider rounded-full shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-5 h-5 text-amber-300" />
                    <span>Added To Cart!</span>
                  </>
                ) : (
                  <span>Add to cart - Rs. {totalPrice.toLocaleString("en-IN")}.00</span>
                )}
              </button>

            </div>

          </div>

        </div>
      </div>


      {/* CUSTOM BLOUSE STITCHING MEASUREMENT MODAL */}
      <AnimatePresence>
        {showBlouseModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-lg w-full p-6 text-left shadow-2xl relative border border-stone-200"
            >
              <button
                onClick={() => setShowBlouseModal(false)}
                className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-800 rounded-full hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <Scissors className="w-5 h-5 text-emerald-800" />
                <h3 className="font-serif text-xl font-bold text-charcoal">Custom Blouse Measurements</h3>
              </div>
              <p className="text-xs text-stone-500 mb-4">
                Submit your bespoke sizing parameters for our Banaras master tailors.
              </p>

              {blouseSaved ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
                  <Check className="w-8 h-8 text-emerald-700 mx-auto" />
                  <h4 className="font-bold text-emerald-900 text-sm">Measurement Saved!</h4>
                  <p className="text-xs text-emerald-800">
                    Your custom measurements will be linked to your order upon checkout.
                  </p>
                  <button
                    onClick={() => {
                      setBlouseStitching(true);
                      setShowBlouseModal(false);
                      setBlouseSaved(false);
                    }}
                    className="mt-3 px-6 py-2 bg-emerald-800 text-white rounded-full text-xs font-bold uppercase tracking-wider"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <div className="space-y-4 text-xs font-sans">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-stone-600 font-semibold mb-1">Bust Size (Inches)</label>
                      <input
                        type="text"
                        value={bustSize}
                        onChange={(e) => setBustSize(e.target.value)}
                        className="w-full p-2.5 border border-stone-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-emerald-700"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-600 font-semibold mb-1">Waist Size (Inches)</label>
                      <input
                        type="text"
                        value={waistSize}
                        onChange={(e) => setWaistSize(e.target.value)}
                        className="w-full p-2.5 border border-stone-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-emerald-700"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-stone-600 font-semibold mb-1">Blouse Length (Inches)</label>
                      <input
                        type="text"
                        value={blouseLength}
                        onChange={(e) => setBlouseLength(e.target.value)}
                        className="w-full p-2.5 border border-stone-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-emerald-700"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-600 font-semibold mb-1">Sleeve Length (Inches)</label>
                      <input
                        type="text"
                        value={sleeveLength}
                        onChange={(e) => setSleeveLength(e.target.value)}
                        className="w-full p-2.5 border border-stone-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-emerald-700"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-stone-600 font-semibold mb-1">Neck Style Preference</label>
                    <select
                      value={neckType}
                      onChange={(e) => setNeckType(e.target.value)}
                      className="w-full p-2.5 border border-stone-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-700"
                    >
                      <option value="Sweetheart Neck">Sweetheart Neck (Classic Banarasi)</option>
                      <option value="Deep Boat Neck">Deep Boat Neck</option>
                      <option value="High Collar Royal Neck">High Collar Royal Neck</option>
                      <option value="Round Neck with Dori">Round Neck with Dori & Tassels</option>
                      <option value="Square Neck">Square Cut Neck</option>
                    </select>
                  </div>

                  <button
                    onClick={() => setBlouseSaved(true)}
                    className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold uppercase tracking-wider rounded-xl text-xs transition-all shadow-md mt-2"
                  >
                    Save Measurement Profile
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Go Back Button */}
      <button
        onClick={onClose}
        className="fixed right-5 bottom-6 z-40 px-5 py-3 bg-emerald-950/90 text-amber-200 border border-amber-300/40 backdrop-blur-md rounded-full shadow-2xl hover:bg-black hover:scale-105 active:scale-95 transition-all flex items-center gap-2 text-xs sm:text-sm font-sans font-bold uppercase tracking-wider cursor-pointer"
        title="Go back to previous page"
      >
        <ArrowLeft className="w-4 h-4 text-amber-300" />
        <span>Go Back</span>
      </button>

    </div>
  );
}
