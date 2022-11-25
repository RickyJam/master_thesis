import MetricsService from '../services/metrics_service.js';

const metricsService = MetricsService();

METRICS_PATH = "/metrics";

const MetricsApi = (server) => ({
    register: () => {
        server.get('/residence', (req, res) => {
            const data = metricsService.getResidanceMetrics();
        });

        server.get('/residence/kitchens', (req, res) => {
            const data = metricsService.getResidanceKitchensMetrics();
        });

        server.get('/residence/laundry', (req, res) => {
            const data = metricsService.getResidanceLaundryMetrics();
        });

        server.get('/residence/power', (req, res) => {
            const data = metricsService.getResidancePowerMetrics();
        });
    }
});

export default MetricsApi;