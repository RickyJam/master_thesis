import {
  getLastTenConsumptionFrom,
  getKitchenConsumption,
  getLaundryConsumption,
} from "../dao/mongo_sensors.js";

const lastDate = new Date(2016, 11, 31, 23, 59, 59, 0);
const ASC = 1;
const DESC = -1;

const SensorsService = () => ({
  getHomeSensors: async (home) => {
    const data = await getLastTenConsumptionFrom(home);

    return { ...data };
  },
  getHomeKitchenSensors: async (home, toDate = lastDate, sort = DESC) => {
    const fromDate = getLastMonthDate(toDate);
    const data = await getKitchenConsumption(home);

    return { data };
  },
  getHomeLaundrySensors: async (home, toDate = lastDate, sort = DESC) => {
    const fromDate = getLastMonthDate(toDate);
    const data = await getLaundryConsumption(home);

    return { data };
  },
});

function getLastMonthDate(startDate) {
  const lastMonthDate = new Date(startDate);
  lastMonthDate.setDate(startDate.getDate() - 30);
  return lastMonthDate;
}

export default SensorsService;
