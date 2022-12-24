import {
  getLastTenConsumptionFrom,
  getKitchenConsumption,
  getLaundryConsumption,
} from "../dao/data_sensors.js";
import {
  getAuthForHome,
  mergeAllAuthFields,
} from "../utils/authorizations_helper.js";
import { getUserDates } from "../utils/date_helper.js";

const EMPTY_DATA = { data: {} };

const SensorsService = (usersService) => ({
  getHomeSensors: async (home, user) => {
    const userAuthorizations = await usersService.getAuthorizations(user);
    const relatedAuths = getAuthForHome(userAuthorizations, home);
    if (!relatedAuths) {
      return EMPTY_DATA;
    }
    const { toDate, fromDate } = getUserDates(user);

    const data = await getLastTenConsumptionFrom(home, fromDate, toDate);

    return { ...data };
  },
  getHomeKitchenSensors: async (home, user) => {
    const userAuthorizations = await usersService.getAuthorizations(user);
    const relatedAuths = getAuthForHome(userAuthorizations, home);
    if (!relatedAuths) {
      return EMPTY_DATA;
    }

    const authFields = mergeAllAuthFields(userAuthorizations);

    const { toDate, fromDate } = getUserDates(user);

    const data = await getKitchenConsumption(
      home,
      authFields,
      fromDate,
      toDate
    );

    return { data };
  },
  getHomeLaundrySensors: async (home, user) => {
    const userAuthorizations = await usersService.getAuthorizations(user);
    const relatedAuths = getAuthForHome(userAuthorizations, home);
    if (!relatedAuths) {
      return EMPTY_DATA;
    }

    const authFields = mergeAllAuthFields(userAuthorizations);

    const { toDate, fromDate } = getUserDates(user);

    const data = await getLaundryConsumption(
      home,
      authFields,
      fromDate,
      toDate
    );

    return { data };
  },
});

export default SensorsService;
