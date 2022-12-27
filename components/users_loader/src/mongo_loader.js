import db_accessor from "db_accessor";

const { onUserDB } = db_accessor;

const AUTHORIZATIONS_COLLECTION = "authorizations";
const USERS_COLLECTION = "users";

export const insertUsers = async (docs) => {
  return await onUserDB((db) =>
    db.collection(USERS_COLLECTION).insertMany(docs)
  );
};

export const insertAuthorizations = async (docs) => {
  return await onUserDB((db) =>
    db.collection(AUTHORIZATIONS_COLLECTION).insertMany(docs)
  );
};
