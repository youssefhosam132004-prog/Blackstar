import React, { useState } from 'react';
import { useApp } from '../App';
import Logo from '../imports/Logo';
import { motion } from 'motion/react';
import { Star, ArrowLeft } from 'lucide-react';

export function LoginPage() {
  const { navigate, setUser } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'customer' | 'model' | 'brand' | 'manufacturer'>('customer');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate loading for "calm power" feel
    setTimeout(() => {
      // Simple demo login
      setUser({
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: name || email.split('@')[0], // Use entered name or fallback to email
        role: selectedRole,
      });
      
      // Route to appropriate dashboard based on role
      if (selectedRole === 'manufacturer') {
        navigate('manufacturer-dashboard');
      } else if (selectedRole === 'brand') {
        navigate('localbrand-dashboard');
      } else {
        navigate('home');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0B0D10] flex overflow-hidden">
      {/* LEFT SIDE - CONTENT */}
      <div className="w-full lg:w-1/2 flex flex-col p-12 lg:p-24 justify-center relative z-10 bg-white">
        {/* Back Button */}
        <button
          onClick={() => navigate('welcome')}
          className="absolute top-8 left-8 flex items-center gap-2 text-[#0B0D10]/60 hover:text-[#0B0D10] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm uppercase tracking-wider">Back to Home</span>
        </button>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-md w-full mx-auto"
        >
          {/* Logo */}
          <div className="w-12 h-12 mb-12 text-[#0B0D10]">
            <Logo showText={false} />
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-2 tracking-tight">
            Welcome back.
          </h1>
          <p className="text-[#364153] text-sm tracking-widest uppercase mb-12">
            Enter the system.
          </p>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-8">
            <div className="group">
              <label className="block text-xs font-bold text-[#0B0D10] uppercase tracking-widest mb-2 group-focus-within:text-[#E6C36A] transition-colors">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent border-b border-[#0B0D10]/20 py-3 text-[#0B0D10] placeholder-transparent focus:outline-none focus:border-[#0B0D10] transition-all rounded-none"
                placeholder="Name"
                required
              />
            </div>

            <div className="group">
              <label className="block text-xs font-bold text-[#0B0D10] uppercase tracking-widest mb-2 group-focus-within:text-[#E6C36A] transition-colors">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-[#0B0D10]/20 py-3 text-[#0B0D10] placeholder-transparent focus:outline-none focus:border-[#0B0D10] transition-all rounded-none"
                placeholder="Email"
                required
              />
            </div>

            <div className="group">
              <label className="block text-xs font-bold text-[#0B0D10] uppercase tracking-widest mb-2 group-focus-within:text-[#E6C36A] transition-colors">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-[#0B0D10]/20 py-3 text-[#0B0D10] placeholder-transparent focus:outline-none focus:border-[#0B0D10] transition-all rounded-none"
                placeholder="Password"
                required
              />
            </div>

            <div className="group">
              <label className="block text-xs font-bold text-[#0B0D10] uppercase tracking-widest mb-2 group-focus-within:text-[#E6C36A] transition-colors">
                Role
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as 'customer' | 'model' | 'brand' | 'manufacturer')}
                className="w-full bg-transparent border-b border-[#0B0D10]/20 py-3 text-[#0B0D10] placeholder-transparent focus:outline-none focus:border-[#0B0D10] transition-all rounded-none"
                required
              >
                <option value="customer">Customer</option>
                <option value="model">Model</option>
                <option value="brand">Brand</option>
                <option value="manufacturer">Manufacturer</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0B0D10] text-white h-14 mt-8 flex items-center justify-center relative overflow-hidden group hover:shadow-lg transition-all duration-500"
            >
              {isLoading ? (
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="absolute bottom-0 left-0 h-[2px] bg-[#E6C36A]"
                />
              ) : (
                <>
                  <span className="relative z-10 font-medium tracking-[0.2em] text-sm uppercase group-hover:text-[#E6C36A] transition-colors duration-300">Log In</span>
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#E6C36A] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-[#364153] text-xs">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('register')}
                className="text-[#0B0D10] font-bold underline hover:text-[#E6C36A] transition-colors ml-1"
              >
                Sign up
              </button>
            </p>
          </div>
        </motion.div>
      </div>

      {/* RIGHT SIDE - AESTHETIC */}
      <div className="hidden lg:block w-1/2 bg-[#0B0D10] relative overflow-hidden">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1a1d23] via-[#0B0D10] to-[#0B0D10]"></div>
         <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="w-[800px] h-[800px] border border-[#E6C36A] rounded-full animate-[spin_60s_linear_infinite]"></div>
            <div className="w-[600px] h-[600px] border border-[#E6C36A] rounded-full absolute animate-[spin_40s_linear_infinite_reverse] flex items-center justify-center">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              >
                <Star 
                  className="w-16 h-16 text-[#E6C36A] fill-[#E6C36A]" 
                  style={{
                    filter: 'drop-shadow(0 0 20px rgba(230, 195, 106, 0.8))'
                  }}
                />
              </motion.div>
            </div>
         </div>
      </div>
    </div>
  );
}