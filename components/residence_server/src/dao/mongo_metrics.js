import getMongoClient, { DB_NAME } from "./mongo_access.js";

async function getLastTenMetricsFrom(collectionName) {
  return await onMasterDB((db) =>
    db.collection(collectionName).find().limit(10).toArray()
  );
}

async function getKitchenMetrics(collectionName) {
  return onMasterDB((db) => {});
}

async function onMasterDB(callback) {
  const client = getMongoClient();
  try {
    await client.connect();
    const db = client.db(DB_NAME);

    return await callback(db);
  } catch {
    console.log("Error");
    return undefined;
  } finally {
    await client.close();
  }
}

export { getLastTenMetricsFrom };
