import Logo from "../../assets/icons/logo.png";
import Pricedrop from "../../assets/icons/pricedrop.png";
import Notification from "../../assets/icons/notification.png";
import Ai from "../../assets/icons/ai.png";

// Mock arrays explicitly based on data entries visible in image_5036a1.jpg & image_503609.png
const BUYER_METRICS = [
  { label: "Active Purchase", sub: "In Progress", count: "3" },
  { label: "Completed Purchase", sub: "Total Transaction", count: "8" },
  { label: "Saved Listing", sub: "Bookmark", count: "15" },
  { label: "Total Spent", sub: "This Month: 59,000", count: "NGN 59,000" },
];

const TRANSACTIONS = [
  {
    bank: "First Bank * Nnopu Meso",
    id: "564925339R2D",
    amount: "₦ 12,000",
    date: "25th April 2026",
    time: "10:34 AM",
  },
  {
    bank: "First Bank * Nnopu Meso",
    id: "564925339R2D",
    amount: "₦ 19,000",
    date: "25th April 2026",
    time: "10:34 AM",
  },
  {
    bank: "First Bank * Nnopu Meso",
    id: "564925339R2D",
    amount: "₦ 19,000",
    date: "25th April 2026",
    time: "10:34 AM",
  },
];

const RECENT_ACTIVITIES = [
  {
    type: "price_drop",
    title: "Price Drop Alert",
    desc: "Copper Wire Scrap dropped by 8% - now ₦180,000.",
    time: "5 hours ago",
    icon: Pricedrop,
    iconBg: "bg-[#E8F5E9]",
  },
  {
    type: "new_listing",
    title: "New Listing in Your Area",
    desc: "Mixed Office Paper - 300kg available in Ikeja.",
    time: "5 hours ago",
    icon: Notification,
    iconBg: "bg-[#FFF9C4]",
  },
  {
    type: "ai_match",
    title: "New AI Match Found",
    desc: "Premium PET Bottles match your preferences.",
    time: "5 hours ago",
    icon: Ai,
    iconBg: "bg-[#E3F2FD]",
  },
];

