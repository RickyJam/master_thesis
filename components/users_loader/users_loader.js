import { insertAuthorizations, insertUsers } from "./src/mongo_loader.js";
import authorizations from "./src/authorizations.js";


async function loadAuths() {
  for (const auths of authorizations) {
    console.log("inserting: " + auths[0].relatedRode);
    await insertAuthorizations(auths);
  }
}

// async function loadUsers() {
//   await insertUsers(auths);
// }

await loadAuths();