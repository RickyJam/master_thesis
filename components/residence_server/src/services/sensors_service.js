import collections from "../utils/mongo_helper.js";

const { HOMEA, HOMEB, HOMEC, HOMED, HOMEE, HOMEF } = collections;

const lastDate = new Date(2016, 11, 31, 23, 59, 59, 0);
const ASC = 1;
const DESC = -1;

const SensorsService = () => ({
  getHomeConsumption: async () => {
    const data = {
      HOMEA: null, // await getLastTenConsumptionFrom(HOMEA),
      HOMEB: null, // await getLastTenConsumptionFrom(HOMEB),
      HOMEC: null, // await getLastTenConsumptionFrom(HOMEC),
      HOMED: null, // await getLastTenConsumptionFrom(HOMED),
      HOMEE: null, // await getLastTenConsumptionFrom(HOMEE),
      HOMEF: null, // await getLastTenConsumptionFrom(HOMEF),
    };
    return { data };
  },
  getHomeKitchenConsumption: async (toDate = lastDate, sort = DESC) => {
    const fromDate = getLastMonthDate(toDate);
    const data = {
      HOMEA: null, // await getLastTenConsumptionFrom(HOMEA),
      HOMEB: null, // await getLastTenConsumptionFrom(HOMEB),
      HOMEC: null, // await getLastTenConsumptionFrom(HOMEC),
      HOMED: null, // await getLastTenConsumptionFrom(HOMED),
      HOMEE: null, // await getLastTenConsumptionFrom(HOMEE),
      HOMEF: null, // await getLastTenConsumptionFrom(HOMEF),
    };
    return { data };
  },
  getHomeLaundryConsumption: async (toDate = lastDate, sort = DESC) => {
    const fromDate = getLastMonthDate(toDate);
    const data = {
      HOMEA: null, // await getLastTenConsumptionFrom(HOMEA),
      HOMEB: null, // await getLastTenConsumptionFrom(HOMEB),
      HOMEC: null, // await getLastTenConsumptionFrom(HOMEC),
      HOMED: null, // await getLastTenConsumptionFrom(HOMED),
      HOMEE: null, // await getLastTenConsumptionFrom(HOMEE),
      HOMEF: null, // await getLastTenConsumptionFrom(HOMEF),
    };
    return { data };
  },
});

function getLastMonthDate(startDate) {
  const lastMonthDate = new Date(startDate);
  lastMonthDate.setDate(startDate.getDate() - 30);
  return lastMonthDate;
}

export default SensorsService;
