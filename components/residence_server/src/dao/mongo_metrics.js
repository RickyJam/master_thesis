import { filterParams, addFields } from "../utils/mongo_helper.js";
import getMongoClient, { DB_NAME } from "./mongo_access.js";

const lastDate = new Date(2016, 11, 31, 23, 59, 59, 0);
const asc = 1;
const desc = -1;

async function getLastTenMetricsFrom(collectionName) {
  return await onMasterDB((db) =>
    db.collection(collectionName).find().limit(10).toArray()
  );
}

async function getLaundryMetrics(collectionName) {
  const lastWeekDate = new Date(date);
  lastWeekDate.setDate(date.getDate() - 30);
  //TODO: replicare lo stesso meccanismo anche qui
  return await onMasterDB((db) =>
    db.collection(collectionName).find().limit(10).toArray()
  );
}

async function getSolarMetrics(collectionName) {
  const lastWeekDate = new Date(date);
  lastWeekDate.setDate(date.getDate() - 30);
  //TODO: replicare lo stesso meccanismo anche qui
  return await onMasterDB((db) =>
    db.collection(collectionName).find().limit(10).toArray()
  );
}

async function getKitchenMetrics(collectionName, sort = asc, date = lastDate) {
  const lastWeekDate = new Date(date);
  lastWeekDate.setDate(date.getDate() - 30);
  return await onMasterDB((db) =>
    db
      .collection(collectionName)
      // .project(filterParams[[collectionName]].kitchen)
      .aggregate([
        {
          $match: {
            dateTime: {
              $lt: date,
              $gte: lastWeekDate,
            },
          }
        },
        {
          $addFields: {
            (addFields())
          }
        },
        // {
        //   $project: 
        // }
        {
          $group: {
            _id: null,
            ...filterParams[[collectionName]].kitchenAvg
          },
        },
      ])
      .sort({ dateTime: sort })
      .toArray()
  );
}

async function onMasterDB(query) {
  const client = getMongoClient();
  try {
    await client.connect();
    const db = client.db(DB_NAME);

    return await query(db);
  } catch (e){
    console.log("Error: " + e);
    return undefined;
  } finally {
    await client.close();
  }
}

export { getLastTenMetricsFrom, getKitchenMetrics, getLaundryMetrics, getSolarMetrics };
