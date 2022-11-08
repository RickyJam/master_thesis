const converter = require("convert-csv-to-json");
const Path = require("path");
const FS = require("fs");
const { isInvalidDir } = require("./utils");

// ignoring 0 and 1, they are std arguments
const START_PATH_ARG = 2;
const DESTINATION_PATH_ARG = 3;

const startDir = process.argv[START_PATH_ARG];
const destinationDir = process.argv[DESTINATION_PATH_ARG];
if(isInvalidDir(startDir) || isInvalidDir(destinationDir)) {
    console.log("Please provide a directory path as follow:");
    console.log("node converter.js path/to/dataset_dir path/to/destination_dir");
    console.log("Exiting...");
    return;
}

function throughDirectory(startDir) {
//   FS.readdirSync(startDir).forEach((file) => {
//     const Absolute = Path.join(startDir, file);
//     if (FS.statSync(Absolute).isDirectory()) {
//       return ThroughDirectory(Absolute);
//     } else {
//       return files.push(Absolute);
//     }
//   });
}

throughDirectory(startDir);

// let fileInputName = "myInputFile.csv";
// let fileOutputName = "myOutputFile.json";

// converter.generateJsonFileFromCsv(fileInputName, fileOutputName);
