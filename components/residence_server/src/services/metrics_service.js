import { getLastTenMetricsFrom } from "../dao/mongo_access.js";

const HOMEA_COLLECTION = "homeA";
const HOMEB_COLLECTION = "homeB";
const HOMEC_COLLECTION = "homeC";
const HOMED_COLLECTION = "homeD";
const HOMEE_COLLECTION = "homeE";
const HOMEF_COLLECTION = "homeF";

const MetricsService = () => ({
  getResidanceMetrics: async () => {
    const data = {
      HOMEA_COLLECTION: await getLastTenMetricsFrom(HOMEA_COLLECTION),
      HOMEB_COLLECTION: await getLastTenMetricsFrom(HOMEB_COLLECTION),
      HOMEC_COLLECTION: await getLastTenMetricsFrom(HOMEC_COLLECTION),
      HOMED_COLLECTION: await getLastTenMetricsFrom(HOMED_COLLECTION),
      HOMEE_COLLECTION: await getLastTenMetricsFrom(HOMEE_COLLECTION),
      HOMEF_COLLECTION: await getLastTenMetricsFrom(HOMEF_COLLECTION),
    };
    return { data };
  },
  getResidanceKitchensMetrics: () => {},
  getResidanceLaundryMetrics: () => {},
  getResidancePowerMetrics: () => {},
});

export default MetricsService;
