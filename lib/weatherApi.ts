import { WeatherData, ForecastDay, HourlyPoint } from '@/types/weather';

export async function getWeather(city: string): Promise<WeatherData> {
  const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to fetch weather');
  }
  return res.json();
}

export async function getForecast(city: string): Promise<{ city: string; days: ForecastDay[]; hourly: HourlyPoint[] }> {
  const res = await fetch(`/api/forecast?city=${encodeURIComponent(city)}`);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to fetch forecast');
  }
  return res.json();
}
