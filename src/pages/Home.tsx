import { Link } from "react-router-dom";
import Hero from "../assets/imgs/home1.png";


import List from "../assets/icons/list.svg";
import Paid from "../assets/icons/paid.svg";
import People from "../assets/icons/people.png";

import Plastic from "../assets/imgs/plastics.png";
import Glass from "../assets/imgs/glass.png";
import Metal from "../assets/imgs/metals.png";
import Wood from "../assets/imgs/wood.png";
import Waste from "../assets/imgs/e-waste.png";
import Paper from "../assets/imgs/paper.png";

import Recycle from "../assets/imgs/recyle.png"
import Earth from "../assets/imgs/earth.png"
import Mockup from "../assets/imgs/mockup.png"
import Mobilemockup from "../assets/imgs/mobile.png"

interface StatCardProps {
  number: string;
  label: string;
}

interface StepProps {
  iconSrc: string;
  text: string;
}

interface MobileStepRowProps {
  number: string;
  text: string;
}

interface Category {
  id: number;
  name: string;
  image: string;
}

interface FeatureCard {
  id: number;
  title: string;
  description: string;
  // Putting custom inline SVGs directly inside the array object
  icon: React.ReactNode;
}

interface ListingItem {
  id: number;
  title: string;
  location: string;
  priceRange: string;
  image: string;
}

interface Testimonial {
  id: number;
  text: string;
  name: string;
  role: string;
  tag: string;
  rating: number;
}

const testimonialsData: Testimonial[] = [
  {
    id: 1,
    text: "Finding quality plastic material used to be stressful. With AkuMart we get consistent supply and good customer service",
    name: "Daniel",
    role: "Bulk Buyer",
    tag: "Waste Seller",
    rating: 5,
  },
  {
    id: 2,
    text: "AkuMart has help us turn what used to be a waste into a steady source of income. this platform is easy to use and buyers are legit.",
    name: "Daniel",
    role: "Bulk Buyer",
    tag: "Waste Seller",
    rating: 5,
  },
  {
    id: 3,
    text: "Finding quality plastic material used to be stressful. With AkuMart we get consistent supply and good customer service",
    name: "Daniel",
    role: "Bulk Buyer",
    tag: "Waste Seller",
    rating: 5,
  },
  {
    id: 4,
    text: "AkuMart has help us turn what used to be a waste into a steady source of income. this platform is easy to use and buyers are legit.",
    name: "Daniel",
    role: "Bulk Buyer",
    tag: "Waste Seller",
    rating: 5,
  },
];

const listings: ListingItem[] = [
  {
    id: 1,
    title: "Plastic Bottles",
    location: "Lagos State",
    priceRange: "300-500 / kg",
    image: Plastic,
  },
  {
    id: 2,
    title: "E-Waste",
    location: "Lagos State",
    priceRange: "300-500 / kg",
    image: Waste,
  },
  {
    id: 3,
    title: "Metal",
    location: "Lagos State",
    priceRange: "300-500 / kg",
    image: Metal,
  },
];

