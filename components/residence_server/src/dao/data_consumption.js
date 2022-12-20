import {
  avgAll,
  getKitchenParams,
  getLaundryParams,
  getSolarParams,
  mergeFieldsWithParams,
} from "../utils/mongo_helper.js";
import db_accessor from "db_accessor";

const { onDataDB } = db_accessor;
const DESC = -1;

async function getLastTenConsumptionFrom(collectionName) {
  return await onDataDB((db) =>
    db.collection(collectionName).find().limit(10).toArray()
  );
}

async function getLaundryConsumption(collectionName, fields, fromDate, toDate) {
  const searchFields = mergeFieldsWithParams(
    fields,
    getLaundryParams(collectionName)
  );
  const doc = await onDataDB((db) =>
    db
      .collection(collectionName)
      .aggregate(
        getAggregationParams(toDate, fromDate, searchFields)
      )
      .sort({ dateTime: DESC })
      .toArray()
  );
  return parseDocument(fromDate, toDate, doc[0]);
}

async function getSolarConsumption(collectionName, fields, fromDate, toDate) {
  const searchFields = mergeFieldsWithParams(
    fields,
    getSolarParams(collectionName)
  );
  const doc = await onDataDB((db) =>
    db
      .collection(collectionName)
      .aggregate(
        getAggregationParams(toDate, fromDate, searchFields)
      )
      .sort({ dateTime: DESC })
      .toArray()
  );
  return parseDocument(fromDate, toDate, doc[0]);
}

async function getKitchenConsumption(collectionName, fields, fromDate, toDate) {
  const searchFields = mergeFieldsWithParams(
    fields,
    getKitchenParams(collectionName)
  );
  const doc = await onDataDB((db) =>
    db
      .collection(collectionName)
      .aggregate(
        getAggregationParams(toDate, fromDate, searchFields)
      )
      .sort({ dateTime: DESC })
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

export {
  getLastTenConsumptionFrom,
  getKitchenConsumption,
  getLaundryConsumption,
  getSolarConsumption,
};
