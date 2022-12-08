import {
  avgAll,
  getKitchenParams,
  getLaundryParams,
  getSolarParams,
} from "../utils/mongo_helper.js";
import getMongoClient, { DB_NAME } from "./mongo_access.js";

async function getLastTenConsumptionFrom(collectionName) {
  return await onMasterDB((db) =>
    db.collection(collectionName).find().limit(10).toArray()
  );
}

async function getLaundryConsumption(collectionName, sort, fromDate, toDate) {
  const doc = await onMasterDB((db) =>
    db
      .collection(collectionName)
      .aggregate(
        getAggregationParams(toDate, fromDate, getLaundryParams(collectionName))
      )
      .sort({ dateTime: sort })
      .toArray()
  );
  return parseDocument(fromDate, toDate, doc[0]);
}

async function getSolarConsumption(collectionName, sort, fromDate, toDate) {
  const doc = await onMasterDB((db) =>
    db
      .collection(collectionName)
      .aggregate(
        getAggregationParams(toDate, fromDate, getSolarParams(collectionName))
      )
      .sort({ dateTime: sort })
      .toArray()
  );
  return parseDocument(fromDate, toDate, doc[0]);
}

async function getKitchenConsumption(collectionName, sort, fromDate, toDate) {
  const doc = await onMasterDB((db) =>
    db
      .collection(collectionName)
      .aggregate(
        getAggregationParams(toDate, fromDate, getKitchenParams(collectionName))
      )
      .sort({ dateTime: sort })
      .toArray()
  );
  return parseDocument(fromDate, toDate, doc[0]);
}

function parseDocument(fromDate, toDate, doc = {}) {
  const { _id: _, ...averageValue } = doc;

  return {
    fromDate,
    toDate,
    ...averageValue,
  };
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
  getLastTenConsumptionFrom,
  getKitchenConsumption,
  getLaundryConsumption,
  getSolarConsumption,
};
