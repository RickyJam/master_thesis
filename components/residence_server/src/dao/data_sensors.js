import { getKitchenParams, getLaundryParams } from "../utils/mongo_helper.js";
import db_accessor from "db_accessor";

const { onDataDB } = db_accessor;

async function getLastTenConsumptionFrom(collectionName) {
  return await onDataDB((db) =>
    db.collection(collectionName).find().limit(10).toArray()
  );
}

async function getLaundryConsumption(collectionName, sort, fromDate, toDate) {
  return await onDataDB((db) =>
    db
      .collection(collectionName)
      .find()
      .project(getLaundryParams(collectionName))
      .sort({ dateTime: sort })
      .limit(100)
      .toArray()
  );
}

async function getSolarConsumption(collectionName, sort, fromDate, toDate) {
  return await onDataDB((db) =>
    db
      .collection(collectionName)
      .find()
      .project(getSolarParams(collectionName))
      .sort({ dateTime: sort })
      .limit(100)
      .toArray()
  );
}

async function getKitchenConsumption(collectionName, sort, fromDate, toDate) {
  return await onDataDB((db) =>
    db
      .collection(collectionName)
      .find()
      .project(getKitchenParams(collectionName))
      .sort({ dateTime: sort })
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
