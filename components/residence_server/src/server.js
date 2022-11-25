import MetricsApi from "./api/metrics_api.js";
import express from "express";

const server = express();
const metrics_api = MetricsApi(server);

metrics_api.register();

server.listen(3000, () => console.log('Node server started and listening on port 3000'));