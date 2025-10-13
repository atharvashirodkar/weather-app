import React from 'react'
import '../index.css'

const HourlyWeatherItem = ({ hourlyWeatherItem }) => {
  return (
    <li className='hourly-weather-item'>
      <p className='time'>{hourlyWeatherItem.time}</p>
      <img 
        src={`icons/${hourlyWeatherItem.icon}.svg`} 
        alt="Weather condition" 
        className='weather-icon' 
      />
      <p className="temperature">{hourlyWeatherItem.temp}º</p>
    </li>
  )
}

export default HourlyWeatherItem