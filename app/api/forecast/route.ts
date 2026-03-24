import { NextResponse } from 'next/server';
import { OPENWEATHER_API_BASE_URL } from '@/lib/constants';
import { ForecastDay, HourlyPoint } from '@/types/weather';
import { mpsToKmh } from '@/lib/weatherUtils';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');

  if (!city) {
    return NextResponse.json({ error: 'City is required' }, { status: 400 });
  }

  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  try {
    const res = await fetch(
      `${OPENWEATHER_API_BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      if (res.status === 404) {
        return NextResponse.json({ error: 'City not found' }, { status: 404 });
      }
      return NextResponse.json({ error: 'Error fetching forecast data' }, { status: res.status });
    }

    const data = await res.json();

    const hourly: HourlyPoint[] = data.list.slice(0, 8).map((item: any) => ({
      time: item.dt_txt.substring(11, 16),
      temperature: Math.round(item.main.temp),
      feelsLike: Math.round(item.main.feels_like),
      humidity: item.main.humidity,
      pop: Math.round(item.pop * 100),
    }));

    const daysMap = new Map<string, ForecastDay>();
    for (const item of data.list) {
      const date = item.dt_txt.substring(0, 10);
      const conditionStr = item.weather[0].description;
      const conditionTitle = conditionStr.split(' ').map((w: string) => w[0].toUpperCase() + w.substring(1)).join(' ');
      
      if (!daysMap.has(date)) {
        daysMap.set(date, {
          date,
          tempMin: item.main.temp_min,
          tempMax: item.main.temp_max,
          condition: conditionTitle,
          conditionCode: item.weather[0].id,
          icon: item.weather[0].icon,
          humidity: item.main.humidity,
          windSpeed: mpsToKmh(item.wind.speed),
          pop: Math.round(item.pop * 100),
        });
      } else {
        const existing = daysMap.get(date)!;
        existing.tempMin = Math.min(existing.tempMin, item.main.temp_min);
        existing.tempMax = Math.max(existing.tempMax, item.main.temp_max);
        existing.pop = Math.max(existing.pop, Math.round(item.pop * 100));
      }
    }

    const days: ForecastDay[] = Array.from(daysMap.values()).slice(0, 5).map(day => ({
      ...day,
      tempMin: Math.round(day.tempMin),
      tempMax: Math.round(day.tempMax),
    }));

    return NextResponse.json({
      city: data.city.name,
      days,
      hourly,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
