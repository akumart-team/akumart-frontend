
import { NavLink,  } from "react-router-dom";

import Dashboard from "../../assets/icons/dashboard.png"
import Settings from "../../assets/icons/settings.png"
import Cart from "../../assets/icons/cart.png"
import Search from "../../assets/icons/search.png"
import Ai from "../../assets/icons/ai.png"
import Logo from "../../assets/imgs/logo.png"

interface BuyerSidebarProps {
  onClose: () => void;
}

export default function BuyerSidebar({ onClose }: BuyerSidebarProps) {
 

  const navigationItems = [
    { name: "Dashboard", 
    path: "/buyer/dashboard", 
    icon: Dashboard },
    { name: "AI Recommendations", path: "/buyer/AIRecomendation", icon: Ai },
    { name: "Browse Marketplace", path: "/buyer/marketplace", icon: Search },
    { name: "Orders", path: "/buyer/orders", icon: Cart },
    { name: "Settings", path: "/buyer/settings", icon: Settings },
  ];

  return (
    <div className="flex flex-col h-full bg-white justify-between ">
      <div>
        {/* Brand Header Identity */}
        <div className="h-20 flex items-center px-6 border-b border-[#E9ECEF]">
          <div className="flex items-center gap-2 w-40">
            
             <img src={Logo} alt='logo'/>
          
          </div>
        </div>

        {/* Dynamic Navigation Container Stack */}
        <nav className="mt-6 px-4 space-y-1 font-['Plus_Jakarta_Sans',sans-serif] ">
          {navigationItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200
                ${isActive 
                  ? "bg-[#10B981] text-white shadow-sm" 
                  : "text-[#818181] hover:bg-[#F8F9FA] hover:text-[#111827]"
                }
              `}
            >
              {({ isActive }) => (
                <>
                  
                  <img
                    src={item.icon}
                    alt={`${item.name} icon`}
                    className={`w-5 h-5 object-contain transition-all ${
                      isActive ? "invert-0 brightness-200" : " opacity-70"
                    }`}
                  />
                  <span>{item.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Profile & Session Context Access Layer */}
      <div className="p-4 border-t border-[#E9ECEF]">
        <div className="flex items-center gap-3 p-2 mb-3">
          <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
            <span className="w-full h-full flex items-center justify-center text-sm font-bold bg-[#E8F5E9] text-[#10B981]">
              PN
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-[#111827] truncate">Praise Godwin</p>
            <p className="text-xs text-[#6C757D] truncate">AkuMart Waste Buyer</p>
          </div>
        </div>
        
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-[#E9ECEF] rounded-xl text-sm font-bold text-[#DC3545] hover:bg-[#FFF5F5] transition-colors">
          <span></span> Logout
        </button>
      </div>
    </div>
  );
}
