import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express, Request, Response } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API coally',
      version: '1.0.0',
      description: 'API documentation',
    },
  },
  apis: ['dist/components/**/*.js', 'dist/server.js'],

};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app: Express, port: number) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/api-docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  })

  console.log('Docs are available at http://localhost:' + port + '/api-docs');
};

export default swaggerDocs;

