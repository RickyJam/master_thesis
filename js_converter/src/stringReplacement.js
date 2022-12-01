const homeAHeader =
  "Date & Time,use [kW],gen [kW],FurnaceHRV [kW],CellarOutlets [kW],WashingMachine [kW],FridgeRange [kW],DisposalDishwasher [kW],KitchenLights [kW],BedroomOutlets [kW],BedroomLights [kW],MasterOutlets [kW],MasterLights [kW],DuctHeaterHRV [kW]";
const homeAHeaderReplacement =
  "dateTime,usedKw,generateKw,furnaceHRVKw,cellarOutletsKw,washingMachineKw,fridgeRangeKw,disposalDishwasherKw,kitchenLightsKw,bedroomOutletsKw,bedroomLightsKw,masterOutletsKw,masterLightsKw,ductHeaterHRVKw";


exports.replaceHeaders = (data) => {
    return data.replace(homeAHeader, homeAHeaderReplacement);
} 