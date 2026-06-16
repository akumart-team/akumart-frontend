
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import type {
  CardPaymentMethod,
  DeliveryFormData,
  CardFormData,
  OrderData,
} from "../../utils/types";

import OrderSummaryCard      from "./Ordersummarycard";
import DeliveryMethodCard    from "./Deliverymethodcard";
import PaymentMethodCard     from "./Paymentmethodcard";
import BuyerProtectionBanner from "./Buyerprotectionbanner";
import OrderSuccessModal     from "./Ordersuccessmodal";
import { BackArrowIcon }     from "./Icon";

//  Mock order data

const MOCK_ORDER: OrderData = {
  productName: "PET Bottles",
  seller: "EcoRecycle Ltd",
  quantity: "110kg",
  productPrice: 55000,
  transactionFee: 6250,
  total: 61250,
  orderId: "ORD-1234567890",
};

//  Page 
export default function OrderPayment() {
  const navigate = useNavigate();

  // Payment state
  const [selectedPayment, setSelectedPayment] = useState<CardPaymentMethod>("mastercard");
  const [cardData, setCardData] = useState<CardFormData>({
    cardNumber: "",
    cardHolder: "",
    expiry: "",
    cvv: "",
  });

  // Delivery state
  const [deliveryData, setDeliveryData] = useState<DeliveryFormData>({
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
  });

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Handlers 

  const handleCardChange = (field: keyof CardFormData, value: string) => {
    setCardData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDeliveryChange = (field: keyof DeliveryFormData, value: string) => {
    setDeliveryData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    try {
      
      await new Promise((res) => setTimeout(res, 1500)); 
      setShowSuccessModal(true);
    } catch {
      // Handle error — add toast here when ready
    } finally {
      setIsSubmitting(false);
    }
  };

  //  Render 
  return (
    <>
      {/* Success modal — shown after order placed */}
      {showSuccessModal && (
        <OrderSuccessModal
          data={{
            orderId: MOCK_ORDER.orderId,
            totalPaid: MOCK_ORDER.total,
          }}
          onBackToDashboard={() => navigate("/buyer/dashboard")}
          onTrackOrder={() => navigate("/buyer/orders")}
        />
      )}

      <div className="w-full">
        {/* Page header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl border border-[#E9ECEF] bg-white text-[#6B7280] hover:text-[#0F172A] hover:border-gray-300 transition-colors"
            aria-label="Go back"
          >
            <BackArrowIcon />
          </button>
          <div>
            <h1
              className="text-[#0F172A] font-bold text-xl"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Finish Transaction
            </h1>
            <p className="text-[#6B7280] text-xs mt-0.5">
              Review your order and complete payment
            </p>
          </div>
        </div>

        {/*  MOBILE layout — single column, scrollable  */}
        <div className="flex flex-col gap-5 lg:hidden">
          <OrderSummaryCard order={MOCK_ORDER} />
          <PaymentMethodCard
            selectedPayment={selectedPayment}
            onSelectPayment={setSelectedPayment}
            cardData={cardData}
            onCardChange={handleCardChange}
            isSubmitting={isSubmitting}
            total={MOCK_ORDER.total}
            onPlaceOrder={handlePlaceOrder}
          />
          <DeliveryMethodCard
            formData={deliveryData}
            onChange={handleDeliveryChange}
          />
          <BuyerProtectionBanner />
        </div>

        {/*  DESKTOP layout  */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-6 lg:items-start">
          {/* Left: Summary + Delivery + Protection */}
          <div className="flex flex-col gap-5">
            <OrderSummaryCard order={MOCK_ORDER} />
            <DeliveryMethodCard
              formData={deliveryData}
              onChange={handleDeliveryChange}
            />
            <BuyerProtectionBanner />
          </div>

          {/* Right: Payment */}
          <div>
            <PaymentMethodCard
              selectedPayment={selectedPayment}
              onSelectPayment={setSelectedPayment}
              cardData={cardData}
              onCardChange={handleCardChange}
              isSubmitting={isSubmitting}
              total={MOCK_ORDER.total}
              onPlaceOrder={handlePlaceOrder}
            />
          </div>
        </div>
      </div>
    </>
  );
}