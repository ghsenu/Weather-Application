import { NextResponse } from 'next/server';
import { OPENWEATHER_API_BASE_URL } from '@/lib/constants';
import { mpsToKmh } from '@/lib/weatherUtils';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  if (!city && (!lat || !lon)) {
    return NextResponse.json({ error: 'City or coordinates are required' }, { status: 400 });
  }

  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    console.warn("Missing OPENWEATHER_API_KEY environment variable.");
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  try {
    const url = lat && lon
        ? `${OPENWEATHER_API_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        : `${OPENWEATHER_API_BASE_URL}/weather?q=${encodeURIComponent(city!)}&appid=${apiKey}&units=metric`;

    const res = await fetch(url, { next: { revalidate: 600 } });

    if (!res.ok) {
      if (res.status === 404) {
        return NextResponse.json({ error: 'City not found' }, { status: 404 });
      }
      return NextResponse.json({ error: 'Error fetching weather data' }, { status: res.status });
    }

    const data = await res.json();

    const conditionStr = data.weather[0].description;
    const titleCaseCondition = conditionStr.split(' ').map((w: string) => w[0].toUpperCase() + w.substring(1)).join(' ');

    const weatherData = {
      city: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      windSpeed: mpsToKmh(data.wind.speed),
      windDirection: data.wind.deg,
      visibility: data.visibility,
      pressure: data.main.pressure,
      uvIndex: 0,
      condition: titleCaseCondition,
      conditionCode: data.weather[0].id,
      icon: data.weather[0].icon,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
      timezone: data.timezone,
      timestamp: data.dt,
    };

    return NextResponse.json(weatherData);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
