// ============================================================
//  ORDER PAYMENT — Payment Method Card
// ============================================================
// NOTE: This is your existing component. The only change made here is
// the import path for CardPaymentMethod / CardFormData, pointed at the
// local ./types.ts used by OrderList. If your real project's type file
// is named differently, just keep importing from your original path —
// the shapes match what's defined in types.ts.

import type { CardPaymentMethod, CardFormData } from '../../utils/types';
import {
  MastercardIcon,
  VisaIcon,
  BankIcon,
  CartIcon,
} from './Icon';

interface PaymentMethodCardProps {
  selectedPayment: CardPaymentMethod;
  onSelectPayment: (method: CardPaymentMethod) => void;
  cardData: CardFormData;
  onCardChange: (field: keyof CardFormData, value: string) => void;
  isSubmitting: boolean;
  total: number;
  onPlaceOrder: () => void;
}

const PaymentMethodCard = ({
  selectedPayment,
  onSelectPayment,
  cardData,
  onCardChange,
  isSubmitting,
  total,
  onPlaceOrder,
}: PaymentMethodCardProps) => {

  const formatCardNumber = (val: string): string => {
    const digits = val.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (val: string): string => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2);
    return digits;
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E9ECEF] p-6">
      <h3
        className="text-[#0F172A] font-bold text-base mb-1"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        Payment Method
      </h3>
      <p className="text-[#6B7280] text-xs mb-5">Select Payment Method</p>

      {/* Card type buttons */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* Mastercard */}
        <button
          type="button"
          onClick={() => onSelectPayment("mastercard")}
          className={`flex items-start gap-3 p-4 rounded-xl border text-left transition-all ${
            selectedPayment === "mastercard"
              ? "border-[#16A34A] bg-[#F0FDF4]"
              : "border-[#E9ECEF] bg-white hover:border-gray-300"
          }`}
        >
          <div className="shrink-0 mt-0.5">
            <MastercardIcon />
          </div>
          <p className="text-[#6B7280] text-xs leading-relaxed">
            Use your Mastercard for fast, secure, and hassle-free payments.
          </p>
        </button>

        {/* Visa */}
        <button
          type="button"
          onClick={() => onSelectPayment("visa")}
          className={`flex items-start gap-3 p-4 rounded-xl border text-left transition-all ${
            selectedPayment === "visa"
              ? "border-[#16A34A] bg-[#F0FDF4]"
              : "border-[#E9ECEF] bg-white hover:border-gray-300"
          }`}
        >
          <div className="shrink-0 mt-0.5">
            <VisaIcon />
          </div>
          <p className="text-[#6B7280] text-xs leading-relaxed">
            Manage payments easily with your Visa card.
          </p>
        </button>
      </div>

      {/* Bank Transfer */}
      <button
        type="button"
        onClick={() => onSelectPayment("bank")}
        className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-medium transition-all mb-5 ${
          selectedPayment === "bank"
            ? "border-[#16A34A] bg-[#F0FDF4] text-[#16A34A]"
            : "border-[#E9ECEF] text-[#6B7280] hover:border-gray-300"
        }`}
      >
        <BankIcon />
        Or Complete Payment with Bank Transfer
      </button>

      {/* Card fields — hidden for bank transfer */}
      {selectedPayment !== "bank" && (
        <div className="space-y-4">
          {/* Card Number */}
          <div>
            <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">
              Card Number
            </label>
            <input
              type="text"
              value={cardData.cardNumber}
              onChange={(e) =>
                onCardChange("cardNumber", formatCardNumber(e.target.value))
              }
              placeholder="•••• •••• •••• ••••"
              maxLength={19}
              className="w-full border border-[#E9ECEF] rounded-xl px-3 py-3 text-sm text-[#0F172A] placeholder:text-[#D1D5DB] outline-none focus:ring-1 focus:ring-emerald-500 tracking-widest"
            />
          </div>

          {/* Card Holder */}
          <div>
            <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">
              Card Holder Name
            </label>
            <input
              type="text"
              value={cardData.cardHolder}
              onChange={(e) => onCardChange("cardHolder", e.target.value)}
              placeholder="•••••••••••••••••"
              className="w-full border border-[#E9ECEF] rounded-xl px-3 py-3 text-sm text-[#0F172A] placeholder:text-[#D1D5DB] outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          {/* Expiry + CVV */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">
                Expiration Date
              </label>
              <input
                type="text"
                value={cardData.expiry}
                onChange={(e) =>
                  onCardChange("expiry", formatExpiry(e.target.value))
                }
                placeholder="MM/YY"
                maxLength={5}
                className="w-full border border-[#E9ECEF] rounded-xl px-3 py-3 text-sm text-[#0F172A] placeholder:text-[#D1D5DB] outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">
                CVV
              </label>
              <input
                type="password"
                value={cardData.cvv}
                onChange={(e) =>
                  onCardChange(
                    "cvv",
                    e.target.value.replace(/\D/g, "").slice(0, 4)
                  )
                }
                placeholder="••••"
                maxLength={4}
                className="w-full border border-[#E9ECEF] rounded-xl px-3 py-3 text-sm text-[#0F172A] placeholder:text-[#D1D5DB] outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* Place Order button */}
      <button
        onClick={onPlaceOrder}
        disabled={isSubmitting}
        className="w-full mt-5 bg-[#16A34A] hover:bg-[#15803D] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
      >
        <CartIcon />
        {isSubmitting
          ? "Processing..."
          : `Place Order - ₦${total.toLocaleString()}`}
      </button>
    </div>
  );
};

export default PaymentMethodCard;