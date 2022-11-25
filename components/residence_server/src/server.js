import MetricsApi from "./api/metrics_api";
import express from "express";

const server = express();
const metrics_api = MetricsApi(server);

metrics_api.register();