'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import type { FeaturedGlobeProps } from './FeaturedGlobeClient';

// Pass the type parameter to dynamic so TypeScript knows what props the imported component requires
const GlobeClient = dynamic<FeaturedGlobeProps>(
  () => import('./FeaturedGlobeClient'),
  { 
    ssr: false, 
    loading: () => (
      <div className="w-full h-[400px] md:h-[500px] animate-pulse bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center">
        <span className="text-blue-400">Loading Globe...</span>
      </div>
    ) 
  }
);

export default function FeaturedGlobe({ onCityClick }: FeaturedGlobeProps) {
  return <GlobeClient onCityClick={onCityClick} />;
}
