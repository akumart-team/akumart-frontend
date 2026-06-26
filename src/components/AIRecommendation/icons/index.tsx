// SVG Icons
export const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

export const FilterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

export const BookmarkIcon = ({ filled }: { filled: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "#16A34A" : "none"} stroke={filled ? "#16A34A" : "#9CA3AF"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
  </svg>
);

export const StarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="1">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export const LocationIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const WeightIcon = () => (
<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.4583 22.6354C11.775 22.8182 12.1343 22.9145 12.5 22.9145C12.8657 22.9145 13.225 22.8182 13.5417 22.6354L20.8333 18.4687C21.1497 18.2861 21.4125 18.0234 21.5954 17.7071C21.7782 17.3908 21.8746 17.032 21.875 16.6666V8.33331C21.8746 7.96797 21.7782 7.60916 21.5954 7.29286C21.4125 6.97656 21.1497 6.7139 20.8333 6.53123L13.5417 2.36456C13.225 2.18171 12.8657 2.08545 12.5 2.08545C12.1343 2.08545 11.775 2.18171 11.4583 2.36456L4.16667 6.53123C3.85027 6.7139 3.58748 6.97656 3.40465 7.29286C3.22182 7.60916 3.12537 7.96797 3.125 8.33331V16.6666C3.12537 17.032 3.22182 17.3908 3.40465 17.7071C3.58748 18.0234 3.85027 18.2861 4.16667 18.4687L11.4583 22.6354Z" stroke="#818181" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.5 22.9167V12.5" stroke="#818181" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.42773 7.2915L12.5007 12.4998L21.5736 7.2915" stroke="#818181" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.8125 4.44775L17.1875 9.81234" stroke="#818181" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

);

export const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const BackIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m15 18-6-6 6-6" />
  </svg>
);

export const CartIcon =() => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M17 18C17.5304 18 18.0391 18.2107 18.4142 18.5858C18.7893 18.9609 19 19.4696 19 20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22C16.4696 22 15.9609 21.7893 15.5858 21.4142C15.2107 21.0391 15 20.5304 15 20C15 18.89 15.89 18 17 18ZM1 2H4.27L5.21 4H20C20.2652 4 20.5196 4.10536 20.7071 4.29289C20.8946 4.48043 21 4.73478 21 5C21 5.17 20.95 5.34 20.88 5.5L17.3 11.97C16.96 12.58 16.3 13 15.55 13H8.1L7.2 14.63L7.17 14.75C7.17 14.8163 7.19634 14.8799 7.24322 14.9268C7.29011 14.9737 7.3537 15 7.42 15H19V17H7C6.46957 17 5.96086 16.7893 5.58579 16.4142C5.21071 16.0391 5 15.5304 5 15C5 14.65 5.09 14.32 5.24 14.04L6.6 11.59L3 4H1V2ZM7 18C7.53043 18 8.03914 18.2107 8.41421 18.5858C8.78929 18.9609 9 19.4696 9 20C9 20.5304 8.78929 21.0391 8.41421 21.4142C8.03914 21.7893 7.53043 22 7 22C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20C5 18.89 5.89 18 7 18ZM16 11L18.78 6H6.14L8.5 11H16Z" fill="#F6F8F7"/>
</svg>
)

export const VerifiedIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="#A3E635" stroke-width="1.5"/>
<path d="M8 12.75C8 12.75 9.6 13.6625 10.4 15C10.4 15 12.8 9.75 16 8" stroke="#A3E635" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

)

export const MinusIcon = () => (
 <svg xmlns="http://www.w3.org/2000/svg" width="12" height="3" viewBox="0 0 12 3" fill="none">
  <path d="M12 3H0V0H12V3Z" fill="#818181"/>
</svg>
)


export const PlusIcon = () => (
    <svg width="30" height="45" viewBox="0 0 30 45" fill="none" xmlns="http://www.w3.org/2000/svg">
<g opacity="0.6">
<rect x="0.5" y="0.5" width="29" height="44" rx="5.5" stroke="#DBDBDB"/>
<path d="M21 23.5714H15.8571V30H14.1429V23.5714H9V21.4286H14.1429V15H15.8571V21.4286H21V23.5714Z" fill="#818181"/>
</g>
</svg>

)

export const AIIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
  <path d="M16.5997 15.2284L18.0764 10.0634C18.6297 8.13005 21.3697 8.13005 21.923 10.0634L23.398 15.2284C23.4914 15.5551 23.6665 15.8527 23.9068 16.0929C24.1471 16.3332 24.4447 16.5083 24.7714 16.6017L29.9364 18.0767C31.8697 18.63 31.8697 21.37 29.9364 21.9234L24.7714 23.3984C24.4447 23.4918 24.1471 23.6669 23.9068 23.9072C23.6665 24.1474 23.4914 24.445 23.398 24.7717L21.923 29.9367C21.3697 31.87 18.6297 31.87 18.0764 29.9367L16.6014 24.7717C16.508 24.445 16.3329 24.1474 16.0926 23.9072C15.8523 23.6669 15.5548 23.4918 15.228 23.3984L10.063 21.9234C8.12971 21.37 8.12971 18.63 10.063 18.0767L15.228 16.6017C15.5548 16.5083 15.8523 16.3332 16.0926 16.0929C16.3329 15.8527 16.508 15.5551 16.6014 15.2284M30.173 27.5117C30.6547 26.1067 32.6797 26.105 33.1597 27.5117L33.203 27.6567L33.6964 29.6367L35.6764 30.1317C37.2764 30.5317 37.2764 32.8017 35.6764 33.2017L33.6964 33.6967L33.203 35.6767C32.803 37.275 30.5314 37.275 30.1314 35.6767L29.6364 33.6967L27.6564 33.2017C26.0564 32.8017 26.0564 30.5301 27.6564 30.1317L29.6364 29.6367L30.1314 27.6567L30.173 27.5117ZM31.6664 31.3284C31.5705 31.4568 31.4565 31.5708 31.328 31.6667C31.4565 31.7626 31.5705 31.8766 31.6664 32.005C31.7623 31.8766 31.8762 31.7626 32.0047 31.6667C31.8761 31.5703 31.7622 31.4558 31.6664 31.3267M6.83971 4.17672C7.33638 2.72505 9.48138 2.77338 9.86971 4.32171L10.363 6.30171L12.343 6.79672C13.943 7.19671 13.943 9.46671 12.343 9.86671L10.363 10.3617L9.86971 12.3417C9.46971 13.94 7.19805 13.94 6.79805 12.3417L6.30305 10.3617L4.32305 9.86671C2.72305 9.46671 2.72305 7.19505 4.32305 6.79672L6.30305 6.30171L6.79805 4.32171L6.83971 4.17672ZM8.33305 7.99505C8.23701 8.12292 8.12306 8.23631 7.99471 8.33172C8.12329 8.42814 8.23725 8.54266 8.33305 8.67172C8.42884 8.54266 8.5428 8.42814 8.67138 8.33172C8.54292 8.2358 8.42896 8.12351 8.33305 7.99505Z" fill="white"/>
</svg>
)
