declare namespace API {
  type Nonce = {
    nonce: string;
    template: string;
  };

  type ModelItem = {
    id: number;
    name: string;
    description: string;
    uploader_id: number;
    uploader_address: string;
    uploader_nickname: string;
    uploader_avatar: string;
    tags: string[];
    tags_show: null;
    type: number;
    price: number;
    cover: string;
    click: number;
    like: number;
    download: number;
    file_path: string;
    create_at: string;
    update_at: string;
    is_like: number;
    is_download: number;
  };
  type LoginRet = {
    id: number;
    nickname: string;
    email: string;
    jwt_token: string;
    refresh_token: string;
  };

  type UserInfo = {
    id: number;
    nickname: string;
    avatar: string;
    email: string;
    address: string;
    public_key: string;
    status: number;
  };

  type RefreshToken = {
    jwt_token: string;
  };
  interface Ret<T> {
    code: number;
    msg: string;
    data: T;
  }

  interface ListRet<T> {
    code: number;
    message: string;
    data: {
      list: T[];
      page: number;
      page_size: number;
      page_count: number;
      total: number;
    };
  }

  type OrderPreRes = {
    id: number;
    uid: number;
    model_id: number;
    status: number;
    amount: string;
    code_hash: string;
    genesis: string;
    address: string;
    create_at: string;
  };
  type OrderCommitReq = {
    order_id: number;
    payment_proof: {
      proof: {
        inputProof: {
          index: number;
          preTxHex: string;
        };
        outputIndex: number;
      };
      routeCheckTxHex: string;
      txHex: string;
    };
  };
  type Tag = {
    id: 0;
    name: "string";
    description: "string";
  };
}
