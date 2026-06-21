import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { User, UINotification, CardPaymentMethod ,CardFormData,CheckoutProduct} from "./utils/types";

//  AUTH STORE 
interface AuthStore {
  user: User | null;
  token: string | null;
  refreshToken: string | null;       
  isAuthenticated: boolean;
  setUser: (user: User, token: string, refreshToken: string) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,

      setUser: (user, token, refreshToken) =>
        set({ user, token, refreshToken, isAuthenticated: true }),

      logout: () =>
        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
        }),

      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),
    }),
    {
      name: "akumart-auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// UI STORE ─
interface UIStore {
  isLoading: boolean;
  activeModal: string | null;
  notifications: UINotification[];
  setLoading: (loading: boolean) => void;
  openModal: (modal: string) => void;
  closeModal: () => void;
  addNotification: (message: string, type?: "success" | "error" | "info") => void;
  clearNotifications: () => void;
}

export const useUIStore = create<UIStore>()((set) => ({
  isLoading: false,
  activeModal: null,
  notifications: [],
  setLoading: (loading) => set({ isLoading: loading }),
  openModal: (modal) => set({ activeModal: modal }),
  closeModal: () => set({ activeModal: null }),
  addNotification: (message, type = "info") =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        { id: Date.now().toString(), message, type },
      ],
    })),
  clearNotifications: () => set({ notifications: [] }),
}));


interface OrderStore {
  // Track Order
  trackingOrderId: string | null;
  setTrackingOrderId: (id: string | null) => void;
 
  // File Dispute
  disputeOrderId: string | null;
  setDisputeOrderId: (id: string | null) => void;
 
  // Checkout / Payment
  checkoutProductId: string | null;
  checkoutProduct: CheckoutProduct | null;
  selectedPayment: CardPaymentMethod;
  cardData: CardFormData;
  isSubmitting: boolean;
 
  startCheckout: (product: CheckoutProduct) => void;
  endCheckout: () => void;
  setSelectedPayment: (method: CardPaymentMethod) => void;
  setCardField: (field: keyof CardFormData, value: string) => void;
  setIsSubmitting: (value: boolean) => void;
}
 
export const useOrderStore = create<OrderStore>()((set) => ({
  // Track Order
  trackingOrderId: null,
  setTrackingOrderId: (id) => set({ trackingOrderId: id }),
 
  // File Dispute
  disputeOrderId: null,
  setDisputeOrderId: (id) => set({ disputeOrderId: id }),
 
  // Checkout / Payment
  checkoutProductId: null,
  checkoutProduct: null,
  selectedPayment: "mastercard",
  cardData: { cardNumber: "", cardHolder: "", expiry: "", cvv: "" },
  isSubmitting: false,
 
  startCheckout: (product) =>
    set({ checkoutProductId: product.id, checkoutProduct: product }),
 
  endCheckout: () =>
    set({
      checkoutProductId: null,
      checkoutProduct: null,
      selectedPayment: "mastercard",
      cardData: { cardNumber: "", cardHolder: "", expiry: "", cvv: "" },
      isSubmitting: false,
    }),
 
  setSelectedPayment: (method) => set({ selectedPayment: method }),
 
  setCardField: (field, value) =>
    set((state) => ({ cardData: { ...state.cardData, [field]: value } })),
 
  setIsSubmitting: (value) => set({ isSubmitting: value }),
}));