const features: FeatureCard[] = [
  {
    id: 1,
    title: "Secure Escrow Payments",
    description:
      "Your payments are secured with us until delivery is confirmed.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
      >
        <path
          d="M6.25 9.6875V25C6.25 40.3125 25 46.875 25 46.875C25 46.875 43.75 40.3125 43.75 25V9.6875L25 3.125L6.25 9.6875Z"
          stroke="#16A34A"
          stroke-width="2"
          stroke-linecap="square"
        />
        <path
          d="M17.0273 23.2751L22.9169 29.1668L34.7023 17.3813"
          stroke="#16A34A"
          stroke-width="2"
          stroke-linecap="square"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Trusted Seller Rating",
    description:
      "Make confident decisions with verified review and performance scores.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
      >
        <g clip-path="url(#clip0_87_251)">
          <path
            d="M25 2.13745L31.9719 16.7L49.5625 17.5312L36.5 30.1562L40.675 46.575L25 38.5125L9.325 46.575L13.5 30.1562L0.4375 17.5312L18.0281 16.7031L25 2.13745ZM25 16.6125L22.0531 22.7687L15.1875 23.0937L20.45 28.1843L18.8 34.6749L25 31.4875L31.2 34.6749L29.55 28.1843L34.8125 23.0906L27.9469 22.7687L25 16.6125Z"
            fill="#16A34A"
          />
        </g>
        <defs>
          <clipPath id="clip0_87_251">
            <rect width="50" height="50" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
  },
  {
    id: 3,
    title: "Fast and Easy Transactions",
    description: "Simple ordering, clear communication and smooth flow.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
      >
        <path
          d="M14.583 4.16675V27.0834H20.833V45.8334L35.4163 20.8334H27.083L35.4163 4.16675H14.583Z"
          fill="#16A34A"
        />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Smart Waste Marketplace",
    description: "All the tools you need to trade, grow and create impact.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
      >
        <path
          d="M44.4377 5.27085C43.6668 4.97918 42.7918 5.16668 42.2085 5.72918C42.0627 5.87502 38.3335 9.41668 32.1252 6.29168C27.8543 4.14585 20.4585 2.87502 13.6252 6.29168C4.75016 10.75 1.60432 21.8542 6.31266 31.7084C7.60432 28.0834 9.45849 25.0209 11.896 22.5834C17.7502 16.75 24.8127 16.75 25.0002 16.6875V17.3959C21.6236 18.3256 18.5448 20.1126 16.0627 22.5834C10.9377 27.7084 8.33349 35.5209 8.33349 45.8334H12.5002C12.5002 43.4375 12.646 41.2917 12.9377 39.3334C14.3127 40.1875 15.8335 40.8334 17.4585 41.2084C18.8335 41.5417 20.2085 41.6667 21.5627 41.6667C26.6252 41.6667 31.2293 39.6667 33.4793 37.9792C37.271 35.125 40.396 32.4167 43.4793 25.7084C46.396 19.3125 45.8127 7.58335 45.771 7.08335C45.7481 6.68457 45.61 6.30101 45.3733 5.97926C45.1366 5.65751 44.8115 5.41141 44.4377 5.27085Z"
          fill="#16A34A"
        />
      </svg>
    ),
  },
];

const StepCard = ({ iconSrc, text }: StepProps) => (
  <div className="flex flex-col items-center gap-3 bg-white border border-gray-200 rounded-3xl p-6 shadow-sm min-w-45">
    <img src={iconSrc} alt={text} className="w-12 h-12 object-contain" />
    <p className="text-[#111827] text-sm md:text-base font-medium text-center">
      {text}
    </p>
  </div>
);

const MobileStepRow = ({ number, text }: MobileStepRowProps) => (
  <div className="flex items-center gap-4 rounded-3xl bg-white border border-gray-200 p-4 shadow-sm">
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#A3E635] text-white font-bold">
      {number}
    </div>
    <p className="text-[#111827] text-sm font-medium">{text}</p>
  </div>
);

const categories: Category[] = [
  { id: 1, name: "Plastic", image: Plastic },
  { id: 2, name: "Metal", image: Metal },
  { id: 3, name: "Paper", image: Paper },
  { id: 4, name: "Wood", image: Wood },
  { id: 5, name: "E-Waste", image: Waste },
  { id: 6, name: "Glass", image: Glass },
];

