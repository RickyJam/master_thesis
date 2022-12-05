import { filterParams } from "../utils/mongo_helper.js";
import getMongoClient, { DB_NAME } from "./mongo_access.js";

const lastDate = new Date(2016, 11, 31, 23, 59, 59, 0);
const asc = 1;
const desc = -1;

async function getLastTenMetricsFrom(collectionName) {
  return await onMasterDB((db) =>
    db.collection(collectionName).find().limit(10).toArray()
  );
}

async function getKitchenMetrics(collectionName, sort = asc, date = lastDate) {
  const lastWeekDate = new Date(date);
  lastWeekDate.setDate(date.getDate() - 7);
  return await onMasterDB((db) =>
    db
      .collection(collectionName)
      .find(
        {
          dateTime: {
            $lt: date,
            $gte: lastWeekDate,
          },
        },
        filterParams[collectionName].kitchen
      )
      .sort({ dateTime: desc })
      .limit(10)
      .toArray()
  );
}

async function onMasterDB(query) {
  const client = getMongoClient();
  try {
    await client.connect();
    const db = client.db(DB_NAME);

    return await query(db);
  } catch {
    console.log("Error");
    return undefined;
  } finally {
    await client.close();
  }
}

export { getLastTenMetricsFrom, getKitchenMetrics };
