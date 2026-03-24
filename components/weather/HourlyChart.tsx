'use client';

import React, { useRef, useState, useEffect } from 'react';
import { HourlyPoint } from '@/types/weather';
import GlassPanel from '../ui/GlassPanel';
import { motion, useMotionValue, useMotionValueEvent } from 'framer-motion';

interface HourlyChartProps {
  data: HourlyPoint[];
}

export default function HourlyChart({ data }: HourlyChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const x = useMotionValue(0);

  // Resize observer to keep track of container width for accurate drag constraints
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useMotionValueEvent(x, "change", (latest) => {
    if (width > 0 && data.length > 0) {
      const percent = Math.max(0, Math.min(1, latest / width));
      const index = Math.round(percent * (data.length - 1));
      if (index !== activeIndex) {
        setActiveIndex(index);
      }
    }
  });

  if (!data || data.length === 0) return null;

  // SVG Calculations
  const height = 160;
  const padding = 20;
  const usableHeight = height - padding * 2;
  
  const minTemp = Math.min(...data.map(d => d.temperature));
  const maxTemp = Math.max(...data.map(d => d.temperature));
  const tempRange = maxTemp - minTemp || 1;

  const getPoints = (w: number) => {
    return data.map((d, i) => {
      const ptX = (i / (data.length - 1)) * w;
      const ptY = height - padding - ((d.temperature - minTemp) / tempRange) * usableHeight;
      return { x: ptX, y: ptY, data: d };
    });
  };

  const points = getPoints(width || 800); // 800 is fallback before mount

  // Smooth curve generation
  const createPath = (pts: {x: number, y: number}[]) => {
    if (pts.length < 2) return '';
    let d = `M ${pts[0].x},${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const xc = (pts[i].x + pts[i + 1].x) / 2;
      const yc = (pts[i].y + pts[i + 1].y) / 2;
      d += ` Q ${pts[i].x},${pts[i].y} ${xc},${yc}`;
    }
    // Connect to the last point
    d += ` T ${pts[pts.length - 1].x},${pts[pts.length - 1].y}`;
    return d;
  };

  const pathD = points.length > 0 ? createPath(points) : '';
  const activePoint = points[activeIndex];
  const activeData = data[activeIndex];

  return (
    <GlassPanel className="w-full p-6 mt-8 relative overflow-visible">
      <div className="flex justify-between items-end mb-8 relative z-10">
        <div>
          <h3 className="text-xl font-medium text-white/80 uppercase tracking-widest text-sm mb-1">Time Travel Scrubber</h3>
          <p className="text-4xl font-light text-white">{activeData?.time}</p>
        </div>
        <div className="text-right">
          <p className="text-5xl font-bold text-white drop-shadow-lg">{Math.round(activeData?.temperature)}°</p>
          <p className="text-blue-400 font-medium mt-1">{activeData?.pop > 0 ? `${activeData.pop}% Rain` : 'Clear Sky'}</p>
        </div>
      </div>

      <div className="relative w-full select-none touch-none" ref={containerRef} style={{ height }}>
        {width > 0 && (
          <>
            {/* SVG Background Path */}
            <svg width={width} height={height} className="absolute inset-0 z-0 overflow-visible">
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#60a5fa" stopOpacity="1" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.4" />
                </linearGradient>
              </defs>
              <path 
                d={pathD} 
                fill="none" 
                stroke="url(#lineGrad)" 
                strokeWidth="4" 
                strokeLinecap="round"
                className="drop-shadow-glow"
              />
              {/* Plot subtle markers for each hour */}
              {points.map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r="3" fill="#ffffff" opacity={0.2} />
              ))}
            </svg>

            {/* Draggable Thumb */}
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: width }}
              dragElastic={0}
              dragMomentum={false}
              style={{ x }}
              className="absolute top-0 bottom-0 z-20 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing group"
            >
              <div className="w-[2px] h-full bg-white/20 group-hover:bg-white/40 transition-colors" />
              {/* Glowing Orb that rides the line */}
              <motion.div 
                className="absolute w-6 h-6 rounded-full bg-white border-4 border-blue-500 shadow-[0_0_15px_rgba(96,165,250,0.8)]"
                animate={{ y: activePoint?.y - height/2 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            </motion.div>
          </>
        )}
      </div>
    </GlassPanel>
  );
}
