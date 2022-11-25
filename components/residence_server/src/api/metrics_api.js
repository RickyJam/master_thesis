METRICS_PATH = "/metrics";

const MetricsApi = (server) => ({
    register: () => {
        server.get('/residence', (req, res) => {
            //TODO: chiamata al service
        });

        server.get('/residence/kitchens', (req, res) => {
            //TODO: chiamata al service
        });

        server.get('/residence/laundry', (req, res) => {
            //TODO: chiamata al service
        });

        server.get('/residence/power', (req, res) => {
            //TODO: chiamata al service
        });
    }
});

export default MetricsApi;