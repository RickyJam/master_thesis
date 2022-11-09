const converter = require("convert-csv-to-json");
const Path = require("path");
const FS = require("fs");

const stringToBeReplaced =
  "Date&Time,use[kW],gen[kW],FurnaceHRV[kW],CellarOutlets[kW],WashingMachine[kW],FridgeRange[kW],DisposalDishwasher[kW],KitchenLights[kW],BedroomOutlets[kW],BedroomLights[kW],MasterOutlets[kW],MasterLights[kW],DuctHeaterHRV[kW]";
const replacementString =
  "dateTime,usedKw,generateKw,furnaceHRVKw,cellarOutletsKw,washingMachineKw,fridgeRangeKw,disposalDishwasherKw,kitchenLightsKw,bedroomOutletsKw,bedroomLightsKw,masterOutletsKw,masterLightsKw,ductHeaterHRVKw";

function throughDirectory(currentDir, destinationDir) {
  FS.readdirSync(currentDir).forEach((file) => {
    const absolutePath = Path.join(currentDir, file);
    if (FS.statSync(absolutePath).isDirectory()) {
      const absoluteDestinationPath = Path.join(destinationDir, file);
      createDir(absoluteDestinationPath);
      throughDirectory(absolutePath, absoluteDestinationPath);
    } else {
      convertFile(absolutePath, file, destinationDir);
    }
  });
}

function replaceHeaderLine(file) {
  const data = FS.readFileSync(file, { encoding: "utf8", flag: "r" });
  const result = data.replace(stringToBeReplaced, replacementString);
  FS.writeFileSync(file, result, { encoding: "utf8" });
}

function convertFile(fileInputName, file, destinationDir) {
  if (file.startsWith(".")) {
    return;
  }

  const jsonFileName = file.split(".")[0] + ".json";
  const fileOutputName = Path.join(destinationDir, jsonFileName);

  replaceHeaderLine(fileInputName);

  converter.fieldDelimiter(",");
  converter.generateJsonFileFromCsv(fileInputName, fileOutputName);
  return;
}

function createDir(dirPath) {
  if (!FS.existsSync(dirPath)) {
    FS.mkdirSync(dirPath);
  }
}

exports.convertAllFiles = (startDir, destinationDir) => {
  createDir(destinationDir);
  throughDirectory(startDir, destinationDir);
};
