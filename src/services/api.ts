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
  return request<API.Ret<API.RefreshToken>>(`${ApiHost}/api/pub/refresh_token`, {
    method: "POST",
    data,
    ...(options || {}),
  });
}
