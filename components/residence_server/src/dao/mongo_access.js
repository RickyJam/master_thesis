import { MongoClient } from "mongodb";
import isDev from "../utils/enviroment.js";

const DB_NAME = "master";
const HOMEA_COLLECTION = "homeA";
const HOMEB_COLLECTION = "homeB";
const HOMEC_COLLECTION = "homeC";
const HOMED_COLLECTION = "homeD";
const HOMEE_COLLECTION = "homeE";
const HOMEF_COLLECTION = "homeF";
const k8s_host = 'mongodb-service:27017';
const dev_host = 'localhost:27017';

function getDbUri() {
  const hostname = isDev() ? dev_host : k8s_host;
  return `mongodb://admin:password@${hostname}/?authMechanism=DEFAULT&authSource=${DB_NAME}`;
}

function getMongoClient() {
  const uri = getDbUri();
  return new MongoClient(uri);
}

async function getAllLastTenMetrics() {
  const client = getMongoClient();
  try {
    await client.connect();
    const db = client.db(DB_NAME);

    return {
      HOMEA_COLLECTION: await getLastTenMetricsFrom(db.collection(HOMEA_COLLECTION)), 
      HOMEB_COLLECTION: await getLastTenMetricsFrom(db.collection(HOMEB_COLLECTION)),
      HOMEC_COLLECTION: await getLastTenMetricsFrom(db.collection(HOMEC_COLLECTION)),
      HOMED_COLLECTION: await getLastTenMetricsFrom(db.collection(HOMED_COLLECTION)),
      HOMEE_COLLECTION: await getLastTenMetricsFrom(db.collection(HOMEE_COLLECTION)),
      HOMEF_COLLECTION: await getLastTenMetricsFrom(db.collection(HOMEF_COLLECTION))
    }
  } catch {
    console.log("Error");
    return [];
  } finally {
    await client.close();
  }
}

async function getLastTenMetricsFrom(collection){
  return await collection.find().sort({ "Date&Time": -1 }).limit(10).toArray();
}

export { getAllLastTenMetrics };
