import React from 'react';
import { 
  History, 
  Milestone, 
  ShieldCheck, 
  Network, 
  GraduationCap, 
  Compass, 
  Workflow, 
  Users 
} from 'lucide-react';

export default function About() {
  const milestoneTimeline = [
    {
      year: "2023",
      title: "The Kano Consensus & Foundation Layout",
      description: "Standardisation of administrative messaging systems, introduction of state Second-Level domain compliance, and receiving Best ICT Infrastructure awards in Kano peer-reviews."
    },
    {
      year: "2024",
      title: "Wide Connectivity Accelerators",
      description: "Laying 700+ KM fibre-backbone lines cross-connecting 11+ LGA municipal structures. Enforcement of strict Right-of-Way fee exemptions to speed private state telecom setups."
    },
    {
      year: "2025",
      title: "Unified Digital Authentication (Jos Peer Raves)",
      description: "Release of ANSC-EID digital citizen identity cards on Play Store, developed via homegrown state intern pools. Anambra State ICT Agency wins national gold twice in a row."
    },
    {
      year: "2026",
      title: "Nigeria's First AI-Native Government Portal",
      description: "Provisioning Anambra sovereign local cloud architectures and releasing SmartGov AI conversational agents to automate citizen workflow summaries."
    }
  ];

  const achievementSectors = [
    {
      icon: <Network size={20} className="text-blue-500" />,
      title: "Digital Transformation & Infrastructure",
      details: [
        "Transitioned state records onto robust, secure sovereign local Anambra Cloud frameworks",
        "Widespread fibre backbone linking 11+ LGAs directly to primary administrative offices",
        "Unified Messaging System (UMS) enforcing standard @anambrastate.gov.ng digital IDs for secure communication"
      ]
    },
    {
      icon: <ShieldCheck size={20} className="text-purple-500" />,
      title: "Sovereign Cybersecurity & Standards",
      details: [
        "Enforced standardized 2FA and multi-factor cryptographic login across civil operations",
        "Secured public databases via second-level root directives against foreign interference",
        "Developed clear operational SOP guidelines with formal version track capabilities"
      ]
    },
    {
      icon: <GraduationCap size={20} className="text-amber-500" />,
      title: "Human Capital & Tech Hub Incubation",
      details: [
        "Empowered youth-led interns to build official ANSC-EID secure identity frameworks",
        "Conducted massive digital productivity masterclasses for over 200 workstation centers",
        "Built close partnerships with homegrown state incubators to nurture elite local developers"
      ]
    }
  ];

  return (
    <div className="space-y-20 pb-20 select-none animate-fade-in" id="legacy-page-container">
      
      {/* 1. COMPACT LEGACY HERO */}
      <section className="relative overflow-hidden bg-[#0b1220] py-16 text-white rounded-3xl" id="legacy-hero">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(24,119,242,0.1),transparent_50%)] animate-pulse" />
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4 px-4">
          <span className="text-xs font-bold bg-blue-500/10 border border-blue-500/20 text-blue-400 px-3 py-1 rounded-full uppercase tracking-wider">
            Our Legacy & Story
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Four Years. One Foundation Laid.
          </h1>
          <p className="text-slate-300 text-sm max-w-2xl mx-auto">
            From fragmented subnational setups to Nigeria's first fully unified AI-native government ecosystem. Explore our history of digital transformation.
          </p>
        </div>
      </section>

      {/* 2. TIMELINE COMPONENT */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8" id="transformation-timeline">
        <div className="text-center mb-16 space-y-2">
          <span className="text-xs font-extrabold text-blue-500 uppercase">Chronology of Success</span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Our Transformation Timeline</h2>
        </div>

        <div className="relative border-l-2 border-gray-100 dark:border-slate-800 ml-4 md:ml-10 space-y-12">
          {milestoneTimeline.map((item, index) => (
            <div key={index} className="relative pl-8 group">
              {/* Timeline Marker bulb */}
              <div className="absolute -left-[11px] top-1.5 w-5 h-5 rounded-full bg-white dark:bg-slate-950 border-4 border-blue-600 group-hover:border-[#ffcf00] transition-colors" />
              
              <div className="space-y-2">
                <span className="inline-block text-sm font-black text-blue-600 dark:text-[#ffcf00] bg-blue-50 dark:bg-slate-900 px-2.5 py-1 rounded-lg">
                  {item.year}
                </span>
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CORE SECTOR TRANSFORMATION ACHIEVEMENT MODULE */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10" id="accomplishments">
        <div className="text-center mb-16 space-y-2">
          <span className="text-xs font-extrabold text-blue-500 uppercase">Credibility & Impact</span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Our Tactical Accomplishments</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {achievementSectors.map((sector, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 space-y-6">
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-slate-800 flex items-center justify-center">
                {sector.icon}
              </div>
              <h3 className="font-extrabold text-lg text-slate-909 dark:text-white leading-tight">
                {sector.title}
              </h3>
              <ul className="space-y-3">
                {sector.details.map((detail, dIdx) => (
                  <li key={dIdx} className="flex items-start gap-2.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    <span className="text-blue-600 dark:text-[#ffcf00] font-black text-sm mt-0.5">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 4. MISSION AND VISION CREDENTIALS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" id="agency-mission-vision">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-blue-600 text-white space-y-4 shadow-lg hover:shadow-xl transition-all">
            <span className="text-xs font-bold bg-white/10 uppercase py-1 px-3 rounded-full text-[#ffcf00]">Our Strategic Mission</span>
            <p className="font-bold text-lg">“Supporting the delivery of Everything Technology and Technology Everywhere.”</p>
            <p className="text-xs text-blue-100 leading-relaxed">
              We guide government bodies, municipal boards, and youth hubs to build inter-compatible systems that accelerate the transaction cycles of Anambra.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-[#ffcf00] text-slate-950 space-y-4 shadow-lg hover:shadow-xl transition-all">
            <span className="text-xs font-bold bg-white/25 uppercase py-1 px-3 rounded-full text-slate-950">Our Unifying Vision</span>
            <p className="font-bold text-lg">“To Build A Digitally Transformed Anambra State.”</p>
            <p className="text-xs text-slate-800 leading-relaxed">
              Setting global technological benchmarks right at home. We aim to secure full subnational sovereignty, enabling sustainable broadband connectivity and localized AI governance models.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
