import onUserDB from "./user_access.js";

const AUTHORIZATIONS_COLLECTION = "authorizations";
const USERS_COLLECTION = "users";

async function getUser(userId) {
  return await onUserDB((db) =>
    db.collection(USERS_COLLECTION).findOne({ userId: userId })
  );
}

async function getAuthorizationsFor(user) {

}

export { getAuthorizationsFor, getUser };
