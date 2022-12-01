import collections from "../utils/mongo_helper.js";
import {
  getLastTenMetricsFrom,
  getPowerMetrics,
} from "../dao/mongo_metrics.js";

const { HOMEA, HOMEB, HOMEC, HOMED, HOMEE, HOMEF } = collections;

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
  getResidanceKitchensMetrics: async () => {
    const data = {
      HOMEA: await getPowerMetrics(HOMEA),
      HOMEB: await getPowerMetrics(HOMEB),
      HOMEC: await getPowerMetrics(HOMEC),
      HOMED: await getPowerMetrics(HOMED),
      HOMEE: await getPowerMetrics(HOMEE),
      HOMEF: await getPowerMetrics(HOMEF),
    };
    return { data };
  },
  getResidanceLaundryMetrics: () => {},
  getResidancePowerMetrics: () => {},
});

export default MetricsService;
