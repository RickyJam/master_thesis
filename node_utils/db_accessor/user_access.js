import onMasterDB from "./mongo_access.js";

const k8s_user_host = "users-service:27017";

async function onUserDB(query) {
  return await onMasterDB(query, k8s_user_host);
}

export default onUserDB;