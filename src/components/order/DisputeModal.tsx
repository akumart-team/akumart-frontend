import React, { useState, useEffect } from 'react';

//Types 
type DisputeStep = 'form' | 'success';

export interface DisputeModalProps {
  orderId: string;
  productName: string;
  sellerName: string;
  quantity: string;
  productPrice: number;
  total: number;
  escrowAmount: number;
  onClose: () => void;
  onSubmit: (data: { reason: string; description: string; image: File | null }) => void;
}

const DISPUTE_REASONS = [
  'Received wrong item',
  'Incomplete Order (missing items)',
  'Quantity Mismatch',
  'Other (please specify)',
];

//  Icons 
const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const BackArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ImageUploadIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <path d="M21 15l-5-5L5 21" />
  </svg>
);

const SuccessCheckIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const formatNaira = (amount: number): string => `₦${amount.toLocaleString('en-NG')}`;

// Reason Selector (inline dropdown popover, anchored under the trigger) 
interface ReasonSelectorProps {
  selected: string | null;
  onSelect: (reason: string) => void;
}

const ReasonSelector: React.FC<ReasonSelectorProps> = ({ selected, onSelect }) => (
  <div className="flex flex-col gap-2 p-2">
    {DISPUTE_REASONS.map((reason) => (
      <button
        key={reason}
        type="button"
        onClick={() => onSelect(reason)}
        className={`w-full text-left px-4 py-3 rounded-lg text-[13px] transition-colors duration-150 ${
          selected === reason
            ? 'bg-[#F0FDF4] text-[#1A7A3C] font-medium'
            : 'text-[#374151] hover:bg-[#F9FAFB]'
        }`}
      >
        {reason}
      </button>
    ))}
  </div>
);

//  Success Screen 
const SuccessScreen: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="flex flex-col items-center justify-center text-center py-16 px-6">
    <div className="w-16 h-16 rounded-full bg-[#1A7A3C] flex items-center justify-center mb-5">
      <SuccessCheckIcon />
    </div>
    <h3 className="text-[20px] font-bold text-[#111827]">Submitted Successfully</h3>
    <p className="text-[13px] text-[#6B7280] mt-2 max-w-[320px]">
      Your dispute has been submitted. Our team will review it and get back to you within 24–48 hours.
    </p>
    <button
      onClick={onClose}
      className="mt-6 px-8 py-2.5 rounded-lg bg-[#1A7A3C] hover:bg-[#155f30] text-white text-[13px] font-semibold transition-colors duration-150"
    >
      Done
    </button>
  </div>
);

// Main Dispute Modal 
const DisputeModal: React.FC<DisputeModalProps> = ({
  orderId,
  productName,
  sellerName,
  quantity,
  productPrice,
  total,
  escrowAmount,
  onClose,
  onSubmit,
}) => {
  const [step, setStep] = useState<DisputeStep>('form');
  const [reason, setReason] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showReasonDropdown, setShowReasonDropdown] = useState(false);

  // Lock background scroll while this modal is mounted, restore on close/unmount.
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const isValid = reason !== null && description.trim().length > 0;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = () => {
    if (!isValid) return;
    onSubmit({ reason: reason!, description, image });
    setStep('success');
  };

  // ── Success view replaces the whole modal body ──
  if (step === 'success') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
        <div className="bg-white rounded-2xl w-full max-w-120 overflow-hidden">
          <SuccessScreen onClose={onClose} />
        </div>
      </div>
    );
  }

  //  Main dispute form 
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
      <div className="bg-white rounded-2xl w-full max-w-140 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-[#1A7A3C] rounded-t-2xl px-6 py-5 flex items-center gap-3">
          <button
            onClick={onClose}
            className="text-white/90 hover:text-white transition-colors duration-150 shrink-0"
            aria-label="Go back"
          >
            <BackArrowIcon />
          </button>
          <div>
            <h2 className="text-white text-[18px] font-bold">File Dispute</h2>
            <p className="text-white/80 text-[12px] mt-0.5">Order ID &nbsp; {orderId}</p>
          </div>
        </div>

        <div className="p-6">
          {/* Order summary */}
          <div className="border border-[#E5E7EB] rounded-xl p-4 mb-5">
            <h4 className="text-[13px] font-semibold text-[#111827] mb-2">Order Summary</h4>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[14px] font-semibold text-[#111827]">{productName}</p>
                <p className="text-[12px] text-[#6B7280] mt-0.5">Seller: {sellerName}</p>
                <p className="text-[12px] text-[#6B7280]">Quantity: {quantity}</p>
              </div>
              <span className="text-[14px] font-bold text-[#1A7A3C]">{formatNaira(productPrice)}</span>
            </div>
            <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#F3F4F6]">
              <span className="text-[13px] font-semibold text-[#111827]">Total</span>
              <span className="text-[14px] font-bold text-[#111827]">{formatNaira(total)}</span>
            </div>
          </div>

          {/* Dispute procedures */}
          <div className="bg-[#1A7A3C] rounded-xl p-4 mb-5">
            <h4 className="text-white text-[13px] font-semibold mb-2">Dispute Procedures</h4>
            <ol className="text-white/90 text-[12px] space-y-1 list-decimal list-inside">
              <li>Submit your dispute with detailed information and evidence</li>
              <li>Our team reviews the case within 24-48 hours</li>
              <li>We may contact you or the seller for additional information</li>
              <li>A decision is made based on evidence and platform policies</li>
              <li>Refunds are processed within 3-5 business days if approved</li>
            </ol>
          </div>

          {/* Reason for dispute */}
          <div className="relative mb-5">
            <label className="block text-[13px] font-medium text-[#111827] mb-2">
              Reason For Dispute <span className="text-[#D0021B]">*</span>
            </label>
            <button
              type="button"
              onClick={() => setShowReasonDropdown((prev) => !prev)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-[#E5E7EB] bg-white text-left text-[13px] text-[#374151] hover:border-[#D1D5DB] transition-colors duration-150"
            >
              <span className={reason ? 'text-[#111827]' : 'text-[#9CA3AF]'}>
                {reason ?? 'Select a Reason'}
              </span>
              <ChevronDownIcon />
            </button>

            {/* Inline dropdown popover — sits right under the trigger, rest of
                the form stays visible behind it. */}
            {showReasonDropdown && (
              <>
                {/* Invisible click-catcher to close the dropdown on outside click */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowReasonDropdown(false)}
                />
                <div className="absolute left-0 right-0 top-full mt-2 z-20 bg-white border border-[#E5E7EB] rounded-xl shadow-lg overflow-hidden">
                  <ReasonSelector
                    selected={reason}
                    onSelect={(r) => {
                      setReason(r);
                      setShowReasonDropdown(false);
                    }}
                  />
                </div>
              </>
            )}
          </div>

          {/* Detailed description */}
          <div className="mb-5">
            <label className="block text-[13px] font-medium text-[#111827] mb-2">
              Detailed Description of Dispute <span className="text-[#D0021B]">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please provide detailed information about your issue. Include dates, communication attempts, and any relevant details..."
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] text-[13px] text-[#374151] placeholder-[#9CA3AF] outline-none focus:ring-2 focus:ring-[#1A7A3C]/20 focus:border-[#1A7A3C] resize-none transition-all duration-150"
            />
          </div>

          {/* Image upload */}
          <div className="mb-5">
            <label className="block text-[13px] font-medium text-[#111827] mb-2">
              Upload Evidence (Optional)
            </label>
            <label className="flex flex-col items-center justify-center gap-2 w-full py-10 rounded-xl border-2 border-dashed border-[#D1D5DB] bg-white cursor-pointer hover:border-[#1A7A3C] transition-colors duration-150">
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              {imagePreview ? (
                <img src={imagePreview} alt="Evidence preview" className="h-24 rounded-lg object-cover" />
              ) : (
                <>
                  <ImageUploadIcon />
                  <span className="text-[13px] text-[#6B7280]">Click Here to upload picture</span>
                </>
              )}
            </label>
          </div>

          {/* Refund information */}
          <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-4 mb-6">
            <h4 className="text-[13px] font-semibold text-[#111827] mb-2">Refund Information</h4>
            <p className="text-[12px] text-[#6B7280] mb-2">
              Your payment of {formatNaira(escrowAmount)} is currently held in escrow. If your dispute is approved:
            </p>
            <ul className="text-[12px] text-[#6B7280] space-y-1 list-disc list-inside">
              <li>Full refund will be processed to your original payment method</li>
              <li>Transaction fees will be refunded</li>
              <li>Refunds typically take 3-5 business days to appear</li>
            </ul>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-lg border border-[#E5E7EB] text-[#374151] text-[13px] font-semibold hover:bg-[#F9FAFB] transition-colors duration-150"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!isValid}
              className="flex-1 py-3 rounded-lg bg-[#1A7A3C] hover:bg-[#155f30] disabled:opacity-50 disabled:cursor-not-allowed text-white text-[13px] font-semibold transition-colors duration-150"
            >
              Submit Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisputeModal;