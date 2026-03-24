'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { MapPin, Loader2 } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import GlassPanel from '@/components/ui/GlassPanel';
import { useGeoLocation } from '@/hooks/useGeoLocation';

const featuredCities = [
  { name: 'London', country: 'GB' },
  { name: 'New York', country: 'US' },
  { name: 'Tokyo', country: 'JP' },
  { name: 'Sydney', country: 'AU' },
  { name: 'Paris', country: 'FR' },
  { name: 'Dubai', country: 'AE' },
];

export default function Home() {
  const router = useRouter();
  const [isLocating, setIsLocating] = useState(false);

  const handleSearch = (city: string) => {
    router.push(`/dashboard/${encodeURIComponent(city)}`);
  };

  const handleLocationClick = () => {
    if (!('geolocation' in navigator)) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          // Fetch weather by coordinates to get the local city name
          const res = await fetch(`/api/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`);
          if (res.ok) {
            const data = await res.json();
            router.push(`/dashboard/${encodeURIComponent(data.city)}`); // Navigate using resolved city
          } else {
            alert('Failed to find weather for your specific location');
            setIsLocating(false);
          }
        } catch (e) {
          alert('Error resolving location via API');
          setIsLocating(false);
        }
      },
      (err) => {
        alert(err.message || 'Error getting device location coordinates');
        setIsLocating(false);
      }
    );
  };

  return (
    <>
      {/* 1. Background Video Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden w-full h-full pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="object-cover w-full h-full opacity-50"
        >
          {/* This points directly to public/background.mp4 */}
          <source src="/background.mp4" type="video/mp4" />
        </video>
        {/* A dark overlay so your white text is still easy to read */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* 2. Your Main Content */}
      <div className="relative z-10 flex-grow flex flex-col items-center justify-center px-4 py-8 md:py-16 w-full max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl text-center space-y-8"
        >
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight drop-shadow-md">
              WeatherGlass
            </h1>
            <p className="text-xl text-gray-300">
              Beautiful forecasts at your fingertips.
            </p>
          </div>

          <div className="w-full space-y-4 pt-4">
            <SearchBar onSearch={handleSearch} />

            <button
              onClick={handleLocationClick}
              disabled={isLocating}
              className="inline-flex items-center space-x-2 text-sm text-blue-400 hover:text-blue-300 transition-colors disabled:opacity-50"
            >
              {isLocating ? <Loader2 className="w-4 h-4 animate-spin" /> : <MapPin className="w-4 h-4" />}
              <span>{isLocating ? 'Locating...' : 'Use my current location'}</span>
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full mt-16 max-w-4xl"
        >
          <p className="text-sm font-medium text-gray-400 mb-6 text-center uppercase tracking-wider">
            Featured Cities
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredCities.map((city) => (
              <GlassPanel
                key={city.name}
                className="p-4 cursor-pointer hover:bg-white/10 transition-colors flex items-center justify-between"
                onClick={() => handleSearch(city.name)}
              >
                <span className="text-lg font-medium text-white">{city.name}</span>
                <span className="text-sm text-gray-400">{city.country}</span>
              </GlassPanel>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
}
