import React, { useState } from "react";
import { X, User, MapPin, Package, Heart, Plus, CheckCircle, Truck, Phone, Mail, Clock, ShieldCheck, Download, Trash2, ArrowRight } from "lucide-react";
import { UserProfile, DeliveryAddress, Order, BoutiqueProduct } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile | null;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  orders: Order[];
  wishlist: BoutiqueProduct[];
  removeFromWishlist: (id: string) => void;
  addToCart: (product: BoutiqueProduct) => void;
}

export function UserProfileModal({
  isOpen,
  onClose,
  userProfile,
  setUserProfile,
  orders,
  wishlist,
  removeFromWishlist,
  addToCart
}: UserProfileModalProps) {
  const [activeTab, setActiveTab] = useState<"profile" | "addresses" | "orders" | "wishlist">("wishlist");
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Order | null>(null);

  const profileName = userProfile?.name || "Ananya Roy";
  const profileEmail = userProfile?.email || "demo.patron@example.com";
  const profilePhone = userProfile?.phone || "+91 98000 00000";
  const profileAddresses = userProfile?.addresses || [];

  // New Address Form State
  const [newAddr, setNewAddr] = useState<Omit<DeliveryAddress, "id">>({
    fullName: profileName,
    phone: profilePhone,
    streetAddress: "",
    locality: "",
    city: "Varanasi",
    state: "Uttar Pradesh",
    pincode: "",
    landmark: "",
    addressType: "Home",
    isDefault: false,
  });

  if (!isOpen) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Profile details updated successfully!");
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddr.streetAddress || !newAddr.pincode || !newAddr.phone) {
      alert("Please fill in required address fields.");
      return;
    }
    const created: DeliveryAddress = {
      ...newAddr,
      id: "addr-" + Date.now(),
    };
    setUserProfile((prev) => {
      if (!prev) {
        return {
          id: "usr-" + Date.now(),
          name: profileName,
          email: profileEmail,
          phone: profilePhone,
          addresses: [created],
          defaultAddressId: created.id,
        };
      }
      return {
        ...prev,
        addresses: [...prev.addresses, created],
        defaultAddressId: prev.defaultAddressId || created.id,
      };
    });
    setShowAddressForm(false);
    setNewAddr({
      fullName: profileName,
      phone: profilePhone,
      streetAddress: "",
      locality: "",
      city: "Varanasi",
      state: "Uttar Pradesh",
      pincode: "",
      landmark: "",
      addressType: "Home",
      isDefault: false,
    });
  };

  const handleDeleteAddress = (id: string) => {
    setUserProfile((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        addresses: prev.addresses.filter((a) => a.id !== id),
      };
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4 md:p-6 font-sans">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl bg-[#FAF8F5] rounded-2xl md:rounded-3xl border border-zari/30 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] z-10 my-auto"
          >
        
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-[#4A0010] via-[#5C0617] to-[#36000B] text-kora p-5 sm:p-6 flex items-center justify-between border-b border-zari/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-zari/20 border border-zari/40 flex items-center justify-center font-cinzel text-xl text-[#FFF3CD] font-bold shadow-xs">
              {profileName ? profileName.charAt(0) : "P"}
            </div>
            <div>
              <h2 className="font-cinzel text-lg md:text-xl font-bold tracking-wider text-kora">
                {profileName}
              </h2>
              <p className="text-xs font-serif text-zari flex items-center gap-2">
                <span>{profilePhone || profileEmail || "Boutique Guest Patron"}</span>
                <span>•</span>
                <span className="text-[#FFF3CD]">Iraaya Patron</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 border border-zari/30 rounded-full hover:bg-white/10 transition-colors text-kora cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modern Tab Navigation */}
        <div className="flex border-b border-zari/20 bg-white/70 overflow-x-auto text-xs font-sans tracking-wider uppercase p-1.5 gap-1">
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-2.5 rounded-xl flex items-center gap-2 font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "orders" ? "bg-alta text-kora shadow-xs" : "text-charcoal/70 hover:text-alta hover:bg-black/5"
            }`}
          >
            <Package className="w-4 h-4" />
            <span>My Orders ({orders.length})</span>
          </button>
          
          <button
            onClick={() => setActiveTab("wishlist")}
            className={`px-4 py-2.5 rounded-xl flex items-center gap-2 font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "wishlist" ? "bg-alta text-kora shadow-xs" : "text-charcoal/70 hover:text-alta hover:bg-black/5"
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Wishlist ({wishlist.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("addresses")}
            className={`px-4 py-2.5 rounded-xl flex items-center gap-2 font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "addresses" ? "bg-alta text-kora shadow-xs" : "text-charcoal/70 hover:text-alta hover:bg-black/5"
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Saved Addresses ({profileAddresses.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            className={`px-4 py-2.5 rounded-xl flex items-center gap-2 font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "profile" ? "bg-alta text-kora shadow-xs" : "text-charcoal/70 hover:text-alta hover:bg-black/5"
            }`}
          >
            <User className="w-4 h-4" />
            <span>Personal Info</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">

          {/* TAB 1: ORDERS */}
          {activeTab === "orders" && (
            <div className="space-y-6">
              {orders.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <Package className="w-12 h-12 mx-auto text-zari/60" />
                  <p className="font-serif text-lg text-charcoal">No recent orders yet.</p>
                  <p className="text-xs text-charcoal/60 max-w-md mx-auto">
                    Explore our pure handloom Banarasi sarees from Iraaya and place your first order with instant UPI or COD.
                  </p>
                </div>
              ) : (
                orders.map((order) => (
                  <div key={order.id} className="border border-zari/20 bg-white/60 p-5 space-y-4 shadow-sm">
                    {/* Order Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zari/10 pb-3 text-xs font-sans">
                      <div>
                        <span className="font-mono font-bold text-alta text-sm">{order.id}</span>
                        <span className="text-charcoal/50 ml-3">Placed on {order.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          order.paymentStatus === "PAID" 
                            ? "bg-emerald-100 text-emerald-800" 
                            : "bg-amber-100 text-amber-800"
                        }`}>
                          {order.paymentMethod === "COD" ? "Cash On Delivery" : "Paid via UPI"}
                        </span>
                        <button
                          onClick={() => setSelectedInvoice(order)}
                          className="px-3 py-1 border border-zari/30 text-alta hover:bg-alta hover:text-kora text-[10px] font-sans uppercase tracking-wider transition-colors flex items-center gap-1"
                        >
                          <Download className="w-3 h-3" />
                          <span>Invoice</span>
                        </button>
                      </div>
                    </div>

                    {/* Order Status Visual Tracker */}
                    <div className="py-2">
                      <p className="text-[10px] font-sans uppercase tracking-widest text-zari font-bold mb-3 flex items-center gap-1">
                        <Truck className="w-3.5 h-3.5" />
                        <span>Live Delivery Status: {order.orderStatus}</span>
                      </p>
                      
                      <div className="grid grid-cols-5 gap-1 text-center text-[9px] font-sans">
                        {["PLACED", "CONFIRMED", "PACKED", "DISPATCHED", "DELIVERED"].map((step, idx) => {
                          const steps = ["PLACED", "CONFIRMED", "PACKED", "DISPATCHED", "DELIVERED"];
                          const currentIdx = steps.indexOf(order.orderStatus);
                          const isDone = idx <= currentIdx;
                          return (
                            <div key={step} className="flex flex-col items-center">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center mb-1 text-[10px] font-bold ${
                                isDone ? "bg-alta text-kora" : "bg-gray-200 text-gray-500"
                              }`}>
                                {isDone ? "✓" : idx + 1}
                              </div>
                              <span className={isDone ? "text-alta font-bold" : "text-gray-400"}>
                                {step}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-3 pt-2">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4 bg-kora/40 p-2.5 border border-zari/10">
                          <img
                            src={item.product.image}
                            alt={item.product.title}
                            referrerPolicy="no-referrer"
                            className="w-14 h-16 object-cover border border-zari/10"
                          />
                          <div className="flex-1 text-xs">
                            <h4 className="font-serif font-medium text-charcoal">{item.product.title}</h4>
                            <p className="text-[10px] text-zari uppercase font-sans mt-0.5">{item.product.category} • Qty: {item.quantity}</p>
                            {item.product.isSkinFriendly && (
                              <span className="inline-block mt-1 text-[9px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 border border-emerald-200">
                                ✨ Skin-Friendly Gold Polish
                              </span>
                            )}
                          </div>
                          <div className="text-right font-mono text-xs font-bold text-alta">
                            ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Summary Footer */}
                    <div className="flex flex-wrap items-center justify-between pt-3 border-t border-zari/10 text-xs font-sans">
                      <div className="text-charcoal/70">
                        <span>Ship to: </span>
                        <span className="font-medium text-charcoal">{order.shippingAddress.fullName}, {order.shippingAddress.city} - {order.shippingAddress.pincode}</span>
                      </div>
                      <div className="text-right font-serif">
                        <span className="text-charcoal/60 mr-2">Total Amount:</span>
                        <span className="text-base font-bold text-alta">₹{order.total.toLocaleString("en-IN")}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 2: WISHLIST */}
          {activeTab === "wishlist" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-base sm:text-lg text-charcoal font-bold">Your Curated Trousseau Wishlist</h3>
                  <p className="text-xs text-charcoal/60">Saved authentic Banarasi weaves and bridal favorites.</p>
                </div>
                {wishlist.length > 0 && (
                  <button
                    onClick={() => {
                      wishlist.forEach((p) => addToCart(p));
                      alert("All wishlist sarees added to your shopping bag!");
                    }}
                    className="px-3 py-1.5 bg-alta text-kora hover:bg-alta/90 rounded-xl text-xs font-sans font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <span>Move All to Bag</span>
                    <ArrowRight className="w-3 h-3 text-zari" />
                  </button>
                )}
              </div>

              {wishlist.length === 0 ? (
                <div className="text-center py-16 px-4 space-y-4 bg-white border border-zari/20 rounded-2xl">
                  <div className="w-14 h-14 rounded-full bg-alta/5 border border-alta/20 flex items-center justify-center mx-auto text-alta">
                    <Heart className="w-7 h-7 stroke-alta fill-alta/10" />
                  </div>
                  <p className="font-serif text-lg text-charcoal font-bold">Your wishlist is currently empty.</p>
                  <p className="text-xs text-charcoal/60 max-w-sm mx-auto leading-relaxed">
                    Click the heart icon on any handloom saree in our boutique or catalog to save it to your personal favorites.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {wishlist.map((product) => (
                    <div key={product.id} className="border border-zari/25 bg-white rounded-2xl overflow-hidden p-3.5 space-y-3 relative group flex flex-col justify-between hover:border-alta hover:shadow-md transition-all">
                      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-black/5">
                        <img
                          src={product.image}
                          alt={product.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <button
                          onClick={() => removeFromWishlist(product.id)}
                          className="absolute top-2 right-2 p-1.5 bg-white/90 text-red-600 rounded-full hover:bg-red-600 hover:text-white transition-colors shadow-xs cursor-pointer"
                          title="Remove from Wishlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        {product.isBestSeller && (
                          <span className="absolute bottom-2 left-2 bg-amber-400 text-charcoal text-[8px] font-sans font-bold px-2 py-0.5 rounded-full shadow-xs uppercase">
                            Best Seller
                          </span>
                        )}
                      </div>

                      <div className="space-y-1 text-left">
                        <h4 className="font-serif text-xs font-bold text-charcoal line-clamp-1 group-hover:text-alta">{product.title}</h4>
                        <p className="text-[10px] text-zari uppercase font-sans font-bold tracking-wider">{product.threadCount || product.category}</p>
                        <p className="font-mono text-sm font-bold text-alta">₹{product.price.toLocaleString("en-IN")}</p>
                      </div>

                      <button
                        onClick={() => {
                          addToCart(product);
                          removeFromWishlist(product.id);
                        }}
                        className="w-full bg-alta text-kora text-[10px] font-sans font-bold uppercase tracking-widest py-2.5 rounded-xl hover:bg-alta/90 transition-all flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer active:scale-95"
                      >
                        <span>Move to Bag</span>
                        <ArrowRight className="w-3 h-3 text-zari" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ADDRESSES */}
          {activeTab === "addresses" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-base text-alta italic">Delivery Addresses across India</h3>
                <button
                  onClick={() => setShowAddressForm(!showAddressForm)}
                  className="px-4 py-2 bg-alta text-kora text-xs font-sans uppercase tracking-wider hover:bg-alta/90 transition-colors flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5 text-zari" />
                  <span>Add New Address</span>
                </button>
              </div>

              {/* Add Address Form */}
              {showAddressForm && (
                <form onSubmit={handleAddAddress} className="border border-zari/30 bg-white/80 p-5 space-y-4 text-xs font-sans">
                  <h4 className="font-cinzel text-sm font-bold text-alta uppercase tracking-wider border-b border-zari/10 pb-2">
                    Enter Delivery Details
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-charcoal/70 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={newAddr.fullName}
                        onChange={(e) => setNewAddr({ ...newAddr, fullName: e.target.value })}
                        className="w-full p-2 border border-zari/30 bg-kora/50 focus:border-alta outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-charcoal/70 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={newAddr.phone}
                        onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                        className="w-full p-2 border border-zari/30 bg-kora/50 focus:border-alta outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[10px] uppercase tracking-wider text-charcoal/70 mb-1">Street Address / House No. / Flat *</label>
                      <input
                        type="text"
                        required
                        value={newAddr.streetAddress}
                        onChange={(e) => setNewAddr({ ...newAddr, streetAddress: e.target.value })}
                        className="w-full p-2 border border-zari/30 bg-kora/50 focus:border-alta outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-charcoal/70 mb-1">Locality / Area *</label>
                      <input
                        type="text"
                        required
                        value={newAddr.locality}
                        onChange={(e) => setNewAddr({ ...newAddr, locality: e.target.value })}
                        className="w-full p-2 border border-zari/30 bg-kora/50 focus:border-alta outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-charcoal/70 mb-1">Pincode *</label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        value={newAddr.pincode}
                        onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                        className="w-full p-2 border border-zari/30 bg-kora/50 focus:border-alta outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-charcoal/70 mb-1">City *</label>
                      <input
                        type="text"
                        required
                        value={newAddr.city}
                        onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                        className="w-full p-2 border border-zari/30 bg-kora/50 focus:border-alta outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-charcoal/70 mb-1">State *</label>
                      <input
                        type="text"
                        required
                        value={newAddr.state}
                        onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                        className="w-full p-2 border border-zari/30 bg-kora/50 focus:border-alta outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-charcoal/70 mb-1">Address Type</label>
                      <select
                        value={newAddr.addressType}
                        onChange={(e) => setNewAddr({ ...newAddr, addressType: e.target.value as any })}
                        className="w-full p-2 border border-zari/30 bg-kora/50 focus:border-alta outline-none"
                      >
                        <option value="Home">Home</option>
                        <option value="Office">Office</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-3 border-t border-zari/10">
                    <button
                      type="button"
                      onClick={() => setShowAddressForm(false)}
                      className="px-4 py-2 border border-zari/30 text-charcoal hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-alta text-kora hover:bg-alta/90 font-medium"
                    >
                      Save Address
                    </button>
                  </div>
                </form>
              )}

              {/* Saved Address List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userProfile.addresses.map((addr) => (
                  <div key={addr.id} className="border border-zari/30 bg-white/80 p-4 space-y-2 relative text-xs font-sans shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 bg-zari/20 text-alta text-[9px] font-bold uppercase tracking-wider">
                        {addr.addressType}
                      </span>
                      <button
                        onClick={() => handleDeleteAddress(addr.id)}
                        className="text-red-600 hover:text-red-800 p-1"
                        title="Delete Address"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h4 className="font-serif text-sm font-bold text-charcoal">{addr.fullName}</h4>
                    <p className="text-charcoal/80 leading-relaxed">
                      {addr.streetAddress}, {addr.locality}<br />
                      {addr.city}, {addr.state} - <span className="font-mono font-bold text-alta">{addr.pincode}</span>
                    </p>
                    <p className="text-[11px] text-charcoal/60">Phone: {addr.phone}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PROFILE EDIT */}
          {activeTab === "profile" && (
            <form onSubmit={handleSaveProfile} className="space-y-4 max-w-lg text-xs font-sans">
              <h3 className="font-serif text-base text-alta italic">Patron Profile Settings</h3>
              
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-charcoal/70 mb-1">Full Name</label>
                <input
                  type="text"
                  value={userProfile.name}
                  onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                  className="w-full p-2.5 border border-zari/30 bg-white focus:border-alta outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-charcoal/70 mb-1">Email Address</label>
                <input
                  type="email"
                  value={userProfile.email}
                  onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                  className="w-full p-2.5 border border-zari/30 bg-white focus:border-alta outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-charcoal/70 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={userProfile.phone}
                  onChange={(e) => setUserProfile({ ...userProfile, phone: e.target.value })}
                  className="w-full p-2.5 border border-zari/30 bg-white focus:border-alta outline-none"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-alta text-kora text-xs uppercase tracking-widest font-sans hover:bg-alta/90 transition-colors"
              >
                Save Changes
              </button>
            </form>
          )}

        </div>
      </motion.div>

      {/* Tax Invoice Modal Overlay */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white p-8 max-w-xl w-full border border-zari space-y-6 text-charcoal text-xs shadow-2xl relative">
            <button
              onClick={() => setSelectedInvoice(null)}
              className="absolute top-4 right-4 p-1 text-gray-500 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-zari/20 pb-4 text-center space-y-1">
              <h2 className="font-cinzel text-xl font-bold text-alta tracking-widest">IRAAYA (WAZIR & CO)</h2>
              <p className="text-[10px] uppercase tracking-widest text-zari">Official Tax Invoice & Authenticity Certificate</p>
              <p className="text-[10px] text-gray-500">GSTIN: 09AAFFA9021K1ZM • Banaras (Varanasi), Uttar Pradesh</p>
            </div>

            <div className="flex justify-between text-[11px] font-sans border-b border-gray-100 pb-3">
              <div>
                <p className="font-bold text-alta">Invoice #: {selectedInvoice.id}</p>
                <p className="text-gray-500">Date: {selectedInvoice.date}</p>
                <p className="text-gray-500">Payment: {selectedInvoice.paymentMethod} ({selectedInvoice.paymentStatus})</p>
              </div>
              <div className="text-right">
                <p className="font-bold">Customer: {selectedInvoice.shippingAddress.fullName}</p>
                <p className="text-gray-500">{selectedInvoice.shippingAddress.city}, {selectedInvoice.shippingAddress.state}</p>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="space-y-2">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-gray-200 text-[10px] uppercase text-gray-500">
                    <th className="py-2">Item Description</th>
                    <th className="py-2 text-center">Qty</th>
                    <th className="py-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedInvoice.items.map((item, idx) => (
                    <tr key={idx} className="border-b border-gray-100">
                      <td className="py-2 font-serif">{item.product.title}</td>
                      <td className="py-2 text-center font-mono">{item.quantity}</td>
                      <td className="py-2 text-right font-mono">₹{(item.product.price * item.quantity).toLocaleString("en-IN")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="space-y-1 text-right border-t border-gray-200 pt-3">
              <p className="text-gray-600">Subtotal: ₹{selectedInvoice.subtotal.toLocaleString("en-IN")}</p>
              <p className="text-emerald-700">Express Delivery: FREE</p>
              <p className="font-serif text-base font-bold text-alta">
                Grand Total: ₹{selectedInvoice.total.toLocaleString("en-IN")}
              </p>
            </div>

            <div className="pt-4 border-t border-gray-100 text-center space-y-3">
              <p className="text-[10px] text-gray-500 italic">
                "Thank you for choosing Iraaya. Every Banarasi saree is guaranteed 100% authentic and handwoven."
              </p>
              <button
                onClick={() => window.print()}
                className="px-6 py-2 bg-alta text-kora text-xs uppercase tracking-widest font-sans hover:bg-alta/90"
              >
                Print / Save PDF
              </button>
            </div>
          </div>
        </div>
      )}

        </div>
      )}
    </AnimatePresence>
  );
}
