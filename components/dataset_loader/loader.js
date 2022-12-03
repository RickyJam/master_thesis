import importHomeFolders from "./src/file_helper.js";
import { closeConnection, openConnection } from "./src/mongo_loader.js";

const isOpen = await openConnection();
if (isOpen) {
  await importHomeFolders("../../Datasets/csv/");
  closeConnection();
}
