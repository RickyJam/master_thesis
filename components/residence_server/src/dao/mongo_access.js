import { MongoClient } from "mongodb";
import isDev from "../utils/enviroment.js";

const DB_NAME = "master";
const k8s_host = "mongodb-service:27017";
const dev_host = "localhost:27017";

function getDbUri() {
  const hostname = isDev() ? dev_host : k8s_host;
  return `mongodb://admin:password@${hostname}/?authMechanism=DEFAULT&authSource=${DB_NAME}`;
}

function getMongoClient() {
  const uri = getDbUri();
  return new MongoClient(uri);
}

async function getLastTenMetricsFrom(collectionName) {
  const client = getMongoClient();
  try {
    await client.connect();
    const db = client.db(DB_NAME);

    return await db.collection(collectionName).find().limit(10).toArray();
  } catch {
    console.log("Error");
    return [];
  } finally {
    await client.close();
  }
}

export { getLastTenMetricsFrom };
