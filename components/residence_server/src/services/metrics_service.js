import collections from "../utils/mongo_helper.js";
import {
  getLastTenMetricsFrom,
  getKitchenMetrics,
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
      HOMEA: await getKitchenMetrics(HOMEA),
      HOMEB: await getKitchenMetrics(HOMEB),
      HOMEC: await getKitchenMetrics(HOMEC),
      HOMED: await getKitchenMetrics(HOMED),
      HOMEE: await getKitchenMetrics(HOMEE),
      HOMEF: await getKitchenMetrics(HOMEF),
    };
    return { data };
  },
  getResidanceLaundryMetrics: () => {},
  getResidancePowerMetrics: () => {},
});

export default MetricsService;
