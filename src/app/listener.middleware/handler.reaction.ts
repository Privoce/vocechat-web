import clearTable from "./clear.handler";

interface Params {
  payload: any;
  data: any;
  operation: string;
}
export default async function handler({ operation, data = {}, payload }: Params) {
  const table = window.CACHE["messageReaction"];
  if (operation.startsWith("reset")) {
    clearTable("messageReaction");
    return;
  }
  switch (operation) {
    case "toggleReactionMessage":
      {
        const { mid, rid } = payload;
        await table?.setItem(mid + "", data[mid]);
        await table?.setItem(rid + "", data[rid]);
      }
      break;
    case "removeReactionMessage":
      {
        const mids = Array.isArray(payload) ? payload : [payload];
        await Promise.all(
          mids.map(async (mid) => {
            await table?.removeItem(mid + "");
          })
        );
      }
      break;
    default:
      break;
  }
}
