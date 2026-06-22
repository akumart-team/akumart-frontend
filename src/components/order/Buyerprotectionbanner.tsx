
import {  ShieldCheckIcon } from "./Icon";
import Logo from "../../assets/icons/logo.png"

const PROTECTION_POINTS = [
  "Dispute resolution available if issues arise",
  "Full refund if order is cancelled before shipping",
  "All sellers are verified by AkuMart",
  "Your payment is held in secure escrow until you confirm receipt",
];

const BuyerProtectionBanner = () => {
  return (
    // Uses the exact 24px border-radius from the Figma spec
    <div className="bg-[#16A34A] rounded-3xl w-full p-6 md:p-8 flex flex-col gap-6 md:gap-8 shadow-sm">
      
      {/* Main Content Wrapper */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-12">
        
        {/* Left Column: Brand & Title */}
        <div className="flex flex-col gap-1.5 shrink-0">
          <div className="flex items-center">
            {/* Removed the restrictive w-20 h-5 wrapper so your logo scales cleanly */}
            <img 
              src={Logo} 
              alt="AkuMart Logo" 
              className="h-5 w-auto object-contain"
            />
          </div>
          <h3
            className="text-white font-bold text-lg md:text-xl tracking-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Buyer Protection
          </h3>
        </div>

        {/* Right Column: 2x2 Grid for Desktop, 1 Column for Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 flex-1">
          {PROTECTION_POINTS.map((point) => (
            <div key={point} className="flex items-start gap-2.5">
              <div className="shrink-0 mt-0.5 text-white">
                <ShieldCheckIcon />
              </div>
              <p className="text-white text-xs md:text-[13px] font-medium opacity-95 leading-snug">
                {point}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section: Terms & Conditions Agreement */}
      <div className="pt-2 text-center opacity-80">
        <p className="text-white text-[11px] md:text-xs tracking-wide">
          By placing this order, you agree to AkuMart's{" "}
          <span className="underline cursor-pointer hover:text-white transition-colors font-medium">
            Terms of Service
          </span>{" "}
          and{" "}
          <span className="underline cursor-pointer hover:text-white transition-colors font-medium">
            Privacy Policy
          </span>
        </p>
      </div>
    </div>
  );
};

export default BuyerProtectionBanner;
