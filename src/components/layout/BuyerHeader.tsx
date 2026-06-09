import Mail from "../../assets/icons/mail.png"
import Notification from "../../assets/icons/notification.png"
import { useLocation } from "react-router-dom";

import HamburgerIcon from "./HamburgerIcon.tsx"

interface BuyerHeaderProps {
  onMenuToggle: () => void;
}
interface PageInfo {
  title: string;
  subtitle: string;
}

export default function BuyerHeader({ onMenuToggle }: BuyerHeaderProps) {
  const location = useLocation();

  // Dynamic routing dictionary mapping URLs to Header Labels
  const getPageInfo = (path: string): PageInfo => {
    if (path.includes("/buyer/dashboard")) return {
      title: "Dashboard",
      subtitle:
        "Get a quick overview of your listings, orders, sales, and earnings.",
    };
    if (path.includes("/buyer/AIRecomendation")) return {
      title: "AI Recommendation",
      subtitle:
        "Get a quick overview of your listings, orders, sales, and earnings.",
    };
    if (path.includes("/buyer/marketplace")) return {
      title: "MarketPlace",
      subtitle:
        "Get a quick overview of your listings, orders, sales, and earnings.",
    };
    if (path.includes("/buyer/orders")) return {
      title: "Orders",
      subtitle:
        "Get a quick overview of your listings, orders, sales, and earnings.",
    };
    if (path.includes("/buyer/settings")) return {
      title: "Settings",
      subtitle:
        "Get a quick overview of your listings, orders, sales, and earnings.",
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
        <HamburgerIcon isOpen={false}/>
        </button>
    <div className="hidden md:block">
  <h1 className="text-[24px] font-bold leading-tight pt-3">
    <span className="text-[#0F172A]">Your </span>
    <span className="text-[#9ADE2A]">{pageInfo.title}</span>
  </h1>

  <p className=" text-base text-[#6B7280]">
    {pageInfo.subtitle}
  </p>
</div>
      </div>

      {/* Right Actions Block (Alerts, Badges, Context Anchors) */}
      <div className="flex items-center gap-4">
        {/* Action Button Badges */}
        <div className="flex items-center gap-1">
          <button className="p-2 text-[#495057]  hover:bg-[#F8F9FA] rounded-full relative w-12">
            <img src= {Notification} alt="notification" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#DC3545] rounded-full" />
          </button>
          <button className="p-2 text-[#495057] hover:bg-[#F8F9FA] rounded-full w-12">
            <img src={Mail} alt="mail" />
          </button>
        </div>

      

        {/* Action Profile Bubble Anchor */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#E8F5E9] text-[#10B981] flex items-center justify-center font-bold text-xs">
            PG
          </div>
          <span className="text-xs font-bold text-[#495057] hidden sm:block">AkuMart Waste Buyer</span>
        </div>
      </div>
    </header>
  );
}
