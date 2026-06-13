import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Awards from './components/Awards';
import SmartGovAI from './components/SmartGovAI';
import CmsAdmin from './components/CmsAdmin';
import OtherPages from './components/OtherPages';
import { Project, NewsItem, SOPDocument, GalleryItem, AwardItem, ContactSubmission } from './types';
import { Landmark, ArrowRight, ShieldCheck, Mail, Globe, Settings, Scale } from 'lucide-react';
import { IctLogo } from './components/IctLogo';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [logoError, setLogoError] = useState<boolean>(false);

  // States loaded from local file storage backend APIs
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const [awardsList, setAwardsList] = useState<AwardItem[]>([]);

  // Toggle Dark Theme with standard document.documentElement tags
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Synchronize base assets from native API
  const fetchBaseData = async () => {
    try {
      const pRes = await fetch('/api/cms/projects');
      const pData = await pRes.json();
      setProjectsList(pData || []);

      const aRes = await fetch('/api/cms/awards');
      const aData = await aRes.json();
      setAwardsList(aData || []);
    } catch (e) {
      console.error(" handshaking standard backend endpoints", e);
    }
  };

  useEffect(() => {
    fetchBaseData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50/50 text-slate-800 transition-colors duration-300 dark:bg-slate-950 dark:text-gray-100" id="main-app-shell">
      
      {/* 1. STATE EXECUTIVE HEADER HEADER MENU */}
      <Navigation 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenAdmin={() => setCurrentPage(currentPage === 'admin' ? 'home' : 'admin')}
      />

      {/* 2. DYNAMIC MAIN CONTENTS STAGE */}
      <main className="flex-grow mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-12" id="main-content-flow">
        
        {currentPage === 'home' && (
          <Home setCurrentPage={setCurrentPage} projects={projectsList} />
        )}

        {currentPage === 'legacy' && (
          <About />
        )}

        {currentPage === 'projects' && (
          <Projects projects={projectsList} />
        )}

        {currentPage === 'awards' && (
          <Awards awards={awardsList} />
        )}

        {currentPage === 'portal' && (
          <SmartGovAI />
        )}

        {currentPage === 'admin' && (
          <CmsAdmin onClose={() => setCurrentPage('home')} />
        )}

        {/* Subsidiary screen pages map */}
        {(currentPage === 'gallery' || 
          currentPage === 'news' || 
          currentPage === 'sops' || 
          currentPage === 'ecosystem' || 
          currentPage === 'careers' || 
          currentPage === 'contact' || 
          currentPage === 'privacy' || 
          currentPage === 'terms') && (
            <OtherPages 
              pageType={currentPage as any} 
              onRefreshData={fetchBaseData}
            />
        )}

      </main>

      {/* 3. PREMIUM DESIGNER SOVEREIGN FOOTER FOOTER */}
      <footer className="bg-slate-950 text-white border-t border-slate-900/40 py-16" id="state-portal-footer">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Branding Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 flex items-center justify-center overflow-hidden bg-transparent">
                  <IctLogo size={32} />
                </div>
                <span className="font-extrabold text-sm tracking-tight">Anambra State ICT Agency</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-semibold">
                Anambra State ICT Agency is Nigeria's premier subnational AI-native transformational agency enforcing modern technological sovereignty.
              </p>
              <div className="pt-2" id="footer-social-container">
                <span className="text-[10px] uppercase tracking-widest text-[#ffcf00] font-extrabold block mb-3">Connect With Us</span>
                <div id="footer-social-links" className="flex items-center gap-2.5">
                  <a 
                    href="https://www.facebook.com/share/1P3pu5xVGT/?mibextid=wwXIfr" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    id="fb-link"
                    className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-450 text-slate-400 hover:text-white hover:bg-blue-600 hover:border-blue-500 hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg"
                    title="Facebook"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>
                  <a 
                    href="https://www.linkedin.com/company/andoticta/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    id="linkedin-link"
                    className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-450 text-slate-400 hover:text-white hover:bg-[#0077b5] hover:border-[#0077b5] hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg"
                    title="LinkedIn"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                  <a 
                    href="https://x.com/andoticta?s=21" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    id="x-link"
                    className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-450 text-slate-400 hover:text-white hover:bg-black hover:border-slate-700 hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg"
                    title="X"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a 
                    href="https://www.instagram.com/andoticta?igsh=MXkwdzZ4aXY0a3N3NA==" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    id="instagram-link"
                    className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-450 text-slate-400 hover:text-white hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:border-transparent hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg"
                    title="Instagram"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </a>
                  <a 
                    href="https://www.tiktok.com/@anambrastateictagency?_r=1&_t=ZS-97BGNS94pAP" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    id="tiktok-link"
                    className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-450 text-slate-400 hover:text-white hover:bg-[#010101] hover:border-[#ff0050] hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg"
                    title="TikTok"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.6-4.06-1.4-.77-.56-1.39-1.29-1.85-2.11v7.1c0 2.23-.74 4.47-2.22 6.13-1.63 1.83-4.14 2.75-6.57 2.5-2.73-.24-5.26-1.88-6.42-4.38C.1 15.52-.3 12.64.21 9.87c.48-2.67 2.24-5.06 4.75-6.17 1.25-.56 2.62-.82 3.98-.81v4.03c-1.24-.12-2.52.26-3.48 1.09-.94.81-1.41 2.05-1.34 3.28.09 1.48.91 2.87 2.22 3.52.92.48 2.0.58 3.02.3 1.12-.29 2.05-1.14 2.45-2.18.21-.55.28-1.15.28-1.74V.02z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Core directories */}
            <div className="space-y-3">
              <h4 className="font-extrabold text-[#ffcf00] text-xs uppercase tracking-wider">Services Drawer</h4>
              <div className="flex flex-col gap-2 text-[11px] text-slate-300 font-bold">
                <button onClick={() => setCurrentPage('projects')} className="text-left hover:text-white cursor-pointer">Official Projects List</button>
                <button onClick={() => setCurrentPage('sops')} className="text-left hover:text-white cursor-pointer">Standards Directives (SOPs)</button>
                <button onClick={() => setCurrentPage('news')} className="text-left hover:text-white cursor-pointer">Media & Press Bulletin</button>
                <button onClick={() => setCurrentPage('portal')} className="text-left hover:text-white cursor-pointer">SmartGov AI Assistant</button>
              </div>
            </div>

            {/* General policies */}
            <div className="space-y-3">
              <h4 className="font-extrabold text-[#ffcf00] text-xs uppercase tracking-wider">Subnational Guild</h4>
              <div className="flex flex-col gap-2 text-[11px] text-slate-300 font-semibold">
                <button onClick={() => setCurrentPage('ecosystem')} className="text-left hover:text-white cursor-pointer">Innovation Ecosystem</button>
                <button onClick={() => setCurrentPage('careers')} className="text-left hover:text-white cursor-pointer font-bold">Live Opportunities / Careers</button>
                <button onClick={() => setCurrentPage('privacy')} className="text-left hover:text-white cursor-pointer">Privacy Framework</button>
                <button onClick={() => setCurrentPage('terms')} className="text-left hover:text-white cursor-pointer">Terms of System Use</button>
              </div>
            </div>

            {/* Administration portal */}
            <div className="space-y-3">
              <h4 className="font-extrabold text-[#ffcf00] text-xs uppercase tracking-wider">Command Node</h4>
              <div className="space-y-2">
                <p className="text-[10px] text-slate-450 text-slate-400">Manage state catalogs and retrieve inbox submissions securely:</p>
                <button 
                  onClick={() => setCurrentPage('admin')}
                  className="w-full h-9 bg-slate-900 hover:bg-slate-800 text-xs font-black text-[#ffcf00] border border-slate-800 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Settings size={12} />
                  <span>Administrative CMS</span>
                </button>
              </div>
            </div>

          </div>

          {/* Legal and state ribbons */}
          <div className="border-t border-slate-900 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-slate-500 font-bold">
            <div className="flex items-center gap-2">
              <Landmark size={12} className="text-[#ffcf50]" />
              <span>© {new Date().getFullYear()} Anambra State Government • Developed by Anambra State ICT Agency</span>
            </div>
            
            <div className="flex gap-4">
              <button onClick={() => setCurrentPage('privacy')} className="hover:text-white">Privacy</button>
              <span>•</span>
              <button onClick={() => setCurrentPage('terms')} className="hover:text-white">Terms</button>
              <span>•</span>
              <span className="text-emerald-400 flex items-center gap-1">🟢 Sovereign Operations Node Operational</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
