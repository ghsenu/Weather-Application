import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { city: string } }): Promise<Metadata> {
  const decodedCity = decodeURIComponent(params.city);
  return {
    title: `${decodedCity} 5-Day Forecast | WeatherGlass`,
    description: `Detailed 5-day weather forecast and hourly interactive charts for ${decodedCity}.`,
  };
}

export default function ForecastLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
