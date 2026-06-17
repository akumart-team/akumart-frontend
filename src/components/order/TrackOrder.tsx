import { useNavigate } from "react-router-dom";

//  Types 
type OrderStepStatus = "completed" | "active" | "pending";

interface OrderStep {
  id: string;
  label: string;
  description: string;
  timestamp: string | null;
  status: OrderStepStatus;
}

// ─── Props ────────────────────────────────────────────────────────────────────
interface TrackOrderProps {
  orderId?: string;
  onBack?: () => void;
}

//  SVG Icons 
const BackArrowIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" x2="12" y1="15" y2="3" />
  </svg>
);

const MessageIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

//  Mock data 
const ORDER_STEPS: OrderStep[] = [
  {
    id: "placed",
    label: "Order Placed",
    description: "Your order has been received and is awaiting seller confirmation",
    timestamp: "2026-06-06 10:30 AM",
    status: "completed",
  },
  {
    id: "accepted",
    label: "Order Accepted",
    description: "Seller has confirmed your order and is preparing materials",
    timestamp: "2026-06-06 11:30 AM",
    status: "completed",
  },
  {
    id: "delivered",
    label: "Delivered",
    description: "Materials will be delivered to your location",
    timestamp: null,
    status: "pending",
  },
  {
    id: "completed",
    label: "Completed",
    description: "Confirm receipt to release payment and leave a review",
    timestamp: null,
    status: "pending",
  },
];

const ORDER_SUMMARY = {
  productName: "PET Bottles",
  seller: "EcoRecycle ltd",
  quantity: "110kg",
  productPrice: 55000,
  transactionFee: 6250,
  total: 61250,
  placedAt: "2026-06-06 10:30 AM",
  orderId: "ORD-1234567890",
  currentStatus: "In Transit",
  escrowAmount: 59400,
};

//  Step Indicator 
const StepIndicator = ({ status }: { status: OrderStepStatus }) => {
  if (status === "completed") {
    return (
      <div className="w-8 h-8 rounded-full bg-[#16A34A] flex items-center justify-center shrink-0 z-10">
        <CheckIcon />
      </div>
    );
  }
  if (status === "active") {
    return (
      <div className="w-8 h-8 rounded-full border-2 border-[#16A34A] bg-white flex items-center justify-center shrink-0 z-10">
        <div className="w-3 h-3 rounded-full bg-[#16A34A]" />
      </div>
    );
  }
  return (
    <div className="w-8 h-8 rounded-full border-2 border-[#D1D5DB] bg-white flex items-center justify-center shrink-0 z-10">
      <div className="w-3 h-3 rounded-full bg-[#D1D5DB]" />
    </div>
  );
};

