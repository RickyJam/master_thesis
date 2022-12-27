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

// used for test
async function getAllAuthorizations() {
  return await onUserDB((db) =>
    db.collection(AUTHORIZATIONS_COLLECTION).find().toArray()
  );
}

// used for test
async function getAllUsers() {
  return await onUserDB((db) =>
    db.collection(USERS_COLLECTION).find().toArray()
  );
}

function getAuthorizationsFilters(user) {
  const { home, role } = user;
  const filters = {
    $and: [
      {
        relatedRole: { $eq: role },
      },
      {
        home: { $in: home },
      },
    ],
  };
  return filters;
}

export { getAuthorizationsFor, getUser, getAllAuthorizations, getAllUsers };
