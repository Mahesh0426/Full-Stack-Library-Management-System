import mongoose from "mongoose";

export const connectToMongoDb = () => {
  try {
    const connect = mongoose.connect(
      process.env.DB_CONNECT_URL + "lms-database-v2"
    );
    if (connect) {
      console.log(
        `Database conected: ${process.env.DB_CONNECT_URL}lms-database-v2`
      );
    }
  } catch (error) {
    console.log("Error:", error);
  }
};
