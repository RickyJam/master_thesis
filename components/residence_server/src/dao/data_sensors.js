import {
  getKitchenParams,
  getLaundryParams,
  getSolarParams,
  mergeFieldsWithParams,
} from "../utils/mongo_helper.js";
import db_accessor from "db_accessor";

const { onDataDB } = db_accessor;

const DESC = -1;

async function getLastTenConsumptionFrom(
  collectionName,
  authFields,
  fromDate,
  toDate,
  accessFrom=undefined,
  accessTo=undefined
) {
  return await onDataDB((db) =>
    db
      .collection(collectionName)
      .aggregate(buildFilterParams(accessFrom, accessTo))
      .limit(10)
      .toArray()
  );
}

function buildHourFilter(accessFrom, accessTo) {
  const hourFilter = {};
  if (accessFrom) {
    hourFilter["$gte"] = `${accessFrom}`;
  }
  if (accessTo) {
    hourFilter["$lte"] = `${accessTo}`;
  }

  return hourFilter;
}

function buildFilterParams(accessFrom, accessTo) {
  const hourFilter = buildHourFilter(accessFrom, accessTo);
  const searchFields = [
    {
      $addFields: {
        hour: { $dateToString: { format: "%H", date: "$dateTime" } },
      },
    },
  ];

  if (Object.keys(hourFilter).length > 0) {
    searchFields.push({ $match: { hour: hourFilter } });
  }

  searchFields.push({
    $project: {
      hour: 0,
    },
  });

  return searchFields;
}

async function getLaundryConsumption(
  collectionName,
  authFields,
  fromDate,
  toDate,
  accessFrom,
  accessTo
) {
  const searchFields = mergeFieldsWithParams(
    authFields,
    getLaundryParams(collectionName)
  );
  return await onDataDB((db) =>
    db
      .collection(collectionName)
      .find({
        dateTime: {
          $gte: fromDate,
          $lt: toDate,
        },
      })
      .project(searchFields)
      .sort({ dateTime: DESC })
      .limit(100)
      .toArray()
  );
}

async function getSolarConsumption(
  collectionName,
  authFields,
  fromDate,
  toDate,
  accessFrom,
  accessTo
) {
  const searchFields = mergeFieldsWithParams(
    authFields,
    getSolarParams(collectionName)
  );
  return await onDataDB((db) =>
    db
      .collection(collectionName)
      .find({
        dateTime: {
          $gte: fromDate,
          $lt: toDate,
        },
      })
      .project(searchFields)
      .sort({ dateTime: DESC })
      .limit(100)
      .toArray()
  );
}

async function getKitchenConsumption(
  collectionName,
  authFields,
  fromDate,
  toDate,
  accessFrom,
  accessTo
) {
  const searchFields = mergeFieldsWithParams(
    authFields,
    getKitchenParams(collectionName)
  );
  return await onDataDB((db) =>
    db
      .collection(collectionName)
      .find({
        dateTime: {
          $gte: fromDate,
          $lt: toDate,
        },
      })
      .project(searchFields)
      .sort({ dateTime: DESC })
      .limit(100)
      .toArray()
  );
}

export {
  getLastTenConsumptionFrom,
  getKitchenConsumption,
  getLaundryConsumption,
  getSolarConsumption,
};
