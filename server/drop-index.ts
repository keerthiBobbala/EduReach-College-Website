import mongoose from "mongoose";

const uri = "your MongoDB uri";

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
