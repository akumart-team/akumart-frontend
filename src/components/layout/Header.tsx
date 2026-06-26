import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/imgs/logo.png";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  // useEffect(() => {
  //   setIsMenuOpen(false);
  // }, [location]);

  // Helper function for smooth jumping to landing page IDs
  const handleScrollToSection = (sectionId) => {
    setIsMenuOpen(false);
    if (location.pathname !== "/") {
      window.location.href = `/#${sectionId}`;
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex items-center ${
        isScrolled
          ? "bg-white shadow-md h-16 md:h-20"
          : "bg-white h-20 md:h-24 "
      }`}
    >
      <div className="w-full mx-auto px-10 md:px-16  ">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0 w-32 md:w-40">
            <img src={Logo} alt="logo" className="w-full h-auto object-contain" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-[#475569] font-medium text-md">
            <Link
              to="/"
              className="bg-[#F1F5F9] text-[#0F172A] px-5 py-2 rounded-full transition-colors duration-200"
            >
              Home
            </Link>
            <button
              onClick={() => handleScrollToSection("problem")}
              className="hover:text-[#16A34A] transition-colors duration-200 cursor-pointer"
            >
              About
            </button>
            <a
              href="#"
              className="hover:text-[#16A34A] transition-colors duration-200"
            >
              Contact Us
            </a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/signin"
              className="flex w-28 h-11 justify-center items-center rounded-xl border border-[#DBDBDB] text-sm font-medium text-[#1E293B] hover:bg-gray-50 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="flex w-28 h-11 justify-center items-center rounded-xl text-sm font-semibold text-white bg-[#16A34A] hover:bg-[#15803D] transition-colors duration-200 shadow-sm"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button (Hamburger) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex md:hidden p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
            aria-label="Toggle Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      <div
        className={`absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-lg p-6 flex flex-col gap-6 md:hidden transition-all duration-300 origin-top ${
          isMenuOpen ? "opacity-100 scale-y-100 visible" : "opacity-0 scale-y-95 invisible pointer-events-none"
        }`}
      >
        <nav className="flex flex-col gap-4 text-gray-600 font-medium text-base">
          <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className="text-[#16A34A] py-1"
          >
            Home
          </Link>
          <button
            onClick={() => handleScrollToSection("problem")}
            className="text-left py-1 hover:text-[#16A34A]"
          >
            About
            </button>
          <a
            href="#"
            onClick={() => setIsMenuOpen(false)}
            className="py-1 hover:text-[#16A34A]"
          >
            Contact Us
          </a>
        </nav>
        
        <hr className="border-gray-100" />
        
        <div className="flex flex-col gap-3">
          <Link
            to="/signin"
            className="flex w-full h-12 justify-center items-center rounded-xl border border-[#DBDBDB] text-sm font-medium text-[#1E293B]"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="flex w-full h-12 justify-center items-center rounded-xl text-sm font-semibold text-white bg-[#16A34A]"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};