'use client';

import React, { useEffect, useState } from 'react';
import { SavedCity, WeatherData } from '@/types/weather';
import { getWeather } from '@/lib/weatherApi';
import GlassPanel from './ui/GlassPanel';
import { X, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { getWeatherIcon } from '@/lib/weatherUtils';

interface SavedCityCardProps {
  city: SavedCity;
  onRemove: (id: string) => void;
}

export default function SavedCityCard({ city, onRemove }: SavedCityCardProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;
    getWeather(city.name)
      .then((data) => {
        if (isMounted) setWeather(data);
      })
      .catch(console.error)
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => { isMounted = false; };
  }, [city.name]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
    >
      <GlassPanel 
        className="p-5 cursor-pointer hover:bg-white/10 transition-colors relative group overflow-hidden"
        onClick={() => router.push(`/dashboard/${encodeURIComponent(city.name)}`)}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(city.id);
          }}
          className="absolute top-2 right-2 p-2 bg-red-500/20 text-red-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/40 z-10"
          aria-label="Remove city"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center justify-between relative z-0">
          <div>
            <h3 className="text-xl font-bold text-white">{city.name}</h3>
            <p className="text-sm text-gray-400">{city.country}</p>
          </div>
          
          <div className="text-right flex flex-col items-end">
            {loading ? (
              <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            ) : weather ? (
              <>
                <span className="text-3xl font-bold text-white">{weather.temperature}°</span>
                <span className="text-xs text-gray-400 capitalize">{weather.condition}</span>
              </>
            ) : (
              <span className="text-sm text-gray-500">N/A</span>
            )}
          </div>
        </div>
        
        {weather && (
          <div className="absolute -bottom-8 -right-8 opacity-20 pointer-events-none">
            <img src={getWeatherIcon(weather.icon)} alt="" className="w-40 h-40" />
          </div>
        )}
      </GlassPanel>
    </motion.div>
  );
}
