import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';

let isConnected;

const connectDB = async () => {
  if (isConnected) {
    console.log(" Using existing MongoDB connection");
    return;
  }

  try {
    const connection = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    isConnected = connection.connections[0].readyState;
    console.log(` MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(" MongoDB connection error:", error);
    throw error;
  }
};

export default connectDB;