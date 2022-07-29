import clearTable from "./clear.handler";

interface Params {
  payload: any;
  operation: string;
}
export default async function handler({ operation, payload }: Params) {
  const table = window.CACHE["server"];
  if (operation.startsWith("reset")) {
    clearTable("server");
    return;
  }
  switch (operation) {
    case "updateInfo":
      {
        const data = payload;
        await Promise.all(
          Object.entries(data).map(([_key, _val]) => {
            return table?.setItem(_key, _val);
          })
        );
      }
      break;
    default:
      break;
  }
}
