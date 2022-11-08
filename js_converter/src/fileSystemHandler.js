const { generateJsonFileFromCsv } = require("convert-csv-to-json");
const Path = require("path");
const FS = require("fs");

function throughDirectory(currentDir, destinationDir) {
  FS.readdirSync(currentDir).forEach((file) => {
    const absolutePath = Path.join(currentDir, file);
    if (FS.statSync(absolutePath).isDirectory()) {
      const absoluteDestinationPath = Path.join(destinationDir, file);
      createDir(absoluteDestinationPath);
      throughDirectory(absolutePath, absoluteDestinationPath);
    } else {
      convertFile(absolutePath);
    }
  });
}

function convertFile(fileInputName) {
  if (file.startsWith(".")) {
    return;
  }
  const jsonFileName = file.split(".")[0] + ".json";
  const fileOutputName = Path.join(destinationDir, jsonFileName);

  //TODO: riscrivere prima riga

  generateJsonFileFromCsv(fileInputName, fileOutputName);
  return;

}

function createDir(dirPath) {
  if(!FS.existsSync(dirPath)) {
    FS.mkdirSync(dirPath);
  }
}

exports.convertAllFiles = (startDir, destinationDir) => {
  createDir(destinationDir);
  throughDirectory(startDir, destinationDir);
};
