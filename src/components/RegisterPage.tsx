import React, { useState } from 'react';
import { useApp } from '../App';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, X, ArrowLeft } from 'lucide-react';

type UserRole = 'customer' | 'brand' | 'manufacturer' | 'model';

// Star Icon Component
const StarIcon = ({ className = "w-6 h-6", filled = false }: { className?: string; filled?: boolean }) => (
  <svg className={className} viewBox="0 0 224 184" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M143.719 110.121C156.233 101.407 171.96 95.7044 189.287 94.385L223.521 91.7763L189.287 89.1675C171.96 87.8479 156.243 82.1452 143.719 73.4316L190.782 26.8837L134.096 65.5295C123.485 55.2537 116.54 42.339 114.933 28.1123L111.756 4.76837e-07L108.579 28.1123C106.972 42.339 100.027 55.2461 89.416 65.5295L32.7299 26.8837L79.7927 73.4316C67.2789 82.1452 51.5514 87.8479 34.2351 89.1675L1.04308e-07 91.7763L34.2351 94.385C51.5607 95.7044 67.2789 101.415 79.7927 110.121L32.7299 156.669L89.416 118.023C100.027 128.299 106.972 141.214 108.579 155.433L111.756 183.545L114.933 155.433C116.54 141.206 123.494 128.299 134.096 118.023L190.782 156.669L143.719 110.121Z" 
      fill="currentColor"
      fillOpacity={filled ? 1 : 0}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 2}
    />
  </svg>
);

// Input Field with floating label animation
const InputField = ({ 
  label, 
  type = "text", 
  value, 
  onChange, 
  required = false 
}: { 
  label: string; 
  type?: string; 
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
  required?: boolean;
}) => {
  const [focused, setFocused] = useState(false);
  
  return (
    <div className="relative mb-6">
      <input
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        className="w-full bg-transparent border-b border-[#E6E6E3] py-3 text-[#0B0B0B] focus:outline-none focus:border-[#111111] transition-all duration-300 peer"
      />
      <motion.label
        initial={false}
        animate={{
          y: focused || value ? -24 : 0,
          fontSize: focused || value ? '12px' : '16px',
          color: focused ? '#111111' : '#6E6E6E',
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 top-3 pointer-events-none uppercase tracking-wider"
      >
        {label}
      </motion.label>
    </div>
  );
};

// Role Card Component
const RoleCard = ({ 
  role, 
  label, 
  selected, 
  onSelect 
}: { 
  role: UserRole; 
  label: string; 
  selected: boolean; 
  onSelect: (role: UserRole) => void;
}) => {
  return (
    <motion.div
      onClick={() => onSelect(role)}
      whileHover={{ y: -4 }}
      className={`
        relative aspect-square border cursor-pointer flex flex-col items-center justify-center gap-4 transition-all duration-300
        ${selected 
          ? 'border-[#111111] border-2 bg-[#FFFFFF] shadow-[inset_0_2px_8px_rgba(0,0,0,0.1)]' 
          : 'border-[#E6E6E3] bg-[#FFFFFF] hover:border-[#111111]/40'
        }
        ${!selected ? 'opacity-100' : 'opacity-100'}
      `}
    >
      <StarIcon 
        className="w-8 h-8 text-[#111111]" 
        filled={selected} 
      />
      <motion.span 
        initial={false}
        animate={{
          scale: selected ? 1.05 : 1,
        }}
        transition={{ duration: 0.3 }}
        className="text-sm uppercase tracking-wider text-[#0B0B0B] font-medium"
      >
        {label}
      </motion.span>
    </motion.div>
  );
};

// Main Register Page - Universal Sign Up
export function RegisterPage() {
  const { navigate, setUser } = useApp();
  
  // State
  const [view, setView] = useState<'signup' | 'onboarding' | 'confirmation'>('signup');
  
  // Form Data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  
  // Onboarding state
  const [onboardingStep, setOnboardingStep] = useState(1);
  
  // Role-specific data
  const [customerData, setCustomerData] = useState({ 
    country: '', 
    city: '' 
  });
  
  const [brandData, setBrandData] = useState({ 
    brandName: '', 
    brandType: '', 
    country: '', 
    city: '',
    teamSize: '',
    teamMembers: [] as { email: string; role: string }[],
    brandStatement: ''
  });
  
  const [modelData, setModelData] = useState({ 
    country: '', 
    city: '',
    height: '',
    chest: '',
    waist: '',
    hips: ''
  });
  
  const [manufacturerData, setManufacturerData] = useState({ 
    factoryName: '',
    country: '',
    city: '',
    factoryType: '' as 'garment' | 'print' | 'tailor' | 'multi' | '',
    garmentCapabilities: [] as string[],
    printCapabilities: [] as string[],
    tailorCapabilities: [] as string[],
    monthlyCapacity: '',
    moq: '',
    fabrics: [] as string[],
    customMaterials: false
  });

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole || !name || !email || !password) return;

    if (selectedRole === 'customer') {
      // Customer has lightest flow - go straight to confirmation
      setView('confirmation');
    } else {
      // Other roles need onboarding
      setView('onboarding');
      setOnboardingStep(1);
    }
  };

  const completeRegistration = () => {
    setUser({
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      role: selectedRole,
    });
    
    // Route to appropriate dashboard
    if (selectedRole === 'manufacturer') {
      navigate('manufacturer-dashboard'); // New unified manufacturer system
    } else if (selectedRole === 'brand') {
      navigate('localbrand-dashboard');
    } else if (selectedRole === 'model') {
      navigate('model-dashboard');
    } else {
      navigate('home'); // Customer goes to home, which routes to CustomerDashboard
    }
  };

  // Universal Sign Up Page (Split Screen)
  const renderSignUpPage = () => (
    <div className="min-h-screen bg-[#F7F7F5] flex">
      {/* LEFT SIDE - Credentials */}
      <div className="w-1/2 bg-[#F7F7F5] flex items-center justify-center p-12 relative">
        {/* Back Button */}
        <button
          onClick={() => navigate('welcome')}
          className="absolute top-8 left-8 flex items-center gap-2 text-[#0B0B0B]/60 hover:text-[#0B0B0B] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm uppercase tracking-wider">Back to Home</span>
        </button>

        <div className="w-full max-w-md">
          {/* Black Star Icon */}
          <div className="mb-12">
            <StarIcon className="w-8 h-8 text-[#111111]" />
          </div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl tracking-tight text-[#0B0B0B] mb-2"
          >
            Create your Black Star account
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#6E6E6E] mb-12 tracking-wide"
          >
            One identity. Many paths.
          </motion.p>

          {/* Form */}
          <form onSubmit={handleSignUpSubmit}>
            <InputField
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            
            <InputField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            
            <InputField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <p className="text-xs text-[#6E6E6E] -mt-4 mb-8">You can change this later.</p>
          </form>
        </div>
      </div>

      {/* RIGHT SIDE - Role Selection */}
      <div className="w-1/2 bg-[#FFFFFF] flex items-center justify-center p-12 border-l border-[#E6E6E3]">
        <div className="w-full max-w-md">
          {/* Role Grid */}
          <div className="grid grid-cols-2 gap-6 mb-12">
            <RoleCard
              role="customer"
              label="Customer"
              selected={selectedRole === 'customer'}
              onSelect={setSelectedRole}
            />
            <RoleCard
              role="brand"
              label="Local Brand"
              selected={selectedRole === 'brand'}
              onSelect={setSelectedRole}
            />
            <RoleCard
              role="model"
              label="Model"
              selected={selectedRole === 'model'}
              onSelect={setSelectedRole}
            />
            <RoleCard
              role="manufacturer"
              label="Manufacturer"
              selected={selectedRole === 'manufacturer'}
              onSelect={setSelectedRole}
            />
          </div>

          {/* Proceed Button */}
          <button
            onClick={handleSignUpSubmit}
            disabled={!selectedRole || !name || !email || !password}
            className={`
              w-full h-14 bg-[#111111] text-white uppercase tracking-wider text-sm
              transition-all duration-300
              ${(!selectedRole || !name || !email || !password)
                ? 'opacity-30 cursor-not-allowed'
                : 'hover:bg-[#0B0B0B]'
              }
            `}
          >
            {selectedRole ? `Proceed as ${selectedRole === 'brand' ? 'Local Brand' : selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}` : 'Select a role'}
          </button>
        </div>
      </div>
    </div>
  );

  // Brand Onboarding
  const renderBrandOnboarding = () => {
    const totalSteps = 3;
    
    return (
      <div className="min-h-screen bg-[#F7F7F5] flex items-center justify-center p-12">
        <div className="w-full max-w-2xl">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex gap-2 mb-4">
              {[...Array(totalSteps)].map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 transition-all duration-500 ${
                    i < onboardingStep ? 'bg-[#111111]' : 'bg-[#E6E6E3]'
                  }`}
                />
              ))}
            </div>
            <p className="text-xs uppercase tracking-wider text-[#6E6E6E]">
              Step {onboardingStep} of {totalSteps}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {/* Step 1: Brand Identity */}
            {onboardingStep === 1 && (
              <motion.div
                key="brand-step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-2xl text-[#0B0B0B] mb-8 tracking-tight">Brand Identity</h2>
                
                <InputField
                  label="Brand Name"
                  value={brandData.brandName}
                  onChange={(e) => setBrandData({ ...brandData, brandName: e.target.value })}
                  required
                />

                <div className="mb-6">
                  <label className="block text-xs uppercase tracking-wider text-[#6E6E6E] mb-3">
                    Brand Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Streetwear', 'Luxury', 'Basics', 'Experimental'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setBrandData({ ...brandData, brandType: type })}
                        className={`
                          py-3 border text-sm uppercase tracking-wider transition-all duration-300
                          ${brandData.brandType === type
                            ? 'border-[#111111] bg-[#111111] text-white'
                            : 'border-[#E6E6E3] text-[#6E6E6E] hover:border-[#111111]/40'
                          }
                        `}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    label="Country"
                    value={brandData.country}
                    onChange={(e) => setBrandData({ ...brandData, country: e.target.value })}
                    required
                  />
                  <InputField
                    label="City"
                    value={brandData.city}
                    onChange={(e) => setBrandData({ ...brandData, city: e.target.value })}
                    required
                  />
                </div>

                <button
                  onClick={() => setOnboardingStep(2)}
                  disabled={!brandData.brandName || !brandData.brandType || !brandData.country || !brandData.city}
                  className={`
                    w-full h-14 bg-[#111111] text-white uppercase tracking-wider text-sm mt-8
                    transition-all duration-300
                    ${(!brandData.brandName || !brandData.brandType || !brandData.country || !brandData.city)
                      ? 'opacity-30 cursor-not-allowed'
                      : 'hover:bg-[#0B0B0B]'
                    }
                  `}
                >
                  Continue
                </button>
              </motion.div>
            )}

            {/* Step 2: Team Setup */}
            {onboardingStep === 2 && (
              <motion.div
                key="brand-step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-2xl text-[#0B0B0B] mb-8 tracking-tight">Team Setup</h2>
                
                <InputField
                  label="Number of Team Members"
                  type="number"
                  value={brandData.teamSize}
                  onChange={(e) => {
                    const size = parseInt(e.target.value) || 0;
                    setBrandData({ 
                      ...brandData, 
                      teamSize: e.target.value,
                      teamMembers: Array(size).fill(0).map((_, i) => 
                        brandData.teamMembers[i] || { email: '', role: 'Designer' }
                      )
                    });
                  }}
                  required
                />

                {parseInt(brandData.teamSize) > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-8 space-y-4"
                  >
                    <p className="text-xs uppercase tracking-wider text-[#6E6E6E] mb-4">
                      Team Members
                    </p>
                    {brandData.teamMembers.map((member, index) => (
                      <div key={index} className="grid grid-cols-[1fr_auto] gap-4">
                        <input
                          type="email"
                          placeholder="Email"
                          value={member.email}
                          onChange={(e) => {
                            const newMembers = [...brandData.teamMembers];
                            newMembers[index].email = e.target.value;
                            setBrandData({ ...brandData, teamMembers: newMembers });
                          }}
                          className="bg-transparent border-b border-[#E6E6E3] py-2 text-[#0B0B0B] focus:outline-none focus:border-[#111111] text-sm"
                        />
                        <select
                          value={member.role}
                          onChange={(e) => {
                            const newMembers = [...brandData.teamMembers];
                            newMembers[index].role = e.target.value;
                            setBrandData({ ...brandData, teamMembers: newMembers });
                          }}
                          className="bg-transparent border-b border-[#E6E6E3] py-2 text-[#0B0B0B] focus:outline-none focus:border-[#111111] text-sm"
                        >
                          <option>Designer</option>
                          <option>Manager</option>
                          <option>Marketing</option>
                          <option>Owner</option>
                        </select>
                      </div>
                    ))}
                  </motion.div>
                )}

                <button
                  onClick={() => setOnboardingStep(3)}
                  disabled={!brandData.teamSize}
                  className={`
                    w-full h-14 bg-[#111111] text-white uppercase tracking-wider text-sm mt-8
                    transition-all duration-300
                    ${!brandData.teamSize
                      ? 'opacity-30 cursor-not-allowed'
                      : 'hover:bg-[#0B0B0B]'
                    }
                  `}
                >
                  Continue
                </button>
              </motion.div>
            )}

            {/* Step 3: Brand Image */}
            {onboardingStep === 3 && (
              <motion.div
                key="brand-step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-2xl text-[#0B0B0B] mb-8 tracking-tight">Brand Image</h2>
                
                <div className="border-2 border-dashed border-[#E6E6E3] p-12 flex flex-col items-center justify-center cursor-pointer hover:border-[#111111]/40 transition-all duration-300 mb-6">
                  <Upload className="w-12 h-12 text-[#6E6E6E] mb-4" />
                  <p className="text-sm uppercase tracking-wider text-[#0B0B0B] mb-2">
                    Upload Brand Visual
                  </p>
                  <p className="text-xs text-[#6E6E6E]">Group photo or brand image</p>
                </div>

                <div className="mb-6">
                  <label className="block text-xs uppercase tracking-wider text-[#6E6E6E] mb-3">
                    Brand Statement (Optional)
                  </label>
                  <textarea
                    value={brandData.brandStatement}
                    onChange={(e) => setBrandData({ ...brandData, brandStatement: e.target.value })}
                    placeholder="1-2 lines about your brand..."
                    rows={3}
                    className="w-full bg-transparent border border-[#E6E6E3] p-4 text-[#0B0B0B] focus:outline-none focus:border-[#111111] text-sm resize-none"
                  />
                </div>

                <button
                  onClick={() => setView('confirmation')}
                  className="w-full h-14 bg-[#111111] text-white uppercase tracking-wider text-sm hover:bg-[#0B0B0B] transition-all duration-300"
                >
                  Complete
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  };

  // Model Onboarding
  const renderModelOnboarding = () => {
    const totalSteps = 3;
    
    return (
      <div className="min-h-screen bg-[#F7F7F5] flex items-center justify-center p-12">
        <div className="w-full max-w-2xl">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex gap-2 mb-4">
              {[...Array(totalSteps)].map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 transition-all duration-500 ${
                    i < onboardingStep ? 'bg-[#111111]' : 'bg-[#E6E6E3]'
                  }`}
                />
              ))}
            </div>
            <p className="text-xs uppercase tracking-wider text-[#6E6E6E]">
              Step {onboardingStep} of {totalSteps}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {/* Step 1: Identity */}
            {onboardingStep === 1 && (
              <motion.div
                key="model-step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-2xl text-[#0B0B0B] mb-8 tracking-tight">Identity</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    label="Country"
                    value={modelData.country}
                    onChange={(e) => setModelData({ ...modelData, country: e.target.value })}
                    required
                  />
                  <InputField
                    label="City"
                    value={modelData.city}
                    onChange={(e) => setModelData({ ...modelData, city: e.target.value })}
                    required
                  />
                </div>

                <button
                  onClick={() => setOnboardingStep(2)}
                  disabled={!modelData.country || !modelData.city}
                  className={`
                    w-full h-14 bg-[#111111] text-white uppercase tracking-wider text-sm mt-8
                    transition-all duration-300
                    ${(!modelData.country || !modelData.city)
                      ? 'opacity-30 cursor-not-allowed'
                      : 'hover:bg-[#0B0B0B]'
                    }
                  `}
                >
                  Continue
                </button>
              </motion.div>
            )}

            {/* Step 2: Physical Basics */}
            {onboardingStep === 2 && (
              <motion.div
                key="model-step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-2xl text-[#0B0B0B] mb-8 tracking-tight">Physical Basics</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    label="Height (cm)"
                    type="number"
                    value={modelData.height}
                    onChange={(e) => setModelData({ ...modelData, height: e.target.value })}
                    required
                  />
                  <InputField
                    label="Chest (cm)"
                    type="number"
                    value={modelData.chest}
                    onChange={(e) => setModelData({ ...modelData, chest: e.target.value })}
                    required
                  />
                  <InputField
                    label="Waist (cm)"
                    type="number"
                    value={modelData.waist}
                    onChange={(e) => setModelData({ ...modelData, waist: e.target.value })}
                    required
                  />
                  <InputField
                    label="Hips (cm)"
                    type="number"
                    value={modelData.hips}
                    onChange={(e) => setModelData({ ...modelData, hips: e.target.value })}
                    required
                  />
                </div>

                <button
                  onClick={() => setOnboardingStep(3)}
                  disabled={!modelData.height || !modelData.chest || !modelData.waist || !modelData.hips}
                  className={`
                    w-full h-14 bg-[#111111] text-white uppercase tracking-wider text-sm mt-8
                    transition-all duration-300
                    ${(!modelData.height || !modelData.chest || !modelData.waist || !modelData.hips)
                      ? 'opacity-30 cursor-not-allowed'
                      : 'hover:bg-[#0B0B0B]'
                    }
                  `}
                >
                  Continue
                </button>
              </motion.div>
            )}

            {/* Step 3: Portfolio Start */}
            {onboardingStep === 3 && (
              <motion.div
                key="model-step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-2xl text-[#0B0B0B] mb-8 tracking-tight">Portfolio Start</h2>
                
                <div className="border-2 border-dashed border-[#E6E6E3] p-16 flex flex-col items-center justify-center cursor-pointer hover:border-[#111111]/40 transition-all duration-300 mb-6">
                  <Upload className="w-12 h-12 text-[#6E6E6E] mb-4" />
                  <p className="text-sm uppercase tracking-wider text-[#0B0B0B] mb-2">
                    Upload Portfolio Photo
                  </p>
                  <p className="text-xs text-[#6E6E6E]">You can skip this, but it's strongly suggested</p>
                </div>

                <button
                  onClick={() => setView('confirmation')}
                  className="w-full h-14 bg-[#111111] text-white uppercase tracking-wider text-sm hover:bg-[#0B0B0B] transition-all duration-300"
                >
                  Complete
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  };

  // Manufacturer Onboarding
  const renderManufacturerOnboarding = () => {
    const totalSteps = 4;
    
    return (
      <div className="min-h-screen bg-[#F7F7F5] flex items-center justify-center p-12">
        <div className="w-full max-w-2xl">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex gap-2 mb-4">
              {[...Array(totalSteps)].map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 transition-all duration-500 ${
                    i < onboardingStep ? 'bg-[#111111]' : 'bg-[#E6E6E3]'
                  }`}
                />
              ))}
            </div>
            <p className="text-xs uppercase tracking-wider text-[#6E6E6E]">
              Step {onboardingStep} of {totalSteps}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {/* Step 1: Manufacturer Identity */}
            {onboardingStep === 1 && (
              <motion.div
                key="mfg-step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-2xl text-[#0B0B0B] mb-8 tracking-tight">Manufacturer Identity</h2>
                
                <InputField
                  label="Factory Name"
                  value={manufacturerData.factoryName}
                  onChange={(e) => setManufacturerData({ ...manufacturerData, factoryName: e.target.value })}
                  required
                />

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <InputField
                    label="Country"
                    value={manufacturerData.country}
                    onChange={(e) => setManufacturerData({ ...manufacturerData, country: e.target.value })}
                    required
                  />
                  <InputField
                    label="City"
                    value={manufacturerData.city}
                    onChange={(e) => setManufacturerData({ ...manufacturerData, city: e.target.value })}
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-xs uppercase tracking-wider text-[#6E6E6E] mb-3">
                    Factory Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'garment', label: 'Garment Factory' },
                      { value: 'print', label: 'Print-on Factory' },
                      { value: 'tailor', label: 'Tailor' },
                      { value: 'multi', label: 'Multi-service Factory' }
                    ].map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => setManufacturerData({ ...manufacturerData, factoryType: type.value as any })}
                        className={`
                          py-3 border text-sm uppercase tracking-wider transition-all duration-300
                          ${manufacturerData.factoryType === type.value
                            ? 'border-[#111111] bg-[#111111] text-white'
                            : 'border-[#E6E6E3] text-[#6E6E6E] hover:border-[#111111]/40'
                          }
                        `}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setOnboardingStep(2)}
                  disabled={!manufacturerData.factoryName || !manufacturerData.country || !manufacturerData.city || !manufacturerData.factoryType}
                  className={`
                    w-full h-14 bg-[#111111] text-white uppercase tracking-wider text-sm mt-8
                    transition-all duration-300
                    ${(!manufacturerData.factoryName || !manufacturerData.country || !manufacturerData.city || !manufacturerData.factoryType)
                      ? 'opacity-30 cursor-not-allowed'
                      : 'hover:bg-[#0B0B0B]'
                    }
                  `}
                >
                  Continue
                </button>
              </motion.div>
            )}

            {/* Step 2: Capabilities */}
            {onboardingStep === 2 && (
              <motion.div
                key="mfg-step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-2xl text-[#0B0B0B] mb-8 tracking-tight">Capabilities</h2>
                
                {/* Garment Capabilities */}
                {(manufacturerData.factoryType === 'garment' || manufacturerData.factoryType === 'multi') && (
                  <div className="mb-6">
                    <label className="block text-xs uppercase tracking-wider text-[#6E6E6E] mb-3">
                      Garment Services
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {['Cutting', 'Stitching', 'Finishing', 'Pattern Making'].map((service) => (
                        <label key={service} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={manufacturerData.garmentCapabilities.includes(service)}
                            onChange={(e) => {
                              const caps = e.target.checked
                                ? [...manufacturerData.garmentCapabilities, service]
                                : manufacturerData.garmentCapabilities.filter(c => c !== service);
                              setManufacturerData({ ...manufacturerData, garmentCapabilities: caps });
                            }}
                            className="w-4 h-4 border-[#E6E6E3] accent-[#111111]"
                          />
                          <span className="text-sm text-[#0B0B0B]">{service}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Print Capabilities */}
                {(manufacturerData.factoryType === 'print' || manufacturerData.factoryType === 'multi') && (
                  <div className="mb-6">
                    <label className="block text-xs uppercase tracking-wider text-[#6E6E6E] mb-3">
                      Print Services
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {['DTG', 'Screen Print', 'Embroidery', 'Heat Transfer'].map((service) => (
                        <label key={service} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={manufacturerData.printCapabilities.includes(service)}
                            onChange={(e) => {
                              const caps = e.target.checked
                                ? [...manufacturerData.printCapabilities, service]
                                : manufacturerData.printCapabilities.filter(c => c !== service);
                              setManufacturerData({ ...manufacturerData, printCapabilities: caps });
                            }}
                            className="w-4 h-4 border-[#E6E6E3] accent-[#111111]"
                          />
                          <span className="text-sm text-[#0B0B0B]">{service}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tailor Capabilities */}
                {(manufacturerData.factoryType === 'tailor' || manufacturerData.factoryType === 'multi') && (
                  <div className="mb-6">
                    <label className="block text-xs uppercase tracking-wider text-[#6E6E6E] mb-3">
                      Tailoring Services
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {['Custom Fitting', 'Alteration', 'Luxury Finish', 'Made-to-Measure'].map((service) => (
                        <label key={service} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={manufacturerData.tailorCapabilities.includes(service)}
                            onChange={(e) => {
                              const caps = e.target.checked
                                ? [...manufacturerData.tailorCapabilities, service]
                                : manufacturerData.tailorCapabilities.filter(c => c !== service);
                              setManufacturerData({ ...manufacturerData, tailorCapabilities: caps });
                            }}
                            className="w-4 h-4 border-[#E6E6E3] accent-[#111111]"
                          />
                          <span className="text-sm text-[#0B0B0B]">{service}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setOnboardingStep(3)}
                  className="w-full h-14 bg-[#111111] text-white uppercase tracking-wider text-sm mt-8 hover:bg-[#0B0B0B] transition-all duration-300"
                >
                  Continue
                </button>
              </motion.div>
            )}

            {/* Step 3: Capacity */}
            {onboardingStep === 3 && (
              <motion.div
                key="mfg-step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-2xl text-[#0B0B0B] mb-8 tracking-tight">Capacity Basics</h2>
                
                <InputField
                  label="Monthly Production Capacity"
                  type="number"
                  value={manufacturerData.monthlyCapacity}
                  onChange={(e) => setManufacturerData({ ...manufacturerData, monthlyCapacity: e.target.value })}
                  required
                />

                <InputField
                  label="Minimum Order Quantity (MOQ)"
                  type="number"
                  value={manufacturerData.moq}
                  onChange={(e) => setManufacturerData({ ...manufacturerData, moq: e.target.value })}
                  required
                />

                <button
                  onClick={() => setOnboardingStep(4)}
                  disabled={!manufacturerData.monthlyCapacity || !manufacturerData.moq}
                  className={`
                    w-full h-14 bg-[#111111] text-white uppercase tracking-wider text-sm mt-8
                    transition-all duration-300
                    ${(!manufacturerData.monthlyCapacity || !manufacturerData.moq)
                      ? 'opacity-30 cursor-not-allowed'
                      : 'hover:bg-[#0B0B0B]'
                    }
                  `}
                >
                  Continue
                </button>
              </motion.div>
            )}

            {/* Step 4: Materials */}
            {onboardingStep === 4 && (
              <motion.div
                key="mfg-step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-2xl text-[#0B0B0B] mb-8 tracking-tight">Materials</h2>
                
                <div className="mb-6">
                  <label className="block text-xs uppercase tracking-wider text-[#6E6E6E] mb-3">
                    Fabrics Available
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Cotton', 'Polyester', 'Blends', 'Denim', 'Silk', 'Wool'].map((fabric) => (
                      <label key={fabric} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={manufacturerData.fabrics.includes(fabric)}
                          onChange={(e) => {
                            const fabrics = e.target.checked
                              ? [...manufacturerData.fabrics, fabric]
                              : manufacturerData.fabrics.filter(f => f !== fabric);
                            setManufacturerData({ ...manufacturerData, fabrics });
                          }}
                          className="w-4 h-4 border-[#E6E6E3] accent-[#111111]"
                        />
                        <span className="text-sm text-[#0B0B0B]">{fabric}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={manufacturerData.customMaterials}
                      onChange={(e) => setManufacturerData({ ...manufacturerData, customMaterials: e.target.checked })}
                      className="w-4 h-4 border-[#E6E6E3] accent-[#111111]"
                    />
                    <span className="text-sm text-[#0B0B0B]">Accept custom materials from clients</span>
                  </label>
                </div>

                <button
                  onClick={() => setView('confirmation')}
                  className="w-full h-14 bg-[#111111] text-white uppercase tracking-wider text-sm hover:bg-[#0B0B0B] transition-all duration-300"
                >
                  Complete
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  };

  // Confirmation Page
  const renderConfirmation = () => (
    <div className="min-h-screen bg-[#F7F7F5] flex items-center justify-center p-12">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="bg-[#FFFFFF] border border-[#E6E6E3] p-16 max-w-lg w-full text-center"
      >
        <div className="mb-12">
          <StarIcon className="w-16 h-16 text-[#111111] mx-auto" />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl tracking-tight text-[#0B0B0B] mb-12"
        >
          Are you ready to be a Black Star?
        </motion.h1>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={completeRegistration}
            className="h-14 bg-[#111111] text-white uppercase tracking-wider text-sm hover:bg-[#0B0B0B] transition-all duration-300"
          >
            Yes
          </button>
          <button
            onClick={() => navigate('welcome')}
            className="h-14 border border-[#E6E6E3] text-[#0B0B0B] uppercase tracking-wider text-sm hover:border-[#111111] transition-all duration-300"
          >
            No
          </button>
        </div>
      </motion.div>
    </div>
  );

  // Main Render Logic
  if (view === 'confirmation') {
    return renderConfirmation();
  }

  if (view === 'onboarding') {
    if (selectedRole === 'brand') return renderBrandOnboarding();
    if (selectedRole === 'model') return renderModelOnboarding();
    if (selectedRole === 'manufacturer') return renderManufacturerOnboarding();
  }

  return renderSignUpPage();
}