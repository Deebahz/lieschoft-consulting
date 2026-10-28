import { MongoClient, type Db } from "mongodb";

const mongoUri = process.env.MONGODB_URI;
const mongoDbName = process.env.MONGODB_DB || "lieschoft";

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export function isMongoConfigured() {
  return Boolean(mongoUri);
}

export async function getMongoDb(): Promise<Db | null> {
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
