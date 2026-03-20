import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const API_KEY = import.meta.env.VITE_FORECASTHUB_KEY;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'x-api-key': API_KEY
  }
});

export const getCurrentWeather = async (city) => {
  try {
    const response = await api.get('/weather/current', {
      params: { city }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getForecast = async (city, days = 5) => {
  try {
    const response = await api.get('/weather/forecast', {
      params: { city, days }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};