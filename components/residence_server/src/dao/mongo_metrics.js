import getMongoClient, { DB_NAME } from "./mongo_access.js";

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
