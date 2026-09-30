/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  X, Truck, Scissors, Calendar, ShieldCheck, Camera, HelpCircle, 
  CheckCircle2, Search, Sparkles, Clock, Globe, ShoppingBag, Eye, 
  Star, Heart, Video, Award, FileText, RefreshCw, Gift, MapPin, 
  User, Check, Phone, ArrowRight, MessageSquare
} from "lucide-react";
import { BoutiqueProduct, Order, UserProfile } from "../types";
import { motion, AnimatePresence } from "motion/react";

/* -------------------------------------------------------------------------- */
/* 1. READY TO SHIP SAREES MODAL / VIEW                                      */
/* -------------------------------------------------------------------------- */

interface ReadyToShipModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: BoutiqueProduct[];
  addToCart: (product: BoutiqueProduct) => void;
  isInCart: (id: string) => boolean;
}

export function ReadyToShipModal({
  isOpen,
  onClose,
  products,
  addToCart,
  isInCart,
}: ReadyToShipModalProps) {
  const [pincode, setPincode] = useState("");
  const [deliveryResult, setDeliveryResult] = useState<string | null>(null);

  if (!isOpen) return null;

  const readyProducts = products.filter(p => p.isBestSeller || p.inStock);

  const checkPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode || pincode.length < 5) {
      setDeliveryResult("Please enter a valid 6-digit pincode.");
      return;
    }
    setDeliveryResult(`Eligible for 24-Hour Express Dispatch to ${pincode}! Expected delivery within 2-3 business days.`);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-alta/70 backdrop-blur-md">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-5xl max-h-[90vh] bg-kora rounded-sm shadow-2xl border border-zari/40 overflow-hidden flex flex-col text-charcoal"
        >
          {/* Header */}
          <div className="bg-alta text-kora p-5 flex items-center justify-between border-b border-zari/30">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Truck className="w-4 h-4 text-zari" />
                <span className="text-[10px] font-sans tracking-[0.2em] text-zari uppercase font-bold">
                  EXPRESS DISPATCH GALLERY
                </span>
              </div>
              <h2 className="font-cinzel text-lg md:text-2xl tracking-wider text-kora">
                Ready To Ship Pure Banarasi Silk Sarees
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-kora/70 hover:text-kora hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Express Pincode Bar */}
          <div className="bg-alta/5 p-4 border-b border-zari/20 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs font-serif text-charcoal/80">
              <Clock className="w-4 h-4 text-alta flex-shrink-0" />
              <span>
                <strong>24-Hour Express Dispatch:</strong> All sarees below are physically stocked in our Banaras studio and ready for instant shipping.
              </span>
            </div>
            <form onSubmit={checkPincode} className="flex items-center gap-2 w-full md:w-auto">
              <input 
                type="text" 
                placeholder="Enter Pincode (e.g. 110001)"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="px-3 py-1.5 text-xs bg-white border border-zari/30 rounded-sm focus:outline-none focus:border-alta text-charcoal w-40"
              />
              <button 
                type="submit"
                className="px-3 py-1.5 bg-alta text-kora text-xs font-sans uppercase font-bold tracking-wider rounded-sm hover:bg-alta/90 transition-all whitespace-nowrap"
              >
                Check
              </button>
            </form>
          </div>

          {deliveryResult && (
            <div className="px-5 py-2.5 bg-emerald-50 border-b border-emerald-200 text-emerald-800 text-xs font-sans font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>{deliveryResult}</span>
            </div>
          )}

          {/* Grid Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {readyProducts.map((product) => {
              const inBag = isInCart(product.id);
              return (
                <div 
                  key={product.id}
                  className="group bg-white border border-zari/25 rounded-sm p-3 hover:border-alta/50 transition-all shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[3/4] overflow-hidden rounded-sm mb-3">
                      <img 
                        src={product.image} 
                        alt={product.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 left-2 bg-emerald-700 text-white text-[9px] font-sans uppercase font-bold px-2 py-0.5 rounded-xs tracking-wider flex items-center gap-1 shadow-sm">
                        <Clock className="w-3 h-3" />
                        Dispatches Today
                      </div>
                    </div>
                    <div className="text-[10px] font-sans tracking-widest uppercase text-alta/70 font-bold mb-1">
                      {product.subCategory || "Pure Banarasi Silk"}
                    </div>
                    <h3 className="font-serif text-sm font-semibold text-charcoal mb-2 line-clamp-1">
                      {product.title}
                    </h3>
                  </div>

                  <div className="pt-3 border-t border-zari/15 flex items-center justify-between gap-2">
                    <div>
                      <span className="font-sans text-xs font-bold text-alta">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                      <span className="block text-[9px] text-charcoal/50 font-sans">
                        Free Air Express Delivery
                      </span>
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      className={`px-3 py-1.5 text-[10px] font-sans uppercase font-bold tracking-wider rounded-sm transition-all flex items-center gap-1.5 ${
                        inBag 
                          ? "bg-emerald-800 text-white" 
                          : "bg-alta text-kora hover:bg-alta/90"
                      }`}
                    >
                      {inBag ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-300" />
                          <span>In Bag</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3 h-3 text-zari" />
                          <span>Add To Bag</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Note */}
          <div className="p-4 bg-white/60 border-t border-zari/20 text-center text-xs font-serif text-charcoal/70 flex items-center justify-center gap-4">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-zari" />
              100% Silk Mark Certified
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Globe className="w-4 h-4 text-zari" />
              Worldwide International Express Delivery (DHL/FedEx)
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}


/* -------------------------------------------------------------------------- */
/* 2. CUSTOM BLOUSE & FALL-PIKO TAILORING STUDIO MODAL                       */
/* -------------------------------------------------------------------------- */

interface CustomTailoringModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: BoutiqueProduct | null;
}

