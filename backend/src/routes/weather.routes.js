const express = require('express');
const router = express.Router();
const providerService = require('../services/provider.service');
const cacheService = require('../services/cache.service');

/**
 * @swagger
 * /api/weather/current:
 *   get:
 *     summary: Get current weather for a city
 *     parameters:
 *       - in: query
 *         name: city
 *         required: true
 *         schema:
 *           type: string
 *         description: City name
 *     responses:
 *       200:
 *         description: Current weather data
 *       400:
 *         description: City parameter is required
 *       500:
 *         description: Error fetching weather data
 */
router.get('/current', async (req, res, next) => {
  try {
    const { city } = req.query;
    
    if (!city) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'City parameter is required',
        code: 'MISSING_CITY'
      });
    }

    const cacheKey = cacheService.generateKey(city, 'current');
    let weatherData = await cacheService.get(cacheKey);

    if (!weatherData) {
      weatherData = await providerService.getWeather(city, 'current');
      await cacheService.set(cacheKey, weatherData);
    }

    res.json(weatherData);
  } catch (error) {
    next({
      status: 500,
      message: error.message,
      code: 'WEATHER_FETCH_ERROR'
    });
  }
});

/**
 * @swagger
 * /api/weather/forecast:
 *   get:
 *     summary: Get weather forecast for a city
 *     parameters:
 *       - in: query
 *         name: city
 *         required: true
 *         schema:
 *           type: string
 *         description: City name
 *       - in: query
 *         name: days
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 7
 *         description: Number of days (default 5)
 *     responses:
 *       200:
 *         description: Forecast weather data
 *       400:
 *         description: City parameter is required
 *       500:
 *         description: Error fetching weather data
 */
router.get('/forecast', async (req, res, next) => {
  try {
    const { city, days = 5 } = req.query;
    
    if (!city) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'City parameter is required',
        code: 'MISSING_CITY'
      });
    }

    if (days < 1 || days > 7) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Days must be between 1 and 7',
        code: 'INVALID_DAYS'
      });
    }

    const cacheKey = cacheService.generateKey(city, 'forecast', days);
    let weatherData = await cacheService.get(cacheKey);

    if (!weatherData) {
      weatherData = await providerService.getWeather(city, 'forecast', days);
      await cacheService.set(cacheKey, weatherData);
    }

    res.json(weatherData);
  } catch (error) {
    next({
      status: 500,
      message: error.message,
      code: 'WEATHER_FETCH_ERROR'
    });
  }
});

module.exports = router;