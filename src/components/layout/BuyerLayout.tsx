// src/components/layout/BuyerLayout.tsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import BuyerSidebar from "./BuyerSidebar";
import BuyerHeader from "./BuyerHeader";

export default function BuyerLayout() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Desktop Sidebar (Hidden on mobile) */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 border-r border-[#E9ECEF] bg-white">
        <BuyerSidebar onClose={() => setIsMobileSidebarOpen(false)} />
      </div>

      {/* Mobile Sidebar Backed Overlay Backdrop */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 md:hidden transition-opacity"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Mobile Drawer Sidebar Slider */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-[#E9ECEF] transform transition-transform duration-300 ease-in-out md:hidden ${
        isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <BuyerSidebar onClose={() => setIsMobileSidebarOpen(false)} />
      </div>

      {/* App Workspace Core Engine */}
      <div className="flex flex-col flex-1 md:pl-64">
        <BuyerHeader onMenuToggle={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} />
        
        {/* Scrollable Context View Canvas */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 max-w-350 w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}