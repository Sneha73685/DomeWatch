
import { MongoClient, Db, Collection } from 'mongodb';

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'domewatch';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase(): Promise<{ client: MongoClient, db: Db }> {
  // If we have a cached connection, use it
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected successfully to MongoDB server');

    // Get reference to the database
    const db = client.db(dbName);
    
    // Cache the connection
    cachedClient = client;
    cachedDb = db;
    
    return { client, db };
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

// Helper to get collections
export function getCollection<T>(collectionName: string): Promise<Collection<T>> {
  return connectToDatabase()
    .then(({ db }) => db.collection<T>(collectionName))
    .catch(error => {
      console.error(`Error getting collection ${collectionName}:`, error);
      throw error;
    });
}

// Database models/schemas
export interface CountermeasureData {
  id: number;
  name: string;
  description: string;
  status: string;
  isActive: boolean;
  lastActivated?: Date;
}

export interface AlertData {
  id: number;
  title: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
  resolved: boolean;
}

export interface DetectionData {
  id: number;
  droneType: string;
  location: { lat: number; lng: number };
  timestamp: Date;
  signalStrength: number;
  status: 'tracking' | 'lost' | 'neutralized';
}
