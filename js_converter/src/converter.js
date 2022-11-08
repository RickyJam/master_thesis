const { convertAllFiles } = require("./fileSystemHandler");
const { isInvalidDir } = require("./utils");

// ignoring 0 and 1, they are std arguments
const START_PATH_ARG = 2;
const DESTINATION_PATH_ARG = 3;

const startDir = process.argv[START_PATH_ARG];
const destinationDir = process.argv[DESTINATION_PATH_ARG];
if (isInvalidDir(startDir) || isInvalidDir(destinationDir)) {
  console.log("Please provide a directory path as follow:");
  console.log("node converter.js path/to/dataset_dir path/to/destination_dir");
  console.log("Exiting...");
  return;
}

convertAllFiles(startDir, destinationDir);