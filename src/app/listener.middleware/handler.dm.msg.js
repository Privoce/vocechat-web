import clearTable from "./clear.handler";
export default async function handler({ operation, data = {}, payload }) {
  const table = window.CACHE["messageDM"];
  if (operation.startsWith("reset")) {
    clearTable("messageDM");
    return;
  }
  switch (operation) {
    // case "fullfillUserMsgs":
    //   {
    //     await Promise.all(
    //       Object.entries(data).map(async ([uid, arr]) => {
    //         await table.setItem(uid + "", arr);
    //       })
    //     );
    //   }
    //   break;
    case "addUserMsg":
    case "removeUserMsg":
      {
        const { id } = payload;
        await table.setItem(id + "", data.byId[id]);
      }
      break;
    default:
      break;
  }
}
