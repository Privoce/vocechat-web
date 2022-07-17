import clearTable from "./clear.handler";

export default async function handler({ operation, data, payload }) {
  const table = window.CACHE["channels"];
  if (operation.startsWith("reset")) {
    clearTable("channels");
    return;
  }
  switch (operation) {
    case "fillChannels":
      {
        const chs = payload;
        await Promise.all(
          chs.map(({ gid, ...rest }) => {
            return table?.setItem(gid + "", { gid, ...rest });
          })
        );
      }
      break;
    case "addChannel":
      {
        const { gid } = payload;
        await table?.setItem(gid + "", payload);
      }
      break;
    case "removeChannel":
      {
        const id = payload;
        await table?.removeItem(id + "");
      }
      break;
    case "updateChannel":
      {
        const { id } = payload;
        await table?.setItem(id + "", data.byId[id]);
      }
      break;

    default:
      break;
  }
}
