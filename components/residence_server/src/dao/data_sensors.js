import {
  buildFilterParams,
  getKitchenParams,
  getLaundryParams,
  getSolarParams,
  mergeFieldsWithParams,
  withParam,
} from "../utils/mongo_helper.js";
import db_accessor from "db_accessor";

const { onDataDB } = db_accessor;

const DESC = -1;

async function getLastTenConsumptionFrom(
  collectionName,
  _,
  fromDate,
  toDate,
  accessFrom,
  accessTo
) {
  return await onDataDB((db) =>
    db
      .collection(collectionName)
      .aggregate(buildFilterParams(accessFrom, accessTo, fromDate, toDate))
      .limit(10)
      .toArray()
  );
}

function buildSearchParams(authFields, getter, collectionName) {
  return withParam(
    "dateTime",
    mergeFieldsWithParams(authFields, getter(collectionName))
  );
}

async function getLaundryConsumption(
  collectionName,
  authFields,
  fromDate,
  toDate,
  accessFrom,
  accessTo
) {
  const searchFields = buildSearchParams(
    authFields,
    getLaundryParams,
    collectionName
  );

  return await onDataDB((db) =>
    db
      .collection(collectionName)
      .aggregate(buildFilterParams(accessFrom, accessTo, fromDate, toDate))
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
  const searchFields = buildSearchParams(
    authFields,
    getSolarParams,
    collectionName
  );

  return await onDataDB((db) =>
    db
      .collection(collectionName)
      .aggregate(buildFilterParams(accessFrom, accessTo, fromDate, toDate))
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
  const searchFields = buildSearchParams(
    authFields,
    getKitchenParams,
    collectionName
  );

  return await onDataDB((db) =>
    db
      .collection(collectionName)
      .aggregate(buildFilterParams(accessFrom, accessTo, fromDate, toDate))
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
