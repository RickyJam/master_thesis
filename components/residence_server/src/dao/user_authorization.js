import db_accessor from "db_accessor";

const { onUserDB } = db_accessor;

const AUTHORIZATIONS_COLLECTION = "authorizations";
const USERS_COLLECTION = "users";

async function getUser(userId) {
  return await onUserDB((db) =>
    db.collection(USERS_COLLECTION).findOne({ userId: userId })
  );
}

async function getAuthorizationsFor(user) {
  return await onUserDB((db) =>
    db
      .collection(AUTHORIZATIONS_COLLECTION)
      .find(getAuthorizationsFilters(user))
      .toArray()
  );
}

function getAuthorizationsFilters(user) {
  const filters = {
    relatedRole: user.role,
  };
  if (user.home != "all") {
    filters.home = user.home;
  }
  return filters;
}

export { getAuthorizationsFor, getUser };
