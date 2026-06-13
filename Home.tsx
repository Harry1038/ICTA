import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CloudLightning, 
  Cpu, 
  Signal, 
  ShieldAlert, 
  Users, 
  Trophy, 
  Compass, 
  CheckCircle,
  Clock,
  Mail,
  Youtube,
  Play,
  Volume2,
  Bell
} from 'lucide-react';
import { Project } from '../types';

interface HomeProps {
  setCurrentPage: (page: string) => void;
  projects: Project[];
}

export default function Home({ setCurrentPage, projects }: HomeProps) {
  const [govImageError, setGovImageError] = useState(false);
  const [mdImageError, setMdImageError] = useState(false);
  const [govIdx, setGovIdx] = useState(0);
  const [mdIdx, setMdIdx] = useState(0);

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);
  const [subMessage, setSubMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribing(true);
    setSubMessage(null);
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to subscribe. Please try again.');
      }
      setSubMessage({ type: 'success', text: data.message });
      setNewsletterEmail('');
    } catch (err: any) {
      setSubMessage({ type: 'error', text: err.message || 'An error occurred.' });
    } finally {
      setSubscribing(false);
    }
  };

  const govUrls = [
    "https://i.ibb.co/s9RJSTC2/mr-governor.png",
    "https://soludo.tv/wp-content/uploads/2022/03/Soludo-Portrait-Official.jpg",
    "https://anambrastate.gov.ng/wp-content/uploads/2022/03/Governor-Charles-Chukwuma-Soludo.jpg"
  ];

  const mdUrls = [
    "https://i.ibb.co/SwCQg8r4/cfa-image.png",
    "https://techeconomy.ng/wp-content/uploads/2023/11/CFA-MD-Anambra-ICT-Agency.jpg",
    "https://techeconomy.ng/wp-content/uploads/2023/04/Chukwuemeka-Fred-Agbata-CFA.jpg"
  ];

  // Key state metrics
  const stats = [
    { value: "700+ KM", label: "Statewide Fibre Backbone", desc: "11+ LGAs connected with gigabit speeds" },
    { value: "100%", label: "Host Sovereignty", desc: "Securely deployed subnational Anambra Cloud" },
    { value: "Nigeria's 1st", label: "AI-Native State Agency", desc: "Interactive public service automation" },
    { value: "3 Consecutive", label: "National NCCIDE Gold", desc: "Accolades in Kano, Benue, and Jos" }
  ];

  const highlights = [
    {
      icon: <Cpu className="text-blue-500" size={24} />,
      title: "Experimental SmartGov AI",
      desc: "Instantaneous rule-based citizen assistance, administrative summaries, and public procedure directions."
    },
    {
      icon: <CloudLightning className="text-yellow-500" size={24} />,
      title: "Anambra Enterprise Cloud",
      desc: "Enterprise-grade local mainframe designed for high-availability database hosting and civil service platforms."
    },
    {
      icon: <Signal className="text-emerald-500" size={24} />,
      title: "Broadband Expansion",
      desc: "Delivering last-mile connectivity to subnational MDAs, creating high-density municipal internet access points."
    },
    {
      icon: <ShieldAlert className="text-purple-500" size={24} />,
      title: "Sovereign Security Framework",
      desc: "Full second-level domain standardization with state-authorized multi-factor protection standards."
    }
  ];

  return (
    <div className="space-y-20 pb-20 select-none animate-fade-in" id="home-page-container">
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative overflow-hidden bg-[#0b1220] py-24 text-white lg:py-32" id="hero-section">
        {/* Abstract AI / Neural connection background overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(24,119,242,0.15),transparent_50%)]" />
        <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-blue-900/10 to-transparent pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#111827_1px,transparent_1px),linear-gradient(to_bottom,#111827_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            {/* Glowing Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold text-blue-400 tracking-wider uppercase animate-pulse">
              <Sparkles size={12} className="text-[#ffcf00]" />
              <span>Nigeria's First AI-Native ICT Agency</span>
            </div>

            {/* Monumental Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight text-white">
              Building a <br className="hidden md:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-400 to-[#ffcf00]">
                Digitally Transformed
              </span> <br />
              Anambra State
            </h1>

            {/* Subheadline description */}
            <p className="text-base md:text-xl text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed">
              Driving the Digital Transformation of Anambra State through Artificial Intelligence, Smart Governance, Innovation, and Future-Ready Technology Infrastructure.
            </p>

            {/* Interactive Hero CTAs */}
            <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
              <a
                href="https://smart.anambrastate.gov.ng"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-blue-600 hover:bg-blue-500 px-8 py-4 text-sm font-extrabold text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all cursor-pointer"
                id="hero-ai-cta"
              >
                <Sparkles size={16} className="text-[#ffcf00] animate-pulse" />
                <span>Interact with SmartGov AI</span>
                <ArrowRight size={16} />
              </a>
              <button
                onClick={() => setCurrentPage('projects')}
                className="flex items-center gap-2 rounded-full border border-slate-700 hover:border-slate-500 bg-slate-900/60 backdrop-blur-sm hover:bg-slate-800/80 px-8 py-4 text-sm font-extrabold text-[#ffcf00] transition-all cursor-pointer"
                id="hero-projects-cta"
              >
                <span>Explore Projects</span>
              </button>
            </div>
          </div>

          {/* Quick links banner */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div 
              onClick={() => setCurrentPage('portal')}
              className="group p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-900 transition-all duration-300 cursor-pointer"
            >
              <h3 className="font-bold text-lg text-white mb-2 flex items-center gap-2 group-hover:text-blue-400">
                <span>AI Government Services</span>
                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" />
              </h3>
              <p className="text-xs text-slate-400">Deploy experimental smart models to discover procedures and track governance documents instantly.</p>
            </div>
            <div 
              onClick={() => setCurrentPage('sops')}
              className="group p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-900 transition-all duration-300 cursor-pointer"
            >
              <h3 className="font-bold text-lg text-white mb-2 flex items-center gap-2 group-hover:text-blue-400">
                <span>Official SOP & Guidelines</span>
                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" />
              </h3>
              <p className="text-xs text-slate-400">Read official sovereign procedures, Right-of-Way definitions and official digital identity rules.</p>
            </div>
            <div 
              onClick={() => setCurrentPage('careers')}
              className="group p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-[#ffcf00]/50 hover:bg-slate-900 transition-all duration-300 cursor-pointer"
            >
              <h3 className="font-bold text-lg text-white mb-2 flex items-center gap-2 group-hover:text-[#ffcf00]">
                <span>State Tech Ecosystem</span>
                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" />
              </h3>
              <p className="text-xs text-slate-400">Discover developer career opportunities and youth state hubs driving global-standard programming.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. REPLACED WITH THE MAJESTIC 3 NATIONAL AWARDS & RECOGNITIONS DASHBOARD */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-20" id="stats-section">
        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-amber-500/20 p-8 rounded-3xl shadow-2xl relative overflow-hidden space-y-8">
          {/* Subtle background golden glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center sm:text-left space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-black uppercase text-[#ffcf00] tracking-widest">
              <Trophy size={11} className="animate-bounce shrink-0" />
              <span>3 Consecutive National Laurels</span>
            </div>
            <h2 className="text-2xl font-black text-white leading-tight">National Awards & Peer-Reviewed Recognitions</h2>
            <p className="text-xs text-slate-400">Awarded top honors by the National Council on Communications, Innovation and Digital Economy (NCCIDE) for high-density infrastructure rollout, e-Government adoption, and tech investment.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* AWARD 1: Kano 2023 */}
            <div className="bg-slate-950/70 border border-slate-800/80 hover:border-amber-500/30 p-6 rounded-2xl flex flex-col justify-between transition-all duration-300 relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-500/10 transition-colors" />
              <div className="space-y-4">
                <div className="flex justify-between items-start gap-2">
                  <span className="text-sm font-black text-amber-500 tracking-wider">KANO 2023</span>
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
                    <Trophy size={16} />
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="font-extrabold text-sm text-white line-clamp-2">Overall Winner — Digital Technology Development</h3>
                  <p className="text-[11px] text-[#ffcf00] font-bold">1st Place subnational technology leader</p>
                </div>
                <ul className="text-[11px] text-slate-400 space-y-2 pt-2 border-t border-slate-900">
                  <li className="flex gap-2 items-start"><CheckCircle size={12} className="text-[#ffcf00] shrink-0 mt-0.5" /> <span>Ranked Best in subnational e-Government implementation.</span></li>
                  <li className="flex gap-2 items-start"><CheckCircle size={12} className="text-[#ffcf00] shrink-0 mt-0.5" /> <span>First place in digital literacy and youth skills empowerment.</span></li>
                  <li className="flex gap-2 items-start"><CheckCircle size={12} className="text-[#ffcf00] shrink-0 mt-0.5" /> <span>Outstanding leadership in broadband framework development.</span></li>
                </ul>
              </div>
            </div>

            {/* AWARD 2: Benue 2024 */}
            <div className="bg-slate-950/70 border border-slate-800/80 hover:border-amber-500/30 p-6 rounded-2xl flex flex-col justify-between transition-all duration-300 relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-500/10 transition-colors" />
              <div className="space-y-4">
                <div className="flex justify-between items-start gap-2">
                  <span className="text-sm font-black text-slate-450 text-slate-400 tracking-wider animate-pulse">BENUE 2024</span>
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
                    <Trophy size={16} />
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="font-extrabold text-sm text-white line-clamp-2">ICT Infrastructure Development Silver Laureate</h3>
                  <p className="text-[11px] text-[#ffcf00] font-bold">Outstanding fast-tracked backbone rollout</p>
                </div>
                <ul className="text-[11px] text-slate-400 space-y-2 pt-2 border-t border-slate-900">
                  <li className="flex gap-2 items-start"><CheckCircle size={12} className="text-[#ffcf00] shrink-0 mt-0.5" /> <span>Recognised for accelerated 700km statewide fibre backbone.</span></li>
                  <li className="flex gap-2 items-start"><CheckCircle size={12} className="text-[#ffcf00] shrink-0 mt-0.5" /> <span>Successful zero-fee Right-of-Way policy enforcement.</span></li>
                  <li className="flex gap-2 items-start"><CheckCircle size={12} className="text-[#ffcf00] shrink-0 mt-0.5" /> <span>Deploying high-speed internet to distant remote local councils.</span></li>
                </ul>
              </div>
            </div>

            {/* AWARD 3: Jos 2025 */}
            <div className="bg-slate-950/70 border border-slate-800/80 hover:border-amber-500/30 p-6 rounded-2xl flex flex-col justify-between transition-all duration-300 relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-500/10 transition-colors" />
              <div className="space-y-4">
                <div className="flex justify-between items-start gap-2">
                  <span className="text-sm font-black text-amber-500 tracking-wider">JOS 2025</span>
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
                    <Trophy size={16} />
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="font-extrabold text-sm text-white line-clamp-2">Overall Winner — Digital Technology Development</h3>
                  <p className="text-[11px] text-[#ffcf00] font-bold">Nigeria's undisputable tech pioneer</p>
                </div>
                <ul className="text-[11px] text-slate-400 space-y-2 pt-2 border-t border-slate-900">
                  <li className="flex gap-2 items-start"><CheckCircle size={12} className="text-[#ffcf00] shrink-0 mt-0.5" /> <span>Ranked Class-A nationwide Best in Digital Infrastructure layout.</span></li>
                  <li className="flex gap-2 items-start"><CheckCircle size={12} className="text-[#ffcf00] shrink-0 mt-0.5" /> <span>1st Runner-up in e-Government system connectivity.</span></li>
                  <li className="flex gap-2 items-start"><CheckCircle size={12} className="text-[#ffcf00] shrink-0 mt-0.5" /> <span>Best in Digital Human Capital development & youth internships.</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PRESIDENTIAL GOVERNOR SECTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10" id="governor-spotlight">
        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-gray-100 dark:border-slate-800 p-8 md:p-12 lg:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Elegant Portrait Frame with Flag accents */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative group p-2 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-slate-700/50 overflow-hidden max-w-xs w-full">
                {/* National Banner ribbon */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-600 via-white to-emerald-600 z-10" />
                
                {/* Image tag with Soludo's official photo */}
                <div className="aspect-[3/4] rounded-xl overflow-hidden bg-slate-100">
                  {!govImageError ? (
                    <img 
                      src={govUrls[govIdx]} 
                      alt="His Excellency, Prof. Chukwuma Charles Soludo CFR" 
                      className="w-full h-full object-cover grayscale-0 group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      onError={() => {
                        if (govIdx < govUrls.length - 1) {
                          console.log(`Governor portrait failed to load index ${govIdx}, trying next candidate...`);
                          setGovIdx(prev => prev + 1);
                        } else {
                          console.log("All Governor portrait candidates failed, switching to elegant subnational backup layout.");
                          setGovImageError(true);
                        }
                      }}
                    />
                  ) : (
                    /* Avatar Drawing fallback */
                    <div className="w-full h-full bg-gradient-to-tr from-blue-900 to-indigo-900 flex flex-col items-center justify-center p-6 text-center text-white">
                      <span className="text-6xl mb-2">🇳🇬</span>
                      <span className="font-serif text-sm tracking-wider uppercase opacity-80">Executive Governor</span>
                      <span className="font-extrabold text-lg mt-1 text-[#ffcf00]">Prof. C. Soludo CFR</span>
                    </div>
                  )}
                </div>
                
                <div className="p-4 text-center">
                  <h4 className="font-black text-slate-900 dark:text-white leading-none">Prof. Chukwuma Charles Soludo CFR</h4>
                  <p className="text-[10px] text-blue-600 dark:text-[#ffcf00] font-bold tracking-widest uppercase mt-2">Executive Governor of Anambra State</p>
                </div>
              </div>
            </div>

            {/* Visionary Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold tracking-widest text-blue-500 dark:text-[#ffcf00] uppercase">The Visionary Administration</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-955 gap-2 text-slate-900 dark:text-white">
                  A Digitsed Subnational Economy Hub
                </h2>
              </div>
              <blockquote className="border-l-4 border-blue-600 dark:border-[#ffcf00] pl-6 italic text-slate-700 dark:text-slate-300 text-lg">
                "Our administration is positioning Anambra State as a leading digital economy hub in Africa. By removing outdated bureaucracy and expanding massive, high-speed fibre optic connectivity, we guarantee our future tech workforce is prepared for the next age of global silicon integration and smart public services."
              </blockquote>
              <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
                <p className="font-bold">Prof. Chukwuma Charles Soludo CFR’s administration has prioritised digital infrastructure:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-xs">
                  <div className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Connecting all state MDAs on high-speed internet</div>
                  <div className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Free public internet hotspots development</div>
                  <div className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Seamless Right-of-Way policy rollout</div>
                  <div className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> State cloud mainframe integration</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. EXECUTIVE MD/CEO CORNER */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10" id="ceo-section">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Narrative description */}
          <div className="lg:col-span-7 space-y-6 order-2 lg:order-1">
            <div className="space-y-2">
              <span className="text-xs font-bold tracking-widest text-[#1877f2] dark:text-[#ffcf00] uppercase">Sovereign Agency Leadership</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
                Chukwuemeka Fred Agbata (CFA)
              </h2>
              <p className="text-blue-605 text-sm font-bold tracking-wider text-blue-600 dark:text-[#ffcf00] uppercase">Managing Director & CEO, Anambra State ICT Agency</p>
            </div>
            
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
              As a global tech founder and visionary government reformer, Chukwuemeka Fred Agbata (CFA) is driving the agency to establish Africa's most modern public-sector technology workspace. Under his leadership, Anambra has earned three consecutive National Councils accolades, standardising unified communication protocols and enabling youth-led software engineering directly within the civil service.
            </p>

            <blockquote className="border-l-4 border-[#ffcf00] pl-6 italic text-slate-700 dark:text-slate-300 text-sm bg-gray-50 dark:bg-slate-900/60 p-4 rounded-r-xl">
              "Everything technology and technology everywhere is not merely a slogan, it is our day-to-day work metric. We are delivering secure sovereign communications, high-redundancy state-hosting arrays, and training local youth to integrate real-life artificial intelligence protocols into Anambra's public sector."
            </blockquote>

            <div className="flex gap-4">
              <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 space-y-1">
                <span className="font-extrabold text-lg text-blue-600 dark:text-blue-400">Everything Technology</span>
                <p className="text-[11px] text-slate-500">Integrating smart services across standard citizen touchpoints.</p>
              </div>
              <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 space-y-1">
                <span className="font-extrabold text-lg text-amber-600 dark:text-amber-400">Technology Everywhere</span>
                <p className="text-[11px] text-slate-500">High-performance municipal digital enablement networks.</p>
              </div>
            </div>
          </div>

          {/* Premium Portrait Frame */}
          <div className="lg:col-span-5 flex flex-col items-center order-1 lg:order-2">
            <div className="relative group p-2 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-slate-700/50 overflow-hidden max-w-xs w-full">
              {/* National Banner ribbon */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 via-white to-[#ffcf00] z-10" />
              
              <div className="aspect-[3/4] rounded-xl overflow-hidden bg-slate-100">
                {!mdImageError ? (
                  <img 
                    src={mdUrls[mdIdx]} 
                    alt="Chukwuemeka Fred Agbata (CFA)" 
                    className="w-full h-full object-cover grayscale-0 group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={() => {
                      if (mdIdx < mdUrls.length - 1) {
                        console.log(`MD portrait failed to load index ${mdIdx}, trying next candidate...`);
                        setMdIdx(prev => prev + 1);
                      } else {
                        console.log("All MD portrait candidates failed, switching to local backup representation.");
                        setMdImageError(true);
                      }
                    }}
                  />
                ) : (
                  /* Fallback portrait design */
                  <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col items-center justify-center p-6 text-center text-white">
                    <Users size={32} className="text-[#ffcf00] mb-2" />
                    <span className="font-bold text-lg text-[#ffcf00]">Chukwuemeka Fred Agbata</span>
                    <span className="text-xs text-slate-400 mt-1 uppercase font-semibold">MD / CEO, Anambra State ICT Agency</span>
                  </div>
                )}
              </div>
              
              <div className="p-4 text-center">
                <h4 className="font-black text-slate-900 dark:text-white leading-none">Chukwuemeka Fred Agbata (CFA)</h4>
                <p className="text-[10px] text-blue-600 dark:text-[#ffcf00] font-bold tracking-widest uppercase mt-2">Managing Director & CEO</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. DYNAMIC FEATURE HIGHLIGHTS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10" id="highlights">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold tracking-widest text-blue-500 dark:text-[#ffcf00] uppercase">Global-Standard Governance</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
            Architecture of the Digital State
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            Uniting deep subnational connectivity frameworks with advanced artificial intelligence safety rules:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((item, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-100 dark:border-slate-800/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-slate-800 flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-gray-150">
                {item.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. RECENT FLAGSHIP INITIATIVES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10" id="projects-highlights">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div className="space-y-2">
            <span className="text-xs font-bold tracking-widest text-[#1877f2] dark:text-[#ffcf00] uppercase">Enterprise-Grade Systems</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
              Transformative Public Portals
            </h2>
          </div>
          <button 
            onClick={() => setCurrentPage('projects')}
            className="text-xs font-bold text-blue-600 dark:text-[#ffcf00] flex items-center gap-1.5 hover:underline mt-4 md:mt-0 cursor-pointer"
          >
            <span>Explore all 12 projects</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.slice(0, 3).map((proj) => (
            <div 
              key={proj.id} 
              onClick={() => setCurrentPage('projects')}
              className="group bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800/80 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <div className="h-48 overflow-hidden bg-slate-100 relative">
                <img 
                  src={proj.image} 
                  alt={proj.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                  {proj.category}
                </div>
              </div>
              <div className="p-6 space-y-4">
                <h3 className="font-extrabold text-lg text-slate-905 dark:text-white group-hover:text-blue-500 transition-colors">
                  {proj.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {proj.description}
                </p>
                <div className="pt-2 border-t border-gray-50 dark:border-slate-800 flex flex-wrap gap-1.5">
                  {proj.highlights.slice(0, 2).map((h, i) => (
                    <span key={i} className="text-[10px] font-bold bg-gray-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-md">
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MULTIMEDIA: SMART ANAMBRA PODCAST */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10" id="smart-anambra-podcast">
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 to-slate-950 rounded-3xl border border-slate-800 shadow-2xl p-8 md:p-12 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,207,0,0.15),transparent_50%)]" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Podcast Info */}
            <div className="lg:col-span-12 xl:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500/10 border border-yellow-500/25 rounded-full text-[10px] font-black uppercase tracking-wider text-[#ffcf00] animate-pulse">
                <Volume2 size={12} />
                <span>Featured Multimedia Series</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                Smart Anambra Podcast
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                The official podcast of the Anambra State ICT Agency, discussing high-level subnational digitisation, tech policymaking, artificial intelligence governance, broadband connectivity, and smart state development updates with leading industry veterans, government officials, and digital reformers. Upgrading the state's technology ecosystem under the vision of Prof. Chukwuma Charles Soludo CFR.
              </p>
              <div className="pt-2">
                <a 
                  href="https://youtube.com/@andoticta?si=Y0ymgwNKAJjI8fWw" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-red-600 hover:bg-red-500 px-6 py-3 text-xs font-extrabold transition-all hover:scale-[1.03] active:scale-95 shadow-lg shadow-red-600/20 hover:shadow-red-600/30 cursor-pointer"
                  id="podcast-youtube-cta"
                >
                  <Youtube size={16} />
                  <span>Watch on our official YouTube channel</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>

            {/* Glowing Podcast Visual Graphic */}
            <div className="lg:col-span-12 xl:col-span-5 flex justify-center items-center">
              <div className="relative group w-full max-w-sm aspect-video rounded-2xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center p-6 text-center overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-[#ffcf00]/5 opacity-10 group-hover:opacity-25 transition-opacity" />
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-500 to-[#ffcf00] flex items-center justify-center text-white shadow-xl animate-pulse cursor-pointer">
                  <Play size={24} className="fill-current translate-x-0.5" />
                </div>
                <span className="text-sm font-extrabold tracking-tight text-white mt-4">Smart Anambra Podcast</span>
                <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase mt-1">Anambra State ICT Agency</span>
                
                {/* Visual Audio Wave */}
                <div className="flex items-end gap-1 mt-6 h-8">
                  <div className="w-1 bg-blue-500 rounded-full h-3 animate-bounce shadow-md" style={{ animationDelay: '0.1s' }} />
                  <div className="w-1 bg-[#ffcf00] rounded-full h-6 animate-bounce shadow-md" style={{ animationDelay: '0.4s' }} />
                  <div className="w-1 bg-blue-500 rounded-full h-8 animate-bounce shadow-md" style={{ animationDelay: '0.2s' }} />
                  <div className="w-1 bg-[#ffcf00] rounded-full h-5 animate-bounce shadow-md" style={{ animationDelay: '0.6s' }} />
                  <div className="w-1 bg-blue-500 rounded-full h-7 animate-bounce shadow-md" style={{ animationDelay: '0.3s' }} />
                  <div className="w-1 bg-[#ffcf00] rounded-full h-4 animate-bounce shadow-md" style={{ animationDelay: '0.5s' }} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* STATEWIDE NEWSLETTER SUBSCRIPTION PORTAL */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10" id="newsletter-signup-portal">
        <div className="bg-slate-50 dark:bg-slate-900/40 border border-gray-200 dark:border-slate-800 p-8 md:p-12 rounded-3xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-3 text-center lg:text-left max-w-lg">
            <div className="inline-flex items-center gap-1.5 text-[#1877f2] dark:text-[#ffcf00] font-black text-xs uppercase tracking-wider">
              <Bell size={14} />
              <span>Official Subscription Channel</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
              Sovereign Updates Newsletter
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Subscribe to receive verified brief updates directly from the Anambra State ICT Agency. Stay in sync with state tech policy briefs, cloud additions, and broadband fiber rollout metrics.
            </p>
          </div>

          <div className="w-full max-w-md">
            <form onSubmit={handleSubscribe} className="space-y-3" id="newsletter-form">
              <div className="relative">
                <input 
                  type="email" 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full bg-white dark:bg-slate-950 border border-gray-200 dark:border-slate-800 text-slate-900 dark:text-white px-5 py-4 pl-12 rounded-2xl outline-none focus:border-blue-500 dark:focus:border-[#ffcf00] text-sm font-semibold transition-all shadow-sm"
                  required
                  disabled={subscribing}
                />
                <Mail size={16} className="absolute left-4 top-4 text-slate-400" />
              </div>

              <button 
                type="submit"
                disabled={subscribing}
                className="w-full bg-blue-600 hover:bg-blue-500 dark:bg-[#ffcf00] dark:text-slate-950 dark:hover:bg-yellow-400 text-white font-extrabold text-sm py-4 rounded-2xl cursor-pointer hover:shadow-lg transition-all"
              >
                {subscribing ? 'Subscribing...' : 'Subscribe to Updates'}
              </button>

              {subMessage && (
                <div 
                  className={`p-4 rounded-2xl text-xs font-semibold ${
                    subMessage.type === 'success' 
                      ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' 
                      : 'bg-red-500/15 text-red-600 dark:text-red-450 border border-red-500/20'
                  }`}
                >
                  {subMessage.text}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* 7. BRAGGING STATEMENT */}
      <section className="bg-slate-950 text-white py-20 relative overflow-hidden text-center rounded-3xl mx-auto max-w-7xl px-4" id="home-brag">
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[gradient-to-t,rgba(24,119,242,0.1),transparent]" />
        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <Trophy size={44} className="text-[#ffcf00] mx-auto animate-bounce" />
          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-none">
            “Anambra is not preparing for the future.<br />
            Anambra is already building it.”
          </h2>
          <p className="text-slate-400 text-xs md:text-sm tracking-widest uppercase font-black">
            - Prof. Chukwuma Charles Soludo CFR • Executive Governor of Anambra State
          </p>
        </div>
      </section>

    </div>
  );
}
