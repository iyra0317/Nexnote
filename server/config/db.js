import mongoose from 'mongoose';

/**
 * Connect to MongoDB using Mongoose.
 * For development without local MongoDB, you can:
 * 1. Install MongoDB locally
 * 2. Use MongoDB Atlas (free cloud database)
 * 3. Comment out the process.exit(1) line to run without database (data won't persist)
 */
export const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;
  
  if (!mongoUri) {
    console.warn('\n⚠️  WARNING: No MONGODB_URI found in .env');
    console.warn('The server will start but database operations will fail.');
    console.warn('\nTo fix this:');
    console.warn('1. Install MongoDB: https://www.mongodb.com/try/download/community');
    console.warn('2. Or use MongoDB Atlas (free): https://www.mongodb.com/cloud/atlas/register');
    console.warn('3. Add MONGODB_URI to server/.env\n');
    return; // Continue without database for now
  }
  
  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
      dbName: 'nexnote',
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`❌ MongoDB connection error: ${err.message}`);
    console.error('Server will continue but database operations will fail.\n');
    // Don't exit - let server run for frontend development
  }
};
