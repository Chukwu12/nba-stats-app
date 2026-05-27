// config/database.js
const mongoose = require("mongoose");

const getMongoUri = () => process.env.DB_STRING || process.env.MONGODB_URI || process.env.MONGO_URI;

const connectDB = async () => {
  const mongoUri = getMongoUri();

  if (!mongoUri) {
    console.warn("MongoDB connection skipped: set DB_STRING, MONGODB_URI, or MONGO_URI to enable favorites.");
    return false;
  }

  try {
    const conn = await mongoose.connect(mongoUri);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (err) {
    console.error("MongoDB connection failed. Favorites will be unavailable.", err.message);
    return false;
  }
};

module.exports = connectDB;