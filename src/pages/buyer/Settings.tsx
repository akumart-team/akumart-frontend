import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../store';
import { VisaIcon,MastercardIcon, PaypalIcon,EyeIcon,EyeOffIcon,CheckCircleIcon  } from '../../components/order/Icon'; 
import FarmImage from '../../assets/imgs/plastics.png'; 
import type {AccountFormState,AddressFormState,PasswordFormState,PaymentFormState,PaymentMethodType,ProfileStatus} from "../../utils/types"

//  Types 



const NIGERIAN_STATES = [
  'Lagos State', 'Abuja (FCT)', 'Rivers State', 'Oyo State', 'Kano State',
  'Ogun State', 'Imo State', 'Anambra State', 'Delta State', 'Enugu State',
];

// Reusable form bits 
interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}

const TextField: React.FC<TextFieldProps> = ({ label, value, onChange, placeholder, type = 'text' }) => (
  <div>
    <label className="block text-[13px] text-[#374151] mb-1.5">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E7EB] text-[13px] text-[#111827] placeholder-[#9CA3AF] outline-none focus:ring-2 focus:ring-[#1A7A3C]/20 focus:border-[#1A7A3C] transition-all duration-150"
    />
  </div>
);

interface PasswordFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const PasswordField: React.FC<PasswordFieldProps> = ({ label, value, onChange }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <label className="block text-[13px] text-[#374151] mb-1.5">{label}</label>
      <div className="relative">
        <input
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Password"
          className="w-full px-3.5 py-2.5 pr-10 rounded-lg border border-[#E5E7EB] text-[13px] text-[#111827] placeholder-[#9CA3AF] outline-none focus:ring-2 focus:ring-[#1A7A3C]/20 focus:border-[#1A7A3C] transition-all duration-150"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280]"
          aria-label={visible ? 'Hide password' : 'Show password'}
        >
          {visible ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>
    </div>
  );
};

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

