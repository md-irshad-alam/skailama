import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const connection = async () => {
  try {
    // const db = await mongoose.connect(
    //   `mongodb+srv://${process.env.DB_URI_USER}:${process.env.DB_URI_PASS}@cluster0.eecjhwk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    // );
    const db = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `✅ MongoDB Connected: ${db.connection.host}/${db.connection.name}`
    );
    console.log("Connection established successfully.");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed!");
    console.error(`Error: ${error}`);
    // throw new Error("MongoDB connection failed!");
  }
};

export default connection;
