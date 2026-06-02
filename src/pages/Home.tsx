import { Link } from "react-router-dom";
import Hero from "../assets/imgs/home1.png";

import List from "../assets/icons/list.svg";
import Paid from "../assets/icons/paid.svg";
import People from "../assets/icons/people.png";

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

export const Home = () => {
  // Statistics Data
  const stats: StatCardProps[] = [
    { number: "300 +", label: "Trusted SME's" },
    { number: "650", label: "Materials Listed" },
    { number: "100", label: "Trusted SME's" }, // As seen in Figma image 1
    { number: "10", label: "Ai Powered Matching" },
  ];

  const sellerSteps: StepProps[] = [
    { iconSrc: List, text: "List Waste Materials" },
    { iconSrc: People, text: "Connect With Buyers" },
    { iconSrc: Paid, text: "Get Paid Securely" },
  ];

  const buyerSteps: StepProps[] = [
    { iconSrc: List, text: "List Waste Materials" },
    { iconSrc: People, text: "Connect With Buyers" },
    { iconSrc: Paid, text: "Get Paid Securely" },
  ];

  return (
    <div className="w-full bg-[#FAFAFA] font-['Plus_Jakarta_Sans',sans-serif] antialiased">
      {/* SECTION 1: HERO */}

      <section className=" mx-auto px-6 pt-25 pb-8 md:px-16 md:pt-35 md:pb-20 flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="w-full md:w-1/2 flex flex-col items-start text-left">
          <h1 className="text-[#0D2B1E] text-[24px] md:text-[34px] lg:text-[64px] font-extrabold leading-7.5 md:leading-10 lg:leading-18 tracking-[0.92px] mb-6">
            The <span className="text-[#A3E635]">B2B</span> Marketplace for
            Waste and Recycled Materials
          </h1>
          <p className="text-[#4B5563] text-[14px] md:text-lg mb-8 max-w-lg">
            Connect with trusted buyers and sellers to trade recyclable and
            reusable waste materials across Nigeria.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button className="bg-[#16A34A] hover:bg-[#059669] text-white font-semibold py-4 px-6 rounded-xl transition duration-200 text-center">
              <Link to="/signup">Browse Marketplace</Link>
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
      <section className=" mx-auto px-6 py-6 md:px-16 ">
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
      <section className="w-full bg-[#E5E7EB]/50 font-['Plus_Jakarta_Sans',sans-serif] py-16 md:py-24">
        <div className=" mx-auto px-6 md:px-16">
          <h2 className="text-[#111827] text-3xl md:text-[40px] font-extrabold text-center mb-16 md:mb-24">
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
    </div>
  );
};
