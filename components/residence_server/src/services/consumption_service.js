import collections from "../utils/mongo_helper.js";
import {
  getLastTenConsumptionFrom,
  getKitchenConsumption,
  getLaundryConsumption,
  getSolarConsumption,
} from "../dao/data_consumption.js";
import { ResidenceOwner } from "../utils/roles.js";
import UsersService from "./users_service.js";
import { mergeAllAuthFields } from "../utils/authorizations_helper.js";

const { HOMEA, HOMEB, HOMEC, HOMED, HOMEE, HOMEF } = collections;

const lastDate = new Date(2016, 11, 31, 23, 59, 59, 0);
const EMPTY_DATA = { data: {} };

const usersService = UsersService();

const ConsumptionService = () => ({
  getResidanceConsumption: async (user) => {
    if (user.role !== ResidenceOwner) {
      return EMPTY_DATA;
    }
    const data = {
      HOMEA: await getLastTenConsumptionFrom(HOMEA),
      HOMEB: await getLastTenConsumptionFrom(HOMEB),
      HOMEC: await getLastTenConsumptionFrom(HOMEC),
      HOMED: await getLastTenConsumptionFrom(HOMED),
      HOMEE: await getLastTenConsumptionFrom(HOMEE),
      HOMEF: await getLastTenConsumptionFrom(HOMEF),
    };
    return { data };
  },
  getResidanceKitchensConsumption: async (user) => {
    if (user.role !== ResidenceOwner) {
      return EMPTY_DATA;
    }
    const userAuthorizations = await usersService.getAuthorizations(user);
    const authFields = mergeAllAuthFields(userAuthorizations);
    const fromDate = getLastMonthDate(lastDate);
    const data = {
      HOMEA: await getKitchenConsumption(HOMEA, authFields, fromDate, lastDate),
      HOMEB: await getKitchenConsumption(HOMEB, authFields, fromDate, lastDate),
      HOMEC: await getKitchenConsumption(HOMEC, authFields, fromDate, lastDate),
      HOMED: await getKitchenConsumption(HOMED, authFields, fromDate, lastDate),
      HOMEE: await getKitchenConsumption(HOMEE, authFields, fromDate, lastDate),
      HOMEF: await getKitchenConsumption(HOMEF, authFields, fromDate, lastDate),
    };
    return { data };
  },
  getResidanceLaundryConsumption: async (user) => {
    if (user.role !== ResidenceOwner) {
      return EMPTY_DATA;
    }
    const userAuthorizations = await usersService.getAuthorizations(user);
    const authFields = mergeAllAuthFields(userAuthorizations);

    const fromDate = getLastMonthDate(lastDate);
    const data = {
      HOMEA: await getLaundryConsumption(HOMEA, authFields, fromDate, lastDate),
      HOMEB: await getLaundryConsumption(HOMEB, authFields, fromDate, lastDate),
      HOMEC: await getLaundryConsumption(HOMEC, authFields, fromDate, lastDate),
      HOMED: await getLaundryConsumption(HOMED, authFields, fromDate, lastDate),
      HOMEE: await getLaundryConsumption(HOMEE, authFields, fromDate, lastDate),
      HOMEF: await getLaundryConsumption(HOMEF, authFields, fromDate, lastDate),
    };
    return { data };
  },
  getResidancePowerConsumption: async (user) => {
    if (user.role !== ResidenceOwner) {
      return { data: {} };
    }
    const userAuthorizations = await usersService.getAuthorizations(user);
    const authFields = mergeAllAuthFields(userAuthorizations);
    const fromDate = getLastMonthDate(lastDate);
    const data = {
      HOMEA: await getSolarConsumption(HOMEA, authFields, fromDate, lastDate),
      HOMEB: await getSolarConsumption(HOMEB, authFields, fromDate, lastDate),
      HOMEC: await getSolarConsumption(HOMEC, authFields, fromDate, lastDate),
      HOMED: await getSolarConsumption(HOMED, authFields, fromDate, lastDate),
      HOMEE: await getSolarConsumption(HOMEE, authFields, fromDate, lastDate),
      HOMEF: await getSolarConsumption(HOMEF, authFields, fromDate, lastDate),
    };
    return { data };
  },
});

function getLastMonthDate(startDate) {
  const lastMonthDate = new Date(startDate);
  lastMonthDate.setDate(startDate.getDate() - 30);
  return lastMonthDate;
}

export default ConsumptionService;
