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
import { getUserDates } from "../utils/date_helper.js";

const EMPTY_DATA = { data: {} };

const usersService = UsersService();

const ConsumptionService = () => ({
  getResidenceConsumption: async (user) => {
    if (user.role !== ResidenceOwner) {
      return EMPTY_DATA;
    }

    const { toDate, fromDate } = getUserDates(user);

    const data = {};
    for (const home of collections) {
      data[home] = await getLastTenConsumptionFrom(home);
    }

    return { data };
  },
  getResidenceKitchensConsumption: async (user) => {
    if (user.role !== ResidenceOwner) {
      return EMPTY_DATA;
    }
    const userAuthorizations = await usersService.getAuthorizations(user);
    const authFields = mergeAllAuthFields(userAuthorizations);

    const { toDate, fromDate } = getUserDates(user);

    const data = {};
    for (const home of collections) {
      data[home] = await getKitchenConsumption(
        home,
        authFields,
        fromDate,
        toDate
      );
    }

    return { data };
  },
  getResidenceLaundryConsumption: async (user) => {
    if (user.role !== ResidenceOwner) {
      return EMPTY_DATA;
    }

    const userAuthorizations = await usersService.getAuthorizations(user);
    const authFields = mergeAllAuthFields(userAuthorizations);

    const { toDate, fromDate } = getUserDates(user);

    const data = {};
    for (const home of collections) {
      data[home] = await getLaundryConsumption(
        home,
        authFields,
        fromDate,
        toDate
      );
    }

    return { data };
  },
  
  getResidencePowerConsumption: async (user) => {
    if (user.role !== ResidenceOwner) {
      return EMPTY_DATA;
    }

    const userAuthorizations = await usersService.getAuthorizations(user);
    const authFields = mergeAllAuthFields(userAuthorizations);

    const { toDate, fromDate } = getUserDates(user);

    const data = {};
    for (const home of collections) {
      data[home] = await getSolarConsumption(
        home,
        authFields,
        fromDate,
        toDate
      );
    }

    return { data };
  },
});

export default ConsumptionService;
