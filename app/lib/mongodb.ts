import mongoose from "mongoose";

const MONGODB_URI = 'mongodb+srv://shanuvr:Sss9961@nodemg.grceeef.mongodb.net/TaskManager?retryWrites=true&w=majority&appName=nodeMG'

let isConnected = false;

export default async function connectToDatabase() {
  if (isConnected) {
    console.log("✅ Using existing MongoDB connection");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}
