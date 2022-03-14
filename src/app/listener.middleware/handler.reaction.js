import clearTable from "./clear.handler";
export default async function handler({ operation, data = {}, payload }) {
  const table = window.CACHE["messageReaction"];
  if (operation.startsWith("reset")) {
    clearTable("messageReaction");
    return;
  }
  switch (operation) {
    // case "fullfillReactionMessage":
    //   {
    //     await Promise.all(
    //       Object.entries(data).map(async ([mid, data]) => {
    //         await table.setItem(mid + "", data);
    //       })
    //     );
    //   }
    //   break;
    case "toggleReactionMessage":
      {
        const { mid } = payload;
        await table.setItem(mid + "", data[mid]);
      }
      break;
    default:
      break;
  }
}
