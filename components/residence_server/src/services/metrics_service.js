import collections from "../utils/mongo_helper.js";
import {
  getLastTenMetricsFrom,
  getKitchenMetrics,
  getLaundryMetrics,
  getSolarMetrics,
} from "../dao/mongo_metrics.js";

const { HOMEA, HOMEB, HOMEC, HOMED, HOMEE, HOMEF } = collections;

const lastDate = new Date(2016, 11, 31, 23, 59, 59, 0);
const ASC = 1;
const DESC = -1;

const MetricsService = () => ({
  getResidanceMetrics: async () => {
    const data = {
      HOMEA: await getLastTenMetricsFrom(HOMEA),
      HOMEB: await getLastTenMetricsFrom(HOMEB),
      HOMEC: await getLastTenMetricsFrom(HOMEC),
      HOMED: await getLastTenMetricsFrom(HOMED),
      HOMEE: await getLastTenMetricsFrom(HOMEE),
      HOMEF: await getLastTenMetricsFrom(HOMEF),
    };
    return { data };
  },
  getResidanceKitchensMetrics: async (toDate = lastDate, sort = DESC) => {
    const fromDate = getLastMonthDate(toDate);
    const data = {
      HOMEA: await getKitchenMetrics(HOMEA, sort, fromDate, toDate),
      HOMEB: await getKitchenMetrics(HOMEB, sort, fromDate, toDate),
      HOMEC: await getKitchenMetrics(HOMEC, sort, fromDate, toDate),
      HOMED: await getKitchenMetrics(HOMED, sort, fromDate, toDate),
      HOMEE: await getKitchenMetrics(HOMEE, sort, fromDate, toDate),
      HOMEF: await getKitchenMetrics(HOMEF, sort, fromDate, toDate),
    };
    return { data };
  },
  getResidanceLaundryMetrics: async (toDate = lastDate, sort = DESC) => {
    const fromDate = getLastMonthDate(toDate);
    const data = {
      HOMEA: await getLaundryMetrics(HOMEA, sort, fromDate, toDate),
      HOMEB: await getLaundryMetrics(HOMEB, sort, fromDate, toDate),
      HOMEC: await getLaundryMetrics(HOMEC, sort, fromDate, toDate),
      HOMED: await getLaundryMetrics(HOMED, sort, fromDate, toDate),
      HOMEE: await getLaundryMetrics(HOMEE, sort, fromDate, toDate),
      HOMEF: await getLaundryMetrics(HOMEF, sort, fromDate, toDate),
    };
    return { data };
  },
  getResidancePowerMetrics: async (toDate = lastDate, sort = DESC) => {
    const fromDate = getLastMonthDate(toDate);
    const data = {
      HOMEA: await getSolarMetrics(HOMEA, sort, fromDate, toDate),
      HOMEB: await getSolarMetrics(HOMEB, sort, fromDate, toDate),
      HOMEC: await getSolarMetrics(HOMEC, sort, fromDate, toDate),
      HOMED: await getSolarMetrics(HOMED, sort, fromDate, toDate),
      HOMEE: await getSolarMetrics(HOMEE, sort, fromDate, toDate),
      HOMEF: await getSolarMetrics(HOMEF, sort, fromDate, toDate),
    };
    return { data };
  },
});

function getLastMonthDate(startDate) {
  const lastMonthDate = new Date(startDate);
  lastMonthDate.setDate(startDate.getDate() - 30);
  return lastMonthDate;
}

export default MetricsService;
