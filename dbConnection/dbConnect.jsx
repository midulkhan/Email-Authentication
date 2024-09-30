import mongoose from "mongoose";

async function dbConnect() {
  try {
    mongoose.connect(process.env.MONGOOSE_URI);
  } catch (err) {
    throw new Error("DB connection failed");
  }
}
export default dbConnect;
