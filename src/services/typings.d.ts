declare namespace API {
  type Nonce = {
    nonce: string;
    template: string;
  };

  type ModelItem = {
    id: number;
    name: string;
    description: string;
    author_id: number;
    author_nickname: string;
    tags: string[];
    cover: string;
    file_path: string;
  };
  type UserInfo = {
    id: number;
    nickname: string;
    email: string;
    jwt_token: string;
    refresh_token: string;
  };

  type RefreshToken = {
    jwt_token: string;
  };
  interface Ret<T> {
    code: number;
    message: string;
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
}
