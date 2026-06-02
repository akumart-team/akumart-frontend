import { Link } from "react-router-dom";
import Logo from "../../assets/imgs/logo.png";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Home: [
      { label: "Features", to: "/#features" },
      { label: "Waste Categories", to: "/#categories" },
      { label: "Pricing", to: "/#pricing" },
    ],
    Company: [
      { label: "About Us", to: "/about" },
      { label: "Contact", to: "/contact" },
    ],
    Legal: [
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms of Service", to: "/terms" },
      { label: "Cookie Policy", to: "/cookies" },
    ],
  };

  return (
    <footer className="bg-white border-t border-gray-100">
   
      

      {/* Links Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src={Logo} alt="logo" />
            </Link>
          
          </div>

          {/* Nav Groups */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4
                className="text-gray-900 font-semibold text-sm md:text-lg  mb-4"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {group}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-gray-500 hover:text-[#1a472a] text-sm md:text-md transition-colors duration-200 flex items-center gap-1.5"
                    >
                      <span className="w-1 h-1 rounded-full bg-gray-300 shrink-0" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6  border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-gray-400 text-xs">
              (c) {currentYear} Agripluck. All Rights Reserved
          </p>
        
        </div>
      </div>
    </footer>
  );
};

