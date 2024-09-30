import mongoose from "mongoose";

async function dbConnect() {
  try {
    mongoose.connect(process.env.MONGOOSE_URI);
    const connection = mongoose.connection;

    connection.on("connection", () => {
      console.log("DB is connected");
    });

    connection.on("error", (err) => {
      console.log("db connection error" + err);
      process.exit();
    });
  } catch (err) {
    throw new Error("DB connection failed");
  }
}
export default dbConnect;
