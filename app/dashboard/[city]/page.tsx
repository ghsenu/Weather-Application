'use client';

import React, { useEffect, useState } from 'react';
import { useWeather } from '@/hooks/useWeather';
import WeatherHero from '@/components/weather/WeatherHero';
import WeatherDetails from '@/components/weather/WeatherDetails';
import WeatherBackground from '@/components/weather/WeatherBackground';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';
import { motion } from 'framer-motion';
import { Bookmark, BookmarkCheck, ChevronLeft, CalendarDays } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DashboardPage({ params }: { params: { city: string } }) {
  const decodedCity = decodeURIComponent(params.city);
  const { data, loading, error } = useWeather(decodedCity);
  const router = useRouter();
  
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (data) {
      const saved = JSON.parse(localStorage.getItem('savedCities') || '[]');
      setIsSaved(saved.some((c: any) => c.name === data.city && c.country === data.country));
    }
  }, [data]);

  const toggleSave = () => {
    if (!data) return;
    const saved = JSON.parse(localStorage.getItem('savedCities') || '[]');
    if (isSaved) {
      const newSaved = saved.filter((c: any) => !(c.name === data.city && c.country === data.country));
      localStorage.setItem('savedCities', JSON.stringify(newSaved));
      setIsSaved(false);
    } else {
      saved.push({
        id: `${data.city}-${data.country}`,
        name: data.city,
        country: data.country,
        addedAt: Date.now()
      });
      localStorage.setItem('savedCities', JSON.stringify(saved));
      setIsSaved(true);
    }
  };

  if (loading) return <LoadingSkeleton />;

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center flex-grow p-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Oops!</h2>
        <p className="text-gray-400 mb-8">{error || 'City not found'}</p>
        <button onClick={() => router.push('/')} className="px-6 py-2 bg-blue-500/20 text-blue-400 rounded-full hover:bg-blue-500/30 transition border border-blue-500/30">
          Go Back Home
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <WeatherBackground conditionCode={data.conditionCode} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Top actions */}
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => router.push('/')} className="flex items-center text-gray-400 hover:text-white transition">
            <ChevronLeft className="w-5 h-5 mr-1" /> Back
          </button>
          
          <button 
            onClick={toggleSave}
            className={`flex items-center px-4 py-2 rounded-full border transition ${
              isSaved ? 'bg-green-500/20 border-green-500/50 text-green-400' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
            }`}
          >
            {isSaved ? <BookmarkCheck className="w-4 h-4 mr-2" /> : <Bookmark className="w-4 h-4 mr-2" />}
            {isSaved ? 'Saved \u2713' : 'Save City'}
          </button>
        </div>

        <WeatherHero weather={data} />
        
        <WeatherDetails weather={data} />

        {/* Link to forecast */}
        <div className="flex justify-center mt-12 w-full">
          <button 
            onClick={() => router.push(`/forecast/${encodeURIComponent(data.city)}`)}
            className="flex items-center px-8 py-4 bg-glass-bg border border-glass-border hover:bg-white/10 backdrop-blur-glass rounded-2xl text-lg text-white shadow-glass transition group"
          >
            <CalendarDays className="w-6 h-6 mr-3 text-blue-400 group-hover:text-blue-300" />
            View 5-Day Forecast
          </button>
        </div>
      </motion.div>
    </div>
  );
}
