'use client';

import React from 'react';
import { HourlyPoint } from '@/types/weather';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import GlassPanel from '../ui/GlassPanel';

interface HourlyChartProps {
  data: HourlyPoint[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-night-900 border border-glass-border p-3 rounded-xl shadow-xl">
        <p className="text-gray-300 text-sm mb-1">{label}</p>
        <p className="text-white font-bold text-lg">{payload[0].value}°C</p>
        {payload[1] && <p className="text-blue-400 text-sm text-right mt-1">{payload[1].value}% rain</p>}
      </div>
    );
  }
  return null;
};

export default function HourlyChart({ data }: HourlyChartProps) {
  return (
    <GlassPanel className="w-full p-4 md:p-6 mt-8">
      <h3 className="text-lg font-semibold text-white mb-6">24-Hour Forecast</h3>
      <div className="w-full h-64 overflow-x-auto overflow-y-hidden">
        <div className="min-w-[600px] h-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
              <XAxis 
                dataKey="time" 
                stroke="#9ca3af" 
                fontSize={12} 
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                yAxisId="temp"
                stroke="#9ca3af" 
                fontSize={12} 
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => `${val}°`}
              />
              <YAxis 
                yAxisId="pop"
                orientation="right"
                hide
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                yAxisId="temp"
                type="monotone" 
                dataKey="temperature" 
                stroke="#60a5fa" 
                strokeWidth={3}
                dot={{ r: 4, fill: '#1e3a8a', strokeWidth: 2, stroke: '#60a5fa' }}
                activeDot={{ r: 6, fill: '#60a5fa', stroke: '#fff' }}
              />
              <Line 
                yAxisId="pop"
                type="monotone" 
                dataKey="pop" 
                stroke="#3b82f6" 
                strokeWidth={0}
                dot={false}
                activeDot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </GlassPanel>
  );
}
