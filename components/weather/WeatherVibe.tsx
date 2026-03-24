'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface WeatherVibeProps {
  conditionCode: number;
  temperature: number;
  icon: string;
}

export default function WeatherVibe({ conditionCode, temperature, icon }: WeatherVibeProps) {
  const isDay = icon.includes('d');

  const getVibe = () => {
    let vibe = "";
    
    // Temperature context
    const isHot = temperature >= 28;
    const isWarm = temperature >= 20 && temperature < 28;
    const isMild = temperature >= 10 && temperature < 20;
    const isCold = temperature < 10 && temperature > 0;
    const isFreezing = temperature <= 0;

    // Condition context (OpenWeatherMap codes)
    const isThunder = conditionCode >= 200 && conditionCode < 300;
    const isRain = conditionCode >= 300 && conditionCode < 600;
    const isSnow = conditionCode >= 600 && conditionCode < 700;
    const isFog = conditionCode >= 700 && conditionCode < 800;
    const isClear = conditionCode === 800;
    const isClouds = conditionCode > 800;

    if (isClear) {
      if (isDay) {
        if (isHot) vibe = "A brilliant, sun-baked scorcher. Stay hydrated.";
        else if (isWarm) vibe = "A gorgeous, sun-drenched day. Perfect weather.";
        else if (isMild) vibe = "A crisp and brilliant blue sky. Gentle and inviting.";
        else vibe = "A sharp, clear chill in the air. Wear a coat.";
      } else {
        if (isWarm || isHot) vibe = "A clear, balmy evening under the stars.";
        else vibe = "A serene, crystalline night sky.";
      }
    } else if (isClouds) {
      if (conditionCode === 801 || conditionCode === 802) {
        vibe = isDay ? "Pleasant with scattered cotton clouds." : "A quiet night with drifting clouds.";
      } else {
        if (isDay) vibe = "A moody, overcast sky blanketing the day.";
        else vibe = "A heavy, starless night shrouded in clouds.";
      }
    } else if (isRain) {
      if (isWarm || isHot) vibe = "A warm, atmospheric downpour. Refreshing.";
      else vibe = "A moody, rain-soaked chill. Perfect for staying indoors with a warm drink.";
    } else if (isSnow) {
      if (isFreezing) vibe = "A serene, frosty wonderland. Bitterly cold.";
      else vibe = "Softly falling snow blanketing the world in quiet.";
    } else if (isThunder) {
      vibe = "An electric, stormy atmosphere. Nature is putting on a show.";
    } else if (isFog) {
      vibe = "A mysterious, misty haze blurring the edges of the world.";
    } else {
      vibe = "A shifting, atmospheric day.";
    }

    return vibe;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="mt-4 max-w-md"
    >
      <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-blue-200 text-lg md:text-xl font-light italic leading-relaxed text-center md:text-left drop-shadow-sm">
        "{getVibe()}"
      </p>
    </motion.div>
  );
}
