import { pingDB } from "../dao/mongo_access";

const MetricsService = () => ({
  getResidanceMetrics: async () => {
    await pingDB();
  },
  getResidanceKitchensMetrics: () => {},
  getResidanceLaundryMetrics: () => {},
  getResidancePowerMetrics: () => {},
});

export default MetricsService;
