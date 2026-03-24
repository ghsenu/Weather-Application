'use client';

import React, { useEffect, useRef } from 'react';

interface WeatherParticlesProps {
  conditionCode: number;
}

export default function WeatherParticles({ conditionCode }: WeatherParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: any[] = [];
    let animationId: number;
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    // Based on OpenWeatherMap codes
    const isRain = conditionCode >= 300 && conditionCode < 600;
    const isSnow = conditionCode >= 600 && conditionCode < 700;

    if (!isRain && !isSnow) {
      ctx.clearRect(0, 0, w, h);
      return; 
    }

    const init = () => {
      particles = [];
      const count = isRain ? 250 : 150; // More drops for rain, fewer for snow
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          l: isRain ? Math.random() * 20 + 20 : Math.random() * 4 + 1.5, // length for rain, radius for snow
          s: isRain ? Math.random() * 15 + 15 : Math.random() * 1.5 + 0.5, // speed
          ang: isRain ? Math.PI / 14 : 0, // slight angle for rain falling
          a: Math.random() * Math.PI * 2 // phase for snow sway
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = isRain ? 'rgba(200, 220, 255, 0.4)' : 'rgba(255, 255, 255, 0.7)';
      ctx.strokeStyle = isRain ? 'rgba(200, 220, 255, 0.6)' : 'rgba(255, 255, 255, 0.7)';
      ctx.lineWidth = isRain ? 1.5 : 0;
      
      ctx.beginPath();
      for (let p of particles) {
        if (isRain) {
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.l * Math.sin(p.ang), p.y + p.l * Math.cos(p.ang));
        } else {
          ctx.moveTo(p.x, p.y);
          ctx.arc(p.x, p.y, p.l, 0, Math.PI * 2);
        }
      }
      
      if (isRain) ctx.stroke();
      else ctx.fill();

      // Update physics
      for (let p of particles) {
        if (isRain) {
          p.x += Math.sin(p.ang) * p.s;
          p.y += Math.cos(p.ang) * p.s;
        } else {
          p.a += 0.02; // Change phase
          p.x += Math.sin(p.a) * 0.8; // Sway horizontal
          p.y += p.s; // Fall vertically
        }
        
        // Reset if out of bounds
        if (p.y > h + 10 || p.x > w + 10) {
          p.y = -20;
          p.x = Math.random() * w;
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener('resize', handleResize);
    init();
    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [conditionCode]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0 opacity-80 mix-blend-screen transition-opacity duration-1000" 
    />
  );
}
