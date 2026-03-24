'use client';

import React from 'react';
import { useSavedCities } from '@/hooks/useSavedCities';
import SavedCityCard from '@/components/SavedCityCard';
import { AnimatePresence, motion } from 'framer-motion';
import { Bookmark, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SavedPage() {
  const { savedCities, removeCity } = useSavedCities();
  const router = useRouter();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="text-center md:text-left mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white flex items-center justify-center md:justify-start gap-4">
            <Bookmark className="w-8 h-8 text-blue-400" />
            Saved Cities
          </h1>
          <p className="text-gray-400 text-lg mt-2">Your personalized weather bookmarked locations.</p>
        </div>

        {savedCities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {savedCities.map((city) => (
                <SavedCityCard 
                  key={city.id} 
                  city={city} 
                  onRemove={removeCity} 
                />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
            <div className="p-6 bg-white/5 rounded-full">
              <Bookmark className="w-16 h-16 text-gray-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">No Saved Cities Yet</h2>
              <p className="text-gray-400 max-w-md">Search for a city and click the &quot;Save City&quot; button to see it here.</p>
            </div>
            <button
              onClick={() => router.push('/')}
              className="flex items-center gap-2 px-6 py-3 bg-blue-500/20 text-blue-400 rounded-full hover:bg-blue-500/30 transition border border-blue-500/30"
            >
              <Search className="w-4 h-4" /> Go to Search
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
