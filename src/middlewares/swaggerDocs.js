// src/middlewares/swaggerDocs.js
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
import createHttpError from 'http-errors';

const swaggerFilePath = path.join(process.cwd(), 'docs', 'swagger.json');
export const swaggerDocs = () => {
  try {
    const swaggerDoc = JSON.parse(fs.readFileSync(swaggerFilePath));
    return [swaggerUi.serve, swaggerUi.setup(swaggerDoc)];
  } catch (error) {
    throw createHttpError(500, 'Failed to load Swagger documentation');
  }
};
