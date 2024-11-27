import swaggerJsDoc from 'swagger-jsdoc';
import * as swaggerUi from 'swagger-ui-express';
import express, { Application } from 'express';


const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'SoftSolutions API',
      version: '1.0.0',
      description: 'API para gerenciamento de usuários e inscrições em cursos na plataforma SoftSolutions',
      contact: {
        name: 'Equipe SoftSolutions',
        email: 'contato@softsolutions.com',
      },
    },
    servers: [
      {
        url: 'https://softbackend.vercel.app/',
        description: 'Servidor de Produção',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ['./dist/routes/*.js', './dist/models/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export const setupSwagger = (app: Application): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  console.log('Documentação Swagger disponível em /api-docs');
};