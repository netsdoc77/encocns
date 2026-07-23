import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getStorageData, ADMIN_USERS_KEY, initializeStorage } from '../../utils/storage';
import { RiEyeOffLine, RiEyeLine, RiArrowLeftSLine } from '@remixicon/react';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    initializeStorage();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const users = getStorageData(ADMIN_USERS_KEY);
    const user = users.find((u: any) => u.username === username && u.password === password);

    if (user) {
      sessionStorage.setItem('admin_session', JSON.stringify(user));
      navigate('/admin/dashboard');
    } else {
      setError('아이디 또는 비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <div id="admin-root" className="min-h-screen w-full flex font-sans bg-white">
      {/* Left Side - Blue Branding */}
      <div className="hidden lg:flex flex-col w-1/2 bg-[#5452F6] items-end justify-center pr-24 relative">
        <button 
          onClick={() => navigate('/')} 
          className="absolute top-8 left-8 flex items-center text-white/80 font-medium hover:text-white transition-colors"
        >
          <RiArrowLeftSLine size={24} />
          Home page
        </button>
        
        {/* Logo */}
        <div className="flex items-center justify-center">
          <img 
            src={`${import.meta.env.BASE_URL}logo.png`} 
            alt="ENCOCNS Logo" 
            className="w-48 brightness-0 invert" 
          />
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start justify-center p-8 md:p-12 lg:pl-24 relative bg-white">
        <button 
          onClick={() => navigate('/')} 
          className="lg:hidden absolute top-8 left-8 flex items-center text-slate-500 font-medium hover:text-slate-700 transition-colors"
        >
          <RiArrowLeftSLine size={24} />
          Home
        </button>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-10">
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="ENCOCNS Logo" className="h-10" />
          </div>

          <div className="text-left mb-8">
            <h2 className="text-3xl font-black text-slate-800 mb-2">Sign in</h2>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-50 text-red-500 text-sm rounded-lg text-center font-medium border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full px-4 py-3 rounded border border-slate-200 focus:outline-none focus:border-[#5452F6] focus:ring-1 focus:ring-[#5452F6] transition-all text-sm placeholder:text-slate-400 text-slate-800 bg-white"
                required
              />
            </div>

            <div>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-4 py-3 rounded border border-slate-200 focus:outline-none focus:border-[#5452F6] focus:ring-1 focus:ring-[#5452F6] transition-all text-sm placeholder:text-slate-400 text-slate-800 bg-white"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <RiEyeLine size={18} /> : <RiEyeOffLine size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <button type="button" className="text-xs text-[#5452F6] font-medium hover:underline">
                Forgot password?
              </button>
              <button 
                type="submit" 
                className="px-8 py-3 bg-[#5452F6] hover:bg-[#4338ca] text-white rounded font-bold text-sm transition-all"
              >
                Sign in
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
