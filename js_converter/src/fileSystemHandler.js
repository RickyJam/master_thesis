const converter = require("convert-csv-to-json");
const Path = require("path");
const FS = require("fs");

function throughDirectory(currentDir, destinationDir) {
  FS.readdirSync(currentDir).forEach((file) => {
    const absolutePath = Path.join(currentDir, file);
    const absoluteDestinationPath = Path.join(destinationDir, file);
    if (FS.statSync(absolutePath).isDirectory()) {
        return throughDirectory(absolutePath, absoluteDestinationPath);
    } else {
      if(file.startsWith(".")) {
        console.log(`Unhandled file ${file}`);
        return;
      }
      console.log(absolutePath);
      console.log(absoluteDestinationPath);
      return;
      //TODO: riscrivere prima riga
      //TODO: gestire conversione
    }
  });
}

function convertFile(fileInputName, fileOutputName) {
  converter.generateJsonFileFromCsv(fileInputName, fileOutputName);
}

exports.convertAllFiles = (startDir, destinationDir) =>
  throughDirectory(startDir, destinationDir);
