const homeHeaders = [
  {
    is: (filename) => filename.includes("HomeA"),
    csvHeader:
      "Date & Time,use [kW],gen [kW],FurnaceHRV [kW],CellarOutlets [kW],WashingMachine [kW],FridgeRange [kW],DisposalDishwasher [kW],KitchenLights [kW],BedroomOutlets [kW],BedroomLights [kW],MasterOutlets [kW],MasterLights [kW],DuctHeaterHRV [kW]",
    jsonHeader:
      "dateTime,usedKw,generatedKw,furnaceHRVKw,cellarOutletsKw,washingMachineKw,fridgeRangeKw,disposalDishwasherKw,kitchenLightsKw,bedroomOutletsKw,bedroomLightsKw,masterOutletsKw,masterLightsKw,ductHeaterHRVKw",
  },
  {
    is: (filename) => filename.includes("HomeB"),
    csvHeader: "Date & Time,use [kW],gen [kW],Grid [kW],AC [kW],Furnace [kW],Cellar Lights [kW],Washer [kW],First Floor lights [kW],Utility Rm + Basement Bath [kW],Garage outlets [kW],MBed + KBed outlets [kW],Dryer + egauge [kW],Panel GFI (central vac) [kW],Home Office (R) [kW],Dining room (R) [kW],Microwave (R) [kW],Fridge (R) [kW]",
    jsonHeader: "dateTime,usedKw,generatedKw,gridKw,aCKw,furnaceKw,cellarLightsKw,washerKw,firstFloorLightsKw,utilityRmBasementBathKw,garageOutletsKw,MBedKBedOutletsKw,dryerEgaugeKw,panelGFICentralVacKw,homeOfficeRKw,diningRoomRKw,microwaveRKw,fridgeRKw",
  },
  {
    is: (filename) => filename.includes("HomeC"),
    csvHeader: "Date & Time,use [kW],gen [kW],House overall [kW],Dishwasher [kW],Furnace 1 [kW],Furnace 2 [kW],Home office [kW],Fridge [kW],Wine cellar [kW],Garage door [kW],Kitchen 12 [kW],Kitchen 14 [kW],Kitchen 38 [kW],Barn [kW],Well [kW],Microwave [kW],Living room [kW],Solar [kW]",
    jsonHeader: "dateTime,usedKw,generatedKw,houseOverallKw,dishwasherKw,furnace1Kw,furnace2Kw,homeOfficeKw,fridgeKw,wineCellarKw,garageDoorKw,kitchen12Kw,kitchen14Kw,kitchen38Kw,barnKw,wellKw,microwaveKw,livingRoomKw,solarKw",
  },
  {
    is: (filename) => filename.includes("HomeD"),
    csvHeader: "Date & Time,use [kW],gen [kW],FreshAirVentilation [kW],HousePanel [kW],LivingRoomReceptacles [kW],SecondFloorBathroom [kW],WashingMachine [kW],Studies&amp;OutsideLighting [kW],DiningRoomReceptacles [kW],Basement&amp;HallLighting [kW],GuestHouseBathroom [kW],GuestHouseBedroom [kW],WorkshopReceptacleBathHeater [kW],GuestHouseKitchen [kW],GuestHouseKitchen [kW],GroundSourceHeatPump [kW],Photovoltaics [kW],WellPump [kW],Range [kW],SecondFloorBathroom [kW],PanelReceptacles [kW],KitchenReceptacles [kW],Microwave [kW],Refrigerator [kW],NetHousePowerUsage [kW],GarageReceptacles&amp;Lights [kW],GarageReceptacles [kW],ShedReceptacles [kW],ShedLights [kW],PanelReceptacles [kW],GaragePV [kW],GuestHouseLivingRoom [kW],MasterBedroom [kW],HeatCirculatorPumps [kW],DomesticHotWaterReserve [kW],MasterBathroom [kW],KitchenIsland [kW],RadiantHeatReserveTank [kW],BasementReceptacles [kW],Dryer [kW],KitchenLighting [kW],GuestHouseDiningRoomRecept [kW],Porch+VerandaLighting [kW]",
    jsonHeader: "dateTime,usedKw,generatedKw,freshAirVentilationKw,housePanelKw,livingRoomReceptaclesKw,secondFloorBathroomKw,washingMachineKw,studiesOutsideLightingKw,diningRoomReceptaclesKw,basementhallLightingKw,guestHouseBathroomKw,guestHouseBedroomKw,workshopReceptacleBathHeaterKw,guestHouseKitchenKw,guestHouseKitchenKw,groundSourceHeatPumpKw,PhotovoltaicsKw,wellPumpKw,rangeKw,secondFloorBathroomKw,panelReceptaclesKw,kitchenReceptaclesKw,microwaveKw,refrigeratorKw,netHousePowerUsageKw,garageReceptaclesLightsKw,garageReceptaclesKw,shedReceptaclesKw,shedLightsKw,panelReceptaclesKw,garagePVKw,guestHouseLivingRoomKw,masterBedroomKw,heatCirculatorPumpsKw,domesticHotWaterReserveKw,masterBathroomKw,kitchenIslandKw,radiantHeatReserveTankKw,basementReceptaclesKw,dryerKw,kitchenLightingKw,guestHouseDiningRoomReceptKw,porchVerandaLightingKw",
  },
  {
    is: (filename) => filename.includes("HomeE"),
    csvHeader: "Date & Time,Usage [kW],Generation [kW],Kitchen Outlet/Espresso (32) [kW],Hot Water Heater (22) [kW],Dining Room (15) [kW],Fridge+Ent Lights(west) (20) [kW],Clothes Washing Machine (10) [kW],Dishwasher (17) [kW],2nd Fl West Bedroom (21) [kW],Master+NE Bedroom + N Bath (27) [kW],Elec Heat (Bed NE+M) (16+18) [kW],Furnace (29) [kW],Laund+LivingR+Hall Lights (24) [kW]",
    jsonHeader: "dateTime,usedKw,generatedKw,kitchenOutletEspressoKw,hotWaterHeaterKw,diningRoomKw,fridgeEntLightsWestKw,clothesWashingMachineKw,dishwasherKw,secondFlWestBedroomKw,masterNEBedroomNBathKw,elecHeatBedNEKw,furnaceKw,laundLivingRHallLightsKw",
  },
  {
    is: (filename) => filename.includes("HomeF"),
    csvHeader: "Date & Time,Usage [kW],Generation [kW],WaterHeater [kW],Solar [kW],Refrigerator [kW],Microwave [kW],Furnace [kW],WaterHeater3 [kW],WaterHeater2 [kW],WaterHeater1 [kW],Master_Bdrm [kW],Front_Bdrm [kW],Kit_StoveWall [kW],Dishwasher_Disposal [kW],Kit_SinkWall [kW],Family_Rm [kW],Kit_Half-Bath_Foyer [kW],Washing_Machine [kW],Guest_Bdrm_SmkDet [kW],Dryer [kW],Basement [kW],Phase_B [kW],Phase_A [kW]",
    jsonHeader: "dateTime,usedKw,generatedKw,waterHeaterKw,solarKw,refrigeratorKw,microwaveKw,furnaceKw,waterHeater3Kw,waterHeater2Kw,waterHeater1Kw,masterBdrmKw,frontBdrmKw,kitStoveWallKw,dishwasherDisposalKw,kitSinkWallKw,familyRmKw,kitHalfBathFoyerKw,washingMachineKw,guestBdrmSmkDetKw,dryerKw,basementKw,phaseBKw,phaseAKw",
  },
  // TODO: manca effettivamente un tipo, ma non credo che serva più questo progetto
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
