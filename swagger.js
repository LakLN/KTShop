const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0', // hoặc 3.0.1
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API for my application',
    },
    servers: [
      {
        url: 'https://ktshop.onrender.com/', // URL API server
      },
    ],
  },
  apis: ['./routes/*.js'], // Đường dẫn tới file route chứa Swagger annotations
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
