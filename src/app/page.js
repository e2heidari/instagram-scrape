import { inst } from "./inst.js";

const ids = ["maryam.aghaei6345", "ehsan_heidari242801"];
const userData = {};

for (let i = 0; i < ids.length; i++) {
  const id = ids[i];
  userData[id] = await inst(id);
}

console.log(userData);
