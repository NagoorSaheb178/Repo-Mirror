'use client';
import React from 'react';
import { RoadmapStep } from '../types';
import { ArrowRight, Check, AlertCircle, Circle } from 'lucide-react';

interface RoadmapProps {
  steps: RoadmapStep[];
}

export const Roadmap: React.FC<RoadmapProps> = ({ steps }) => {
  return (
    <div className="glass rounded-2xl p-6 h-full">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          Action Plan
        </h2>
        <span className="text-xs text-neutral-400 font-mono border border-neutral-700 px-2 py-1 rounded">
          {steps.length} Steps
        </span>
      </div>

      <div className="space-y-0">
        {steps.map((step, idx) => (
          <div key={idx} className="relative pl-8 pb-8 last:pb-0 group">
            {/* Connecting Line */}
            {idx !== steps.length - 1 && (
              <div className="absolute left-[11px] top-6 bottom-0 w-[1px] bg-neutral-800 group-hover:bg-neutral-600 transition-colors" />
            )}
            
            {/* Icon Node */}
            <div className={`absolute left-0 top-1 w-6 h-6 rounded-full border border-neutral-700 bg-[#1A1A1A] flex items-center justify-center z-10 
              ${step.priority === 'High' ? 'text-red-400 shadow-[0_0_10px_rgba(248,113,113,0.15)] border-red-500/30' : 'text-neutral-400'}`}>
              <span className="text-[10px] font-mono font-bold">{idx + 1}</span>
            </div>

            <div className="flex flex-col gap-1.5">
               <div className="flex items-center gap-2">
                 <h3 className="text-sm font-bold text-gray-100 group-hover:text-blue-400 transition-colors">{step.title}</h3>
                 {step.priority === 'High' && (
                   <span className="text-[9px] font-bold uppercase bg-red-500/10 text-red-400 px-1.5 py-0.5 rounded border border-red-500/20">High Priority</span>
                 )}
               </div>
               <p className="text-sm text-neutral-400 leading-relaxed font-normal">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 pt-4 border-t border-white/5">
        <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-xs font-medium text-neutral-200 hover:text-white transition-all flex items-center justify-center gap-2">
          Export Roadmap <ArrowRight size={12} />
        </button>
      </div>
    </div>
  );
};