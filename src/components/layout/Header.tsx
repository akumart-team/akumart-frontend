import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/imgs/logo.png";


export const Header = () => {
  const [, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    return () => {
      setIsMenuOpen(false);
    };
  }, [location]);

 

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300  ${
        isScrolled
          ? "bg-white shadow-md py-3"
          : "bg-white/95 backdrop-blur-sm py-4"
      }`}
    >
      <div className="w-full mx-auto px-6  md:px-16  ">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0 w-30 md:w-50 ">
          <img src={Logo} alt="logo" />
          </Link>

          {/* Desktop Nav */}
         

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/signin"
              className="flex w-45 h-14.25 p-2.5 justify-center items-center gap-2.5 rounded-xl border border-[#DBDBDB]"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="flex w-45 h-14.25 p-2.5 justify-center items-center gap-2.5 rounded-xl border border-[#DBDBDB] text-sm font-semibold text-white bg-[#16A34A] hover:bg-[#16a34a]  transition-colors duration-200 shadow-sm"
            >
              Sign Up
            </Link>
          </div>

       
        </div>
      </div>

   
    </header>
  );
};
