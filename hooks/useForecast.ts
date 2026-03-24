import { useState, useEffect } from 'react';
import { ForecastDay, HourlyPoint } from '@/types/weather';
import { getForecast } from '@/lib/weatherApi';

export const useForecast = (city: string) => {
  const [days, setDays] = useState<ForecastDay[]>([]);
  const [hourly, setHourly] = useState<HourlyPoint[]>([]);
  const [cityName, setCityName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    
    getForecast(city)
      .then((data) => {
        if (isMounted) {
          setDays(data.days);
          setHourly(data.hourly);
          setCityName(data.city);
        }
      })
      .catch((err) => {
        if (isMounted) setError(err.message);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
      
    return () => { isMounted = false; };
  }, [city]);

  return { days, hourly, cityName, loading, error };
};
