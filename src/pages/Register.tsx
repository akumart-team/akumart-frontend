import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthSideImg from "../assets/imgs/image.png"; 
import Logo from "../assets/imgs/logo.png"; 

type UserRole = 'Buyer' | 'Seller';
type AuthStep = 1 | 2 | 3; // 1: Role Selection, 2: Core Form, 3: Account Setup

export const Register: React.FC = () => {
  const navigate = useNavigate();
  
  // Step & Data Management States
  const [step, setStep] = useState<AuthStep>(1);
  const [role, setRole] = useState<UserRole>('Buyer');
  
  // Form Input States
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    state: '',
    city: '',
    businessType: '',
    productionDescription: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep((prev) => (prev + 1) as AuthStep);
    } else {
      
      console.log("Submitting all data to backend:", { role, ...formData });
      
      // Determine dashboard path using user type selection
      if (role === 'Buyer') {
        navigate('/buyer-dashboard');
      } else {
        navigate('/seller-dashboard');
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

     
      <div className={`w-full ${step === 3 ? 'w-full px-4 md:px-16' : 'lg:w-1/2 px-6 sm:px-12 md:px-20'} py-12 flex flex-col justify-center bg-white relative`}>
        
        {/* Back Arrow button for Steps 2 and 3 */}
        {step > 1 && (
          <button 
            onClick={handlePrevStep} 
            className="absolute top-10 left-6 sm:left-12 text-gray-500 hover:text-gray-800 flex items-center gap-1 text-sm font-medium"
          >
            ← Back
          </button>
        )}

        <div className={`mx-auto w-full ${step === 3 ? 'max-w-5xl' : 'max-w-md'} flex flex-col items-center`}>
          {/* Brand Logo Header */}
          <img src={Logo} alt="Enactus Logo" className="h-12 object-contain mb-8" />

          <form onSubmit={handleNextStep} className="w-full">
            
            
            {step === 1 && (
              <div className="text-center w-full">
                <h2 className="text-[#0F172A] text-2xl md:text-3xl font-bold mb-2">Create Your Free Account</h2>
                <p className="text-gray-500 text-sm mb-8">Connect, trade, and recycle smarter.</p>
                
                <div className="mb-6 text-left">
                  <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">User Type</label>
                  <select 
                    value={role} 
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    className="w-full border border-gray-200 rounded-xl p-3.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Buyer">Buyer</option>
                    <option value="Seller">Seller</option>
                  </select>
                </div>

                <button type="submit" className="w-full bg-[#16A34A] hover:bg-[#15803D] text-white font-medium py-3.5 px-4 rounded-xl transition-colors">
                  Continue
                </button>
                
                <p className="text-sm text-gray-500 mt-6">
                  Already have an account? <span className="text-[#16A34A] cursor-pointer font-medium" onClick={() => navigate('/signin')}>Login</span>
                </p>
              </div>
            )}

           
            {step === 2 && (
              <div className="w-full">
                <div className="text-center mb-6">
                  <h2 className="text-[#0F172A] text-2xl md:text-3xl font-bold mb-2">
                    Create Your <span className="text-[#16A34A]">{role}</span> Account
                  </h2>
                  <p className="text-gray-500 text-sm">Source quality waste materials for your production needs</p>
                </div>

            
                <div className="space-y-4 mb-6">
                  <input type="text" name="fullName" placeholder="Full name / Business Name" required onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                  <input type="email" name="email" placeholder="Email Address" required onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                  <input type="tel" name="phone" placeholder="Phone number" required onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                  <input type="password" name="password" placeholder="Password" required onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                  <input type="password" name="confirmPassword" placeholder="Confirm Password" required onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>

                <button type="submit" className="w-full bg-[#16A34A] hover:bg-[#15803D] text-white font-medium py-3.5 px-4 rounded-xl transition-colors">
                  Continue
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="w-full">
                <div className="text-center lg:text-left mb-8">
                  <h2 className="text-[#0F172A] text-2xl font-bold">Set Up Your <span className="text-[#84CC16]">Account</span></h2>
                  <p className="text-gray-500 text-sm mt-1">Complete your business information and business type to connect with trusted partners.</p>
                </div>

                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
                
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Company Name</label>
                      <input type="text" name="companyName" placeholder="Enter your company name" onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">State</label>
                        <input type="text" name="state" placeholder="Enter state" onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">City</label>
                        <input type="text" name="city" placeholder="Enter city" onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Business Type</label>
                      <select name="businessType" onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3 text-sm bg-white outline-none">
                        <option>Select business type</option>
                        <option value="Recycler">Recycler</option>
                        <option value="Manufacturer">Manufacturer</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Production Description</label>
                      <textarea name="productionDescription" placeholder="Describe what you will use the waste material to do..." rows={4} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none resize-none" />
                    </div>
                    
                    <button type="submit" className="w-full bg-[#16A34A] hover:bg-[#15803D] text-white font-medium py-3 px-4 rounded-xl transition-colors mt-auto">
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
