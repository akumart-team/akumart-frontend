import { useState, useRef, useEffect } from "react";
import { 
  SearchIcon, 
  FilterIcon, 
  BookmarkIcon, 
  StarIcon, 
  LocationIcon, 
  WeightIcon, 
  ChevronDownIcon, 
  BackIcon 
} from "../../components/AIRecommendation/icons/index";
import type { Listing, FilterPanelProps, MobileFilterDrawerProps } from "../../utils/types";


// 1. Import your product overview page component here
import { AIProductOverview } from "../../components/AIRecommendation/aiProductOverview";

//  Mock Data (Bypassing properties constraint using type assertion)
const MOCK_LISTINGS: Listing[] = Array.from({ length: 6 }, (_, i) => ({
  id: `listing-${i + 1}`,
  category: "Plastic",
  title: "PET Bottles",
  rating: 4.8,
  company: "EcoRecycle Ltd",
  location: "Ikeja, Lagos",
  distance: "2.3 km",
  weight: "500 kg available",
  price: 55000,
  pricePerKg: 110,
  availability: "Immediate",
  isBookmarked: false,
} as unknown as Listing));

const CATEGORIES = ["All", "Metal", "Plastic", "Rubber", "Others"];
const SORT_OPTIONS = [
  { label: "Highest to Lowest (price)", value: "price_desc" },
  { label: "Lowest to Highest (price)", value: "price_asc" },
  { label: "Large Quantity", value: "quantity_desc" },
  { label: "Top Rated", value: "rating_desc" },
];

