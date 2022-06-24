const clearTable = async (table: string) => {
  const t = window.CACHE[table];
  if (!t) return;

  await t.iterate((data, key) => {
    t.removeItem(key);
  });
};

export default clearTable;
