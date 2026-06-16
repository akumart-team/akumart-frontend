// ============================================================
//  ORDER PAYMENT — Buyer Protection Banner
// ============================================================
import { AkumartLogoIcon, ShieldCheckIcon } from "./Icon";

const PROTECTION_POINTS = [
  "Dispute resolution available if issues arise",
  "Full refund if order is cancelled before shipping",
  "All sellers are verified by AkuMart",
  "Your payment is held in secure escrow until you confirm receipt",
];

const BuyerProtectionBanner = () => {
  return (
    <div className="bg-[#16A34A] rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <AkumartLogoIcon />
        <h3
          className="text-white font-bold text-base"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Buyer Protection
        </h3>
      </div>

      {/* Protection points */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
        {PROTECTION_POINTS.map((point) => (
          <div key={point} className="flex items-start gap-2">
            <div className="shrink-0 mt-0.5">
              <ShieldCheckIcon />
            </div>
            <p className="text-white text-xs leading-relaxed">{point}</p>
          </div>
        ))}
      </div>

      {/* Terms */}
      <p className="text-white/70 text-xs text-center">
        By placing this order, you agree to AkuMart's{" "}
        <span className="underline cursor-pointer hover:text-white transition-colors">
          Terms of Service
        </span>{" "}
        and{" "}
        <span className="underline cursor-pointer hover:text-white transition-colors">
          Privacy Policy
        </span>
      </p>
    </div>
  );
};

export default BuyerProtectionBanner;