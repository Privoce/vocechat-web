import clearTable from "./clear.handler";
export default async function handler({ operation, data = {}, payload }) {
  const table = window.CACHE["message"];
  if (operation.startsWith("reset")) {
    clearTable("message");
    return;
  }
  switch (operation) {
    // case "fullfillChannelMsgs":
    //   {
    //     await Promise.all(
    //       Object.entries(data).map(async ([mid, obj]) => {
    //         await table.setItem(mid + "", obj);
    //       })
    //     );
    //   }
    //   break;
    case "addMessage":
    case "updateMessage":
      {
        const { mid } = payload;
        await table.setItem(mid + "", data[mid]);
      }
      break;
    case "removeMessage":
      {
        const mid = payload;
        await table.removeItem(mid + "");
      }
      break;
    case "readMessage":
      {
        const mids = Array.isArray(payload) ? payload : [payload];
        await Promise.all(
          mids.map(async (mid) => {
            await table.setItem(mid + "", data[mid]);
          })
        );
      }
      break;
    default:
      break;
  }
}
