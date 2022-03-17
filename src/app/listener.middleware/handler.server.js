import clearTable from "./clear.handler";
export default async function handler({ operation, payload }) {
  const table = window.CACHE["server"];
  if (operation.startsWith("reset")) {
    clearTable("server");
    return;
  }
  switch (operation) {
    case "updateInviteLink":
      {
        const data = payload;
        await table.setItem("inviteLink", data);
      }
      break;
    default:
      break;
  }
}
