import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import AuthSideImg from "../assets/imgs/image.png";
import Logo from "../assets/imgs/logo.png";
import { loginUser } from "../api/auth.api";
import { useAuthStore } from "../store";


// Zod validation schema
const signInSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignInFormData = z.infer<typeof signInSchema>;

export const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (formData: SignInFormData) => {
  try {
    const response = await loginUser(formData);

    // Save user and both tokens to Zustand
    setUser(
      response.user,
      response.access_token,
      response.refresh_token
    );

    toast.success(
      `Welcome back, ${response.user.first_name}!`
    );

    // Redirect based on role
    if (response.user.role === "seller") {
      navigate("/seller/dashboard");
    } else if (response.user.role === "buyer") {
      navigate("/buyer/dashboard");
    } else {
      navigate("/");
    }
  } catch (error: unknown) {
    
    const axiosError = error as { response?: { data?: { message?: string } } };
    
    const message =
      axiosError?.response?.data?.message || 
      (error instanceof Error ? error.message : "Invalid email or password");
      
    toast.error(message);
  }
};

  return (
    <div className="w-full h-screen bg-[#F8FAFC] flex font-sans overflow-hidden">
      {/* Left Banner */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-emerald-950 items-center justify-center overflow-hidden">
        <img
          src={AuthSideImg}
          alt="Sustainability layout illustration"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Form */}
      <div className="w-full lg:w-1/2 px-6 sm:px-12 md:px-20 py-12 flex flex-col justify-center bg-white relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-10 left-6 sm:left-12 text-gray-500 hover:text-gray-800 flex items-center gap-1 text-sm font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9.57 5.92993L3.5 11.9999L9.57 18.0699" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20.4999 12H3.66992" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="mx-auto w-full max-w-md flex flex-col items-center">
          <img src={Logo} alt="AkuMart Logo" className="h-12 object-contain mb-6" />

          <h2 className="text-[#0F172A] text-2xl md:text-3xl font-bold mb-1 text-center">
            Sign In To Your <span className="text-[#16A34A]">Buyer</span> Account
          </h2>
          <p className="text-gray-400 text-xs mb-5 text-center">
            Source quality waste materials for your production needs
          </p>

          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            {/* Tab Switcher */}
            <div className="w-full bg-[#F8FAFC] p-1 rounded-lg flex mb-6">
              <button type="button" className="w-1/2 py-2 text-xs font-semibold text-emerald-600 bg-white rounded-md shadow-sm">
                Sign In
              </button>
              <button type="button" onClick={() => navigate("/register")} className="w-1/2 py-2 text-xs font-medium text-gray-500 rounded-md">
                Sign Up
              </button>
            </div>

            <div className="space-y-4 mb-4 text-left">
              {/* Email */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Email Address
                </label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-200 rounded-lg p-3 text-sm outline-none focus:ring-1 focus:ring-emerald-500 placeholder:text-gray-300"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full border border-gray-200 rounded-lg p-3 text-sm outline-none focus:ring-1 focus:ring-emerald-500 placeholder:text-gray-300 pr-10"
                  />
                  {/* Toggle password visibility */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 4.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                )}
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-xs mb-6">
              <label className="flex items-center gap-2 text-gray-500 cursor-pointer select-none">
                <input type="checkbox" className="w-3.5 h-3.5 rounded border-gray-300 accent-emerald-600" />
                Remember Me
              </label>
              <span onClick={() => navigate("/forgot-password")} className="text-black font-semibold cursor-pointer hover:underline">
                Forgot Password?
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#16A34A] hover:bg-[#15803D] disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors text-sm"
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};