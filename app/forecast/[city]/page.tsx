'use client';

import React from 'react';
import { useForecast } from '@/hooks/useForecast';
import ForecastCard from '@/components/weather/ForecastCard';
import HourlyChart from '@/components/weather/HourlyChart';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import WeatherBackground from '@/components/weather/WeatherBackground';

export default function ForecastPage({ params }: { params: { city: string } }) {
  const decodedCity = decodeURIComponent(params.city);
  const { days, hourly, cityName, loading, error } = useForecast(decodedCity);
  const router = useRouter();

  if (loading) return <LoadingSkeleton />;

  if (error || days.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center flex-grow p-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Error</h2>
        <p className="text-gray-400 mb-8">{error || 'Forecast not found'}</p>
        <button onClick={() => router.back()} className="px-6 py-2 bg-blue-500/20 text-blue-400 rounded-full hover:bg-blue-500/30 transition border border-blue-500/30">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <WeatherBackground conditionCode={days[0]?.conditionCode || 800} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex items-center mb-8">
          <button onClick={() => router.back()} className="flex items-center text-gray-400 hover:text-white transition">
            <ChevronLeft className="w-5 h-5 mr-1" /> Back
          </button>
        </div>

        <div className="text-center md:text-left mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            5-Day Forecast
          </h1>
          <p className="text-gray-400 text-lg mt-2">for {cityName}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {days.map((day, index) => (
            <ForecastCard key={day.date} day={day} index={index} />
          ))}
        </div>

        {hourly && hourly.length > 0 && (
          <HourlyChart data={hourly} />
        )}
      </motion.div>
    </div>
  );
}
