import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Mic, RefreshCw, Layers, ShieldAlert, BadgeInfo, HelpCircle, Bot, User } from 'lucide-react';

interface ChatMessage {
  sender: 'user' | 'model';
  text: string;
}

export default function SmartGovAI() {
  const [prompt, setPrompt] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      sender: 'model',
      text: "Greetings! I am **SmartGov AI**, the sovereign digital transformation assistant for the Anambra State ICT Agency.\n\nYou can ask me regarding any of our flagship initiatives, official SOP procedures, digital identity standards, news announcements, or leadership statements. How can I facilitate your governance exploration today?"
    }
  ]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, loading]);

  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = customPrompt || prompt;
    if (!textToSend.trim() || loading) return;

    // Append user input
    const newUserMsg: ChatMessage = { sender: 'user', text: textToSend };
    setChatHistory((prev) => [...prev, newUserMsg]);
    if (!customPrompt) setPrompt('');
    setLoading(true);

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToSend,
          history: chatHistory
        })
      });

      const data = await response.json();
      if (data.error) {
        setChatHistory((prev) => [
          ...prev,
          { sender: 'model', text: `*[Error: ${data.error}]* I encountered a communication problem with the server. Please try again.` }
        ]);
      } else {
        setChatHistory((prev) => [
          ...prev,
          { sender: 'model', text: data.text }
        ]);
      }
    } catch (err) {
      setChatHistory((prev) => [
        ...prev,
        { sender: 'model', text: "*[Network Offline Fallback]* Unable to complete API handshake. Anambra sovereign cloud is operational, but standard developer sandbox connection timed out." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const smartFaqs = [
    { label: "Anambra Cloud benefits", query: "Explain the details and sovereign purpose of Anambra Cloud." },
    { label: "700km Fibre Backbone Locations", query: "What are the highlights of the statewide 700+ KM Fibre Backbone?" },
    { label: "What is ANSC-EID?", query: "Can you summarize what the ANSC-EID digital identity app is?" },
    { label: "Anambra's National Awards", query: "Can you detail the consecutive national NCCIDE awards Anambra won?" }
  ];

  return (
    <div className="space-y-8 pb-16 select-none animate-fade-in" id="ai-portal-container">
      
      {/* 1. SECTOR HEADER */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <span className="text-xs font-black tracking-widest text-blue-600 dark:text-[#ffcf00] uppercase">Nigeria's First State AI Platform</span>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">SmartGov Conversational Hub</h1>
        <p className="text-xs text-slate-500">
          Get automated briefing documents on SOP files, broadband deployment timelines, civil service regulations, and health infrastructure audits.
        </p>
      </div>

      {/* 2. MAIN CORE CHAT PLATFORM */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-6xl mx-auto" id="chat-frame-grid">
        
        {/* Helper Instructions Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-slate-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-6 rounded-2xl space-y-4">
            <h3 className="font-extrabold text-xs text-slate-800 dark:text-gray-200 tracking-wider uppercase flex items-center gap-1.5">
              <BadgeInfo size={14} className="text-blue-500" />
              <span>Sovereign Knowledge</span>
            </h3>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              SmartGov AI operates directly connected to local databases and has knowledge of Prof. Chukwuma Charles Soludo CFR’s official digital roadmap policies.
            </p>
            <div className="w-full text-[10px] space-y-2 border-t border-gray-200/50 dark:border-slate-800 pt-4">
              <div className="flex items-center gap-2 font-bold text-slate-600 dark:text-slate-350"><span className="w-1.5 h-1.5 rounded-full bg-[#ffcf00]" /> Real-time Response</div>
              <div className="flex items-center gap-2 font-bold text-slate-600 dark:text-slate-350"><span className="w-1.5 h-1.5 rounded-full bg-[#1877f2]" /> Multi-turn Context</div>
              <div className="flex items-center gap-2 font-bold text-slate-600 dark:text-slate-350"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Standardized SOP access</div>
            </div>
          </div>

          <div className="bg-blue-600 text-white rounded-2xl p-6 space-y-3 shadow-md">
            <h3 className="font-bold text-xs uppercase text-[#ffcf00]">Digital Core Note</h3>
            <p className="text-[10px] text-blue-100 leading-relaxed">
              Remember, this is an experimental subnational system currently live in Beta. Standard API rate thresholds apply statewide.
            </p>
          </div>
        </div>

        {/* Conversational Window */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm flex flex-col h-[580px]">
          
          {/* Header */}
          <div className="bg-slate-50 dark:bg-slate-950 p-4 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-blue-50 dark:bg-slate-900 flex items-center justify-center border border-blue-500/10">
                <Sparkles size={16} className="text-[#ffcf00] animate-pulse" />
              </div>
              <div>
                <span className="font-black text-xs text-slate-900 dark:text-white block">SmartGov AI • BETA</span>
                <span className="text-[9px] text-[#ffcf00] font-black uppercase">Connected via @google/genai SDK</span>
              </div>
            </div>
            <button 
              onClick={() => setChatHistory([
                {
                  sender: 'model',
                  text: "Greetings! I am **SmartGov AI**, your sovereign digital transformation partner.\n\nAsk me about our state achievements, standards documents or leadership visions."
                }
              ])}
              className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-800"
              title="Clear Session History"
            >
              <RefreshCw size={14} />
            </button>
          </div>

          {/* Interactive Messages Stream */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6" id="messages-container">
            {chatHistory.map((item, index) => (
              <div 
                key={index} 
                className={`flex gap-3 max-w-[85%] ${item.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs shrink-0 ${
                  item.sender === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-amber-500/10 border border-amber-500/15 text-[#ffcf00]'
                }`}>
                  {item.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
                </div>

                {/* Message Box */}
                <div className={`rounded-2xl p-4 text-xs leading-relaxed space-y-2 ${
                  item.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 rounded-tl-none border border-gray-100/50 dark:border-slate-800/80'
                }`}>
                  {/* Process basic markdown for rendering */}
                  <div className="whitespace-pre-line">
                    {item.text.split('\n').map((line, lIdx) => {
                      let parsedLine = line;
                      // Replace basic markdown bold
                      if (parsedLine.startsWith('- **') || parsedLine.startsWith('**')) {
                        return (
                          <p key={lIdx} className="font-semibold text-slate-900 dark:text-white my-1">
                            {parsedLine.replace(/\*\*/g, '')}
                          </p>
                        );
                      }
                      return <p key={lIdx}>{parsedLine}</p>;
                    })}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-3 max-w-[85%]">
                <div className="w-8 h-8 rounded-full bg-amber-500/10 text-[#ffcf00] flex items-center justify-center text-xs shrink-0">
                  <Bot size={14} />
                </div>
                <div className="bg-slate-50 dark:bg-slate-950 text-slate-500 border border-gray-100 dark:border-slate-800 rounded-2xl rounded-tl-none p-4 text-xs flex items-center gap-2">
                  <RefreshCw size={12} className="animate-spin text-blue-500" />
                  <span>SmartGov is reading state guidelines...</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick FAQ Chips */}
          <div className="px-6 py-2 border-t border-gray-50 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-950/20 flex flex-wrap gap-2 items-center">
            <HelpCircle size={12} className="text-slate-400" />
            <span className="text-[10px] text-slate-400 font-bold">Suggested:</span>
            {smartFaqs.map((faq, fIdx) => (
              <button
                key={fIdx}
                onClick={() => handleSendMessage(faq.query)}
                className="text-[9px] font-bold bg-white hover:bg-gray-100 border border-gray-200 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 py-1 px-2 rounded-lg cursor-pointer"
              >
                {faq.label}
              </button>
            ))}
          </div>

          {/* Input field */}
          <div className="p-4 border-t border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-2">
            <input 
              type="text"
              placeholder="Query about state cloud infrastructure, broadband rules or ANSC-EID app..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              disabled={loading}
              className="flex-1 bg-slate-50 dark:bg-slate-950 text-xs text-slate-800 dark:text-white rounded-xl px-4 py-3 border border-gray-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              onClick={() => handleSendMessage()}
              disabled={loading}
              className="p-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-md disabled:bg-slate-340 cursor-pointer"
            >
              <Send size={14} />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
