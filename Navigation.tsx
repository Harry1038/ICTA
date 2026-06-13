import React, { useState } from 'react';
import { Sun, Moon, Sparkles, Menu, X, Landmark, Terminal, Settings } from 'lucide-react';
import { IctLogo } from './IctLogo';

interface NavigationProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  onOpenAdmin: () => void;
}

export default function Navigation({
  currentPage,
  setCurrentPage,
  darkMode,
  setDarkMode,
  onOpenAdmin
}: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  // Pages configured in the requested structure
  const mainNavItems = [
    { id: 'home', label: 'Home' },
    { id: 'legacy', label: 'Our Legacy' },
    { id: 'projects', label: 'Our Projects' },
    { id: 'awards', label: 'Awards & Honours' },
    { id: 'sops', label: 'SOPs' },
    { id: 'portal', label: 'SmartGov AI' },
  ];

  const moreNavItems = [
    { id: 'gallery', label: 'Media Gallery' },
    { id: 'news', label: 'Newsroom' },
    { id: 'ecosystem', label: 'Innovation Ecosystem' },
    { id: 'careers', label: 'Careers' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const allPages = [...mainNavItems, ...moreNavItems];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/80 bg-white/90 backdrop-blur-md transition-colors duration-300 dark:border-slate-800/80 dark:bg-slate-950/90" id="main-header">
      {/* State heartbeats & Government Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-[#1877f2] to-[#ffcf00] text-white text-[10px] md:text-xs py-1 px-4 flex justify-between items-center font-medium">
        <div className="flex items-center gap-2">
          <Landmark size={12} />
          <span>🏆 3-Time Consecutive National Innovation & Technology Champion (NCCIDE) • Official Website of the Anambra State ICT Agency</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 grayscale" title="Federal Republic of Nigeria">
            🇳🇬 <span>Nigeria</span>
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Sovereign Cloud Active</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Official Premium Gear & Circuit Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer select-none" 
            onClick={() => setCurrentPage('home')}
            id="brand-logo"
          >
            <div className="relative flex items-center justify-center w-16 h-16 bg-transparent">
              <IctLogo size={56} />
            </div>
            <div className="flex flex-col flex-shrink-0">
              <span className="text-base font-black tracking-tight text-slate-900 dark:text-white leading-none">
                Anambra State
              </span>
              <span className="text-[10px] font-bold tracking-widest text-[#1877f2] dark:text-[#ffcf00] uppercase mt-1">
                ICT Agency
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {mainNavItems.map((item) => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => setCurrentPage(item.id)}
                className={`relative px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                  currentPage === item.id
                    ? 'text-blue-600 bg-blue-50/80 dark:text-[#ffcf00] dark:bg-slate-900/80'
                    : 'text-slate-600 hover:text-blue-600 hover:bg-gray-50 dark:text-slate-300 dark:hover:text-[#ffcf00] dark:hover:bg-slate-900/50'
                }`}
              >
                {item.id === 'portal' && (
                  <Sparkles size={12} className="inline-block mr-1 text-[#ffcf00] animate-pulse" />
                )}
                {item.label}
                {currentPage === item.id && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-0.5 bg-blue-600 dark:bg-[#ffcf00] rounded" />
                )}
              </button>
            ))}

            {/* Premium dropdown for more pages */}
            <div className="relative group px-1">
              <button className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg text-slate-600 hover:text-blue-600 hover:bg-gray-50 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-900/50">
                <span>Ecosystem & More</span>
                <span className="text-[10px] transform group-hover:rotate-180 transition-transform duration-200">▼</span>
              </button>
              <div className="absolute right-0 top-full hidden group-hover:block w-56 rounded-xl border border-gray-100 bg-white p-2 shadow-2xl animate-fade-in-down dark:border-slate-800 dark:bg-slate-900">
                {moreNavItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id)}
                    className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      currentPage === item.id
                        ? 'text-blue-600 bg-blue-50 dark:text-[#ffcf00] dark:bg-slate-800'
                        : 'text-slate-700 hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </nav>

          {/* Nav Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Interactive Live Smart Portal AI Agent CTA */}
            <button
               id="nav-cta-ai"
               onClick={() => setCurrentPage('portal')}
               className="relative overflow-hidden group flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-[#1877f2] to-blue-700 hover:to-blue-600 px-4 py-2 text-xs font-black text-white hover:shadow-[#1877f2]/20 hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <Sparkles size={14} className="text-[#ffcf00] animate-bounce" />
              <span>SmartGov AI</span>
            </button>

            {/* Direct CMS Admin Access Dashboard Link */}
            <button
               id="nav-admin-btn"
               onClick={onOpenAdmin}
               className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-slate-600 hover:text-slate-900 bg-white border-gray-200 hover:bg-gray-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 transition-all duration-200 cursor-pointer ${
                 currentPage === 'admin' ? 'ring-2 ring-[#ffcf00]' : ''
               }`}
               title="Administrative CMS Toggle"
            >
               <Settings size={14} className="text-[#ffcf00]" />
               <span className="text-xs font-bold whitespace-nowrap">Admin CMS</span>
            </button>

            {/* Light/Dark Mode Switcher */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              id="theme-toggler"
              className="flex items-center justify-center p-2 rounded-lg border bg-white border-gray-200 hover:bg-gray-100 dark:border-slate-800 dark:bg-slate-900 text-[#ffcf00] dark:text-[#ffcf00] transition-colors duration-200 cursor-pointer"
              title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <Sun size={18} className="text-[#ffcf00]" /> : <Moon size={18} className="text-slate-600" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center justify-center p-2.5 rounded-lg border bg-white border-gray-200 text-[#ffcf00] dark:border-slate-800 dark:bg-slate-900"
            >
              {darkMode ? <Sun size={18} className="text-[#ffcf00]" /> : <Moon size={18} className="text-slate-600" />}
            </button>
            <button
              onClick={onOpenAdmin}
              className="flex items-center justify-center p-2.5 rounded-lg border bg-white border-gray-200 text-slate-600 dark:border-slate-800 dark:bg-slate-900"
            >
              <Settings size={18} />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 dark:text-white"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md px-4 py-4 space-y-2 dark:border-slate-800 dark:bg-slate-950/95" id="mobile-drawer">
          <div className="grid grid-cols-2 gap-2 pb-4 border-b border-gray-100 dark:border-slate-800">
            {allPages.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2.5 text-xs font-bold rounded-lg ${
                  currentPage === item.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-50 text-slate-800 hover:bg-gray-100 dark:bg-slate-900 dark:text-slate-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setCurrentPage('portal');
                setMobileMenuOpen(false);
              }}
              className="w-full h-11 flex items-center justify-center gap-2 rounded-lg bg-blue-600 text-white font-bold text-sm"
            >
              <Sparkles size={16} className="text-[#ffcf00]" />
              <span>Launch SmartGov AI</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
