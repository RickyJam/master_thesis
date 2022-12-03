import isDev from "./src/enviroment.js";
import importHomeFolders from "./src/file_helper.js";
import { closeConnection, openConnection } from "./src/mongo_loader.js";

const isOpen = await openConnection();
if (isOpen) {
  if (isDev()) {
    await importHomeFolders("../../Datasets/csv/");
  } else {
    await importHomeFolders("dataset/");
  }

  closeConnection();
}
