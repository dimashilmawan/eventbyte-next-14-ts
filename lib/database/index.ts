import mongoose, { Mongoose } from "mongoose";

declare global {
  var mongoose: any;
}

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI)
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local",
  );

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connectToDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    // const opts = {
    //   bufferCommands: false,
    //   dbName: "eventbyte",
    // };
    const opts = {
      bufferCommands: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "eventbyte",
    };
    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => mongooseInstance);
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
};