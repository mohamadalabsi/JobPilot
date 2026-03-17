// ! 1 first we install mongodb package and mongoose package to connect to mongodb and create schema and model for our database , run npm install mongodb mongoose

//! this code below just copy and paste to setup the connection to the database



import mongoose from "mongoose";

// database connection
const MONGODB_URI = process.env.MONGODB_URI ; // in the env vars , to import them we use process.env




interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

// now we connect to the database
async function connectDB() {
  // assert that the env var is defined
if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
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

export default connectDB; 


// ! 2 after this we will install better-auth package to handle authentication and authorization in our app , run npm install better-auth , see the documentation for better-auth for more details
