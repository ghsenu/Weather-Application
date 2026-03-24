import { useState, useEffect } from 'react';
import { WeatherData } from '@/types/weather';
import { getWeather } from '@/lib/weatherApi';

export const useWeather = (city: string) => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    
    getWeather(city)
      .then((weather) => {
        if (isMounted) setData(weather);
      })
      .catch((err) => {
        if (isMounted) setError(err.message);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
      
    return () => { isMounted = false; };
  }, [city]);

  return { data, loading, error };
};
