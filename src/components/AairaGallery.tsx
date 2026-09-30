/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Sparkles, Star, Quote, Heart, ShieldCheck, X, Camera, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ReviewItem {
  id: string;
  customerName: string;
  location: string;
  sareeWorn: string;
  rating: number;
  date: string;
  reviewText: string;
  image: string;
  verifiedPurchase: boolean;
}

const customerReviewsData: ReviewItem[] = [
  {
    id: "rev-1",
    customerName: "Priya Sharma",
    location: "New Delhi",
    sareeWorn: "Black Benarasi Silk Saree",
    rating: 5,
    date: "12 Oct 2025",
    reviewText: "The richness of the gold zari on dark black silk exceeded my expectations. Iraaya provided genuine Silk Mark authentication!",
    image: "https://i.pinimg.com/1200x/f9/21/38/f921388b525ee5840d06b536a1934e52.jpg",
    verifiedPurchase: true,
  },
  {
    id: "rev-2",
    customerName: "Ananya & Rohan Reddy",
    location: "Hyderabad",
    sareeWorn: "Red Benarasi Silk Saree",
    rating: 5,
    date: "28 Nov 2025",
    reviewText: "I wore this classic crimson Red Benarasi Silk Saree for my reception. The drape was extraordinarily soft and the gold zari border looked royal in all our family photos.",
    image: "https://i.pinimg.com/736x/07/a5/ae/07a5aeeb8dc107a8447fae542800dec9.jpg",
    verifiedPurchase: true,
  },
  {
    id: "rev-3",
    customerName: "Meera Sen",
    location: "Kolkata",
    sareeWorn: "White Benarasi Saree",
    rating: 5,
    date: "14 Jan 2026",
    reviewText: "Pristine White Benarasi Saree with gold brocade weave! Order arrived in velvet gift packaging within 3 days. Authentic handloom craft from Chowk weavers.",
    image: "https://i.pinimg.com/1200x/18/5a/8d/185a8db33892ad9a199b5aa18fb9ac1d.jpg",
    verifiedPurchase: true,
  },
  {
    id: "rev-4",
    customerName: "Ritika & Siddharth Kapoor",
    location: "Mumbai",
    sareeWorn: "Emerald Green Benarasi Saree",
    rating: 5,
    date: "04 Feb 2026",
    reviewText: "Stunning Emerald Green Benarasi Saree! The custom blouse stitching service was spot-on and saved me so much time before my cousin's wedding.",
    image: "https://i.pinimg.com/1200x/aa/45/44/aa45446c524e101d9c39a1cda1d9ef31.jpg",
    verifiedPurchase: true,
  },
];

