import { MongoClient } from "mongodb";

// const uri = "mongodb+srv://sample-hostname:27017/?maxPoolSize=20&w=majority";
const DB_NAME = "master";
const COLLECTION_NAME = "measurements";

const uri =
  "mongodb://admin:password@localhost:27017/?authMechanism=DEFAULT&authSource=" +
  DB_NAME;

async function getLastTenMetrics() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    return  await collection.find().limit(10).toArray();
  } catch {
    console.log("ERRORE RISCONTRATO");
    return [];
  } finally {
    await client.close();
  }
}

export { getLastTenMetrics };
