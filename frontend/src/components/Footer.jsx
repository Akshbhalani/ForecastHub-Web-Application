import React from 'react';
import { FiGithub, FiTwitter, FiLinkedin, FiHeart } from 'react-icons/fi';
import { WiDaySunny, WiCloudy } from 'react-icons/wi';

function Footer() {
  return (
    <footer className="bg-gray-900/95 backdrop-blur-lg border-t border-gray-800 mt-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
              <WiDaySunny className="text-3xl text-yellow-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                ForecastHub
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Your trusted source for accurate weather forecasts powered by multiple providers.
            </p>
          </div>

          {/* Provider Section */}
          <div className="text-center">
            <h3 className="text-gray-300 font-semibold mb-3">Weather Providers</h3>
            <div className="flex justify-center space-x-4">
              <span className="px-3 py-1 bg-gray-800 rounded-full text-gray-300 text-sm 
                           border border-gray-700 flex items-center">
                <WiDaySunny className="mr-1 text-yellow-400" /> OpenWeatherMap
              </span>
              <span className="px-3 py-1 bg-gray-800 rounded-full text-gray-300 text-sm 
                           border border-gray-700 flex items-center">
                <WiCloudy className="mr-1 text-blue-400" /> WeatherAPI
              </span>
            </div>
          </div>

          {/* Social Links */}
          <div className="text-center md:text-right">
            <h3 className="text-gray-300 font-semibold mb-3">Connect With Us</h3>
            <div className="flex justify-center md:justify-end space-x-4">
              <a href="#" className="text-gray-500 hover:text-blue-400 hover:scale-125 transition-all">
                <FiGithub className="text-xl" />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-400 hover:scale-125 transition-all">
                <FiTwitter className="text-xl" />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-400 hover:scale-125 transition-all">
                <FiLinkedin className="text-xl" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm flex items-center justify-center">
            © 2024 ForecastHub. Made with 
            <FiHeart className="mx-1 text-red-500 animate-pulse" /> 
            using React & Node.js
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;