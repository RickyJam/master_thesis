import UsersService from "../services/users_service.js";
import SensorsService from "../services/sensors_service.js";
import collections from "../utils/mongo_helper.js";
import { homeRestriction } from "../middleware/auth_middleware.js";

const usersService = UsersService();
const sensorsService = SensorsService(usersService);

const SENSORS_PATH = "/residence/:home";
const KITCHENS_PATH = SENSORS_PATH + "/kitchens";
const LAUNDRY_PATH = SENSORS_PATH + "/laundry";

const HOME_KEY = "home";

const SensorsApi = (server) => ({
  register: () => {
    server.get(SENSORS_PATH, homeRestriction, async (req, res) => {
      const home = req.params[HOME_KEY];
      const user = req.user;
      if (!validateHomeParam(home)) {
        res.status(404).send("Unvalid home provided - " + home);
        return;
      }

      const data = await sensorsService.getHomeSensors(home, user);
      res.send(data);
    });

    server.get(KITCHENS_PATH, homeRestriction, async (req, res) => {
      const home = req.params[HOME_KEY];
      const user = req.user;
      if (!validateHomeParam(home)) {
        res.status(404).send("Unvalid home provided - " + home);
        return;
      }

      const data = await sensorsService.getHomeKitchenSensors(home, user);
      res.send(data);
    });

    server.get(LAUNDRY_PATH, homeRestriction, async (req, res) => {
      const home = req.params[HOME_KEY];
      const user = req.user;
      if (!validateHomeParam(home)) {
        res.status(404).send("Unvalid home provided - " + home);
        return;
      }

      const data = await sensorsService.getHomeLaundrySensors(home, user);
      res.send(data);
    });
  },
});

function validateHomeParam(homeParam) {
  return Object.values(collections).includes(homeParam);
}

export const getSensorsPaths = [SENSORS_PATH, KITCHENS_PATH, LAUNDRY_PATH];
export default SensorsApi;
