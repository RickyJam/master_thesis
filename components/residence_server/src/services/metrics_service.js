import { getAllLastTenMetrics } from "../dao/mongo_access.js";

const MetricsService = () => ({
  getResidanceMetrics: async () => {
    return await getAllLastTenMetrics();
  },
  getResidanceKitchensMetrics: () => {},
  getResidanceLaundryMetrics: () => {},
  getResidancePowerMetrics: () => {},
});

export default MetricsService;
