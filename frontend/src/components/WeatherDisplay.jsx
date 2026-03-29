import React from 'react';
import { WiHumidity, WiStrongWind, WiSunrise, WiSunset } from 'react-icons/wi';
import { FiDroplet, FiWind, FiMapPin, FiClock } from 'react-icons/fi';

function WeatherDisplay({ data, mode }) {
  if (!data) return null;

  const { location, sourceProvider } = data;

  const getBackgroundGradient = (condition) => {
    if (condition?.toLowerCase().includes('rain')) {
      return 'from-gray-800 to-gray-900';
    }
    if (condition?.toLowerCase().includes('cloud')) {
      return 'from-gray-800 to-gray-900';
    }
    if (condition?.toLowerCase().includes('snow')) {
      return 'from-gray-800 to-gray-900';
    }
    return 'from-gray-800 to-gray-900';
  };

  return (
    <div className="space-y-6">
      {/* Location Header with Animation */}
      <div className="weather-card p-8 bg-gray-800/90 backdrop-blur-lg rounded-2xl border border-gray-700">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-gray-700 backdrop-blur-lg flex items-center justify-center
                          border-2 border-gray-600 animate-pulse">
              <FiMapPin className="text-3xl text-blue-400" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white flex items-center">
                {location.name}
                <span className="ml-3 text-lg bg-gray-700 px-3 py-1 rounded-full text-gray-300">
                  {location.country}
                </span>
              </h2>
              <div className="flex items-center mt-2 text-gray-400 space-x-4">
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></span>
                  📍 {location.lat.toFixed(2)}°N, {location.lon.toFixed(2)}°E
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <span className="px-4 py-2 bg-gray-700 backdrop-blur-lg rounded-full text-gray-300 text-sm
                         border border-gray-600 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></span>
              Source: {sourceProvider}
            </span>
          </div>
        </div>
      </div>

      {/* Weather Data */}
      {mode === 'current' && data.current && (
        <CurrentWeather current={data.current} />
      )}

      {mode === 'forecast' && data.forecast && (
        <ForecastWeather forecast={data.forecast} />
      )}
    </div>
  );
}

function CurrentWeather({ current }) {
  return (
    <div className="weather-card p-8 bg-gray-800/90 backdrop-blur-lg rounded-2xl border border-gray-700">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Main Weather Info */}
        <div className="text-center lg:text-left">
          <div className="flex flex-col items-center lg:items-start">
            <div className="relative group">
              <img 
                src={current.iconUrl} 
                alt={current.conditionText}
                className="w-32 h-32 weather-icon group-hover:scale-110 transition-transform"
              />
              <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl group-hover:blur-2xl 
                            transition-all opacity-0 group-hover:opacity-100"></div>
            </div>
            <div className="mt-4">
              <div className="text-7xl font-bold text-white flex items-start">
                {current.tempC}°
                <span className="text-3xl text-gray-400 mt-2">C</span>
              </div>
              <p className="text-gray-300 text-xl capitalize mt-2 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></span>
                {current.conditionText}
              </p>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Humidity Card */}
          <div className="bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 text-center group hover:scale-105 transition-all border border-gray-700">
            <FiDroplet className="text-4xl text-blue-400 mx-auto mb-2 group-hover:animate-bounce" />
            <p className="text-gray-400 text-sm">Humidity</p>
            <p className="text-3xl font-bold text-white">{current.humidity}%</p>
          </div>
          
          {/* Wind Speed Card */}
          <div className="bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 text-center group hover:scale-105 transition-all border border-gray-700">
            <FiWind className="text-4xl text-cyan-400 mx-auto mb-2 group-hover:animate-spin-slow" />
            <p className="text-gray-400 text-sm">Wind Speed</p>
            <p className="text-3xl font-bold text-white">{current.windKph} km/h</p>
          </div>
          
          {/* Last Updated Card */}
          <div className="bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 text-center col-span-2 group hover:scale-105 transition-all border border-gray-700">
            <FiClock className="text-4xl text-purple-400 mx-auto mb-2" />
            <p className="text-gray-400 text-sm">Last Updated</p>
            <p className="text-lg font-semibold text-gray-300">
              {new Date(current.observedAt).toLocaleString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ForecastWeather({ forecast }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {forecast.map((day, index) => (
        <div key={index} 
             className="bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 hover:scale-105 transition-all duration-300
                       border border-gray-700 animate-fadeIn"
             style={{ animationDelay: `${index * 100}ms` }}>
          <div className="text-center">
            <p className="text-gray-300 text-lg font-medium">
              {new Date(day.date).toLocaleDateString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric' 
              })}
            </p>
            
            <div className="relative my-4 group">
              <img 
                src={day.iconUrl} 
                alt={day.conditionText}
                className="w-20 h-20 mx-auto weather-icon group-hover:scale-110 transition-transform"
              />
            </div>
            
            <div className="flex justify-center items-center space-x-2">
              <span className="text-3xl font-bold text-white">{day.maxC}°</span>
              <span className="text-2xl text-gray-600">/</span>
              <span className="text-2xl text-gray-400">{day.minC}°</span>
            </div>
            
            <p className="text-gray-400 text-sm capitalize mt-3 bg-gray-700 rounded-full px-3 py-1
                        inline-block border border-gray-600">
              {day.conditionText}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

// Helper function for background gradients
function getBackgroundGradient(condition) {
  if (condition?.toLowerCase().includes('rain')) {
    return 'from-gray-800 to-gray-900';
  }
  if (condition?.toLowerCase().includes('cloud')) {
    return 'from-gray-800 to-gray-900';
  }
  if (condition?.toLowerCase().includes('snow')) {
    return 'from-gray-800 to-gray-900';
  }
  return 'from-gray-800 to-gray-900';
}

export default WeatherDisplay;