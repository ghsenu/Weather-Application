import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { city: string } }): Promise<Metadata> {
  const decodedCity = decodeURIComponent(params.city);
  return {
    title: `${decodedCity} Weather | WeatherGlass`,
    description: `Current global weather conditions, humidity, and forecast details for ${decodedCity}.`,
  };
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
