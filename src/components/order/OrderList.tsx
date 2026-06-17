import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import OrderCard from './OrderCard';
import TrackOrder from './TrackOrder';
import PaymentMethodCard from './Paymentmethodcard';
import type { Order } from '../../utils/types';
import type { CardPaymentMethod, CardFormData, CheckoutProduct } from '../../utils/types';
import Plastics from "../../assets/imgs/plastics.png"
import {SearchIcon} from "./Icon"

//  Mock Data 
const mockOrders = [
  {
    id: '1',
    orderId: 'ORD-1234567890',
    productName: 'PET Bottles',
    productImage: Plastics,
    rating: 4.8,
    sellerName: 'EcoRecycle Ltd',
    location: 'Ikeja, Lagos',
    distance: '2.5km',
    weightAvailable: '500 kg available',
    deliveryInfo: '04, ytanuew, street Ikeja Rd, Lagos',
    status: 'Inprogress',
    deliveryStatus: 'Delivery Overdue',
    progressPercent: 50,
    productPrice: 55000,
    transactionFeePercent: 5,
  },
  {
    id: '2',
    orderId: 'ORD-1234567890',
    productName: 'PET Bottles',
    productImage: Plastics,
    rating: 4.8,
    sellerName: 'EcoRecycle Ltd',
    location: 'Ikeja, Lagos',
    distance: '2.5km',
    weightAvailable: '500 kg available',
    deliveryInfo: 'Self Pickup',
    status: 'Inprogress',
    deliveryStatus: null,
    progressPercent: 50,
    productPrice: 55000,
    transactionFeePercent: 5,
  },
  {
    id: '3',
    orderId: 'ORD-1234567890',
    productName: 'PET Bottles',
    productImage: Plastics,
    rating: 4.8,
    sellerName: 'EcoRecycle Ltd',
    location: 'Ikeja, Lagos',
    distance: '2.5km',
    weightAvailable: '500 kg available',
    deliveryInfo: '04, ytanuew, street Ikeja Rd, Lagos',
    status: 'Inprogress',
    deliveryStatus: 'Delivery Overdue',
    progressPercent: 50,
    productPrice: 55000,
    transactionFeePercent: 5,
  },
] as unknown as Order[];



interface OrderSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const OrderSearchBar: React.FC<OrderSearchBarProps> = ({ value, onChange }) => (
  <div className="relative w-full">
    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
      <SearchIcon />
    </div>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search by Order ID or Product detail..."
      className="w-full pl-9 pr-4 py-2.5 text-[13px] text-[#374151] placeholder-[#9CA3AF] bg-white border border-[#E5E7EB] rounded-lg outline-none focus:ring-2 focus:ring-[#1A7A3C]/20 focus:border-[#1A7A3C] transition-all duration-150"
    />
  </div>
);

//  Main Component 
interface OrderListProps {
  orders?: Order[];
}

const OrderList: React.FC<OrderListProps> = ({ orders = mockOrders }) => {
  const location = useLocation();
  const navState = (location.state ?? {}) as {
    checkoutProduct?: CheckoutProduct;
    openPaymentFor?: string;
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [trackingOrderId, setTrackingOrderId] = useState<string | null>(null);

  const [checkoutProductId, setCheckoutProductId] = useState<string | null>(
    navState.openPaymentFor ?? null
  );
  const checkoutProduct = navState.checkoutProduct ?? null;
  const [selectedPayment, setSelectedPayment] = useState<CardPaymentMethod>('mastercard');
  const [cardData, setCardData] = useState<CardFormData>({
    cardNumber: '',
    cardHolder: '',
    expiry: '',
    cvv: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCardChange = (field: keyof CardFormData, value: string) => {
    setCardData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePlaceOrder = () => {
    setIsSubmitting(true);
    // TODO: wire up real payment submission here.
    setTimeout(() => {
      setIsSubmitting(false);
      setCheckoutProductId(null); // back to the order list / success screen
    }, 1200);
  };

  const filteredOrders = useMemo(() => {
    if (!searchQuery.trim()) return orders;
    const q = searchQuery.toLowerCase();
    return orders.filter(
      (o) =>
        o.orderId.toLowerCase().includes(q) ||
        o.productName.toLowerCase().includes(q) ||
        o.sellerName.toLowerCase().includes(q)
    );
  }, [orders, searchQuery]);

//   const handleTrack = (orderId: string) => {
//     console.log('Track order:', orderId);
//   };

  // If checkout is active, render PaymentMethodCard in place of the list
  if (checkoutProductId !== null && checkoutProduct) {
    return (
      <div className="flex flex-col h-full overflow-y-auto bg-[#F9FAFB] px-4 py-4">
        <PaymentMethodCard
          selectedPayment={selectedPayment}
          onSelectPayment={setSelectedPayment}
          cardData={cardData}
          onCardChange={handleCardChange}
          isSubmitting={isSubmitting}
          total={checkoutProduct.total}
          onPlaceOrder={handlePlaceOrder}
        />
      </div>
    );
  }

  // If tracking is active, render TrackOrder fullscreen in place of the list
  if (trackingOrderId !== null) {
    return (
      <div className="flex flex-col h-full overflow-y-auto bg-[#F9FAFB] px-4 py-4">
        <TrackOrder orderId={trackingOrderId} onBack={() => setTrackingOrderId(null)} />
      </div>
    );
  }

  const handleDispute = (orderId: string) => {
    console.log('File dispute for:', orderId);
  };

  const handleDownloadInvoice = (orderId: string) => {
    console.log('Download invoice for:', orderId);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#F9FAFB]">
      {/* Sticky search bar */}
      <div className="shrink-0 px-4 pt-2 pb-3 bg-[#F9FAFB] border-b border-[#F3F4F6]">
        <OrderSearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      {/* Scrollable order list — constrained to sidebar height */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin scrollbar-thumb-[#D1D5DB] scrollbar-track-transparent">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onTrack={setTrackingOrderId}
              onDispute={handleDispute}
              onDownloadInvoice={handleDownloadInvoice}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-14 h-14 rounded-full bg-[#F3F4F6] flex items-center justify-center mb-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <p className="text-[14px] font-medium text-[#374151]">No orders found</p>
            <p className="text-[12px] text-[#9CA3AF] mt-1">
              Try a different Order ID or product name
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderList;