import { pingDB } from "../dao/mongo_access.js";

const MetricsService = () => ({
  getResidanceMetrics: async () => {
    return await pingDB();
  },
  getResidanceKitchensMetrics: () => {},
  getResidanceLaundryMetrics: () => {},
  getResidancePowerMetrics: () => {},
});

export default MetricsService;
