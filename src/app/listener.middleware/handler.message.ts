import clearTable from "./clear.handler";

interface Params {
  payload: any;
  data: any;
  operation: string;
}
export default async function handler({ operation, data = {}, payload }: Params) {
  const table = window.CACHE["message"];
  if (operation.startsWith("reset")) {
    clearTable("message");
    return;
  }
  switch (operation) {
    case "addMessage":
    case "updateMessage":
      {
        const { mid, properties } = payload;
        if (mid != properties?.local_id) {
          // 不要存本地消息
          await table?.setItem(mid + "", data[mid]);
        }
      }
      break;
    case "removeMessage":
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
