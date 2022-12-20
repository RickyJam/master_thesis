import collections from "../utils/mongo_helper.js";
import {
  getLastTenConsumptionFrom,
  getKitchenConsumption,
  getLaundryConsumption,
  getSolarConsumption,
} from "../dao/data_consumption.js";

const { HOMEA, HOMEB, HOMEC, HOMED, HOMEE, HOMEF } = collections;

const lastDate = new Date(2016, 11, 31, 23, 59, 59, 0);
const DESC = -1;

const ConsumptionService = () => ({
  getResidanceConsumption: async () => {
    const data = {
      HOMEA: await getLastTenConsumptionFrom(HOMEA),
      HOMEB: await getLastTenConsumptionFrom(HOMEB),
      HOMEC: await getLastTenConsumptionFrom(HOMEC),
      HOMED: await getLastTenConsumptionFrom(HOMED),
      HOMEE: await getLastTenConsumptionFrom(HOMEE),
      HOMEF: await getLastTenConsumptionFrom(HOMEF),
    };
    return { data };
  },
  getResidanceKitchensConsumption: async (toDate = lastDate, sort = DESC) => {
    const fromDate = getLastMonthDate(toDate);
    const data = {
      HOMEA: await getKitchenConsumption(HOMEA, sort, fromDate, toDate),
      HOMEB: await getKitchenConsumption(HOMEB, sort, fromDate, toDate),
      HOMEC: await getKitchenConsumption(HOMEC, sort, fromDate, toDate),
      HOMED: await getKitchenConsumption(HOMED, sort, fromDate, toDate),
      HOMEE: await getKitchenConsumption(HOMEE, sort, fromDate, toDate),
      HOMEF: await getKitchenConsumption(HOMEF, sort, fromDate, toDate),
    };
    return { data };
  },
  getResidanceLaundryConsumption: async (toDate = lastDate, sort = DESC) => {
    const fromDate = getLastMonthDate(toDate);
    const data = {
      HOMEA: await getLaundryConsumption(HOMEA, sort, fromDate, toDate),
      HOMEB: await getLaundryConsumption(HOMEB, sort, fromDate, toDate),
      HOMEC: await getLaundryConsumption(HOMEC, sort, fromDate, toDate),
      HOMED: await getLaundryConsumption(HOMED, sort, fromDate, toDate),
      HOMEE: await getLaundryConsumption(HOMEE, sort, fromDate, toDate),
      HOMEF: await getLaundryConsumption(HOMEF, sort, fromDate, toDate),
    };
    return { data };
  },
  getResidancePowerConsumption: async (toDate = lastDate, sort = DESC) => {
    const fromDate = getLastMonthDate(toDate);
    const data = {
      HOMEA: await getSolarConsumption(HOMEA, sort, fromDate, toDate),
      HOMEB: await getSolarConsumption(HOMEB, sort, fromDate, toDate),
      HOMEC: await getSolarConsumption(HOMEC, sort, fromDate, toDate),
      HOMED: await getSolarConsumption(HOMED, sort, fromDate, toDate),
      HOMEE: await getSolarConsumption(HOMEE, sort, fromDate, toDate),
      HOMEF: await getSolarConsumption(HOMEF, sort, fromDate, toDate),
    };
    return { data };
  },
});

function getLastMonthDate(startDate) {
  const lastMonthDate = new Date(startDate);
  lastMonthDate.setDate(startDate.getDate() - 30);
  return lastMonthDate;
}

export default ConsumptionService;
