
import type { DeliveryFormData } from "../../utils/types"
import { DeliveryIcon } from "./Icon";

interface DeliveryMethodCardProps {
  formData: DeliveryFormData;
  onChange: (field: keyof DeliveryFormData, value: string) => void;
}

const DeliveryMethodCard = ({ formData, onChange }: DeliveryMethodCardProps) => {
  return (
    <div className="bg-white rounded-2xl border border-[#E9ECEF] p-6">
      <h3
        className="text-[#0F172A] font-bold text-base mb-4"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        Delivery Method
      </h3>

      {/* Delivery option — selected state */}
      <div className="border border-[#16A34A] bg-[#F0FDF4] rounded-xl p-4 mb-5">
        <div className="flex items-center gap-3">
          <DeliveryIcon />
          <div>
            <p className="text-[#0F172A] font-semibold text-sm">Delivery</p>
            <p className="text-[#6B7280] text-xs leading-relaxed">
              Materials delivered to your location (+3% logistics fee)
            </p>
          </div>
        </div>
      </div>

      {/* Address fields */}
      <div className="space-y-4">
        {/* Street Address */}
        <div>
          <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">
            Street Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.streetAddress}
            onChange={(e) => onChange("streetAddress", e.target.value)}
            placeholder="1213, hvt street"
            className="w-full border border-[#E9ECEF] rounded-xl px-3 py-3 text-sm text-[#0F172A] placeholder:text-[#D1D5DB] outline-none focus:ring-1 focus:ring-emerald-500 transition-shadow"
          />
        </div>

        {/* City + State */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => onChange("city", e.target.value)}
              placeholder="Lagos"
              className="w-full border border-[#E9ECEF] rounded-xl px-3 py-3 text-sm text-[#0F172A] placeholder:text-[#D1D5DB] outline-none focus:ring-1 focus:ring-emerald-500 transition-shadow"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">
              State <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.state}
              onChange={(e) => onChange("state", e.target.value)}
              placeholder="1213, hvt street"
              className="w-full border border-[#E9ECEF] rounded-xl px-3 py-3 text-sm text-[#0F172A] placeholder:text-[#D1D5DB] outline-none focus:ring-1 focus:ring-emerald-500 transition-shadow"
            />
          </div>
        </div>

        {/* Postal Code */}
        <div>
          <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">
            Postal Code <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.postalCode}
            onChange={(e) => onChange("postalCode", e.target.value)}
            placeholder="10000001"
            className="w-full border border-[#E9ECEF] rounded-xl px-3 py-3 text-sm text-[#0F172A] placeholder:text-[#D1D5DB] outline-none focus:ring-1 focus:ring-emerald-500 transition-shadow"
          />
        </div>
      </div>
    </div>
  );
};

export default DeliveryMethodCard;