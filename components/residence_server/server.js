import MetricsApi from "./src/api/metrics_api.js";
import express from "express";

const PORT = 3000;

const server = express();
const metrics_api = MetricsApi(server);

metrics_api.register();

server.listen(PORT, () => console.log('Node server started and listening on port 3000'));