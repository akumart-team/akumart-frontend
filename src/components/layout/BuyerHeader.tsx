import Mail from "../assets/icons/mail.png"
import Notification from "../assets/icons/notification.png"

import HamburgerIcon from "./HamburgerIcon.tsx"

interface BuyerHeaderProps {
  onMenuToggle: () => void;
}

export default function BuyerHeader({ onMenuToggle }: BuyerHeaderProps) {
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
          <h1 className="text-lg font-bold text-[#111827]">Dashboard</h1>
        </div>
      </div>

      {/* Right Actions Block (Alerts, Badges, Context Anchors) */}
      <div className="flex items-center gap-4">
        {/* Action Button Badges */}
        <div className="flex items-center gap-1">
          <button className="p-2 text-[#495057] hover:bg-[#F8F9FA] rounded-full relative">
            <img src= {Notification} alt="notification" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#DC3545] rounded-full" />
          </button>
          <button className="p-2 text-[#495057] hover:bg-[#F8F9FA] rounded-full">
            <img src={Mail} alt="mail" />
          </button>
        </div>

        <div className="h-8 w-px bg-[#E9ECEF]" />

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
