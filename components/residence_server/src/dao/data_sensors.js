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
  accessFrom,
  accessTo
) {
  return await onDataDB((db) =>
    db
      .collection(collectionName)
      .find({
        dateTime: {
          $gte: fromDate,
          $lt: toDate,
        },
      })
      .limit(10)
      .toArray()
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