export function CustomTailoringModal({
  isOpen,
  onClose,
  product,
}: CustomTailoringModalProps) {
  const [finishingOption, setFinishingOption] = useState<"standard" | "fall_piko" | "complete_set">("fall_piko");
  const [blouseStitching, setBlouseStitching] = useState<"unstitched" | "standard" | "custom">("standard");
  const [standardSize, setStandardSize] = useState("M");
  const [neckStyle, setNeckStyle] = useState("Sweetheart");
  const [isPadded, setIsPadded] = useState(true);
  const [bustSize, setBustSize] = useState("36");
  const [waistSize, setWaistSize] = useState("30");
  const [blouseLength, setBlouseLength] = useState("14");
  const [notes, setNotes] = useState("");
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 2500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-alta/70 backdrop-blur-md">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-3xl max-h-[90vh] bg-kora rounded-sm shadow-2xl border border-zari/40 overflow-hidden flex flex-col text-charcoal"
        >
          {/* Header */}
          <div className="bg-alta text-kora p-5 flex items-center justify-between border-b border-zari/30">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Scissors className="w-4 h-4 text-zari" />
                <span className="text-[10px] font-sans tracking-[0.2em] text-zari uppercase font-bold">
                  CUSTOM ATELIER TAILORING
                </span>
              </div>
              <h2 className="font-cinzel text-lg md:text-2xl tracking-wider text-kora">
                Blouse Tailoring & Fall-Piko Studio
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-kora/70 hover:text-kora hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6">
            
            {product && (
              <div className="bg-white p-3 border border-zari/20 rounded-sm flex items-center gap-4">
                <img src={product.image} alt={product.title} className="w-12 h-16 object-cover rounded-xs" />
                <div>
                  <span className="text-[10px] uppercase font-sans font-bold text-alta">Selected Saree</span>
                  <h4 className="font-serif text-sm font-semibold text-charcoal">{product.title}</h4>
                </div>
              </div>
            )}

            {/* 1. Saree Finishing */}
            <div>
              <label className="block text-xs font-sans font-bold uppercase tracking-wider text-charcoal mb-3">
                1. Saree Finishing & Edging
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div 
                  onClick={() => setFinishingOption("standard")}
                  className={`p-3 border rounded-sm cursor-pointer transition-all ${
                    finishingOption === "standard" 
                      ? "border-alta bg-alta/5 text-alta font-bold" 
                      : "border-zari/25 hover:border-alta/50 bg-white"
                  }`}
                >
                  <span className="block text-xs font-serif font-bold">Unfinished Saree</span>
                  <span className="block text-[10px] text-charcoal/60 mt-1">Raw hem edges (Free)</span>
                </div>

                <div 
                  onClick={() => setFinishingOption("fall_piko")}
                  className={`p-3 border rounded-sm cursor-pointer transition-all ${
                    finishingOption === "fall_piko" 
                      ? "border-alta bg-alta/5 text-alta font-bold" 
                      : "border-zari/25 hover:border-alta/50 bg-white"
                  }`}
                >
                  <span className="block text-xs font-serif font-bold">Hand Fall & Piko Edging</span>
                  <span className="block text-[10px] text-charcoal/60 mt-1">Cotton Fall + Thread Piko (+₹350)</span>
                </div>

                <div 
                  onClick={() => setFinishingOption("complete_set")}
                  className={`p-3 border rounded-sm cursor-pointer transition-all ${
                    finishingOption === "complete_set" 
                      ? "border-alta bg-alta/5 text-alta font-bold" 
                      : "border-zari/25 hover:border-alta/50 bg-white"
                  }`}
                >
                  <span className="block text-xs font-serif font-bold">Fall + Piko + Satin Petticoat</span>
                  <span className="block text-[10px] text-charcoal/60 mt-1">Color-matched satin underskirt (+₹1,150)</span>
                </div>
              </div>
            </div>

            {/* 2. Blouse Stitching */}
            <div>
              <label className="block text-xs font-sans font-bold uppercase tracking-wider text-charcoal mb-3">
                2. Blouse Stitching Option
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                <div 
                  onClick={() => setBlouseStitching("unstitched")}
                  className={`p-3 border rounded-sm cursor-pointer transition-all ${
                    blouseStitching === "unstitched" 
                      ? "border-alta bg-alta/5 text-alta font-bold" 
                      : "border-zari/25 hover:border-alta/50 bg-white"
                  }`}
                >
                  <span className="block text-xs font-serif font-bold">Unstitched Blouse Piece</span>
                  <span className="block text-[10px] text-charcoal/60 mt-1">Includes 0.9m unstitched brocade (Free)</span>
                </div>

                <div 
                  onClick={() => setBlouseStitching("standard")}
                  className={`p-3 border rounded-sm cursor-pointer transition-all ${
                    blouseStitching === "standard" 
                      ? "border-alta bg-alta/5 text-alta font-bold" 
                      : "border-zari/25 hover:border-alta/50 bg-white"
                  }`}
                >
                  <span className="block text-xs font-serif font-bold">Standard Size Stitching</span>
                  <span className="block text-[10px] text-charcoal/60 mt-1">S, M, L, XL (+₹1,200)</span>
                </div>

                <div 
                  onClick={() => setBlouseStitching("custom")}
                  className={`p-3 border rounded-sm cursor-pointer transition-all ${
                    blouseStitching === "custom" 
                      ? "border-alta bg-alta/5 text-alta font-bold" 
                      : "border-zari/25 hover:border-alta/50 bg-white"
                  }`}
                >
                  <span className="block text-xs font-serif font-bold">Bespoke Custom Measurements</span>
                  <span className="block text-[10px] text-charcoal/60 mt-1">Tailored to exact inch dimensions (+₹1,800)</span>
                </div>
              </div>

              {/* Options for Standard / Custom */}
              {blouseStitching !== "unstitched" && (
                <div className="p-4 bg-white border border-zari/30 rounded-sm space-y-4">
                  
                  {blouseStitching === "standard" ? (
                    <div>
                      <label className="block text-[11px] font-sans font-bold uppercase text-charcoal mb-2">
                        Select Standard Size
                      </label>
                      <div className="flex gap-3">
                        {["S (34\")", "M (36\")", "L (38\")", "XL (40\")", "2XL (42\")"].map((size) => (
                          <button
                            key={size}
                            type="button"
                            onClick={() => setStandardSize(size)}
                            className={`px-3 py-1.5 text-xs font-sans rounded-sm border transition-all ${
                              standardSize === size
                                ? "bg-alta text-kora border-alta font-bold"
                                : "bg-white border-zari/40 text-charcoal"
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[10px] font-sans font-bold uppercase text-charcoal mb-1">
                          Bust Size (Inches)
                        </label>
                        <input 
                          type="number" 
                          value={bustSize} 
                          onChange={(e) => setBustSize(e.target.value)}
                          className="w-full px-3 py-1.5 text-xs bg-white border border-zari/30 rounded-sm"
                          placeholder="e.g. 36"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-sans font-bold uppercase text-charcoal mb-1">
                          Underbust Waist (Inches)
                        </label>
                        <input 
                          type="number" 
                          value={waistSize} 
                          onChange={(e) => setWaistSize(e.target.value)}
                          className="w-full px-3 py-1.5 text-xs bg-white border border-zari/30 rounded-sm"
                          placeholder="e.g. 30"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-sans font-bold uppercase text-charcoal mb-1">
                          Blouse Length (Inches)
                        </label>
                        <input 
                          type="number" 
                          value={blouseLength} 
                          onChange={(e) => setBlouseLength(e.target.value)}
                          className="w-full px-3 py-1.5 text-xs bg-white border border-zari/30 rounded-sm"
                          placeholder="e.g. 14"
                        />
                      </div>
                    </div>
                  )}

                  {/* Neckline & Padding */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-zari/15">
                    <div>
                      <label className="block text-[10px] font-sans font-bold uppercase text-charcoal mb-1">
                        Neckline Cut
                      </label>
                      <select 
                        value={neckStyle}
                        onChange={(e) => setNeckStyle(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-zari/30 rounded-sm text-charcoal font-serif"
                      >
                        <option value="Sweetheart">Classic Royal Sweetheart Neck</option>
                        <option value="Boat Neck">High Boat Neck with Brocade</option>
                        <option value="Deep V">Deep V-Neck with Dori Tassels</option>
                        <option value="Round">Traditional Round Neck</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-sans font-bold uppercase text-charcoal mb-1">
                        Padded Cups Option
                      </label>
                      <div className="flex gap-3 pt-1">
                        <label className="flex items-center gap-1.5 text-xs font-serif cursor-pointer">
                          <input 
                            type="radio" 
                            name="padded" 
                            checked={isPadded} 
                            onChange={() => setIsPadded(true)} 
                          />
                          <span>Padded Cups (+ ₹200)</span>
                        </label>
                        <label className="flex items-center gap-1.5 text-xs font-serif cursor-pointer">
                          <input 
                            type="radio" 
                            name="padded" 
                            checked={!isPadded} 
                            onChange={() => setIsPadded(false)} 
                          />
                          <span>Non-Padded Classic</span>
                        </label>
                      </div>
                    </div>
                  </div>

                </div>
              )}
            </div>

            {/* Custom Notes */}
            <div>
              <label className="block text-xs font-sans font-bold uppercase tracking-wider text-charcoal mb-1">
                Special Tailoring Notes / Instructions
              </label>
              <textarea 
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g., Include latkan tassels, elbow-length sleeves with zari border..."
                className="w-full p-3 text-xs bg-white border border-zari/30 rounded-sm focus:outline-none focus:border-alta font-serif text-charcoal"
              />
            </div>

            {savedSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-sans font-bold text-center rounded-sm flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Custom Tailoring Preferences Saved! Applying to your order.</span>
              </div>
            )}

            {/* Submit */}
            <div className="pt-2 flex justify-end gap-3 border-t border-zari/20">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 border border-zari/40 text-charcoal text-xs font-sans uppercase font-bold tracking-wider rounded-sm hover:bg-black/5"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-alta text-kora text-xs font-sans uppercase font-bold tracking-widest rounded-sm hover:bg-alta/90 transition-all flex items-center gap-2 shadow-md"
              >
                <Scissors className="w-4 h-4 text-zari" />
                <span>Save Tailoring Preferences</span>
              </button>
            </div>

          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}


/* -------------------------------------------------------------------------- */
/* 3. TRACK YOUR ORDER LIVE MODAL                                            */
/* -------------------------------------------------------------------------- */

interface TrackOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn?: boolean;
  userProfile?: UserProfile | null;
  orders?: Order[];
  onOpenAuth?: () => void;
  onOpenBoutique?: () => void;
}

export function TrackOrderModal({ 
  isOpen, 
  onClose,
  isLoggedIn = false,
  userProfile = null,
  orders = [],
  onOpenAuth,
  onOpenBoutique,
}: TrackOrderModalProps) {
  const [orderQuery, setOrderQuery] = useState("");
  const [searchedOrder, setSearchedOrder] = useState<any | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  if (!isOpen) return null;

  // Build automatic orders for logged-in user
  const userOrdersList = [...orders];

  // If user is logged in, but orders array from state is empty, provide a default active order for their account
  if (isLoggedIn && userOrdersList.length === 0) {
    userOrdersList.push({
      id: "IRA-98241",
      date: "July 25, 2026",
      items: [
        {
          product: {
            id: "p1",
            title: "Crimson Red Pure Katan Silk Benarasi Saree",
            price: 34500,
            image: "https://i.pinimg.com/1200x/12/c1/85/12c18577097b2bb2ecf1cb10e2fb67ec.jpg",
            secondaryImage: "",
            description: "Handwoven pure Katan silk with gold kadwa zari work.",
            threadCount: "220 PPI",
            category: "Sarees",
            artisanName: "Master Craftsman Kabir Ansari",
            motifsUsed: ["Bel", "Paisley"]
          },
          quantity: 1
        }
      ],
      subtotal: 34500,
      discount: 3450,
      shippingFee: 0,
      total: 31050,
      shippingAddress: userProfile?.addresses?.[0] || {
        id: "a1",
        fullName: userProfile?.name || "Valued Client",
        phone: userProfile?.phone || "+91 98000 00000",
        streetAddress: "Luxa Road",
        locality: "Godowlia",
        city: "Varanasi",
        state: "Uttar Pradesh",
        pincode: "221001",
        addressType: "Home"
      },
      paymentMethod: "UPI",
      paymentStatus: "PAID",
      orderStatus: "DISPATCHED",
      trackingNumber: "BD-981248012",
      estimatedDeliveryDate: "July 28, 2026"
    });
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    if (!orderQuery.trim()) return;

    setSearchedOrder({
      orderId: orderQuery.toUpperCase().startsWith("IRA-") ? orderQuery.toUpperCase() : `IRA-${orderQuery}`,
      date: "July 24, 2026",
      status: "Dispatched & In Transit",
      courier: "Bluedart Air Express",
      awb: "BD-981248012",
      estimatedDelivery: "July 28, 2026",
      destination: "India Express Delivery",
      items: ["Pure Benarasi Silk Saree", "Hand Fall & Piko Finishing"],
      timeline: [
        { label: "Order Placed & Confirmed", date: "July 24 • 10:30 AM", done: true },
        { label: "Silk Mark Authenticity Verification", date: "July 24 • 02:15 PM", done: true },
        { label: "Hand Fall & Piko Finishing Stitched", date: "July 25 • 11:00 AM", done: true },
        { label: "Handed over to Bluedart Air Courier", date: "July 25 • 04:30 PM", done: true },
        { label: "Out for Doorstep Delivery", date: "Expected July 28", done: false },
      ]
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-3xl bg-kora rounded-sm shadow-2xl border border-zari/40 overflow-hidden flex flex-col text-charcoal silk-texture"
        >
          {/* Header */}
          <div className="bg-alta text-kora p-5 flex items-center justify-between border-b border-zari/30">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Truck className="w-4 h-4 text-zari" />
                <span className="text-[10px] font-sans tracking-[0.2em] text-zari uppercase font-bold">
                  CONCIERGE ORDER LOGISTICS
                </span>
              </div>
              <h2 className="font-cinzel text-lg md:text-2xl tracking-wider text-kora">
                {isLoggedIn ? "My Orders & Live Tracking" : "Live Shipment Order Tracking"}
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-kora/70 hover:text-kora hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              title="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6 overflow-y-auto max-h-[82vh]">

            {/* LOGGED IN USER VIEW - AUTOMATICALLY SHOWS ORDERS */}
            {isLoggedIn ? (
              <div className="space-y-5">
                <div className="bg-emerald-900/10 border border-emerald-800/30 p-4 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-sans">
                  <div className="flex items-center gap-2.5">
                    <User className="w-4 h-4 text-emerald-800 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-emerald-950 uppercase tracking-wider text-[11px]">
                        Welcome back, {userProfile?.name || "Client"}
                      </p>
                      <p className="text-emerald-900/80 text-[11px]">
                        Your orders are automatically tracked live below without needing any Order ID.
                      </p>
                    </div>
                  </div>
                  {onOpenBoutique && (
                    <button
                      onClick={() => {
                        onClose();
                        onOpenBoutique();
                      }}
                      className="px-3.5 py-1.5 bg-emerald-950 text-amber-200 hover:bg-black font-sans text-[10px] font-bold uppercase tracking-wider rounded-xs transition-all flex items-center gap-1.5 flex-shrink-0 cursor-pointer shadow-xs"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-amber-300" />
                      <span>Browse Saree Collection</span>
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  <h3 className="font-serif text-sm font-bold text-alta uppercase tracking-wider flex items-center gap-2">
                    <Truck className="w-4 h-4 text-zari" />
                    <span>Your Active Orders ({userOrdersList.length})</span>
                  </h3>

                  {userOrdersList.map((ord: Order) => (
                    <div key={ord.id} className="bg-white p-5 border border-zari/30 rounded-sm space-y-4 shadow-sm">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-3 border-b border-zari/20 gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-sans uppercase font-bold text-alta">Order ID:</span>
                            <span className="font-cinzel text-base font-bold text-charcoal">{ord.id}</span>
                          </div>
                          <span className="text-[10px] font-sans text-charcoal/60">Placed on {ord.date}</span>
                        </div>
                        <div className="text-left sm:text-right">
                          <span className="text-[10px] font-sans uppercase text-emerald-800 font-bold bg-emerald-50 px-3 py-1 rounded-xs border border-emerald-300 inline-block">
                            {ord.orderStatus || "DISPATCHED"}
                          </span>
                          <span className="block text-[10px] font-sans text-charcoal/70 mt-1 font-mono">
                            AWB: {ord.trackingNumber || "BD-981248012"} (Bluedart Express)
                          </span>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="space-y-2">
                        {ord.items.map((it, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs font-serif bg-kora/40 p-2.5 rounded-xs border border-zari/10">
                            <div className="flex items-center gap-3">
                              {it.product.image && (
                                <img src={it.product.image} alt={it.product.title} className="w-10 h-12 object-cover rounded-xs border border-zari/20" />
                              )}
                              <div>
                                <h4 className="font-medium text-charcoal">{it.product.title}</h4>
                                <p className="text-[10px] font-sans text-charcoal/60">Qty: {it.quantity} • Pure Silk Mark Authenticated</p>
                              </div>
                            </div>
                            <span className="font-sans font-bold text-alta">₹{it.product.price?.toLocaleString("en-IN")}</span>
                          </div>
                        ))}
                      </div>

                      {/* Total & Delivery Address */}
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center text-xs font-sans bg-alta/5 p-3 rounded-xs border border-zari/20 gap-2">
                        <div>
                          <span className="text-[10px] text-charcoal/60 uppercase font-bold block">Delivery Address</span>
                          <span className="font-serif text-charcoal">{ord.shippingAddress?.fullName}, {ord.shippingAddress?.city}, {ord.shippingAddress?.pincode}</span>
                        </div>
                        <div className="text-left sm:text-right">
                          <span className="text-[10px] text-charcoal/60 uppercase font-bold block">Total Amount ({ord.paymentStatus})</span>
                          <span className="font-sans font-bold text-alta text-sm">₹{ord.total?.toLocaleString("en-IN")}</span>
                        </div>
                      </div>

                      {/* Live Logistics Timeline */}
                      <div className="pt-2">
                        <h4 className="text-[10px] font-sans uppercase font-bold tracking-wider text-charcoal/70 mb-3 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-zari" />
                          <span>Loom & Express Logistics Timeline</span>
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-[10px] font-sans">
                          <div className="bg-emerald-50 border border-emerald-200 p-2 rounded-xs text-center">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mx-auto mb-1" />
                            <span className="font-bold text-emerald-950 block">Order Placed</span>
                            <span className="text-emerald-800/70 text-[9px]">Confirmed</span>
                          </div>
                          <div className="bg-emerald-50 border border-emerald-200 p-2 rounded-xs text-center">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 mx-auto mb-1" />
                            <span className="font-bold text-emerald-950 block">Silk Inspection</span>
                            <span className="text-emerald-800/70 text-[9px]">Authenticity Verified</span>
                          </div>
                          <div className="bg-emerald-50 border border-emerald-200 p-2 rounded-xs text-center">
                            <Scissors className="w-3.5 h-3.5 text-emerald-600 mx-auto mb-1" />
                            <span className="font-bold text-emerald-950 block">Fall & Piko</span>
                            <span className="text-emerald-800/70 text-[9px]">Finished</span>
                          </div>
                          <div className="bg-emerald-50 border border-emerald-200 p-2 rounded-xs text-center">
                            <Truck className="w-3.5 h-3.5 text-emerald-600 mx-auto mb-1" />
                            <span className="font-bold text-emerald-950 block">Courier Dispatched</span>
                            <span className="text-emerald-800/70 text-[9px]">Bluedart Express</span>
                          </div>
                          <div className="bg-amber-50 border border-amber-200 p-2 rounded-xs text-center">
                            <Clock className="w-3.5 h-3.5 text-amber-700 mx-auto mb-1" />
                            <span className="font-bold text-amber-950 block">Doorstep Arrival</span>
                            <span className="text-amber-800/80 text-[9px]">Est. {ord.estimatedDeliveryDate || "July 28"}</span>
                          </div>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* LOGGED OUT / GUEST VIEW */
              <div className="space-y-5">
                {/* Login Prompt Banner */}
                <div className="bg-amber-50 border border-amber-300/60 p-4 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-sans shadow-xs">
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-amber-800 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-amber-950 uppercase tracking-wider text-[11px]">
                        Log in for Instant Order Tracking
                      </p>
                      <p className="text-amber-900/80 text-[11px]">
                        When logged in, all your saree orders automatically show here without needing any tracking ID.
                      </p>
                    </div>
                  </div>
                  {onOpenAuth && (
                    <button
                      onClick={() => {
                        onClose();
                        onOpenAuth();
                      }}
                      className="px-4 py-2 bg-alta text-kora hover:bg-black font-sans text-xs font-bold uppercase tracking-wider rounded-xs transition-all flex items-center gap-1.5 flex-shrink-0 cursor-pointer shadow-xs"
                    >
                      <User className="w-3.5 h-3.5 text-amber-300" />
                      <span>Log In Now</span>
                    </button>
                  )}
                </div>

                <div className="border-t border-zari/20 pt-4">
                  <span className="text-[10px] font-sans uppercase font-bold text-charcoal/70 mb-2 block">
                    Or Search Manually as Guest
                  </span>
                  <form onSubmit={handleSearch} className="flex gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-3 w-4 h-4 text-charcoal/40" />
                      <input 
                        type="text" 
                        value={orderQuery}
                        onChange={(e) => setOrderQuery(e.target.value)}
                        placeholder="Enter Order ID (e.g. HOA-98234) or Mobile No."
                        className="w-full pl-9 pr-3 py-2.5 text-xs bg-white border border-zari/30 rounded-sm focus:outline-none focus:border-alta text-charcoal font-sans"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-alta text-kora text-xs font-sans font-bold uppercase tracking-wider rounded-sm hover:bg-alta/90 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Track Order</span>
                    </button>
                  </form>
                </div>

                {/* Results for manual guest lookup */}
                {searchedOrder && (
                  <div className="bg-white p-5 border border-zari/30 rounded-sm space-y-5">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-4 border-b border-zari/20 gap-2">
                      <div>
                        <span className="text-[10px] font-sans uppercase font-bold text-alta">Order Reference</span>
                        <h3 className="font-cinzel text-lg font-bold text-charcoal">{searchedOrder.orderId}</h3>
                      </div>
                      <div className="text-left sm:text-right">
                        <span className="text-[10px] font-sans uppercase text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-xs border border-emerald-200">
                          {searchedOrder.status}
                        </span>
                        <span className="block text-[10px] font-sans text-charcoal/60 mt-1">
                          AWB: {searchedOrder.awb} ({searchedOrder.courier})
                        </span>
                      </div>
                    </div>

                    <div className="p-3 bg-alta/5 border border-zari/20 rounded-sm flex items-center justify-between text-xs font-serif">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-alta" />
                        <span>Estimated Doorstep Arrival: <strong>{searchedOrder.estimatedDelivery}</strong></span>
                      </div>
                      <span className="text-[10px] uppercase font-sans font-bold text-charcoal/60">{searchedOrder.destination}</span>
                    </div>

                    <div>
                      <h4 className="text-[10px] font-sans uppercase font-bold tracking-wider text-charcoal/70 mb-3">
                        Loom & Logistics Timeline
                      </h4>
                      <div className="space-y-4 relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-zari/30">
                        {searchedOrder.timeline.map((step: any, idx: number) => (
                          <div key={idx} className="relative flex items-start justify-between text-xs">
                            <div className={`absolute -left-[23px] top-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center ${
                              step.done ? "bg-emerald-600 text-white" : "bg-kora border border-zari text-transparent"
                            }`}>
                              {step.done && <Check className="w-2.5 h-2.5" />}
                            </div>
                            <div>
                              <p className={`font-serif ${step.done ? "text-charcoal font-semibold" : "text-charcoal/50"}`}>
                                {step.label}
                              </p>
                            </div>
                            <span className="text-[10px] font-sans text-charcoal/50">{step.date}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {hasSearched && !searchedOrder && (
                  <div className="p-6 text-center text-xs font-serif text-charcoal/60 bg-white border border-zari/20 rounded-sm">
                    No active order found for "{orderQuery}". Please check your order ID or contact WhatsApp support (+91 98000 00000).
                  </div>
                )}
              </div>
            )}

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}


/* -------------------------------------------------------------------------- */
/* 4. VIRTUAL VIDEO SHOPPING APPOINTMENT MODAL                                */
/* -------------------------------------------------------------------------- */

interface VirtualVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VirtualVideoModal({ isOpen, onClose }: VirtualVideoModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("2026-07-27");
  const [timeSlot, setTimeSlot] = useState("11:00 AM IST");
  const [sareeType, setSareeType] = useState("Bridal Pure Katan Silk");
  const [language, setLanguage] = useState("English");
  const [booked, setBooked] = useState(false);

  if (!isOpen) return null;

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setBooked(true);
    setTimeout(() => {
      setBooked(false);
      onClose();
    }, 3000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-alta/70 backdrop-blur-md">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-xl bg-kora rounded-sm shadow-2xl border border-zari/40 overflow-hidden flex flex-col text-charcoal"
        >
          {/* Header */}
          <div className="bg-alta text-kora p-5 flex items-center justify-between border-b border-zari/30">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Video className="w-4 h-4 text-zari" />
                <span className="text-[10px] font-sans tracking-[0.2em] text-zari uppercase font-bold">
                  LIVE BANARAS STUDIO PREVIEW
                </span>
              </div>
              <h2 className="font-cinzel text-lg md:text-2xl tracking-wider text-kora">
                Book Virtual Video Shopping
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-kora/70 hover:text-kora hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleBook} className="p-6 space-y-4 overflow-y-auto max-h-[80vh]">
            <p className="text-xs font-serif text-charcoal/80 leading-relaxed border-l-2 border-zari pl-3">
              Experience a 1-on-1 private video preview via WhatsApp or FaceTime directly from our Godowlia Banaras studio. Our master curating team will present draping, metallic shimmer, and silk weight in live detail.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-sans font-bold uppercase text-charcoal mb-1">Your Full Name</label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ananya Sharma"
                  className="w-full px-3 py-2 text-xs bg-white border border-zari/30 rounded-sm"
                />
              </div>

              <div>
                <label className="block text-[10px] font-sans font-bold uppercase text-charcoal mb-1">WhatsApp / Phone Number</label>
                <input 
                  type="text" 
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98300 00000"
                  className="w-full px-3 py-2 text-xs bg-white border border-zari/30 rounded-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-sans font-bold uppercase text-charcoal mb-1">Preferred Date</label>
                <input 
                  type="date" 
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-zari/30 rounded-sm text-charcoal"
                />
              </div>

              <div>
                <label className="block text-[10px] font-sans font-bold uppercase text-charcoal mb-1">Preferred Time Slot</label>
                <select 
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-zari/30 rounded-sm text-charcoal font-serif"
                >
                  <option value="11:00 AM IST">11:00 AM IST (Morning)</option>
                  <option value="02:30 PM IST">02:30 PM IST (Afternoon)</option>
                  <option value="05:00 PM IST">05:00 PM IST (Evening)</option>
                  <option value="08:00 PM IST">08:00 PM IST (US / Europe Evening)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-sans font-bold uppercase text-charcoal mb-1">Saree Collection Interest</label>
                <select 
                  value={sareeType}
                  onChange={(e) => setSareeType(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-zari/30 rounded-sm text-charcoal font-serif"
                >
                  <option value="Bridal Pure Katan Silk">Bridal Pure Katan Silk Sarees</option>
                  <option value="Khaddi Georgette Meenakari">Khaddi Georgette Meenakari</option>
                  <option value="Golden Tissue Silk Brocade">Golden Tissue Silk Brocade</option>
                  <option value="Pastel Festive Weaves">Pastel Festive Weaves</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-sans font-bold uppercase text-charcoal mb-1">Preferred Language</label>
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-zari/30 rounded-sm text-charcoal font-serif"
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Bengali">Bengali</option>
                  <option value="Tamil">Tamil / Telugu</option>
                </select>
              </div>
            </div>

            {booked && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-sans font-bold text-center rounded-sm flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Appointment Confirmed! Our Banaras concierge will message you on WhatsApp ({phone}) at {timeSlot}.</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-alta text-kora text-xs font-sans uppercase font-bold tracking-widest rounded-sm hover:bg-alta/90 transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <Calendar className="w-4 h-4 text-zari" />
              <span>Confirm Video Appointment</span>
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}


/* -------------------------------------------------------------------------- */
/* 5. SILK MARK & SAREE CARE GUIDE MODAL                                      */
/* -------------------------------------------------------------------------- */

interface SilkCareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SilkCareModal({ isOpen, onClose }: SilkCareModalProps) {
  const [silkCode, setSilkCode] = useState("");
  const [verifiedResult, setVerifiedResult] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!silkCode.trim()) return;
    setVerifiedResult(`Certified Genuine Silk Mark Code [${silkCode.toUpperCase()}]: Issued by Silk Mark Organisation of India to Iraaya (Wazir & Co) for 100% Pure Natural Mulberry Silk.`);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-alta/70 backdrop-blur-md">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-3xl bg-kora rounded-sm shadow-2xl border border-zari/40 overflow-hidden flex flex-col text-charcoal"
        >
          {/* Header */}
          <div className="bg-alta text-kora p-5 flex items-center justify-between border-b border-zari/30">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="w-4 h-4 text-zari" />
                <span className="text-[10px] font-sans tracking-[0.2em] text-zari uppercase font-bold">
                  AUTHENTICITY & HERITAGE CARE
                </span>
              </div>
              <h2 className="font-cinzel text-lg md:text-2xl tracking-wider text-kora">
                Silk Mark Certification & Care Guide
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-kora/70 hover:text-kora hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6 overflow-y-auto max-h-[80vh]">
            
            {/* Silk Mark Verification Box */}
            <div className="bg-white p-5 border border-zari/30 rounded-sm space-y-3">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-alta" />
                <h3 className="font-cinzel text-base font-bold text-charcoal">Verify Silk Mark Tag Code</h3>
              </div>
              <p className="text-xs font-serif text-charcoal/70 leading-relaxed">
                Every Iraaya saree arrives tagged with an official Silk Mark security QR hologram card authorized by the Ministry of Textiles, Govt of India.
              </p>
              <form onSubmit={handleVerify} className="flex gap-2 pt-1">
                <input 
                  type="text" 
                  value={silkCode}
                  onChange={(e) => setSilkCode(e.target.value)}
                  placeholder="Enter Silk Mark Code (e.g. SM-BNR-98214)"
                  className="flex-1 px-3 py-2 text-xs bg-kora border border-zari/30 rounded-sm font-sans uppercase"
                />
                <button type="submit" className="px-4 py-2 bg-alta text-kora text-xs font-sans font-bold uppercase rounded-sm hover:bg-alta/90">
                  Verify Tag
                </button>
              </form>

              {verifiedResult && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-sans rounded-sm mt-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{verifiedResult}</span>
                </div>
              )}
            </div>

            {/* Saree Care Instructions */}
            <div className="space-y-4">
              <h3 className="font-cinzel text-lg font-bold text-charcoal border-b border-zari/20 pb-2">
                Preserving Your Heirloom Silk Saree
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-serif text-charcoal/80">
                <div className="p-4 bg-white border border-zari/20 rounded-sm space-y-1.5">
                  <strong className="text-alta font-sans uppercase text-[10px] block">1. Dry Clean Only</strong>
                  <p>Never wash handwoven pure silk in water. Always entrust your Banarasi sarees to professional dry cleaners experienced with metallic zari.</p>
                </div>

                <div className="p-4 bg-white border border-zari/20 rounded-sm space-y-1.5">
                  <strong className="text-alta font-sans uppercase text-[10px] block">2. Cotton Muslin Bag Storage</strong>
                  <p>Store your saree in soft unbleached cotton muslin bags. Avoid plastic bags that trap humidity and tarnish gold/silver zari threads.</p>
                </div>

                <div className="p-4 bg-white border border-zari/20 rounded-sm space-y-1.5">
                  <strong className="text-alta font-sans uppercase text-[10px] block">3. Refold Periodically</strong>
                  <p>Unfold and change the fold lines of your saree every 3 months to prevent permanent friction stress along heavy brocade seams.</p>
                </div>

                <div className="p-4 bg-white border border-zari/20 rounded-sm space-y-1.5">
                  <strong className="text-alta font-sans uppercase text-[10px] block">4. Perfume Protection</strong>
                  <p>Spray perfumes and sprays prior to draping. Never apply perfume directly onto gold metallic zari or pure silk yarns.</p>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}


/* -------------------------------------------------------------------------- */
/* 6. REAL BRIDES & TESTIMONIALS SHOWCASE MODAL                              */
/* -------------------------------------------------------------------------- */

interface RealBridesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenConsultation: () => void;
}

export function RealBridesModal({ isOpen, onClose, onOpenConsultation }: RealBridesModalProps) {
  if (!isOpen) return null;

  const brides = [
    {
      name: "Dr. Riddhima & Akash",
      location: "Royal Wedding at Umaid Bhawan, Jodhpur",
      saree: "Pure Katan Silk Kadwa Brocade Saree in Vermilion Red",
      image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop",
      quote: "The weight and shine of pure Banarasi gold zari from Iraaya made my bridal entry unforgettable. Every guest asked about the authentic handloom texture!"
    },
    {
      name: "Ananya & Dev",
      location: "Bridal Ceremony in London, UK",
      saree: "Pastel Lavender Khaddi Georgette Meenakari Saree",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop",
      quote: "Custom blouse stitching and express international shipping were seamless! The pastel lavender drape was light as air and held its shape gracefully."
    },
    {
      name: "Meera & Siddharth",
      location: "Heritage Destination Wedding in Udaipur",
      saree: "Golden Tissue Silk Shikargah Brocade Saree",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
      quote: "We commissioned a bespoke court hunting motif with Master Anwar Wazir. Wearing an authentic loom heirloom handcrafted just for us was purely magical."
    }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-alta/70 backdrop-blur-md">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-kora rounded-sm shadow-2xl border border-zari/40 overflow-hidden flex flex-col text-charcoal"
        >
          {/* Header */}
          <div className="bg-alta text-kora p-5 flex items-center justify-between border-b border-zari/30">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Heart className="w-4 h-4 text-zari fill-zari" />
                <span className="text-[10px] font-sans tracking-[0.2em] text-zari uppercase font-bold">
                  PATRON BRIDAL GALLERY
                </span>
              </div>
              <h2 className="font-cinzel text-lg md:text-2xl tracking-wider text-kora">
                Iraaya Real Brides
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-kora/70 hover:text-kora hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6 overflow-y-auto max-h-[80vh]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {brides.map((b, idx) => (
                <div key={idx} className="bg-white border border-zari/25 rounded-sm overflow-hidden flex flex-col justify-between shadow-sm">
                  <div>
                    <div className="h-64 overflow-hidden relative">
                      <img src={b.image} alt={b.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <span className="absolute bottom-3 left-3 text-white text-xs font-serif font-bold">{b.name}</span>
                    </div>
                    <div className="p-4 space-y-2">
                      <span className="text-[10px] font-sans uppercase font-bold text-alta tracking-wider block">{b.location}</span>
                      <p className="font-serif text-xs italic text-charcoal/80 leading-relaxed">
                        "{b.quote}"
                      </p>
                    </div>
                  </div>
                  <div className="p-4 bg-alta/5 border-t border-zari/15 text-[10px] font-sans text-charcoal/70">
                    <strong>Wore:</strong> {b.saree}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 bg-alta text-kora rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-cinzel text-base text-zari font-bold">Planning Your Bridal Trousseau?</h4>
                <p className="text-xs font-serif text-kora/80">Commission custom loom weaving or book an exclusive consultation with our Banaras studio.</p>
              </div>
              <button 
                onClick={() => {
                  onClose();
                  onOpenConsultation();
                }}
                className="px-5 py-2.5 bg-zari text-alta text-xs font-sans font-bold uppercase tracking-wider rounded-sm hover:bg-zari/90 transition-all whitespace-nowrap"
              >
                Book Bridal Consultation
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}


/* -------------------------------------------------------------------------- */
/* 7. STORE POLICIES & FAQS MODAL                                            */
/* -------------------------------------------------------------------------- */

interface StorePoliciesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function StorePoliciesModal({ isOpen, onClose }: StorePoliciesModalProps) {
  const [activeTab, setActiveTab] = useState<"shipping" | "returns" | "faq">("shipping");

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-alta/70 backdrop-blur-md">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-3xl bg-kora rounded-sm shadow-2xl border border-zari/40 overflow-hidden flex flex-col text-charcoal"
        >
          {/* Header */}
          <div className="bg-alta text-kora p-5 flex items-center justify-between border-b border-zari/30">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Globe className="w-4 h-4 text-zari" />
                <span className="text-[10px] font-sans tracking-[0.2em] text-zari uppercase font-bold">
                  BOUTIQUE LOGISTICS & POLICIES
                </span>
              </div>
              <h2 className="font-cinzel text-lg md:text-2xl tracking-wider text-kora">
                Shipping, Returns & FAQs
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-kora/70 hover:text-kora hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Tabs */}
          <div className="flex border-b border-zari/20 bg-white text-xs font-sans font-bold uppercase tracking-wider">
            <button 
              onClick={() => setActiveTab("shipping")}
              className={`flex-1 py-3 text-center transition-all border-b-2 ${
                activeTab === "shipping" 
                  ? "border-alta text-alta bg-alta/5" 
                  : "border-transparent text-charcoal/60 hover:text-charcoal"
              }`}
            >
              Express Worldwide Shipping
            </button>
            <button 
              onClick={() => setActiveTab("returns")}
              className={`flex-1 py-3 text-center transition-all border-b-2 ${
                activeTab === "returns" 
                  ? "border-alta text-alta bg-alta/5" 
                  : "border-transparent text-charcoal/60 hover:text-charcoal"
              }`}
            >
              7-Day Returns & Exchange
            </button>
            <button 
              onClick={() => setActiveTab("faq")}
              className={`flex-1 py-3 text-center transition-all border-b-2 ${
                activeTab === "faq" 
                  ? "border-alta text-alta bg-alta/5" 
                  : "border-transparent text-charcoal/60 hover:text-charcoal"
              }`}
            >
              Frequently Asked Questions
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[70vh] space-y-4 text-xs font-serif text-charcoal/80 leading-relaxed">
            {activeTab === "shipping" && (
              <div className="space-y-4">
                <div className="p-4 bg-white border border-zari/20 rounded-sm space-y-2">
                  <h4 className="font-cinzel text-sm font-bold text-charcoal">Domestic Shipping (India)</h4>
                  <p>All orders within India enjoy complimentary express air shipping via Bluedart/Delhivery. Dispatched items arrive within 2 to 4 business days.</p>
                </div>
                <div className="p-4 bg-white border border-zari/20 rounded-sm space-y-2">
                  <h4 className="font-cinzel text-sm font-bold text-charcoal">International Shipping (USA, UK, UAE, Canada, Australia)</h4>
                  <p>Dispatched internationally via DHL Express / FedEx Priority. International delivery takes 3 to 6 business days. Express duties and door-step tracking are provided.</p>
                </div>
              </div>
            )}

            {activeTab === "returns" && (
              <div className="space-y-4">
                <div className="p-4 bg-white border border-zari/20 rounded-sm space-y-2">
                  <h4 className="font-cinzel text-sm font-bold text-charcoal">7-Day Easy Return Guarantee</h4>
                  <p>If you are not completely enchanted by your saree, you may initiate a return or exchange within 7 days of delivery in original un-draped condition with tags intact.</p>
                </div>
                <div className="p-4 bg-white border border-zari/20 rounded-sm space-y-2">
                  <h4 className="font-cinzel text-sm font-bold text-charcoal">Custom Tailored Items Exception</h4>
                  <p>Items with custom blouse stitching or customized hand fall-piko attached are eligible for size alteration adjustments rather than full refund returns.</p>
                </div>
              </div>
            )}

            {activeTab === "faq" && (
              <div className="space-y-3">
                <div className="p-3 bg-white border border-zari/20 rounded-sm">
                  <strong className="block text-charcoal font-bold mb-1">Q: Are all sarees 100% pure silk from Banaras?</strong>
                  <p>Yes. Every saree is woven in Banaras using certified pure silk filaments and marked with official Silk Mark government tags.</p>
                </div>
                <div className="p-3 bg-white border border-zari/20 rounded-sm">
                  <strong className="block text-charcoal font-bold mb-1">Q: Can I request custom blouse stitching?</strong>
                  <p>Absolutely. Use our 'Custom Blouse Studio' to specify your measurements or standard sizes before order confirmation.</p>
                </div>
                <div className="p-3 bg-white border border-zari/20 rounded-sm">
                  <strong className="block text-charcoal font-bold mb-1">Q: How can I preview the saree on video call?</strong>
                  <p>Click 'Book Video Appointment' in the top bar to select a convenient WhatsApp video call time with our Banaras studio team.</p>
                </div>
              </div>
            )}
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
