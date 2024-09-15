import swaggerJSDoc from 'swagger-jsdoc';
import { SwaggerUiOptions } from 'swagger-ui-express';

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: '3.1.0',
    tags: [
      {
        name: 'Products',
        description: 'API operations related to produts'
      }
    ],
    info: {
      title: 'REST API Node.js / Express / TypeScript',
      version: '1.0.0',
      description: 'API docs for Products'
    }
  },
  apis: ['./src/router.ts']
}

const swaggerSpec = swaggerJSDoc(options);

const swaggerUIOptions: SwaggerUiOptions = {
  customSiteTitle: 'Documentacion de la REST APi / TypeScript'
}

export default swaggerSpec;
export {
  swaggerUIOptions
}