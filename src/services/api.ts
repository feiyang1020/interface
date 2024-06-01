import { BITMODEL_USER_KEY } from "@/config";
import { getJsonItem } from "@/utils/utils";
import { request } from "umi";

const ApiHost = "http://18.162.167.14";

export async function getNonce(
  params: {
    public_key: string;
    address: string;
  },
  options?: { [key: string]: any }
) {
  return request<API.Ret<API.Nonce>>(`${ApiHost}/api/pub/nonce`, {
    method: "GET",
    params,
    ...(options || {}),
  });
}

export async function login(
  data: {
    public_key: string;
    address: string;
    sign: string;
  },
  options?: { [key: string]: any }
) {
  return request<API.Ret<API.UserInfo>>(`${ApiHost}/api/pub/login`, {
    method: "POST",
    data,
    ...(options || {}),
  });
}

export async function refreshToken(
  data: {
    refresh_token: string;
  },
  options?: { [key: string]: any }
) {
  return request<API.Ret<API.RefreshToken>>(
    `${ApiHost}/api/pub/refresh_token`,
    {
      method: "POST",
      data,
      ...(options || {}),
    }
  );
}

export async function getModelList(
  params: {
    page: number;
    page_size: number;
    tag?: string;
    author_id?: string;
  },
  options?: { [key: string]: any }
) {
  return request<API.ListRet<API.ModelItem>>(`${ApiHost}/api/model/list`, {
    method: "GET",
    params,
    ...(options || {}),
  });
}

export async function createModel(
  data: {
    name: string;
    description: string;
    tags: string[];
    cover: string;
    file_path: string;
  },
  options?: { [key: string]: any }
) {
  return request<API.Ret<{ id: number }>>(`${ApiHost}/api/model/create`, {
    method: "POST",
    data,
    ...(options || {
      headers: {
        Authorization: `Bearer ${getJsonItem(BITMODEL_USER_KEY).jwt_token}`,
      },
    }),
  });
}
