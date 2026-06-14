import Plastics from "../assets/imgs/plastics.png";

// Reusable custom SVG Icons to match Figma designs perfectly
const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const LocationIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const BackIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m15 18-6-6 6-6" />
  </svg>
);

interface AIProductOverviewProps {
  listing: {
    id: string;
    category: string;
    title: string;
    rating: number;
    company: string;
    location: string;
    distance: string;
    weight: string;
    price: number;
    pricePerKg: number;
    availability: string;
  } | null;
  onClose: () => void;
}

export const AIProductOverview = ({ listing, onClose }: AIProductOverviewProps) => {
  if (!listing) return null;

  return (
    <>
     
      <div className="fixed inset-0 bg-white z-50 flex flex-col md:hidden">
        {/* Sticky Mobile Top Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100 bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="p-1 -ml-1 text-gray-700" aria-label="Go back">
              <BackIcon />
            </button>
            {/* <h2 className="text-[#111827] font-bold text-lg">Product Overview</h2> */}
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5 pb-24 text-left">
          {/* Main Hero Product Image */}
          <div className="w-full h-52 bg-[#F8FAFC] rounded-2xl overflow-hidden border border-gray-100 flex items-center justify-center">
            <img 
              src={Plastics} 
              alt={listing.title} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Heading Content Info block */}
          <div>
            <span className="bg-[#14532D] text-white text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
              {listing.category}
            </span>
            <h1 className="text-[#111827] text-2xl font-black mt-3 leading-tight tracking-tight">
              {listing.title}
            </h1>
            <div className="flex items-center gap-1.5 mt-2">
              <StarIcon />
              <span className="text-[#F59E0B] text-xs font-bold">{listing.rating}</span>
              <span className="text-gray-300 text-xs">•</span>
              <span className="text-gray-500 text-xs font-medium">{listing.company}</span>
            </div>
          </div>

          {/* Core Price Metrics Box */}
          <div className="grid grid-cols-2 gap-4 bg-[#F8FAFC] p-4 rounded-xl border border-gray-100">
            <div>
              <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Est. Price</p>
              <p className="text-[#16A34A] text-xl font-extrabold mt-0.5">
                ₦{listing.price.toLocaleString()}
              </p>
            </div>
            <div className="border-l border-gray-200 pl-4">
              <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Price / kg</p>
              <p className="text-[#111827] text-base font-extrabold mt-0.5">
                ₦{listing.pricePerKg}/kg
              </p>
            </div>
          </div>

          {/* Details Segment List */}
          <div className="space-y-4 pt-1">
            <h3 className="text-[#111827] font-extrabold text-sm uppercase tracking-wider text-gray-400">Sourcing Details</h3>
            <div className="space-y-3.5">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-gray-400"><LocationIcon /></div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Location</p>
                  <p className="text-sm font-semibold text-[#374151]">{listing.location} ({listing.distance})</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-4 h-4 mt-0.5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[10px] text-[#16A34A] font-extrabold">✓</div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Available Weight</p>
                  <p className="text-sm font-semibold text-[#374151]">{listing.weight}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-4 h-4 mt-0.5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[10px] text-[#16A34A] font-extrabold">✓</div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Logistics Availability</p>
                  <p className="text-sm font-semibold text-[#374151]">{listing.availability} Delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Fixed Bottom Button Layout bar */}
        <div className="p-4 border-t border-gray-100 bg-white fixed bottom-0 left-0 right-0 z-10">
          <button className="w-full bg-[#16A34A] hover:bg-[#15803D] text-white font-bold py-3.5 rounded-xl text-sm transition-colors shadow-sm">
            Contact Seller
          </button>
        </div>
      </div>


      {/* ========================================================================= */}
      {/* 2. LAPTOP INLINE PANEL VIEW (Matches Desktop Split Column Grid Exactly)   */}
      {/* ========================================================================= */}
      <div className="hidden md:flex w-[360px] lg:w-[390px] bg-white border border-[#E9ECEF] rounded-2xl flex-col sticky top-6 h-[calc(100vh-120px)] flex-shrink-0 shadow-sm overflow-hidden">
        {/* Panel Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h3 className="text-[#111827] font-black text-base">Product Overview</h3>
          <button 
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Scrollable Column Dashboard Body Container */}
        <div className="p-4 overflow-y-auto flex-1 space-y-4 text-left">
          {/* Main Hero Card Image Frame */}
          <div className="w-full h-44 bg-[#F8FAFC] rounded-xl overflow-hidden border border-gray-100 flex items-center justify-center">
            <img 
              src={Plastics} 
              alt={listing.title} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Title Metrics Metadata Header */}
          <div>
            <span className="bg-[#14532D] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              {listing.category}
            </span>
            <h2 className="text-[#111827] text-lg font-extrabold mt-2 leading-snug tracking-tight">
              {listing.title}
            </h2>
            <div className="flex items-center gap-1.5 mt-1.5">
              <StarIcon />
              <span className="text-[#F59E0B] text-xs font-bold">{listing.rating}</span>
              <span className="text-gray-300 text-xs">•</span>
              <span className="text-gray-400 text-xs font-semibold">{listing.company}</span>
            </div>
          </div>

          {/* Metric Sub Grid Pricing Box Wrapper */}
          <div className="grid grid-cols-2 gap-3 bg-[#F8FAFC] p-3.5 rounded-xl border border-gray-100">
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Est. Price</p>
              <p className="text-[#16A34A] text-lg font-extrabold mt-0.5">
                ₦{listing.price.toLocaleString()}
              </p>
            </div>
            <div className="border-l border-gray-200 pl-3">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Price / kg</p>
              <p className="text-[#111827] text-sm font-extrabold mt-0.5">
                ₦{listing.pricePerKg}/kg
              </p>
            </div>
          </div>

          {/* Sourcing Parameter Layout Blocks */}
          <div className="space-y-3.5 border-t border-gray-100 pt-4">
            <h4 className="text-[#111827] text-xs font-black uppercase tracking-wider text-gray-400">Sourcing Details</h4>
            
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 text-gray-400"><LocationIcon /></div>
                <div>
                  <p className="text-[11px] text-gray-400 font-medium">Location</p>
                  <p className="text-xs font-bold text-[#374151]">{listing.location} ({listing.distance})</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[9px] text-[#16A34A] font-extrabold">✓</div>
                <div>
                  <p className="text-[11px] text-gray-400 font-medium">Available Weight</p>
                  <p className="text-xs font-bold text-[#374151]">{listing.weight}</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[9px] text-[#16A34A] font-extrabold">✓</div>
                <div>
                  <p className="text-[11px] text-gray-400 font-medium">Logistics Availability</p>
                  <p className="text-xs font-bold text-[#374151]">{listing.availability} Pickup</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Footprint Footer CTA Action Button */}
        <div className="p-4 border-t border-gray-100 bg-white sticky bottom-0">
          <button className="w-full bg-[#16A34A] hover:bg-[#15803D] text-white font-bold py-2.5 rounded-xl text-sm transition-colors shadow-sm">
            Contact Seller
          </button>
        </div>
      </div>
    </>
  );
};