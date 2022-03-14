import clearTable from "./clear.handler";
export default async function handler({ operation, data = {}, payload }) {
  const table = window.CACHE["messageChannel"];
  if (operation.startsWith("reset")) {
    clearTable("messageChannel");
    return;
  }
  switch (operation) {
    // case "fullfillChannelMsgs":
    //   {
    //     await Promise.all(
    //       Object.entries(data).map(async ([cid, arr]) => {
    //         await table.setItem(cid + "", arr);
    //       })
    //     );
    //   }
    //   break;
    case "addChannelMsg":
    case "removeChannelMsg":
      {
        const { id } = payload;

        await table.setItem(id + "", data[id]);
      }
      break;
    default:
      break;
  }
}
