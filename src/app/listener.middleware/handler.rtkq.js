// import clearTable from "./clear.handler";
import { updateOnline } from "../slices/ui";
export default async function handler({ dispatch, operation }) {
  switch (operation) {
    case "offline":
      {
        dispatch(updateOnline(false));
      }
      break;
    case "online":
      {
        dispatch(updateOnline(true));
      }
      break;
    default:
      break;
  }
}
