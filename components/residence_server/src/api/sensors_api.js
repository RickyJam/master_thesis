// import SensorsService from "../services/sensors_service.js";

// const sensorsService = SensorsService();

const SENSORS_PATH = "/residence/:home";
const KITCHENS_PATH = SENSORS_PATH + "/kitchens";
const LAUNDRY_PATH = SENSORS_PATH + "/laundry";

const SensorsApi = (server) => ({
  register: () => {
    server.get(SENSORS_PATH, async (req, res) => {
      const data = {}; // await sensorsService.getResidanceSensors();
      res.send(data);
    });

    server.get(KITCHENS_PATH, async (req, res) => {
      const data = {}; //await sensorsService.getResidanceKitchensSensors();
      res.send(data);
    });

    server.get(LAUNDRY_PATH, async (req, res) => {
      const data = {}; //await sensorsService.getResidanceLaundrySensors();
      res.send(data);
    });
  },
});

export const getSensorsPaths = () => [
  SENSORS_PATH,
  KITCHENS_PATH,
  LAUNDRY_PATH,
];
export default SensorsApi;
