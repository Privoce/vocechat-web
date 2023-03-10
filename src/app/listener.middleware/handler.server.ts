import localforage from "localforage";
import clearTable from "./clear.handler";

interface Params {
  payload: any;
  operation: string;
}
export default async function handler({ operation, payload }: Params) {
  const table = window.CACHE["server"] as typeof localforage;
  if (operation.startsWith("reset")) {
    clearTable("server");
    return;
  }
  switch (operation) {
    case "updateInfo":
      {
        const data = payload;
        const arr = Object.entries(data).map(([_key, _val]) => {
          return { key: _key, value: _val };
        });
        await table.setItems(arr);
      }
      break;
    default:
      break;
  }
}
