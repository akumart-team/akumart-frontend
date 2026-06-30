import Mail from "../../assets/icons/mail.png";
import Notification from "../../assets/icons/notification.png";
import { useLocation } from "react-router-dom";

import HamburgerIcon from "./HamburgerIcon.tsx";

interface SellerHeaderProps {
  onMenuToggle: () => void;
}
interface PageInfo {
  title: string;
  subtitle: string;
}

export default function SellerHeader({ onMenuToggle }: SellerHeaderProps) {
  const location = useLocation();

  // Dynamic routing dictionary mapping URLs to Header Labels
  const getPageInfo = (path: string): PageInfo => {
    if (path.includes("/seller/dashboard"))
      return {
        title: "Dashboard",
        subtitle:
          "Get a quick overview of your listings, orders, sales, and earnings.",
      };
    if (path.includes("/seller/analytics"))
      return {
        title: "Analytics",
        subtitle:
          "Track sales, orders, revenue, and listing performance in one place.",
      };
    if (path.includes("/seller/for-you"))
      return {
        title: "For You Page",
        subtitle:
          "Personalized content & updates",
      };
    if (path.includes("/seller/My-listings"))
      return {
        title: "my Listings",
        subtitle:
          "View all your listed materials here",
      };
       
    if (path.includes("/seller/settings"))
      return {
        title: "Settings",
        subtitle:
          "Manage your account, preferences, payments, and security settings.",
      };

    return {
      title: "Dashboard",
      subtitle:
        "Get a quick overview of your listings, orders, sales, and earnings.",
    };
  };

  const pageInfo = getPageInfo(location.pathname);

  return (
    <header className="h-20 bg-white border-b border-[#E9ECEF] flex items-center justify-between px-4 md:px-8 sticky top-0 z-30">
      {/* Left: Mobile Toggle Trigger */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="p-2 -ml-2 text-[#495057] rounded-lg hover:bg-[#F8F9FA] md:hidden"
          aria-label="Toggle navigation menu"
        >
          <HamburgerIcon isOpen={false} />
        </button>
        <div className="hidden md:block">
          <h1 className="text-[16px] lg:text-[24px] font-bold leading-tight pt-3">
            <span className="text-[#0F172A]">Your </span>
            <span className="text-[#9ADE2A]">{pageInfo.title}</span>
          </h1>

          <p className="text-xs lg:text-[12px] text-[#6B7280]">{pageInfo.subtitle}</p>
        </div>
      </div>

      {/* Right Actions Block (Alerts, Badges, Context Anchors) */}
      <div className="flex items-center gap-4">
        {/* Action Button Badges */}
        <div className="flex items-center gap-1">
          <button className="p-2 text-[#495057]  hover:bg-[#F8F9FA] rounded-full relative w-10">
            <img src={Notification} alt="notification" />
         
          </button>
          <button className="p-2 text-[#495057] hover:bg-[#F8F9FA] rounded-full w-10">
            <img src={Mail} alt="mail" />
          </button>
        </div>

        {/* Action Profile Bubble Anchor */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#E8F5E9] text-[#10B981] flex items-center justify-center font-bold text-xs">
            PG
          </div>
          <span className="text-xs font-bold text-[#495057] hidden sm:block">
            AkuMart Waste Seller
          </span>
        </div>
      </div>
    </header>
  );
}
