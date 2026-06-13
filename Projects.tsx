import React, { useState } from 'react';
import { Search, Filter, Sparkles, Building, Play, ChevronDown, CheckCircle } from 'lucide-react';
import { Project } from '../types';

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];

  // Filtering list 
  const filteredProjects = projects.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleExpand = (id: string) => {
    if (expandedProjectId === id) {
      setExpandedProjectId(null);
    } else {
      setExpandedProjectId(id);
    }
  };

  return (
    <div className="space-y-12 pb-20 select-none animate-fade-in" id="projects-page-container">
      
      {/* 1. SECTION HEADER */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-black tracking-widest text-[#1877f2] dark:text-[#ffcf00] uppercase">Four Years. One Foundation Laid.</span>
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white">
          Real platforms. Real infrastructure. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-[#1877f2]">Real impact.</span>
        </h1>
        <p className="text-sm text-slate-500 leading-relaxed">
          Explore the official 12 foundational systems designed by Anambra State ICT Agency aligning standard enterprise guidelines to modernize civil operations and empower local software builders.
        </p>
      </div>

      {/* 2. FILTERS AND SEARCH PANEL */}
      <div className="bg-slate-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-6 rounded-3xl max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 items-center" id="search-filter-panel">
        
        {/* Search */}
        <div className="md:col-span-4 relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs font-semibold pl-11 pr-4 py-3 bg-white dark:bg-slate-950 rounded-xl border border-gray-200 dark:border-slate-800 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Categories Carousel / Tabs */}
        <div className="md:col-span-8 flex flex-wrap gap-2 items-center justify-start md:justify-end">
          <Filter size={14} className="text-slate-400 mr-2" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-[10px] font-extrabold px-3 py-1.5 rounded-lg transition-all uppercase tracking-wider cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white hover:bg-gray-100 text-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* 3. PROJECTS GRID */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 sm:px-6" id="projects-grid">
          {filteredProjects.map((p) => {
            const isExpanded = expandedProjectId === p.id;

            return (
              <div 
                key={p.id}
                className={`group bg-white dark:bg-slate-900 rounded-3xl border transition-all duration-300 overflow-hidden cursor-pointer ${
                  isExpanded 
                    ? 'border-blue-500 dark:border-[#ffcf00] shadow-2xl scale-[1.01]' 
                    : 'border-gray-100 dark:border-slate-800/80 shadow-sm hover:shadow-xl'
                }`}
                onClick={() => toggleExpand(p.id)}
                id={`project-card-${p.id}`}
              >
                {/* Visual Header */}
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  <img 
                    src={p.image} 
                    alt={p.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Category overlay */}
                  <div className="absolute top-4 left-4 bg-slate-950/80 text-white font-extrabold text-[9px] uppercase tracking-widest px-3 py-1 rounded-full backdrop-blur-sm">
                    {p.category}
                  </div>
                  {/* Glowing expand indicator */}
                  <div className="absolute bottom-4 right-4 bg-blue-600 text-white p-2 rounded-full shadow-lg group-hover:bg-[#ffcf00] group-hover:text-slate-950 transition-colors">
                    <ChevronDown size={14} className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </div>
                </div>

                {/* Card description */}
                <div className="p-6 space-y-4">
                  <h3 className="font-extrabold text-lg text-slate-902 text-slate-900 dark:text-white leading-tight">
                    {p.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed leading-relaxed">
                    {p.description}
                  </p>

                  {/* Highlights section hidden by default, expandable */}
                  {isExpanded ? (
                    <div className="border-t border-gray-100 dark:border-slate-800 pt-4 space-y-3 animate-slide-up">
                      <span className="text-[10px] font-black text-blue-600 dark:text-[#ffcf00] tracking-wider uppercase block">System Features</span>
                      <div className="space-y-2">
                        {p.highlights.map((h, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-350">
                            <CheckCircle size={14} className="text-emerald-500 shrink-0" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                      <div className="pt-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[9px] font-bold bg-blue-500/10 text-blue-600 dark:text-[#ffcf00]">
                          <Sparkles size={10} className="animate-pulse" />
                          <span>Standard Compliant</span>
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {p.highlights.slice(0, 2).map((h, idx) => (
                        <span key={idx} className="text-[9px] font-bold bg-gray-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded">
                          {h}
                        </span>
                      ))}
                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-50 dark:bg-slate-900 rounded-3xl max-w-4xl mx-auto space-y-2">
          <p className="font-bold text-lg text-slate-600 dark:text-slate-400">No projects found matching current queries.</p>
          <p className="text-xs text-slate-400">Try selecting another category or searching different terms.</p>
        </div>
      )}

      {/* 4. PERSISTENT PROCLAMATION */}
      <section className="bg-slate-900 text-white rounded-3xl max-w-6xl mx-auto p-12 text-center space-y-4 shadow-xl border border-slate-800" id="projects-proclamation">
        <h3 className="font-black text-2xl md:text-4xl text-[#ffcf00] leading-none">
          “Anambra is not preparing for the future.<br/>Anambra is already building it.”
        </h3>
        <p className="text-[10px] text-slate-400 font-extrabold tracking-widest uppercase">
          Official Proclamation of Anambra State Digital Infrastructure
        </p>
      </section>

    </div>
  );
}
