import clearTable from "./clear.handler";
interface Params {
  data: any;
  payload: any;
  operation: string;
}
export default async function handler({ operation, data = {}, payload }: Params) {
  const table = window.CACHE["messageDM"];
  if (operation.startsWith("reset")) {
    clearTable("messageDM");
    return;
  }
  switch (operation) {
    case "addUserMsg":
    case "removeUserMsg":
      {
        const { id } = payload;
        await table?.setItem(id + "", data.byId[id]);
      }
      break;
    case "removeUserSession":
      {
        const ids = Array.isArray(payload) ? payload : [payload];
        await Promise.all(
          ids.map(async (id) => {
            await table?.removeItem(id + "");
          })
        );
      }
      break;
    default:
      break;
  }
}
