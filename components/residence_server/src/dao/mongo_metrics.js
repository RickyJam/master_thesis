import {
  avgAll,
  getKitchenParam,
} from "../utils/mongo_helper.js";
import getMongoClient, { DB_NAME } from "./mongo_access.js";

const lastDate = new Date(2016, 11, 31, 23, 59, 59, 0);
const asc = 1;
const desc = -1;

async function getLastTenMetricsFrom(collectionName) {
  return await onMasterDB((db) =>
    db.collection(collectionName).find().limit(10).toArray()
  );
}

async function getLaundryMetrics(collectionName, sort = asc, date = lastDate) {
  const lastWeekDate = new Date(date);
  lastWeekDate.setDate(date.getDate() - 30);
  //TODO: replicare lo stesso meccanismo anche qui
  return await onMasterDB((db) =>
    db.collection(collectionName).find().limit(10).toArray()
  );
}

async function getSolarMetrics(collectionName, sort = asc, date = lastDate) {
  const lastWeekDate = new Date(date);
  lastWeekDate.setDate(date.getDate() - 30);
  //TODO: replicare lo stesso meccanismo anche qui
  return await onMasterDB((db) =>
    db.collection(collectionName).find().limit(10).toArray()
  );
}

async function getKitchenMetrics(collectionName, sort = asc, date = lastDate) {
  const lastMonthDate = new Date(date);
  lastMonthDate.setDate(date.getDate() - 30);
  
  return await onMasterDB((db) =>
    db
      .collection(collectionName)
      .aggregate(
        getAggregationParams(
          date,
          lastMonthDate,
          getKitchenParam(collectionName)
        )
      )
      .sort({ dateTime: sort })
      .toArray()
  );
}

function getAggregationParams(date, lastMonthDate, params) {
  return [
    {
      $match: {
        dateTime: {
          $lt: date,
          $gte: lastMonthDate,
        },
      },
    },
    {
      $group: {
        _id: null,
        ...avgAll(params),
      },
    },
  ];
}

async function onMasterDB(query) {
  const client = getMongoClient();
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

export {
  getLastTenMetricsFrom,
  getKitchenMetrics,
  getLaundryMetrics,
  getSolarMetrics,
};
