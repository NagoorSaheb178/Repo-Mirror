import React, { useState } from 'react';
import { Search, Github, ArrowRight, Command } from 'lucide-react';

interface InputSectionProps {
  onAnalyze: (url: string) => void;
  isLoading: boolean;
}

export const InputSection: React.FC<InputSectionProps> = ({ onAnalyze, isLoading }) => {
  const [url, setUrl] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onAnalyze(url);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[60vh] animate-slide-up px-4">
      <div className="text-center space-y-6 mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neutral-400">
           <span>v2.5.0</span>
           <span className="w-1 h-1 rounded-full bg-green-500"></span>
           <span className="text-green-500">System Online</span>
        </div>
        
        <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 pb-2">
          Repository Mirror
        </h1>
        <p className="text-secondary text-base md:text-xl max-w-xl mx-auto font-light leading-relaxed">
          The AI-powered code auditor. <br className="hidden md:block"/> 
          Get a harsh, honest evaluation of your GitHub projects.
        </p>
      </div>

      <div className="w-full max-w-2xl relative z-10 group">
        {/* Glow Effect behind input */}
        <div className={`absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition duration-1000 ${isFocused ? 'opacity-50' : ''}`}></div>
        
        <form onSubmit={handleSubmit} className="relative">
          <div className={`flex items-center bg-[#0F0F0F] border border-white/10 p-2 rounded-xl shadow-2xl transition-all duration-300 ${isFocused ? 'border-white/20 ring-1 ring-white/10' : ''}`}>
            
            <div className="pl-2 md:pl-4 pr-2 md:pr-3 text-neutral-500">
              <Github strokeWidth={1.5} size={20} />
            </div>
            
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="github.com/username/repo"
              className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder-neutral-600 px-2 py-3 md:py-4 text-sm md:text-lg font-mono w-full min-w-0"
              disabled={isLoading}
              spellCheck={false}
            />

            <button
              type="submit"
              disabled={isLoading || !url}
              className="bg-white text-black hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium py-2 px-4 md:py-3 md:px-6 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap"
            >
              <span className="text-sm md:text-base">Analyze</span>
              {!isLoading && <ArrowRight size={16} className="hidden md:block" />}
            </button>
          </div>
        </form>
      </div>

      {/* Suggested Repos */}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <span className="text-xs text-neutral-600 font-mono py-1.5 uppercase tracking-wider w-full text-center md:w-auto">Try analysis on:</span>
        <button onClick={() => setUrl('https://github.com/facebook/react')} className="px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/5 text-xs text-neutral-400 font-mono transition-colors">facebook/react</button>
        <button onClick={() => setUrl('https://github.com/vercel/next.js')} className="px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/5 text-xs text-neutral-400 font-mono transition-colors">vercel/next.js</button>
      </div>
    </div>
  );
};