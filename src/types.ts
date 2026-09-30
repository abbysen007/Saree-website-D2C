/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Weaver {
  id: string;
  name: string;
  region: string;
  photo: string;
  bio: string;
  craft: string;
  experienceYears: number;
  generations: number;
}

export interface TextileDiscipline {
  id: string;
  title: string;
  subTagline?: string;
  subtitle: string;
  description: string;
  mainImage: string;
  craftStory: string;
  threadCount: number;
  weeksToComplete: number;
  weaver: Weaver;
  historicalContext: string;
  motifs: string[];
}

export interface WeaveDensity {
  id: string;
  label: string;
  count: string;
  description: string;
  zoomOverlayPattern: string;
  difficultyMultiplier: number;
}

export interface WeaveMaterial {
  id: string;
  name: string;
  origin: string;
  feel: string;
  description: string;
  availableDensities: string[];
  zariRatio: string;
}

export interface EmbroideryType {
  id: string;
  name: string;
  description: string;
  timePerSqInch: string;
}

export interface BoutiqueProduct {
  id: string;
  title: string;
  category: "Sarees" | string;
  subCategory?: "Pure Katan Silk" | "Georgette Khaddi" | "Tissue & Organza" | string;
  price: number; // In INR ₹
  image: string;
  secondaryImage: string;
  description: string;
  threadCount: string;
  weavingDuration?: string;
  artisanName: string;
  motifsUsed: string[];
  specs?: string[];
  isSkinFriendly?: boolean;
  metalFinish?: string;
  inStock?: boolean;
  isBestSeller?: boolean;
  isPremium?: boolean;
}

export interface SareeVideo {
  id: string;
  title: string;
  sareeType?: string;
  sareeName?: string;
  videoUrl: string;
  thumbnail: string;
  duration: string;
  likesCount?: number;
  description: string;
  price: number;
  productRefId?: string;
}

export interface SareeCustomizationRequest {
  id?: string;
  fullName: string;
  phone: string;
  email: string;
  sareeType: string;
  colorPreference: string;
  zariType?: string;
  zariPreference?: string;
  budgetRange: string;
  deadlineDate: string;
  notes: string;
  referenceImageName?: string;
  referenceImagePreview?: string;
  referenceImageUrl?: string;
  createdAt?: string;
}

export interface DeliveryAddress {
  id: string;
  fullName: string;
  phone: string;
  altPhone?: string;
  streetAddress: string;
  locality: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
  addressType: "Home" | "Office" | "Other";
  isDefault?: boolean;
}

export interface OrderItem {
  product: BoutiqueProduct;
  quantity: number;
  selectedSize?: string;
}

export type PaymentMethodType = "UPI" | "COD" | "CARD" | "NETBANKING";

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  shippingAddress: DeliveryAddress;
  paymentMethod: PaymentMethodType;
  upiTransactionId?: string;
  paymentStatus: "PAID" | "PENDING_COD" | "FAILED";
  orderStatus: "PLACED" | "CONFIRMED" | "PACKED" | "DISPATCHED" | "DELIVERED";
  trackingNumber: string;
  estimatedDeliveryDate: string;
}

export interface UserProfile {
  id?: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  addresses: DeliveryAddress[];
  defaultAddressId?: string;
}


export interface AppointmentSlot {
  id: string;
  time: string;
  available: boolean;
}

export interface AppointmentService {
  id: string;
  title: string;
  subTitle?: string;
  description: string;
  duration: string;
  priceEstimate: string;
}
