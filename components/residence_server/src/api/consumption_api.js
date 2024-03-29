import ConsumptionService from "../services/consumption_service.js";
import { handleData } from "../utils/http_helper.js";

const consumptionService = ConsumptionService();

const CONSUMPTION_PATH = "/residence";
const KITCHENS_PATH = CONSUMPTION_PATH + "/kitchens";
const LAUNDRY_PATH = CONSUMPTION_PATH + "/laundry";
const POWER_PATH = CONSUMPTION_PATH + "/power";

const ConsumptionApi = (server) => ({
  register: () => {
    server.get(CONSUMPTION_PATH, async (req, res) => {
      const user = req.user;
      const data = await consumptionService.getResidenceConsumption(user);
      handleData(res, data);
    });

    server.get(KITCHENS_PATH, async (req, res) => {
      const user = req.user;
      const data = await consumptionService.getResidenceKitchensConsumption(
        user
      );
      handleData(res, data);
    });

    server.get(LAUNDRY_PATH, async (req, res) => {
      const user = req.user;
      const data = await consumptionService.getResidenceLaundryConsumption(
        user
      );
      handleData(res, data);
    });

    server.get(POWER_PATH, async (req, res) => {
      const user = req.user;
      const data = await consumptionService.getResidencePowerConsumption(user);
      handleData(res, data);
    });
  },
});

export const getConsumptionPaths = [
  CONSUMPTION_PATH,
  KITCHENS_PATH,
  LAUNDRY_PATH,
  POWER_PATH,
];

export default ConsumptionApi;
