import BigNumber from "bignumber.js";
export const setJsonItem = (name: string, value: Record<string, any>) => {
  const str = JSON.stringify(value);
  localStorage.setItem(name, str);
};

export const getJsonItem = (name: string) => {
  const str = localStorage.getItem(name);
  if (str) {
    try {
      const value = JSON.parse(str);
      return value;
    } catch (err) {}
  }

  return null;
};

export const formatSat = (value: string | number, dec = 8) => {
  if (!value) return "0";

  const v = BigNumber(value).div(Math.pow(10, dec));
  const arr = v.toString().split(".");
  if (v.toString().indexOf("e") > -1 || (arr[1] && arr[1].length > dec)) {
    return BigNumber(v).toFixed(dec);
  }
  return v.toString();
};
