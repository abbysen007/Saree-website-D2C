/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  X, Heart, ShoppingBag, Trash2, ArrowRight, Sparkles, ShieldCheck, 
  Share2, Check, Video, ExternalLink, Eye, RefreshCw
} from "lucide-react";
import { BoutiqueProduct } from "../types";
import { curatedProducts } from "../data/editorialData";
import { motion, AnimatePresence } from "motion/react";

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: BoutiqueProduct[];
  removeFromWishlist: (id: string) => void;
  addToCart: (product: BoutiqueProduct) => void;
  isInCart?: (id: string) => boolean;
  onSelectProduct?: (product: BoutiqueProduct) => void;
  onOpenConsultation?: () => void;
  onExploreCatalog?: () => void;
}

export function WishlistModal({
  isOpen,
  onClose,
  wishlist,
  removeFromWishlist,
  addToCart,
  isInCart,
  onSelectProduct,
  onOpenConsultation,
  onExploreCatalog
}: WishlistModalProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [batchActionNotice, setBatchActionNotice] = useState("");

  if (!isOpen) return null;

  const totalValue = wishlist.reduce((sum, item) => sum + item.price, 0);

  const handleAddAllToCart = () => {
    wishlist.forEach((product) => {
      addToCart(product);
    });
    setBatchActionNotice(`All ${wishlist.length} sarees moved to your shopping bag!`);
    setTimeout(() => {
      setBatchActionNotice("");
    }, 3000);
  };

  const handleShareWishlist = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } else {
      alert("Wishlist link ready to share with your bridal stylists!");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-0 sm:p-4 md:p-6 font-sans">
          {/* Backdrop Blur Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity"
          />

          {/* Modern Wishlist Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ type: "spring", damping: 26, stiffness: 300 }}
            className="relative w-full h-full sm:h-auto sm:max-h-[90vh] sm:max-w-5xl bg-[#FBF9F4] sm:rounded-2xl md:rounded-3xl border border-zari/30 shadow-2xl flex flex-col overflow-hidden z-10 my-auto"
          >
            {/* Top Luxury Bar */}
            <div className="p-4 sm:p-6 bg-white border-b border-zari/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-alta/10 border border-alta/20 flex items-center justify-center text-alta">
                    <Heart className="w-3.5 h-3.5 fill-alta" />
                  </div>
                  <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-zari">
                    IRAAYA BRIDAL TROUSSEAU
                  </span>
                </div>
                <div className="flex items-baseline gap-2.5 mt-1">
                  <h2 className="font-serif text-lg sm:text-2xl font-bold text-charcoal">
                    My Saved Saree Wishlist
                  </h2>
                  <span className="text-xs font-sans font-bold text-alta px-2 py-0.5 bg-alta/10 rounded-full">
                    {wishlist.length} {wishlist.length === 1 ? "Saree" : "Sarees"}
                  </span>
                </div>
              </div>

              {/* Action Buttons & Close */}
              <div className="flex items-center gap-2 flex-wrap">
                {wishlist.length > 0 && (
                  <>
                    <button
                      onClick={handleShareWishlist}
                      className="px-3 py-1.5 border border-zari/30 hover:border-alta rounded-xl text-xs font-sans font-medium text-charcoal hover:text-alta bg-white transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                      title="Share Wishlist with Stylists or Family"
                    >
                      {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-alta" />}
                      <span>{copiedLink ? "Link Copied!" : "Share Wishlist"}</span>
                    </button>

                    <button
                      onClick={handleAddAllToCart}
                      className="px-3.5 py-1.5 bg-alta text-kora hover:bg-alta/90 rounded-xl text-xs font-sans font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-zari" />
                      <span>Add All to Bag</span>
                    </button>
                  </>
                )}

                <button
                  onClick={onClose}
                  className="p-2 border border-zari/30 hover:border-alta rounded-full text-charcoal hover:text-alta bg-white transition-all cursor-pointer ml-1"
                  title="Close Wishlist"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Notification Banner if batch action */}
            {batchActionNotice && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="px-6 py-2.5 bg-emerald-50 border-b border-emerald-200 text-emerald-800 text-xs font-sans flex items-center gap-2"
              >
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="font-medium">{batchActionNotice}</span>
              </motion.div>
            )}

            {/* Content Area */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto max-h-[62vh]">
              {wishlist.length === 0 ? (
                /* MODERN EMPTY STATE */
                <div className="py-10 sm:py-16 px-4 text-center max-w-xl mx-auto space-y-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-alta/5 border border-alta/15 flex items-center justify-center mx-auto text-alta relative">
                    <Heart className="w-8 h-8 sm:w-10 sm:h-10 stroke-alta fill-alta/10" />
                    <Sparkles className="w-5 h-5 text-zari absolute -top-1 -right-1 animate-pulse" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal">
                      Your Bridal Trousseau Awaits
                    </h3>
                    <p className="text-xs sm:text-sm text-charcoal/70 font-sans leading-relaxed">
                      You haven't saved any Banarasi handlooms yet. Explore our handcrafted bridal Katan, Kadwa Jaal, and lightweight Organza weaves and tap the heart icon to curate your dream collection.
                    </p>
                  </div>

                  {/* Recommendation Grid */}
                  <div className="pt-4 border-t border-zari/20 text-left">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-charcoal/70">
                        Patron Favorites & Recommendations
                      </span>
                      {onExploreCatalog && (
                        <button
                          onClick={() => {
                            onClose();
                            onExploreCatalog();
                          }}
                          className="text-[11px] font-sans font-bold text-alta hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <span>View All Catalog</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {curatedProducts.slice(0, 3).map((product) => (
                        <div
                          key={product.id}
                          onClick={() => {
                            onClose();
                            if (onSelectProduct) {
                              onSelectProduct(product);
                            }
                          }}
                          className="bg-white border border-zari/20 rounded-xl p-2.5 hover:border-alta hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                        >
                          <div className="aspect-[3/4] overflow-hidden rounded-lg bg-black/5 mb-2 relative">
                            <img
                              src={product.image}
                              alt={product.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <span className="absolute bottom-1 left-1 bg-white/90 text-charcoal text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs">
                              Pure Silk
                            </span>
                          </div>
                          <div>
                            <h4 className="font-serif text-xs font-bold text-charcoal group-hover:text-alta line-clamp-1">
                              {product.title}
                            </h4>
                            <p className="font-mono text-xs font-bold text-alta mt-0.5">
                              ₹{product.price.toLocaleString("en-IN")}
                            </p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(product);
                            }}
                            className="mt-2 w-full py-1.5 bg-alta/10 hover:bg-alta text-alta hover:text-kora rounded-lg text-[10px] font-sans font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1"
                          >
                            <ShoppingBag className="w-3 h-3" />
                            <span>Add to Bag</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* MODERN FILLED WISHLIST GRID */
                <div className="space-y-6">
                  {/* Summary Bar */}
                  <div className="p-3.5 bg-white border border-zari/20 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-700" />
                      <span className="text-charcoal/80 font-medium">
                        All items verified with Silk Mark Certification & Master Weaver seals
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-charcoal/60 mr-1.5">Estimated Trousseau Value:</span>
                      <strong className="text-base font-bold text-alta font-mono">
                        ₹{totalValue.toLocaleString("en-IN")}
                      </strong>
                    </div>
                  </div>

                  {/* Saree Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    {wishlist.map((product) => {
                      const itemInCart = isInCart ? isInCart(product.id) : false;

                      return (
                        <motion.div
                          key={product.id}
                          layout
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="bg-white border border-zari/25 rounded-2xl overflow-hidden hover:border-alta hover:shadow-lg transition-all flex flex-col justify-between group relative"
                        >
                          {/* Image Container */}
                          <div className="relative aspect-[3/4] overflow-hidden bg-black/5">
                            <img
                              src={product.image}
                              alt={product.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />

                            {/* Floating Delete from Wishlist */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeFromWishlist(product.id);
                              }}
                              className="absolute top-2.5 right-2.5 p-2 bg-white/90 hover:bg-red-600 text-charcoal/70 hover:text-white rounded-full shadow-md transition-all cursor-pointer z-10"
                              title="Remove from Wishlist"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>

                            {/* Floating Badges */}
                            <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
                              {product.isBestSeller && (
                                <span className="bg-amber-400 text-charcoal text-[9px] font-sans font-bold px-2 py-0.5 rounded-full shadow-xs uppercase tracking-wider">
                                  Best Seller
                                </span>
                              )}
                              <span className="bg-black/70 backdrop-blur-xs text-kora text-[9px] font-sans font-medium px-2 py-0.5 rounded-full">
                                {product.threadCount || "Pure Katan Silk"}
                              </span>
                            </div>

                            {/* Quick View Button on Hover */}
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none group-hover:pointer-events-auto">
                              <button
                                onClick={() => {
                                  onClose();
                                  if (onSelectProduct) {
                                    onSelectProduct(product);
                                  }
                                }}
                                className="px-4 py-2 bg-white text-charcoal hover:text-alta font-sans text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center gap-1.5 cursor-pointer transform translate-y-2 group-hover:translate-y-0"
                              >
                                <Eye className="w-3.5 h-3.5 text-alta" />
                                <span>Inspect Weave</span>
                              </button>
                            </div>
                          </div>

                          {/* Details & Actions */}
                          <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                            <div className="space-y-1 text-left">
                              <div className="flex items-start justify-between gap-1">
                                <h3 
                                  onClick={() => {
                                    onClose();
                                    if (onSelectProduct) onSelectProduct(product);
                                  }}
                                  className="font-serif text-sm font-bold text-charcoal group-hover:text-alta line-clamp-1 cursor-pointer transition-colors"
                                >
                                  {product.title}
                                </h3>
                              </div>

                              <p className="text-[11px] text-charcoal/60 font-sans line-clamp-1">
                                {product.description}
                              </p>

                              {product.artisanName && (
                                <p className="text-[9px] text-zari font-sans uppercase font-bold tracking-wider">
                                  Handcrafted by {product.artisanName}
                                </p>
                              )}
                            </div>

                            <div className="space-y-3 pt-2 border-t border-zari/15">
                              <div className="flex items-center justify-between">
                                <div>
                                  <span className="text-[10px] text-charcoal/50 uppercase block font-sans">
                                    Direct Loom Price
                                  </span>
                                  <span className="text-base font-bold text-alta font-mono">
                                    ₹{product.price.toLocaleString("en-IN")}
                                  </span>
                                </div>

                                {product.isSkinFriendly && (
                                  <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 font-sans">
                                    ✨ Pure Zari
                                  </span>
                                )}
                              </div>

                              {/* Action Buttons */}
                              <div className="grid grid-cols-2 gap-2">
                                <button
                                  onClick={() => {
                                    addToCart(product);
                                  }}
                                  className={`py-2 px-2.5 rounded-xl text-xs font-sans font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1 cursor-pointer shadow-xs ${
                                    itemInCart
                                      ? "bg-emerald-800 text-white"
                                      : "bg-alta text-kora hover:bg-alta/90 active:scale-95"
                                  }`}
                                >
                                  <ShoppingBag className="w-3.5 h-3.5" />
                                  <span>{itemInCart ? "In Bag" : "Move to Bag"}</span>
                                </button>

                                <button
                                  onClick={() => {
                                    onClose();
                                    if (onSelectProduct) {
                                      onSelectProduct(product);
                                    }
                                  }}
                                  className="py-2 px-2 bg-[#F4F0E6] hover:bg-[#EBE5D5] text-charcoal hover:text-alta rounded-xl text-xs font-sans font-medium transition-all flex items-center justify-center gap-1 cursor-pointer border border-zari/20"
                                >
                                  <span>Details</span>
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Footer Bar */}
            <div className="p-4 bg-white border-t border-zari/20 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-charcoal/70">
                <Sparkles className="w-4 h-4 text-zari" />
                <span>Want to see any of these sarees draped live? Book a private video call with our weavers.</span>
              </div>

              {onOpenConsultation && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenConsultation();
                  }}
                  className="px-4 py-2 border border-alta text-alta hover:bg-alta hover:text-kora rounded-xl text-xs font-sans font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Book Pitloom Drape Call</span>
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
