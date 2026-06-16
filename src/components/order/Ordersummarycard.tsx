
import type { OrderData } from "../../utils/types";

interface OrderSummaryCardProps {
  order: OrderData;
}

const OrderSummaryCard = ({ order }: OrderSummaryCardProps) => {
  return (
    <div className="bg-white rounded-2xl border border-[#E9ECEF] p-6">
      <h3
        className="text-[#0F172A] font-bold text-base mb-5"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        Order Summary
      </h3>

      {/* Product row */}
      <div className="flex justify-between items-start">
        <div>
          <p className="text-[#0F172A] font-semibold text-sm">{order.productName}</p>
          <p className="text-[#6B7280] text-xs mt-0.5">Seller: {order.seller}</p>
          <p className="text-[#6B7280] text-xs">Quantity: {order.quantity}</p>
        </div>
        <span className="text-[#16A34A] font-bold text-sm">
          ₦{order.productPrice.toLocaleString()}
        </span>
      </div>

      {/* Price breakdown */}
      <div className="border-t border-[#E9ECEF] mt-4 pt-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-[#6B7280]">Product Price</span>
          <span className="text-[#0F172A] font-medium">
            ₦{order.productPrice.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#6B7280]">Transaction Fee (5%)</span>
          <span className="text-[#0F172A] font-medium">
            ₦{order.transactionFee.toLocaleString()}
          </span>
        </div>
        <div className="border-t border-[#E9ECEF] pt-3 flex justify-between">
          <span className="text-[#0F172A] font-bold text-sm">Total</span>
          <span className="text-[#16A34A] font-bold text-base">
            ₦{order.total.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryCard;