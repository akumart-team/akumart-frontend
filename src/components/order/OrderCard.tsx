import React from 'react';
import type { Order, OrderStatus, DeliveryStatus } from '../../utils/types';
import { StarIcon,WeightIcon,MapPinIcon, DownloadIcon } from './Icon';


//  Helpers
const formatNaira = (amount: number): string =>
  `₦${amount.toLocaleString('en-NG')}`;




//  Status Badges 
const statusStyles: Record<OrderStatus, string> = {
  Inprogress: 'bg-[#1A7A3C] text-white',
  Delivered:  'bg-[#1A7A3C] text-white',
  Cancelled:  'bg-red-600 text-white',
  Pending:    'bg-yellow-500 text-white',
};

const deliveryStatusStyles: Record<NonNullable<DeliveryStatus>, string> = {
  'Delivery Overdue': 'bg-[#FFE5E5] text-[#D0021B] border border-[#D0021B]',
  'On Track':         'bg-[#E5F4EC] text-[#1A7A3C] border border-[#1A7A3C]',
  'Delivered':        'bg-[#E5F4EC] text-[#1A7A3C] border border-[#1A7A3C]',
};

interface StatusBadgesProps {
  status: OrderStatus;
  deliveryStatus?: DeliveryStatus;
}

const StatusBadges: React.FC<StatusBadgesProps> = ({ status, deliveryStatus }) => (
  <div className="flex items-center gap-2 flex-wrap">
    <span className={`text-[10px] font-semibold px-2.5 py-0.75 rounded-full ${statusStyles[status]}`}>
      {status}
    </span>
    {deliveryStatus && (
      <span className={`text-[10px] font-semibold px-2.5 py-0.75 rounded-full ${deliveryStatusStyles[deliveryStatus]}`}>
        {deliveryStatus}
      </span>
    )}
  </div>
);

// Progress Bar 
const ProgressBar: React.FC<{ percent: number }> = ({ percent }) => (
  <div className="mt-3">
    <div className="flex justify-end mb-1">
      <span className="text-[10px] text-[#6B7280]">{percent}%</span>
    </div>
    <div className="w-full h-1.25 bg-[#E5E7EB] rounded-full overflow-hidden">
      <div
        className="h-full bg-[#1A7A3C] rounded-full"
        style={{ width: `${percent}%` }}
      />
    </div>
  </div>
);

//  Pricing Block 
interface PricingProps {
  productPrice: number;
  transactionFeePercent: number;
}

const PricingBlock: React.FC<PricingProps> = ({ productPrice, transactionFeePercent }) => {
  const fee = Math.round(productPrice * (transactionFeePercent / 100));
  const total = productPrice + fee;
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[15px] text-[#6B7280]">Product Price</span>
        <span className="text-[15px] text-[#111827]">{formatNaira(productPrice)}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[13px] text-[#6B7280]">Transaction Fee ({transactionFeePercent}%)</span>
        <span className="text-[13px] text-[#111827]">{formatNaira(fee)}</span>
      </div>
      <div className="flex items-center justify-between pt-5 border-t border-[#f3f4f6fd]">
        <span className="text-[15px] font-semibold text-[#111827]">Total</span>
        <span className="text-[15px] font-bold text-[#1A7A3C]">{formatNaira(total)}</span>
      </div>
    </div>
  );
};

//   Action Buttons 
interface ActionButtonsProps {
  showDispute: boolean;
  onTrack: () => void;
  onDispute: () => void;
  onDownload: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ showDispute, onTrack, onDispute, onDownload }) => (
  <div className="flex flex-col gap-2 mt-3">
    <button
      onClick={onTrack}
      className="w-full py-2.25 rounded-lg bg-[#1A7A3C] hover:bg-[#155f30] active:bg-[#0f4523] text-white text-[15px] font-semibold transition-colors duration-150"
    >
      Track Order
    </button>
    {showDispute && (
      <button
        onClick={onDispute}
        className="w-full py-2.25 rounded-lg border border-[#D0021B] text-[#D0021B] hover:bg-[#FFF5F5] text-[15px] font-semibold transition-colors duration-150"
      >
        File Dispute
      </button>
    )}
    <button
      onClick={onDownload}
      className="w-full py-2.25 rounded-lg border border-[#E5E7EB] text-[#374151] hover:bg-[#F9FAFB] text-[13px] font-medium transition-colors duration-150 flex items-center justify-center gap-1.5"
    >
      <DownloadIcon />
      Download Invoice
    </button>
  </div>
);

// Product Info (shared between desktop & mobile) 
const ProductInfo: React.FC<{ order: Order }> = ({ order }) => (
  <>
    {/* Status badges */}
    <StatusBadges status={order.status} deliveryStatus={order.deliveryStatus ?? undefined} />

    {/* Product name */}
    <h3 className="mt-2 text-[20px] font-semibold text-[#111827] leading-snug">
      {order.productName}
    </h3>

    {/* Rating + Seller */}
    <div className="flex items-center gap-1.5 mt-2">
      <StarIcon />
      <span className="text-[15px] font-medium text-[#374151]">{order.rating}</span>
      <span className="text-black mx-0.5">•</span>
      <span className="text-[15px] text-[#6B7280]">{order.sellerName}</span>
    </div>

    {/* Location */}
    <div className="flex items-center gap-1.5 mt-1.5 text-[#6B7280]">
      <MapPinIcon />
      <span className="text-[15px]">{order.location}</span>
      <span className="text-[15px] font-semibold text-[#1A7A3C]">• {order.distance}</span>
    </div>

    {/* Weight */}
    <div className="flex items-center gap-1.5 mt-1.5 text-[#6B7280]">
      <WeightIcon />
      <span className="text-[15px]">{order.weightAvailable}</span>
    </div>

    {/* Order ID */}
    <p className="mt-2 text-[15px] text-[#6B7280]">
      <span className="text-[#374151] font-medium">Order ID</span>
      {' '}
      <span>{order.orderId}</span>
    </p>

    {/* Delivery Information */}
    <p className="mt-0.5 text-[15px] text-[#6B7280]">
      <span className="text-[#374151] font-medium">Delivery Information : </span>
      <span>{order.deliveryInfo}</span>
    </p>

    {/* Progress bar */}
    <ProgressBar percent={order.progressPercent} />
  </>
);

//  Order Card 
interface OrderCardProps {
  order: Order;
  onTrack: (id: string) => void;
  onDispute: (id: string) => void;
  onDownloadInvoice: (id: string) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onTrack, onDispute, onDownloadInvoice }) => {
  const showDispute = order.deliveryStatus === 'Delivery Overdue' || order.status === 'Cancelled';

  const fallbackImg = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80';

  return (
    <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden">

      {/*  Desktop  */}
      <div className="hidden md:flex min-h-52.5">
        {/* Image */}
        <div className="shrink-0 w-80 p-3">
          <img
            src={order.productImage}
            alt={order.productName}
            className="w-full h-full object-cover rounded-2xl"
            onError={(e) => { (e.target as HTMLImageElement).src = fallbackImg; }}
          />
        </div>

        {/* Info */}
        <div className="flex-1 px-5 py-4 min-w-0">
          <ProductInfo order={order} />
        </div>

        {/* Pricing + Actions — right column */}
        <div className="shrink-0 w-57.5 px-5 py-4 border-l border-[#F3F4F6] flex flex-col justify-between">
          <PricingBlock
            productPrice={order.productPrice}
            transactionFeePercent={order.transactionFeePercent}
          />
          <ActionButtons
            showDispute={showDispute}
            onTrack={() => onTrack(order.id)}
            onDispute={() => onDispute(order.id)}
            onDownload={() => onDownloadInvoice(order.id)}
          />
        </div>
      </div>

      {/* ── Mobile ── */}
      <div className="md:hidden">
        {/* Image */}
        <div className="w-full h-50">
          <img
            src={order.productImage}
            alt={order.productName}
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).src = fallbackImg; }}
          />
        </div>

        {/* Info + Pricing + Actions */}
        <div className="p-4">
          <ProductInfo order={order} />

          {/* Pricing */}
          <div className="mt-4 p-3 bg-[#F9FAFB] rounded-lg">
            <PricingBlock
              productPrice={order.productPrice}
              transactionFeePercent={order.transactionFeePercent}
            />
          </div>

          <ActionButtons
            showDispute={showDispute}
            onTrack={() => onTrack(order.id)}
            onDispute={() => onDispute(order.id)}
            onDownload={() => onDownloadInvoice(order.id)}
          />
        </div>
      </div>

    </div>
  );
};

export default OrderCard;