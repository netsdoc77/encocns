import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { RiUserSettingsLine, RiFolder3Line, RiNewspaperLine, RiBriefcase4Line, RiLogoutBoxRLine, RiMessage3Line } from '@remixicon/react';
import AdminUsers from './components/AdminUsers';
import AdminProjects from './components/AdminProjects';
import AdminNews from './components/AdminNews';
import AdminCareers from './components/AdminCareers';
import AdminInquiries from './components/AdminInquiries';
import { initializeStorage } from '../../utils/storage';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState(sessionStorage.getItem('admin_active_tab') || 'users');
  const [adminUser, setAdminUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check session
    const session = sessionStorage.getItem('admin_session');
    if (!session) {
      navigate('/admin');
      return;
    }
    setAdminUser(JSON.parse(session));
    initializeStorage(); // Ensure mock data is loaded
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('admin_session');
    sessionStorage.removeItem('admin_active_tab');
    navigate('/admin');
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    sessionStorage.setItem('admin_active_tab', tabId);
  };

  const navItems = [
    { id: 'users', label: '사용자 관리', icon: <RiUserSettingsLine size={20} /> },
    { id: 'projects', label: '프로젝트 관리', icon: <RiFolder3Line size={20} /> },
    { id: 'news', label: '뉴스 관리', icon: <RiNewspaperLine size={20} /> },
    { id: 'careers', label: '채용 관리', icon: <RiBriefcase4Line size={20} /> },
    { id: 'inquiries', label: '문의 관리', icon: <RiMessage3Line size={20} /> },
  ];

  if (!adminUser) return null;

  return (
    <div id="admin-root" className="flex h-screen bg-slate-50 text-slate-800 font-sans overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-[#5452F6] text-white flex flex-col shadow-2xl z-20">
        <div 
          className="h-20 flex items-center justify-center border-b border-white/10 cursor-pointer"
          onClick={() => handleTabChange('users')}
        >
          <div className="h-7 overflow-hidden flex items-start">
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="ENCOCNS Logo" className="w-40 h-auto brightness-0 invert origin-top-left" />
          </div>
        </div>
        
        <div className="px-6 py-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 text-white rounded-full flex items-center justify-center font-bold text-lg">
              {adminUser.username.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="text-sm font-bold">{adminUser.name}</div>
              <div className="text-xs text-white/70">{adminUser.role}</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === item.id 
                  ? 'bg-white/20 text-white shadow-lg shadow-black/10' 
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all"
          >
            <RiLogoutBoxRLine size={20} />
            로그아웃
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto bg-slate-50 relative">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center px-10 sticky top-0 z-10">
          <h2 className="text-2xl font-bold text-slate-800">
            {navItems.find(i => i.id === activeTab)?.label}
          </h2>
        </header>

        <main className="p-10">
          <AnimatePresence mode="wait">
            {activeTab === 'users' && (
              <motion.div key="users" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                <AdminUsers />
              </motion.div>
            )}
            {activeTab === 'projects' && (
              <motion.div key="projects" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                <AdminProjects />
              </motion.div>
            )}
            {activeTab === 'news' && (
              <motion.div key="news" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                <AdminNews />
              </motion.div>
            )}
            {activeTab === 'careers' && (
              <motion.div key="careers" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                <AdminCareers />
              </motion.div>
            )}
            {activeTab === 'inquiries' && (
              <motion.div key="inquiries" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                <AdminInquiries />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
