import UsersService from "../services/users_service.js";
import SensorsService from "../services/sensors_service.js";
import { homeRestriction } from "../middleware/auth_middleware.js";
import { HomeOwner } from "../utils/roles.js";
import { handleData, validateHomeParam } from "../utils/http_helper.js";

const usersService = UsersService();
const sensorsService = SensorsService(usersService);

const SENSORS_PATH = "/residence/:home";
const KITCHENS_PATH = SENSORS_PATH + "/kitchen";
const LAUNDRY_PATH = SENSORS_PATH + "/laundry";

const HOME_KEY = "home";

const SensorsApi = (server) => ({
  register: () => {
    server.get(SENSORS_PATH, homeRestriction, async (req, res) => {
      const home = req.params[HOME_KEY];
      const user = req.user;
      if (user.role !== HomeOwner) {
        res.status(401).send("Unauthorized");
        return;
      }

      if (!validateHomeParam(home)) {
        res.status(404).send("Unvalid home provided - " + home);
        return;
      }

      const data = await sensorsService.getHomeSensors(home, user);
      handleData(res, data);
    });

    server.get(KITCHENS_PATH, homeRestriction, async (req, res) => {
      const home = req.params[HOME_KEY];
      const user = req.user;
      if (!validateHomeParam(home)) {
        res.status(404).send("Unvalid home provided - " + home);
        return;
      }

      const data = await sensorsService.getHomeKitchenSensors(home, user);
      handleData(res, data);
    });

    server.get(LAUNDRY_PATH, homeRestriction, async (req, res) => {
      const home = req.params[HOME_KEY];
      const user = req.user;
      if (!validateHomeParam(home)) {
        res.status(404).send("Unvalid home provided - " + home);
        return;
      }

      const data = await sensorsService.getHomeLaundrySensors(home, user);
      handleData(res, data);
    });
  },
});

export const getSensorsPaths = [SENSORS_PATH, KITCHENS_PATH, LAUNDRY_PATH];
export default SensorsApi;
