import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'WeatherGlass - Beautiful Weather Dashboard';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0a0f1e 0%, #111a33 50%, #0d1426 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        <h1 style={{ fontSize: 110, fontWeight: 'bold', textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>WeatherGlass</h1>
        <p style={{ fontSize: 40, color: '#cbd5e1', marginTop: '20px' }}>Beautiful forecasts at your fingertips.</p>
      </div>
    ),
    { ...size }
  );
}
