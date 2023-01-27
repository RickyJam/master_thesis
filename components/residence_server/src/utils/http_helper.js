import collections from "./mongo_helper.js";

export function handleData(res, data) {
  if (data) {
    res.send(data);
  } else {
    res.status(401).send("Unauthorized");
  }
}

export function validateHomeParam(homeParam) {
  return collections.includes(homeParam);
}
