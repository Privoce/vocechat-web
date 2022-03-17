import clearTable from "./clear.handler";
export default async function handler({ operation, data = {}, payload }) {
  const table = window.CACHE["footprint"];
  if (operation.startsWith("reset")) {
    clearTable("footprint");
    return;
  }
  switch (operation) {
    // case "fullfillFootprint":
    //   {
    //     await Promise.all(
    //       Object.entries(data).map(async ([key, value]) => {
    //         await table.setItem(key, value);
    //       })
    //     );
    //   }
    //   break;
    case "updateUsersVersion":
      {
        const usersVersion = payload;
        await table.setItem("usersVersion", usersVersion);
      }
      break;
    case "updateAfterMid":
      {
        const afterMid = payload;
        await table.setItem("afterMid", afterMid);
      }
      break;
    case "updateReadChannels":
      {
        await table.setItem("readChannels", data.readChannels);
      }
      break;
    case "updateReadUsers":
      {
        await table.setItem("readUsers", data.readUsers);
      }
      break;
    default:
      break;
  }
}
