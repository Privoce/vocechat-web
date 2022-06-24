import { updateOnline } from "../slices/ui";
import { AppDispatch } from "../store";

interface Params {
  dispatch: AppDispatch;
  operation: string;
}

export default async function handler({ dispatch, operation }: Params) {
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
