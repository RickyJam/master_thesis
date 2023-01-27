import {
  getLastTenConsumptionFrom,
  getKitchenConsumption,
  getLaundryConsumption,
} from "../dao/data_sensors.js";
import {
  getAuthAccessTimePermission,
  getAuthForHome,
  mergeAllAuthFields,
} from "../utils/authorizations_helper.js";
import { getUserDates } from "../utils/date_helper.js";

const SensorsService = (usersService) => ({
  getHomeSensors: async (home, user) => {
    const userAuthorizations = await usersService.getAuthorizations(user);
    const relatedAuths = getAuthForHome(userAuthorizations, home);
    if (!relatedAuths) {
      return undefined;
    }

    const { toDate, fromDate } = getUserDates(user, home);
    const { accessFrom, accessTo } = getAuthAccessTimePermission(relatedAuths);

    const authFields = mergeAllAuthFields(userAuthorizations);

    const data = await getLastTenConsumptionFrom(
      home,
      authFields,
      fromDate,
      toDate,
      accessFrom,
      accessTo
    );

    return { data };
  },
  getHomeKitchenSensors: async (home, user) => {
    const userAuthorizations = await usersService.getAuthorizations(user);
    const relatedAuths = getAuthForHome(userAuthorizations, home);
    if (!relatedAuths) {
      return undefined;
    }

    const authFields = mergeAllAuthFields(userAuthorizations);
    const { accessFrom, accessTo } = getAuthAccessTimePermission(relatedAuths);

    const { toDate, fromDate } = getUserDates(user, home);

    const data = await getKitchenConsumption(
      home,
      authFields,
      fromDate,
      toDate,
      accessFrom,
      accessTo
    );

    return { data };
  },
  getHomeLaundrySensors: async (home, user) => {
    const userAuthorizations = await usersService.getAuthorizations(user);
    const relatedAuths = getAuthForHome(userAuthorizations, home);
    if (!relatedAuths) {
      return undefined;
    }

    const authFields = mergeAllAuthFields(userAuthorizations);
    const { accessFrom, accessTo } = getAuthAccessTimePermission(relatedAuths);

    const { toDate, fromDate } = getUserDates(user, home);

    const data = await getLaundryConsumption(
      home,
      authFields,
      fromDate,
      toDate,
      accessFrom,
      accessTo
    );

    return { data };
  },
});

export default SensorsService;
