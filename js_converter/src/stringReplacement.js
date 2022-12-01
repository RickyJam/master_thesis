const homeHeaders = [
  {
    is: (filename) => filename.includes("HomeA"),
    csvHeader:
      "Date & Time,use [kW],gen [kW],FurnaceHRV [kW],CellarOutlets [kW],WashingMachine [kW],FridgeRange [kW],DisposalDishwasher [kW],KitchenLights [kW],BedroomOutlets [kW],BedroomLights [kW],MasterOutlets [kW],MasterLights [kW],DuctHeaterHRV [kW]",
    jsonHeader:
      "dateTime,usedKw,generateKw,furnaceHRVKw,cellarOutletsKw,washingMachineKw,fridgeRangeKw,disposalDishwasherKw,kitchenLightsKw,bedroomOutletsKw,bedroomLightsKw,masterOutletsKw,masterLightsKw,ductHeaterHRVKw",
  },
  {
    is: (filename) => filename.includes("HomeB"),
    csvHeader: "",
    jsonHeader: "",
  },
  {
    is: (filename) => filename.includes("HomeC"),
    csvHeader: "",
    jsonHeader: "",
  },
  {
    is: (filename) => filename.includes("HomeD"),
    csvHeader: "",
    jsonHeader: "",
  },
  {
    is: (filename) => filename.includes("HomeE"),
    csvHeader: "",
    jsonHeader: "",
  },
  {
    is: (filename) => filename.includes("HomeF"),
    csvHeader: "",
    jsonHeader: "",
  },
];

const getReplacementStrings = (filename) => {
  return ({ csvHeader, jsonHeader } = homeHeaders.find(({ is }) =>
    is(filename)
  ));
};

exports.replaceHeaders = (filename, data) => {
  const { csvHeader, jsonHeader } = getReplacementStrings(filename);
  return data.replace(csvHeader, jsonHeader);
};
