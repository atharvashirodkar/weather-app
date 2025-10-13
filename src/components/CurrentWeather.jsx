import React from 'react'
import '../index.css'

const CurrentWeather = ({ currentWeather }) => {
  
  return (
    <>
      <div className="current-weather">
        <div className='city'>
            <div className='city-label'>City: </div>
            <div className='city-value'>{currentWeather.name}</div>
          </div>
        <div className='current-weather-main'>
          
          <img
            src={`icons/${currentWeather.weatherIcon || 'clear'}.svg`}
            alt={currentWeather.description || 'Weather icon'}
            className="weather-icon"
          />
          <div>
            <h2 className='temperature'>
              {currentWeather.temperature || '--'}<span>ºC</span>
            </h2>
            <p className='description'>{currentWeather.description || 'Search for a city'}</p>
          </div>
        </div>

        <div className='current-weather-details'>
          {currentWeather.humidity && (
            <div className="weather-metrics">
              <div className="metric-item">
                <div className="metric-label">Humidity:</div>
                <div className="metric-value">{currentWeather.humidity} <span>%</span></div>
              </div>
              <div className="metric-item">
                <div className="metric-label">Wind:</div>
                <div className="metric-value">{currentWeather.windSpeed} <span>km/h</span></div>
              </div>
              <div className="metric-item">
                <div className="metric-label">Feels Like:</div>
                <div className="metric-value">{currentWeather.feelsLike} <span>º</span></div>
              </div>
              <div className="metric-item">
                <div className="metric-label">Visibility:</div>
                <div className="metric-value">{currentWeather.vis_km} <span>km</span></div>
              </div>
              <div className="metric-item">
                <div className="metric-label">Air Pressure:</div>
                <div className="metric-value">{currentWeather.pressure_mb} <span>hPa</span></div>
              </div>
              <div className="metric-item">
                <div className="metric-label">Cloud Cover:</div>
                <div className="metric-value">{currentWeather.cloud} <span>%</span></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default CurrentWeather