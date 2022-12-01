import MetricsService from "../services/metrics_service.js";

const metricsService = MetricsService();

const METRICS_PATH = "/residence";
const KITCHENS_PATH = METRICS_PATH + "/kitchens";
const LAUNDRY_PATH = METRICS_PATH + "/laundry";
const POWER_PATH = METRICS_PATH + "/power";

const MetricsApi = (server) => ({
  register: () => {
    server.get(METRICS_PATH, async (req, res) => {
      const data = await metricsService.getResidanceMetrics();
      res.send(data);
    });

    server.get(KITCHENS_PATH, async (req, res) => {
      const data = await metricsService.getResidanceKitchensMetrics();
      res.send(data);
    });

    server.get(LAUNDRY_PATH, async (req, res) => {
      const data = await metricsService.getResidanceLaundryMetrics();
      res.send(data);
    });

    server.get(POWER_PATH, async (req, res) => {
      const data = await metricsService.getResidancePowerMetrics();
      res.send(data);
    });
  },
});

export const getPaths = () => [
  METRICS_PATH,
  KITCHENS_PATH,
  LAUNDRY_PATH,
  POWER_PATH,
];
export default MetricsApi;
