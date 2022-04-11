import clearTable from "./clear.handler";
export default async function handler({ operation, data = {}, payload }) {
  const table = window.CACHE["footprint"];
  if (operation.startsWith("reset")) {
    clearTable("footprint");
    return;
  }
  switch (operation) {
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
    case "updateMute":
      {
        await table.setItem("muteUsers", data.muteUsers || {});
        await table.setItem("muteChannels", data.muteChannels || {});
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
