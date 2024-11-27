import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';

const isProduction = process.env.NODE_ENV === 'production';
const serverUrl = isProduction
  ? 'https://softbackend.vercel.app' // URL do Vercel
  : 'http://localhost:3000'; // URL local

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
          url: serverUrl,
          description: isProduction ? 'Servidor de Produção' : 'Servidor Local',
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
    apis: [__dirname + '/routes/*.js', __dirname + '/models/*.js'], // Caminhos absolutos
  };
  
  console.log('Swagger Options:', swaggerOptions); // Log para verificar os caminhos
  