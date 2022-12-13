import isDev from "./src/enviroment.js";
import importHomeFolders from "./src/file_helper.js";
import { closeConnection, openConnection } from "./src/mongo_loader.js";
import FS from "fs";
import { exit } from "process";

const basePath = isDev() ? "../../Datasets/csv/" : "/dataset/";

try {
  FS.readdirSync(basePath);
} catch {
  console.log("impossibile trovare la directory: " + basePath);
  exit();
}

const isOpen = await openConnection();
if (isOpen) {
  await importHomeFolders(basePath);
  closeConnection();
}
