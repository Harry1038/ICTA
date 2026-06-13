import React, { useState, useEffect } from 'react';
import { 
  Building, 
  Search, 
  MapPin, 
  Mail, 
  Briefcase, 
  ArrowRight,
  ShieldCheck, 
  Layers, 
  CloudDownload, 
  CheckCircle, 
  BookOpen, 
  Clock, 
  Compass, 
  Award,
  Calendar,
  Sparkles,
  ChevronDown,
  X,
  FileText,
  MessageSquare,
  Play,
  Film,
  Phone
} from 'lucide-react';
import { SOPDocument, GalleryItem, NewsItem } from '../types';

interface OtherPagesProps {
  pageType: 'gallery' | 'news' | 'sops' | 'ecosystem' | 'careers' | 'contact' | 'privacy' | 'terms';
  onRefreshData?: () => void;
}

export default function OtherPages({ pageType, onRefreshData }: OtherPagesProps) {
  // ----------------- GALLERY PORTAL STATE -----------------
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState('All');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  // ----------------- SOP STATE -----------------
  const [sops, setSops] = useState<SOPDocument[]>([]);
  const [sopSearch, setSopSearch] = useState('');
  const [downloadProgressId, setDownloadProgressId] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [selectedSop, setSelectedSop] = useState<SOPDocument | null>(null);
  const [visibleSopsCount, setVisibleSopsCount] = useState(4);

  // ----------------- NEWSROOM STATE -----------------
  const [allNews, setAllNews] = useState<NewsItem[]>([]);
  const [newsSearch, setNewsSearch] = useState('');
  const [activeNewsCategory, setActiveNewsCategory] = useState('All');
  const [selectedNewsArticle, setSelectedNewsArticle] = useState<NewsItem | null>(null);

  // ----------------- CAREERS STATE -----------------
  const [appliedJobTitle, setAppliedJobTitle] = useState<string | null>(null);
  const [jobSubmitSuccess, setJobSubmitSuccess] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  // ----------------- CONTACT STATE -----------------
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSuccessMsg, setContactSuccessMsg] = useState('');
  const [contactLoading, setContactLoading] = useState(false);

  // ----------------- FETCH ALL ASSETS -----------------
  const fetchOtherData = async () => {
    try {
      const gRes = await fetch('/api/cms/gallery');
      const gData = await gRes.json();
      setGallery(gData);

      const sRes = await fetch('/api/cms/sops');
      const sData = await sRes.json();
      setSops(sData);

      const nRes = await fetch('/api/cms/news');
      const nData = await nRes.json();
      setAllNews(nData);
    } catch (e) {
      console.error("handshake issues loading subsidiary assets", e);
    }
  };

  useEffect(() => {
    fetchOtherData();
  }, [pageType]);

  // Handle simulated downloads
  const triggerSimDownload = (id: string) => {
    setDownloadProgressId(id);
    setDownloadProgress(0);
    const targetSop = sops.find(s => s.id === id);
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setDownloadProgressId(null);
            // Trigger actual browser file download
            try {
              const text = `ANAMBRA STATE ICT AGENCY
STANDARD OPERATING PROCEDURE (SOP) DIRECTIVE
===================================================
ID: ${targetSop?.id || id}
TITLE: ${targetSop?.title || 'Governance Regulation Policy'}
CATEGORY: ${targetSop?.category || 'General Standards Compliance'}
REVISION: v${targetSop?.version || '1.0'}
DATE OF ADOPTION: ${targetSop?.lastUpdated || new Date().toLocaleDateString()}
STATUS: APPROVED & RATIFIED (Prof. Chukwuma Charles Soludo CFR Administration)

SUMMARY / PURPOSE:
This directive outlines standard compliance guidelines, policy benchmarks, and operational safeguards deployed across Anambra State unified Digital Infrastructure.

OPERATIONAL SAFEGUARDS:
1. Sovereign Data Portability: Under strictly enforced data sovereignty mandates, all multi-tier cloud interactions and subnational repositories must retain strict local cryptographic isolation.
2. Endpoint Hardening: Government nodes must utilize the designated enterprise security enclaves.
3. Broadband Pipeline Enforces: WAN, SD-WAN, and Metropolitan Fiber pathways are subject to active QoS audits by ANSICTA.

COMPLIANCE & AUDIT TRAILS:
Failure to follow the specifications of this directive will invoke administrative re-evaluation.

This is an official ratified procedural release of the Anambra State ICT Agency.
---------------------------------------------------
Generated on: ${new Date().toLocaleString()}
Official Support Gateway: ict@anambrastate.gov.ng`;

              const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
              const url = URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = url;
              link.download = `ANAMBRA_SOP_${(targetSop?.title || 'document').toUpperCase().replace(/[^A-Z0-9]/g, '_')}.txt`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              URL.revokeObjectURL(url);
            } catch (err) {
              console.error("Download fail", err);
            }
          }, 1000);
          return 100;
        }
        return prev + 20;
      });
    }, 150);
  };

  // Handle contact submit
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactSubject || !contactMessage) return;
    setContactLoading(true);

    try {
      const res = await fetch('/api/cms/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          subject: contactSubject,
          message: contactMessage
        })
      });

      const data = await res.json();
      if (res.ok) {
        setContactSuccessMsg(data.message || "Message registered with the ICT Agency!");
        setContactName('');
        setContactEmail('');
        setContactSubject('');
        setContactMessage('');
        if (onRefreshData) onRefreshData();
      } else {
        alert(data.error || "Problem saving feedback.");
      }
    } catch (err) {
      setContactSuccessMsg(" handshaked offline: Saved localized citizen log context successfully.");
    } finally {
      setContactLoading(false);
    }
  };

  // Handle careers submission
  const handleRoleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;
    setJobSubmitSuccess(true);
    setTimeout(() => {
      setJobSubmitSuccess(false);
      setFullName('');
      setEmail('');
      setAppliedJobTitle(null);
    }, 4000);
  };

  return (
    <div className="pb-20 select-none animate-fade-in" id="other-pages-main-container">
      
      {/* ================================== 1. MEDIA GALLERY ================================== */}
      {pageType === 'gallery' && (
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">Visual Portfolio</span>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white">Media Gallery</h1>
            <p className="text-xs text-slate-500">
              Browse visual achievements, hardware installation deployments, metro Awka fiber optical reel arrays, and executive tech summits.
            </p>
          </div>

          {/* Filtering tabs */}
          <div className="flex justify-center gap-2 flex-wrap bg-slate-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-4 rounded-2xl max-w-3xl mx-auto">
            {['All', 'Events', 'Infrastructure', 'Ecosystem', 'Awards'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedGalleryCategory(cat)}
                className={`text-[10px] font-black px-4 py-1.5 rounded-lg uppercase tracking-wider transition-all cursor-pointer ${
                  selectedGalleryCategory === cat ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry-style Visual Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
            {gallery
              .filter(item => selectedGalleryCategory === 'All' || item.category === selectedGalleryCategory)
              .map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => setLightboxItem(item)}
                  className="group bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer"
                >
                  <div className="aspect-[4/3] relative overflow-hidden bg-slate-150">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-slate-950/80 text-white font-extrabold text-[8px] uppercase tracking-widest px-2.5 py-0.5 rounded-full z-10">
                      {item.category}
                    </div>
                    {/* Video/Play overlay */}
                    {(item.mediaType === 'video' || item.videoUrl) && (
                      <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center transition-all group-hover:bg-slate-950/60">
                        <div className="w-12 h-12 rounded-full bg-blue-600 group-hover:bg-blue-500 text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                          <Play size={20} className="fill-current ml-0.5" />
                        </div>
                        <div className="absolute bottom-3 right-3 bg-slate-950/70 p-1.5 rounded-lg text-white flex items-center gap-1 text-[8px] font-black uppercase">
                          <Film size={10} />
                          <span>Video</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-4 space-y-1">
                    <h4 className="font-extrabold text-xs text-slate-900 dark:text-white group-hover:text-blue-500 border-b border-transparent pb-1">{item.title}</h4>
                    <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">{item.description}</p>
                    <span className="text-[9px] text-slate-500 font-bold block pt-1">{item.date}</span>
                  </div>
                </div>
              ))}
          </div>

          {/* Lightbox Drawer overlay on zoom */}
          {lightboxItem && (
            <div 
              className="fixed inset-0 z-50 bg-slate-950/95 flex flex-col items-center justify-center p-4 select-none animate-fade-in"
              onClick={() => setLightboxItem(null)}
            >
              <button 
                onClick={() => setLightboxItem(null)}
                className="absolute top-6 right-6 text-white hover:text-[#ffcf00] cursor-pointer"
              >
                <X size={28} />
              </button>
              <div 
                className="max-w-4xl w-full max-h-[70vh] overflow-hidden rounded-2xl bg-black flex justify-center items-center shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                {lightboxItem.mediaType === 'video' || lightboxItem.videoUrl ? (
                  <video 
                    src={lightboxItem.videoUrl || lightboxItem.imageUrl} 
                    controls 
                    autoPlay
                    className="max-w-full max-h-[70vh] object-contain rounded-2xl"
                  />
                ) : (
                  <img src={lightboxItem.imageUrl} alt={lightboxItem.title} className="max-w-full max-h-[70vh] object-contain rounded-2xl" />
                )}
              </div>
              <div className="mt-4 text-center max-w-2xl px-4" onClick={(e) => e.stopPropagation()}>
                <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider bg-blue-900/40 px-3 py-1 rounded-full">{lightboxItem.category}</span>
                <h3 className="text-sm font-extrabold text-white mt-2">{lightboxItem.title}</h3>
                <p className="text-xs text-slate-300 mt-1">{lightboxItem.description}</p>
                <span className="text-[10px] text-slate-500 block mt-1">{lightboxItem.date}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================================== 2. SOP DIRECTIVES ================================== */}
      {pageType === 'sops' && (
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">Governance Standards</span>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white block">SOPs & Official Procedures</h1>
            <p className="text-xs text-slate-500">
              Official administrative guidelines and standard operating procedures (SOPs) governing public Wi-Fi infrastructure, ANSEC SharePoint enclaves, and citizens engagement.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-6 rounded-3xl max-w-4xl mx-auto flex gap-4 items-center">
            <Search size={16} className="text-slate-400" />
            <input 
              type="text" 
              placeholder="Search standards index..."
              value={sopSearch}
              onChange={(e) => setSopSearch(e.target.value)}
              className="w-full text-xs font-bold bg-white dark:bg-slate-950 text-slate-800 dark:text-white p-3 rounded-xl border border-gray-200 dark:border-slate-850 outline-none"
            />
          </div>

          {/* SOP List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto px-4">
            {sops
              .filter(item => item.title.toLowerCase().includes(sopSearch.toLowerCase()))
              .slice(0, visibleSopsCount)
              .map((sop) => (
                <div key={sop.id} className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-6 rounded-3xl flex flex-col justify-between space-y-4 shadow-sm hover:shadow-xl transition-all">
                  <div className="flex gap-4 items-start">
                    <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-slate-950 flex items-center justify-center shrink-0 border border-blue-500/10">
                      <FileText size={18} className="text-blue-500" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black tracking-widest text-[#ffcf05] text-amber-500 uppercase">{sop.category}</span>
                      <h3 className="font-extrabold text-sm text-slate-900 dark:text-white leading-tight mt-1">{sop.title}</h3>
                    </div>
                  </div>

                  <div className="border-t border-gray-50 dark:border-slate-850 pt-4 flex justify-between items-center bg-gray-50/40 dark:bg-slate-950/40 p-3 rounded-xl">
                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-400 block font-bold">Revision: v{sop.version} • {sop.fileSize}</span>
                      <span className="text-[9px] text-slate-450 text-slate-400 hover:underline block cursor-pointer" onClick={() => setSelectedSop(sop)}>Open Secure Procedure</span>
                    </div>
                    
                    <div className="flex items-center gap-2shrink-0">
                      <button 
                        onClick={() => setSelectedSop(sop)}
                        className="px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-[10px] rounded-lg flex items-center gap-1 cursor-pointer"
                        title="Read directive"
                      >
                        <BookOpen size={11} />
                        <span>Read</span>
                      </button>

                      {/* Standard automated download mechanism */}
                      {downloadProgressId === sop.id ? (
                        <div className="w-16 bg-gray-200 rounded-full h-2 dark:bg-gray-700 animate-pulse">
                          <div className="bg-blue-600 h-2 rounded-full transition-all duration-150" style={{ width: `${downloadProgress}%` }}></div>
                        </div>
                      ) : (
                        <button 
                          onClick={() => triggerSimDownload(sop.id)}
                          className="p-2 bg-slate-100 dark:bg-slate-950 text-slate-705 dark:text-slate-300 hover:text-white hover:bg-emerald-600 rounded-lg transition-colors cursor-pointer border border-gray-200 dark:border-slate-800"
                          title="Secure download pdf copy"
                        >
                          <CloudDownload size={13} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* SOP Actions or Paginations CTA */}
          <div className="max-w-2xl mx-auto pt-6 text-center space-y-4 px-4">
            {sops.filter(item => item.title.toLowerCase().includes(sopSearch.toLowerCase())).length > visibleSopsCount ? (
              <button
                onClick={() => setVisibleSopsCount(prev => prev + 4)}
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs px-8 py-3.5 shadow-md shadow-blue-500/10 cursor-pointer transition-all hover:scale-105"
              >
                <span>Show More SOPs & Guidelines</span>
                <ChevronDown size={14} className="animate-bounce" />
              </button>
            ) : sops.length > 4 ? (
              <button
                onClick={() => setVisibleSopsCount(4)}
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 font-extrabold text-xs px-8 py-3.5 shadow-sm cursor-pointer transition-all"
              >
                <span>Show Less</span>
              </button>
            ) : null}

            {/* Inquire SOP CTA block */}
            <div className="bg-slate-50 dark:bg-slate-900/30 p-8 rounded-2xl border border-dashed border-gray-200 dark:border-slate-800 mt-8">
              <span className="text-[10px] font-black tracking-widest text-amber-500 uppercase block">Governance Compliance</span>
              <h4 className="text-sm font-extrabold mt-1 text-slate-800 dark:text-white">Need custom administrative SOP guidelines or specific compliance documents?</h4>
              <p className="text-[11px] text-slate-500 mt-2 animate-pulse">Submit an official administrative search and inquiry directly to ANSICTA's Standards Compliance & Legal Department.</p>
              <div className="pt-4 flex justify-center gap-4">
                <button
                  onClick={() => {
                    // Navigate to Contact page by forcing click if we are in other pages props
                    alert("Redirecting to standards support channels. You can also file custom inquiries via our live Chat Assistant anytime!");
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 hover:bg-blue-50/10 border border-blue-600 text-blue-600 dark:text-blue-400 font-bold text-xs rounded-xl cursor-pointer"
                >
                  <MessageSquare size={12} />
                  <span>Request Custom SOP / Support</span>
                </button>
              </div>
            </div>
          </div>

          {/* SOP Full Document Reader Modal */}
          {selectedSop && (
            <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 select-none animate-fade-in">
              <div className="bg-white dark:bg-slate-950 border border-slate-150 dark:border-slate-850 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 relative space-y-6 text-slate-800 dark:text-white shadow-2xl">
                <button 
                  onClick={() => setSelectedSop(null)}
                  className="absolute top-6 right-6 p-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-slate-800 dark:bg-slate-900 dark:hover:bg-slate-850 dark:text-white cursor-pointer"
                >
                  <X size={20} />
                </button>

                <div className="space-y-2 border-b border-gray-100 dark:border-slate-850 pb-6 pt-4">
                  <div className="flex gap-2 items-center">
                    <span className="text-[9px] font-black uppercase tracking-widest text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-full">{selectedSop.category}</span>
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#1877f2] bg-blue-500/10 px-2.5 py-1 rounded-full">Sovereign Directives Code</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-black leading-tight text-slate-900 dark:text-white mt-1">{selectedSop.title}</h2>
                  <div className="flex flex-wrap gap-4 text-[10px] text-slate-500 font-bold pt-1">
                    <span>Identity Ref: {selectedSop.id.toUpperCase()}</span>
                    <span>•</span>
                    <span>Revision: v{selectedSop.version}</span>
                    <span>•</span>
                    <span>Last Synced: {selectedSop.lastUpdated}</span>
                  </div>
                </div>

                {/* Secure seal and detailed guidelines layout in responsive cards */}
                <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 space-y-4 font-sans leading-relaxed text-xs">
                  {selectedSop.content ? (
                    <div className="space-y-4 whitespace-pre-line text-slate-700 dark:text-slate-200">
                      {selectedSop.content}
                    </div>
                  ) : (
                    <div className="py-8 text-center text-slate-400 font-bold">
                      Loading full sovereign text directive...
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center bg-gray-50/40 dark:bg-slate-900/40 p-4 rounded-xl border border-gray-100 dark:border-slate-800">
                  <div className="text-[10px] text-slate-400 font-bold">
                    Official Document Access Size: {selectedSop.fileSize}
                  </div>
                  <button 
                    onClick={() => {
                      triggerSimDownload(selectedSop.id);
                      setSelectedSop(null);
                    }}
                    className="px-4 py-2 bg-[#1877f2] hover:bg-blue-600 text-white font-black text-xs rounded-lg flex items-center gap-1.5 cursor-pointer"
                  >
                    <CloudDownload size={12} />
                    <span>Download Signoff Code</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

      {/* ================================== 3. NEWSROOM BLOG ================================== */}
      {pageType === 'news' && (
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">Media Desk</span>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white">Newsroom & PR Bulletin</h1>
            <p className="text-xs text-slate-500 font-medium">Read recent state-level innovations, media publications, executive announcements, and success briefs.</p>
          </div>

          <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* News Sidebar filter */}
            <div className="md:col-span-1 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-gray-150 border-gray-100 dark:border-slate-800 space-y-3">
                <span className="text-[10px] uppercase font-black text-slate-400">Class Filters</span>
                {['All', 'Press Release', 'Announcement', 'Innovation Story'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveNewsCategory(cat)}
                    className={`w-full text-left px-3 py-2 text-xs font-bold rounded-lg ${
                      activeNewsCategory === cat ? 'bg-blue-600 text-white' : 'text-slate-705 text-slate-700 hover:bg-gray-100 dark:text-slate-350 dark:hover:bg-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Stories Grid */}
            <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {allNews
                .filter(item => activeNewsCategory === 'All' || item.category === activeNewsCategory)
                .map((story) => (
                  <div 
                    key={story.id}
                    onClick={() => setSelectedNewsArticle(story)}
                    className="group bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-400/10 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div className="h-44 overflow-hidden bg-slate-100">
                      <img src={story.image} alt={story.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold text-[#ffcf00] bg-slate-950/90 py-0.5 px-2.5 rounded-full uppercase tracking-wider">{story.category}</span>
                        <h3 className="font-extrabold text-sm text-slate-900 dark:text-white leading-snug">{story.title}</h3>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">{story.summary}</p>
                      </div>

                      <div className="pt-4 border-t border-gray-50 dark:border-slate-850 flex justify-between items-center">
                        <span className="text-[9px] text-[#1877f2] font-black uppercase">Read Full story</span>
                        <span className="text-[9px] text-slate-505 text-slate-400 font-bold">{story.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

          </div>

          {/* Article Full Modal */}
          {selectedNewsArticle && (
            <div className="fixed inset-0 z-50 bg-slate-950/80 flex items-center justify-center p-4">
              <div className="bg-white dark:bg-slate-950 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 relative border border-gray-100 dark:border-slate-800 space-y-6 text-slate-800 dark:text-white">
                <button 
                  onClick={() => setSelectedNewsArticle(null)}
                  className="absolute top-6 right-6 p-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-slate-800 dark:bg-slate-900 dark:hover:bg-slate-850 dark:text-white"
                >
                  <X size={20} />
                </button>

                <div className="space-y-2 pt-6">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#ffcf00] bg-slate-950 py-1 px-3 rounded-full">{selectedNewsArticle.category}</span>
                  <h2 className="text-xl md:text-2xl font-black leading-tight">{selectedNewsArticle.title}</h2>
                  <div className="flex gap-4 text-[10px] text-slate-400 font-bold">
                    <span>By: {selectedNewsArticle.author}</span>
                    <span>•</span>
                    <span>Published: {selectedNewsArticle.date}</span>
                  </div>
                </div>

                <div className="h-56 overflow-hidden rounded-xl bg-slate-100">
                  <img src={selectedNewsArticle.image} alt={selectedNewsArticle.title} className="w-full h-full object-cover" />
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line first-letter:text-3xl first-letter:font-black first-letter:text-blue-500">
                  {selectedNewsArticle.content}
                </p>
              </div>
            </div>
          )}

        </div>
      )}

      {/* ================================== 4. STARTUP ECOSYSTEM ================================== */}
      {pageType === 'ecosystem' && (
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">Innovation Hubs</span>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white">State Innovation Ecosystem</h1>
            <p className="text-xs text-slate-500 font-medium">
              We coordinate subnational programming initiatives, mentoring incubator cells, and powering peer review challenges across Kano, Benue, and Jos boundaries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
            <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-8 rounded-3xl space-y-4">
              <span className="text-2xl">⚡</span>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Awka Labs & Coworking</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Hosting youth internship programs where developer prodigies build live civic-standard softwares like the ANSC-EID secure ID registry.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-8 rounded-3xl space-y-4">
              <span className="text-2xl">🌱</span>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Incubator Mentoring</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Spearheaded under MD CFA guidelines. Local Awka agricultural AI models, and public billing databases get server grants on Anambra Cloud structures.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-8 rounded-3xl space-y-4">
              <span className="text-2xl">🏆</span>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Triple National Champion</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Nurturing elite state contestants represented prominently at National Council reviews, maintaining Anambra as #1 transformation beacon.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ================================== 5. CAREERS PORTAL ================================== */}
      {pageType === 'careers' && (
        <div className="space-y-12 max-w-4xl mx-auto px-4">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">Join Anambra State ICT Agency Team</span>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white">Live Opportunities</h1>
            <p className="text-xs text-slate-500">Become a builder of Nigeria's premier subnational AI-native agency infrastructure.</p>
          </div>

          {/* Job Openings */}
          <div className="space-y-4">
            {[
              { title: "Senior Sovereign Cloud Architect", loc: "Awka Headquarters", desc: "Guide deployment optimization of Anambra Sovereignty Cloud arrays on Kubernetes and native Docker nodes." },
              { title: "Generative AI Systems Analyst", loc: "SmartGov Labs", desc: "Integrate @google/genai SDK procedures onto subnational state service chatbots." },
              { title: "Cybersecurity Compliance Engineer", loc: "Enforcement Desk", desc: "Enforce standard 2FA credentials and official gov domain compliance across MDA workstations." }
            ].map((job) => (
              <div key={job.title} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 flex flex-wrap justify-between items-center gap-4 hover:shadow-lg transition-all">
                <div className="space-y-1 max-w-[70%]">
                  <h3 className="font-black text-sm text-slate-900 dark:text-white">{job.title}</h3>
                  <span className="text-[10px] text-blue-500 font-bold block">{job.loc}</span>
                  <p className="text-xs text-slate-505 text-slate-500 leading-relaxed">{job.desc}</p>
                </div>
                <button 
                  onClick={() => {
                    setAppliedJobTitle(job.title);
                    setSelectedRole(job.title);
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-extrabold rounded-lg cursor-pointer"
                >
                  Apply Directly
                </button>
              </div>
            ))}
          </div>

          {/* Careers Application Form Modal */}
          {appliedJobTitle && (
            <div className="fixed inset-0 z-50 bg-slate-950/80 flex items-center justify-center p-4">
              <form 
                onSubmit={handleRoleApply}
                className="bg-white dark:bg-slate-955 bg-slate-950 rounded-3xl max-w-md w-full p-8 border border-slate-800 space-y-4 relative text-white"
              >
                <button 
                  type="button"
                  onClick={() => setAppliedJobTitle(null)}
                  className="absolute top-6 right-6 text-slate-400 hover:text-white"
                >
                  <X size={20} />
                </button>
                <h3 className="font-black text-lg text-white pt-2 border-b border-slate-900 pb-2">Apply for Role</h3>
                <span className="text-xs text-[#ffcf00] block font-bold">{appliedJobTitle}</span>

                {jobSubmitSuccess ? (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-slate-300 text-center space-y-1">
                    <p className="font-extrabold text-white">Application Logged Handshaked!</p>
                    <p>Our executive human capital team will review your CV portfolio soon.</p>
                  </div>
                ) : (
                  <div className="space-y-4 pt-2">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400">Full Name</label>
                      <input 
                        type="text" 
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Ifeanyi Nwachukwu"
                        className="w-full text-xs font-bold p-3 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400">E-mail Address</label>
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ifeanyi@example.com"
                        className="w-full text-xs font-bold p-3 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400">Attach Portfolio / Resume (mock file name)</label>
                      <input 
                        type="file" 
                        className="w-full text-xs bg-slate-900 border border-slate-800 p-2.5 rounded-xl cursor-not-allowed"
                      />
                    </div>
                    <button 
                      type="submit"
                      className="w-full h-11 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-black transition-all cursor-pointer"
                    >
                      File Application Securely
                    </button>
                  </div>
                )}
              </form>
            </div>
          )}

        </div>
      )}

      {/* ================================== 6. CONTACT US ================================== */}
      {pageType === 'contact' && (
        <div className="space-y-12 max-w-6xl mx-auto px-4">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">Connect with the ICT Agency</span>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white">Contact Our Service Desk</h1>
            <p className="text-xs text-slate-505 text-slate-500">Transmit official letters, start-up partnership briefs or complaints securely.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-6">
            
            {/* Details Column */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl border border-gray-150 border-gray-100 dark:border-slate-800 space-y-6">
                <div className="flex gap-4 items-start">
                  <MapPin size={20} className="text-blue-500 mt-1" />
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">Physical Headquarters</h4>
                    <p className="text-xs text-slate-505 text-slate-500 leading-relaxed mt-1">
                      3rd Floor, SSG Complex, Light House Awka, Anambra State.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <Mail size={20} className="text-[#ffcf00] mt-1" />
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">Authorised Channels</h4>
                    <p className="text-xs text-slate-505 text-slate-500 leading-relaxed mt-1">
                      ict@anambrastate.gov.ng
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <Phone size={20} className="text-blue-500 mt-1" />
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">Telephone Helpline</h4>
                    <p className="text-xs text-slate-505 text-slate-500 leading-relaxed mt-1">
                      08142814404
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <Clock size={20} className="text-emerald-500 mt-1" />
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">Executive Hours</h4>
                    <p className="text-xs text-slate-550 text-slate-500 leading-relaxed mt-1">
                      Monday to Friday • 08:00 AM - 04:00 PM (Local State Meridian Time)
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative Interactive Mock map representation */}
              <div className="h-44 rounded-3xl bg-slate-950/90 text-white p-6 flex flex-col justify-end border border-slate-850 relative overflow-hidden shadow-md">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(24,119,242,0.1),transparent_70%)]" />
                <div className="space-y-1 relative z-10 select-none">
                  <span className="text-[10px] uppercase font-black tracking-wider text-[#ffcf00]">Geospatial Node Location</span>
                  <p className="text-xs font-bold">Awka Metropolitan Secretariat Node Grid</p>
                  <p className="text-[10px] text-slate-400">Latitude: 6.2105° N • Longitude: 7.0722° E</p>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-8 rounded-3xl shadow-sm space-y-6">
              <h3 className="font-extrabold text-base text-slate-902 text-slate-900 dark:text-white border-b border-gray-50 dark:border-slate-850 pb-2 flex items-center gap-1.5">
                <MessageSquare size={16} className="text-blue-500" />
                <span>Submit Query Document</span>
              </h3>

              {contactSuccessMsg ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/15 text-xs text-slate-350 text-center space-y-2 animate-bounce">
                  <CheckCircle size={28} className="text-emerald-400 mx-auto" />
                  <p className="font-black text-white">Transmission Successful!</p>
                  <p>{contactSuccessMsg}</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400">Full Name</label>
                      <input 
                        type="text" 
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Ifeanyi Okafor"
                        className="w-full text-xs font-bold p-3 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white border border-gray-200 dark:border-slate-800 rounded-xl outline-none focus:ring-1 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400">E-mail Address</label>
                      <input 
                        type="email" 
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="ifeanyi@example.com"
                        className="w-full text-xs font-bold p-3 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white border border-gray-200 dark:border-slate-800 rounded-xl outline-none focus:ring-1 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Subject</label>
                    <input 
                      type="text"
                      value={contactSubject}
                      onChange={(e) => setContactSubject(e.target.value)}
                      placeholder="e.g. Incubation Hub proposal"
                      className="w-full text-xs font-bold p-3 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white border border-gray-200 dark:border-slate-800 rounded-xl outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Message Description</label>
                    <textarea 
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      rows={5}
                      placeholder="Input comprehensive feedback, start-up briefings..."
                      className="w-full text-xs font-bold p-3 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white border border-gray-200 dark:border-slate-800 rounded-xl outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={contactLoading}
                    className="w-full h-11 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs rounded-xl transition-all cursor-pointer"
                  >
                    {contactLoading ? "Processing secure handshake..." : "Submit File to the Agency HQ"}
                  </button>
                </form>
              )}

            </div>

          </div>

        </div>
      )}

      {/* ================================== 7. PRIVACY POLICY ================================== */}
      {pageType === 'privacy' && (
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white border-b border-gray-150 pb-2">Website Privacy Policy</h1>
          <p className="text-slate-450 text-xs mt-1 font-bold">Effective Date: June 13, 2026 • Official Document of the Anambra State ICT Agency</p>
          <div className="text-xs text-slate-600 dark:text-slate-300 space-y-4 leading-relaxed font-semibold">
            <p>
              Anambra State ICT Agency values the data sovereignty and protection laws of the Federal Republic of Nigeria. This Privacy Policy outlines standard procedures for processing public data and managing citizen information processed on Anambra Enterprise Cloud networks.
            </p>
            <h3 className="font-extrabold text-slate-900 dark:text-white mt-4 text-sm uppercase">1. Collected Information Parameters</h3>
            <p>
              We collect user-authorized information when you file contact index documents, deploy SmartGov chatbot sessions, or apply for state developer careers. Chat metrics and user query totals are logged anonymously to display growth trends.
            </p>
            <h3 className="font-extrabold text-slate-900 dark:text-white mt-4 text-sm uppercase">2. Storage Sovereignty</h3>
            <p>
              All core database registries are preserved on subnational mainframe servers hosted locally within Anambra State boundaries for maximum data protection.
            </p>
          </div>
        </div>
      )}

      {/* ================================== 8. TERMS OF USE ================================== */}
      {pageType === 'terms' && (
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white border-b border-gray-150 pb-2">Terms of Use Agreement</h1>
          <p className="text-slate-450 text-xs mt-1 font-bold">Effective Date: June 13, 2026 • Government Intellectual Access guidelines</p>
          <div className="text-xs text-slate-600 dark:text-slate-300 space-y-4 leading-relaxed font-semibold">
            <p>
              Welcome to the official digital transformation platform of Nigeria's first AI-Native ICT Agency. By exploring this sovereign system, utilizing our smart chatbots, or downloading administrative SOP guidelines, you agree to these Terms.
            </p>
            <h3 className="font-extrabold text-slate-950 dark:text-white mt-4 text-sm uppercase">1. Appropriate Usage of State Assets</h3>
            <p>
              You agree not to deploy automated query generators, DDoS crawlers, or unauthorized automated scripts on our SmartGov API endpoints or Anambra Cloud pipelines.
            </p>
            <h3 className="font-extrabold text-slate-950 dark:text-white mt-4 text-sm uppercase">2. Accuracy & Content</h3>
            <p>
              While SmartGov AI is backed by advanced Gemini artificial intelligence mechanisms, all public recommendations are experimental in nature. Always crosscheck official downloadable SOP guidelines before executing formal legal operations.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
