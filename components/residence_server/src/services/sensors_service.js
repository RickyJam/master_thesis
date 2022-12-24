import {
  getLastTenConsumptionFrom,
  getKitchenConsumption,
  getLaundryConsumption,
} from "../dao/data_sensors.js";
import {
  getAuthForHome,
  mergeAllAuthFields,
} from "../utils/authorizations_helper.js";
import { lastDate, getLastMonthDate } from "../utils/date_helper.js";

const SensorsService = (usersService) => ({
  getHomeSensors: async (home, user) => {
    const userAuthorizations = await usersService.getAuthorizations(user);
    const relatedAuths = getAuthForHome(userAuthorizations, home);
    if (!relatedAuths) {
      return { data: [] };
    }

    const toDate = user.lengthOfStay?.to || lastDate;
    const fromDate = user.lengthOfStay?.from || getLastMonthDate(toDate);

    const data = await getLastTenConsumptionFrom(home, fromDate, toDate);

    return { ...data };
  },
  getHomeKitchenSensors: async (home, user) => {
    const userAuthorizations = await usersService.getAuthorizations(user);
    const relatedAuths = getAuthForHome(userAuthorizations, home);
    if (!relatedAuths) {
      return { data: [] };
    }

    const authFields = mergeAllAuthFields(userAuthorizations);

    const toDate = user.lengthOfStay?.to || lastDate;
    const fromDate = user.lengthOfStay?.from || getLastMonthDate(toDate);

    const data = await getKitchenConsumption(home, authFields, fromDate, toDate);

    return { data };
  },
  getHomeLaundrySensors: async (home, user) => {
    const userAuthorizations = await usersService.getAuthorizations(user);
    const relatedAuths = getAuthForHome(userAuthorizations, home);
    if (!relatedAuths) {
      return { data: [] };
    }

    const authFields = mergeAllAuthFields(userAuthorizations);

    const toDate = user.lengthOfStay?.to || lastDate;
    const fromDate = user.lengthOfStay?.from || getLastMonthDate(toDate);

    const data = await getLaundryConsumption(home, authFields, fromDate, toDate);

    return { data };
  },
});

export default SensorsService;
