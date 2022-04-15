import clearTable from "./clear.handler";
export default async function handler({ operation, payload }) {
  const table = window.CACHE["server"];
  if (operation.startsWith("reset")) {
    clearTable("server");
    return;
  }
  switch (operation) {
    case "updateInfo":
      {
        const data = payload;
        await Promise.all(
          Object.entries(data).map(([_key, _val]) => {
            return table.setItem(_key, _val);
          })
        );
      }
      break;
    default:
      break;
  }
}
