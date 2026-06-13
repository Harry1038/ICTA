import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Settings, 
  Trash2, 
  Plus, 
  Edit3, 
  Mail, 
  Check, 
  X, 
  FileText, 
  Sparkles, 
  FolderGit, 
  CloudLightning, 
  Info,
  Calendar,
  Layers,
  CheckCircle,
  Clock,
  Play,
  Film,
  Upload,
  Download
} from 'lucide-react';
import { Project, NewsItem, SOPDocument, GalleryItem, ContactSubmission, SystemStats, NewsletterSubscriber } from '../types';
import { IctLogo } from './IctLogo';

interface CmsAdminProps {
  onClose: () => void;
}

export default function CmsAdmin({ onClose }: CmsAdminProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim().toLowerCase() === 'admin' && password === 'anambra') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid credentials or unauthorized signature.');
    }
  };

  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'news' | 'sops' | 'contacts' | 'gallery' | 'subscribers'>('overview');
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [sops, setSops] = useState<SOPDocument[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);

  // Gallery CRUD states
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [gTitle, setGTitle] = useState('');
  const [gCategory, setGCategory] = useState<'Events' | 'Infrastructure' | 'Ecosystem' | 'Awards'>('Events');
  const [gImageUrl, setGImageUrl] = useState('');
  const [gVideoUrl, setGVideoUrl] = useState('');
  const [gMediaType, setGMediaType] = useState<'image' | 'video'>('image');
  const [gDesc, setGDesc] = useState('');
  const [gEditingId, setGEditingId] = useState<string | null>(null);
  const [gFileLoading, setGFileLoading] = useState(false);
  const [gFileUploadName, setGFileUploadName] = useState('');

  // Project item form creation states
  const [pTitle, setPTitle] = useState('');
  const [pCategory, setPCategory] = useState('Digital Infrastructure');
  const [pDesc, setPDesc] = useState('');
  const [pHighlights, setPHighlights] = useState('');
  const [pEditingId, setPEditingId] = useState<string | null>(null);

  // News form states
  const [nTitle, setNTitle] = useState('');
  const [nCategory, setNCategory] = useState('Press Release');
  const [nSummary, setNSummary] = useState('');
  const [nContent, setNContent] = useState('');
  const [nImage, setNImage] = useState('');
  const [nEditingId, setNEditingId] = useState<string | null>(null);

  // SOP form states
  const [sTitle, setSTitle] = useState('');
  const [sCategory, setSCategory] = useState('Digital Security');
  const [sVersion, setSVersion] = useState('1.0.0');
  const [sSize, setSSize] = useState('1.1 MB');

  // Load everything
  const fetchAllData = async () => {
    try {
      const statsRes = await fetch('/api/cms/stats');
      const statsData = await statsRes.json();
      setStats(statsData);

      const projRes = await fetch('/api/cms/projects');
      const projData = await projRes.json();
      setProjects(projData);

      const newsRes = await fetch('/api/cms/news');
      const newsData = await newsRes.json();
      setNews(newsData);

      const sopsRes = await fetch('/api/cms/sops');
      const sopsData = await sopsRes.json();
      setSops(sopsData);

      const contactRes = await fetch('/api/cms/contacts');
      const contactData = await contactRes.json();
      setContacts(contactData);

      const galleryRes = await fetch('/api/cms/gallery');
      const galleryData = await galleryRes.json();
      setGallery(galleryData);

      const subRes = await fetch('/api/cms/subscribers');
      const subData = await subRes.json();
      setSubscribers(subData);
    } catch (e) {
      console.error("handshake error loading cms logs", e);
    }
  };

  const handleExportCSV = () => {
    try {
      if (subscribers.length === 0) {
        alert("No subscribers found to download.");
        return;
      }
      // Generate CSV content using robust Blob formulation
      const headers = ["ID", "Email Address", "Subscribed At"];
      const rows = subscribers.map(sub => [
        `"${sub.id}"`,
        `"${sub.email}"`,
        `"${new Date(sub.subscribedAt).toISOString()}"`
      ]);
      
      const csvLines = [headers.join(","), ...rows.map(e => e.join(","))];
      const csvContent = csvLines.join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `anambra_state_ict_agency_newsletter_subscribers_${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to download CSV", err);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [activeTab]);

  // Project actions
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pTitle || !pCategory || !pDesc) return;
    try {
      const res = await fetch('/api/cms/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: pEditingId,
          title: pTitle,
          category: pCategory,
          description: pDesc,
          highlights: pHighlights
        })
      });
      if (res.ok) {
        setPTitle('');
        setPDesc('');
        setPHighlights('');
        setPEditingId(null);
        setActiveTab('projects');
        fetchAllData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to retire this project?")) return;
    try {
      const res = await fetch(`/api/cms/projects/${id}`, { method: 'DELETE' });
      if (res.ok) fetchAllData();
    } catch (error) {
      console.error(error);
    }
  };

  // News actions
  const handleSaveNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nTitle || !nCategory || !nSummary || !nContent) return;
    try {
      const res = await fetch('/api/cms/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: nEditingId,
          title: nTitle,
          category: nCategory,
          summary: nSummary,
          content: nContent,
          image: nImage
        })
      });
      if (res.ok) {
        setNTitle('');
        setNSummary('');
        setNContent('');
        setNImage('');
        setNEditingId(null);
        fetchAllData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteNews = async (id: string) => {
    if (!confirm("Remove this press release?")) return;
    try {
      const res = await fetch(`/api/cms/news/${id}`, { method: 'DELETE' });
      if (res.ok) fetchAllData();
    } catch (error) {
      console.error(error);
    }
  };

  // SOP Actions
  const handleSaveSop = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sTitle || !sCategory) return;
    try {
      const res = await fetch('/api/cms/sops', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: sTitle,
          category: sCategory,
          version: sVersion,
          fileSize: sSize
        })
      });
      if (res.ok) {
        setSTitle('');
        setSVersion('1.0.0');
        setSSize('1.1 MB');
        fetchAllData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteSop = async (id: string) => {
    try {
      await fetch(`/api/cms/sops/${id}`, { method: 'DELETE' });
      fetchAllData();
    } catch (e) {
      console.error(e);
    }
  };

  // Inbox Status
  const handleToggleInbox = async (id: string, currentStatus: string) => {
    try {
      const nextStatus = currentStatus === 'unread' ? 'read' : 'replied';
      await fetch(`/api/cms/contacts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      });
      fetchAllData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteInbox = async (id: string) => {
    try {
      await fetch(`/api/cms/contacts/${id}`, { method: 'DELETE' });
      fetchAllData();
    } catch (e) {
      console.error(e);
    }
  };

  // Gallery CRUD Operations
  const handleSaveGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gTitle || !gCategory || (!gImageUrl && !gVideoUrl)) return;
    try {
      const res = await fetch('/api/cms/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: gEditingId,
          title: gTitle,
          category: gCategory,
          imageUrl: gImageUrl,
          videoUrl: gVideoUrl,
          mediaType: gMediaType,
          description: gDesc
        })
      });
      if (res.ok) {
        setGTitle('');
        setGImageUrl('');
        setGVideoUrl('');
        setGMediaType('image');
        setGDesc('');
        setGEditingId(null);
        setGFileUploadName('');
        fetchAllData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleGFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setGFileLoading(true);
    setGFileUploadName(file.name);
    
    const reader = new FileReader();
    reader.onload = () => {
      const base64Str = reader.result as string;
      if (file.type.startsWith('video/')) {
        setGVideoUrl(base64Str);
        setGMediaType('video');
        if (!gImageUrl) {
          setGImageUrl("https://images.unsplash.com/photo-1461151304267-38535e780c79?auto=format&fit=crop&w=800&q=80");
        }
      } else {
        setGImageUrl(base64Str);
        setGMediaType('image');
      }
      setGFileLoading(false);
    };
    reader.onerror = () => {
      console.error("Error uploading file");
      setGFileLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteGallery = async (id: string) => {
    if (!confirm("Are you sure you want to delete this media item?")) return;
    try {
      const res = await fetch(`/api/cms/gallery/${id}`, { method: 'DELETE' });
      if (res.ok) fetchAllData();
    } catch (error) {
      console.error(error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-12 bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl p-8 text-white select-none animate-fade-in" id="admin-login-panel">
        <div className="text-center space-y-4 mb-6">
          <div className="flex justify-center flex-wrap gap-2">
            <div className="relative flex items-center justify-center w-22 h-22 overflow-hidden bg-transparent">
              <IctLogo size={80} />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-white">Anambra State ICT Agency</h1>
            <p className="text-xs text-[#ffcf00] font-bold uppercase tracking-widest mt-1">Sovereign CMS Gateway</p>
          </div>
          <p className="text-xs text-slate-400">
            Authorized admin officers only. Enter credentials to manage state digital catalogs.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Officer Username</label>
            <input 
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. admin"
              className="w-full h-11 px-4 text-sm bg-slate-950 border border-slate-800 rounded-xl focus:border-[#ffcf00] focus:ring-1 focus:ring-[#ffcf00] outline-none text-white transition-all font-semibold"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Secure Password Key</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full h-11 px-4 text-sm bg-slate-950 border border-slate-800 rounded-xl focus:border-[#ffcf00] focus:ring-1 focus:ring-[#ffcf00] outline-none text-white transition-all font-semibold"
              required
            />
          </div>

          {authError && (
            <p className="text-xs text-rose-500 font-bold bg-rose-500/10 p-3 rounded-lg border border-rose-500/20">
              ❌ {authError}
            </p>
          )}

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-bold py-3 rounded-xl transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black py-3 rounded-xl shadow-lg shadow-blue-500/10 transition-all cursor-pointer"
            >
              Authenticate Node
            </button>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-800/60 text-center">
          <p className="text-[10px] text-slate-500 font-semibold tracking-wide uppercase">
            Sovereign Administrative Gateway &bull; Secured Node
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl select-none animate-fade-in text-white" id="admin-cms-wrapper">
      
      {/* 1. STATE EXECUTIVE HEADER */}
      <div className="bg-slate-950 p-6 border-b border-slate-800 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
            <Settings size={18} className="text-[#ffcf00] animate-spin-[spin_12s_linear_infinite]" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight">Anambra State ICT Agency Administration</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Sovereign State-level CMS Portal</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-black text-xs px-4 py-2 rounded-xl transition-all cursor-pointer"
        >
          Return to Portal
        </button>
      </div>

      {/* 2. SUB NAVIGATION BANNER */}
      <div className="bg-slate-950/40 px-6 py-2 border-b border-slate-850 flex flex-wrap gap-2">
        <button 
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'overview' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}`}
        >
          Overview Statistics
        </button>
        <button 
          onClick={() => setActiveTab('projects')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'projects' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}`}
        >
          Manage Projects ({projects.length})
        </button>
        <button 
          onClick={() => setActiveTab('news')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'news' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}`}
        >
          News Room ({news.length})
        </button>
        <button 
          onClick={() => setActiveTab('sops')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'sops' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}`}
        >
          Standards Documents ({sops.length})
        </button>
        <button 
          onClick={() => setActiveTab('contacts')}
          className={`relative px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'contacts' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}`}
        >
          Citizen Inbox ({contacts.length})
          {contacts.some(c => c.status === 'unread') && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-505 bg-red-500 animate-ping" />
          )}
        </button>
        <button 
          onClick={() => setActiveTab('gallery')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'gallery' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}`}
        >
          Media Gallery ({gallery.length})
        </button>
        <button 
          onClick={() => setActiveTab('subscribers')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'subscribers' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}`}
        >
          Subscribers ({subscribers.length})
        </button>
      </div>

      {/* 3. CORE SUB CONTENTS */}
      <div className="p-8">

        {/* ================================== OVERVIEW PANEL ================================== */}
        {activeTab === 'overview' && stats && (
          <div className="space-y-12 animate-slide-up">
            
            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex items-center gap-4">
                <FolderGit size={24} className="text-[#ffcf00]" />
                <div>
                  <span className="text-slate-450 text-[10px] uppercase font-bold text-slate-400 tracking-wider">Live core projects</span>
                  <p className="text-2xl font-black mt-1">{stats.projectsCount}</p>
                </div>
              </div>
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex items-center gap-4">
                <FileText size={24} className="text-blue-400" />
                <div>
                  <span className="text-slate-450 text-[10px] uppercase font-bold text-slate-400 tracking-wider">Published news</span>
                  <p className="text-2xl font-black mt-1">{stats.newsCount}</p>
                </div>
              </div>
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex items-center gap-4">
                <CloudLightning size={24} className="text-emerald-400" />
                <div>
                  <span className="text-slate-450 text-[10px] uppercase font-bold text-slate-400 tracking-wider">SOP Standards Files</span>
                  <p className="text-2xl font-black mt-1">{stats.sopsCount}</p>
                </div>
              </div>
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex items-center gap-4">
                <Mail size={24} className="text-purple-400" />
                <div>
                  <span className="text-slate-450 text-[10px] uppercase font-bold text-slate-400 tracking-wider">Pending citizen mails</span>
                  <p className="text-2xl font-black mt-1 text-red-400">{stats.unreadContactsCount}</p>
                </div>
              </div>
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex items-center gap-4">
                <Mail size={24} className="text-blue-450 text-blue-400" />
                <div>
                  <span className="text-slate-450 text-[10px] uppercase font-bold text-slate-400 tracking-wider">Subscribers roster</span>
                  <p className="text-2xl font-black mt-1 text-emerald-400">{stats.subscribersCount || 0}</p>
                </div>
              </div>
            </div>

            {/* Premium Hand-Drawn Custom SVG Graph representing Core Trends */}
            <div className="bg-slate-950 border border-slate-800 p-8 rounded-3xl space-y-6">
              <div>
                <h3 className="font-extrabold text-lg text-white">Sovereign State Service Analytics</h3>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1"> Handshaked Services Accessed & SmartGov User Queries Growth (Jan - Jun)</p>
              </div>

              {/* Responsive SVG Graph */}
              <div className="relative w-full h-[220px] bg-slate-900/40 rounded-xl p-4 flex flex-col justify-end border border-slate-850">
                <div className="absolute top-4 right-4 flex gap-4 text-[10px] font-bold">
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-1.5 rounded-full bg-blue-500" /> Services Accessed</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-1.5 rounded-full bg-[#ffcf00]" /> Chat Queries</span>
                </div>

                <svg className="w-full h-full" viewBox="0 0 600 160" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="0" y1="40" x2="600" y2="40" stroke="#1e293b" strokeDasharray="4" />
                  <line x1="0" y1="80" x2="600" y2="80" stroke="#1e293b" strokeDasharray="4" />
                  <line x1="0" y1="120" x2="600" y2="120" stroke="#1e293b" strokeDasharray="4" />

                  {/* Trends Path servicesAccessed (Blue Line) */}
                  <path 
                    d="M 50 140 L 150 120 L 250 100 L 350 70 L 450 40 L 550 10" 
                    fill="none" 
                    stroke="#1877f2" 
                    strokeWidth="3" 
                    strokeLinecap="round"
                  />
                  {/* Trends Path userQueries (Yellow Line) */}
                  <path 
                    d="M 50 130 L 150 105 L 250 85 L 350 55 L 450 30 L 550 5" 
                    fill="none" 
                    stroke="#ffcf00" 
                    strokeWidth="3" 
                    strokeLinecap="round"
                  />

                  {/* Marker dots */}
                  <circle cx="50" cy="140" r="4" fill="#1877f2" />
                  <circle cx="150" cy="120" r="4" fill="#1877f2" />
                  <circle cx="250" cy="100" r="4" fill="#1877f2" />
                  <circle cx="350" cy="70" r="4" fill="#1877f2" />
                  <circle cx="450" cy="40" r="4" fill="#1877f2" />
                  <circle cx="550" cy="10" r="4" fill="#1877f2" />

                  <circle cx="50" cy="130" r="4" fill="#ffcf00" />
                  <circle cx="150" cy="105" r="4" fill="#ffcf00" />
                  <circle cx="250" cy="85" r="4" fill="#ffcf00" />
                  <circle cx="350" cy="55" r="4" fill="#ffcf00" />
                  <circle cx="450" cy="30" r="4" fill="#ffcf00" />
                  <circle cx="550" cy="5" r="4" fill="#ffcf00" />
                </svg>

                {/* X Axis Labels */}
                <div className="flex justify-between text-[9px] font-bold text-slate-505 text-slate-400 px-6 pt-2 select-none border-t border-slate-800">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun (Live)</span>
                </div>
              </div>
            </div>

            {/* Quick Informational Notice */}
            <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 text-xs text-slate-350 flex items-start gap-2.5">
              <Info size={16} className="text-[#ffcf00] mt-0.5" />
              <div>
                <span className="font-extrabold block text-white">State Metadata Synced</span>
                <span>All database records map directly to standard local JSON file system layers representing real sovereign storage on Anambra Local Enterprise node networks.</span>
              </div>
            </div>

          </div>
        )}

        {/* ================================== PROJECTS CRUD ================================== */}
        {activeTab === 'projects' && (
          <div className="space-y-8 animate-slide-up">
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="font-extrabold text-sm border-b border-slate-800 pb-2">
                {pEditingId ? "Modifying State Initiative" : "Add New Flagship Digital Initiative"}
              </h3>
              <form onSubmit={handleSaveProject} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-slate-400">Project Title</label>
                  <input 
                    type="text" 
                    value={pTitle}
                    onChange={(e) => setPTitle(e.target.value)}
                    placeholder="e.g. ANAMBRA AI HUBS"
                    className="w-full text-xs font-bold p-3 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-slate-400">Category</label>
                  <select 
                    value={pCategory}
                    onChange={(e) => setPCategory(e.target.value)}
                    className="w-full text-xs font-bold p-3 bg-slate-900 border border-slate-800 rounded-xl text-white focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="Digital Infrastructure">Digital Infrastructure</option>
                    <option value="Connectivity Infrastructure">Connectivity Infrastructure</option>
                    <option value="Government Communications">Government Communications</option>
                    <option value="Digital Governance">Digital Governance</option>
                    <option value="Citizen Engagement">Citizen Engagement</option>
                    <option value="Health Technology">Health Technology</option>
                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                    <option value="Digital Enablement">Digital Enablement</option>
                  </select>
                </div>
                <div className="md:col-span-2 space-y-1">
                  <label className="text-[10px] uppercase font-black text-slate-400">Initiative Abstract / Description</label>
                  <textarea 
                    value={pDesc}
                    onChange={(e) => setPDesc(e.target.value)}
                    placeholder="Provide secure, comprehensive, high availability architectural summaries about the platform..."
                    rows={3}
                    className="w-full text-xs font-bold p-3 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="md:col-span-2 space-y-1">
                  <label className="text-[10px] uppercase font-black text-slate-400">Project Highlights (Comma separated)</label>
                  <input 
                    type="text" 
                    value={pHighlights}
                    onChange={(e) => setPHighlights(e.target.value)}
                    placeholder="e.g. Sovereign hosting, High uptime, Local maintenance"
                    className="w-full text-xs font-bold p-3 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2 flex justify-end gap-2 pt-2">
                  {pEditingId && (
                    <button 
                      type="button"
                      onClick={() => {
                        setPEditingId(null);
                        setPTitle('');
                        setPDesc('');
                        setPHighlights('');
                      }}
                      className="px-4 py-2 text-xs font-black bg-slate-800 rounded-lg"
                    >
                      Cancel Edit
                    </button>
                  )}
                  <button 
                    type="submit"
                    className="px-6 py-2.5 text-xs font-black bg-blue-600 hover:bg-blue-500 text-white rounded-lg flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus size={14} />
                    <span>{pEditingId ? "Apply Modifications" : "Register Initiative"}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Existing List */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 mt-6 tracking-wider">State Platform Catalog</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((proj) => (
                  <div key={proj.id} className="bg-slate-950 border border-slate-850 p-6 rounded-2xl flex justify-between gap-4">
                    <div className="space-y-1 max-w-[80%]">
                      <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">{proj.category}</span>
                      <h4 className="font-extrabold text-white text-sm">{proj.title}</h4>
                      <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{proj.description}</p>
                    </div>
                    <div className="flex flex-col gap-2 justify-start items-end">
                      <button 
                        onClick={() => {
                          setPEditingId(proj.id);
                          setPTitle(proj.title);
                          setPCategory(proj.category);
                          setPDesc(proj.description);
                          setPHighlights(proj.highlights.join(", "));
                        }}
                        className="p-2 text-slate-400 hover:text-white bg-slate-900 border border-slate-850 rounded-lg cursor-pointer"
                        title="Edit entry"
                      >
                        <Edit3 size={12} />
                      </button>
                      <button 
                        onClick={() => handleDeleteProject(proj.id)}
                        className="p-2 text-red-400 hover:text-red-500 bg-slate-900 border border-slate-850 rounded-lg cursor-pointer"
                        title="Delete entry"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================================== NEWS CMS ================================== */}
        {activeTab === 'news' && (
          <div className="space-y-8 animate-slide-up">
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="font-extrabold text-sm border-b border-slate-800 pb-2">
                {nEditingId ? "Edit Press Release / News Story" : "Publish Official PR / Press Release"}
              </h3>
              <form onSubmit={handleSaveNews} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-400">Article Title</label>
                    <input 
                      type="text" 
                      value={nTitle}
                      onChange={(e) => setNTitle(e.target.value)}
                      placeholder="e.g. Anambra ICT deployment wins consensus"
                      className="w-full text-xs font-bold p-3 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-400">Class Category</label>
                    <select 
                      value={nCategory}
                      onChange={(e) => setNCategory(e.target.value)}
                      className="w-full text-xs font-bold p-3 bg-slate-900 border border-slate-800 rounded-xl text-white"
                    >
                      <option value="Press Release">Press Release</option>
                      <option value="Announcement">Announcement</option>
                      <option value="Innovation Story">Innovation Story</option>
                      <option value="Media">Media</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-slate-400">Summary Brief</label>
                  <input 
                    type="text" 
                    value={nSummary}
                    onChange={(e) => setNSummary(e.target.value)}
                    placeholder="Short summary for preview lists..."
                    className="w-full text-xs font-bold p-3 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-slate-400">Featured Image URL</label>
                  <input 
                    type="text" 
                    value={nImage}
                    onChange={(e) => setNImage(e.target.value)}
                    placeholder="e.g. https://images.unsplash.com/photo-... or leave empty for default"
                    className="w-full text-xs font-bold p-3 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none text-blue-300"
                  />
                  <div className="flex gap-2 pt-1.5 flex-wrap">
                    <span className="text-[9px] text-slate-400 font-bold self-center">Quick Presets:</span>
                    <button 
                      type="button" 
                      onClick={() => setNImage("https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80")}
                      className="px-2 py-1 text-[9px] bg-slate-900 border border-slate-800 font-medium text-slate-300 rounded hover:bg-slate-800"
                    >
                      AI/Tech
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setNImage("https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80")}
                      className="px-2 py-1 text-[9px] bg-slate-900 border border-slate-800 font-medium text-slate-300 rounded hover:bg-slate-800"
                    >
                      Sovereign Network
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setNImage("https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80")}
                      className="px-2 py-1 text-[9px] bg-slate-900 border border-slate-800 font-medium text-slate-300 rounded hover:bg-slate-800"
                    >
                      Office / Code
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-slate-400">Full Editorial Contents</label>
                  <textarea 
                    value={nContent}
                    onChange={(e) => setNContent(e.target.value)}
                    rows={5}
                    placeholder="Full readable article text content..."
                    className="w-full text-xs font-bold p-3 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none"
                    required
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  {nEditingId && (
                    <button 
                      type="button"
                      onClick={() => {
                        setNEditingId(null);
                        setNTitle('');
                        setNSummary('');
                        setNContent('');
                        setNImage('');
                      }}
                      className="px-4 py-2 text-xs font-bold bg-slate-800 rounded-lg text-slate-300"
                    >
                      Cancel Edit
                    </button>
                  )}
                  <button 
                    type="submit"
                    className="px-6 py-2.5 text-xs font-black bg-blue-600 hover:bg-blue-500 text-white rounded-lg cursor-pointer"
                  >
                    {nEditingId ? "Apply Article Updates" : "Publish Post"}
                  </button>
                </div>
              </form>
            </div>

            {/* List */}
            <div className="space-y-3">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Live Broadcasts</span>
              {news.map((item) => (
                <div key={item.id} className="bg-slate-950 border border-slate-850 p-4 rounded-xl flex items-center justify-between gap-4">
                  <div className="space-y-1 max-w-[75%] flex gap-3 items-center">
                    {item.image && (
                      <img 
                        src={item.image} 
                        alt="featured" 
                        className="w-12 h-12 rounded-lg object-cover border border-slate-800 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                    )}
                    <div>
                      <span className="text-[9px] font-bold text-amber-500">{item.category} • {item.date}</span>
                      <h4 className="font-extrabold text-white text-sm line-clamp-1">{item.title}</h4>
                      <p className="text-[11px] text-slate-400 line-clamp-1 leading-relaxed">{item.summary}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button 
                      onClick={() => {
                        setNEditingId(item.id);
                        setNTitle(item.title);
                        setNCategory(item.category);
                        setNSummary(item.summary);
                        setNContent(item.content);
                        setNImage(item.image || '');
                      }}
                      className="p-2 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-lg cursor-pointer"
                      title="Edit article"
                    >
                      <Edit3 size={12} />
                    </button>
                    <button 
                      onClick={() => handleDeleteNews(item.id)}
                      className="p-2 text-slate-400 hover:text-red-400 bg-slate-900 border border-slate-800 rounded-lg cursor-pointer"
                      title="Delete article"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================================== SOP PORTAL ================================== */}
        {activeTab === 'sops' && (
          <div className="space-y-8 animate-slide-up">
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="font-extrabold text-sm border-b border-slate-800 pb-2">Add New Administrative SOP Guide</h3>
              <form onSubmit={handleSaveSop} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-slate-400">Document Name</label>
                  <input 
                    type="text" 
                    value={sTitle}
                    onChange={(e) => setSTitle(e.target.value)}
                    placeholder="e.g. Fiber deployment splicers audit guide"
                    className="w-full text-xs font-semibold p-3 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-slate-400">Operational Category</label>
                  <select 
                    value={sCategory}
                    onChange={(e) => setSCategory(e.target.value)}
                    className="w-full text-xs font-semibold p-3 bg-slate-900 border border-slate-800 rounded-xl text-white"
                  >
                    <option value="Digital Security">Digital Security</option>
                    <option value="Government Standards">Government Standards</option>
                    <option value="Infrastructure Guide">Infrastructure Guide</option>
                    <option value="Administrative Procedure">Administrative Procedure</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-slate-400">Revision Version</label>
                  <input 
                    type="text" 
                    value={sVersion}
                    onChange={(e) => setSVersion(e.target.value)}
                    className="w-full text-xs font-semibold p-3 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-slate-400">Simulate File size</label>
                  <input 
                    type="text" 
                    value={sSize}
                    onChange={(e) => setSSize(e.target.value)}
                    className="w-full text-xs font-semibold p-3 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none"
                    required
                  />
                </div>
                <div className="md:col-span-2 flex justify-end">
                  <button 
                    type="submit"
                    className="px-6 py-2.5 text-xs font-black bg-blue-600 hover:bg-blue-505 hover:bg-blue-500 text-white rounded-lg cursor-pointer"
                  >
                    Register Standard Procedure File
                  </button>
                </div>
              </form>
            </div>

            {/* List */}
            <div className="space-y-3">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider font-extrabold">Registered Guidelines</span>
              {sops.map((sop) => (
                <div key={sop.id} className="bg-slate-950 border border-slate-850 p-4 rounded-xl flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[9px] font-black tracking-widest text-[#ffcf00] uppercase">{sop.category}</span>
                    <h4 className="font-extrabold text-sm">{sop.title}</h4>
                    <p className="text-[10px] text-slate-450 text-slate-400">Revision v{sop.version} • {sop.fileSize} • Last updated {sop.lastUpdated}</p>
                  </div>
                  <button 
                    onClick={() => handleDeleteSop(sop.id)}
                    className="p-2 text-slate-400 hover:text-red-400 bg-slate-900 border border-slate-800 rounded-lg cursor-pointer"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================================== CITIZEN MAILBOX ================================== */}
        {activeTab === 'contacts' && (
          <div className="space-y-6 animate-slide-up">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider font-extrabold">Citizen Governance Contact Records</span>
            {contacts.length > 0 ? (
              <div className="space-y-4">
                {contacts.map((mail) => (
                  <div 
                    key={mail.id} 
                    className={`bg-slate-950 border rounded-2xl p-6 space-y-4 transition-all ${
                      mail.status === 'unread' ? 'border-blue-500/50 shadow-lg shadow-blue-500/5' : 'border-slate-850'
                    }`}
                  >
                    <div className="flex flex-wrap justify-between items-start gap-2 border-b border-slate-900 pb-3">
                      <div>
                        <h4 className="font-extrabold text-[#ffcf00] text-sm">{mail.subject}</h4>
                        <span className="text-[10px] text-slate-400 font-bold block mt-1">From: {mail.name} ({mail.email})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${
                          mail.status === 'unread' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/10' :
                          mail.status === 'read' ? 'bg-amber-600/20 text-amber-400 border border-amber-500/10' :
                          'bg-emerald-600/20 text-emerald-400 border border-emerald-500/10'
                        }`}>
                          {mail.status}
                        </span>
                        <span className="text-[9px] text-slate-500">{new Date(mail.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/40 p-4 rounded-xl border border-slate-850">
                      "{mail.message}"
                    </p>

                    <div className="flex justify-end gap-3 pt-2">
                      {mail.status !== 'replied' && (
                        <button
                          onClick={() => handleToggleInbox(mail.id, mail.status)}
                          className="px-4 py-2 border border-slate-800 hover:bg-slate-900 text-slate-300 font-bold text-[10px] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <Check size={12} className="text-emerald-500 animate-bounce" />
                          <span>Mark as {mail.status === 'unread' ? 'Read' : 'Replied'}</span>
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteInbox(mail.id)}
                        className="p-2 border border-slate-800 hover:bg-slate-900 text-red-400 hover:text-red-500 rounded-lg cursor-pointer"
                        title="Delete query"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-slate-950 rounded-2xl border border-slate-850 space-y-1">
                <p className="font-bold text-slate-400">Citizen Mailbox is completely empty.</p>
                <p className="text-[10px] text-slate-500">Incoming state communications appear here instantly.</p>
              </div>
            )}
          </div>
        )}

        {/* ================================== GALLERY CMS ================================== */}
        {activeTab === 'gallery' && (
          <div className="space-y-8 animate-slide-up">
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="font-extrabold text-sm border-b border-slate-800 pb-2 flex items-center gap-2 text-white">
                <Upload size={16} className="text-blue-500 animate-pulse" />
                <span>{gEditingId ? "Modify Gallery Media" : "Add/Upload New Gallery & Media Item"}</span>
              </h3>
              <form onSubmit={handleSaveGallery} className="space-y-4 text-slate-300">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-400">Media Title</label>
                    <input 
                      type="text" 
                      value={gTitle}
                      onChange={(e) => setGTitle(e.target.value)}
                      placeholder="e.g. Executive launching Solution Wi-Fi"
                      className="w-full text-xs font-bold p-3 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-400">Media Category</label>
                    <select 
                      value={gCategory}
                      onChange={(e) => setGCategory(e.target.value as any)}
                      className="w-full text-xs font-bold p-3 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none"
                    >
                      <option value="Events">Events</option>
                      <option value="Infrastructure">Infrastructure</option>
                      <option value="Ecosystem">Ecosystem</option>
                      <option value="Awards">Awards</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-400">Media Type</label>
                    <select 
                      value={gMediaType}
                      onChange={(e) => setGMediaType(e.target.value as any)}
                      className="w-full text-xs font-bold p-3 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none"
                    >
                      <option value="image">Still Image</option>
                      <option value="video">Motion Video</option>
                    </select>
                  </div>
                </div>

                {/* Direct Upload Section */}
                <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-850 space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-400 block">Direct File Upload</label>
                    <div className="border-2 border-dashed border-slate-800 hover:border-blue-500 rounded-xl p-6 text-center transition-all relative">
                      <input 
                        type="file" 
                        accept="image/*,video/*"
                        onChange={handleGFileUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <div className="space-y-1.5 pointer-events-none">
                        <Upload size={24} className="mx-auto text-slate-500" />
                        <span className="text-xs text-slate-300 font-bold block">
                          {gFileLoading ? "Uploading & processing..." : gFileUploadName ? `Selected: ${gFileUploadName}` : "Drag & drop file or click to choose"}
                        </span>
                        <span className="text-[9px] text-slate-500 block">Supports image (.png, .jpg) or video (.mp4) up to browser memory limits</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-black text-slate-400 block">Image Thumbnail URL</label>
                      <input 
                        type="text" 
                        value={gImageUrl}
                        onChange={(e) => setGImageUrl(e.target.value)}
                        placeholder="e.g. Image URL or Base64 String"
                        className="w-full text-xs font-bold p-3 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none text-blue-300"
                        required={gMediaType === 'image'}
                      />
                      <div className="flex gap-1.5 pt-1.5 flex-wrap">
                        <span className="text-[9px] text-slate-500 font-bold self-center">Presets:</span>
                        <button 
                          type="button" 
                          onClick={() => setGImageUrl("https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80")}
                          className="px-2 py-0.5 text-[9px] bg-slate-950 border border-slate-855 text-slate-400 rounded hover:bg-slate-800"
                        >
                          Fiber Broad
                        </button>
                        <button 
                          type="button" 
                          onClick={() => setGImageUrl("https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80")}
                          className="px-2 py-0.5 text-[9px] bg-slate-950 border border-slate-855 text-slate-400 rounded hover:bg-slate-800"
                        >
                          Tech Labs
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-black text-slate-400 block">Video Source URL (Required for Video)</label>
                      <input 
                        type="text" 
                        value={gVideoUrl}
                        onChange={(e) => setGVideoUrl(e.target.value)}
                        placeholder="e.g. Video URL (mp4) or Base64 String or Vimeo video stream"
                        className="w-full text-xs font-bold p-3 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none text-emerald-300 disabled:opacity-40"
                        disabled={gMediaType !== 'video'}
                        required={gMediaType === 'video'}
                      />
                      {gMediaType === 'video' && (
                        <div className="flex gap-1.5 pt-1.5 flex-wrap">
                          <button 
                            type="button" 
                            onClick={() => {
                              setGVideoUrl("https://assets.mixkit.co/videos/preview/mixkit-hardware-parts-of-a-computer-processor-close-up-10903-large.mp4");
                              if (!gImageUrl) {
                                setGImageUrl("https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80");
                              }
                            }}
                            className="px-2 py-0.5 text-[9px] bg-slate-950 border border-slate-855 text-slate-400 rounded hover:bg-slate-800"
                          >
                            preset: sample mp4
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-slate-400">Brief Narrative / Description</label>
                  <input 
                    type="text" 
                    value={gDesc}
                    onChange={(e) => setGDesc(e.target.value)}
                    placeholder="A descriptive capture of this state event or media release..."
                    className="w-full text-xs font-bold p-3 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  {gEditingId && (
                    <button 
                      type="button"
                      onClick={() => {
                        setGEditingId(null);
                        setGTitle('');
                        setGImageUrl('');
                        setGVideoUrl('');
                        setGMediaType('image');
                        setGFileUploadName('');
                        setGDesc('');
                      }}
                      className="px-4 py-2 text-xs font-bold bg-slate-800 rounded-lg text-slate-300 cursor-pointer"
                    >
                      Cancel Edit
                    </button>
                  )}
                  <button 
                    type="submit"
                    className="px-6 py-2.5 text-xs font-black bg-blue-600 hover:bg-blue-500 text-white rounded-lg cursor-pointer"
                  >
                    {gEditingId ? "Register Updates" : "Save Media Item"}
                  </button>
                </div>
              </form>
            </div>

            {/* List */}
            <div className="space-y-3">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Indexed Media Gallery</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {gallery.map((item) => (
                  <div key={item.id} className="bg-slate-950 border border-slate-850 p-4 rounded-xl flex justify-between items-center gap-4">
                    <div className="flex gap-3 items-center min-w-0">
                      <div className="w-16 h-16 rounded-lg overflow-hidden border border-slate-800 shrink-0 bg-slate-900 relative">
                        <img 
                          src={item.imageUrl} 
                          alt={item.title} 
                          className="w-full h-full object-cover" 
                          referrerPolicy="no-referrer"
                        />
                        {(item.mediaType === 'video' || item.videoUrl) && (
                          <div className="absolute inset-0 bg-slate-950/45 flex items-center justify-center">
                            <Play size={14} className="text-white fill-current" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <span className="text-[9px] font-bold text-blue-400 uppercase tracking-widest flex items-center gap-1">
                          {item.mediaType === 'video' ? <Film size={10} /> : null}
                          <span>{item.category}</span>
                        </span>
                        <h4 className="font-extrabold text-white text-sm line-clamp-1">{item.title}</h4>
                        <p className="text-[10px] text-slate-400 line-clamp-1">{item.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button 
                        onClick={() => {
                          setGEditingId(item.id);
                          setGTitle(item.title);
                          setGCategory(item.category as any);
                          setGImageUrl(item.imageUrl);
                          setGVideoUrl(item.videoUrl || '');
                          setGMediaType(item.mediaType || 'image');
                          setGDesc(item.description);
                          setGFileUploadName('');
                        }}
                        className="p-2 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-lg cursor-pointer"
                        title="Edit entry"
                      >
                        <Edit3 size={11} />
                      </button>
                      <button 
                        onClick={() => handleDeleteGallery(item.id)}
                        className="p-2 text-slate-400 hover:text-red-400 bg-slate-900 border border-slate-800 rounded-lg cursor-pointer"
                        title="Delete entry"
                      >
                        <Trash2 size={11} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================================== NEWSLETTER SUBSCRIBERS ================================== */}
        {activeTab === 'subscribers' && (
          <div className="space-y-6 animate-slide-up">
            
            {/* Header Controls */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-950 p-6 rounded-2xl border border-slate-800">
              <div className="space-y-1">
                <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                  <Mail size={16} className="text-blue-500" />
                  <span>Sovereign Updates Newsletter Subscribers</span>
                </h3>
                <p className="text-[10px] text-slate-400">
                  Total of {subscribers.length} verified email accounts subscribed. Use the action below to download the CSV database or remove entries.
                </p>
              </div>
              <button
                onClick={handleExportCSV}
                disabled={subscribers.length === 0}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold shadow-lg shadow-emerald-600/10 hover:shadow-emerald-600/20 disabled:opacity-50 disabled:pointer-events-none transition-all cursor-pointer shrink-0"
              >
                <Download size={14} />
                <span>Download CSV Roster</span>
              </button>
            </div>

            {/* Subscribers List Table */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-850 pb-3">
                <div className="flex items-center gap-3">
                  <span className="font-extrabold text-xs text-white uppercase tracking-wider">Subscribers Registry</span>
                  {subscribers.length > 0 && (
                    <button
                      onClick={handleExportCSV}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 hover:border-emerald-500/30 rounded-lg cursor-pointer transition-all"
                    >
                      <Download size={11} />
                      <span>Quick CSV Export</span>
                    </button>
                  )}
                </div>
                <span className="text-[10px] font-bold text-slate-500">SORT: NEWEST FIRST</span>
              </div>

              {subscribers.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead>
                      <tr className="border-b border-slate-850 text-slate-400 font-extrabold uppercase text-[10px]">
                        <th className="py-3 px-4">Index</th>
                        <th className="py-3 px-4">ID</th>
                        <th className="py-3 px-4">Email Address</th>
                        <th className="py-3 px-4">Subscription Date</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-850">
                      {subscribers.map((sub, index) => (
                        <tr key={sub.id} className="hover:bg-slate-900/50 transition-colors">
                          <td className="py-3.5 px-4 font-mono text-slate-500 text-[10px]">{index + 1}</td>
                          <td className="py-3.5 px-4 font-mono text-slate-500 text-[10px]">{sub.id}</td>
                          <td className="py-3.5 px-4 font-black text-white text-sm">{sub.email}</td>
                          <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                            {new Date(sub.subscribedAt).toLocaleString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: 'numeric',
                              minute: '2-digit',
                              second: '2-digit'
                            })}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={async () => {
                                if (!confirm(`Are you sure you want to remove subscriber: ${sub.email}?`)) {
                                  return;
                                }
                                try {
                                  const res = await fetch(`/api/cms/subscribers/${sub.id}`, {
                                    method: 'DELETE'
                                  });
                                  if (res.ok) {
                                    fetchAllData();
                                  } else {
                                    alert("Failed to delete subscriber.");
                                  }
                                } catch (err) {
                                  console.error("Failed to delete", err);
                                }
                              }}
                              className="p-2 text-slate-405 hover:text-red-400 hover:bg-red-500/10 border border-slate-850 rounded-lg transition-all cursor-pointer"
                              title="Delete subscription"
                            >
                              <Trash2 size={12} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-16 text-slate-500 space-y-2">
                  <Mail size={40} className="text-slate-600 mx-auto animate-pulse" />
                  <p className="font-bold text-slate-400">Newsletter subscribers list is empty.</p>
                  <p className="text-[10px] text-slate-500">State citizens subscribing to updates will automatically list here.</p>
                </div>
              )}
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
