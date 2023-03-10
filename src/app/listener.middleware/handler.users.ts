import localforage from "localforage";
import { User } from "../../types/user";
import clearTable from "./clear.handler";

export default async function handler({ operation, data, payload }) {
  const table = window.CACHE["users"] as typeof localforage;
  if (operation.startsWith("reset")) {
    clearTable("users");
    return;
  }
  switch (operation) {
    case "fillUsers":
      {
        const users = payload as User[];
        const arr = users.map(({ uid, ...rest }) => {
          return { key: uid + "", value: rest };
        });
        await table.setItems(arr);
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
                await table?.setItem(uid + "", data.byId[uid]);
                break;
              case "delete":
                await table?.removeItem(uid + "");
                break;

              default:
                break;
            }
          })
        );
      }
      break;
    case "addUser":
      {
        const { uid } = payload;
        await table?.setItem(uid + "", payload);
      }
      break;
    case "removeUser":
      {
        const id = payload;
        await table?.removeItem(id + "");
      }
      break;

    default:
      break;
  }
}
