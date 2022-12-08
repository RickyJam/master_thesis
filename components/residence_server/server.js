import MetricsApi, { getPaths } from "./src/api/consumption_api.js";
import express from "express";
import isDev from "./src/utils/enviroment.js";

const PORT = 3000;

const server = express();
const metrics_api = MetricsApi(server);

metrics_api.register();

server.listen(PORT, () =>
  console.log("Node server started and listening on port 3000")
);

server.get("/", async (req, res) => {
  const enviroment = isDev() ? "DEV" : "PROD";
  const response = {
    enviroment,
    path: {
      consumption: getPaths(),
    },
  };
  res.send(response);
});
