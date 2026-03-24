'use client';

import React, { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';

interface CityData {
  lat: number;
  lng: number;
  name: string;
  size: number;
  color: string;
}

const featuredCities: CityData[] = [
  { lat: 51.5074, lng: -0.1278, name: 'London', size: 1.5, color: '#60a5fa' },
  { lat: 40.7128, lng: -74.0060, name: 'New York', size: 1.5, color: '#60a5fa' },
  { lat: 35.6762, lng: 139.6503, name: 'Tokyo', size: 1.5, color: '#60a5fa' },
  { lat: -33.8688, lng: 151.2093, name: 'Sydney', size: 1.5, color: '#60a5fa' },
  { lat: 48.8566, lng: 2.3522, name: 'Paris', size: 1.5, color: '#60a5fa' },
  { lat: 25.2048, lng: 55.2708, name: 'Dubai', size: 1.5, color: '#60a5fa' }
];

export interface FeaturedGlobeProps {
  onCityClick: (city: string) => void;
}

export default function FeaturedGlobeClient({ onCityClick }: FeaturedGlobeProps) {
  const globeRef = useRef<any>();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Spin globe slowly
    if (globeRef.current) {
      const controls = globeRef.current.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 2.0;
      controls.enableZoom = false; // keep it clean
      globeRef.current.pointOfView({ altitude: 2.5 });
    }
  }, [dimensions.width]);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      setDimensions({
        width: entries[0].contentRect.width,
        height: Math.min(entries[0].contentRect.width * 0.8, 500) // Responsive height
      });
    });
    observer.observe(containerRef.current);
    
    // Initial set
    setDimensions({
      width: containerRef.current.clientWidth,
      height: Math.min(containerRef.current.clientWidth * 0.8, 500)
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full flex justify-center items-center overflow-hidden rounded-3xl bg-glass-bg border border-glass-border backdrop-blur-md shadow-[0_0_50px_rgba(59,130,246,0.15)] transition-all hover:shadow-[0_0_80px_rgba(59,130,246,0.3)] cursor-grab active:cursor-grabbing"
      style={{ height: dimensions.height > 0 ? dimensions.height : 400 }}
    >
      {dimensions.width > 0 && (
        <Globe
          ref={globeRef}
          width={dimensions.width}
          height={dimensions.height}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          backgroundColor="rgba(0,0,0,0)"
          pointsData={featuredCities}
          pointLat="lat"
          pointLng="lng"
          pointColor="color"
          pointAltitude={0.05}
          pointRadius="size"
          pointsMerge={false}
          onPointClick={(point: any) => onCityClick(point.name)}
          pointLabel={(d: any) => `
            <div style="background: rgba(10,15,30,0.9); padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.2); backdrop-filter: blur(8px); font-family: sans-serif; box-shadow: 0 4px 12px rgba(0,0,0,0.5);">
              <span style="color: white; font-weight: 500; font-size: 14px;">${d.name}</span>
            </div>
          `}
        />
      )}
    </div>
  );
}
