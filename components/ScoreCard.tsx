'use client';
import React from 'react';

interface ScoreCardProps {
  score: number;
  level: string;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({ score, level }) => {
  const getScoreColor = (s: number) => {
    if (s >= 90) return 'text-emerald-400';
    if (s >= 75) return 'text-blue-400';
    if (s >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBg = (s: number) => {
    if (s >= 90) return 'bg-emerald-500';
    if (s >= 75) return 'bg-blue-500';
    if (s >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const scoreColor = getScoreColor(score);
  const scoreBg = getScoreBg(score);

  return (
    <div className="h-full flex flex-col justify-between glass rounded-2xl p-6 relative overflow-hidden">
      {/* Decorative gradient orb */}
      <div className={`absolute -top-10 -right-10 w-40 h-40 ${scoreBg} rounded-full blur-[80px] opacity-15`} />

      <div>
        <h3 className="text-neutral-400 font-mono text-xs uppercase tracking-wider mb-2 font-semibold">GitGrade Score</h3>
        <div className="flex items-baseline gap-2">
          <span className={`text-6xl md:text-7xl font-bold tracking-tighter ${scoreColor}`}>{score}</span>
          <span className="text-neutral-500 text-xl font-medium">/100</span>
        </div>
      </div>

      <div className="mt-8">
        <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden mb-3">
          <div 
            className={`h-full ${scoreBg} transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(0,0,0,0.5)]`} 
            style={{ width: `${score}%` }}
          />
        </div>
        <div className="flex justify-between items-end">
           <div>
             <p className="text-xs text-neutral-400 mb-1 font-medium">Classification</p>
             <p className="text-xl font-bold text-white tracking-tight">{level}</p>
           </div>
           <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase bg-white/10 border border-white/10 text-neutral-200 tracking-wider`}>
              Verified
           </div>
        </div>
      </div>
    </div>
  );
};