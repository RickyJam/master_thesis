const HOMEA = "homeA";
const HOMEB = "homeB";
const HOMEC = "homeC";
const HOMED = "homeD";
const HOMEE = "homeE";
const HOMEF = "homeF";

const filterParams = {
  [HOMEA]: {
    kitchen: {
      kitchenOutletsEastKw: 1,
      kitchenOutletsSouthKw: 1,
      refrigeratorKw: 1,
      kitchenDenLightsKw: 1,
      kitchenLightsKw: 1,
      fridgeRangeKw: 1,
      furnaceHRVKw: 1,
      microwaveKw: 1,
    },
    laundry: {
      dishwasherDisposalSinkLightKw: 1,
      disposalDishwasherKw: 1,
      dryerKw: 1,
      washingMachineKw: 1,
    },
    solar: {},
  },
  [HOMEB]: {
    kitchen: {
      furnaceKw: 1,
      microwaveRKw: 1,
      fridgeRKw: 1,
      microwaveKw: 1,
      fridgeKw: 1,
    },
    laundry: {
      washerKw: 1,
      dryerEgaugeKw: 1,
      dishwasherKw: 1,
      tubWhirpoolKw: 1,
    },
    solar: {},
  },
  [HOMEC]: {
    kitchen: {
      kitchenTwelweKw: 1,
      kitchenFourteenKw: 1,
      kitchenThirtyEigthtKw: 1,
      microwaveKw: 1,
      furnaceOneKw: 1,
      furnaceTwoKw: 1,
      fridgeKw: 1,
      wineCellarKw: 1,
    },
    laundry: {
      dishwasherKw: 1,
      washerDrierKw: 1,
    },
    solar: {
      solarKw: 1,
    },
  },
  [HOMED]: {
    kitchen: {
      kitchenLightingKw: 1,
      kitchenReceptaclesKw: 1,
      microwaveKw: 1,
      refrigeratorKw: 1,
      kitchenIslandKw: 1,
    },
    laundry: {
      dryerKw: 1,
      washingMachineKw: 1,
      freshAirVentilationKw: 1,
    },
    solar: {
      photovoltaicsKw: 1,
      housePanelKw: 1,
    },
  },
  [HOMEE]: {
    kitchen: {
      kitchenKw: 1,
      furnaceKw: 1,
      ovenKw: 1,
      fridgeEntLightsKw: 1,
    },
    laundry: {
      hotWaterHeaterKw: 1,
      dishwasherKw: 1,
      dryerKw: 1,
      clothesWashingMachineKw: 1,
      elecHeatKw: 1,
    },
    solar: {},
  },
  [HOMEF]: {
    kitchen: {
      refrigeratorKw: 1,
      microwaveKw: 1,
      furnaceKw: 1,
      kitStoveWallKw: 1,
      kitSinkWallKw: 1,
    },
    laundry: {
      waterHeaterKw: 1,
      waterHeater3Kw: 1,
      waterHeater2Kw: 1,
      waterHeater1Kw: 1,
      dishwasherDisposalKw: 1,
      dryerKw: 1,
      washingMachineKw: 1,
    },
    solar: {
      solarKw: 1,
    },
  },
};

export function getKitchenParams(collection) {
  return filterParams[collection].kitchen;
}

export function getLaundryParams(collection) {
  return filterParams[collection].laundry;
}

export function getSolarParams(collection) {
  return filterParams[collection].solar;
}

const operators = {
  avg: "avg",
  max: "max",
};

const operate = (params, suffix, operation) => {
  const result = {};
  for (const key in params) {
    result[[`${key}${suffix}`]] = { [`$${operation}`]: `$${key}` };
  }
  return result;
};

export const avgAll = (params) => operate(params, "Avg", operators.avg);
export const maxAll = (params) => operate(params, "Max", operators.max);

export const mergeFieldsWithParams = (fields, params) => {
  const keys = Object.keys(params);
  return toSearchParams(keys.filter((value) => fields.includes(value)));
};

export function toSearchParams(keys) {
  const searchParams = {};
  for (const key of keys) {
    searchParams[key] = 1;
  }
  return searchParams;
}

export function withParam(key, params) {
  return {
    ...params,
    [key]: 1,
  };
}

function buildHourFilter(accessFrom, accessTo) {
  if (accessFrom && accessTo) {
    // (min <= hour < max) or (hour === max and minutes === 00)
    // hourFilter['$gte'] = parseInt(accessFrom);
    // hourFilter['$lte'] = parseInt(accessTo);
    // searchFields.push({ $match: { hour: hourFilter } });
    return {
      $match: {
        $or: [
          { hour: { $gte: parseInt(accessFrom), $lt: parseInt(accessTo) } },
          { hour: parseInt(accessTo), minutes: 0 },
          
        ],
      },
    };
  }

  return undefined;
}

export function buildFilterParams(accessFrom, accessTo, fromDate, toDate) {
  const hourFilter = buildHourFilter(accessFrom, accessTo);
  const searchFields = [
    {
      $match: {
        dateTime: {
          $gte: fromDate,
          $lt: toDate,
        },
      },
    },
    {
      $addFields: {
        hour: { $hour: "$dateTime" },
        minutes: { $minute: "$dateTime" },
      },
    },
  ];

  if (hourFilter) {
    searchFields.push(hourFilter);
  }

  searchFields.push({
    $project: {
      hour: 0,
    },
  });

  return searchFields;
}

export default [HOMEA, HOMEB, HOMEC, HOMED, HOMEE, HOMEF];
