export const sortArray = (arr: [], field: string, order: boolean) => {
  if (!Array.isArray(arr)) return null;
  arr.sort((a, b) => {
    let name1: any = a[field];
    let name2: any = b[field];
    if (typeof name1 === "string" && typeof name2 === "string") {
      name1 = name1.toLowerCase();
      name2 = name2.toLowerCase();
    } else if (
      typeof name1 === "object" ||
      typeof name2 === "object" ||
      typeof name1 === "undefined" ||
      typeof name2 === "undefined"
    ) {
      return 0;
    }
    let val = 0;
    if (name1 < name2) val = -1;
    if (name1 > name2) val = 1;
    return order || order === undefined ? val : val * -1;
  });
  return arr;
};
