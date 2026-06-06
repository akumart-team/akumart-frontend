import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { CheckCircle } from "lucide-react";
import AuthSideImg from "../assets/imgs/image.png";
import Logo from "../assets/imgs/logo.png";
import { registerUser } from "../api/auth.api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

type UserRole = "buyer" | "seller";
type AuthStep = 1 | 2 | 3;

const WASTE_CATEGORIES = [
  "Paper",
  "Plastic",
  "E-Waste",
  "Fabric",
  "Rubber",
  "Wood",
  "Other",
];

// ── Password must meet all criteria ──────────────────────────────────────────
const passwordSchema = z
  .string()
  .min(8, "At least 8 characters")
  .regex(/[A-Z]/, "At least one uppercase letter")
  .regex(/[a-z]/, "At least one lowercase letter")
  .regex(/\d/, "At least one number")
  .regex(/[!@#$%^&*(),.?":{}|<>]/, "At least one special character");

const step2Schema = z
  .object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    email: z.string().email("Enter a valid email address"),
    phone: z.string().min(10, "Enter a valid phone number").max(15),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const step3Schema = z.object({
  business_name: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  business_type: z.string().optional(),
  production_description: z.string().optional(),
  monthly_volume: z.string().optional(),
  logistics_preference: z.string().optional(),
});

type Step2FormData = z.infer<typeof step2Schema>;
type Step3FormData = z.infer<typeof step3Schema>;

// ── Password strength indicator ───────────────────────────────────────────────
const PasswordStrength = ({ password }: { password: string }) => {
  const checks = {
    length: password.length >= 8,
    number: /\d/.test(password),
    specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    upperCase: /[A-Z]/.test(password),
    lowerCase: /[a-z]/.test(password),
  };

  const labels: Record<keyof typeof checks, string> = {
    length: "8+ characters",
    upperCase: "Uppercase letter",
    lowerCase: "Lowercase letter",
    number: "Number",
    specialChar: "Special character",
  };

  const passed = Object.values(checks).filter(Boolean).length;
  const strengthColor =
    passed <= 2
      ? "bg-red-400"
      : passed <= 3
        ? "bg-yellow-400"
        : passed <= 4
          ? "bg-blue-400"
          : "bg-emerald-500";

  if (!password) return null;

  return (
    <div className="mt-2 space-y-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all ${
              i <= passed ? strengthColor : "bg-gray-200"
            }`}
          />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-1">
        {(Object.keys(checks) as Array<keyof typeof checks>).map((key) => (
          <div key={key} className="flex items-center gap-1">
            <span
              className={`text-xs ${checks[key] ? "text-emerald-500" : "text-gray-400"}`}
            >
              {checks[key] ? "✓" : "○"} {labels[key]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Success Modal ─────────────────────────────────────────────────────────────
const SuccessModal = ({
  onNavigate,
}: {
  role: UserRole;
  onNavigate: () => void;
}) => (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
    <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl animate-in fade-in zoom-in duration-300">
      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle size={36} className="text-emerald-500" />
      </div>
      <h3
        className="text-xl font-bold text-gray-900 mb-2"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        Setup Complete
      </h3>
      <p className="text-gray-500 text-sm mb-6">Redirecting to dashboard...</p>
      <button
        onClick={onNavigate}
        className="w-full bg-[#16A34A] hover:bg-[#15803D] text-white font-semibold py-3 rounded-xl transition-colors text-sm"
      >
        Go to Dashboard
      </button>
    </div>
  </div>
);

// ── Main Register Component ───────────────────────────────────────────────────
export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<AuthStep>(1);
  const [role, setRole] = useState<UserRole>("buyer");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [step2Data, setStep2Data] = useState<Step2FormData | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [watchedPassword, setWatchedPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const {
    register: registerStep2,
    handleSubmit: handleStep2Submit,
    formState: { errors: step2Errors },
    watch: watchStep2,
  } = useForm<Step2FormData>({
    resolver: zodResolver(step2Schema),
  });

  const { register: registerStep3, handleSubmit: handleStep3Submit } =
    useForm<Step3FormData>({
      resolver: zodResolver(step3Schema),
    });

  // Watch password for strength indicator
  const passwordValue = watchStep2("password") ?? "";

  const handlePrevStep = () => {
    if (step > 1) setStep((prev) => (prev - 1) as AuthStep);
  };

  const handleStep1Continue = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const onStep2Valid = (data: Step2FormData) => {
    setStep2Data(data);
    setStep(3);
  };

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  };

  const onStep3Valid = async (data: Step3FormData) => {
    if (!step2Data) return;
    setIsSubmitting(true);
    try {
      await registerUser({
        first_name: step2Data.first_name,
        last_name: step2Data.last_name,
        email: step2Data.email,
        phone: step2Data.phone,
        password: step2Data.password,
        role,
        ...(data.business_name && { business_name: data.business_name }),
        ...(data.business_type && { business_type: data.business_type }),
        ...(data.state && { state: data.state }),
        ...(data.city && { city: data.city }),
        ...(data.production_description && {
          production_description: data.production_description,
        }),
        ...(data.monthly_volume && { monthly_volume: [data.monthly_volume] }),
        ...(data.logistics_preference && {
          logistics_preference: [data.logistics_preference],
        }),
        ...(selectedCategories.length > 0 && {
          waste_categories: selectedCategories,
        }),
      });

      // Show success modal first
      setShowModal(true);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      const message =
        error?.response?.data?.message ||
        "Registration failed. Please try again.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalNavigate = () => {
    setShowModal(false);
    if (role === "seller") {
      navigate("/seller/dashboard");
    } else {
      navigate("/buyer/dashboard");
    }
  };

  return (
    <>
      {/* Success Modal */}
      {showModal && (
        <SuccessModal role={role} onNavigate={handleModalNavigate} />
      )}

      <div className="w-full min-h-screen bg-[#F8FAFC] flex font-sans">
        {/* Left Image — hidden on step 3 */}
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
          className={`w-full ${
            step === 3 ? "px-4 md:px-16" : "lg:w-1/2 px-6 sm:px-12 md:px-20"
          } py-12 flex flex-col justify-center bg-white relative overflow-y-auto`}
        >
          {/* Back button */}
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
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20.4999 12H3.66992"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back
            </button>
          )}

          <div
            className={`mx-auto w-full ${step === 3 ? "max-w-5xl" : "max-w-md"} flex flex-col items-center`}
          >
            <img
              src={Logo}
              alt="AkuMart Logo"
              className="h-12 object-contain mb-6"
            />

            {/* ── STEP 1 ── */}
            {step === 1 && (
              <form
                onSubmit={handleStep1Continue}
                className="w-full text-center"
              >
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
                    <option value="buyer">Buyer</option>
                    <option value="seller">Seller</option>
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
              </form>
            )}

            {/* ── STEP 2 ── */}
            {step === 2 && (
              <form
                onSubmit={handleStep2Submit(onStep2Valid)}
                className="w-full"
              >
                <div className="text-center mb-5">
                  <h2 className="text-[#0F172A] text-2xl md:text-3xl font-bold mb-1">
                    Create Your{" "}
                    <span className="text-[#16A34A] capitalize">{role}</span>{" "}
                    Account
                  </h2>
                  <p className="text-gray-400 text-xs">
                    Fill in your basic information to get started
                  </p>
                </div>
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
                  <span className="px-3 text-xs text-gray-300 font-medium">
                    OR
                  </span>
                  <div className="flex-grow border-t border-gray-100"></div>
                </div>

                <div className="w-full bg-[#F8FAFC] p-1 rounded-lg flex mb-6">
                  <button
                    type="button"
                    onClick={() => navigate("/signin")}
                    className="w-1/2 py-2 text-xs font-medium text-gray-500 rounded-md"
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    className="w-1/2 py-2 text-xs font-semibold text-white bg-[#16A34A] rounded-md shadow-sm"
                  >
                    Sign Up
                  </button>
                </div>

                <div className="space-y-4 mb-6 text-left">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">
                        First Name
                      </label>
                      <input
                        {...registerStep2("first_name")}
                        type="text"
                        placeholder="e.g. Amaka"
                        className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-1 focus:ring-emerald-500 outline-none placeholder:text-gray-300"
                      />
                      {step2Errors.first_name && (
                        <p className="text-red-500 text-xs mt-1">
                          {step2Errors.first_name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">
                        Last Name
                      </label>
                      <input
                        {...registerStep2("last_name")}
                        type="text"
                        placeholder="e.g. Okonkwo"
                        className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-1 focus:ring-emerald-500 outline-none placeholder:text-gray-300"
                      />
                      {step2Errors.last_name && (
                        <p className="text-red-500 text-xs mt-1">
                          {step2Errors.last_name.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Email Address
                    </label>
                    <input
                      {...registerStep2("email")}
                      type="email"
                      placeholder="Enter your email"
                      className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-1 focus:ring-emerald-500 outline-none placeholder:text-gray-300"
                    />
                    {step2Errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {step2Errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      {...registerStep2("phone")}
                      type="tel"
                      placeholder="e.g. 08012345678"
                      className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-1 focus:ring-emerald-500 outline-none placeholder:text-gray-300"
                    />
                    {step2Errors.phone && (
                      <p className="text-red-500 text-xs mt-1">
                        {step2Errors.phone.message}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        {...registerStep2("password")}
                        type={passwordVisible ? "text" : "password"}
                        placeholder="Minimum 8 characters"
                        onChange={(e) => setWatchedPassword(e.target.value)}
                        className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-1 focus:ring-emerald-500 outline-none placeholder:text-gray-300 pr-10"
                      />
                      <span
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                      >
                        <FontAwesomeIcon
                          icon={passwordVisible ? faEye : faEyeSlash}
                        />
                      </span>
                    </div>
                    <PasswordStrength
                      password={passwordValue || watchedPassword}
                    />
                    {step2Errors.password && (
                      <p className="text-red-500 text-xs mt-1">
                        {step2Errors.password.message}
                      </p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        {...registerStep2("confirmPassword")}
                        type={confirmPasswordVisible ? "text" : "password"}
                        placeholder="Repeat your password"
                        className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-1 focus:ring-emerald-500 outline-none placeholder:text-gray-300 pr-10"
                      />
                      <span
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
                        onClick={() =>
                          setConfirmPasswordVisible(!confirmPasswordVisible)
                        }
                      >
                        <FontAwesomeIcon
                          icon={confirmPasswordVisible ? faEye : faEyeSlash}
                        />
                      </span>
                    </div>
                    {step2Errors.confirmPassword && (
                      <p className="text-red-500 text-xs mt-1">
                        {step2Errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#16A34A] hover:bg-[#15803D] text-white font-medium py-3 px-4 rounded-lg transition-colors text-sm"
                >
                  Continue
                </button>
              </form>
            )}

            {/* ── STEP 3 ── */}
            {step === 3 && (
              <form
                onSubmit={handleStep3Submit(onStep3Valid)}
                className="w-full"
              >
                <div className="text-center lg:text-left mb-8">
                  <h2 className="text-[#0F172A] text-2xl font-bold">
                    Set Up Your <span className="text-[#84CC16]">Account</span>
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">
                    Complete your business information to connect with trusted
                    partners. All fields here are optional.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Company Name
                      </label>
                      <input
                        {...registerStep3("business_name")}
                        type="text"
                        placeholder="Enter your company name"
                        className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">
                          State
                        </label>
                        <input
                          {...registerStep3("state")}
                          type="text"
                          placeholder="e.g. Imo"
                          className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">
                          City
                        </label>
                        <input
                          {...registerStep3("city")}
                          type="text"
                          placeholder="e.g. Owerri"
                          className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Business Type
                      </label>
                      <select
                        {...registerStep3("business_type")}
                        className="w-full border border-gray-200 rounded-xl p-3 text-sm bg-white outline-none focus:ring-1 focus:ring-emerald-500"
                      >
                        <option value="">Select business type</option>
                        <option value="Manufacturing">Manufacturing</option>
                        <option value="Agriculture">Agriculture</option>
                        <option value="Construction">Construction</option>
                        <option value="Packaging">Packaging</option>
                        <option value="Recycler">Recycler</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* Waste Categories */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-2">
                        Waste Categories
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {WASTE_CATEGORIES.map((cat) => (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => toggleCategory(cat)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                              selectedCategories.includes(cat)
                                ? "bg-emerald-50 border-emerald-400 text-emerald-700"
                                : "bg-white border-gray-200 text-gray-600 hover:border-emerald-300"
                            }`}
                          >
                            <span
                              className={`w-3.5 h-3.5 rounded border flex items-center justify-center flex-shrink-0 ${
                                selectedCategories.includes(cat)
                                  ? "bg-emerald-500 border-emerald-500"
                                  : "border-gray-300"
                              }`}
                            >
                              {selectedCategories.includes(cat) && (
                                <svg
                                  className="w-2.5 h-2.5 text-white"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={3}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              )}
                            </span>
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Monthly Volume */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Monthly Volume Estimate{" "}
                        <span className="text-gray-400 font-normal">
                          (per month)
                        </span>
                      </label>
                      <input
                        {...registerStep3("monthly_volume")}
                        type="text"
                        placeholder="e.g. 500kg"
                        className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>

                    {/* Logistics Preference */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Preferred Logistics Method
                      </label>
                      <select
                        {...registerStep3("logistics_preference")}
                        className="w-full border border-gray-200 rounded-xl p-3 text-sm bg-white outline-none focus:ring-1 focus:ring-emerald-500"
                      >
                        <option value="">Select preference</option>
                        <option value="akumart">AkuMart Logistics</option>
                        <option value="self">Self-Arranged</option>
                      </select>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="flex flex-col space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Production Description{" "}
                        <span className="text-gray-400 font-normal">
                          (optional)
                        </span>
                      </label>
                      <textarea
                        {...registerStep3("production_description")}
                        placeholder="Describe what you will use the waste material for..."
                        rows={5}
                        className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none resize-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#16A34A] hover:bg-[#15803D] disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-xl transition-colors mt-auto"
                    >
                      {isSubmitting ? "Creating account..." : "Create Account"}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
