'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function WeatherBackground({ conditionCode }: { conditionCode: number }) {
  let bgClass = 'from-night-700 to-night-900'; 
  
  if (conditionCode >= 200 && conditionCode < 300) bgClass = 'from-indigo-900 to-slate-900'; // Thunderstorm
  else if (conditionCode >= 300 && conditionCode < 600) bgClass = 'from-blue-900 to-sky-900'; // Rain/Drizzle
  else if (conditionCode >= 600 && conditionCode < 700) bgClass = 'from-slate-300 to-zinc-700'; // Snow
  else if (conditionCode >= 700 && conditionCode < 800) bgClass = 'from-gray-600 to-neutral-800'; // Fog
  else if (conditionCode === 800) bgClass = 'from-orange-500/20 to-blue-900/80'; // Clear
  else if (conditionCode > 800) bgClass = 'from-slate-700 to-slate-900'; // Clouds

  return (
    <motion.div
      key={bgClass}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={`fixed inset-0 -z-10 bg-gradient-to-br ${bgClass} transition-colors duration-1000`}
    />
  );
}
