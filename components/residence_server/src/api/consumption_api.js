import ConsumptionService from "../services/consumption_service.js";

const consumptionService = ConsumptionService();

const METRICS_PATH = "/residence";
const KITCHENS_PATH = METRICS_PATH + "/kitchens";
const LAUNDRY_PATH = METRICS_PATH + "/laundry";
const POWER_PATH = METRICS_PATH + "/power";

const ConsumptionApi = (server) => ({
  register: () => {
    server.get(METRICS_PATH, async (req, res) => {
      const data = await consumptionService.getResidanceConsumption();
      res.send(data);
    });

    server.get(KITCHENS_PATH, async (req, res) => {
      const data = await consumptionService.getResidanceKitchensConsumption();
      res.send(data);
    });

    server.get(LAUNDRY_PATH, async (req, res) => {
      const data = await consumptionService.getResidanceLaundryConsumption();
      res.send(data);
    });

    server.get(POWER_PATH, async (req, res) => {
      const data = await consumptionService.getResidancePowerConsumption();
      res.send(data);
    });
  },
});

export const getPaths = () => [
  METRICS_PATH,
  KITCHENS_PATH,
  LAUNDRY_PATH,
  POWER_PATH,
];
export default ConsumptionApi;
