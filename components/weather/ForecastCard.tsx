import React from 'react';
import { ForecastDay } from '@/types/weather';
import GlassPanel from '../ui/GlassPanel';
import { getWeatherIcon } from '@/lib/weatherUtils';
import { CloudRain } from 'lucide-react';
import { motion } from 'framer-motion';

interface ForecastCardProps {
  day: ForecastDay;
  index: number;
}

export default function ForecastCard({ day, index }: ForecastCardProps) {
  // Use UTC to avoid local timezone shifting the date across midnight
  // The API returns YYYY-MM-DD
  const dateObj = new Date(`${day.date}T12:00:00Z`);
  const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' });
  const monthDay = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="h-full"
    >
      <GlassPanel className="p-4 flex flex-col items-center justify-between h-full bg-white/5 hover:bg-white/10 transition-colors">
        <div className="text-center mb-2">
          <p className="text-lg font-semibold text-white">{dayName}</p>
          <p className="text-xs text-gray-400">{monthDay}</p>
        </div>
        
        <img 
          src={getWeatherIcon(day.icon)} 
          alt={day.condition} 
          className="w-16 h-16 my-2 drop-shadow-md"
        />
        
        <div className="flex w-full justify-between items-center px-2 mb-3">
          <span className="text-lg font-bold text-white">{day.tempMax}°</span>
          <span className="text-sm font-medium text-gray-400">{day.tempMin}°</span>
        </div>

        <div className="w-full flex items-center justify-center space-x-2 text-xs text-blue-300 bg-blue-500/10 rounded-full py-1">
          <CloudRain className="w-3 h-3" />
          <span>{day.pop}%</span>
        </div>
      </GlassPanel>
    </motion.div>
  );
}
