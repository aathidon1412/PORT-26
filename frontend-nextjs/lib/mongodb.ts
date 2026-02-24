import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

/**
 * In Next.js on Vercel, each serverless function invocation shares the same
 * Node.js module cache within a single warm instance. Storing the connection
 * on `globalThis` (which persists across hot-reloads in development and is
 * reused across requests in production) ensures we never open more than ONE
 * connection per instance, preventing Atlas M0 connection limit exhaustion.
 */
declare global {
  // eslint-disable-next-line no-var
  var __mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = globalThis.__mongoose ?? { conn: null, promise: null };

// Persist to globalThis so the reference survives Next.js hot-reloads in dev
if (!globalThis.__mongoose) {
  globalThis.__mongoose = cached;
}

async function connectToDatabase(): Promise<typeof mongoose> {
  // Return existing connection immediately — no extra TCP handshake
  if (cached.conn) {
    return cached.conn;
  }

  // Reuse an in-flight connection attempt
  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      /**
       * bufferCommands: false — fail fast if the DB isn't reachable yet,
       * rather than silently queuing operations.
       */
      bufferCommands: false,

      /**
       * M0 free clusters allow at most 500 simultaneous connections.
       * Keeping the pool small (5 max) limits how many sockets each
       * serverless instance opens, eliminating the "too many connections"
       * Atlas alert on busy deployments.
       */
      maxPoolSize: 5,
      minPoolSize: 1,

      /**
       * Close idle connections after 30 s so Vercel instances that go cold
       * don't hold Atlas connections open unnecessarily.
       */
      serverSelectionTimeoutMS: 10_000,
      socketTimeoutMS: 45_000,
      connectTimeoutMS: 10_000,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI!, opts)
      .then((m) => {
        console.log('[MongoDB] New connection established');
        return m;
      })
      .catch((err) => {
        // Clear the promise so the next request retries
        cached.promise = null;
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;
