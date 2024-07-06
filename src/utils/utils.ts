import BigNumber from "bignumber.js";
import { request } from "umi";
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

export function isMobile() {
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ];

  return toMatch.some((toMatchItem) => {
    return navigator.userAgent.match(toMatchItem);
  });
}

const HF_BASE_URL = "https://huggingface.co/";
const HF_MODELS_API = "https://huggingface.co/api/models";
export const checkHfUrl = async (hfUrl: string) => {
  if (!hfUrl.startsWith(HF_BASE_URL)) {
    return {
      isPass: false,
      realUrl: "",
    };
  } else {
    const search = hfUrl.replace(HF_BASE_URL, "");
    const apiResp = await request(HF_MODELS_API, {
      method: "GET",
      params: {
        search: search,
      },
    });
    const respData = apiResp || [];
    console.log("respData", respData);
    if (respData.length === 0) {
      return {
        isPass: false,
        realUrl: "",
        name:''
      };
    }
    const firstModel = respData[0];
    console.log("search", search);
    console.log("apiResp", firstModel);
    if (firstModel.id === search) {
      return {
        isPass: true,
        realUrl: `${HF_BASE_URL}${firstModel.id}`,
        name: firstModel.modelId,
      };
    } else {
      return {
        isPass: false,
        realUrl: "",
      };
    }
  }
};
