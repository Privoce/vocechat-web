const clearTable = async (table) => {
  const t = window.CACHE[table];
  if (!t) return;

  await t.iterate((data, key) => {
    t.removeItem(key);
  });
};
export default clearTable;
