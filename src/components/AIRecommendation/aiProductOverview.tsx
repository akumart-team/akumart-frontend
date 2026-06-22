import React, { useState } from "react";

import {
  BackIcon,
  WeightIcon,
  LocationIcon,
  StarIcon,
  BookmarkIcon,
  CartIcon,
  VerifiedIcon,
  PlusIcon,
  MinusIcon,
  AIIcon,
} from "./icons";
import Plastics from "../../assets/imgs/plastics.png";
import { useNavigate } from 'react-router-dom';

interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}



export const AIProductOverview: React.FC = () => {
  const [quantity, setQuantity] = useState<number>(110);
  const pricePerKg = 110;
  const basePrice = quantity * pricePerKg;
  const serviceFee = Math.round(basePrice * 0.05);
  const totalPrice = basePrice + serviceFee;

  const reviews: Review[] = [
    {
      id: "1",
      author: "Praise Godwin",
      rating: 5,
      comment:
        "Excellent quality materials, well packaged and delivered on time.",
      date: "5 days ago",
    },
    {
      id: "2",
      author: "Praise Godwin",
      rating: 5,
      comment:
        "Excellent quality materials, well packaged and delivered on time.",
      date: "5 days ago",
    },
  ];
  const navigate = useNavigate();
 
  // Whatever "selected product" data AIProductOverview is currently showing.
  // Replace this with your real product/listing object.
const handlePlaceOrder = (product: {
  id: string;
  productName: string;
  productPrice: number;
  sellerName: string;
  quantity: string;
  total: number; // ← added
}) => {
  navigate('/buyer/checkout', {
    state: {
      checkoutProduct: product,
      openPaymentFor: product.id,
    },
  });
};

 const product = {
  id: "pet-bottles-001",
  productName: "PET Bottles",
  productPrice: basePrice,
  sellerName: "Eco Recycle Ltd",
  quantity: `${quantity} kg`,
  total: totalPrice, 
};

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#1F2937] font-sans antialiased">
      {/* Container Wrapper matching your design's layout limits */}
      <div className="max-w-360 mx-auto px-2 ">
        {/* Back Button Link */}
        <button className="flex items-center gap-2 text-sm font-medium text-[#4B5563] mb-3 hover:text-black transition-colors">
          <BackIcon />
          <span>Back</span>
        </button>

        {/* Main Component Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Main Info & Scrolling Product Dossier (Takes 8 cols on Desktop) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Primary Product Card Frame */}
            <div className="bg-white rounded-3xl border border-[#E5E7EB] p-6 shadow-sm overflow-hidden">
              
              <div className="relative w-full h-70 md:h-90 rounded-2xl overflow-hidden mb-6">
                <img
                  src={Plastics}
                  alt="PET Bottles crushed stack"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Status Tags & Pricing Metadata */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                <div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#A3E635] text-[#15803D] mb-2">
                    Available
                  </span>
                  <h1 className="text-2xl font-bold text-[#111827]">
                    PET Bottles
                  </h1>
                </div>
                <div className="text-left md:text-right">
                  <div className="text-2xl md:text-3xl font-extrabold text-[#16A34A]">
                    ₦{basePrice.toLocaleString()}
                  </div>
                  <span className="text-xs text-[#6B7280]">
                    ₦{pricePerKg}/kg
                  </span>
                </div>
              </div>

              {/* Quick Logistics Specs Tags */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <div className="flex items-center gap-3 bg-[#F9FAFB] p-3 rounded-xl border border-[#F3F4F6]">
                  <WeightIcon />
                  <div>
                    <p className="text-xs text-[#9CA3AF]">Available Weight</p>
                    <p className="text-sm font-medium text-[#374151]">
                      500 kg available
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-[#F9FAFB] p-3 rounded-xl border border-[#F3F4F6]">
                  <WeightIcon />
                  <div>
                    <p className="text-xs text-[#9CA3AF]">
                      Minimum Order Demand
                    </p>
                    <p className="text-sm font-medium text-[#374151]">100kg</p>
                  </div>
                </div>
              </div>

              {/* Location Tag */}
              <div className="flex items-center gap-2 text-sm text-[#4B5563] bg-[#F9FAFB] px-4 py-2.5 rounded-xl w-fit mb-6">
                <LocationIcon />
                <span className="font-medium">Ikeja, Lagos</span>
                <span className="text-[#9CA3AF]">•</span>
                <span className="text-[#6B7280]">2.3 km</span>
              </div>

              {/* Detailed Technical Description */}
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-[#111827]">
                  Description
                </h3>
                <p className="text-sm leading-relaxed text-[#4B5563]">
                  High-quality waste material, properly sorted and cleaned. All
                  materials are inspected and meet industry standards. Perfect
                  for recycling facilities and manufacturing plants. We ensure
                  prompt delivery and professional handling throughout the
                  process.
                </p>

                {/* Technical Product Specifications Tables */}
                <div className="pt-2 space-y-3">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#111827] mb-1">
                      Material Condition:
                    </h4>
                    <p className="text-sm font-medium text-[#374151]">
                      Clean and Sorted
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#111827] mb-1">
                        Product Information
                      </h4>
                      <p className="text-sm text-[#374151]">Listed</p>
                      <p className="text-sm font-medium text-[#374151]">
                        Updated
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#9CA3AF] opacity-0 mb-1">
                        Update Info
                      </h4>
                      <p className="text-sm text-[#6B7280]">7 days ago</p>
                      <p className="text-sm font-medium text-[#6B7280]">
                        1 day ago
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Seller Profiles Frame */}
            <div className="bg-white rounded-3xl border border-[#E5E7EB] p-6 shadow-sm">
              <h3 className="text-lg font-bold text-[#111827] mb-4">
                Seller Details
              </h3>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-emerald-100">
                  <img
                    src="/api/placeholder/48/48"
                    alt="Eco Recycle Ltd logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-[#111827]">
                      Eco Recycle Ltd
                    </h4>
                    <VerifiedIcon />
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[#6B7280]">
                    <StarIcon />
                    <span className="font-semibold text-[#111827]">4.8</span>
                  </div>
                </div>
              </div>

              {/* Verified Seller Stats Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Total Sales", val: "25" },
                  { label: "Completion Rate", val: "92%" },
                  { label: "Response Time", val: "> 90 Mins" },
                  { label: "No Of Available Listing", val: "9" },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="bg-[#F6F8F7] border border-[#F3F4F6] p-3 rounded-2xl text-center"
                  >
                    <p className="text-xl font-bold text-[#111827] mb-1">
                      {stat.val}
                    </p>
                    <p className="text-[11px] leading-tight text-[#6B7280] font-medium">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <button className=" bg-[#16A34A] border border-[#E5E7EB] text-white hover:[#16A34A] font-bold py-3 px-4 rounded-xl text-sm transition-all">
                View Full Seller Profile
              </button>
            </div>

            {/* Ratings & Client Feedback Reviews Frame */}
            <div className="bg-white rounded-3xl border border-[#E5E7EB] p-6 shadow-sm space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-[#111827]">
                  Recent Review
                </h3>
                <button className="text-sm font-bold text-[#16A34A] hover:underline">
                  See all
                </button>
              </div>

              <div className="space-y-4">
                {reviews.map((review, idx) => (
                  <div
                    key={idx}
                    className="bg-[#F9FAFB] border border-[#F3F4F6] p-4 rounded-2xl space-y-2"
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-bold text-[#111827]">
                        {review.author}
                      </h4>
                      <span className="text-xs text-[#9CA3AF] font-medium">
                        {review.date}
                      </span>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(review.rating)].map((_, i) => (
                        <StarIcon key={i} />
                      ))}
                    </div>
                    <p className="text-xs text-[#4B5563] leading-relaxed font-medium">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: AI Evaluation Engine & Dynamic Invoice Pricing (Takes 4 cols on Desktop) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-6">
            {/* Emerald AI Insight Box */}
            <div className="bg-[#16A34A] text-white rounded-3xl p-6 shadow-sm relative overflow-hidden">
              <div className="relative z-10 space-y-4">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-lg px-2 py-0.5 rounded-md font-bold tracking-wide flex items-center gap-1">
                      <AIIcon />
                    </span>
                    <span className="text-md px-2 py-0.5 rounded-md font-bold "> Highly Recommended</span>
                   
                
                  </div>
                  
                </div>

                {/* Progress Bar Indicators */}
                <div className="space-y-1">
                  <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-white h-full rounded-full"
                      style={{ width: "92%" }}
                    ></div>
                  </div>
                  <div className="text-right text-xs font-bold text-white/90">
                    92%
                  </div>
                </div>

                {/* List Parameters */}
                <ul className="space-y-3 text-xs font-medium text-white/90 pt-2 border-t border-white/10">
                  <li className="flex items-start gap-2.5">
                    <VerifiedIcon />
                    <span>
                      Material quality verified by previous transactions.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <VerifiedIcon />
                    <span>
                      This listing closely matches your typical purchase
                      pattern.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <VerifiedIcon />
                    <span>
                      Seller has 92% positive feedback from similar buyers.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Abstract subtle background shapes to replicate figma glowing accent */}
              <div className="absolute -right-12 -bottom-12 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
            </div>

            {/* Check-Out / Price Verification Action Card Container */}
            <div className="bg-white rounded-3xl border border-[#E5E7EB] p-6 shadow-sm space-y-6">
              {/* Counter Input Segment */}
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  {/* Minus Button */}
                  <button
                    onClick={() =>
                      setQuantity((prev) => Math.max(20, prev - 10))
                    }
                    className="w-11 h-11 flex items-center justify-center bg-white border border-[#E5E7EB] text-[#6B7280] hover:bg-gray-50 rounded-xl transition-colors shrink-0"
                  >
                    <MinusIcon />
                  </button>

                  {/* Value Box */}
                  <div className="flex-1 min-h-11 flex items-center justify-center border border-[#E5E7EB] rounded-xl bg-white px-4">
                    <span className="text-base font-medium text-[#111827]">
                      {quantity}
                    </span>
                  </div>

                  {/* Plus Button */}
                  <button
                    onClick={() =>
                      setQuantity((prev) => Math.min(500, prev + 10))
                    }
                    className="w-11 h-11 flex items-center justify-center bg-white border border-[#E5E7EB] text-[#6B7280] hover:bg-gray-50 rounded-xl transition-colors shrink-0"
                  >
                    <PlusIcon />
                  </button>
                </div>

                {/* Metadata Sub-labels */}
                <div className="flex justify-between items-center text-xs text-[#6B7280] px-0.5">
                  <span>Min: 20kg</span>
                  <span>Available: 500kg</span>
                </div>
              </div>

              {/* Integrated Receipt Breakdown Wrapper */}
              <div className="border border-[#E5E7EB] rounded-2xl p-4 bg-white space-y-3.5">
                <div className="flex justify-between items-start text-sm text-[#4B5563]">
                  <div>
                    <p className="font-medium">Product</p>
                    <p className="text-xs text-[#9CA3AF] mt-0.5">
                      + fee (approx 5%)
                    </p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="font-semibold text-[#111827]">
                      ₦{basePrice.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-[#F3F4F6]">
                  <span className="text-base font-bold text-[#111827]">
                    Total:
                  </span>
                  <span className="text-xl font-bold text-[#111827]">
                    ₦{totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Action Buttons Stack */}
              <div className="space-y-3">
                {/* Save Outline Action Button */}
                <button className="w-full bg-white border border-[#E5E7EB] hover:bg-gray-50 text-[#374151] font-medium py-3 rounded-xl text-sm flex items-center justify-center gap-2 transition-all">
                  <BookmarkIcon filled={false} />
                  <span>Save</span>
                </button>

                {/* Place Order Primary Brand Button */}
                <button className="w-full bg-[#16A34A] hover:bg-[#15803D] text-white font-medium py-3.5 rounded-xl text-sm shadow-sm transition-all flex items-center justify-center gap-2"  onClick={() => handlePlaceOrder(product)}>
                  <CartIcon />
                  <span>Place Order</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

  
     
    </div>
  );
};
