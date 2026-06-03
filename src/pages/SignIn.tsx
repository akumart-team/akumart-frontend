import React from "react";
import { useNavigate } from "react-router-dom";
import AuthSideImg from "../assets/imgs/image.png";
import Logo from "../assets/imgs/logo.png";

export const SignIn: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen bg-[#F8FAFC] flex font-sans overflow-hidden">
      {/* Left Banner Image */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-emerald-950 items-center justify-center overflow-hidden">
        <img
          src={AuthSideImg}
          alt="Sustainability layout illustration"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Input Card Container */}
      <div className="w-full lg:w-1/2 px-6 sm:px-12 md:px-20 py-12 flex flex-col justify-center bg-white relative">
        {/* Back Arrow button from Figma */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-10 left-6 sm:left-12 text-gray-500 hover:text-gray-800 flex items-center gap-1 text-sm font-medium"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M9.57 5.92993L3.5 11.9999L9.57 18.0699"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M20.4999 12H3.66992"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>

        <div className="mx-auto w-full max-w-md flex flex-col items-center">
          {/* Brand Logo Header */}
          <img
            src={Logo}
            alt="Enactus Logo"
            className="h-12 object-contain mb-6"
          />

          {/* Main Headings */}
          <h2 className="text-[#0F172A] text-2xl md:text-3xl font-bold mb-1 text-center">
            Sign In To Your <span className="text-[#16A34A]">Buyer</span>{" "}
            Account
          </h2>
          <p className="text-gray-400 text-xs mb-5 text-center">
            Source quality waste materials for your production needs
          </p>

          <form className="w-full">
            {/* Google Sign In Button */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors mb-4"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5.04c1.64 0 3.12.56 4.28 1.67l3.2-3.2C17.52 1.58 14.96 1 12 1 7.35 1 3.42 3.67 1.52 7.56l3.77 2.93c.9-2.7 3.4-4.45 6.71-4.45z"
                />
                <path
                  fill="#4285F4"
                  d="M23.49 12.27c0-.81-.07-1.59-.2-2.35H12v4.46h6.44c-.28 1.47-1.11 2.71-2.36 3.55l3.67 2.84c2.15-1.98 3.74-4.9 3.74-8.5z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.29 14.51c-.23-.69-.36-1.43-.36-2.2s.13-1.51.36-2.2L1.52 7.18C.55 9.12 0 11.3 0 13.62s.55 4.5 1.52 6.44l3.77-2.93z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.67-2.84c-1.02.68-2.33 1.09-4.29 1.09-3.31 0-5.81-1.75-6.71-4.45L1.52 16.82C3.42 20.71 7.35 23 12 23z"
                />
              </svg>
              Sign with Google
            </button>

            {/* OR Divider */}
            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-100"></div>
              <span className="px-3 text-xs text-gray-300 font-medium">OR</span>
              <div className="flex-grow border-t border-gray-100"></div>
            </div>

            {/* Tab Switcher Bar - Sign In Active */}
            <div className="w-full bg-[#F8FAFC] p-1 rounded-lg flex mb-6">
              <button
                type="button"
                className="w-1/2 py-2 text-xs font-semibold text-emerald-600 bg-white rounded-md shadow-sm transition-all"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="w-1/2 py-2 text-xs font-medium text-gray-500 rounded-md transition-all"
              >
                Sign Up
              </button>
            </div>

            {/* Form Fields with Text Labels */}
            <div className="space-y-4 mb-4 text-left">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="w-full border border-gray-200 rounded-lg p-3 text-sm outline-none focus:ring-1 focus:ring-emerald-500 placeholder:text-gray-300"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Enter your password"
                    required
                    className="w-full border border-gray-200 rounded-lg p-3 text-sm outline-none focus:ring-1 focus:ring-emerald-500 placeholder:text-gray-300 pr-10"
                  />
                  {/* Password eye icon container from Figma layout */}
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center opacity-30 pointer-events-none">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>

            {/* Remember Me & Forgot Password Row */}
            <div className="flex items-center justify-between text-xs mb-6">
              <label className="flex items-center gap-2 text-gray-500 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="w-3.5 h-3.5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 accent-emerald-600"
                />
                Remember Me
              </label>
              <span
                onClick={() => navigate("/forgot-password")}
                className="text-black font-semibold cursor-pointer hover:underline"
              >
                Forgot Password?
              </span>
            </div>

            {/* Action Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#16A34A] hover:bg-[#15803D] text-white font-medium py-3 px-4 rounded-lg transition-colors text-sm"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