//  Listing Card 
const ListingCard = ({
  listing,
  onToggleBookmark,
  onClick, // 2. Accept card click prop from parent layout
}: {
  listing: Listing;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onClick: () => void;
}) => (
  <div 
    onClick={onClick} // Triggers full-page routing logic on click
    className="bg-white rounded-2xl border border-[#E9ECEF] p-5 flex flex-col gap-3 hover:shadow-md transition-shadow duration-200 cursor-pointer select-none"
  >
    {/* Top row: badge + bookmark */}
    <div className="flex items-center justify-between">
      <span className="bg-[#1a472a] text-white text-[11px] font-semibold px-3 py-1 rounded-full">
        {listing.category}
      </span>
      <button
        onClick={(e) => onToggleBookmark(listing.id, e)} // Pass browser click event parameter
        className="p-1.5 rounded-lg hover:bg-gray-50 transition-colors"
        aria-label="Bookmark listing"
      >
        <BookmarkIcon filled={listing.isBookmarked} />
      </button>
    </div>

    {/* Title */}
    <h3 className="text-[#0F172A] font-bold text-base leading-tight">
      {listing.title}
    </h3>

    {/* Rating + Company */}
    <div className="flex items-center gap-1.5">
      <StarIcon />
      <span className="text-[#F59E0B] text-xs font-semibold">{listing.rating}</span>
      <span className="text-[#9CA3AF] text-xs">•</span>
      <span className="text-[#6B7280] text-xs">{listing.company}</span>
    </div>

    {/* Location */}
    <div className="flex items-center gap-1.5">
      <LocationIcon />
      <span className="text-[#6B7280] text-xs">{listing.location}</span>
      <span className="text-[#9CA3AF] text-xs">•</span>
      <span className="text-[#16A34A] text-xs font-medium">{listing.distance}</span>
    </div>

    {/* Weight */}
    <div className="flex items-center gap-1.5">
      <WeightIcon />
      <span className="text-[#6B7280] text-xs">{listing.weight}</span>
    </div>

    {/* Price row */}
    <div className="flex items-end justify-between mt-1">
      <div>
        <p className="text-[#16A34A] font-bold text-lg leading-none">
          ₦{listing.price.toLocaleString()}
        </p>
        <p className="text-[#9CA3AF] text-[11px] mt-0.5">
          ₦{listing.pricePerKg}/kg
        </p>
      </div>
      <span
        className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${
          listing.availability === "Immediate"
            ? "bg-[#DCFCE7] text-[#16A34A]"
            : "bg-[#FEF9C3] text-[#CA8A04]"
        }`}
      >
        {listing.availability}
      </span>
    </div>
  </div>
);

// Desktop Filter Panel 
const DesktopFilterPanel = ({
  selectedCategory,
  setSelectedCategory,
  state,
  setState,
  minQty,
  setMinQty,
  sortBy,
  setSortBy,
  onReset,
}: FilterPanelProps) => (
  <div className="bg-white rounded-2xl border border-[#E9ECEF] p-6 flex flex-col gap-5 sticky top-4 min-w-55">
    {/* Header */}
    <div className="flex items-center justify-between">
      <h3 className="text-[#0F172A] font-bold text-base">Filters</h3>
      <button
        onClick={onReset}
        className="text-[#16A34A] text-xs font-semibold hover:underline"
      >
        Reset All
      </button>
    </div>

    {/* Category */}
    <div className="flex flex-col gap-2">
      <label className="text-[#0F172A] text-xs font-semibold">Category</label>
      <div className="relative">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full appearance-none border border-[#E9ECEF] rounded-xl px-3 py-2.5 text-sm text-[#6B7280] bg-white outline-none focus:ring-1 focus:ring-emerald-500 pr-8 cursor-pointer"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
          <ChevronDownIcon />
        </span>
      </div>
    </div>

    {/* State */}
    <div className="flex flex-col gap-2">
      <label className="text-[#0F172A] text-xs font-semibold">State</label>
      <input
        type="text"
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder="All States"
        className="border border-[#E9ECEF] rounded-xl px-3 py-2.5 text-sm text-[#0F172A] placeholder:text-[#9CA3AF] outline-none focus:ring-1 focus:ring-emerald-500"
      />
    </div>

    {/* Min Quantity */}
    <div className="flex flex-col gap-2">
      <label className="text-[#0F172A] text-xs font-semibold">
        Minimum Quantity (kg)
      </label>
      <input
        type="number"
        value={minQty}
        onChange={(e) => setMinQty(e.target.value)}
        placeholder="0"
        min={0}
        className="border border-[#E9ECEF] rounded-xl px-3 py-2.5 text-sm text-[#0F172A] placeholder:text-[#9CA3AF] outline-none focus:ring-1 focus:ring-emerald-500"
      />
    </div>

    {/* Sort By */}
    <div className="flex flex-col gap-2">
      <label className="text-[#0F172A] text-xs font-semibold">Sort By</label>
      <div className="relative">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full appearance-none border border-[#E9ECEF] rounded-xl px-3 py-2.5 text-sm text-[#6B7280] bg-white outline-none focus:ring-1 focus:ring-emerald-500 pr-8 cursor-pointer"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
          <ChevronDownIcon />
        </span>
      </div>
    </div>
  </div>
);

// mobile filter
const MobileFilterDrawer = ({
  isOpen,
  onClose,
  selectedCategory,
  setSelectedCategory,
  state,
  setState,
  minQty,
  setMinQty,
  sortBy,
  setSortBy,
  onReset,
}: MobileFilterDrawerProps) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className=" fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="absolute inset-x-0 top-60  bg-white rounded-t-2xl p-6 max-h-[85vh] overflow-y-auto"
      >
        {/* Drag handle */}
        <div className="w-10 h-1 bg-[#E9ECEF] rounded-full mx-auto mb-5" />

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-[#6B7280] text-sm font-medium"
          >
            <BackIcon />
            Filters
          </button>
          <button
            onClick={onReset}
            className="text-[#16A34A] text-xs font-semibold"
          >
            Reset All
          </button>
        </div>

        <div className="flex flex-col gap-5">
          {/* Category dropdown */}
          <div>
            <label className="block text-xs font-semibold text-[#0F172A] mb-2">
              Category
            </label>
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full appearance-none border border-[#E9ECEF] rounded-xl px-3 py-3 text-sm text-[#6B7280] bg-white outline-none focus:ring-1 focus:ring-emerald-500 pr-9 cursor-pointer"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
                <ChevronDownIcon />
              </span>
            </div>
          </div>

          {/* State */}
          <div>
            <label className="block text-xs font-semibold text-[#0F172A] mb-2">
              State
            </label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="All States"
              className="w-full border border-[#E9ECEF] rounded-xl px-3 py-3 text-sm text-[#0F172A] placeholder:text-[#9CA3AF] outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          {/* Minimum Quantity */}
          <div>
            <label className="block text-xs font-semibold text-[#0F172A] mb-2">
              Minimum Quantity (kg)
            </label>
            <input
              type="number"
              value={minQty}
              onChange={(e) => setMinQty(e.target.value)}
              placeholder="0"
              min={0}
              className="w-full border border-[#E9ECEF] rounded-xl px-3 py-3 text-sm text-[#0F172A] placeholder:text-[#9CA3AF] outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          {/* Sort By dropdown */}
          <div>
            <label className="block text-xs font-semibold text-[#0F172A] mb-2">
              Sort By
            </label>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full appearance-none border border-[#E9ECEF] rounded-xl px-3 py-3 text-sm text-[#6B7280] bg-white outline-none focus:ring-1 focus:ring-emerald-500 pr-9 cursor-pointer"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
                <ChevronDownIcon />
              </span>
            </div>
          </div>
        </div>

        {/* Apply button */}
        <button
          onClick={onClose}
          className="w-full bg-[#16A34A] hover:bg-[#15803D] text-white font-semibold py-3.5 rounded-xl transition-colors text-sm mt-7"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

//Main Component 
export const AIRecommendation = () => {
  const [listings, setListings] = useState<Listing[]>(MOCK_LISTINGS);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [state, setState] = useState("");
  const [minQty, setMinQty] = useState("");
  const [sortBy, setSortBy] = useState("price_desc");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // 3. Added state pointer to hold our active product data object reference
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  // Modified bookmark trigger signature to block propagation issues
  const handleToggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Stops card layout click trigger loop execution when bookmarking items
    setListings((prev) =>
      prev.map((l) =>
        l.id === id ? { ...l, isBookmarked: !l.isBookmarked } : l
      )
    );
  };

  const handleReset = () => {
    setSelectedCategory("All");
    setState("");
    setMinQty("");
    setSortBy("price_desc");
  };

  const filtered = listings.filter((l) => {
    const matchSearch =
      search === "" ||
      l.title.toLowerCase().includes(search.toLowerCase()) ||
      l.company.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      selectedCategory === "All" || l.category === selectedCategory;
    const matchState =
      state === "" || l.location.toLowerCase().includes(state.toLowerCase());
    const matchQty =
      minQty === "" || parseInt(l.weight) >= parseInt(minQty);
    return matchSearch && matchCategory && matchState && matchQty;
  });
  


  // CONDITION 1: FULL PAGE STATE ROUTER
 
  if (selectedListing) {
    return (
      <div className="w-full transition-all duration-300">
        <AIProductOverview  />
      </div>
    );
  }

 
  // CONDITION 2: MARKET GRID VIEW (Default State View)
  
  return (
    <section className="w-full">
      {/* Section heading */}
      <div className="md:hidden p-3">
        <h2 className="  text-xl md:text-2xl font-extrabold text-[#111827]">
          Your <span className="text-[#16A34A]">AI Recommendation</span>
        </h2>
        <p className="text-xs md:text-sm font-medium text-[#8A92A6] mt-1">
         Discover materials tailored to your sourcing needs.
        </p>
      </div>

      {/* Search bar row */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
            <SearchIcon />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search listings..."
            className="w-full bg-white border border-[#E9ECEF] rounded-xl pl-9 pr-4 py-3 text-sm text-[#0F172A] placeholder:text-[#9CA3AF] outline-none focus:ring-1 focus:ring-emerald-500 shadow-sm"
          />
        </div>

        {/* Filter icon button — mobile only */}
        <button
          onClick={() => setMobileFilterOpen(true)}
          className="md:hidden flex items-center justify-center w-11 h-11 bg-white border border-[#E9ECEF] rounded-xl shadow-sm text-[#6B7280] hover:text-[#16A34A] hover:border-[#16A34A] transition-colors shrink-0"
          aria-label="Open filters"
        >
          <FilterIcon />
        </button>
      </div>

      {/* Content: listings grid + desktop filter panel */}
      <div className="flex gap-6 items-start">
        {/* Listings Grid */}
        <div className="flex-1 min-w-0">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {filtered.map((listing) => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  onToggleBookmark={(id, e) => handleToggleBookmark(id, e)}
                  onClick={() => setSelectedListing(listing)} // Triggers conditional state update
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <SearchIcon />
              </div>
              <p className="text-[#0F172A] font-semibold text-sm">No listings found</p>
              <p className="text-[#9CA3AF] text-xs mt-1">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>

        {/* Desktop Filter Panel */}
        <div className="hidden md:block w-60 shrink-0">
          <DesktopFilterPanel
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            state={state}
            setState={setState}
            minQty={minQty}
            setMinQty={setMinQty}
            sortBy={sortBy}
            setSortBy={setSortBy}
            onReset={handleReset}
          />
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer
        isOpen={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        state={state}
        setState={setState}
        minQty={minQty}
        setMinQty={setMinQty}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onReset={handleReset}
      />
    </section>
  );
};