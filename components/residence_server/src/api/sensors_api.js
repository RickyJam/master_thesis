import SensorsService from "../services/sensors_service.js";

const sensorsService = SensorsService();

const SENSORS_PATH = "/residence/:home";
const KITCHENS_PATH = SENSORS_PATH + "/kitchens";
const LAUNDRY_PATH = SENSORS_PATH + "/laundry";

const HOME_KEY = "home";

const SensorsApi = (server) => ({
  register: () => {
    server.get(SENSORS_PATH, async (req, res) => {
      const home = req.params[HOME_KEY];
      const data = await sensorsService.getHomeSensors();
      res.send(data);
    });

    server.get(KITCHENS_PATH, async (req, res) => {
      const home = req.params[HOME_KEY];
      const data = await sensorsService.getHomeKitchenSensors();
      res.send(data);
    });

    server.get(LAUNDRY_PATH, async (req, res) => {
      const home = req.params[HOME_KEY];
      const data = await sensorsService.getHomeLaundrySensors();
      res.send(data);
    });
  },
});

export const getSensorsPaths = [SENSORS_PATH, KITCHENS_PATH, LAUNDRY_PATH];
export default SensorsApi;
