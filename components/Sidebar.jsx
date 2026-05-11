
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { View } from '../types';

const Sidebar = ({ activeView, setActiveView, user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  // Local state to show update immediately without full app reload if desired.
  const [localImage, setLocalImage] = useState(null);

  const fileInputRef = useRef(null);

  const navItems = [
    { id: View.DASHBOARD, label: 'Dashboard', icon: 'grid_view' },
    { id: View.TRENDS, label: 'Trends', icon: 'trending_up' },
    { id: View.GOALS, label: 'Goals', icon: 'track_changes' },
    { id: View.ACTIVITY, label: 'Activity', icon: 'local_fire_department' },
    { id: View.SERVICES, label: 'Services', icon: 'spa' },
    { id: View.PHILOSOPHY, label: 'Philosophy', icon: 'psychology' },
    { id: View.EXPERIENCE, label: 'Experience', icon: 'history_edu' },
    { id: View.SETTINGS, label: 'Settings', icon: 'settings' },
  ];

  const handleProfileClick = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleUploadClick = () => {
    setIsProfileMenuOpen(false);
    fileInputRef.current?.click();
  };

  const handleSettingsClick = () => {
    setIsProfileMenuOpen(false);
    setActiveView(View.SETTINGS);
    setIsOpen(false);
  };

  const handleLogout = () => {
    window.location.reload();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('avatar', file);
    formData.append('email', user.email);

    try {
      const response = await fetch('http://localhost:5000/api/user/upload-avatar', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setLocalImage(data.imageUrl);
      } else {
        alert('Failed to upload image: ' + data.message);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image');
    } finally {
      setIsUploading(false);
    }
  };

  const renderSidebarContent = () => (
    <div className="h-full flex flex-col p-6 relative">
      <div className="flex items-center gap-3 mb-10 px-2">
        <img src="/logo.png" alt="WellnessSynergy Logo" className="w-10 h-10 object-contain" />
        <span className="text-xl font-bold tracking-tight text-primary">WellnessSynergy</span>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              console.log('Sidebar item clicked:', item.id);
              setActiveView(item.id);
              console.log('setActiveView called with:', item.id);
              setIsOpen(false);
            }}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group relative ${activeView === item.id
              ? 'bg-primary/10 text-primary font-semibold'
              : 'text-slate-500 hover:bg-white/5 hover:text-slate-200'
              }`}
          >
            {activeView === item.id && (
              <motion.div
                layoutId="sidebar-active"
                className="absolute left-0 w-1 h-6 bg-primary rounded-r-full"
              />
            )}
            <span className={`material-symbols-outlined text-[22px] transition-transform duration-300 group-hover:scale-110 ${activeView === item.id ? 'text-primary' : 'text-slate-500'
              }`}>
              {item.icon}
            </span>
            <span className="text-sm tracking-wide">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/5 relative">
        <AnimatePresence>
          {isProfileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute bottom-full left-0 w-full mb-3 bg-brand-900 border border-white/10 rounded-2xl shadow-xl overflow-hidden z-50 p-1"
            >
              <button onClick={handleSettingsClick} className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-white/5 rounded-xl text-sm font-medium text-slate-300 hover:text-white transition-colors">
                <span className="material-symbols-outlined text-lg">settings</span>
                View Profile
              </button>
              <button onClick={handleUploadClick} className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-white/5 rounded-xl text-sm font-medium text-slate-300 hover:text-white transition-colors">
                <span className="material-symbols-outlined text-lg">upload</span>
                Upload Photo
              </button>
              <div className="h-px bg-white/5 my-1" />
              <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-red-500/10 rounded-xl text-sm font-medium text-rose-500 transition-colors">
                <span className="material-symbols-outlined text-lg">logout</span>
                Log Out
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="glass p-4 rounded-2xl flex items-center gap-4 hover:bg-white/5 transition-colors cursor-pointer group relative" onClick={handleProfileClick}>
          <div className="relative">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
            {isUploading ? (
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <span className="material-symbols-outlined animate-spin text-xs">progress_activity</span>
              </div>
            ) : (
              <img
                src={localImage || user?.profileImage || "https://picsum.photos/id/64/100/100"}
                alt={user?.name || "User"}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all"
              />
            )}
            <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 border-2 border-brand-950 rounded-full flex items-center justify-center ${isUploading ? 'bg-orange-500' : 'bg-green-500'}`}>
              <span className="material-symbols-outlined text-[8px] text-white font-bold">{isProfileMenuOpen ? 'close' : 'expand_less'}</span>
            </div>
          </div>
          <div className="overflow-hidden flex-1">
            <p className="text-sm font-bold truncate group-hover:text-primary transition-colors">{user?.name || 'User'}</p>
            <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">Premium Member</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-brand-950/80 backdrop-blur-xl border-b border-white/5 z-40 flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
         <img src="/logo.png" alt="WellnessSynergy Logo" className="w-8 h-8 object-contain" />
          <span className="text-lg font-bold tracking-tight text-primary">WellnessSynergy</span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg bg-white/5 text-slate-300"
        >
          <span className="material-symbols-outlined">
            {isOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      <aside className="fixed top-0 left-0 bottom-0 w-64 bg-brand-950/50 border-r border-white/5 hidden lg:block z-30">
        {renderSidebarContent()}
      </aside>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-brand-950 z-50 lg:hidden shadow-2xl"
            >
              {renderSidebarContent()}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
