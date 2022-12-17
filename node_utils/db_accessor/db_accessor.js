import onMasterDB from "./src/mongo_access.js";
import onDataDB from "./src/data_access.js";
import onUserDB from "./src/user_access.js";

const db_accessor = {
  onMasterDB,
  onDataDB,
  onUserDB,
};

export default db_accessor;
