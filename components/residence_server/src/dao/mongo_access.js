import { MongoClient } from "mongodb";
import isDev from "../utils/enviroment.js";

const DB_NAME = "master";
const COLLECTION_NAME = "measurements";
const k8s_host = 'mongodb-service';
const dev_host = 'localhost:27017';

function getDbUri() {
  const hostname = isDev() ? dev_host : k8s_host;
  return `mongodb://admin:password@${hostname}/?authMechanism=DEFAULT&authSource=${DB_NAME}`;
}

async function getLastTenMetrics() {
  const uri = getDbUri();
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    return await collection.find().limit(10).toArray();
  } catch {
    console.log("ERRORE RISCONTRATO");
    return [];
  } finally {
    await client.close();
  }
}

export { getLastTenMetrics };
