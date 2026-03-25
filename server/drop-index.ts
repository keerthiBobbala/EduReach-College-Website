import mongoose from "mongoose";

const uri = "mongodb+srv://edureach_admin:EduReach123@cluster0.vh6zjcs.mongodb.net/test?authSource=admin&appName=Cluster0";

async function dropIndex() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB successfully");
    
    // Explicitly drop the unique index that Mongoose created
    await mongoose.connection.collection("bookings").dropIndex("user_1");
    console.log("Successfully dropped 'user_1' index from bookings collection.");
    
  } catch (error: any) {
    if (error.codeName === "IndexNotFound" || error.message.includes("ns not found")) {
         console.log("Index 'user_1' already dropped or does not exist.");
    } else {
         console.error("Error dropping index:", error);
    }
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected.");
  }
}

dropIndex();
