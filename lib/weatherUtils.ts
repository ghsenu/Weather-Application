export function kelvinToCelsius(kelvin: number): number {
  return Math.round(kelvin - 273.15);
}

export function mpsToKmh(mps: number): number {
  return Math.round(mps * 3.6);
}

export function getWeatherIcon(iconCode: string): string {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

export function formatSuntime(timestamp: number, timezoneOffset: number): string {
  const date = new Date((timestamp + timezoneOffset) * 1000);
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}
