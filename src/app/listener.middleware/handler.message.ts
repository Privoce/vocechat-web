import clearTable from "./clear.handler";

export default async function handler({ operation, data = {}, payload }) {
  const table = window.CACHE["message"];
  if (operation.startsWith("reset")) {
    clearTable("message");
    return;
  }
  switch (operation) {
    case "addMessage":
    case "updateMessage":
      {
        const { mid } = payload;
        await table?.setItem(mid + "", data[mid]);
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
