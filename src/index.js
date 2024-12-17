import dotenv from 'dotenv';
import { connectDB } from './infra/database/db_connection.js';
import { createServer } from './api/server.js';

dotenv.config();

const port = process.env.PORT || 5000;

const startApplication = async () => {
  try {
    await connectDB();
    console.info('Connected to the database.');
    createServer(port);
  } catch (error) {
    console.error('Failed to start the application:', error);
  }
};

startApplication();

// Graceful shutdown
process.on('SIGINT', async () => {
  console.info('SIGINT received: Closing database connection.');
  await sequelize.close();
  console.info('Database connection closed.');
  process.exit(0);
});
