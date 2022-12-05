import isDev from "./src/enviroment.js";
import importHomeFolders from "./src/file_helper.js";
import { closeConnection, openConnection } from "./src/mongo_loader.js";
import FS from "fs";

const basePath = isDev() ? "../../Datasets/csv/" : "/dataset/";

try {
  const homeDirs = FS.readdirSync(basePath);
  for (const homefolderName of homeDirs) {
    console.log(homefolderName);
  }
} catch {
  console.log("impossibile trovare la directory: " + basePath);
}

const isOpen = await openConnection();
if (isOpen) {
  await importHomeFolders(basePath);
  closeConnection();
}
