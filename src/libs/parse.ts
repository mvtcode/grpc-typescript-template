export const parseJson = (obj: string) : any => {
  try {
    if (!obj) return null;
    return JSON.parse(obj);
  } catch (e) {
    return null;
  }
};

export const toInt = (n: any, defaults = 0) : number => {
  const type = typeof n;

  if (type === "number") {
    return Math.floor(n);
  }

  if (type === "string") {
    if (/^\d+$/.test(n)) {
      return parseInt(n);
    }
    return defaults;
  }

  return defaults;
};

export const toNumber = (n: any, defaults = 0) : number => {
  const type = typeof n;

  if (type === "number") {
    return n;
  }

  if (type === "string") {
    if (/^\d+(.\d+)?$/.test(n)) {
      return parseFloat(n);
    }
    return defaults;
  }

  return defaults;
};
