import React from 'react';
import GlassPanel from './GlassPanel';

export default function LoadingSkeleton() {
  return (
    <div className="space-y-6 w-full animate-pulse p-4 max-w-7xl mx-auto mt-8">
      {/* Hero Skeleton */}
      <GlassPanel className="h-64 w-full flex flex-col items-center justify-center space-y-4">
        <div className="h-20 w-32 bg-white/10 rounded-lg"></div>
        <div className="h-6 w-48 bg-white/10 rounded-md"></div>
      </GlassPanel>
      
      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {[...Array(6)].map((_, i) => (
          <GlassPanel key={i} className="h-24 w-full flex items-center space-x-4 p-4">
            <div className="h-12 w-12 bg-white/10 rounded-full"></div>
            <div className="space-y-2 flex-1">
              <div className="h-4 w-1/2 bg-white/10 rounded"></div>
              <div className="h-6 w-3/4 bg-white/10 rounded"></div>
            </div>
          </GlassPanel>
        ))}
      </div>
    </div>
  );
}
