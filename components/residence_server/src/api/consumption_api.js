import ConsumptionService from "../services/consumption_service.js";

const consumptionService = ConsumptionService();

const CONSUMPTION_PATH = "/residence";
const KITCHENS_PATH = CONSUMPTION_PATH + "/kitchens";
const LAUNDRY_PATH = CONSUMPTION_PATH + "/laundry";
const POWER_PATH = CONSUMPTION_PATH + "/power";

const ConsumptionApi = (server) => ({
  register: () => {
    server.get(CONSUMPTION_PATH, async (req, res) => {
      const user = req.user;
      const data = await consumptionService.getResidanceConsumption(user);
      res.send(data);
    });

    server.get(KITCHENS_PATH, async (req, res) => {
      const user = req.user;
      const data = await consumptionService.getResidanceKitchensConsumption(user);
      res.send(data);
    });

    server.get(LAUNDRY_PATH, async (req, res) => {
      const user = req.user;
      const data = await consumptionService.getResidanceLaundryConsumption(user);
      res.send(data);
    });

    server.get(POWER_PATH, async (req, res) => {
      const user = req.user;
      const data = await consumptionService.getResidancePowerConsumption();
      res.send(data);
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
