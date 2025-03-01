import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
import createHttpError from 'http-errors';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const swaggerFilePath = path.join(process.cwd(), 'docs', 'swagger.json');

export const swaggerDocs = (app) => {
  try {
    console.log("🔍 Checking Swagger documentation...");

    if (!fs.existsSync(swaggerFilePath)) {
      console.error("❌ Swagger JSON file is missing!");
      throw createHttpError(500, "Swagger JSON file is missing");
    }

    const swaggerDoc = JSON.parse(fs.readFileSync(swaggerFilePath, 'utf8'));

    if (Object.keys(swaggerDoc).length === 0) {
      console.error("❌ Swagger JSON file is empty!");
      throw createHttpError(500, "Swagger JSON file is empty");
    }

    console.log("✅ Swagger docs loaded successfully!");

   
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

  } catch (error) {
    console.error("❌ Error loading Swagger docs:", error.message);
  }
};


