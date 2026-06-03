import React, { useState } from "react";
import { useNavigate } from "react-router";

import AuthSideImg from "../assets/imgs/image.png";
import Logo from "../assets/imgs/logo.png";

// define our step types
type RecoveryStep = 1 | 2 | 3;

export const ForgetPassword: React.FC = () => {
  const navigate = useNavigate();
  // Steps: 1 = Request, 2 = OTP, 3 = Reset Password
  const [step, setStep] = useState<RecoveryStep>(1);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [passwordData, setPasswordData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleBack = (): void => {
    if (step === 3) {
      setStep(2);
    } else if (step === 2) {
      setStep(1);
    } else {
      // Navigate back to sign in page
    }
  };

  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setStep(2);
  };

  const handleOtpSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setStep(3);
  };

  const handleResetSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setShowSuccessModal(true);
  };

  return (
    <div className="w-full h-screen bg-[#F8FAFC] flex font-sans overflow-hidden relative">
      {/* Left Side Banner Image */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-emerald-950 items-center justify-center overflow-hidden">
        <img
          src={AuthSideImg}
          alt="Sustainability layout illustration"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Side Card Container */}
      <div className="w-full lg:w-1/2 px-6 sm:px-12 md:px-20 py-12 flex flex-col justify-center bg-white relative">
        <button
          onClick={handleBack}
          type="button"
          className="absolute top-10 left-6 sm:left-12 text-gray-400 hover:text-gray-700 text-lg transition-colors"
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

        <div className="mx-auto w-full max-w-sm flex flex-col items-center">
          {/* Brand Logo */}
          <img
            src={Logo}
            alt="Enactus Logo"
            className="h-10 object-contain mb-10"
          />

          {/* STATE 1: Forgot Password Input Form */}
          {step === 1 && (
            <form onSubmit={handleEmailSubmit} className="w-full text-center">
              <h2 className="text-[#0F172A] text-xl md:text-2xl  font-bold mb-1">
                Forgot Password
              </h2>
              <p className="text-gray-400 text-[11px] md:text-base mb-6">
                No worries, we'll send you reset instructions.
              </p>

              <div className="text-left mb-5">
                <label className="block text-[11px] md:text-base   font-medium text-gray-400 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  className="w-full border border-gray-200 rounded-lg p-2.5 text-s outline-none focus:ring-1 focus:ring-emerald-500 placeholder:text-gray-200"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#16A34A] hover:bg-[#15803D] text-white font-medium py-2.5 px-4 rounded-lg transition-colors text-xs"
              >
                Continue
              </button>
            </form>
          )}

          {/* STATE 2: OTP Verification Display */}
          {step === 2 && (
            <form onSubmit={handleOtpSubmit} className="w-full text-center">
              <h2 className="text-[#0F172A] text-2xl  font-bold mb-1">
                Enter OTP Code
              </h2>
              <p className="text-gray-400 text-[11px] md:text-base  mb-6">
                Please enter the OTP code sent to{" "}
                <span className="text-emerald-500 font-medium">
                  {email || "your email"}
                </span>
              </p>

              {/* 4-Digit OTP Box Grid */}
              <div className="flex justify-center gap-3 mb-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const val = e.target.value;
                      const newOtp = [...otp];
                      newOtp[index] = val;
                      setOtp(newOtp);

                      // Explicitly typing element transition to avoid 'any'
                      if (val && e.target.nextElementSibling) {
                        (
                          e.target.nextElementSibling as HTMLInputElement
                        ).focus();
                      }
                    }}
                    className="w-10 h-10 text-center border border-gray-200 rounded-lg text-sm font-semibold outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                ))}
              </div>

              <button
                type="submit"
                className="w-full bg-[#16A34A] hover:bg-[#15803D] text-white font-medium py-2.5 px-4 rounded-lg transition-colors text-xs mb-4"
              >
                Verify Phone Number
              </button>

              <p className="text-[11px] md:text-base  text-gray-400">
                Didn't get the code?{" "}
                <span className="text-emerald-600 font-semibold cursor-pointer hover:underline">
                  Resend
                </span>{" "}
                <span className="text-gray-300">in 22s</span>
              </p>
            </form>
          )}

          {/* STATE 3: Reset Password Input Parameters */}
          {step === 3 && (
            <form onSubmit={handleResetSubmit} className="w-full text-center">
              <h2 className="text-[#0F172A] text-2xl font-bold mb-1">
                Reset Password
              </h2>
              <p className="text-gray-400 text-[11px] md:text-base  mb-6">
                Choose your new secure password
              </p>

              <div className="space-y-4 text-left mb-6">
                <div>
                  <label className="block text-[11px] md:text-base font-medium text-gray-400 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    required
                    value={passwordData.password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPasswordData({
                        ...passwordData,
                        password: e.target.value,
                      })
                    }
                    className="w-full border border-gray-200 rounded-lg p-2.5 text-s outline-none focus:ring-1 focus:ring-emerald-500 placeholder:text-gray-200"
                  />
                </div>
                <div>
                  <label className="block text-[11px] md:text-base  font-medium text-gray-400 mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm password"
                    required
                    value={passwordData.confirmPassword}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPasswordData({
                        ...passwordData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="w-full border border-gray-200 rounded-lg p-2.5 text-s outline-none focus:ring-1 focus:ring-emerald-500 placeholder:text-gray-200"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#16A34A] hover:bg-[#15803D] text-white font-medium py-2.5 px-4 rounded-lg transition-colors text-s"
              >
                Continue
              </button>
            </form>
          )}
        </div>
      </div>

      {/* STATE 4: Password Reset Successful Overlay Dialog Box */}
      {showSuccessModal && (
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px] flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-sm w-full mx-4 text-center border border-gray-50 animate-fadeIn">
            <h3 className="text-[#0F172A] text-xl font-bold mb-1">
              Password Reset Successful
            </h3>
            <p className="text-gray-400 text-[11px] md:text-base  leading-relaxed mb-6">
              Your password has been successfully reset. You can now sign in
              with your new credentials.
            </p>
            <button
              type="button"
              onClick={() => navigate("/signin")}
              className="w-full bg-[#16A34A] hover:bg-[#15803D] text-white font-medium py-2 px-4 rounded-lg transition-colors text-s"
            >
              Continue to Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
