
import type { OrderSuccessData } from "../../utils/types";
import { CheckCircleIcon } from "./Icon";

interface OrderSuccessModalProps {
  data: OrderSuccessData;
  onBackToDashboard: () => void;
  onTrackOrder: () => void;
}

const OrderSuccessModal = ({
  data,
  onBackToDashboard,
  onTrackOrder,
}: OrderSuccessModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl text-center">

        {/* Success icon */}
        <div className="flex justify-center mb-5">
          <CheckCircleIcon />
        </div>

        {/* Title */}
        <h2
          className="text-[#0F172A] font-bold text-2xl mb-2"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Order Placed Successfully!
        </h2>
        <p className="text-[#6B7280] text-sm mb-7 leading-relaxed">
          Your order has been confirmed and the seller has been notified.
        </p>

        {/* Order details box */}
        <div className="border border-[#E9ECEF] rounded-xl overflow-hidden mb-4">
          <div className="flex justify-between items-center px-4 py-3">
            <span className="text-[#16A34A] text-sm font-semibold">Order ID</span>
            <span className="text-[#0F172A] text-sm font-medium">{data.orderId}</span>
          </div>
          <div className="border-t border-[#E9ECEF]" />
          <div className="flex justify-between items-center px-4 py-3">
            <span className="text-[#16A34A] text-sm font-semibold">Total Paid</span>
            <span className="text-[#0F172A] text-sm font-bold">
              ₦{data.totalPaid.toLocaleString()}
            </span>
          </div>
        </div>

        <p className="text-[#9CA3AF] text-xs mb-7">
          A confirmation email has been sent to your registered email address.
        </p>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={onBackToDashboard}
            className="flex-1 py-3 border border-[#E9ECEF] rounded-xl text-[#0F172A] text-sm font-semibold hover:bg-gray-50 transition-colors"
          >
            Back to Dashboard
          </button>
          <button
            onClick={onTrackOrder}
            className="flex-1 py-3 bg-[#16A34A] hover:bg-[#15803D] text-white rounded-xl text-sm font-semibold transition-colors"
          >
            Track Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessModal;