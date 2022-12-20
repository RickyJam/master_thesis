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
  getResidanceKitchensConsumption: async (user, toDate = lastDate) => {
    if (user.role !== ResidenceOwner) {
      return EMPTY_DATA;
    }
    const userAuthorizations = await usersService.getAuthorizations(user);
    const authFields = mergeAllAuthFields(userAuthorizations);
    const fromDate = getLastMonthDate(toDate);
    const data = {
      HOMEA: await getKitchenConsumption(HOMEA, authFields, fromDate, toDate),
      HOMEB: await getKitchenConsumption(HOMEB, authFields, fromDate, toDate),
      HOMEC: await getKitchenConsumption(HOMEC, authFields, fromDate, toDate),
      HOMED: await getKitchenConsumption(HOMED, authFields, fromDate, toDate),
      HOMEE: await getKitchenConsumption(HOMEE, authFields, fromDate, toDate),
      HOMEF: await getKitchenConsumption(HOMEF, authFields, fromDate, toDate),
    };
    return { data };
  },
  getResidanceLaundryConsumption: async (user, toDate = lastDate) => {
    if (user.role !== ResidenceOwner) {
      return EMPTY_DATA;
    }
    const userAuthorizations = await usersService.getAuthorizations(user);
    const authFields = mergeAllAuthFields(userAuthorizations);

    const fromDate = getLastMonthDate(toDate);
    const data = {
      HOMEA: await getLaundryConsumption(HOMEA, authFields, fromDate, toDate),
      HOMEB: await getLaundryConsumption(HOMEB, authFields, fromDate, toDate),
      HOMEC: await getLaundryConsumption(HOMEC, authFields, fromDate, toDate),
      HOMED: await getLaundryConsumption(HOMED, authFields, fromDate, toDate),
      HOMEE: await getLaundryConsumption(HOMEE, authFields, fromDate, toDate),
      HOMEF: await getLaundryConsumption(HOMEF, authFields, fromDate, toDate),
    };
    return { data };
  },
  getResidancePowerConsumption: async (user, toDate = lastDate) => {
    if (user.role !== ResidenceOwner) {
      return { data: {} };
    }
    const userAuthorizations = await usersService.getAuthorizations(user);
    const authFields = mergeAllAuthFields(userAuthorizations);
    const fromDate = getLastMonthDate(toDate);
    const data = {
      HOMEA: await getSolarConsumption(HOMEA, authFields, fromDate, toDate),
      HOMEB: await getSolarConsumption(HOMEB, authFields, fromDate, toDate),
      HOMEC: await getSolarConsumption(HOMEC, authFields, fromDate, toDate),
      HOMED: await getSolarConsumption(HOMED, authFields, fromDate, toDate),
      HOMEE: await getSolarConsumption(HOMEE, authFields, fromDate, toDate),
      HOMEF: await getSolarConsumption(HOMEF, authFields, fromDate, toDate),
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