const SelectField: React.FC<SelectFieldProps> = ({ label, value, onChange, options }) => (
  <div>
    <label className="block text-[13px] text-[#374151] mb-1.5">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E7EB] text-[13px] text-[#111827] outline-none focus:ring-2 focus:ring-[#1A7A3C]/20 focus:border-[#1A7A3C] bg-white transition-all duration-150 appearance-none"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

// "Saved" toast 
const SavedToast: React.FC = () => (
  <div className="fixed top-6 right-6 z-50 bg-white rounded-xl shadow-lg border border-[#E5E7EB] px-6 py-5 flex flex-col items-center gap-2 animate-fade-in">
    <CheckCircleIcon />
    <span className="text-[14px] font-semibold text-[#111827]">Saved</span>
  </div>
);

// ─── Section: Account Settings (profile) ──────────────────────────────────────
interface AccountSettingsSectionProps {
  form: AccountFormState;
  onChange: (field: keyof AccountFormState, value: string) => void;
  onSave: () => void;
  onChangePhoto: () => void;
  isSaving: boolean;
}

const AccountSettingsSection: React.FC<AccountSettingsSectionProps> = ({
  form, onChange, onSave, onChangePhoto, isSaving,
}) => (
  <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
    <h2 className="text-[16px] font-semibold text-[#111827] text-center md:text-left mb-5">Account Settings</h2>

    <div className="flex flex-col md:flex-row gap-6 ">
      <div className="flex-1 space-y-4 order-2 md:order-1">
        <TextField
          label="Full Name"
          value={form.first_name}
          onChange={(v) => onChange('first_name', v)}
          placeholder="Praise Godwin"
        />
         <TextField
          label="Full Name"
          value={form.Last_name}
          onChange={(v) => onChange('Last_name', v)}
          placeholder="Praise Godwin"
        />
        <TextField
          label="E-mail"
          value={form.email}
          onChange={(v) => onChange('email', v)}
          placeholder="praise453@gmail.yahoo"
          type="email"
        />
        <TextField
          label="Phone Number"
          value={form.phoneNumber}
          onChange={(v) => onChange('phoneNumber', v)}
          placeholder="08127997553"
        />
        <SelectField
          label="Profile Status"
          value={form.profileStatus}
          onChange={(v) => onChange('profileStatus', v)}
          options={['Public', 'Private']}
        />

        <button
          onClick={onSave}
          disabled={isSaving}
          className="px-5 py-2.5 rounded-lg bg-[#1A7A3C] hover:bg-[#155f30] disabled:opacity-60 text-white text-[13px] font-semibold transition-colors duration-150"
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="shrink-0 flex flex-col items-center gap-3  w-50 order-1 md:order-2 self-center md:self-auto">
        <img
          src={FarmImage}
          alt="Profile"
          className="w-full md:w-50 h-40 object-cover rounded-xl"
        />
        <button
          onClick={onChangePhoto}
          className="w-full px-4 py-2 rounded-lg border border-[#E5E7EB] text-[#374151] text-[13px] font-medium hover:bg-[#F9FAFB] transition-colors duration-150"
        >
          Change Profile Photo
        </button>
      </div>
    </div>
  </div>
);

//  Section: Pickup Address 
interface PickupAddressSectionProps {
  form: AddressFormState;
  onChange: (field: keyof AddressFormState, value: string) => void;
  onSave: () => void;
  isSaving: boolean;
}

const PickupAddressSection: React.FC<PickupAddressSectionProps> = ({ form, onChange, onSave, isSaving }) => (
  <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
    <h2 className="text-[16px] font-semibold text-[#111827] mb-5">Pickup Address</h2>

    <div className="space-y-4">
      <TextField
        label="Company Address"
        value={form.companyAddress}
        onChange={(v) => onChange('companyAddress', v)}
        placeholder="Itire"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectField
          label="City"
          value={form.city}
          onChange={(v) => onChange('city', v)}
          options={['Surulere', 'Ikeja', 'Yaba', 'Lekki', 'Ajah']}
        />
        <SelectField
          label="State"
          value={form.state}
          onChange={(v) => onChange('state', v)}
          options={NIGERIAN_STATES}
        />
      </div>

      <button
        onClick={onSave}
        disabled={isSaving}
        className="px-5 py-2.5 rounded-lg bg-[#1A7A3C] hover:bg-[#155f30] disabled:opacity-60 text-white text-[13px] font-semibold transition-colors duration-150"
      >
        {isSaving ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  </div>
);

//Section: Account Security (password)
interface AccountSecuritySectionProps {
  form: PasswordFormState;
  onChange: (field: keyof PasswordFormState, value: string) => void;
  onChangePassword: () => void;
  isSaving: boolean;
}

const AccountSecuritySection: React.FC<AccountSecuritySectionProps> = ({
  form, onChange, onChangePassword, isSaving,
}) => (
  <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
    <h2 className="text-[16px] font-semibold text-[#111827] mb-5">Account Security</h2>

    <div className="space-y-4">
      <PasswordField
        label="Current Password"
        value={form.currentPassword}
        onChange={(v) => onChange('currentPassword', v)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PasswordField
          label="New Password"
          value={form.newPassword}
          onChange={(v) => onChange('newPassword', v)}
        />
        <PasswordField
          label="Confirm Password"
          value={form.confirmPassword}
          onChange={(v) => onChange('confirmPassword', v)}
        />
      </div>

      <button
        onClick={onChangePassword}
        disabled={isSaving}
        className="px-5 py-2.5 rounded-lg bg-[#1A7A3C] hover:bg-[#155f30] disabled:opacity-60 text-white text-[13px] font-semibold transition-colors duration-150"
      >
        {isSaving ? 'Updating...' : 'Change Password'}
      </button>
    </div>
  </div>
);

//  Section: Payment Method 
interface PaymentMethodSectionProps {
  form: PaymentFormState;
  onChange: (field: keyof PaymentFormState, value: string) => void;
  onSelectMethod: (method: PaymentMethodType) => void;
  onSave: () => void;
  onEditInformation: () => void;
  isSaving: boolean;
  isEditing: boolean;
}

const PAYMENT_OPTIONS: { type: PaymentMethodType; icon: React.ReactNode }[] = [
  { type: 'mastercard', icon: <MastercardIcon /> },
  { type: 'paypal', icon: <PaypalIcon /> },
  { type: 'visa', icon: <VisaIcon /> },
];

const PaymentMethodSection: React.FC<PaymentMethodSectionProps> = ({
  form, onChange, onSelectMethod, onSave, onEditInformation, isSaving, isEditing,
}) => {
  const formatCardNumber = (val: string): string => {
    const digits = val.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (val: string): string => {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2);
    return digits;
  };

  return (
    <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
      <h2 className="text-[16px] font-semibold text-[#111827] mb-1">Payment Method</h2>
      <p className="text-[13px] text-[#6B7280] mb-4">Select payment method</p>

      {/* Payment method icons */}
      <div className="flex items-center gap-3 mb-5  ">
        {PAYMENT_OPTIONS.map(({ type, icon }) => (
          <button
            key={type}
            type="button"
            onClick={() => onSelectMethod(type)}
            disabled={!isEditing}
            className={`flex items-center justify-center px-4 py-2.5 rounded-lg border transition-all duration-150 ${
              form.method === type
                ? 'border-[#1A7A3C] bg-[#F0FDF4]'
                : 'border-[#E5E7EB] bg-white hover:border-gray-300'
            } ${!isEditing ? 'cursor-default opacity-90' : ''}`}
          >
            {icon}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-[13px] text-[#374151] mb-1.5">Card Number</label>
          <input
            type="text"
            value={form.cardNumber}
            onChange={(e) => onChange('cardNumber', formatCardNumber(e.target.value))}
            placeholder="•••• •••• •••• ••••"
            maxLength={19}
            disabled={!isEditing}
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E7EB] text-[13px] text-[#111827] placeholder-[#9CA3AF] outline-none focus:ring-2 focus:ring-[#1A7A3C]/20 focus:border-[#1A7A3C] disabled:bg-[#F9FAFB] disabled:text-[#9CA3AF] tracking-widest transition-all duration-150"
          />
        </div>

        <div>
          <label className="block text-[13px] text-[#374151] mb-1.5">Card Holder Name</label>
          <input
            type="text"
            value={form.cardHolderName}
            onChange={(e) => onChange('cardHolderName', e.target.value)}
            placeholder="•••••••••••••••••"
            disabled={!isEditing}
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E7EB] text-[13px] text-[#111827] placeholder-[#9CA3AF] outline-none focus:ring-2 focus:ring-[#1A7A3C]/20 focus:border-[#1A7A3C] disabled:bg-[#F9FAFB] disabled:text-[#9CA3AF] transition-all duration-150"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[13px] text-[#374151] mb-1.5">Expiration Date</label>
            <input
              type="text"
              value={form.expirationDate}
              onChange={(e) => onChange('expirationDate', formatExpiry(e.target.value))}
              placeholder="MM/YY"
              maxLength={5}
              disabled={!isEditing}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E7EB] text-[13px] text-[#111827] placeholder-[#9CA3AF] outline-none focus:ring-2 focus:ring-[#1A7A3C]/20 focus:border-[#1A7A3C] disabled:bg-[#F9FAFB] disabled:text-[#9CA3AF] transition-all duration-150"
            />
          </div>
          <div>
            <label className="block text-[13px] text-[#374151] mb-1.5">CVV</label>
            <input
              type="password"
              value={form.cvv}
              onChange={(e) => onChange('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))}
              placeholder="••••"
              maxLength={4}
              disabled={!isEditing}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E7EB] text-[13px] text-[#111827] placeholder-[#9CA3AF] outline-none focus:ring-2 focus:ring-[#1A7A3C]/20 focus:border-[#1A7A3C] disabled:bg-[#F9FAFB] disabled:text-[#9CA3AF] transition-all duration-150"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onSave}
            disabled={isSaving || !isEditing}
            className="px-5 py-2.5 rounded-lg bg-[#1A7A3C] hover:bg-[#155f30] disabled:opacity-50 disabled:cursor-not-allowed text-white text-[13px] font-semibold transition-colors duration-150"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            onClick={onEditInformation}
            className="px-5 py-2.5 rounded-lg border border-[#E5E7EB] text-[#374151] text-[13px] font-medium hover:bg-[#F9FAFB] transition-colors duration-150"
          >
            {isEditing ? 'Cancel' : 'Edit Information'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Settings Page 
export const Settings = () => {
  
  const user = useAuthStore((s) => s.user);
  const updateUser = useAuthStore((s) => s.updateUser);

  const [showSavedToast, setShowSavedToast] = useState(false);

  //  Local draft state, seeded from the store's `user` once available 
  const [accountForm, setAccountForm] = useState<AccountFormState>({
     first_name: '',
     Last_name: '',
    email: '',
    phoneNumber: '',
    profileStatus: 'Public',
  });

  const [addressForm, setAddressForm] = useState<AddressFormState>({
    companyAddress: '',
    city: 'Surulere',
    state: 'Lagos State',
  });

  const [passwordForm, setPasswordForm] = useState<PasswordFormState>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [paymentForm, setPaymentForm] = useState<PaymentFormState>({
    method: 'mastercard',
    cardNumber: '',
    cardHolderName: '',
    expirationDate: '',
    cvv: '',
  });
  const [isEditingPayment, setIsEditingPayment] = useState(false);

  const [savingSection, setSavingSection] = useState<
    'account' | 'address' | 'password' | 'payment' | null
  >(null);

  // Seed local forms once user data is available from the store.
 const hasSeededRef = React.useRef(false);
useEffect(() => {
  if (!user || hasSeededRef.current) return;
  hasSeededRef.current = true;
  setAccountForm({
    first_name: user.first_name ?? '',
    Last_name:user.last_name ??'',
    email: user.email ?? '',
    phoneNumber: user.phoneNumber ?? '',
    profileStatus: (user.profileStatus as ProfileStatus) ?? 'Public',
  });
  setAddressForm({
    companyAddress: user.companyAddress ?? '',
    city: user.city ?? 'Surulere',
    state: user.state ?? 'Lagos State',
  });
  setPaymentForm((prev) => ({
    ...prev,
    method: (user.paymentMethod as PaymentMethodType) ?? 'mastercard',
    cardHolderName: user.cardHolderName ?? '',
  }));
}, [user]);

  const flashSaved = () => {
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 1800);
  };

  // ── Submit handlers — each stubbed for you to wire up to your real API ──
  const handleSaveAccount = async () => {
    setSavingSection('account');
    try {
      // TODO: await api.put('/user/account', accountForm);
      updateUser(accountForm);
      flashSaved();
    } finally {
      setSavingSection(null);
    }
  };

  const handleSaveAddress = async () => {
    setSavingSection('address');
    try {
      // TODO: await api.put('/user/address', addressForm);
      updateUser(addressForm);
      flashSaved();
    } finally {
      setSavingSection(null);
    }
  };

  const handleChangePassword = async () => {
    setSavingSection('password');
    try {
      // TODO: await api.post('/user/change-password', passwordForm);
      flashSaved();
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } finally {
      setSavingSection(null);
    }
  };

  const handleSavePayment = async () => {
    setSavingSection('payment');
    try {
      // TODO: await api.put('/user/payment-method', paymentForm);
      updateUser({ paymentMethod: paymentForm.method, cardHolderName: paymentForm.cardHolderName });
      setIsEditingPayment(false);
      flashSaved();
    } finally {
      setSavingSection(null);
    }
  };

  const handleChangePhoto = () => {
    // TODO: open file picker / upload flow
    console.log('Change profile photo clicked');
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[#F9FAFB] px-4 md:px-6 py-6 space-y-6">
      <AccountSettingsSection
        form={accountForm}
        onChange={(field, value) => setAccountForm((prev) => ({ ...prev, [field]: value }))}
        onSave={handleSaveAccount}
        onChangePhoto={handleChangePhoto}
        isSaving={savingSection === 'account'}
      />

      <PickupAddressSection
        form={addressForm}
        onChange={(field, value) => setAddressForm((prev) => ({ ...prev, [field]: value }))}
        onSave={handleSaveAddress}
        isSaving={savingSection === 'address'}
      />

      <AccountSecuritySection
        form={passwordForm}
        onChange={(field, value) => setPasswordForm((prev) => ({ ...prev, [field]: value }))}
        onChangePassword={handleChangePassword}
        isSaving={savingSection === 'password'}
      />

      <PaymentMethodSection
        form={paymentForm}
        onChange={(field, value) => setPaymentForm((prev) => ({ ...prev, [field]: value }))}
        onSelectMethod={(method) => setPaymentForm((prev) => ({ ...prev, method }))}
        onSave={handleSavePayment}
        onEditInformation={() => setIsEditingPayment((prev) => !prev)}
        isSaving={savingSection === 'payment'}
        isEditing={isEditingPayment}
      />

      {showSavedToast && <SavedToast />}
    </div>
  );
};

