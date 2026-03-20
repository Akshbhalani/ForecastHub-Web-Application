const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ForecastHub API',
      version: '1.0.0',
      description: 'Weather API aggregator with provider fallback and caching',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'x-api-key',
        },
      },
    },
    security: [{
      ApiKeyAuth: [],
    }],
  },
  apis: ['./src/routes/*.js'], // Path to the API routes
};

module.exports = swaggerJsdoc(options);