import React from 'react';
import { WiDaySunny, WiCloudy, WiRain, WiSnow } from 'react-icons/wi';
import { FiMapPin } from 'react-icons/fi';

function Header() {
  return (
    <header className="bg-gray-900/95 backdrop-blur-lg border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 group">
            <div className="relative">
              <WiDaySunny className="text-5xl text-yellow-400 animate-spin-slow group-hover:scale-110 transition-transform" />
              <WiCloudy className="text-3xl text-gray-400 absolute -top-2 -right-2 animate-float" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 
                           bg-clip-text text-transparent">
                ForecastHub
              </h1>
              <p className="text-gray-400 text-sm flex items-center">
                <FiMapPin className="mr-1 text-gray-500" /> Real-time Weather Dashboard
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex space-x-2">
              <span className="px-3 py-1 bg-gray-800 backdrop-blur-lg rounded-full text-gray-300 text-sm 
                           border border-gray-700 flex items-center">
                <WiDaySunny className="mr-1 text-yellow-400" /> Live
              </span>
              <span className="px-3 py-1 bg-gray-800 backdrop-blur-lg rounded-full text-gray-300 text-sm border border-gray-700">
                v2.0
              </span>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 
                          flex items-center justify-center text-white font-bold shadow-lg
                          hover:scale-110 transition-transform cursor-pointer border border-gray-700">
              U
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;