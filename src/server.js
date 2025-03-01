// src/server.js
import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routers/index.js';
import { getEnvVar } from './utils/getEnvVar.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constants/index.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';


dotenv.config();

const PORT = Number(getEnvVar('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    })
  );

  app.get('/', (req, res) => {
    res.json({ message: 'Hello world!' });
  });

  app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.path}`);
    next();
  });

  app.use(router);
  app.use('/api-docs', ...swaggerDocs());
  app.use('*', notFoundHandler);
  app.use(errorHandler);
  app.use('/uploads', express.static(UPLOAD_DIR));
  swaggerDocs(app);

  
  

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};




