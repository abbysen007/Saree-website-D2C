/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { BoutiqueProduct, SareeCustomizationRequest } from "../types";
import { 
  Calendar, 
  Sparkles, 
  Smartphone,
  ShieldCheck, 
  Scissors,
  CheckCircle2,
  Upload,
  X,
  FileText,
  Image as ImageIcon,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ArtisanalAppointmentProps {
  preSelectedProduct: BoutiqueProduct | null;
  clearPreSelectedProduct: () => void;
}

export function ArtisanalAppointment({ preSelectedProduct, clearPreSelectedProduct }: ArtisanalAppointmentProps) {
  // Form State
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [sareeType, setSareeType] = useState("Pure Katan Silk Kadwa");
  const [colorPreference, setColorPreference] = useState("Crimson Red");
  const [zariType, setZariType] = useState("Pure Silver-Gold Zari");
  const [budgetRange, setBudgetRange] = useState("₹25,000 - ₹50,000");
  
  // Deadline date state (Default to 1 month from now)
  const todayStr = new Date().toISOString().split("T")[0];
  const defaultDeadline = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
  const [deadlineDate, setDeadlineDate] = useState(defaultDeadline);

  const [notes, setNotes] = useState("");
  
  // Image reference upload state
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  // Form submission state
  const [submittedRequest, setSubmittedRequest] = useState<SareeCustomizationRequest | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (preSelectedProduct) {
      setNotes(`Interested in custom weaving inspired by: ${preSelectedProduct.title}`);
    }
  }, [preSelectedProduct]);

  // Image Upload Handler
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeUploadedImage = () => {
    setUploadedImage(null);
    setUploadedFileName(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !email || !deadlineDate) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedId = `IRAAYA-CUST-${Math.floor(100000 + Math.random() * 900000)}`;
      const reqData: SareeCustomizationRequest = {
        id: generatedId,
        fullName,
        phone,
        email,
        sareeType,
        colorPreference,
        zariType,
        budgetRange,
        deadlineDate,
        notes,
        referenceImageUrl: uploadedImage || undefined,
        createdAt: new Date().toISOString()
      };
      setSubmittedRequest(reqData);
      setIsSubmitting(false);
    }, 600);
  };

  const handleReset = () => {
    setFullName("");
    setPhone("");
    setEmail("");
    setSareeType("Pure Katan Silk Kadwa");
    setColorPreference("Crimson Red");
    setZariType("Pure Silver-Gold Zari");
    setBudgetRange("₹25,000 - ₹50,000");
    setDeadlineDate(defaultDeadline);
    setNotes("");
    setUploadedImage(null);
    setUploadedFileName(null);
    setSubmittedRequest(null);
    clearPreSelectedProduct();
  };

  return (
    <section 
      id="artisanal-consultation" 
      className="relative py-12 md:py-16 bg-kora silk-texture border-t border-b border-zari/15 z-10 px-4 sm:px-6 md:px-12"
    >
      <div className="max-w-4xl mx-auto relative z-10 text-left">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-[11px] tracking-[0.3em] font-sans text-alta font-bold uppercase block mb-2 flex items-center gap-1.5">
              <Scissors className="w-3.5 h-3.5 text-zari" />
              <span>CUSTOM WEAVE ATELIER // BESPOKE ORDER FORM</span>
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-charcoal font-normal tracking-tight">
              Saree Customization <span className="italic font-light text-alta">Request</span>
            </h2>
            <p className="text-xs text-charcoal/60 font-sans mt-2 tracking-widest uppercase">
              Commission your dream Banarasi saree directly with our master loom weavers in Godowlia, Banaras
            </p>
          </div>
        </div>

        {/* Customization Form Card - Luxurious Atelier Theme */}
        <div className="bg-[#2B3839] text-[#FDFBF7] border border-[#C5A880]/30 shadow-2xl relative p-6 md:p-10 min-h-[480px]">
          <div className="absolute inset-2 border border-[#C5A880]/10 pointer-events-none" />

          <AnimatePresence mode="wait">
            {!submittedRequest ? (
              <motion.form
                key="custom-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="border-b border-[#C5A880]/20 pb-4 flex justify-between items-center">
                  <h3 className="font-serif text-lg text-[#FDFBF7] flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#C5A880]" />
                    <span>Bespoke Banarasi Weaving Parameters</span>
                  </h3>
                  <span className="text-[10px] font-mono text-[#C5A880] uppercase tracking-widest">
                    IRAAYA LOOM ATELIER
                  </span>
                </div>

                {/* Grid 1: Personal Info */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider font-sans text-[#C5A880] font-bold block">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Radhika Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full p-2.5 border border-[#C5A880]/30 bg-[#1E2728] text-[#FDFBF7] text-xs font-sans rounded-xs focus:border-[#C5A880] outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider font-sans text-[#C5A880] font-bold block">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98000 00000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-2.5 border border-[#C5A880]/30 bg-[#1E2728] text-[#FDFBF7] text-xs font-sans rounded-xs focus:border-[#C5A880] outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider font-sans text-[#C5A880] font-bold block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="radhika@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2.5 border border-[#C5A880]/30 bg-[#1E2728] text-[#FDFBF7] text-xs font-sans rounded-xs focus:border-[#C5A880] outline-none"
                    />
                  </div>
                </div>

                {/* Grid 2: Saree Weave Specifications */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                  
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider font-sans text-[#FDFBF7]/80 block">
                      Saree Fabric / Weave
                    </label>
                    <select
                      value={sareeType}
                      onChange={(e) => setSareeType(e.target.value)}
                      className="w-full p-2.5 border border-[#C5A880]/30 bg-[#1E2728] text-[#FDFBF7] text-xs font-sans rounded-xs focus:border-[#C5A880] outline-none cursor-pointer"
                    >
                      <option value="Pure Katan Silk Kadwa">Pure Katan Silk (Kadwa Weave)</option>
                      <option value="Georgette Khaddi">Georgette Khaddi Banarasi</option>
                      <option value="Tissue Silk Brocade">Tissue Silk Gold Brocade</option>
                      <option value="Organza Banarasi">Organza Banarasi Silk</option>
                      <option value="Tanchoi Silk">Tanchoi Silk Weave</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider font-sans text-[#FDFBF7]/80 block">
                      Color Palette
                    </label>
                    <select
                      value={colorPreference}
                      onChange={(e) => setColorPreference(e.target.value)}
                      className="w-full p-2.5 border border-[#C5A880]/30 bg-[#1E2728] text-[#FDFBF7] text-xs font-sans rounded-xs focus:border-[#C5A880] outline-none cursor-pointer"
                    >
                      <option value="Crimson Red">Crimson Red (Bridal)</option>
                      <option value="Emerald Green">Emerald Green</option>
                      <option value="Royal Navy Blue">Royal Navy Blue</option>
                      <option value="Mustard Gold">Mustard Yellow Gold</option>
                      <option value="Pastel Pink / Peach">Pastel Pink / Peach</option>
                      <option value="Lavender Purple">Lavender Purple</option>
                      <option value="Custom Dye Tone">Custom Color Tone (Specify in notes)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider font-sans text-[#FDFBF7]/80 block">
                      Zari Quality
                    </label>
                    <select
                      value={zariType}
                      onChange={(e) => setZariType(e.target.value)}
                      className="w-full p-2.5 border border-[#C5A880]/30 bg-[#1E2728] text-[#FDFBF7] text-xs font-sans rounded-xs focus:border-[#C5A880] outline-none cursor-pointer"
                    >
                      <option value="Pure Silver-Gold Zari">Pure Silver-Gold Zari (Certified)</option>
                      <option value="Antique Gold Zari">Antique Gold Vintage Zari</option>
                      <option value="Rose Gold Zari">Rose Gold Contemporary Zari</option>
                      <option value="Tested Silk Zari">Tested Silk Zari (Lightweight)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider font-sans text-[#FDFBF7]/80 block">
                      Budget Range
                    </label>
                    <select
                      value={budgetRange}
                      onChange={(e) => setBudgetRange(e.target.value)}
                      className="w-full p-2.5 border border-[#C5A880]/30 bg-[#1E2728] text-[#FDFBF7] text-xs font-sans rounded-xs focus:border-[#C5A880] outline-none cursor-pointer"
                    >
                      <option value="₹15,000 - ₹25,000">₹15,000 - ₹25,000</option>
                      <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000</option>
                      <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
                      <option value="₹1,00,000+ Royal Bespoke">₹1,00,000+ Royal Bespoke</option>
                    </select>
                  </div>

                </div>

                {/* Deadline Calendar Field with Min Date restriction */}
                <div className="space-y-1 pt-2">
                  <label className="text-[10px] uppercase tracking-wider font-sans text-[#C5A880] font-bold block flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Required Completion / Delivery Deadline *</span>
                  </label>
                  <p className="text-[11px] text-[#FDFBF7]/60 font-sans mb-1">
                    Past dates are automatically disabled. Handloom weaving usually requires at least 15-30 days.
                  </p>
                  <input
                    type="date"
                    required
                    min={todayStr}
                    value={deadlineDate}
                    onChange={(e) => setDeadlineDate(e.target.value)}
                    className="w-full sm:w-1/2 p-2.5 border border-[#C5A880]/40 bg-[#1E2728] text-[#FDFBF7] text-xs font-mono rounded-xs focus:border-[#C5A880] outline-none cursor-pointer"
                  />
                </div>

                {/* Notes & Custom Monogram Details */}
                <div className="space-y-1 pt-2">
                  <label className="text-[10px] uppercase tracking-wider font-sans text-[#FDFBF7]/80 block">
                    Design Vision, Motifs or Custom Name Weaving Instructions
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Specify any heirloom motifs (e.g. peacock, paisley, lotus), blouse piece dimensions, or bride/groom name initials to be woven into the pallu."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-3 border border-[#C5A880]/30 bg-[#1E2728] text-[#FDFBF7] text-xs font-sans rounded-xs focus:border-[#C5A880] outline-none"
                  />
                </div>

                {/* Reference Image Upload Field */}
                <div className="space-y-2 pt-2">
                  <label className="text-[10px] uppercase tracking-wider font-sans text-[#C5A880] font-bold block flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Reference Image Upload (Optional)</span>
                  </label>

                  {!uploadedImage ? (
                    <label className="border border-dashed border-[#C5A880]/40 bg-[#1E2728]/60 p-5 rounded-xs flex flex-col items-center justify-center cursor-pointer hover:border-[#C5A880] transition-colors group">
                      <Upload className="w-6 h-6 text-[#C5A880] group-hover:scale-110 transition-transform mb-2" />
                      <span className="text-xs font-sans text-[#FDFBF7] font-medium">
                        Click or drag & drop reference photo of saree/motif
                      </span>
                      <span className="text-[10px] text-[#FDFBF7]/50 mt-1">
                        Supports JPG, PNG, WEBP (Max 10MB)
                      </span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageChange}
                        className="hidden" 
                      />
                    </label>
                  ) : (
                    <div className="p-3 border border-[#C5A880] bg-[#1E2728] rounded-xs flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <img 
                          src={uploadedImage} 
                          alt="Reference preview" 
                          className="w-12 h-12 object-cover border border-[#C5A880]/40 flex-shrink-0"
                        />
                        <div className="truncate text-xs font-sans">
                          <p className="text-[#FDFBF7] font-bold truncate">{uploadedFileName}</p>
                          <p className="text-[#C5A880] text-[10px]">Reference Attached Successfully</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={removeUploadedImage}
                        className="p-1.5 rounded-full text-red-400 hover:bg-red-950/50 transition-colors"
                        title="Remove uploaded image"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Submit Action */}
                <div className="pt-6 border-t border-[#C5A880]/20 flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3.5 bg-[#4A121A] border border-[#C5A880]/50 text-[#FDFBF7] text-xs uppercase tracking-widest font-sans font-bold flex items-center gap-2 hover:bg-alta transition-all shadow-xl"
                  >
                    <span>{isSubmitting ? "Submitting Request..." : "Submit Customization Request"}</span>
                    <Sparkles className="w-4 h-4 text-[#C5A880]" />
                  </button>
                </div>

              </motion.form>
            ) : (
              /* CONFIRMATION DISPLAY */
              <motion.div
                key="custom-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 flex flex-col items-center text-center space-y-6 max-w-lg mx-auto"
              >
                <div className="w-16 h-16 rounded-full border border-[#C5A880] flex items-center justify-center text-[#C5A880] bg-[#4A121A]/30 relative">
                  <CheckCircle2 className="w-8 h-8" />
                  <div className="absolute -inset-1 border border-dashed border-[#C5A880]/40 rounded-full animate-spin-slow" />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] tracking-[0.25em] uppercase font-sans text-[#C5A880] font-bold">
                    CUSTOM WEAVE REQUEST SUBMITTED
                  </span>
                  <h3 className="font-serif text-2xl text-[#FDFBF7] font-medium">
                    Thank You, {submittedRequest.fullName}!
                  </h3>
                  <p className="text-xs text-[#FDFBF7]/80 font-sans">
                    Our master weaver in Godowlia, Banaras will review your specifications and contact you shortly.
                  </p>
                </div>

                {/* Receipt Card */}
                <div className="w-full bg-[#1E2728] border border-[#C5A880]/40 p-5 text-left text-xs font-sans space-y-3 relative">
                  <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-[#4A121A]" />
                  <div className="flex justify-between items-baseline border-b border-[#C5A880]/20 pb-2">
                    <span className="text-[9px] text-[#C5A880] uppercase font-bold tracking-widest">Enquiry Ticket</span>
                    <span className="font-mono text-[#FDFBF7] font-bold tracking-wider">{submittedRequest.id}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-[11px]">
                    <div>
                      <span className="text-[9px] text-[#C5A880] block uppercase">Fabric & Weave</span>
                      <span className="text-[#FDFBF7] font-medium">{submittedRequest.sareeType}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-[#C5A880] block uppercase">Color Preference</span>
                      <span className="text-[#FDFBF7] font-medium">{submittedRequest.colorPreference}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-[11px]">
                    <div>
                      <span className="text-[9px] text-[#C5A880] block uppercase">Zari & Budget</span>
                      <span className="text-[#FDFBF7] font-medium">{submittedRequest.zariType} ({submittedRequest.budgetRange})</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-[#C5A880] block uppercase">Requested Deadline</span>
                      <span className="text-emerald-400 font-mono font-bold">{submittedRequest.deadlineDate}</span>
                    </div>
                  </div>

                  {submittedRequest.referenceImageUrl && (
                    <div className="border-t border-[#C5A880]/20 pt-2 flex items-center gap-2">
                      <span className="text-[10px] text-[#C5A880] font-bold">Reference Attached:</span>
                      <span className="text-[10px] text-emerald-300">Image file received</span>
                    </div>
                  )}
                </div>

                {/* WhatsApp Direct Connect */}
                <div className="w-full pt-2 flex flex-col sm:flex-row gap-3">
                  <a
                    href={`https://wa.me/919800000000?text=${encodeURIComponent(
                      `Hello Iraaya! I submitted Custom Saree Request Ticket #${submittedRequest.id} for ${submittedRequest.sareeType} (${submittedRequest.colorPreference}).`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 bg-emerald-800 text-white border border-emerald-500/50 text-[11px] uppercase tracking-widest font-sans font-bold hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>Connect on WhatsApp</span>
                  </a>

                  <button
                    onClick={handleReset}
                    className="flex-1 py-3 border border-[#C5A880]/30 text-kora text-[11px] uppercase tracking-widest font-sans hover:border-[#C5A880] transition-all bg-transparent"
                  >
                    Submit Another Request
                  </button>
                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