export function AairaGallery() {
  const [selectedReview, setSelectedReview] = useState<ReviewItem | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadSubmitted, setUploadSubmitted] = useState(false);

  // Form states for photo upload
  const [nameInput, setNameInput] = useState("");
  const [sareeInput, setSareeInput] = useState("");
  const [commentInput, setCommentInput] = useState("");

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUploadSubmitted(true);
    setTimeout(() => {
      setUploadSubmitted(false);
      setShowUploadModal(false);
      setNameInput("");
      setSareeInput("");
      setCommentInput("");
    }, 2500);
  };

  return (
    <section id="iraaya-gallery" className="relative py-14 md:py-20 bg-[#F5F2ED] border-t border-zari/20 text-charcoal font-sans z-10 px-4 sm:px-6 md:px-12">
      
      {/* Background Subtle Weft Lines */}
      <div className="absolute inset-0 bg-kora/40 silk-texture pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Gallery Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 text-left border-b border-zari/15 pb-6">
          <div>
            <span className="text-[11px] tracking-[0.3em] font-sans text-alta font-bold uppercase block mb-2 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-zari" />
              <span>REAL PATRONS & BRIDES // IRAAYA GALLERY</span>
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-charcoal font-normal tracking-tight">
              Iraaya <span className="italic font-light text-alta">Gallery</span>
            </h2>
            <p className="text-xs text-charcoal/60 font-sans mt-2 tracking-wider uppercase">
              Custom Review Gallery • Customer Moments & Real Banarasi Silk Drapes
            </p>
          </div>

          <div className="mt-6 md:mt-0 flex items-center gap-3">
            <button
              onClick={() => setShowUploadModal(true)}
              className="px-5 py-2.5 bg-[#3D5A47] hover:bg-[#2F4738] text-white rounded-full text-xs font-sans font-bold uppercase tracking-widest shadow-md transition-all flex items-center gap-2 active:scale-95"
            >
              <Camera className="w-4 h-4 text-amber-300" />
              <span>Share Your Review Photo</span>
            </button>
          </div>
        </div>


        {/* Gallery Grid of Custom Reviews */}
        {/* MOBILE LAYOUT: Rows of 4 reviews side-by-side (horizontally scrollable), stacked vertically */}
        <div className="md:hidden space-y-6">
          {Array.from({ length: Math.ceil(customerReviewsData.length / 4) }, (_, rowIndex) => {
            const rowReviews = customerReviewsData.slice(rowIndex * 4, rowIndex * 4 + 4);
            return (
              <div key={rowIndex} className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-sans text-emerald-900 font-bold uppercase tracking-wider px-1">
                  <span>Gallery Row {rowIndex + 1} ({rowReviews.length} Reviews)</span>
                  <span className="text-stone-500 font-medium text-[10px]">Swipe ← →</span>
                </div>

                <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-3 -mx-4 px-4 scrollbar-none">
                  {rowReviews.map((review) => (
                    <div
                      key={review.id}
                      onClick={() => setSelectedReview(review)}
                      className="w-[74vw] sm:w-[260px] flex-shrink-0 snap-start bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                    >
                      {/* Review Image with Badge */}
                      <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
                        <img
                          src={review.image}
                          alt={`${review.customerName} wearing ${review.sareeWorn}`}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />

                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-sans font-semibold text-emerald-900 border border-emerald-200 flex items-center gap-1 shadow-sm">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Verified Patron</span>
                        </div>

                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="px-4 py-2 bg-white/95 backdrop-blur-xs text-charcoal text-xs font-bold rounded-full shadow-md uppercase tracking-wider">
                            View Review
                          </span>
                        </div>
                      </div>

                      {/* Review Content */}
                      <div className="p-4 text-left space-y-2 bg-white flex-1 flex flex-col justify-between">
                        <div>
                          {/* Star Rating */}
                          <div className="flex text-amber-400 text-xs mb-1">
                            {"★".repeat(review.rating)}
                          </div>

                          <p className="font-serif italic text-xs text-stone-700 leading-relaxed line-clamp-3">
                            "{review.reviewText}"
                          </p>
                        </div>

                        <div className="pt-2 border-t border-stone-100">
                          <h4 className="font-serif text-sm font-semibold text-charcoal">
                            {review.customerName}
                          </h4>
                          <p className="text-[10px] text-stone-500 font-sans">
                            {review.location} • <span className="text-emerald-800 font-medium">{review.sareeWorn}</span>
                          </p>
                        </div>
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
          {customerReviewsData.map((review) => (
            <div
              key={review.id}
              onClick={() => setSelectedReview(review)}
              className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              {/* Review Image with Badge */}
              <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
                <img
                  src={review.image}
                  alt={`${review.customerName} wearing ${review.sareeWorn}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-sans font-semibold text-emerald-900 border border-emerald-200 flex items-center gap-1 shadow-sm">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Verified Patron</span>
                </div>

                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="px-4 py-2 bg-white/95 backdrop-blur-xs text-charcoal text-xs font-bold rounded-full shadow-md uppercase tracking-wider">
                    View Review
                  </span>
                </div>
              </div>

              {/* Review Content */}
              <div className="p-4 text-left space-y-2 bg-white flex-1 flex flex-col justify-between">
                <div>
                  {/* Star Rating */}
                  <div className="flex text-amber-400 text-xs mb-1">
                    {"★".repeat(review.rating)}
                  </div>

                  <p className="font-serif italic text-xs text-stone-700 leading-relaxed line-clamp-3">
                    "{review.reviewText}"
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-100">
                  <h4 className="font-serif text-sm font-semibold text-charcoal">
                    {review.customerName}
                  </h4>
                  <p className="text-[10px] text-stone-500 font-sans">
                    {review.location} • <span className="text-emerald-800 font-medium">{review.sareeWorn}</span>
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>


      {/* REVIEW EXPAND MODAL */}
      <AnimatePresence>
        {selectedReview && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative border border-stone-200 flex flex-col md:flex-row text-left"
            >
              <button
                onClick={() => setSelectedReview(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-white text-stone-600 rounded-full shadow-md"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="md:w-1/2 aspect-[3/4] relative bg-stone-100">
                <img
                  src={selectedReview.image}
                  alt={selectedReview.customerName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="md:w-1/2 p-6 flex flex-col justify-between bg-white">
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400 text-sm">
                    {"★".repeat(selectedReview.rating)}
                  </div>

                  <Quote className="w-8 h-8 text-emerald-800/20" />
                  <p className="font-serif italic text-sm text-stone-800 leading-relaxed">
                    "{selectedReview.reviewText}"
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 mt-4 space-y-1">
                  <h4 className="font-serif text-base font-bold text-charcoal">
                    {selectedReview.customerName}
                  </h4>
                  <p className="text-xs text-stone-500 font-sans">
                    📍 {selectedReview.location}
                  </p>
                  <p className="text-xs text-emerald-800 font-medium">
                    ✨ {selectedReview.sareeWorn}
                  </p>
                  <span className="text-[10px] text-stone-400 block pt-1 font-mono">
                    Reviewed on {selectedReview.date} • Verified Purchase
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>


      {/* UPLOAD CUSTOM REVIEW PHOTO MODAL */}
      <AnimatePresence>
        {showUploadModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-lg w-full p-6 text-left shadow-2xl relative border border-stone-200"
            >
              <button
                onClick={() => setShowUploadModal(false)}
                className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-800 rounded-full hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <Camera className="w-5 h-5 text-emerald-800" />
                <h3 className="font-serif text-xl font-bold text-charcoal">Submit Review Photo</h3>
              </div>
              <p className="text-xs text-stone-500 mb-4">
                Share your Iraaya saree moment to be featured in the Iraaya Gallery.
              </p>

              {uploadSubmitted ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-700 mx-auto" />
                  <h4 className="font-bold text-emerald-900 text-sm">Thank You!</h4>
                  <p className="text-xs text-emerald-800">
                    Your photo and review have been submitted to our curators for the Iraaya Gallery.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleUploadSubmit} className="space-y-3 text-xs font-sans">
                  <div>
                    <label className="block text-stone-600 font-semibold mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      placeholder="e.g. Radhika Roy"
                      className="w-full p-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 font-semibold mb-1">Saree Name / Order SKU</label>
                    <input
                      type="text"
                      required
                      value={sareeInput}
                      onChange={(e) => setSareeInput(e.target.value)}
                      placeholder="e.g. Pure Katan Silk Saree"
                      className="w-full p-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 font-semibold mb-1">Upload Photo</label>
                    <div className="border-2 border-dashed border-stone-300 rounded-lg p-4 text-center bg-stone-50 hover:bg-stone-100 cursor-pointer transition-colors">
                      <Camera className="w-6 h-6 text-stone-400 mx-auto mb-1" />
                      <span className="text-xs text-stone-600 font-medium">Click or drag your photo here</span>
                      <p className="text-[10px] text-stone-400 mt-0.5">JPG, PNG up to 10MB</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-stone-600 font-semibold mb-1">Your Review Note</label>
                    <textarea
                      required
                      rows={3}
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                      placeholder="Share your experience wearing the saree..."
                      className="w-full p-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold uppercase tracking-wider rounded-xl text-xs transition-all shadow-md mt-2"
                  >
                    Submit Photo & Review
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
