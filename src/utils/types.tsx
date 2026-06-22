

// USER & AUTH 

export type UserRole = "seller" | "buyer" | "admin";

export type BusinessType =
  | "Manufacturing"
  | "Agriculture"
  | "Construction"
  | "Packaging"
  | "Other";

export type WasteCategory =
  | "Paper"
  | "Plastic"
  | "Metal"
  | "E-Waste"
  | "Rubber"
  | "Fabric"
  | "Organic"
  | "Chemical"
  | "Glass"
  | "Wood"
  | "Other";

export interface User {
  id: string;
  role: UserRole;
  first_name: string;     
  last_name: string; 
  email: string;
  phone: string;
  state: string;
  city: string;
  businessType: BusinessType;
  wasteCategories: WasteCategory[];
  memberSince: string;
  isEmailVerified: boolean;
  avatarUrl?: string;
  // Seller-only
  rating?: number;
  reviewCount?: number;
  totalTransactions?: number;
  // Buyer-only
  productionDescription?: string;
}

// Add these to your existing utils/types.ts file

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  user: User; 
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

//  LISTINGS 

export type LogisticsPreference = "self" | "akumart";

export type ListingStatus = "active" | "paused" | "sold_out" | "deleted";

export interface Listing {
  id: string;
  category: string;
  title: string;
  rating: number;
  company: string;
  location: string;
  distance: string;
  weight: string;
  price: number;
  pricePerKg: number;
  availability: "Immediate" | "Scheduled";
  isBookmarked: boolean;
}

//  ORDERS 


export interface Order {
  id: string;
  listingId: string;
  listingTitle: string;
  sellerId: string;
  sellerName: string;
  buyerId: string;
  buyerName: string;
  weightKg: number;
  pricePerKg: number;
  totalPrice: number;
  transactionFee: number;
  logisticsFee?: number;
  finalTotal: number;
  deliveryAddress?: string;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  placedAt: string;
  updatedAt: string;
  trackingInfo?: string;
}

export type PaymentMethod =
  | "debit_card"
  | "credit_card"
  | "bank_transfer"
  | "crypto";

//  REVIEWS 

export interface Review {
  id: string;
  orderId: string;
  sellerId: string;
  buyerId: string;
  buyerName: string;
  rating: number;
  comment?: string;
  createdAt: string;
}

// SELLER TRACTION 

export interface SellerTraction {
  sellerId: string;
  totalKgSold: number;
  uniqueBuyers: number;
  completionRate: number;
  avgResponseTimeHours: number;
  averageRating: number;
  reviewCount: number;
}

// NOTIFICATIONS 

export type NotificationType =
  | "new_listing_match"
  | "ai_recommendation"
  | "price_update"
  | "order_placed"
  | "order_accepted"
  | "order_declined"
  | "order_in_transit"
  | "order_delivered"
  | "order_completed"
  | "new_review"
  | "new_message"
  | "payment_released";

export interface AppNotification {
  id: string;
  type: NotificationType;
  message: string;
  isRead: boolean;
  createdAt: string;
  linkTo?: string;
}

//  FYP 

export type FYPContentType = "article" | "seller_post" | "news" | "tip";

export interface FYPPost {
  id: string;
  type: FYPContentType;
  title: string;
  body: string;
  authorId?: string;
  authorName: string;
  relatedCategories: WasteCategory[];
  listingId?: string;
  publishedAt: string;
  imageUrl?: string;
}

//API RESPONSES 

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ZUSTAND UI STATE 

export interface UINotification {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

export interface UIState {
  isLoading: boolean;
  activeModal: string | null;
  notifications: UINotification[];
}

export interface FilterPanelProps {
  selectedCategory: string;
  setSelectedCategory: (v: string) => void;
  state: string;
  setState: (v: string) => void;
  minQty: string;
  setMinQty: (v: string) => void;
  sortBy: string;
  setSortBy: (v: string) => void;
  onReset: () => void;
}
export interface MobileFilterDrawerProps extends FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

//  ORDER PAYMENT — Types


export type CardPaymentMethod = "mastercard" | "visa" | "bank";

export interface CardFormData {
  cardNumber: string;
  cardHolder: string;
  expiry: string;
  cvv: string;
}
 
// Delivery
export type DeliveryOption = "delivery" | "self_pickup";
 
export interface DeliveryFormData {
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
}
 
// Order
export interface OrderData {
  productName: string;
  seller: string;
  quantity: string;
  productPrice: number;
  transactionFee: number;
  total: number;
  orderId: string;
}
 
export interface OrderSuccessData {
  orderId: string;
  totalPaid: number;
}

export interface OrderData {
  productName: string;
  seller: string;
  quantity: string;
  productPrice: number;
  transactionFee: number;
  total: number;
  orderId: string;
}

export interface DeliveryFormData {
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
}

export interface CardFormData {
  cardNumber: string;
  cardHolder: string;
  expiry: string;
  cvv: string;
}

export interface OrderSuccessData {
  orderId: string;
  totalPaid: number;
}


export type OrderStatus = 'Inprogress' | 'Delivered' | 'Cancelled' | 'Pending';
export type DeliveryStatus = 'Delivery Overdue' | 'On Track' | 'Delivered' | null;
 
export interface Order {
  id: string;
  orderId: string;
  productName: string;
  productImage: string;
  rating: number;
  sellerName: string;
  location: string;
  distance: string;
  weightAvailable: string;
  deliveryInfo: string;
  status: OrderStatus;
  deliveryStatus: DeliveryStatus;
  progressPercent: number;
  productPrice: number;
  transactionFeePercent: number;
}

export interface CheckoutProduct {
  id: string;
  productName: string;
  productPrice: number;
  sellerName: string;
  quantity: string;
  total: number;
}