import onMasterDB from "./mongo_access.js";

const k8s_data_host = "datadb-service:27017";

async function onDataDB(query) {
  return await onMasterDB(query, k8s_data_host);
}

export default onDataDB;