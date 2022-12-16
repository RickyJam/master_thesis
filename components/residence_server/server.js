import ConsumptionApi, { getConsumptionPaths } from "./src/api/consumption_api.js";
import express from "express";
import isDev from "./src/utils/enviroment.js";
import SensorsApi, { getSensorsPaths } from "./src/api/sensors_api.js";

const PORT = 3000;

const server = express();
const consumption_api = ConsumptionApi(server);
const sensors_api = SensorsApi(server);

consumption_api.register();
sensors_api.register();

server.listen(PORT, () =>
  console.log("Node server started and listening on port 3000")
);

server.get("/", async (_, res) => {
  const enviroment = isDev() ? "DEV" : "PROD";
  const response = {
    enviroment,
    path: {
      consumption: getConsumptionPaths,
      sensors: getSensorsPaths
    },
  };
  res.send(response);
});
