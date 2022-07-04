import clearTable from "./clear.handler";

export default async function handler({ operation, data, payload }) {
  const table = window.CACHE["users"];
  if (operation.startsWith("reset")) {
    clearTable("users");
    return;
  }
  switch (operation) {
    case "fullfillContacts":
      {
        const users = payload;
        await Promise.all(
          users.map(({ uid, ...rest }) => {
            return table.setItem(uid + "", { uid, ...rest });
          })
        );
      }
      break;
    case "updateUsersByLogs":
      {
        const changeLogs = payload;
        await Promise.all(
          changeLogs.map(async ({ action, uid }) => {
            switch (action) {
              case "update":
              case "create":
                await table.setItem(uid + "", data.byId[uid]);
                break;
              case "delete":
                await table.removeItem(uid + "");
                break;

              default:
                break;
            }
          })
        );
      }
      break;
    case "addContact":
      {
        const { uid } = payload;
        await table.setItem(uid + "", payload);
      }
      break;
    case "removeContact":
      {
        const id = payload;
        await table.removeItem(id + "");
      }
      break;

    default:
      break;
  }
}