export const Home = () => {
  // Statistics Data
  const stats: StatCardProps[] = [
    { number: "300 +", label: "Trusted SME's" },
    { number: "650", label: "Materials Listed" },
    { number: "100", label: "Trusted SME's" },
    { number: "10", label: "Ai Powered Matching" },
  ];

  const sellerSteps: StepProps[] = [
    { iconSrc: List, text: "List Waste Materials" },
    { iconSrc: People, text: "Connect With Buyers" },
    { iconSrc: Paid, text: "Get Paid Securely" },
  ];

  const buyerSteps: StepProps[] = [
    { iconSrc: List, text: "Secure reliable supply." },
    { iconSrc: People, text: "Quality Materials." },
    { iconSrc: Paid, text: "Reduce production costs." },
  ];

  return (
    <div className="w-full bg-white font-['Plus_Jakarta_Sans',sans-serif] antialiased">
      {/* SECTION 1: HERO */}

      <section className=" mx-auto px-10 pt-25   pb-8 md:px-16 md:pt-30 md:pb-20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="w-full md:w-1/2 flex flex-col items-start text-left">
          <h1 className="text-[#0D2B1E] text-[24px] md:text-[30px] lg:text-[40px] xl:text-[60px] font-extrabold leading-7.5 md:leading-10 lg:leading-15 xl:leading-17 tracking-[0.92px] mb-6">
            The <span className="text-[#A3E635]">B2B</span> Marketplace for
            Waste and Recycled Materials
          </h1>
          <p className="text-[#4B5563] text-[14px] md:text-lg mb-8 max-w-lg">
            Connect with trusted buyers and sellers to trade recyclable and
            reusable waste materials across Nigeria.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button className="bg-[#16A34A] hover:bg-[#059669] text-white font-semibold py-4 px-6 rounded-xl transition duration-200 text-center">
              <Link to="/register">Browse Marketplace</Link>
            </button>
            <button className="bg-[#E5E7EB] hover:bg-[#D1D5DB] text-[#374151] font-semibold py-4 px-6 rounded-xl transition duration-200 text-center">
              <Link to="/register">Get Started</Link>
            </button>
          </div>
        </div>

        {/* Right: Recycle Logo/Image Space */}
        <div className="w-full md:w-1/2 flex justify-center items-center min-h-75 md:min-h-112.5   relative overflow-hidden ">
          <img src={Hero} alt="#" />
        </div>
      </section>

      {/* SECTION 2: STATISTICS */}
      <section className=" mx-auto px-10 py-6 md:px-16 ">
        {/* Mobile: Horizontal scrollable track | Desktop: Static Grid Layout */}
        <div className="flex overflow-x-auto  md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 pb-4 md:pb-0 scrollbar-hide snap-x snap-mandatory  scrollbar-none [&::-webkit-scrollbar]:hidden">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="min-w-60 md:min-w-0 shrink-0 bg-white border border-gray-100 shadow-sm rounded-2xl p-8 flex flex-col items-center justify-center text-center snap-center"
            >
              <h3 className="text-[#000000] text-[32px] font-extrabold leading-12.5">
                {stat.number}
              </h3>
              <p className="text-[#4B5563] text-sm md:text-base mt-1 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- */}

      {/* SECTION 3: PROBLEM AND SOLUTION */}
      <section className=" mx-auto px-6 py-12 md:px-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch  ">
          {/* --- PROBLEM SIDE (Narrower Width) --- */}
          <div className="md:col-span-5 bg-[#F9FAFB] border border-gray-100 rounded-3xl p-8 md:p-12 flex flex-col justify-start">
            <h2 className="text-[#111827] text-2xl md:text-[32px] font-extrabold mb-8 text-center ">
              Problem
            </h2>
            <div className="flex flex-col">
              <ul className="space-y-3">
                {[
                  "Businesses pay to dispose of reusable waste",
                  "Buyers struggle to find reliable suppliers",
                  "Lack of trust and transparency in transactions",
                  "Logistics and coordination are difficult and expensive",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-gray-600 text-sm md:text-md lg:text-lg "
                  >
                    <span className="w-5 h-5 rounded-full bg-green-100 shrink-0 flex items-center justify-center mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-green-400" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* --- SOLUTION SIDE (Wider Width) --- */}
          <div className="md:col-span-7 bg-[#0D2B1E] rounded-3xl p-10 md:p-12 flex flex-col justify-between text-white relative overflow-hidden">
            <h2 className="text-white text-2xl md:text-[32px] font-extrabold mb-5 text-center ">
              Solution
            </h2>
            {/* Asymmetric Flex Container: Split text and image side-by-side on desktop */}
            <div className="flex flex-col-reverse lg:flex-row lg:items-center justify-between gap-8 h-full">
              {/* Left Column: Solution Bullet Points */}
              <div className="flex flex-col max-w-md w-full  ">
                <div className="flex flex-col">
                  <ul className="space-y-3">
                    {[
                      "A trusted marketplace for waste materials",
                      "AI-powered matching for the right connections",
                      "Secure payment and verified businesses",
                      "Integrated logistics and real-time tracking",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-white text-sm md:text-md lg:text-lg"
                      >
                        <span className="w-5 h-5 rounded-full bg-green-100 shrink-0 flex items-center justify-center mt-0.5">
                          <span className="w-2 h-2 rounded-full bg-green-400" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column: Circular Logistics Image Container */}
              <div className="flex justify-center items-center shrink-0 mx-auto lg:mx-0">
                <div className="w-65 h-65 md:w-75 md:h-75 rounded-full bg-[#113827] border-4 border-[#164d35] overflow-hidden relative shadow-xl flex items-center justify-center">
                  <span className="text-emerald-400 text-xs px-6 text-center font-medium">
                    [ Circular Logistics Image Placeholder ]
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* how it works */}
      <section className="w-full bg-[#E5E7EB]/50 font-['Plus_Jakarta_Sans',sans-serif] py-16 ">
        <div className=" mx-auto px-6 md:px-16">
          <h2 className="text-[#111827] text-3xl md:text-[40px] font-extrabold text-center mb-16 ">
            How It Works
          </h2>

          {/* --- DESKTOP VIEW --- */}
          <div className="hidden md:flex flex-col gap-16  mx-auto">
            {/* Row 1: For Sellers (Left to Right) */}
            <div className="flex items-center justify-start gap-8 w-full">
              <div className="flex items-center gap-6 min-w-50">
                <span className="text-[#111827] text-2xl font-bold">
                  For <span className="text-[#A3E635]">Sellers</span>
                </span>
                <div className="grow flex items-center justify-end">
                  <span className="h-px w-24 bg-gray-400 relative">
                    <span className="absolute right-0 -top-1 border-solid border-r-gray-400 border-b-gray-400 border-r-[5px] border-b-[5px] p-0.75 transform rotate-315" />
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-6">
                {sellerSteps.map((step, index) => (
                  <StepCard
                    key={index}
                    iconSrc={step.iconSrc}
                    text={step.text}
                  />
                ))}
              </div>
            </div>

            {/* Row 2: For Buyers (Right to Left Layout) */}
            <div className="flex items-center justify-end gap-8 w-full">
              <div className="flex items-center gap-6">
                {buyerSteps.map((step, index) => (
                  <StepCard
                    key={index}
                    iconSrc={step.iconSrc}
                    text={step.text}
                  />
                ))}
              </div>

              <div className="flex items-center gap-6 min-w-50">
                <div className="grow flex items-center justify-start">
                  <span className="h-px w-24 bg-gray-400 relative">
                    <span className="absolute left-0 -top-1 border-solid border-l-gray-400 border-b-gray-400 border-l-[5px] border-b-[5px] p-0.75 transform rotate-45" />
                  </span>
                </div>
                <span className="text-[#111827] text-2xl font-bold whitespace-nowrap">
                  For <span className="text-[#A3E635]">Buyers</span>
                </span>
              </div>
            </div>
          </div>

          {/* --- MOBILE VIEW --- */}
          <div className="flex md:hidden flex-col gap-12">
            {/* Mobile Sellers */}
            <div>
              <h3 className="text-[#111827] text-xl font-bold mb-6 border-l-4 border-[#A3E635] pl-3">
                For <span className="text-emerald-600">Sellers</span>
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {sellerSteps.map((step, index) => (
                  <MobileStepRow
                    key={index}
                    number={String(index + 1)}
                    text={step.text}
                  />
                ))}
              </div>
            </div>

            {/* Mobile Buyers */}
            <div className="mt-4">
              <h3 className="text-[#111827] text-xl font-bold mb-6 border-l-4 border-[#A3E635] pl-3">
                For <span className="text-emerald-600">Buyers</span>
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {buyerSteps.map((step, index) => (
                  <MobileStepRow
                    key={index}
                    number={String(index + 1)}
                    text={step.text}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Waste category*/}
      <section className="w-full py-12 px-6 md:px-8 bg-white text-center select-none">
        {/* Header Section */}
        <div className="max-w-2xl mx-auto mb-8">
          <h2 className="text-3xl md:text-[40px] font-bold text-[#1E293B] mb-2">
            Explore <span className="text-[#84CC16]">Waste</span> Categories
          </h2>
          <p className="text-sm md:text-base text-[#64748B]">
            Browse recyclable materials tailored to your business needs
          </p>
        </div>

        {/* Categories Container */}
        <div className="max-w-7xl mx-auto">
          {/* Mobile View: 
         
        */}
          <div className="grid grid-rows-2 grid-flow-col overflow-x-auto md:grid-cols-4 md:grid-flow-row gap-4 pb-4 md:pb-0 scrollbar-none snap-x snap-mandatory">
            {categories.map((category) => (
              <div
                key={category.id}
                className="relative shrink-0 w-[75vw] sm:w-[45vw] md:w-auto h-48 md:h-56 rounded-2xl overflow-hidden group snap-center border border-gray-100 shadow-sm"
              >
                {/* Image */}
                <img
                  src={category.image}
                  alt={`${category.name} category`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Tint Overlay & Text */}
                <div className="absolute inset-0 bg-black/20 flex items-end justify-center pb-4">
                  <span className="text-white font-semibold text-lg md:text-xl tracking-wide drop-shadow-sm">
                    {category.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="w-full bg-[#062F1D] py-16 px-6 md:px-12 lg:px-24 text-center">
        {/* Section Header Title */}
        <h2 className="text-white text-3xl md:text-[40px] font-bold mb-12 tracking-tight">
          Powerful Feature. Real Impact.
        </h2>

        {/* Grid container matches desktop full view and switches to vertical block stack on mobile */}
        <div className=" mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white rounded-2xl p-8 flex flex-col items-center justify-between min-h-70 shadow-sm transition-transform duration-200 hover:-translate-y-1"
            >
              {/* Centered Icon Container */}
              <div className="w-12.5 h-12.5 flex items-center justify-center mb-6">
                {feature.icon}
              </div>

              {/* Feature Information */}
              <div className="flex-1 flex flex-col justify-start">
                <h3 className="text-[#0F172A] font-bold text-lg md:text-xl mb-4">
                  {feature.title}
                </h3>
                <p className="text-[#475569] text-sm leading-relaxed max-w-60 mx-auto">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Market Review */}
    <section className="w-full bg-white py-16 px-6 md:px-8 lg:px-16 overflow-hidden">
  {/* Header Title */}
  <div className="w-full text-center mb-12">
    <h2 className="text-3xl md:text-[40px] font-bold text-[#1E293B]">
      Live <span className="text-[#84CC16]">Marketplace</span> Review
    </h2>
  </div>

  {/* Main Content Layout Split */}
  <div className="mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-7xl">
    
    {/* Left Column (Laptop on Desktop, Bottom on Mobile) */}
    <div className="lg:col-span-5 flex justify-center items-center py-6 lg:py-0 order-last lg:order-1 w-full mx-auto">
      <div className="w-full flex items-center justify-center">
        {/* Laptop Mockup Image - Visible on lg screens and up */}
        <img
          src={Mockup}
          alt="mockup laptop view"
          className="hidden lg:block w-full h-auto max-w-137.5 xl:max-w-187.5 object-contain transform scale-105 xl:scale-115 origin-center"
        />
        {/* Mobile Image - Visible on mobile/tablet views */}
        <img
          src={Mobilemockup}
          alt="mockup mobile view"
          className="block lg:hidden w-full h-auto max-w-[320px] sm:max-w-90 object-contain"
        />
      </div>
    </div>

    {/* Right Column (Listings on Desktop, Top on Mobile) */}
    <div className="lg:col-span-7 flex flex-col gap-6 order-1 lg:order-2 w-full overflow-hidden">
      {/* Scrollable Listings Row */}
      <div className="flex overflow-x-auto lg:grid lg:grid-cols-3 gap-6 pb-4 lg:pb-0 scrollbar-none snap-x snap-mandatory w-full">
        {listings.map((item) => (
          <div
            key={item.id}
            className="shrink-0 w-[75vw] sm:w-[45vw] lg:w-auto bg-white rounded-2xl border border-gray-100 p-3 snap-center shadow-sm"
          >
            {/* Product Image */}
            <div className="w-full h-44 sm:h-48 rounded-xl overflow-hidden mb-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details Meta */}
            <div className="px-1 text-left">
              <h3 className="font-bold text-[#0F172A] text-sm sm:text-base mb-1 truncate">
                {item.title}
              </h3>

              {/* Location Group with Pin Icon */}
              <div className="flex items-center gap-1 text-[#94A3B8] text-xs mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M10.0003 9.58317C9.44779 9.58317 8.91789 9.36368 8.52719 8.97298C8.13649 8.58228 7.91699 8.05237 7.91699 7.49984C7.91699 6.9473 8.13649 6.4174 8.52719 6.0267C8.91789 5.636 9.44779 5.4165 10.0003 5.4165C10.5529 5.4165 11.0828 5.636 11.4735 6.0267C11.8642 6.4174 12.0837 6.9473 12.0837 7.49984C12.0837 7.77342 12.0298 8.04433 11.9251 8.29709C11.8204 8.54986 11.6669 8.77952 11.4735 8.97298C11.28 9.16643 11.0503 9.31989 10.7976 9.42459C10.5448 9.52928 10.2739 9.58317 10.0003 9.58317ZM10.0003 1.6665C8.45323 1.6665 6.9695 2.28109 5.87554 3.37505C4.78157 4.46901 4.16699 5.95274 4.16699 7.49984C4.16699 11.8748 10.0003 18.3332 10.0003 18.3332C10.0003 18.3332 15.8337 11.8748 15.8337 7.49984C15.8337 5.95274 15.2191 4.46901 14.1251 3.37505C13.0312 2.28109 11.5474 1.6665 10.0003 1.6665Z"
                    fill="#0D2B1E"
                    fillOpacity="0.6"
                  />
                </svg>
                <span className="truncate">{item.location}</span>
              </div>

              {/* Price Tag Line */}
              <div className="font-semibold text-sm text-[#84CC16]">
                ₦{item.priceRange}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Browse All Listings Button */}
      <div className="flex justify-end mt-2">
        <button className="flex items-center justify-center gap-2 bg-[#16A34A] hover:bg-[#15803D] text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg text-sm w-auto">
          Browse all listings
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
      </div>
    </div>

  </div>
</section>

      {/* Testimonial */}
     <section className="relative w-full py-20 px-6 md:px-12 lg:px-24 overflow-hidden min-h-150 flex items-center justify-center">
      {/* 1. FIXED BACKGROUND: Using an absolute div with true background opacity so it's muted, NOT shouty */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.15]" 
        style={{ backgroundImage: `url(${Recycle})` }}
      />
      
      {/* Base background fill color to mix with the low opacity image above */}
      <div className="absolute inset-0 bg-[#FAFAFA] -z-10" />

      {/* Main Layout Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side Header Text Block */}
        <div className="lg:col-span-3 flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="text-[#16A34A] mb-3">
            <svg width="42" height="34" viewBox="0 0 42 34" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 19.4286C0 8.70001 8.35714 0 18.6429 0V7.28572C13.2429 7.28572 10.125 10.9286 9.81429 15.0714H18.6429V34H0V19.4286ZM23.3571 19.4286C23.3571 8.70001 31.7143 0 42 0V7.28572C36.6 7.28572 33.4821 10.9286 33.1714 15.0714H42V34H23.3571V19.4286Z" />
            </svg>
          </div>
          <h2 className="text-[#0F172A] text-3xl md:text-4xl font-extrabold tracking-tight">
            Testimonials
          </h2>
        </div>

        {/* Right Side Cards Container */}
        <div className="lg:col-span-9 w-full">
        
          <div className="grid grid-rows-2 grid-flow-col lg:grid-rows-1 lg:grid-cols-3 lg:grid-flow-row gap-6 overflow-x-auto lg:overflow-visible pb-6 lg:pb-0 scrollbar-none snap-x snap-mandatory auto-cols-[85%] sm:auto-cols-[45%] lg:auto-cols-auto">
            {testimonialsData.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-md lg:shadow-sm flex flex-col justify-between snap-center min-h-55 lg:min-h-62.5 w-full"
              >
                {/* Review Text */}
                <p className="text-[#334155] text-sm leading-relaxed mb-6 font-normal">
                  {item.text}
                </p>

                {/* Reviewer Profile Details Footer */}
                <div>
                  <h4 className="text-[#0F172A] font-bold text-sm">
                    {item.name}, <span className="font-medium text-gray-500">{item.role}</span>
                  </h4>
                  <p className="text-xs text-gray-400 mt-0.5 mb-3">{item.tag}</p>
                  
                  {/* Star Ratings Row */}
                  <div className="flex gap-0.5 text-[#EAB308]">
                    {[...Array(item.rating)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>


    {/* last section */}
    <section className="w-full bg-[#052316] pb-8 px-6 md:px-16 lg:px-24 flex items-center justify-center overflow-hidden min-h-135 md:h-145.75">
  <div className="max-w-5xl mx-auto w-full flex flex-col-reverse lg:flex-row items-center justify-between md:gap-10">
    
   
    <div className="flex-1 flex flex-col items-start text-left max-w-xl  lg:mt-0">
      <h2 className="text-white text-3xl md:text-5xl font-bold leading-tight tracking-tight mb-3">
        Ready to Turn <span className="text-[#84CC16]">Waste</span> <br className="hidden md:inline" />
        Into Opportunity?
      </h2>
      
      <p className="text-gray-300/90 text-md md:text-lg font-light mb-8">
        Create your free account and start trading smarter today.
      </p>

  
      <div className="w-full flex flex-row gap-3 items-center justify-start">
        <button className="flex-1 sm:flex-none bg-[#16A34A] hover:bg-[#15803D] text-white text-xs sm:text-sm font-medium py-3 px-4 sm:px-6 rounded-xl transition-colors duration-200 shadow-md whitespace-nowrap">
          Sign Up as Seller
        </button>
        <button className="flex-1 sm:flex-none bg-transparent hover:bg-white/5 text-white text-xs sm:text-sm font-medium py-3 px-4 sm:px-6 rounded-xl border border-gray-500/60 transition-colors duration-200 whitespace-nowrap">
          Sign Up as Buyer
        </button>
      </div>
    </div>

    {/* Right Side: Image Box  */}
    <div className="flex-1 flex justify-center items-center w-full md:max-w-[320px]">
      <img 
        src={Earth} 
        alt="Eco ecosystem globe graphic" 
        className="w-full max-h-100 md:max-h-175 object-contain animate-fade-in  transition-transform duration-300 hover:scale-105"
      />
    </div>

  </div>
</section>
    </div>
  );
};
