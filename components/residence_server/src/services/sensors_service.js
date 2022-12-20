import {
  getLastTenConsumptionFrom,
  getKitchenConsumption,
  getLaundryConsumption,
} from "../dao/data_sensors.js";

const lastDate = new Date(2016, 11, 31, 23, 59, 59, 0);

const SensorsService = (usersService) => ({
  getHomeSensors: async (home, user) => {
    const userAuthorizations = await usersService.getAuthorizations(user);
    const relatedAuths = getRelatedAuth(userAuthorizations, home);
    if (!relatedAuths) {
      return undefined;
    }

    const data = await getLastTenConsumptionFrom(home);

    return { ...data };
  },
  getHomeKitchenSensors: async (home, user, toDate = lastDate) => {
    const userAuthorizations = await usersService.getAuthorizations(user);
    const relatedAuths = getRelatedAuth(userAuthorizations, home);
    if (!relatedAuths) {
      return undefined;
    }

    const authFields = mergeAllAuthFields(userAuthorizations);
    // const fromDate = getLastMonthDate(toDate);
    const data = await getKitchenConsumption(home, authFields);

    return { data };
  },
  getHomeLaundrySensors: async (home, user, toDate = lastDate) => {
    const userAuthorizations = await usersService.getAuthorizations(user);
    const relatedAuths = getRelatedAuth(userAuthorizations, home);
    if (!relatedAuths) {
      return undefined;
    }

    const authFields = mergeAllAuthFields(userAuthorizations);
    // const fromDate = getLastMonthDate(toDate);
    const data = await getLaundryConsumption(home, authFields);

    return { data };
  },
});

function mergeAllAuthFields(authorizations) {
  return authorizations.reduce(
    (accumulator, currentValue) => [...accumulator, ...(currentValue.fields)],
    []
  );
}

function getLastMonthDate(startDate) {
  const lastMonthDate = new Date(startDate);
  lastMonthDate.setDate(startDate.getDate() - 30);
  return lastMonthDate;
}

function getRelatedAuth(authorizations, home) {
  return (
    authorizations.find((auth) => {
      return auth.home === home;
    }) || undefined
  );
}

export default SensorsService;
