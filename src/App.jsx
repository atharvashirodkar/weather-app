import React, { useState } from 'react'
import SearchSection from './components/SearchSection'
import CurrentWeather from './components/CurrentWeather'
import HourlyWeatherItem from './components/HourlyWeatherItem'
import SunriseSunsetCard from './components/SunriseSunsetCard'
import { fetchWeatherDetails } from './api/weather'
const App = () => {
  const [currentWeather, setCurrentWeather] = useState({});
  const [hourlyWeather, setHourlyWeather] = useState([]);
  const [sunInfo, setSunInfo] = useState({})

  const getWeatherDetails = async (API_URL) => {
    try {
      const { currentWeather, hourlyWeather, sunInfo } =
        await fetchWeatherDetails(API_URL);

      setCurrentWeather(currentWeather);
      setHourlyWeather(hourlyWeather);
      setSunInfo(sunInfo);
    } catch (error) {
      alert("Unable to fetch weather data. Please try again later.", error);
    }
  };

  return (
    <>
      <div className="container">
        < SearchSection getWeatherDetails={getWeatherDetails} />
        {/* Weather Section */}
        <div className="weather-section">
          <CurrentWeather currentWeather={currentWeather} />
          {/* Sunrise and Sunset */}
          <SunriseSunsetCard sunInfo={sunInfo} />
          {/* Hourly Weather Forecast */}
          <div className='hourly-forecast'>
            <ul className='weather-list'>
              {hourlyWeather.map((hour, index) => (
                <HourlyWeatherItem
                  key={index}
                  hourlyWeatherItem={hour}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default App