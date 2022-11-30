import { MongoClient } from "mongodb";
import isDev from "../utils/enviroment.js";

export const DB_NAME = "master";
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

export default getMongoClient;