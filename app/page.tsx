'use client';

import React, { useState, useEffect } from 'react';
import { InputSection } from '../components/InputSection';
import { ScoreCard } from '../components/ScoreCard';
import { MetricsChart } from '../components/MetricsChart';
import { Roadmap } from '../components/Roadmap';
import { analyzeRepository } from '../services/geminiService';
import { AnalysisState, RepoAnalysis } from '../types';
import { ShieldCheck, Zap, BookOpen, AlertTriangle, ExternalLink, Layers, RotateCcw, ArrowRight, Code2 } from 'lucide-react';

const TerminalLoader = () => {
  const [logs, setLogs] = useState<string[]>([]);
  
  useEffect(() => {
    const messages = [
      "Connecting to GitHub gateway...",
      "Cloning repository metadata...",
      "Analyzing file structure...",
      "Running static code analysis...",
      "Checking test coverage reports...",
      "Parsing README and documentation...",
      "Evaluating commit history patterns...",
      "Generating final scorecard..."
    ];
    
    let delay = 0;
    messages.forEach((msg, index) => {
      delay += Math.random() * 800 + 400;
      setTimeout(() => {
        setLogs(prev => [...prev, `> ${msg}`]);
      }, delay);
    });
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto mt-20 px-4 font-mono text-sm">
      <div className="glass rounded-xl overflow-hidden border border-neutral-800 bg-[#0A0A0A]">
        <div className="bg-[#1a1a1a] px-4 py-2 border-b border-neutral-800 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          <span className="ml-2 text-xs text-neutral-400">system_analysis.exe</span>
        </div>
        <div className="p-6 min-h-[300px] flex flex-col justify-end">
          {logs.map((log, i) => (
            <div key={i} className="text-green-400 mb-1 font-normal animate-fade-in break-words tracking-wide">
              {log}
            </div>
          ))}
          <div className="flex items-center gap-2 text-green-400">
            <span>&gt;</span>
            <span className="w-2 h-4 bg-green-400 animate-pulse"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

const AnalysisView = ({ data, onReset }: { data: RepoAnalysis, onReset: () => void }) => (
  <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 pb-20 animate-fade-in">
    {/* Bento Grid Layout */}
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4 auto-rows-min">
      
      {/* 1. Score Card - Large Top Left */}
      <div className="md:col-span-1 md:row-span-2 min-h-[320px]">
        <ScoreCard score={data.score} level={data.level} />
      </div>

      {/* 2. Executive Summary - Top Center */}
      <div className="md:col-span-2 md:row-span-1 glass rounded-2xl p-6 border-l-4 border-l-blue-500">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="text-blue-400" size={20} />
          <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-300">Analysis Summary</h2>
        </div>
        <p className="text-white text-sm leading-7 font-light tracking-wide">
          {data.summary}
        </p>
      </div>

      {/* 3. Tech Stack - Top Right */}
      <div className="md:col-span-1 glass rounded-2xl p-6 flex flex-col justify-center min-h-[160px]">
         <div className="flex items-center gap-2 mb-4">
            <Layers size={18} className="text-neutral-400"/>
            <h3 className="text-xs font-bold uppercase text-neutral-400">Tech Stack</h3>
         </div>
         <div className="flex flex-wrap gap-2">
            {data.techStack.map(tech => (
              <span key={tech} className="text-[11px] bg-white/10 text-white px-3 py-1.5 rounded-md border border-white/10 font-mono tracking-tight">
                {tech}
              </span>
            ))}
         </div>
      </div>

      {/* 4. Strengths & Weaknesses - Middle Row */}
      <div className="md:col-span-2 md:row-span-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="glass rounded-2xl p-5 border-t border-t-green-500/50">
           <h4 className="text-green-400 text-xs font-bold uppercase mb-4 flex items-center gap-2"><ShieldCheck size={16}/> Strengths</h4>
           <ul className="space-y-3">
              {data.strengths.slice(0,3).map((s, i) => (
                <li key={i} className="text-sm text-neutral-300 flex items-start gap-3">
                  <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  <span className="leading-snug">{s}</span>
                </li>
              ))}
           </ul>
        </div>
        <div className="glass rounded-2xl p-5 border-t border-t-red-500/50">
           <h4 className="text-red-400 text-xs font-bold uppercase mb-4 flex items-center gap-2"><AlertTriangle size={16}/> Improvement</h4>
           <ul className="space-y-3">
              {data.weaknesses.slice(0,3).map((s, i) => (
                <li key={i} className="text-sm text-neutral-300 flex items-start gap-3">
                  <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-500"></span>
                  <span className="leading-snug">{s}</span>
                </li>
              ))}
           </ul>
        </div>
      </div>

      {/* 5. Metrics Chart - Bottom Left */}
      <div className="md:col-span-1 md:row-span-1 glass rounded-2xl p-4 flex flex-col items-center justify-center overflow-hidden">
        <div className="w-full">
           <MetricsChart data={data.metrics} />
        </div>
      </div>

      {/* 6. Roadmap - Right Vertical Column */}
      <div className="md:col-span-1 md:row-span-2">
         <Roadmap steps={data.roadmap} />
      </div>

      {/* 7. Sources (Span bottom) */}
      {data.sources && data.sources.length > 0 && (
        <div className="md:col-span-3 glass rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 overflow-hidden">
            <div className="flex items-center gap-2 px-0 sm:px-2 sm:border-r border-neutral-700 pr-4 mb-2 sm:mb-0">
               <BookOpen size={16} className="text-neutral-400"/>
               <span className="text-xs font-bold uppercase text-neutral-400">Sources</span>
            </div>
            <div className="flex gap-2 overflow-x-auto no-scrollbar w-full sm:w-auto pb-1 sm:pb-0">
              {data.sources.map((source, idx) => (
                <a 
                  key={idx} 
                  href={source.uri} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-shrink-0 flex items-center gap-1.5 text-[10px] bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white px-3 py-1.5 rounded-full border border-neutral-700 transition-colors"
                >
                  <span className="truncate max-w-[150px]">{source.title}</span>
                  <ExternalLink size={10} />
                </a>
              ))}
            </div>
        </div>
      )}

      {/* 8. Bottom Action Button - Analyze Another */}
      <div className="md:col-span-4 flex justify-center mt-12 mb-8">
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            onReset();
          }}
          className="group relative inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 font-mono text-sm font-medium text-white transition-all duration-300 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/20 focus:ring-offset-black"
        >
          <span className="relative flex items-center gap-3">
            <RotateCcw className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors group-hover:rotate-180 duration-500" />
            Analyze Another Repository
            <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-white transition-all group-hover:translate-x-1" />
          </span>
        </button>
      </div>

    </div>
  </div>
);

export default function Home() {
  const [analysis, setAnalysis] = useState<AnalysisState>({
    status: 'idle',
    data: null,
    error: null,
  });

  const handleAnalyze = async (url: string) => {
    setAnalysis({ status: 'loading', data: null, error: null });
    try {
      const result = await analyzeRepository(url);
      setAnalysis({ status: 'success', data: result, error: null });
    } catch (err: any) {
      setAnalysis({ status: 'error', data: null, error: err.message });
    }
  };

  const handleReset = () => {
    setAnalysis({ status: 'idle', data: null, error: null });
  };

  return (
    <div className="min-h-screen flex flex-col">
      
      {/* Minimal Header */}
      <nav className="fixed top-0 w-full z-50 px-4 sm:px-6 py-4 flex justify-between items-center bg-[#050505]/90 backdrop-blur-md border-b border-white/5">
         <div className="flex items-center gap-2 hover:opacity-100 transition-opacity cursor-default">
           <div className="p-1.5 bg-white/10 rounded-lg border border-white/5">
             <Code2 size={18} className="text-white" />
           </div>
           <span className="font-mono text-sm font-bold tracking-tight text-white">gitgrade</span>
         </div>
         {analysis.status === 'success' && (
            <button 
              onClick={handleReset}
              className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-mono text-neutral-300 hover:text-white transition-all group"
            >
              <RotateCcw size={12} className="group-hover:-rotate-180 transition-transform duration-500" />
              <span className="hidden sm:inline">NEW SCAN</span>
              <span className="sm:hidden">RESET</span>
            </button>
         )}
      </nav>

      <main className="flex-grow pt-24">
        {analysis.status === 'idle' && (
          <InputSection onAnalyze={handleAnalyze} isLoading={false} />
        )}

        {analysis.status === 'loading' && (
          <TerminalLoader />
        )}

        {analysis.status === 'error' && (
          <div className="flex flex-col items-center justify-center mt-20 px-4 animate-fade-in">
            <div className="bg-red-950/20 border border-red-500/20 rounded-2xl p-8 max-w-md w-full text-center backdrop-blur-md">
              <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/20">
                <AlertTriangle className="text-red-500" size={24} />
              </div>
              <h3 className="text-red-400 font-semibold mb-2">Analysis Terminated</h3>
              <p className="text-neutral-300 text-sm mb-6 leading-relaxed">{analysis.error}</p>
              <button 
                onClick={handleReset}
                className="w-full text-white bg-neutral-800 hover:bg-neutral-700 px-6 py-3 rounded-xl text-xs font-mono transition-colors border border-neutral-700"
              >
                RETRY_CONNECTION
              </button>
            </div>
          </div>
        )}

        {analysis.status === 'success' && analysis.data && (
           <div className="mt-4">
             <AnalysisView data={analysis.data} onReset={handleReset} />
           </div>
        )}
      </main>
      
      {/* Footer */}
       <footer className="py-6 mt-auto border-t border-white/5 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-[10px] text-neutral-500 font-mono uppercase">
          <p className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
            System Status: Operational
          </p>
          <p>Powered by Gemini 2.5 Flash</p>
        </div>
      </footer>
    </div>
  );
}