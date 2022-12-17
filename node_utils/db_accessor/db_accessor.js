import onMasterDB from "./src/mongo_access.js";
import onDataDB from "./src/data_access.js";
import onUserDB from "./src/user_access.js";

const Accessor = () => ({
  onMasterDB,
  onDataDB,
  onUserDB,
});

export default Accessor;
