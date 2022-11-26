import { getLastTenMetrics } from "../dao/mongo_access.js";

const MetricsService = () => ({
  getResidanceMetrics: async () => {
    return await getLastTenMetrics();
  },
  getResidanceKitchensMetrics: () => {},
  getResidanceLaundryMetrics: () => {},
  getResidancePowerMetrics: () => {},
});

export default MetricsService;
