/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  X, Mail, Lock, User, Phone, Eye, EyeOff, Sparkles, ShieldCheck, 
  CheckCircle2, ArrowRight, KeyRound, Smartphone, Star, Award, Heart
} from "lucide-react";
import { UserProfile } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export function AuthModal({ isOpen, onClose, onLoginSuccess }: AuthModalProps) {
  const [authMode, setAuthMode] = useState<"signin" | "signup" | "forgot">("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Sign In Form state - Preloaded with client demo details
  const [loginEmail, setLoginEmail] = useState("demo.patron@example.com");
  const [loginPassword, setLoginPassword] = useState("12345678");

  // Sign Up Form state
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(true);

  // Forgot Password state
  const [forgotEmail, setForgotEmail] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [successNotice, setSuccessNotice] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  // Password strength calculation for signup
  const calculatePasswordStrength = (pass: string) => {
    if (!pass) return 0;
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return score; // 0 to 4
  };

  const passwordScore = calculatePasswordStrength(signupPassword);
  const getStrengthLabel = () => {
    switch (passwordScore) {
      case 1: return { label: "Weak", color: "bg-amber-400 text-amber-900" };
      case 2: return { label: "Fair", color: "bg-blue-400 text-blue-900" };
      case 3: return { label: "Good", color: "bg-emerald-500 text-white" };
      case 4: return { label: "Heirloom Secure", color: "bg-emerald-700 text-white" };
      default: return { label: "Too Short", color: "bg-gray-300 text-gray-700" };
    }
  };

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!loginEmail || !loginPassword) {
      setErrorMessage("Please enter your registered Email or Mobile number and Password.");
      return;
    }

    setIsLoading(true);

    const cleanEmail = loginEmail.trim().toLowerCase();

    // Check if logging in with demo account or generic user
    let authenticatedUser: UserProfile;

    if (cleanEmail === "demo.patron@example.com" || cleanEmail.includes("demo")) {
      authenticatedUser = {
        id: "usr-demo-client",
        name: "Ananya Roy",
        email: "demo.patron@example.com",
        phone: "+91 98000 00000",
        addresses: [
          {
            id: "addr-demo-1",
            fullName: "Ananya Roy",
            phone: "+91 98000 00000",
            streetAddress: "12, Godowlia Crossing, LUXA Road",
            locality: "Near Kashi Vishwanath Temple",
            city: "Varanasi",
            state: "Uttar Pradesh",
            pincode: "221001",
            addressType: "Home",
            isDefault: true
          }
        ],
        defaultAddressId: "addr-demo-1"
      };
    } else {
      const emailVal = cleanEmail.includes("@") ? cleanEmail : `${cleanEmail}@example.com`;
      const rawName = emailVal.split("@")[0];
      const formattedName = rawName.charAt(0).toUpperCase() + rawName.slice(1);
      authenticatedUser = {
        id: "usr-" + Date.now(),
        name: formattedName,
        email: emailVal,
        phone: "+91 98000 " + Math.floor(10000 + Math.random() * 89999),
        addresses: [],
      };
    }

    setSuccessNotice(`Welcome back, ${authenticatedUser.name}! Opening your boutique portfolio...`);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(authenticatedUser);
      setSuccessNotice("");
      onClose();
    }, 600);
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!signupName || !signupEmail || !signupPhone || !signupPassword) {
      setErrorMessage("Please complete all required fields.");
      return;
    }

    if (signupPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    if (signupPassword !== signupConfirmPassword) {
      setErrorMessage("Passwords do not match. Please verify and retry.");
      return;
    }

    if (!acceptTerms) {
      setErrorMessage("Please accept the Atelier terms and privacy policy.");
      return;
    }

    setIsLoading(true);

    const newUser: UserProfile = {
      id: "usr-" + Date.now(),
      name: signupName,
      email: signupEmail,
      phone: signupPhone.startsWith("+") ? signupPhone : `+91 ${signupPhone}`,
      addresses: [],
    };

    setSuccessNotice("Patron account created successfully! Welcome to Iraaya Atelier.");
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(newUser);
      setSuccessNotice("");
      onClose();
    }, 700);
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) {
      setErrorMessage("Please enter your registered email address.");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessNotice("A secure reset link has been dispatched to your email!");
      setTimeout(() => {
        setAuthMode("signin");
        setSuccessNotice("");
      }, 2000);
    }, 600);
  };

  const handleDemoQuickLogin = () => {
    setErrorMessage("");
    setIsLoading(true);
    const demoUser: UserProfile = {
      id: "usr-demo-client",
      name: "Ananya Roy",
      email: "demo.patron@example.com",
      phone: "+91 98000 00000",
      addresses: [
        {
          id: "addr-demo-1",
          fullName: "Ananya Roy",
          phone: "+91 98000 00000",
          streetAddress: "12, Godowlia Crossing, LUXA Road",
          locality: "Near Kashi Vishwanath Temple",
          city: "Varanasi",
          state: "Uttar Pradesh",
          pincode: "221001",
          addressType: "Home",
          isDefault: true
        }
      ],
      defaultAddressId: "addr-demo-1"
    };

    setSuccessNotice("Signing you in instantly as Demo Patron (Ananya Roy)...");
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(demoUser);
      setSuccessNotice("");
      onClose();
    }, 500);
  };

  const handleSocialLoginMock = (provider: string) => {
    setIsLoading(true);
    setSuccessNotice(`Connecting securely via ${provider}...`);
    setTimeout(() => {
      const socialUser: UserProfile = {
        id: "usr-social-" + Date.now(),
        name: "Abhinaba Sen",
        email: "senabby420@gmail.com",
        phone: "+91 98300 12345",
        addresses: [],
      };
      setIsLoading(false);
      onLoginSuccess(socialUser);
      setSuccessNotice("");
      onClose();
    }, 650);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4 md:p-6 font-sans">
          {/* Backdrop Blur Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity"
          />

          {/* Modern Split-Card Modal */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 320 }}
            className="relative w-full max-w-4xl bg-[#FCFAF6] rounded-2xl md:rounded-3xl border border-zari/30 shadow-2xl overflow-hidden flex flex-col md:flex-row z-10 my-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3.5 right-3.5 z-20 p-2 bg-white/80 hover:bg-white text-charcoal hover:text-alta rounded-full border border-zari/20 shadow-xs transition-all cursor-pointer"
              title="Close Dialog"
            >
              <X className="w-4 h-4" />
            </button>

            {/* LEFT COLUMN: Modern Editorial Atelier Showcase (Desktop & Tablet) */}
            <div className="md:w-5/12 bg-gradient-to-br from-[#4A0010] via-[#5C0617] to-[#36000B] text-kora p-6 md:p-8 flex flex-col justify-between relative overflow-hidden border-b md:border-b-0 md:border-r border-zari/30">
              {/* Decorative Watermark Ornament */}
              <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full border-8 border-zari/10 pointer-events-none" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-zari/20 to-transparent pointer-events-none" />

              <div className="relative z-10 space-y-6">
                {/* Brand Emblem Badge */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-zari/20 border border-zari/40 flex items-center justify-center text-zari shadow-xs">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-cinzel font-bold tracking-[0.25em] text-zari uppercase block">
                      IRAAYA BANARAS
                    </span>
                    <span className="text-[9px] font-sans text-kora/60 tracking-wider">
                      Master Wazir & Co • Est. 1974
                    </span>
                  </div>
                </div>

                {/* Editorial Headline */}
                <div className="space-y-2 pt-2">
                  <h3 className="font-cinzel text-xl sm:text-2xl font-bold tracking-wide text-[#FFF3CD] leading-snug">
                    {authMode === "signin" 
                      ? "Welcome to Your Private Patron Portal" 
                      : authMode === "signup"
                      ? "Join the Heritage Patron Circle"
                      : "Reset Your Secure Access"}
                  </h3>
                  <p className="text-xs text-kora/80 font-serif leading-relaxed italic">
                    {authMode === "signin"
                      ? "Access your saved bridal trousseau, bespoke falls & pico orders, and private loom consultation schedules."
                      : "Create your patron account to unlock exclusive master weaver previews, complimentary blouse styling, and Silk Mark guarantees."}
                  </p>
                </div>

                {/* Patron Perks Feature List */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-2.5">
                    <Award className="w-4 h-4 text-zari flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-semibold text-kora">100% Silk Mark Certified Authenticity</h4>
                      <p className="text-[11px] text-kora/70">Pure Mulberry & Katan threads verified by Government testing.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Star className="w-4 h-4 text-zari flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-semibold text-kora">Private Video Loom Appointments</h4>
                      <p className="text-[11px] text-kora/70">One-on-one live HD drape showcases straight from Varanasi pitlooms.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Heart className="w-4 h-4 text-zari flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-semibold text-kora">Synchronized Wishlist & Bespoke Trousseau</h4>
                      <p className="text-[11px] text-kora/70">Save dream sarees, falls/pico preferences, and bridal palettes.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Testimonial / Credibility Signal */}
              <div className="relative z-10 pt-6 mt-6 border-t border-zari/20">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-zari/25 border border-zari/40 flex items-center justify-center font-serif text-sm text-[#FFF3CD] font-bold">
                    AR
                  </div>
                  <div>
                    <p className="text-xs font-serif italic text-kora/90">
                      "The most authentic Banarasi silk drape I have ever worn."
                    </p>
                    <p className="text-[10px] text-zari font-sans uppercase font-bold tracking-wider">
                      — Ananya Roy, Kolkata Patron
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Modern Interactive Auth Card */}
            <div className="md:w-7/12 p-6 sm:p-8 flex flex-col justify-between bg-white text-charcoal">
              <div className="space-y-5">
                
                {/* Modern Sliding Pill Tab Switcher */}
                {authMode !== "forgot" && (
                  <div className="p-1 bg-[#F4F0E6] rounded-xl flex items-center gap-1 border border-zari/20">
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode("signin");
                        setErrorMessage("");
                      }}
                      className={`flex-1 py-2 rounded-lg text-xs font-sans font-bold uppercase tracking-wider transition-all relative cursor-pointer ${
                        authMode === "signin"
                          ? "text-alta shadow-xs"
                          : "text-charcoal/60 hover:text-alta"
                      }`}
                    >
                      {authMode === "signin" && (
                        <motion.div
                          layoutId="auth-tab-pill"
                          className="absolute inset-0 bg-white rounded-lg border border-zari/25 shadow-xs"
                          transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                        />
                      )}
                      <span className="relative z-10 flex items-center justify-center gap-1.5">
                        <KeyRound className="w-3.5 h-3.5" />
                        <span>Sign In</span>
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode("signup");
                        setErrorMessage("");
                      }}
                      className={`flex-1 py-2 rounded-lg text-xs font-sans font-bold uppercase tracking-wider transition-all relative cursor-pointer ${
                        authMode === "signup"
                          ? "text-alta shadow-xs"
                          : "text-charcoal/60 hover:text-alta"
                      }`}
                    >
                      {authMode === "signup" && (
                        <motion.div
                          layoutId="auth-tab-pill"
                          className="absolute inset-0 bg-white rounded-lg border border-zari/25 shadow-xs"
                          transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                        />
                      )}
                      <span className="relative z-10 flex items-center justify-center gap-1.5">
                        <User className="w-3.5 h-3.5" />
                        <span>Create Account</span>
                      </span>
                    </button>
                  </div>
                )}

                {/* Instant 1-Click Demo Login Banner */}
                <div className="p-3.5 bg-gradient-to-r from-amber-50/90 via-amber-100/60 to-amber-50/90 border border-amber-300/80 rounded-xl flex items-center justify-between gap-3 shadow-xs">
                  <div className="space-y-0.5 text-left">
                    <span className="text-[10px] font-sans font-bold uppercase text-amber-900 tracking-wider flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                      <span>Instant Client Preview Mode</span>
                    </span>
                    <p className="text-xs text-charcoal/80 font-sans">
                      Test orders, wishlist & addresses as <strong className="text-alta">Ananya Roy</strong>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleDemoQuickLogin}
                    disabled={isLoading}
                    className="px-3.5 py-2 bg-alta text-kora text-[11px] font-sans font-bold uppercase tracking-wider rounded-lg hover:bg-alta/90 active:scale-95 transition-all flex items-center gap-1.5 flex-shrink-0 shadow-xs cursor-pointer"
                  >
                    <span>⚡ Instant Demo</span>
                    <ArrowRight className="w-3.5 h-3.5 text-zari" />
                  </button>
                </div>

                {/* Quick Social & Phone Sign In Buttons */}
                {authMode === "signin" && (
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => handleSocialLoginMock("Google")}
                      disabled={isLoading}
                      className="py-2.5 px-3 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-xs font-sans font-medium text-charcoal/90 transition-all flex items-center justify-center gap-2 shadow-2xs cursor-pointer hover:border-gray-300"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                      </svg>
                      <span>Google</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSocialLoginMock("OTP")}
                      disabled={isLoading}
                      className="py-2.5 px-3 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-xs font-sans font-medium text-charcoal/90 transition-all flex items-center justify-center gap-2 shadow-2xs cursor-pointer hover:border-gray-300"
                    >
                      <Smartphone className="w-4 h-4 text-alta" />
                      <span>Mobile OTP</span>
                    </button>
                  </div>
                )}

                {/* Divider */}
                <div className="relative flex items-center justify-center">
                  <div className="border-t border-gray-200 w-full" />
                  <span className="bg-white px-3 text-[10px] font-sans uppercase font-bold tracking-widest text-charcoal/50">
                    {authMode === "signin" ? "Or sign in with email" : authMode === "signup" ? "Or register with details" : "Password assistance"}
                  </span>
                </div>

                {/* Feedback Alerts */}
                {errorMessage && (
                  <motion.div 
                    initial={{ opacity: 0, y: -8 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs font-sans rounded-xl flex items-center gap-2"
                  >
                    <X className="w-4 h-4 text-red-600 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </motion.div>
                )}

                {successNotice && (
                  <motion.div 
                    initial={{ opacity: 0, y: -8 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-sans rounded-xl flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{successNotice}</span>
                  </motion.div>
                )}

                {/* ---------------------------------------------------- */}
                {/* 1. SIGN IN FORM */}
                {/* ---------------------------------------------------- */}
                {authMode === "signin" && (
                  <form onSubmit={handleSignInSubmit} className="space-y-4 text-left">
                    <div>
                      <label className="block text-[11px] font-sans font-bold uppercase text-charcoal/75 mb-1.5 tracking-wider">
                        Email Address or Mobile Number
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-alta/70" />
                        <input
                          type="text"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          placeholder="e.g. patron@example.com or +91 98000..."
                          className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-xs sm:text-sm bg-[#FAF8F5] border border-zari/30 rounded-xl focus:outline-none focus:border-alta focus:bg-white transition-all font-sans text-charcoal placeholder:text-charcoal/40 shadow-inner"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-[11px] font-sans font-bold uppercase text-charcoal/75 tracking-wider">
                          Password
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            setAuthMode("forgot");
                            setErrorMessage("");
                          }}
                          className="text-[11px] font-sans font-bold text-alta hover:underline cursor-pointer"
                        >
                          Forgot Password?
                        </button>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-alta/70" />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-10 pr-10 py-2.5 sm:py-3 text-xs sm:text-sm bg-[#FAF8F5] border border-zari/30 rounded-xl focus:outline-none focus:border-alta focus:bg-white transition-all font-sans text-charcoal shadow-inner"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/50 hover:text-alta p-1 cursor-pointer"
                          title={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1 text-xs">
                      <label className="flex items-center gap-2 cursor-pointer text-charcoal/80 font-sans">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="rounded border-zari/40 text-alta focus:ring-alta accent-alta w-3.5 h-3.5"
                        />
                        <span>Remember my login</span>
                      </label>
                      <span className="text-[10px] text-charcoal/50 font-sans">256-Bit Encrypted</span>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 bg-alta text-kora text-xs font-sans font-bold uppercase tracking-widest hover:bg-alta/90 active:scale-[0.99] transition-all rounded-xl shadow-md mt-2 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>{isLoading ? "Authenticating..." : "Sign In to Iraaya"}</span>
                      <ArrowRight className="w-4 h-4 text-zari" />
                    </button>
                  </form>
                )}

                {/* ---------------------------------------------------- */}
                {/* 2. SIGN UP FORM */}
                {/* ---------------------------------------------------- */}
                {authMode === "signup" && (
                  <form onSubmit={handleSignUpSubmit} className="space-y-3.5 text-left">
                    <div>
                      <label className="block text-[11px] font-sans font-bold uppercase text-charcoal/75 mb-1 tracking-wider">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-alta/70" />
                        <input
                          type="text"
                          required
                          value={signupName}
                          onChange={(e) => setSignupName(e.target.value)}
                          placeholder="e.g. Srimoyee Sengupta"
                          className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm bg-[#FAF8F5] border border-zari/30 rounded-xl focus:outline-none focus:border-alta focus:bg-white transition-all font-sans text-charcoal placeholder:text-charcoal/40 shadow-inner"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-sans font-bold uppercase text-charcoal/75 mb-1 tracking-wider">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-alta/70" />
                          <input
                            type="email"
                            required
                            value={signupEmail}
                            onChange={(e) => setSignupEmail(e.target.value)}
                            placeholder="patron@example.com"
                            className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm bg-[#FAF8F5] border border-zari/30 rounded-xl focus:outline-none focus:border-alta focus:bg-white transition-all font-sans text-charcoal placeholder:text-charcoal/40 shadow-inner"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-sans font-bold uppercase text-charcoal/75 mb-1 tracking-wider">
                          Mobile Number *
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-alta/70" />
                          <input
                            type="tel"
                            required
                            value={signupPhone}
                            onChange={(e) => setSignupPhone(e.target.value)}
                            placeholder="+91 98300 00000"
                            className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm bg-[#FAF8F5] border border-zari/30 rounded-xl focus:outline-none focus:border-alta focus:bg-white transition-all font-sans text-charcoal placeholder:text-charcoal/40 shadow-inner"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-sans font-bold uppercase text-charcoal/75 mb-1 tracking-wider">
                          Create Password *
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            required
                            value={signupPassword}
                            onChange={(e) => setSignupPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full pl-3 pr-8 py-2.5 text-xs sm:text-sm bg-[#FAF8F5] border border-zari/30 rounded-xl focus:outline-none focus:border-alta focus:bg-white transition-all font-sans text-charcoal shadow-inner"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-charcoal/50 hover:text-alta p-1 cursor-pointer"
                          >
                            {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-sans font-bold uppercase text-charcoal/75 mb-1 tracking-wider">
                          Confirm Password *
                        </label>
                        <div className="relative">
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            required
                            value={signupConfirmPassword}
                            onChange={(e) => setSignupConfirmPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full pl-3 pr-8 py-2.5 text-xs sm:text-sm bg-[#FAF8F5] border border-zari/30 rounded-xl focus:outline-none focus:border-alta focus:bg-white transition-all font-sans text-charcoal shadow-inner"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-charcoal/50 hover:text-alta p-1 cursor-pointer"
                          >
                            {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Password Strength Indicator */}
                    {signupPassword && (
                      <div className="space-y-1 pt-0.5">
                        <div className="flex items-center justify-between text-[10px] font-sans">
                          <span className="text-charcoal/60">Password Security:</span>
                          <span className={`px-2 py-0.5 rounded font-bold ${getStrengthLabel().color}`}>
                            {getStrengthLabel().label}
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden flex gap-1">
                          {[1, 2, 3, 4].map((step) => (
                            <div
                              key={step}
                              className={`h-full flex-1 rounded-full transition-colors ${
                                passwordScore >= step ? "bg-emerald-600" : "bg-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="pt-1">
                      <label className="flex items-start gap-2 cursor-pointer text-xs text-charcoal/80 font-sans">
                        <input
                          type="checkbox"
                          checked={acceptTerms}
                          onChange={(e) => setAcceptTerms(e.target.checked)}
                          className="rounded border-zari/40 text-alta focus:ring-alta accent-alta mt-0.5"
                        />
                        <span className="text-[11px] leading-snug">
                          I agree to Iraaya's Patron Terms, Silk Authenticity Guarantee & Privacy Policy.
                        </span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 bg-alta text-kora text-xs font-sans font-bold uppercase tracking-widest hover:bg-alta/90 active:scale-[0.99] transition-all rounded-xl shadow-md mt-2 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>{isLoading ? "Registering..." : "Create Patron Account"}</span>
                      <ArrowRight className="w-4 h-4 text-zari" />
                    </button>
                  </form>
                )}

                {/* ---------------------------------------------------- */}
                {/* 3. FORGOT PASSWORD FORM */}
                {/* ---------------------------------------------------- */}
                {authMode === "forgot" && (
                  <form onSubmit={handleForgotPasswordSubmit} className="space-y-4 text-left">
                    <div className="space-y-1">
                      <h4 className="font-serif font-bold text-sm text-alta">Reset Your Account Password</h4>
                      <p className="text-xs text-charcoal/70">
                        Enter your registered email address and our team will dispatch a secure one-time verification link.
                      </p>
                    </div>

                    <div>
                      <label className="block text-[11px] font-sans font-bold uppercase text-charcoal/75 mb-1 tracking-wider">
                        Registered Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-alta/70" />
                        <input
                          type="email"
                          required
                          value={forgotEmail}
                          onChange={(e) => setForgotEmail(e.target.value)}
                          placeholder="patron@example.com"
                          className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm bg-[#FAF8F5] border border-zari/30 rounded-xl focus:outline-none focus:border-alta focus:bg-white transition-all font-sans text-charcoal shadow-inner"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setAuthMode("signin");
                          setErrorMessage("");
                        }}
                        className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-charcoal text-xs font-sans font-bold uppercase tracking-wider rounded-xl transition-all"
                      >
                        Back to Login
                      </button>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 py-2.5 bg-alta text-kora text-xs font-sans font-bold uppercase tracking-wider hover:bg-alta/90 transition-all rounded-xl shadow-xs"
                      >
                        Send Reset Link
                      </button>
                    </div>
                  </form>
                )}

              </div>

              {/* Footer Trust Bar */}
              <div className="pt-4 mt-4 border-t border-zari/15 flex items-center justify-between text-[10px] text-charcoal/60 font-sans">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>100% Encrypted & Private</span>
                </span>
                <span>Varanasi Atelier Handlooms</span>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
