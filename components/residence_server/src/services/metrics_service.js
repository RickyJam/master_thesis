import { pingDB } from "../dao/mongo_access.js";

const MetricsService = () => ({
  getResidanceMetrics: async () => {
    await pingDB();
  },
  getResidanceKitchensMetrics: () => {},
  getResidanceLaundryMetrics: () => {},
  getResidancePowerMetrics: () => {},
});

export default MetricsService;
