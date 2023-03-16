import clearTable from "./clear.handler";
interface Params {
  payload: any;
  operation: string;
}
export default async function handler({ operation, payload = {} }: Params) {
  const table = window.CACHE["messageArchive"];
  if (operation.startsWith("reset")) {
    clearTable("messageArchive");
    return;
  }
  switch (operation) {
    case "upsertArchiveMessage":
      {
        const { filePath, data } = payload;
        console.log("archive message indexDB opt", payload);
        if (filePath) {
          await table?.setItem(filePath, data);
        }
      }
      break;
    default:
      break;
  }
}
