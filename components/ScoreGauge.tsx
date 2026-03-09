import React from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';

interface ScoreGaugeProps {
  score: number;
}

const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score }) => {
  const data = [{ name: 'Score', value: score, fill: '#6366f1' }]; // Indigo-500

  // Determine color based on score for a nice visual touch
  let color = '#ef4444'; // Red
  if (score > 40) color = '#f59e0b'; // Amber
  if (score > 70) color = '#10b981'; // Emerald

  const dataWithColor = [{ ...data[0], fill: color }];

  return (
    <div className="relative w-48 h-48 flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart 
          innerRadius="70%" 
          outerRadius="100%" 
          barSize={15} 
          data={dataWithColor} 
          startAngle={90} 
          endAngle={-270}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar
            background
            clockWise
            dataKey="value"
            cornerRadius={10}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-4xl font-bold text-slate-800">{score}</span>
        <span className="text-xs uppercase tracking-wider text-slate-500 font-medium">Fit Score</span>
      </div>
    </div>
  );
};

export default ScoreGauge;