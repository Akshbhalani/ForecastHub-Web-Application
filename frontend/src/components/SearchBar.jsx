import React, { useState } from 'react';
import { FiSearch, FiMapPin, FiCalendar, FiSun } from 'react-icons/fi';

function SearchBar({ onSearch, mode, onModeChange, days, onDaysChange, loading }) {
  const [city, setCity] = useState('');
  const [suggestions] = useState(['London', 'New York', 'Tokyo', 'Paris', 'Mumbai', 'Dubai']);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative group">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name..."
              className="w-full px-6 py-5 pl-14 bg-gray-800/80 backdrop-blur-lg rounded-2xl text-white 
                       placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 
                       focus:ring-blue-500/50 transition-all duration-300
                       group-hover:border-gray-600"
              disabled={loading}
              list="city-suggestions"
            />
            <FiMapPin className="absolute left-5 top-1/2 transform -translate-y-1/2 
                                text-gray-500 text-xl group-hover:text-blue-400 
                                group-hover:scale-110 transition-all" />
            <datalist id="city-suggestions">
              {suggestions.map(city => (
                <option key={city} value={city} />
              ))}
            </datalist>
          </div>
          
          <button
            type="submit"
            disabled={loading || !city.trim()}
            className="px-8 py-5 bg-gradient-to-r from-blue-600 to-purple-600 
                     rounded-2xl text-white font-semibold 
                     hover:from-blue-700 hover:to-purple-700 
                     disabled:opacity-50 disabled:cursor-not-allowed 
                     transition-all duration-300 transform hover:scale-105
                     flex items-center justify-center space-x-2
                     shadow-lg hover:shadow-xl border border-gray-700"
          >
            <FiSearch className="text-xl" />
            <span>{loading ? 'Searching...' : 'Search'}</span>
          </button>
        </div>
      </form>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex bg-gray-800/80 backdrop-blur-lg rounded-2xl p-1.5 border border-gray-700">
          <button
            onClick={() => onModeChange('current')}
            className={`px-6 py-3 rounded-xl transition-all duration-300 flex items-center space-x-2
                       ${mode === 'current' 
                         ? 'bg-blue-600 text-white shadow-lg' 
                         : 'text-gray-400 hover:text-white hover:bg-gray-700'}`}
          >
            <FiSun className="text-xl" />
            <span>Current</span>
          </button>
          
          <button
            onClick={() => onModeChange('forecast')}
            className={`px-6 py-3 rounded-xl transition-all duration-300 flex items-center space-x-2
                       ${mode === 'forecast' 
                         ? 'bg-blue-600 text-white shadow-lg' 
                         : 'text-gray-400 hover:text-white hover:bg-gray-700'}`}
          >
            <FiCalendar className="text-xl" />
            <span>Forecast</span>
          </button>
        </div>

        {mode === 'forecast' && (
          <div className="flex items-center space-x-3">
            <span className="text-gray-400">Days:</span>
            <select
              value={days}
              onChange={(e) => onDaysChange(Number(e.target.value))}
              className="bg-gray-800/80 backdrop-blur-lg rounded-xl px-4 py-3 text-white 
                       border border-gray-700 focus:outline-none focus:ring-2 
                       focus:ring-blue-500/50 cursor-pointer hover:bg-gray-700 
                       transition-all"
              disabled={loading}
            >
              <option value={3} className="bg-gray-900 text-white">3 Days</option>
              <option value={5} className="bg-gray-900 text-white">5 Days</option>
              <option value={7} className="bg-gray-900 text-white">7 Days</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchBar;