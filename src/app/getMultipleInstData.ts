// Import the inst function from the inst file
import { inst } from "./inst";
const instagramIds = ["ehsan_heidari242801", "maryam.aghaei6345"];
// Define a function to get data for multiple Instagram IDs
export const getMultipleInstData = async () => {
  const data = [];
  for (const id of instagramIds) {
    const instData = await inst(id);
    data.push(instData);
  }
  return data;
};
