export const isObjectEqual = (obj1, obj2) => {
  let o1 = Object.entries(obj1).sort().toString();
  let o2 = Object.entries(obj2).sort().toString();
  return o1 === o2;
};
