'use client';
import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { RepoMetric } from '../types';

interface MetricsChartProps {
  data: RepoMetric[];
}

export const MetricsChart: React.FC<MetricsChartProps> = ({ data }) => {
  return (
    <div className="w-full h-[300px] relative">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#333" strokeDasharray="3 3" />
          <PolarAngleAxis 
            dataKey="name" 
            tick={{ fill: '#737373', fontSize: 10, fontFamily: 'JetBrains Mono' }} 
          />
          <PolarRadiusAxis 
            angle={30} 
            domain={[0, 10]} 
            tick={false} 
            axisLine={false} 
          />
          <Radar
            name="Rating"
            dataKey="score"
            stroke="#EDEDED"
            strokeWidth={2}
            fill="#EDEDED"
            fillOpacity={0.1}
          />
          <Tooltip 
            cursor={false}
            contentStyle={{ 
              backgroundColor: 'rgba(10, 10, 10, 0.9)', 
              backdropFilter: 'blur(4px)',
              borderColor: '#333', 
              color: '#fff', 
              fontSize: '12px',
              borderRadius: '8px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
            }}
            itemStyle={{ color: '#fff' }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};