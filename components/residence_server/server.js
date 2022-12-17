import ConsumptionApi, { getConsumptionPaths } from "./src/api/consumption_api.js";
import express from "express";
import isDev from "./src/utils/enviroment.js";
import SensorsApi, { getSensorsPaths } from "./src/api/sensors_api.js";
import AuthMiddleware from "./src/middleware/auth_middleware.js";
import UsersApi, { getUsersPaths } from "./src/api/users_api.js";

const PORT = 3000;

const server = express();
const auth_middleware = AuthMiddleware(server);
auth_middleware.register();

const consumption_api = ConsumptionApi(server);
consumption_api.register();

const sensors_api = SensorsApi(server);
sensors_api.register();

const usersApi = UsersApi(server);
usersApi.register();

server.listen(PORT, () =>
  console.log("Node server started and listening on port 3000")
);

server.get("/", async (_, res) => {
  const enviroment = isDev() ? "DEV" : "PROD";
  const response = {
    enviroment,
    path: {
      consumption: getConsumptionPaths,
      sensors: getSensorsPaths,
      tests: getUsersPaths
    },
  };
  res.send(response);
});
