import { MongoClient } from "mongodb";
import isDev from "../utils/enviroment.js";

const DB_NAME = "master";
const dev_host = "localhost:27017";

function getDbUri(k8s_host) {
  const hostname = isDev() ? dev_host : k8s_host;
  return `mongodb://admin:password@${hostname}/?authMechanism=DEFAULT&authSource=${DB_NAME}`;
}

function getMongoClient(k8s_host) {
  const uri = getDbUri(k8s_host);
  return new MongoClient(uri);
}

async function onMasterDB(query, k8s_host) {
  const client = getMongoClient(k8s_host);
  try {
    await client.connect();
    const db = client.db(DB_NAME);

    return await query(db);
  } catch (e) {
    console.log("Error: " + e);
    return undefined;
  } finally {
    await client.close();
  }
}

export default onMasterDB;