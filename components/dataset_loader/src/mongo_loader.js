import getMongoClient from "./mongo_access.js";

let client;
export function openConnection() {
    client = getMongoClient();
}

export function closeConnection() {
    client.close();
}

const insertDocIn = async (collection, doc) => {
  try {
    await client.connect();
    const db = client.db(DB_NAME);

    db.collection(collection).insertOne(doc);
  } catch {
    console.log("Error insert in: " + collection);
    return undefined;
  }
};

export default insertDocIn;
