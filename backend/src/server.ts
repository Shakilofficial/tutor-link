import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app/app';
import config from './app/config';

let server: Server | null = null;

//* 🌍 Database Connection Setup
async function connectToDatabase() {
  try {
    await mongoose.connect(config.db_url as string);
    console.log('🛢️  Database connected successfully ✅');
  } catch (err) {
    console.error('❌ Failed to connect to database:', err);
    process.exit(1);
  }
}

//* 📌 Gracefully Shutdown Server
function gracefulShutdown(signal: string) {
  console.log(`⚠️ Received ${signal}. Closing server...`);
  if (server) {
    server.close(() => {
      console.log('🛑 Server closed gracefully. Exiting process...');
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
}

//* 🚀 Application Bootstrap
async function bootstrap() {
  try {
    console.log('⏳ Connecting to the database...');
    await connectToDatabase();

    server = app.listen(config.port, () => {
      console.log(`🚀 Application is running on port ${config.port} 🎯`);
    });

    // 🛠️ Handle termination signals
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    // ⚠️ Error Handling for Unexpected Failures
    process.on('uncaughtException', (error) => {
      console.error('🚨 Uncaught Exception:', error);
      gracefulShutdown('uncaughtException');
    });

    process.on('unhandledRejection', (error) => {
      console.error('🚨 Unhandled Rejection:', error);
      gracefulShutdown('unhandledRejection');
    });
  } catch (error) {
    console.error('❌ Error during bootstrap:', error);
    process.exit(1);
  }
}

// 🔥 Start the Application
bootstrap();
