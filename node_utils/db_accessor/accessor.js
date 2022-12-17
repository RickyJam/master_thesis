import onMasterDB from "./mongo_access.js";
import onDataDB from "./data_access.js";
import onUserDB from "./user_access";

const Accessor = () => ({
  onMasterDB,
  onDataDB,
  onUserDB,
});

export default Accessor;
