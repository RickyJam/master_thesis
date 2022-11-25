import MetricsService from '../services/metrics_service.js';

const metricsService = MetricsService();

const METRICS_PATH = "/residence";
const KITCHENS_PATH = METRICS_PATH + "/kitchens";
const LAUNDRY_PATH = METRICS_PATH + "/laundry";
const POWER_PATH = METRICS_PATH + "/power";

const MetricsApi = (server) => ({
    register: () => {
        server.get(METRICS_PATH, (req, res) => {
            const data = metricsService.getResidanceMetrics();
            return data;
        });

        server.get(KITCHENS_PATH, (req, res) => {
            const data = metricsService.getResidanceKitchensMetrics();
            return data;
        });

        server.get(LAUNDRY_PATH, (req, res) => {
            const data = metricsService.getResidanceLaundryMetrics();
            return data;
        });

        server.get(POWER_PATH, (req, res) => {
            const data = metricsService.getResidancePowerMetrics();
            return data;
        });
    }
});

export default MetricsApi;