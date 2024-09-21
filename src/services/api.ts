import { BITMODEL_USER_KEY } from "@/config";
import { getJsonItem } from "@/utils/utils";
import { request } from "umi";

const ApiHost = "https://api-dev.bitmodel.ai";

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
  return request<API.Ret<API.LoginRet>>(`${ApiHost}/api/pub/login`, {
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

export async function getUserInfo(options?: { [key: string]: any }) {
  return request<API.Ret<API.UserInfo>>(`${ApiHost}/api/user/curr`, {
    method: "GET",
    ...(options || {
      headers: {
        Authorization: `Bearer ${getJsonItem(BITMODEL_USER_KEY).jwt_token}`,
      },
    }),
  });
}

export async function getModelList(
  params: {
    page: number;
    page_size: number;
    tag?: string;
    uploader_id?: string;
    name?: string;
  },
  options?: { [key: string]: any }
) {
  return request<API.ListRet<API.ModelItem>>(`${ApiHost}/api/model/list`, {
    method: "GET",
    params,
    ...(options || {}),
  });
}

export async function getTagList(options?: { [key: string]: any }) {
  return request<API.ListRet<API.Tag>>(`${ApiHost}/api/pub/tag/list`, {
    method: "GET",
    ...(options || {}),
  });
}

export async function checkLikeAndDownload(
  params: {
    model_ids: string;
  },
  options?: { [key: string]: any }
) {
  return request<
    API.ListRet<{
      model_id: number;
      is_like: number;
      is_download: number;
    }>
  >(`${ApiHost}/api/model/is_like_download`, {
    method: "GET",
    params,
    ...(options || {
      headers: {
        Authorization: `Bearer ${getJsonItem(BITMODEL_USER_KEY).jwt_token}`,
      },
    }),
  });
}

export async function createModel(
  data: {
    url: string;
    percent: number;
    name: string;
    description: string;
    tags: string[];
    cover: string;
    file_path: string;
    price: number;
    type: number;
    depends: { id: number; percent: number }[];
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

export async function createModelDepend(
  data: {
    url: string;

    name: string;
  },
  options?: { [key: string]: any }
) {
  return request<API.Ret<{ id: number }>>(
    `${ApiHost}/api/model/depend/create`,
    {
      method: "POST",
      data,
      ...(options || {
        headers: {
          Authorization: `Bearer ${getJsonItem(BITMODEL_USER_KEY).jwt_token}`,
        },
      }),
    }
  );
}

export async function s3STSForImage(options?: { [key: string]: any }) {
  return request<
    API.Ret<{
      sts: {
        access_key_id: "string";
        access_secret: "string";
        security_token: "string";
        expire_time: 0;
      };
      prefix_path: "string";
      session_name: "string";
      bucket_name: "string";
    }>
  >(`${ApiHost}/api/file/img/token`, {
    method: "GET",
    ...(options || {
      headers: {
        Authorization: `Bearer ${getJsonItem(BITMODEL_USER_KEY).jwt_token}`,
      },
    }),
  });
}

export async function s3STSForModel(options?: { [key: string]: any }) {
  return request<
    API.Ret<{
      sts: {
        access_key_id: "string";
        access_secret: "string";
        security_token: "string";
        expire_time: 0;
      };
      prefix_path: "string";
      session_name: "string";
      bucket_name: "string";
    }>
  >(`${ApiHost}/api/file/model/token`, {
    method: "GET",
    ...(options || {
      headers: {
        Authorization: `Bearer ${getJsonItem(BITMODEL_USER_KEY).jwt_token}`,
      },
    }),
  });
}

export async function s3STSForModelRefresh(
  params: {
    prefix_path: string;
  },
  options?: { [key: string]: any }
) {
  return request<
    API.Ret<{
      sts: {
        access_key_id: "string";
        access_secret: "string";
        security_token: "string";
        expire_time: 0;
      };
      prefix_path: "string";
      session_name: "string";
      bucket_name: "string";
    }>
  >(`${ApiHost}/api/file/model/refresh/token`, {
    method: "GET",
    params,
    ...(options || {
      headers: {
        Authorization: `Bearer ${getJsonItem(BITMODEL_USER_KEY).jwt_token}`,
      },
    }),
  });
}

export async function downloadToken(
  id: number,
  options?: { [key: string]: any }
) {
  return request<
    API.Ret<{
      sts: {
        access_key_id: "string";
        access_secret: "string";
        security_token: "string";
        expire_time: 0;
      };
      prefix_path: "string";
      session_name: "string";
      bucket_name: "string";
    }>
  >(`${ApiHost}/api/model/download`, {
    method: "POST",
    data: { id },
    ...(options || {
      headers: {
        Authorization: `Bearer ${getJsonItem(BITMODEL_USER_KEY).jwt_token}`,
      },
    }),
  });
}

export async function createTag(
  data: {
    name: string;
    description: string;
  },
  options?: { [key: string]: any }
) {
  return request<API.Ret<API.RefreshToken>>(`${ApiHost}/api/tag/create`, {
    method: "POST",
    data,
    ...(options || {}),
  });
}
export async function likeModel(
  data: {
    id: number;
  },
  options?: { [key: string]: any }
) {
  return request<API.Ret<API.RefreshToken>>(`${ApiHost}/api/model/like`, {
    method: "POST",
    data,
    ...(options || {
      headers: {
        Authorization: `Bearer ${getJsonItem(BITMODEL_USER_KEY).jwt_token}`,
      },
    }),
  });
}
export async function cancleLikeModel(
  data: {
    id: number;
  },
  options?: { [key: string]: any }
) {
  return request<API.Ret<API.RefreshToken>>(
    `${ApiHost}/api/model/cancel/like`,
    {
      method: "POST",
      data,
      ...(options || {
        headers: {
          Authorization: `Bearer ${getJsonItem(BITMODEL_USER_KEY).jwt_token}`,
        },
      }),
    }
  );
}

export async function createOrder(
  data: {
    model_id: number;
  },
  options?: { [key: string]: any }
) {
  return request<API.Ret<API.OrderPreRes>>(`${ApiHost}/api/order/create`, {
    method: "POST",
    data,
    ...(options || {
      headers: {
        Authorization: `Bearer ${getJsonItem(BITMODEL_USER_KEY).jwt_token}`,
      },
    }),
  });
}

export async function orderCommit(
  data: API.OrderCommitReq,
  options?: { [key: string]: any }
) {
  return request<API.Ret<API.OrderPreRes>>(
    `${ApiHost}/api/order/submit_payment_proof`,
    {
      method: "POST",
      data,
      ...(options || {
        headers: {
          Authorization: `Bearer ${getJsonItem(BITMODEL_USER_KEY).jwt_token}`,
        },
      }),
    }
  );
}

export async function editProfile(
  data: {
    nickname: string;
    avatar: string;
    email: string;
  },
  options?: { [key: string]: any }
) {
  return request<API.Ret<{ id: number }>>(`${ApiHost}/api/user/edit`, {
    method: "POST",
    data,
    ...(options || {
      headers: {
        Authorization: `Bearer ${getJsonItem(BITMODEL_USER_KEY).jwt_token}`,
      },
    }),
  });
}

export async function getIncomeList(
  params: { page: number; page_size: number },
  options?: { [key: string]: any }
) {
  return request<API.ListRet<API.IncomeItem>>(`${ApiHost}/api/finance/income/list`, {
    method: "GET",
    params,
    ...(options || {
      headers: {
        Authorization: `Bearer ${getJsonItem(BITMODEL_USER_KEY).jwt_token}`,
      },
    }),
  });
}

export async function getPayList(
  params: { page: number; page_size: number },
  options?: { [key: string]: any }
) {
  return request<API.ListRet<API.PayItem>>(`${ApiHost}/api/finance/pay/list`, {
    method: "GET",
    params,
    ...(options || {
      headers: {
        Authorization: `Bearer ${getJsonItem(BITMODEL_USER_KEY).jwt_token}`,
      },
    }),
  });
}
