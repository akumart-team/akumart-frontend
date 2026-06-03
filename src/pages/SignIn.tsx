import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthSideImg from "../assets/imgs/image.png"; 
import Logo from "../assets/imgs/logo.png";

export const SignIn: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen bg-[#F8FAFC] flex font-sans overflow-hidden">
      
      <div className="hidden lg:flex lg:w-1/2 relative bg-emerald-950 items-center justify-center">
        <img src={AuthSideImg} alt="Sustainability layout illustration" className="w-full h-full object-cover" />
      </div>

      {/* Right Input Card Container */}
      <div className="w-full lg:w-1/2 px-6 sm:px-12 md:px-20 py-12 flex flex-col justify-center bg-white">
        <div className="mx-auto w-full max-w-md flex flex-col items-center">
          <img src={Logo} alt="Enactus Logo" className="h-12 object-contain mb-8" />
          
          <h2 className="text-[#0F172A] text-2xl md:text-3xl font-bold mb-2 text-center">Welcome Back</h2>
          <p className="text-gray-500 text-sm mb-8 text-center">Enter your details to sign in to your dashboard account</p>

          <form className="w-full space-y-4">
            <input type="email" placeholder="Email Address" required className="w-full border border-gray-200 rounded-xl p-3.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500" />
            <input type="password" placeholder="Password" required className="w-full border border-gray-200 rounded-xl p-3.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500" />
            
            <button type="submit" className="w-full bg-[#16A34A] hover:bg-[#15803D] text-white font-medium py-3.5 px-4 rounded-xl transition-colors mt-2">
              Sign In
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-6 text-center">
            Don't have an account yet? <span className="text-[#16A34A] cursor-pointer font-medium" onClick={() => navigate('/register')}>Sign Up</span>
          </p>
        </div>
      </div>
    </div>
  );
};

