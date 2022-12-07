const HOMEA = "homeA";
const HOMEB = "homeB";
const HOMEC = "homeC";
const HOMED = "homeD";
const HOMEE = "homeE";
const HOMEF = "homeF";

export const filterParams = {
  [HOMEA]: {
    kitchen: {
      dateTime: 1,
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
      dateTime: 1,
      dishwasherDisposalSinkLightKw: 1,
      disposalDishwasherKw: 1,
      dryerKw: 1,
      washingMachineKw: 1,
    },
    solar: {},
  },
  [HOMEB]: {
    kitchen: {
      dateTime: 1,
      furnaceKw: 1,
      microwaveRKw: 1,
      fridgeRKw: 1,
      microwaveKw: 1,
      fridgeKw: 1,
    },
    laundry: {
      dateTime: 1,
      washerKw: 1,
      dryerEgaugeKw: 1,
      dishwasherKw: 1,
      tubWhirpoolKw: 1,
    },
    solar: {},
  },
  [HOMEC]: {
    kitchen: {
      dateTime: 1,
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
      dateTime: 1,
      dishwasherKw: 1,
      washerDrierKw: 1,
    },
    solar: {
      solarKw: 1,
    },
  },
  [HOMED]: {
    kitchen: {
      dateTime: 1,
      kitchenLightingKw: 1,
      kitchenReceptaclesKw: 1,
      microwaveKw: 1,
      refrigeratorKw: 1,
      kitchenIslandKw: 1,
    },
    laundry: {
      dateTime: 1,
      dryerKw: 1,
      washingMachineKw: 1,
      freshAirVentilationKw: 1,
    },
    solar: {
      dateTime: 1,
      photovoltaicsKw: 1,
      housePanelKw: 1,
    },
  },
  [HOMEE]: {
    kitchen: {
      dateTime: 1,
      kitchenKw: 1,
      furnaceKw: 1,
      ovenKw: 1,
      fridgeEntLightsKw: 1,
    },
    laundry: {
      dateTime: 1,
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
      dateTime: 1,
      refrigeratorKw: 1,
      microwaveKw: 1, 
      furnaceKw: 1,
      kitStoveWallKw: 1,
      kitSinkWallKw: 1,
    },
    laundry: {
      dateTime: 1,
      waterHeaterKw: 1,
      waterHeater3Kw: 1,
      waterHeater2Kw: 1,
      waterHeater1Kw: 1,
      dishwasherDisposalKw: 1,
      dryerKw: 1,
      washingMachineKw: 1,
    },
    solar: {
      dateTime: 1,
      solarKw: 1,
    },
  },
};

export default { HOMEA, HOMEB, HOMEC, HOMED, HOMEE, HOMEF };
