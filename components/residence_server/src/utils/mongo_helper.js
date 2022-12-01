const HOMEA = "homeA";
const HOMEB = "homeB";
const HOMEC = "homeC";
const HOMED = "homeD";
const HOMEE = "homeE";
const HOMEF = "homeF";

export const filterParams = {
  [HOMEA]: {
    kitchen: {
      "KitchenDenLights[kW]": 1,
      "KitchenOutletsEast[kW]": 1,
      "KitchenOutletsSouth[kW]": 1,
      "Refrigerator[kW]": 1,
      "Microwave[kW]": 1,
    },
    laundry: {
      "DishwasherDisposalSinkLight[kW]": 1,
    },
    solar: {},
  },
  [HOMEB]: {
    kitchen: {
      "Microwave[kW]": 1,
      "Fridge[kW]": 1,
    },
    laundry: {
      "Dishwasher[kW]": 1,
    },
    solar: {},
  },
  [HOMEC]: {
    kitchen: {
      "Microwave[kW]": 1,
    },
    laundry: {
      "WasherDrier[kW]": "3.3333e-05",
    },
    solar: {
      "Solar[kW]": "0.004483333",
    },
  },
  [HOMED]: {
    kitchen: {},
    laundry: {},
    solar: {},
  },
  [HOMEE]: {
    kitchen: {
      "Furnace(29)[kW]": 1,
      "KitchenOutlet/Espresso(32)[kW]": 1,
      "Fridge+EntLights(west)(20)[kW]": 1,
    },
    laundry: {
      "ClothesWashingMachine(10)[kW]": 1,
      "Dishwasher(17)[kW]": 1,
      "HotWaterHeater(22)[kW]": 1,
    },
    solar: {},
  },
  [HOMEF]: {
    kitchen: {
      "Refrigerator[kW]": 1,
      "Microwave[kW]": 1,
      "Furnace[kW]": 1,
      "Kit_StoveWall[kW]": 1,
      "Kit_SinkWall[kW]": 1,
    },
    laundry: {
      "WaterHeater[kW]": 1,
      "WaterHeater3[kW]": 1,
      "WaterHeater2[kW]": 1,
      "WaterHeater1[kW]": 1,
      "Dryer[kW]": 1,
      "Dishwasher_Disposal[kW]": 1,
      "Washing_Machine[kW]": 1,
    },
    solar: {
      "Solar[kW]": 1,
    },
  },
};

export default { HOMEA, HOMEB, HOMEC, HOMED, HOMEE, HOMEF };
