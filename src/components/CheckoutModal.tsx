import React, { useState } from "react";
import { X, CheckCircle2, ShieldCheck, QrCode, PhoneCall, Truck, CreditCard, ArrowRight, ArrowLeft, Copy, Sparkles, AlertCircle } from "lucide-react";
import { BoutiqueProduct, DeliveryAddress, Order, OrderItem, PaymentMethodType, UserProfile } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: BoutiqueProduct[];
  clearCart: () => void;
  userProfile: UserProfile | null;
  onOrderPlaced: (order: Order) => void;
}

export function CheckoutModal({
  isOpen,
  onClose,
  cart,
  clearCart,
  userProfile,
  onOrderPlaced,
}: CheckoutModalProps) {
  const [step, setStep] = useState<"address" | "payment" | "success">("address");
  const [copiedUpi, setCopiedUpi] = useState(false);

  // Address State
  const addresses = userProfile?.addresses || [];
  const defaultAddr = addresses.find((a) => a.isDefault) || addresses[0] || {
    id: "addr-default",
    fullName: userProfile?.name || "",
    phone: userProfile?.phone || "",
    streetAddress: "",
    locality: "",
    city: "Varanasi",
    state: "Uttar Pradesh",
    pincode: "",
    landmark: "",
    addressType: "Home",
  };

  const [address, setAddress] = useState<DeliveryAddress>(defaultAddr);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>("UPI");
  const [upiTxnId, setUpiTxnId] = useState("");
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  // Pricing
  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const discount = subtotal > 5000 ? Math.round(subtotal * 0.1) : 0; // 10% discount above 5k
  const shippingFee = 0; // Free express shipping
  const grandTotal = subtotal - discount + shippingFee;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText("iraaya.demo@upi");
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.fullName || !address.phone || !address.streetAddress || !address.pincode) {
      alert("Please fill in all required delivery address fields.");
      return;
    }
    setStep("payment");
  };

  const handleCompleteOrder = () => {
    if (paymentMethod === "UPI" && !upiTxnId) {
      setUpiTxnId("UPI-" + Math.floor(100000000000 + Math.random() * 900000000000));
    }

    const orderId = "AVH-" + Math.floor(10000 + Math.random() * 90000);
    const orderItems: OrderItem[] = cart.map((p) => ({ product: p, quantity: 1 }));

    const newOrder: Order = {
      id: orderId,
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
      items: orderItems,
      subtotal,
      discount,
      shippingFee,
      total: grandTotal,
      shippingAddress: address,
      paymentMethod,
      upiTransactionId: paymentMethod === "UPI" ? upiTxnId || "UPI-MOCK-98124" : undefined,
      paymentStatus: paymentMethod === "UPI" ? "PAID" : "PENDING_COD",
      orderStatus: "PLACED",
      trackingNumber: "EXP-IN-" + Math.floor(100000 + Math.random() * 900000),
      estimatedDeliveryDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "short",
      }),
    };

    setPlacedOrder(newOrder);
    onOrderPlaced(newOrder);
    clearCart();
    setStep("success");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-alta/50 backdrop-blur-md"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.93, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-3xl bg-kora border border-zari/30 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] z-10"
          >
        
        {/* Header */}
        <div className="bg-alta text-kora p-5 flex items-center justify-between border-b border-zari/30">
          <div>
            <h2 className="font-cinzel text-lg md:text-xl tracking-wider text-kora">
              IRAAYA CHECKOUT
            </h2>
            <p className="text-[10px] font-sans tracking-widest text-zari uppercase">
              {step === "address" && "Step 1: Delivery Address"}
              {step === "payment" && "Step 2: Choose Payment Method"}
              {step === "success" && "Step 3: Order Confirmed"}
            </p>
          </div>
          <button onClick={onClose} className="p-2 border border-zari/30 rounded-full hover:bg-zari/20 text-kora">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* STEP 1: ADDRESS */}
          {step === "address" && (
            <form onSubmit={handleProceedToPayment} className="space-y-6">
              
              {/* Order Items Preview */}
              <div className="bg-white/70 border border-zari/20 p-4 space-y-3">
                <h3 className="font-serif text-xs font-bold uppercase tracking-wider text-alta flex items-center justify-between">
                  <span>Selected Items ({cart.length})</span>
                  <span className="font-mono text-alta text-sm">₹{grandTotal.toLocaleString("en-IN")}</span>
                </h3>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {cart.map((item) => (
                    <div key={item.id} className="flex-shrink-0 flex items-center gap-2 bg-kora p-2 border border-zari/10 w-48">
                      <img src={item.image} alt={item.title} className="w-10 h-12 object-cover" />
                      <div className="text-[10px] overflow-hidden">
                        <p className="font-serif truncate font-medium text-charcoal">{item.title}</p>
                        <p className="font-mono font-bold text-alta">₹{item.price.toLocaleString("en-IN")}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Details Form */}
              <div className="space-y-4 text-xs font-sans">
                <h3 className="font-cinzel text-xs font-bold uppercase tracking-wider text-alta border-b border-zari/10 pb-2">
                  Shipping Destination in India
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-charcoal/70 mb-1">Receiver Name *</label>
                    <input
                      type="text"
                      required
                      value={address.fullName}
                      onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                      placeholder="e.g. Srimoyee Sengupta"
                      className="w-full p-2.5 border border-zari/30 bg-white focus:border-alta outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-charcoal/70 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={address.phone}
                      onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                      placeholder="+91 98300 00000"
                      className="w-full p-2.5 border border-zari/30 bg-white focus:border-alta outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[10px] uppercase tracking-wider text-charcoal/70 mb-1">Street Address / House No. / Building *</label>
                    <input
                      type="text"
                      required
                      value={address.streetAddress}
                      onChange={(e) => setAddress({ ...address, streetAddress: e.target.value })}
                      placeholder="Flat 4B, Heritage Enclave, Park Street"
                      className="w-full p-2.5 border border-zari/30 bg-white focus:border-alta outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-charcoal/70 mb-1">Locality / Area *</label>
                    <input
                      type="text"
                      required
                      value={address.locality}
                      onChange={(e) => setAddress({ ...address, locality: e.target.value })}
                      placeholder="Near Rabindra Sadan"
                      className="w-full p-2.5 border border-zari/30 bg-white focus:border-alta outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-charcoal/70 mb-1">Pin Code *</label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={address.pincode}
                      onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                      placeholder="700020"
                      className="w-full p-2.5 border border-zari/30 bg-white focus:border-alta outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-charcoal/70 mb-1">City *</label>
                    <input
                      type="text"
                      required
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      className="w-full p-2.5 border border-zari/30 bg-white focus:border-alta outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-charcoal/70 mb-1">State *</label>
                    <input
                      type="text"
                      required
                      value={address.state}
                      onChange={(e) => setAddress({ ...address, state: e.target.value })}
                      className="w-full p-2.5 border border-zari/30 bg-white focus:border-alta outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="flex justify-between items-center pt-4 border-t border-zari/20">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-zari/30 text-charcoal hover:bg-gray-100 text-xs uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-alta text-kora hover:bg-alta/90 text-xs font-sans uppercase tracking-widest font-medium flex items-center gap-2"
                >
                  <span>Proceed to Payment</span>
                  <ArrowRight className="w-4 h-4 text-zari" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: PAYMENT METHOD */}
          {step === "payment" && (
            <div className="space-y-6 text-xs font-sans">
              
              {/* Order Summary Ribbon */}
              <div className="bg-alta/5 border border-zari/30 p-4 flex justify-between items-center">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-zari font-bold">Total Payable Amount</p>
                  <p className="font-serif text-2xl font-bold text-alta">₹{grandTotal.toLocaleString("en-IN")}</p>
                </div>
                <div className="text-right text-[11px] text-charcoal/70">
                  <p>Express Shipping: <span className="text-emerald-700 font-bold">FREE</span></p>
                  <p>Delivering to: <span className="font-bold">{address.city} ({address.pincode})</span></p>
                </div>
              </div>

              {/* Payment Choices */}
              <div className="space-y-4">
                <h3 className="font-cinzel text-xs font-bold uppercase tracking-wider text-alta border-b border-zari/10 pb-2">
                  Select Payment Option
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Option 1: UPI */}
                  <div
                    onClick={() => setPaymentMethod("UPI")}
                    className={`p-4 border cursor-pointer transition-all ${
                      paymentMethod === "UPI"
                        ? "border-alta bg-white shadow-md ring-1 ring-alta"
                        : "border-zari/20 bg-white/60 hover:border-alta/50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-serif text-sm font-bold text-alta flex items-center gap-2">
                        <QrCode className="w-4 h-4 text-zari" />
                        <span>Instant UPI / QR Code</span>
                      </span>
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[9px] font-bold uppercase">
                        Recommended
                      </span>
                    </div>
                    <p className="text-[11px] text-charcoal/70 leading-relaxed">
                      Pay via Google Pay, PhonePe, Paytm, BHIM, or Scan QR code. Instant payment confirmation.
                    </p>
                  </div>

                  {/* Option 2: COD */}
                  <div
                    onClick={() => setPaymentMethod("COD")}
                    className={`p-4 border cursor-pointer transition-all ${
                      paymentMethod === "COD"
                        ? "border-alta bg-white shadow-md ring-1 ring-alta"
                        : "border-zari/20 bg-white/60 hover:border-alta/50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-serif text-sm font-bold text-alta flex items-center gap-2">
                        <Truck className="w-4 h-4 text-zari" />
                        <span>Cash On Delivery (COD)</span>
                      </span>
                      <span className="px-2 py-0.5 bg-zari/20 text-alta text-[9px] font-bold uppercase">
                        Pay on Delivery
                      </span>
                    </div>
                    <p className="text-[11px] text-charcoal/70 leading-relaxed">
                      Pay in cash or UPI to the courier agent when your package arrives at your doorstep.
                    </p>
                  </div>

                </div>
              </div>

              {/* Payment Details Drawer based on choice */}
              {paymentMethod === "UPI" && (
                <div className="border border-zari/30 bg-white p-5 space-y-4 rounded-none text-center">
                  <h4 className="font-serif text-sm font-bold text-alta">Scan QR or Copy Iraaya UPI VPA</h4>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-2">
                    {/* Simulated QR Code */}
                    <div className="p-3 border-2 border-alta bg-kora flex flex-col items-center">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=iraaya.demo@upi%26pn=Iraaya%20Demo%26am=${grandTotal}%26cu=INR`}
                        alt="Iraaya Demo UPI QR Code"
                        className="w-36 h-36"
                      />
                      <span className="text-[9px] font-mono text-alta mt-1">Scan with GPay / PhonePe</span>
                    </div>

                    <div className="text-left space-y-3 max-w-xs">
                      <div>
                        <span className="text-[10px] uppercase text-charcoal/60">Demo Iraaya UPI VPA</span>
                        <div className="flex items-center gap-2 mt-1">
                          <code className="bg-kora p-2 border border-zari/30 font-mono text-alta font-bold text-sm">
                            iraaya.demo@upi
                          </code>
                          <button
                            onClick={handleCopyUpi}
                            className="p-2 border border-alta text-alta hover:bg-alta hover:text-kora text-xs transition-colors flex items-center gap-1"
                          >
                            <Copy className="w-3.5 h-3.5" />
                            <span>{copiedUpi ? "Copied!" : "Copy"}</span>
                          </button>
                        </div>
                      </div>

                      <p className="text-[10px] text-charcoal/60 leading-relaxed">
                        After completing the payment in your UPI app, click below to confirm your order.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleCompleteOrder}
                    className="w-full bg-alta text-kora py-3 text-xs uppercase tracking-widest font-sans font-bold hover:bg-alta/90 transition-colors shadow-lg"
                  >
                    Simulate Payment & Place Order
                  </button>
                </div>
              )}

              {paymentMethod === "COD" && (
                <div className="border border-zari/30 bg-amber-50/60 p-5 space-y-3">
                  <div className="flex items-start gap-2 text-amber-900">
                    <PhoneCall className="w-5 h-5 text-alta mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-serif text-sm font-bold text-alta">Cash On Delivery Order Verification</h4>
                      <p className="text-xs text-charcoal/80 leading-relaxed mt-1">
                        Our boutique concierge team will place a brief verification call to <span className="font-bold">{address.phone}</span> prior to dispatching your handcrafted saree.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleCompleteOrder}
                    className="w-full bg-alta text-kora py-3 text-xs uppercase tracking-widest font-sans font-bold hover:bg-alta/90 transition-colors shadow-lg mt-3"
                  >
                    Confirm Cash On Delivery Order
                  </button>
                </div>
              )}

              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => setStep("address")}
                  className="px-4 py-2 border border-zari/30 text-charcoal hover:bg-gray-100 text-xs uppercase flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Address</span>
                </button>
              </div>

            </div>
          )}

          {/* STEP 3: SUCCESS */}
          {step === "success" && placedOrder && (
            <div className="text-center py-8 space-y-6 font-sans">
              
              <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-600 flex items-center justify-center mx-auto text-emerald-700">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="font-cinzel text-xl font-bold text-alta tracking-wider">
                  ORDER PLACED SUCCESSFULLY!
                </h3>
                <p className="font-serif italic text-charcoal/80">
                  "Thank you for choosing Iraaya. Your pure handloom Banarasi order is being prepared with utmost care."
                </p>
                <div className="inline-block bg-kora border border-zari/30 px-4 py-2 mt-2 font-mono text-sm font-bold text-alta">
                  Order ID: {placedOrder.id}
                </div>
              </div>

              {/* Order Highlights */}
              <div className="bg-white border border-zari/20 p-4 max-w-md mx-auto text-xs text-left space-y-2">
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-charcoal/60">Estimated Delivery:</span>
                  <span className="font-bold text-emerald-800">{placedOrder.estimatedDeliveryDate}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-charcoal/60">Payment Mode:</span>
                  <span className="font-bold text-alta">{placedOrder.paymentMethod} ({placedOrder.paymentStatus})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal/60">Total Paid:</span>
                  <span className="font-bold text-alta">₹{placedOrder.total.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap justify-center gap-4">
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-alta text-kora text-xs uppercase tracking-widest font-sans hover:bg-alta/90"
                >
                  Continue Shopping
                </button>
              </div>

            </div>
          )}

        </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