//  Order Status Card 
const OrderStatusCard = () => (
  <div className="bg-white rounded-2xl border border-[#E9ECEF] p-6">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-[#0F172A] font-bold text-base" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        Order Status
      </h3>
      <span className="text-[#16A34A] text-xs font-semibold bg-[#F0FDF4] px-3 py-1 rounded-full">
        {ORDER_SUMMARY.currentStatus}
      </span>
    </div>

    <div className="relative">
      {ORDER_STEPS.map((step, index) => {
        const isLast = index === ORDER_STEPS.length - 1;
        const isPending = step.status === "pending";
        return (
          <div key={step.id} className="flex gap-4 relative">
            {!isLast && (
              <div
                className="absolute left-4 top-8 bottom-0 w-0.5 -translate-x-1/2 z-0"
                style={{
                  background: step.status === "completed" ? "#16A34A" : "#E9ECEF",
                  height: "calc(100% - 8px)",
                }}
              />
            )}
            <StepIndicator status={step.status} />
            <div className={`pb-7 flex-1 ${isLast ? "pb-0" : ""}`}>
              <p className={`font-semibold text-sm ${isPending ? "text-[#9CA3AF]" : "text-[#0F172A]"}`}>
                {step.label}
              </p>
              <p className={`text-xs mt-0.5 leading-relaxed ${isPending ? "text-[#D1D5DB]" : "text-[#6B7280]"}`}>
                {step.description}
              </p>
              {step.timestamp && (
                <p className={`text-xs mt-1 ${isPending ? "text-[#D1D5DB]" : "text-[#9CA3AF]"}`}>
                  {step.timestamp}
                </p>
              )}
              {isPending && !step.timestamp && (
                <div className="mt-1.5 h-3 w-32 bg-[#F3F4F6] rounded" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

//  Order Summary Card 
const OrderSummaryCard = () => (
  <div className="bg-white rounded-2xl border border-[#E9ECEF] p-6">
    <h3 className="text-[#0F172A] font-bold text-base mb-5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      Order Summary
    </h3>
    <div className="flex justify-between items-start mb-1">
      <div>
        <p className="text-[#0F172A] font-semibold text-sm">{ORDER_SUMMARY.productName}</p>
        <p className="text-[#6B7280] text-xs mt-0.5">Seller: {ORDER_SUMMARY.seller}</p>
        <p className="text-[#6B7280] text-xs">Quantity: {ORDER_SUMMARY.quantity}</p>
      </div>
      <span className="text-[#16A34A] font-bold text-sm">
        ₦{ORDER_SUMMARY.productPrice.toLocaleString()}
      </span>
    </div>
    <div className="border-t border-[#E9ECEF] mt-4 pt-4 space-y-2.5">
      <div className="flex justify-between text-sm">
        <span className="text-[#6B7280]">Product Price</span>
        <span className="text-[#0F172A] font-medium">₦{ORDER_SUMMARY.productPrice.toLocaleString()}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-[#6B7280]">Transaction Fee (5%)</span>
        <span className="text-[#0F172A] font-medium">₦{ORDER_SUMMARY.transactionFee.toLocaleString()}</span>
      </div>
      <div className="border-t border-[#E9ECEF] pt-2.5 flex justify-between">
        <span className="text-[#0F172A] font-bold text-sm">Total</span>
        <span className="text-[#16A34A] font-bold text-base">₦{ORDER_SUMMARY.total.toLocaleString()}</span>
      </div>
    </div>
    <p className="text-[#9CA3AF] text-xs mt-4">Order placed on {ORDER_SUMMARY.placedAt}</p>
  </div>
);

// Payment Status Card 
const PaymentStatusCard = () => (
  <div className="bg-[#16A34A] rounded-2xl p-6">
    <h3 className="text-white font-bold text-base mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      Payment Status
    </h3>
    <div className="flex items-center gap-3 mb-3">
      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
        <ShieldCheckIcon />
      </div>
      <p className="text-white font-semibold text-sm">Payment held in secure escrow</p>
    </div>
    <p className="text-white/80 text-xs leading-relaxed">
      Your ₦{ORDER_SUMMARY.escrowAmount.toLocaleString()} payment is protected and will be released to the seller only after you confirm receipt.
    </p>
    <button className="w-full mt-4 bg-white/20 hover:bg-white/30 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors border border-white/30">
      Payment held in secure escrow
    </button>
  </div>
);

//  Need Help Card 
const NeedHelpCard = () => (
  <div className="bg-white rounded-2xl border border-[#E9ECEF] p-6">
    <h3 className="text-[#0F172A] font-bold text-base mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      Need Help?
    </h3>
    <div className="flex flex-col gap-3">
      <button className="w-full flex items-center justify-center gap-2 py-3 border border-[#E9ECEF] rounded-xl text-[#0F172A] text-sm font-medium hover:bg-gray-50 transition-colors">
        <MessageIcon />
        Message Seller
      </button>
      <button className="w-full flex items-center justify-center gap-2 py-3 border border-[#E9ECEF] rounded-xl text-[#0F172A] text-sm font-medium hover:bg-gray-50 transition-colors">
        <DownloadIcon />
        Download Invoice
      </button>
    </div>
  </div>
);

// ─── Main TrackOrder Component ─────────────────────────────────────────────────
export default function TrackOrder({ orderId, onBack }: TrackOrderProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      // Called as a component inside OrderCard — use the callback
      onBack();
    } else {
      // Called as a standalone route — use router navigation
      navigate(-1);
    }
  };

  const displayOrderId = orderId ?? ORDER_SUMMARY.orderId;

  return (
    <div className="w-full">
      {/* Page header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={handleBack}
          className="p-2 rounded-xl border border-[#E9ECEF] bg-white text-[#6B7280] hover:text-[#0F172A] transition-colors"
          aria-label="Go back"
        >
          <BackArrowIcon />
        </button>
        <div>
          <h1 className="text-[#0F172A] font-bold text-xl" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Track Order
          </h1>
          <p className="text-[#6B7280] text-xs mt-0.5">Order ID: {displayOrderId}</p>
        </div>
      </div>

      {/* ── MOBILE (single column, scrollable) ── */}
      <div className="flex flex-col gap-5 lg:hidden">
        <OrderStatusCard />
        <OrderSummaryCard />
        <NeedHelpCard />
        <PaymentStatusCard />
      </div>

      {/* ── DESKTOP (two columns) ── */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_380px] lg:gap-6 lg:items-start">
        <div className="flex flex-col gap-5">
          <OrderStatusCard />
          <OrderSummaryCard />
        </div>
        <div className="flex flex-col gap-5">
          <PaymentStatusCard />
          <NeedHelpCard />
        </div>
      </div>
    </div>
  );
}