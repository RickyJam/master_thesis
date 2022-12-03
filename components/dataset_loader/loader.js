import importHomeFolders from "./src/file_helper.js";
import { closeConnection, openConnection } from "./src/mongo_loader.js";

const isOpen = await openConnection();
if (isOpen) {
  importHomeFolders("../../Datasets/csv/");
  closeConnection(); // potrebbero esserci problemi di chiusura anticipata per via delle funzion async... vedere
}
