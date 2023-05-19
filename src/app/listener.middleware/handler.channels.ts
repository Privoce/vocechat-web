import localforage from "localforage";

import { Channel } from "@/types/channel";
import clearTable from "./clear.handler";

interface Params {
  data: any;
  payload: any;
  operation: string;
}
export default async function handler({ operation, data, payload }: Params) {
  const table = window.CACHE["channels"] as typeof localforage;
  if (operation.startsWith("reset")) {
    clearTable("channels");
    return;
  }
  switch (operation) {
    case "fillChannels":
      {
        const chs = payload as Channel[];
        const arr = chs.map(({ gid, ...rest }) => {
          return { key: gid + "", value: { gid, ...rest } };
        });
        await table.setItems(arr);
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
