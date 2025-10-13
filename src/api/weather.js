// src/api/weather.js
import axios from "axios";
import { weatherCodes } from "../constants";

export const fetchWeatherDetails = async (API_URL) => {
  try {
    // ✅ Axios request (automatically parses JSON)
    const { data } = await axios.get(API_URL);

    // Extract core details
    const {
      current: { temp_c, condition, humidity, wind_kph, feelslike_c, vis_km, pressure_mb, cloud },
      forecast: { forecastday },
      location: { name, localtime, localtime_epoch, tz_id },
    } = data;

    // Current weather
    const temperature = Math.floor(temp_c);
    const description = condition.text;
    const weatherIcon = Object.keys(weatherCodes).find(icon =>
      weatherCodes[icon].includes(condition.code)
    );
    const windSpeed = Math.floor(wind_kph);
    const feelsLike = Math.floor(feelslike_c);

    const currentWeather = {
      temperature,
      description,
      weatherIcon,
      humidity,
      windSpeed,
      feelsLike,
      vis_km,
      pressure_mb,
      cloud,
      name,
    };

    // Hourly weather (next 24 hours)
    const hourlyWeather = [];
    const currentHour = new Date(localtime).getHours();

    // Today’s remaining hours
    for (let i = currentHour; i < 24; i++) {
      const hourData = forecastday[0].hour[i];
      const date = new Date(forecastday[0].date);
      const time = hourData.time.split(" ")[1].slice(0, 5);
      const temp = Math.floor(hourData.temp_c);
      const icon = Object.keys(weatherCodes).find(icon =>
        weatherCodes[icon].includes(hourData.condition.code)
      );
      hourlyWeather.push({ time, temp, icon, date });
    }

    // Next day's early hours
    for (let j = 0; j <= currentHour; j++) {
      const hourData = forecastday[1].hour[j];
      const date = new Date(forecastday[1].date);
      const time = hourData.time.split(" ")[1].slice(0, 5);
      const temp = Math.floor(hourData.temp_c);
      const icon = Object.keys(weatherCodes).find(icon =>
        weatherCodes[icon].includes(hourData.condition.code)
      );
      hourlyWeather.push({ time, temp, icon, date });
    }

    // Sunrise & Sunset
    const sunInfo = {
      ...forecastday[0].astro,
      localtimeEpoch: localtime_epoch,
      timezone: tz_id,
    };

    return { currentWeather, hourlyWeather, sunInfo };

  } catch (error) {
    console.error("❌ Error fetching weather data:", error.message);
    throw error;
  }
};