const axios = require('axios');

class ProviderService {
  constructor() {
    this.providers = [
      {
        name: 'OpenWeatherMap',
        current: this.getOpenWeatherCurrent.bind(this),
        forecast: this.getOpenWeatherForecast.bind(this)
      },
      {
        name: 'WeatherAPI',
        current: this.getWeatherAPICurrent.bind(this),
        forecast: this.getWeatherAPIForecast.bind(this)
      }
    ];
  }

  async getWeather(city, type, days = 5) {
    let lastError = null;

    for (const provider of this.providers) {
      try {
        console.log(`Trying provider: ${provider.name}`);
        let data;
        
        if (type === 'current') {
          data = await provider.current(city);
        } else {
          data = await provider.forecast(city, days);
        }
        
        return {
          ...data,
          sourceProvider: provider.name
        };
      } catch (error) {
        console.log(`Provider ${provider.name} failed:`, error.message);
        lastError = error;
      }
    }

    throw new Error(`All providers failed. Last error: ${lastError?.message}`);
  }

  async getOpenWeatherCurrent(city) {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
    );

    return {
      location: {
        name: response.data.name,
        country: response.data.sys.country,
        lat: response.data.coord.lat,
        lon: response.data.coord.lon
      },
      current: {
        tempC: Math.round(response.data.main.temp),
        humidity: response.data.main.humidity,
        windKph: response.data.wind.speed * 3.6, // Convert m/s to km/h
        conditionText: response.data.weather[0].description,
        iconUrl: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
        observedAt: new Date().toISOString()
      }
    };
  }

  async getOpenWeatherForecast(city, days) {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
    );

    // Group by day and get min/max
    const dailyData = {};
    response.data.list.forEach(item => {
      const date = item.dt_txt.split(' ')[0];
      if (!dailyData[date]) {
        dailyData[date] = {
          temps: [],
          condition: item.weather[0].description,
          icon: item.weather[0].icon
        };
      }
      dailyData[date].temps.push(item.main.temp);
    });

    const forecast = Object.entries(dailyData)
      .slice(0, days)
      .map(([date, data]) => ({
        date,
        minC: Math.round(Math.min(...data.temps)),
        maxC: Math.round(Math.max(...data.temps)),
        conditionText: data.condition,
        iconUrl: `https://openweathermap.org/img/wn/${data.icon}@2x.png`
      }));

    return {
      location: {
        name: response.data.city.name,
        country: response.data.city.country,
        lat: response.data.city.coord.lat,
        lon: response.data.city.coord.lon
      },
      forecast
    };
  }

  async getWeatherAPICurrent(city) {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHERAPI_KEY}&q=${city}`
    );

    return {
      location: {
        name: response.data.location.name,
        country: response.data.location.country,
        lat: response.data.location.lat,
        lon: response.data.location.lon
      },
      current: {
        tempC: response.data.current.temp_c,
        humidity: response.data.current.humidity,
        windKph: response.data.current.wind_kph,
        conditionText: response.data.current.condition.text,
        iconUrl: response.data.current.condition.icon,
        observedAt: response.data.current.last_updated
      }
    };
  }

  async getWeatherAPIForecast(city, days) {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHERAPI_KEY}&q=${city}&days=${days}`
    );

    const forecast = response.data.forecast.forecastday.map(day => ({
      date: day.date,
      minC: day.day.mintemp_c,
      maxC: day.day.maxtemp_c,
      conditionText: day.day.condition.text,
      iconUrl: day.day.condition.icon
    }));

    return {
      location: {
        name: response.data.location.name,
        country: response.data.location.country,
        lat: response.data.location.lat,
        lon: response.data.location.lon
      },
      forecast
    };
  }
}

module.exports = new ProviderService();