import dotenv from 'dotenv';
dotenv.config(); 

import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';

const bootstrap = async () => {
  try {
    await initMongoConnection(); 
    setupServer(); 
  } catch (error) {
    console.error('Error during application bootstrap:', error);
    process.exit(1); 
  }
};

bootstrap();
console.log('MONGODB_USER:', process.env.MONGODB_USER);


