import React from 'react';
import { WeatherData } from '@/types/weather';
import StatCard from '../ui/StatCard';
import { Droplets, Wind, Gauge, Eye, Sunrise, Sunset } from 'lucide-react';
import { formatSuntime } from '@/lib/weatherUtils';

interface WeatherDetailsProps {
  weather: WeatherData;
}

export default function WeatherDetails({ weather }: WeatherDetailsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      <StatCard icon={<Droplets />} label="Humidity" value={`${weather.humidity}%`} />
      <StatCard icon={<Wind />} label="Wind" value={`${weather.windSpeed} km/h`} />
      <StatCard icon={<Gauge />} label="Pressure" value={`${weather.pressure} hPa`} />
      <StatCard icon={<Eye />} label="Visibility" value={`${weather.visibility} m`} />
      <StatCard icon={<Sunrise />} label="Sunrise" value={formatSuntime(weather.sunrise, weather.timezone)} />
      <StatCard icon={<Sunset />} label="Sunset" value={formatSuntime(weather.sunset, weather.timezone)} />
    </div>
  );
}
