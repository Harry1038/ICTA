import React from 'react';
import { Trophy, Star, ShieldCheck, Flame, Medal, Award, Sparkles, AlertCircle } from 'lucide-react';
import { AwardItem } from '../types';

interface AwardsProps {
  awards: AwardItem[];
}

export default function Awards({ awards }: AwardsProps) {
  // Let's design a supreme elite masterclass accolades template

  return (
    <div className="space-y-20 pb-20 select-none animate-fade-in" id="awards-page-container">
      
      {/* 1. ACCLAIMS HEADER (ELITE DARK HERO) */}
      <section className="relative overflow-hidden bg-slate-950 text-white py-16 rounded-3xl border border-slate-900" id="awards-hero">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,207,0,0.08),transparent_50%)] animate-pulse" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6 px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffcf00]/10 border border-[#ffcf00]/25 text-xs font-bold text-[#ffcf00] tracking-widest uppercase">
            <Trophy size={12} className="text-[#ffcf00]" />
            <span>National Council Digital Champions</span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none bg-clip-text bg-gradient-to-r from-white via-amber-100 to-[#ffcf00]">
            Nationally Recognised.<br />Three Years Running.
          </h1>

          <p className="text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
            The National Council on Communications, Innovation and Digital Economy (NCCIDE) named Anambra State a leader at three consecutive national peer reviews.
          </p>
        </div>
      </section>

      {/* 2. THREE YEARS ACCOLADES GRID */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8" id="awards-timeline-interactive">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {awards.map((aw, index) => {
            // Check year for corresponding trophy accent
            const isOverallBest = aw.title.includes("Overall Winner");

            return (
              <div 
                key={aw.id}
                className={`relative bg-slate-950 text-white rounded-3xl border p-8 space-y-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 ${
                  isOverallBest 
                    ? 'border-[#ffcf00] shadow-2xl shadow-yellow-500/5 ring-1 ring-yellow-500/20' 
                    : 'border-slate-800'
                }`}
              >
                {/* Year tag indicator */}
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-black tracking-widest text-[#ffcf00]">
                    {aw.year}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center">
                    {isOverallBest ? (
                      <Trophy size={18} className="text-[#ffcf00] animate-bounce" />
                    ) : (
                      <Medal size={18} className="text-blue-400" />
                    )}
                  </div>
                </div>

                {/* Award Details card */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
                    {aw.location}
                  </span>
                  <h3 className="font-extrabold text-lg text-white leading-snug group-hover:text-[#ffcf00] transition-colors">
                    {aw.title}
                  </h3>
                </div>

                <div className="border-t border-slate-900 pt-4 space-y-3">
                  <span className="text-[10px] font-extrabold text-slate-500 uppercase block tracking-wider">Recognition Portfolio</span>
                  <ul className="space-y-3">
                    {aw.recognitionDetails.map((rec, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <Award size={12} className="text-[#ffcf00] mt-0.5 shrink-0" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom branding footer inside card */}
                {isOverallBest && (
                  <div className="pt-2">
                    <span className="inline-flex items-center gap-1 bg-yellow-405 text-[#ffcf00] bg-yellow-500/10 border border-yellow-500/15 py-1 px-3 rounded-lg text-[9px] font-black uppercase tracking-wider">
                      <Sparkles size={10} />
                      <span>Sovereign Standard #1</span>
                    </span>
                  </div>
                )}
              </div>
            );
          })}

        </div>
      </section>

      {/* 3. INFLUENTIAL BRAGGING FOOTER ACCLAIM */}
      <section className="bg-gradient-to-t from-slate-950 to-slate-900 border border-slate-800 rounded-3xl max-w-5xl mx-auto p-12 text-center relative overflow-hidden text-white" id="awards-brag-footer">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(24,119,242,0.1),transparent_50%)]" />
        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <Star size={36} className="text-[#ffcf00] mx-auto animate-pulse" />
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            “You did not build a foundation in private.<br />The country saw it.”
          </h2>
          <p className="text-[10px] tracking-widest text-[#ffcf00] uppercase font-black">
            - Official NCCIDE National Review Board Statement
          </p>
        </div>
      </section>

    </div>
  );
}
