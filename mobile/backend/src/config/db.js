const mongoose = require("mongoose");

const connectDB = async () => {
  if (!process.env.MONGO_URI || typeof process.env.MONGO_URI !== "string") {
    throw new Error("MONGO_URI is missing. Create backend/.env and add a valid MongoDB connection string.");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    throw new Error(`MongoDB connection failed: ${error.message}`);
  }
};

module.exports = connectDB;
