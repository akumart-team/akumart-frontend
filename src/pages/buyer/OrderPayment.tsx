import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// ── Sub-components
import OrderSummaryCard from "../../components/order/Ordersummarycard";
import PaymentMethodCard from "../../components/order/Paymentmethodcard";
import DeliveryMethodCard from "../../components/order/Deliverymethodcard";
import BuyerProtectionBanner from "../../components/order/Buyerprotectionbanner";
import OrderSuccessModal from "../../components/order/Ordersuccessmodal";

// ── Types
import type {
  CardPaymentMethod,
  CardFormData,
  DeliveryFormData,
  OrderData,
} from "../../utils/types";

// ── Back Arrow Icon
// const BackArrowIcon = () => (
//   <svg
//     width="20"
//     height="20"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="m15 18-6-6 6-6" />
//   </svg>
// );

//  Route state shape passed from listing / AI recommendation page 
interface LocationState {
  checkoutProduct?: {
    id: string;
    productName: string;
    productPrice: number;
    sellerName: string;
    quantity: string;
    total: number;
  };
}

// Page
export const OrderPayment = () => {
  const navigate = useNavigate();
  const location = useLocation();

  //  Read product data passed via navigate() state
  const routeState = location.state as LocationState | null;
  const product = routeState?.checkoutProduct;

  const [orderId] = useState(() =>
    product ? `ORD-${Date.now()}` : "ORD-1234567890",
  );

  // Build OrderData from route state; fall back to mock while API isn't ready
  const order: OrderData = product
    ? {
        productName: product.productName,
        seller: product.sellerName,
        quantity: product.quantity,
        productPrice: product.productPrice,
        transactionFee: Math.round(product.productPrice * 0.05),
        total: product.total,
        orderId: orderId,
      }
    : {
        productName: "PET Bottles",
        seller: "EcoRecycle Ltd",
        quantity: "110kg",
        productPrice: 55000,
        transactionFee: 6250,
        total: 61250,
        orderId: "orderId",
      };

  //  Local state
  const [selectedPayment, setSelectedPayment] =
    useState<CardPaymentMethod>("mastercard");

  const [cardData, setCardData] = useState<CardFormData>({
    cardNumber: "",
    cardHolder: "",
    expiry: "",
    cvv: "",
  });

  const [deliveryData, setDeliveryData] = useState<DeliveryFormData>({
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  //  Handlers
  const handleCardChange = (field: keyof CardFormData, value: string) => {
    setCardData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDeliveryChange = (
    field: keyof DeliveryFormData,
    value: string,
  ) => {
    setDeliveryData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    try {
      await new Promise((res) => setTimeout(res, 1500));
      setShowSuccessModal(true);
    } catch {
      // TODO: toast.error("Order failed. Please try again.")
    } finally {
      setIsSubmitting(false);
    }
  };

  
  return (
    // Full-screen clean page — no sidebar, no dashboard header
    <div className="min-h-screen bg-[#F8F9FA]">
      {/*  Success modal  */}
      {showSuccessModal && (
        <OrderSuccessModal
          data={{ orderId: order.orderId, totalPaid: order.total }}
          onBackToDashboard={() => navigate("/buyer/dashboard")}
          onTrackOrder={() => navigate("/buyer/orders/track")}
        />
      )}

      {/* Top bar */}
      <div>
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          {/* <button
            onClick={() => navigate(-1)}
            aria-label="Go back"
            className="p-2 rounded-xl border border-[#E9ECEF] bg-white text-[#6B7280] hover:text-[#0F172A] hover:border-gray-300 transition-colors"
          >
            <BackArrowIcon />
          </button> */}
        </div>
      </div>

      {/*  Page content */}
      <div className="max-w-6xl mx-auto px-2 py-4">
        {/*  MOBILE layout — single column, scrollable */}
        <div className="flex flex-col gap-5 lg:hidden">
          <OrderSummaryCard order={order} />

          <PaymentMethodCard
            selectedPayment={selectedPayment}
            onSelectPayment={setSelectedPayment}
            cardData={cardData}
            onCardChange={handleCardChange}
            isSubmitting={isSubmitting}
            total={order.total}
            onPlaceOrder={handlePlaceOrder}
          />

          <DeliveryMethodCard
            formData={deliveryData}
            onChange={handleDeliveryChange}
          />

          <BuyerProtectionBanner />
        </div>

        {/* DESKTOP layout — two columns */}

        <div className="hidden lg:flex lg:flex-col lg:gap-6">
          {/* The 2-column grid only holds the details and payment now */}
          <div className="grid grid-cols-2 gap-6 items-start">
            {/* Left column */}
            <div className="flex flex-col gap-5">
              <OrderSummaryCard order={order} />
              <DeliveryMethodCard
                formData={deliveryData}
                onChange={handleDeliveryChange}
              />
            </div>

            {/* Right column */}
            <div>
              <PaymentMethodCard
                selectedPayment={selectedPayment}
                onSelectPayment={setSelectedPayment}
                cardData={cardData}
                onCardChange={handleCardChange}
                isSubmitting={isSubmitting}
                total={order.total}
                onPlaceOrder={handlePlaceOrder}
              />
            </div>
          </div>

          
          <div className="w-full">
            <BuyerProtectionBanner />
          </div>
        </div>
      </div>
    </div>
  );
};
