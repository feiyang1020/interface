declare namespace API {
  type Nonce = {
    nonce: string;
    template: string;
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
}
