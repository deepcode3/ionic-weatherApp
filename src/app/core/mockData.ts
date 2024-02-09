import { IWeatherData } from './models';

export const weatherMockData: IWeatherData = {
  coord: {
    lon: 74.75,
    lat: 13.35,
  },
  weather: [
    {
      id: 800,
      main: 'Clear',
      description: 'clear sky',
      icon: '01d',
    },
  ],
  base: 'stations',
  main: {
    temp: 305.73,
    feels_like: 307.36,
    temp_min: 305.73,
    temp_max: 305.73,
    pressure: 1013,
    humidity: 45,
    sea_level: 1013,
    grnd_level: 1012,
  },
  visibility: 10000,
  wind: {
    speed: 5.87,
    deg: 261,
    gust: 3.35,
  },
  clouds: {
    all: 0,
  },
  dt: 1707120147,
  sys: {
    type: 1,
    id: 9217,
    country: 'IN',
    sunrise: 1707096428,
    sunset: 1707138163,
  },
  timezone: 19800,
  id: 1253952,
  name: 'Udupi',
  cod: 200,
};
