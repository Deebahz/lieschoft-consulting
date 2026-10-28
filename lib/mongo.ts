import { MongoClient, type Db, type Document } from "mongodb";

interface MongoDataDocument extends Document {
  _id: string;
  data?: unknown;
  updatedAt?: Date;
}

const mongoUri = process.env.MONGODB_URI;
const mongoDbName = process.env.MONGODB_DB || "lieschoft";

let cachedClient: MongoClient | null = null;
let cachedDb: Db<MongoDataDocument> | null = null;

export function isMongoConfigured() {
  return Boolean(mongoUri);
}

export async function getMongoDb(): Promise<Db<MongoDataDocument> | null> {
  if (!mongoUri) {
    return null;
  }

  if (cachedDb) {
    return cachedDb;
  }

  cachedClient = new MongoClient(mongoUri);
  await cachedClient.connect();
  cachedDb = cachedClient.db(mongoDbName);

  return cachedDb;
}