export const BuyerDashboard = () => {
  return (
    <div className="w-full bg-[#F6F8FA] min-h-screen font-['Plus_Jakarta_Sans',sans-serif]   space-y-6">
      <div className="md:hidden p-3">
        <h2 className="  text-xl md:text-2xl font-extrabold text-[#111827]">
          Your <span className="text-[#16A34A]">Dashboard</span>
        </h2>
        <p className="text-xs md:text-sm font-medium text-[#8A92A6] mt-1">
          Here are your personalized waste material recommendations and order
          updates.
        </p>
      </div>

      <div className="flex flex-col-reverse lg:grid lg:grid-cols-3 gap-6 items-start ">
        {/*  LEFT MAIN COLUMN  */}
        <div className="lg:col-span-2 w-full space-y-6 p-3">
          {/* 2x2 Metrics Blocks Grid */}
          <div className="grid grid-cols-2 gap-4">
            {BUYER_METRICS.map((metric, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#E9ECEF] p-4 rounded-2xl shadow-sm flex flex-col justify-between h-28"
              >
                <div>
                  <h1 className="text-lg md:text-xl font-medium text-[#111827] ">
                    {metric.count}
                  </h1>
                  <h4 className="text-md font-normal text-[#111827] tracking-tight">
                    {metric.label}
                  </h4>
                  <p className="text-[10px] font-medium text-[#A8B2BA] mt-2">
                    {metric.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Feed and Saved Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recent Activity Feed Card Component */}
            <div className="bg-white border border-[#E9ECEF] p-5 rounded-2xl shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[#111827] mb-4">
                  Recent Activity Feed
                </h3>
                <div className="space-y-4">
                  {RECENT_ACTIVITIES.map((act, idx) => (
                    <div
                      key={idx}
                      className="flex gap-3 items-start border border-[#A8B2BA] p-3 rounded-2xl"
                    >
                      <div
                        className={`w-8 h-8 rounded-xl ${act.iconBg} flex items-center justify-center shrink-0 text-sm`}
                      >
                        <img src={act.icon} alt={`${act.type} icon`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[14px] font-medium text-[#111827]">
                          {act.title}
                        </h4>
                        <p className="text-[12px] text-[#495057] font-medium leading-relaxed mt-0.5">
                          {act.desc}
                        </p>
                        <span className="text-[12px] text-[#A8B2BA] font-medium mt-1 block">
                          {act.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Saved Listing Management Widget */}
            <div className="bg-white border border-[#E9ECEF] p-5 rounded-2xl shadow-sm flex flex-col justify-between">
              <div>
                <div className="mb-3">
                  <h3 className="text-lg font-semibold text-[#111827]">
                    Saved Listing
                  </h3>
                  <p className="text-[12px] text-[#A8B2BA] font-medium mt-0.5">
                    View and manage materials you've saved for later.
                  </p>
                </div>

                {/* Filter and Search controls matching image_5036a1.jpg */}
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    placeholder="Search listings..."
                    className="flex-1 bg-[#F6F8FA] border border-[#E9ECEF] text-[11px] rounded-xl px-3 py-1.5 font-medium text-[#111827] focus:outline-none focus:border-[#16A34A]"
                  />
                  <button className="px-2.5 py-1.5 bg-[#F6F8FA] border border-[#E9ECEF] rounded-xl text-[11px] font-bold text-[#495057] flex items-center gap-1">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.66708 13.3333C6.66702 13.4572 6.70148 13.5787 6.7666 13.6841C6.83172 13.7895 6.92492 13.8746 7.03574 13.93L8.36908 14.5967C8.47074 14.6475 8.58371 14.6714 8.69724 14.6663C8.81077 14.6612 8.92111 14.6271 9.01776 14.5673C9.11442 14.5075 9.19419 14.424 9.24949 14.3247C9.30479 14.2254 9.3338 14.1137 9.33374 14V9.33333C9.33389 9.00292 9.45672 8.68433 9.67841 8.43933L14.4937 3.11333C14.5801 3.01771 14.6368 2.89912 14.6571 2.77192C14.6775 2.64472 14.6605 2.51435 14.6083 2.39658C14.5562 2.27881 14.471 2.17868 14.3631 2.1083C14.2552 2.03792 14.1292 2.0003 14.0004 2H2.00041C1.87148 2.00005 1.74533 2.03748 1.63724 2.10776C1.52915 2.17804 1.44376 2.27815 1.39141 2.39598C1.33906 2.5138 1.322 2.64427 1.34229 2.77159C1.36259 2.89892 1.41936 3.01762 1.50574 3.11333L6.32241 8.43933C6.5441 8.68433 6.66693 9.00292 6.66708 9.33333V13.3333Z"
                        stroke="#818181"
                        stroke-width="1.33333"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <span className="hidden sm:inline">Filter</span>
                  </button>
                </div>

                {/* Main Product Feature Frame Card */}
                <div className="border border-[#E9ECEF] rounded-xl p-3 bg-[#FFF]">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-[16px] font-semibold text-[#111827]">
                        PET Bottles
                      </h4>
                      <div className="flex items-center gap-1 text-[12px] text-[#8A92A6] font-medium mt-1">
                        <span className="text-amber-500">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7.68323 1.5296C7.71245 1.47058 7.75758 1.42089 7.81353 1.38615C7.86949 1.35142 7.93404 1.33301 7.9999 1.33301C8.06576 1.33301 8.13031 1.35142 8.18626 1.38615C8.24222 1.42089 8.28735 1.47058 8.31656 1.5296L9.85656 4.64894C9.95802 4.85425 10.1078 5.03188 10.293 5.16657C10.4782 5.30127 10.6933 5.38901 10.9199 5.42227L14.3639 5.92627C14.4292 5.93573 14.4905 5.96325 14.5409 6.00574C14.5913 6.04822 14.6289 6.10397 14.6492 6.16667C14.6696 6.22938 14.6721 6.29654 14.6563 6.36056C14.6405 6.42458 14.6071 6.4829 14.5599 6.52894L12.0692 8.95427C11.905 9.11434 11.7821 9.31192 11.7111 9.53002C11.6402 9.74812 11.6233 9.9802 11.6619 10.2063L12.2499 13.6329C12.2614 13.6982 12.2544 13.7653 12.2296 13.8267C12.2048 13.8881 12.1632 13.9413 12.1096 13.9803C12.056 14.0192 11.9926 14.0423 11.9265 14.0469C11.8604 14.0515 11.7944 14.0374 11.7359 14.0063L8.65723 12.3876C8.45438 12.2811 8.22868 12.2254 7.99956 12.2254C7.77044 12.2254 7.54475 12.2811 7.3419 12.3876L4.2639 14.0063C4.20545 14.0372 4.1395 14.0511 4.07353 14.0464C4.00757 14.0418 3.94424 14.0186 3.89076 13.9797C3.83728 13.9409 3.79579 13.8877 3.771 13.8264C3.74622 13.7651 3.73914 13.6981 3.75056 13.6329L4.3379 10.2069C4.3767 9.98076 4.35989 9.74854 4.28892 9.5303C4.21796 9.31207 4.09497 9.11437 3.93056 8.95427L1.4399 6.5296C1.39229 6.48363 1.35856 6.4252 1.34254 6.36099C1.32652 6.29677 1.32886 6.22935 1.34928 6.1664C1.36971 6.10345 1.40741 6.0475 1.45808 6.00493C1.50876 5.96235 1.57037 5.93487 1.6359 5.9256L5.07923 5.42227C5.30607 5.38927 5.52149 5.30164 5.70695 5.16693C5.89242 5.03221 6.04237 4.85445 6.1439 4.64894L7.68323 1.5296Z"
                              fill="#FDC700"
                              stroke="#FDC700"
                              stroke-width="1.33333"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </span>{" "}
                        <span>4.8</span>
                        <span>• EcoRecycle Ltd</span>
                      </div>
                    </div>
                    <span className="text-md font-bold text-[#16A34A]">
                      ₦55,000
                    </span>
                  </div>

                  <p className="text-[12px] text-[#A8B2BA] font-medium mt-2 block">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.125 13.125V3.125C3.125 2.78125 3.2475 2.48708 3.4925 2.2425C3.7375 1.99792 4.03167 1.87542 4.375 1.875H10.625C10.9688 1.875 11.2631 1.9975 11.5081 2.2425C11.7531 2.4875 11.8754 2.78167 11.875 3.125V13.125L7.5 11.25L3.125 13.125Z"
                        fill="#0D2B1E"
                      />
                    </svg>
                    Saved 5 days ago
                  </p>

                  <div className="mt-3 space-y-1.5">
                    <button className="w-full bg-[#16A34A] hover:bg-[#0E9F6E] text-white text-[12px] font-bold py-2 rounded-xl flex items-center justify-center gap-1.5 transition-colors">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17 18C17.5304 18 18.0391 18.2107 18.4142 18.5858C18.7893 18.9609 19 19.4696 19 20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22C16.4696 22 15.9609 21.7893 15.5858 21.4142C15.2107 21.0391 15 20.5304 15 20C15 18.89 15.89 18 17 18ZM1 2H4.27L5.21 4H20C20.2652 4 20.5196 4.10536 20.7071 4.29289C20.8946 4.48043 21 4.73478 21 5C21 5.17 20.95 5.34 20.88 5.5L17.3 11.97C16.96 12.58 16.3 13 15.55 13H8.1L7.2 14.63L7.17 14.75C7.17 14.8163 7.19634 14.8799 7.24322 14.9268C7.29011 14.9737 7.3537 15 7.42 15H19V17H7C6.46957 17 5.96086 16.7893 5.58579 16.4142C5.21071 16.0391 5 15.5304 5 15C5 14.65 5.09 14.32 5.24 14.04L6.6 11.59L3 4H1V2ZM7 18C7.53043 18 8.03914 18.2107 8.41421 18.5858C8.78929 18.9609 9 19.4696 9 20C9 20.5304 8.78929 21.0391 8.41421 21.4142C8.03914 21.7893 7.53043 22 7 22C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20C5 18.89 5.89 18 7 18ZM16 11L18.78 6H6.14L8.5 11H16Z"
                          fill="#F6F8F7"
                        />
                      </svg>
                      View Product
                    </button>
                    <button className="w-full border border-[#E9ECEF] text-[#DC3545] hover:bg-[#FFF5F5] text-[12px] font-bold py-2 rounded-xl flex items-center justify-center gap-1.5 transition-colors">
                      <svg
                        width="14"
                        height="16"
                        viewBox="0 0 14 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.616 15.77C2.168 15.77 1.78667 15.6127 1.472 15.298C1.15733 14.9833 1 14.6023 1 14.155V1.77H0V0.77H4V0H10V0.77H14V1.77H13V14.155C13 14.615 12.846 14.9993 12.538 15.308C12.23 15.6167 11.8453 15.7707 11.384 15.77H2.616ZM12 1.77H2V14.155C2 14.3343 2.05767 14.4817 2.173 14.597C2.28833 14.7123 2.436 14.77 2.616 14.77H11.385C11.5383 14.77 11.6793 14.706 11.808 14.578C11.9367 14.45 12.0007 14.3087 12 14.154V1.77ZM4.808 12.77H5.808V3.77H4.808V12.77ZM8.192 12.77H9.192V3.77H8.192V12.77Z"
                          fill="#E33629"
                        />
                      </svg>
                      Delete Product
                    </button>
                  </div>
                </div>
              </div>

              <button className=" bg-[#16A34A] text-white text-[12px] font-bold py-2 rounded-xl transition-colors mt-4">
                See All
              </button>
            </div>
          </div>
        </div>

        {/* On mobile devices, this layout is process ed at the top stack */}
        <div className="w-full space-y-6 mb-6 lg:mb-0 ">
          {/* Custom Total Balance Card Wrapper */}
          <div className="w-full bg-[#16A34A] p-5 rounded-3xl shadow-[0px_8px_24px_rgba(22,163,74,0.15)] relative overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
            {/* Diagonal Brand Logo Watermark Overlay */}
            <div className="absolute inset-0 opacity-10 select-none pointer-events-none flex items-center justify-center transform -rotate-12 scale-125">
              <div className="text-center text-white">
                <span className="text-4xl font-black tracking-tighter block">
                  AkuMart
                </span>
                <span className="text-[9px] font-bold tracking-widest uppercase block mt-1">
                  Waste Today. Resource Tomorrow.
                </span>
              </div>
            </div>

            {/* 
    --- FIGMA GLASS MORPHIC LAYER --- 
    
  */}
            <div className="relative z-10 w-full bg-white/10 backdrop-blur-[3.34px] border border-white/20 rounded-xl p-4 md:p-5 shadow-[7.91px_7.91px_19.46px_rgba(0,0,0,0.05)]">
              {/* Dynamic Label Text Content */}
              <span className="text-[11px] font-semibold text-emerald-100 tracking-wide block opacity-90">
                Total payout balance
              </span>

              {/* Balance Figure Entry */}
              <h3 className="text-xl md:text-2xl font-extrabold text-white tracking-tight mt-1">
                NGN 2,000,000
              </h3>

              {/* Footer Meta Details Row */}
              <div className="mt-6 flex items-center justify-between">
                {/* Mini Brand Identification Marker */}
                <div className="flex items-center gap-1.5">
                  <p className="text-[11px] font-bold text-white tracking-tight">
                    <img src={Logo} alt="" />
                  </p>
                </div>

                {/* Mini Active Status Capsule */}
                <span className="text-[9px] font-bold text-emerald-50 bg-white/15 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Active Account
                </span>
              </div>
            </div>
          </div>
          {/* Transaction History Log Component */}
          <div className="bg-white border border-[#E9ECEF] p-5 rounded-2xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-md md:text-lg font-bold text-[#111827]">
                Transaction History
              </h3>
              <div className="flex gap-1">
                <button className="text-[10px] font-bold border border-[#E9ECEF] px-2 py-1 rounded-lg bg-[#F6F8FA] text-[#495057]">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_367_1049)">
                      <path
                        d="M4.99982 10C4.99978 10.0929 5.02562 10.184 5.07446 10.2631C5.1233 10.3421 5.1932 10.406 5.27632 10.4475L6.27632 10.9475C6.35257 10.9856 6.43729 11.0036 6.52244 10.9997C6.60759 10.9959 6.69034 10.9703 6.76284 10.9255C6.83533 10.8806 6.89515 10.818 6.93663 10.7435C6.97811 10.6691 6.99986 10.5852 6.99982 10.5V7C6.99993 6.75219 7.09205 6.51325 7.25832 6.3295L10.8698 2.335C10.9345 2.26328 10.9771 2.17434 10.9924 2.07894C11.0076 1.98354 10.9949 1.88577 10.9558 1.79744C10.9166 1.70911 10.8527 1.63401 10.7718 1.58123C10.6909 1.52844 10.5964 1.50023 10.4998 1.5H1.49982C1.40312 1.50003 1.30851 1.52811 1.22744 1.58082C1.14638 1.63353 1.08233 1.70861 1.04307 1.79698C1.00381 1.88535 0.991013 1.9832 1.00623 2.0787C1.02145 2.17419 1.06403 2.26322 1.12882 2.335L4.74132 6.3295C4.90759 6.51325 4.99971 6.75219 4.99982 7V10Z"
                        stroke="#818181"
                        stroke-width="1.33333"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_367_1049">
                        <rect width="12" height="12" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  This month
                </button>
                <button className="text-[10px] font-bold border border-[#E9ECEF] px-2 py-1 rounded-lg bg-[#F6F8FA] text-[#495057]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M7.33366 10.667V5.23366L5.60033 6.96699L4.66699 6.00033L8.00033 2.66699L11.3337 6.00033L10.4003 6.96699L8.66699 5.23366V10.667H7.33366ZM4.00033 13.3337C3.63366 13.3337 3.31988 13.2032 3.05899 12.9423C2.7981 12.6814 2.66744 12.3674 2.66699 12.0003V10.0003H4.00033V12.0003H12.0003V10.0003H13.3337V12.0003C13.3337 12.367 13.2032 12.681 12.9423 12.9423C12.6814 13.2037 12.3674 13.3341 12.0003 13.3337H4.00033Z"
                      fill="#818181"
                    />
                  </svg>{" "}
                  Download
                </button>
              </div>
            </div>

            {/* List Stream mapping */}
            <div className="space-y-3">
              {TRANSACTIONS.map((tx, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center border border-[#DBDBDB] p-2   rounded-2xl"
                >
                  <div className="flex gap-2.5 items-center">
                    <div className="w-10 h-10 rounded-lg bg-[#F6F8FA] flex items-center justify-center text-xs shrink-0">
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="40" height="40" rx="12" fill="#F6F8F7" />
                        <path
                          d="M27.3077 9H12.6923C11.2054 9 10 10.8021 10 13.025V27.975C10 30.1979 11.2054 32 12.6923 32H27.3077C28.7946 32 30 30.1979 30 27.975V13.025C30 10.8021 28.7946 9 27.3077 9Z"
                          stroke="#16A34A"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M10 17H30M13.8462 22.0625H16.1538V23H13.8462V22.0625Z"
                          stroke="#16A34A"
                          stroke-width="1.875"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-[#111827]">
                        {tx.bank}
                      </h4>
                      <p className="text-[12px] font-medium text-[#A8B2BA] font-mono mt-0.5">
                        Transaction ID:{" "}
                      </p>
                      <p className="text-[12px] font-medium text-[#A8B2BA] font-mono ">
                        {tx.id}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-[#111827] block">
                      {tx.amount}
                    </span>
                    <span className="text-[10px] font-medium text-[#A8B2BA] block mt-0.5">
                      {tx.date} • {tx.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
