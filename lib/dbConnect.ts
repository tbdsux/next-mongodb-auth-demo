// https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/lib/dbConnect.ts

import mongoose from "mongoose";

declare global {
  var mongoose: any;
}

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI in the environment variables");
}

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mong) => {
      return mong;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
