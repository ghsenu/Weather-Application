export interface WeatherData {
  city: string
  country: string
  temperature: number
  feelsLike: number
  humidity: number
  windSpeed: number
  windDirection: number
  visibility: number
  pressure: number
  uvIndex: number
  condition: string
  conditionCode: number
  icon: string
  sunrise: number
  sunset: number
  timezone: number
  timestamp: number
}

export interface ForecastDay {
  date: string
  tempMin: number
  tempMax: number
  condition: string
  conditionCode: number
  icon: string
  humidity: number
  windSpeed: number
  pop: number // probability of precipitation
}

export interface HourlyPoint {
  time: string
  temperature: number
  feelsLike: number
  humidity: number
  pop: number
}

export interface SavedCity {
  id: string
  name: string
  country: string
  addedAt: number
}
