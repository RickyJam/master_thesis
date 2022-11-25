import MetricsApi from "./api/metrics_api.js";
import express from "express";

const server = express();
const metrics_api = MetricsApi(server);

metrics_api.register();