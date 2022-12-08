import SensorsService from "../services/sensors_service.js";
import collections from "../utils/mongo_helper.js";

const sensorsService = SensorsService();

const SENSORS_PATH = "/residence/:home";
const KITCHENS_PATH = SENSORS_PATH + "/kitchens";
const LAUNDRY_PATH = SENSORS_PATH + "/laundry";

const HOME_KEY = "home";

const SensorsApi = (server) => ({
  register: () => {
    server.get(SENSORS_PATH, async (req, res) => {
      const home = req.params[HOME_KEY];
      if (!validateHomeParam(home)) {
        res.status(404).send("Unvalid home provided - " + home);
      }

      const data = await sensorsService.getHomeSensors();
      res.send(data);
    });

    server.get(KITCHENS_PATH, async (req, res) => {
      const home = req.params[HOME_KEY];
      if (!validateHomeParam(home)) {
        res.status(404).send("Unvalid home provided - " + home);
      }

      const data = await sensorsService.getHomeKitchenSensors();
      res.send(data);
    });

    server.get(LAUNDRY_PATH, async (req, res) => {
      const home = req.params[HOME_KEY];
      if (!validateHomeParam(home)) {
        res.status(404).send("Unvalid home provided - " + home);
      }

      const data = await sensorsService.getHomeLaundrySensors();
      res.send(data);
    });
  },
});

function validateHomeParam(homeParam) {
  return collections.hasOwnProperty(homeParam);
}

export const getSensorsPaths = [SENSORS_PATH, KITCHENS_PATH, LAUNDRY_PATH];
export default SensorsApi;
