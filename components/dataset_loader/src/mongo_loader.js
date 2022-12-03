import getMongoClient, { DB_NAME } from "./mongo_access.js";

let client;
export async function openConnection() {
  client = getMongoClient();
  try {
    await client.connect();
    return true;
  } catch {
    console.log("Error opening connection");
    return false;
  }
}

export function closeConnection() {
  client.close();
}

const insertDocIn = async (collection, doc) => {
  try {
    const db = client.db(DB_NAME);

    db.collection(collection).insertOne(doc);
  } catch {
    console.log("Error insert in: " + collection);
    return undefined;
  }
};

export default insertDocIn;
