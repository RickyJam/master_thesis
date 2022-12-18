import { insertAuthorizations, insertUsers } from "./src/mongo_loader.js";
import authorizations from "./src/authorizations.js";
import users from "./src/users.js";


async function loadAuths() {
  for (const auths of authorizations) {
    console.log("inserting: " + auths[0].relatedRode);
    await insertAuthorizations(auths);
  }
}

async function loadUsers() {
  console.log("inserting users");
  await insertUsers(users);
}

await loadAuths();
await loadUsers();