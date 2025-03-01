import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Визначаємо правильний шлях
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const swaggerFilePath = path.join(process.cwd(), 'docs', 'swagger.json');

export const swaggerDocs = (app) => {
  console.log("🔍 Checking Swagger documentation...");

  try {
    if (!fs.existsSync(swaggerFilePath)) {
      console.warn("⚠️ Warning: Swagger JSON file is missing!");
      return;
    }

    const swaggerDoc = JSON.parse(fs.readFileSync(swaggerFilePath, 'utf8'));

    if (Object.keys(swaggerDoc).length === 0) {
      console.warn("⚠️ Warning: Swagger JSON file is empty!");
      return;
    }

    console.log("✅ Swagger docs loaded successfully!");
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
  } catch (error) {
    console.error("❌ Error loading Swagger docs:", error.message);
  }
};



