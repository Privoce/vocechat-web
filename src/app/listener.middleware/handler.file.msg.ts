import clearTable from "./clear.handler";

export default async function handler({ operation, data = {} }) {
  const table = window.CACHE["messageFile"];
  if (operation.startsWith("reset")) {
    clearTable("messageFile");
    return;
  }
  switch (operation) {
    case "addFileMessage":
    case "removeFileMessage":
      {
        console.log("file message opt", data, operation);
        await table.setItem("list", data);
      }
      break;
    default:
      break;
  }
}
