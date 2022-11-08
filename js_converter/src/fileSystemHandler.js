const { generateJsonFileFromCsv } = require("convert-csv-to-json");
const Path = require("path");
const FS = require("fs");

function throughDirectory(currentDir, destinationDir) {
  FS.readdirSync(currentDir).forEach((file) => {
    const absolutePath = Path.join(currentDir, file);
    if (FS.statSync(absolutePath).isDirectory()) {
      const absoluteDestinationPath = Path.join(destinationDir, file);
      createDir(absoluteDestinationPath);
      return throughDirectory(absolutePath, absoluteDestinationPath);
    } else {
      if (file.startsWith(".")) {
        return;
      }
      const jsonFileName = file.split(".")[0] + ".json";
      const absoluteDestinationPath = Path.join(destinationDir, jsonFileName);
      console.log(absolutePath);
      console.log(absoluteDestinationPath);

      //TODO: riscrivere prima riga
      convertFile(absolutePath, absoluteDestinationPath);
      return;
    }
  });
}

function convertFile(fileInputName, fileOutputName) {
  generateJsonFileFromCsv(fileInputName, fileOutputName);
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
