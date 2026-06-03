import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthSideImg from "../assets/imgs/image.png";
import Logo from "../assets/imgs/logo.png";

type UserRole = "Buyer" | "Seller";
type AuthStep = 1 | 2 | 3; // 1: Role Selection, 2: Core Form, 3: Account Setup

export const Register: React.FC = () => {
  const navigate = useNavigate();

  // Step & Data Management States
  const [step, setStep] = useState<AuthStep>(1);
  const [role, setRole] = useState<UserRole>("Buyer");

  // Form Input States
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    state: "",
    city: "",
    businessType: "",
    productionDescription: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep((prev) => (prev + 1) as AuthStep);
    } else {
      console.log("Submitting all data to backend:", { role, ...formData });

      // Determine dashboard path using user type selection
      if (role === "Buyer") {
        navigate("/buyer-dashboard");
      } else {
        navigate("/seller-dashboard");
      }
    }
  };

  const handlePrevStep = () => {
    if (step > 1) setStep((prev) => (prev - 1) as AuthStep);
  };

  return (
    <div className="w-full h-screen bg-[#F8FAFC] flex font-sans overflow-hidden">
      {step !== 3 && (
        <div className="hidden lg:flex lg:w-1/2 relative bg-emerald-950 items-center justify-center overflow-hidden">
          <img
            src={AuthSideImg}
            alt="Sustainability illustration"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div
        className={`w-full ${step === 3 ? "w-full px-4 md:px-16" : "lg:w-1/2 px-6 sm:px-12 md:px-20"} py-12 flex flex-col justify-center bg-white relative`}
      >
        {/* Back Arrow button for Steps 2 and 3 */}
        {step > 1 && (
          <button
            onClick={handlePrevStep}
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
            </svg>{" "}
            Back
          </button>
        )}

        <div
          className={`mx-auto w-full ${step === 3 ? "max-w-5xl" : "max-w-md"} flex flex-col items-center`}
        >
          {/* Brand Logo Header */}
          <img
            src={Logo}
            alt="Enactus Logo"
            className="h-12 object-contain mb-6"
          />

          <form onSubmit={handleNextStep} className="w-full">
            {step === 1 && (
              <div className="text-center w-full">
                <h2 className="text-[#0F172A] text-2xl md:text-3xl font-bold mb-2">
                  Create Your Free Account
                </h2>
                <p className="text-gray-500 text-sm mb-8">
                  Connect, trade, and recycle smarter.
                </p>

                <div className="mb-6 text-left">
                  <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
                    User Type
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    className="w-full border border-gray-200 rounded-xl p-3.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Buyer">Buyer</option>
                    <option value="Seller">Seller</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#16A34A] hover:bg-[#15803D] text-white font-medium py-3.5 px-4 rounded-xl transition-colors"
                >
                  Continue
                </button>

                <p className="text-sm text-gray-500 mt-6">
                  Already have an account?{" "}
                  <span
                    className="text-[#16A34A] cursor-pointer font-medium"
                    onClick={() => navigate("/signin")}
                  >
                    Login
                  </span>
                </p>
              </div>
            )}

            {/* STEP 2*/}
            {step === 2 && (
              <div className="w-full">
                <div className="text-center mb-5">
                  <h2 className="text-[#0F172A] text-2xl md:text-3xl font-bold mb-1">
                    Create Your <span className="text-[#16A34A]">{role}</span>{" "}
                    Account
                  </h2>
                  <p className="text-gray-400 text-xs">
                    Source quality waste materials for your production needs
                  </p>
                </div>

                {/* Google Sign Up Button */}
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
                  <div className="grow border-t border-gray-100"></div>
                  <span className="px-3 text-xs text-gray-400 font-medium">
                    OR
                  </span>
                  <div className="grow border-t border-gray-100"></div>
                </div>

                {/* Tab Switcher Bar */}
                <div className="w-full bg-[#F8FAFC] p-1 rounded-lg flex mb-6">
                  <button
                    type="button"
                    onClick={() => navigate("/signin")}
                    className="w-1/2 py-2 text-xs font-medium text-emerald-600 hover:bg-[#16A34] rounded-full transition-all"
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    className="w-1/2 py-2 text-xs font-semibold text-white bg-[#16A34A] hover:bg-[#15803D] rounded-full shadow-sm transition-all"
                  >
                    Sign Up
                  </button>
                </div>

                {/* Inputs with Explicit Text Labels above them */}
                <div className="space-y-4 mb-6 text-left">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Full name / Businesss Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Enter your full name"
                      required
                      onChange={handleInputChange}
                      className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-1 focus:ring-emerald-500 outline-none placeholder:text-gray-300"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      required
                      onChange={handleInputChange}
                      className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-1 focus:ring-emerald-500 outline-none placeholder:text-gray-300"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Phone number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Enter phone number"
                      required
                      onChange={handleInputChange}
                      className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-1 focus:ring-emerald-500 outline-none placeholder:text-gray-300"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        required
                        onChange={handleInputChange}
                        className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-1 focus:ring-emerald-500 outline-none placeholder:text-gray-300 pr-10"
                      />
                      {/* Optional: Add password eye icon container here if needed */}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm password"
                        required
                        onChange={handleInputChange}
                        className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-1 focus:ring-emerald-500 outline-none placeholder:text-gray-300 pr-10"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#16A34A] hover:bg-[#15803D] text-white font-medium py-3 px-4 rounded-lg transition-colors text-sm"
                >
                  Continue
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="w-full">
                <div className="text-center lg:text-left mb-8">
                  <h2 className="text-[#0F172A] text-2xl font-bold">
                    Set Up Your <span className="text-[#84CC16]">Account</span>
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">
                    Complete your business information and business type to
                    connect with trusted partners.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        placeholder="Enter your company name"
                        onChange={handleInputChange}
                        className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">
                          State
                        </label>
                        <input
                          type="text"
                          name="state"
                          placeholder="Enter state"
                          onChange={handleInputChange}
                          className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          placeholder="Enter city"
                          onChange={handleInputChange}
                          className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Business Type
                      </label>
                      <select
                        name="businessType"
                        onChange={handleInputChange}
                        className="w-full border border-gray-200 rounded-xl p-3 text-sm bg-white outline-none"
                      >
                        <option>Select business type</option>
                        <option value="Recycler">Recycler</option>
                        <option value="Manufacturer">Manufacturer</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Production Description
                      </label>
                      <textarea
                        name="productionDescription"
                        placeholder="Describe what you will use the waste material to do..."
                        rows={4}
                        onChange={handleInputChange}
                        className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#16A34A] hover:bg-[#15803D] text-white font-medium py-3 px-4 rounded-xl transition-colors mt-auto"
                    >
                      Sign In
                    </button>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
