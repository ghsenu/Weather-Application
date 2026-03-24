import React from 'react';
import { WeatherData } from '@/types/weather';
import { getWeatherIcon } from '@/lib/weatherUtils';
import GlassPanel from '../ui/GlassPanel';
import { MapPin } from 'lucide-react';

interface WeatherHeroProps {
  weather: WeatherData;
}

export default function WeatherHero({ weather }: WeatherHeroProps) {
  return (
    <GlassPanel className="p-8 flex flex-col md:flex-row items-center justify-between">
      <div className="flex flex-col items-center md:items-start mb-6 md:mb-0 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold text-white flex items-center justify-center md:justify-start gap-2">
          <MapPin className="w-8 h-8 text-blue-400" />
          {weather.city}, {weather.country}
        </h1>
        <p className="text-gray-300 mt-2 text-lg capitalize">{weather.condition}</p>
      </div>
      <div className="flex items-center gap-6">
        <img 
          src={getWeatherIcon(weather.icon)} 
          alt={weather.condition} 
          className="w-32 h-32 drop-shadow-lg object-contain"
        />
        <div className="flex flex-col text-left">
          <span className="text-7xl font-bold text-white tracking-tighter">{weather.temperature}°C</span>
          <span className="text-gray-400 text-lg mt-1 block">Feels like {weather.feelsLike}°C</span>
        </div>
      </div>
    </GlassPanel>
  );
}
