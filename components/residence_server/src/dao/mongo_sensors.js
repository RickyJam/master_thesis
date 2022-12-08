import {
  getKitchenParams,
  getLaundryParams,
} from "../utils/mongo_helper.js";
import onMasterDB from "./mongo_access.js";

async function getLastTenConsumptionFrom(collectionName) {
  return await onMasterDB((db) =>
    db.collection(collectionName).find().limit(10).toArray()
  );
}

async function getLaundryConsumption(collectionName, sort, fromDate, toDate) {
  return await onMasterDB((db) =>
    db
      .collection(collectionName)
      .find()
      .project(getLaundryParams(collectionName))
      .sort({ dateTime: sort })
      .toArray()
  );
}

async function getSolarConsumption(collectionName, sort, fromDate, toDate) {
  return await onMasterDB((db) =>
    db
      .collection(collectionName)
      .find()
      .project(getSolarParams(collectionName))
      .sort({ dateTime: sort })
      .toArray()
  );
}

async function getKitchenConsumption(collectionName, sort, fromDate, toDate) {
  return await onMasterDB((db) =>
    db
      .collection(collectionName)
      .find()
      .project(getKitchenParams(collectionName))
      .sort({ dateTime: sort })
      .toArray()
  );
}

export {
  getLastTenConsumptionFrom,
  getKitchenConsumption,
  getLaundryConsumption,
  getSolarConsumption,
};
