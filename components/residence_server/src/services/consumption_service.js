import collections from "../utils/mongo_helper.js";
import {
  getLastTenConsumptionFrom,
  getKitchenConsumption,
  getLaundryConsumption,
  getSolarConsumption,
} from "../dao/data_consumption.js";
import { ResidenceOwner } from "../utils/roles.js";
import UsersService from "./users_service.js";
import { getAuthForHome, mergeAllAuthFields } from "../utils/authorizations_helper.js";
import { getUserDates } from "../utils/date_helper.js";

const usersService = UsersService();

const ConsumptionService = () => ({
  getResidenceConsumption: async (user) => {
    if (user.role !== ResidenceOwner) {
      return undefined;
    }
    
    const userAuthorizations = await usersService.getAuthorizations(user);

    const data = {};
    for (const home of collections) {
      const relatedAuths = getAuthForHome(userAuthorizations, home);
      data[home] = await getLastTenConsumptionFrom(home, relatedAuths.fields);
    }

    return { data };
  },
  getResidenceKitchensConsumption: async (user) => {
    if (user.role !== ResidenceOwner) {
      return undefined;
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
      return undefined;
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
      return undefined;
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
