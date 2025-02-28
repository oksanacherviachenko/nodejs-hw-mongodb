// src/middlewares/swaggerDocs.js
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
import createHttpError from 'http-errors';

const swaggerFilePath = path.join(process.cwd(), 'docs', 'swagger.json');

export const swaggerDocs = () => {
  try {
    // Перевіряємо, чи існує файл swagger.json
    if (!fs.existsSync(swaggerFilePath)) {
      throw createHttpError(500, "Swagger JSON file is missing");
    }

    const swaggerDoc = JSON.parse(fs.readFileSync(swaggerFilePath, 'utf8'));

    // Якщо файл порожній, викидаємо помилку
    if (Object.keys(swaggerDoc).length === 0) {
      throw createHttpError(500, "Swagger JSON file is empty");
    }

    return [swaggerUi.serve, swaggerUi.setup(swaggerDoc)];
  } catch (error) {
    console.error("Error loading Swagger docs:", error.message);
    return (req, res, next) => next(createHttpError(500, "Failed to load Swagger documentation"));
  }
};

