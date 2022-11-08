const converter = require("convert-csv-to-json");
const Path = require("path");
const FS = require("fs");

// ignoring 0 and 1, they are std arguments
const PATH_ARG = 2; 

const startDir = process.argv[PATH_ARG];
if(startDir === undefined || startDir === null || startDir === "") {
    console.log("Please provide a directory path as follow:");
    console.log("node converter.js path/to/dataset_dir");
    console.log("Exiting...");
    return;
}

// let files = [];

// function throughDirectory(startDir) {
//   FS.readdirSync(startDir).forEach((file) => {
//     const Absolute = Path.join(startDir, file);
//     if (FS.statSync(Absolute).isDirectory()) {
//       return ThroughDirectory(Absolute);
//     } else {
//       return files.push(Absolute);
//     }
//   });
// }

// ThroughDirectory(startDir);

// let fileInputName = "myInputFile.csv";
// let fileOutputName = "myOutputFile.json";

// converter.generateJsonFileFromCsv(fileInputName, fileOutputName);
