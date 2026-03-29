import React, { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import Footer from './components/Footer';
import { getCurrentWeather, getForecast } from './services/weatherApi';
import { FiCloud, FiSun, FiCloudRain, FiCloudSnow } from 'react-icons/fi';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState('current');
  const [days, setDays] = useState(5);
  const [recentSearches, setRecentSearches] = useState([]);

  const handleSearch = async (city) => {
    setLoading(true);
    setError(null);
    
    try {
      let data;
      if (mode === 'current') {
        data = await getCurrentWeather(city);
      } else {
        data = await getForecast(city, days);
      }
      setWeatherData(data);
      
      // Add to recent searches
      if (!recentSearches.includes(city)) {
        setRecentSearches(prev => [city, ...prev].slice(0, 5));
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch weather data');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (condition) => {
    if (condition?.toLowerCase().includes('rain')) return <FiCloudRain className="text-blue-300" />;
    if (condition?.toLowerCase().includes('cloud')) return <FiCloud className="text-gray-300" />;
    if (condition?.toLowerCase().includes('snow')) return <FiCloudSnow className="text-white" />;
    return <FiSun className="text-yellow-300" />;
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Welcome message */}
          {!weatherData && !loading && !error && (
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-white mb-4 animate-pulse">
                Welcome to ForecastHub
              </h2>
              <p className="text-xl text-white/80">
                Enter a city name to get started with accurate weather forecasts
              </p>
            </div>
          )}

          <SearchBar 
            onSearch={handleSearch} 
            mode={mode}
            onModeChange={setMode}
            days={days}
            onDaysChange={setDays}
            loading={loading}
          />

          {/* Recent searches */}
          {recentSearches.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-white/60 text-sm">Recent:</span>
              {recentSearches.map((city, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(city)}
                  className="px-3 py-1 bg-white/10 backdrop-blur-lg rounded-full text-white/80 text-sm 
                           hover:bg-white/20 transition-all duration-300 hover:scale-110"
                >
                  {city}
                </button>
              ))}
            </div>
          )}
          
          {error && (
            <div className="mt-6 glass-morphism border-l-4 border-red-500 text-white px-6 py-4 rounded-2xl
                          animate-shake">
              <div className="flex items-center">
                <span className="text-2xl mr-3">⚠️</span>
                <p className="font-medium">{error}</p>
              </div>
            </div>
          )}
          
          {loading && (
            <div className="mt-12 text-center">
              <div className="relative inline-block">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-white/20 border-t-white"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 bg-white/20 rounded-full animate-pulse"></div>
                </div>
              </div>
              <p className="text-white/80 mt-4 animate-pulse">Fetching weather data...</p>
            </div>
          )}
          
          {weatherData && !loading && (
            <div className="mt-8 animate-fadeIn">
              <WeatherDisplay data={weatherData} mode={mode} />
            </div>
          )}
          
          {!weatherData && !loading && !error && (
            <div className="mt-12 text-center">
              <div className="flex justify-center space-x-4 mb-8">
                <FiSun className="text-5xl text-yellow-300 animate-bounce" />
                <FiCloud className="text-5xl text-white/80 animate-pulse" />
                <FiCloudRain className="text-5xl text-blue-300 animate-bounce animation-delay-200" />
              </div>
              <p className="text-white/60 text-xl">Try: London, New York, Tokyo, Paris, Mumbai</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;