import { getNonce, login } from "@/services/api";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface MyState {
  userInfo: API.UserInfo;
  isLogin: boolean;
  login: () => Promise<void>;
  refreshToken: () => Promise<void>;
}
type User = { userInfo: API.UserInfo };
export const initUser: User = {
  userInfo: {
    id: 0,
    nickname: "",
    email: "",
    jwt_token: "",
    refresh_token: "",
  },
};

const checkExtension = () => {
  if (!window.metaidwallet) {
    window.open(
      "https://chromewebstore.google.com/detail/metalet/lbjapbcmmceacocpimbpbidpgmlmoaao"
    );
    return false;
  }
  return true;
};

export const useUserInfoStore = create<MyState>()(
  persist(
    (set, get) => ({
      ...initUser,
      isLogin: false,
      login: async () => {
        if (!checkExtension()) return;
        const isConnected = await window.metaidwallet.isConnected();
        console.log(isConnected, "isConnected");
        if (isConnected.status === "locked") {
          throw new Error("unlock first");
        }
        if (!isConnected) {
          const ret = await window.metaidwallet.connect();
          console.log(ret);
          if (ret.status) {
            throw new Error(ret.status);
          }
        }
        const address = await window.metaidwallet.getAddress();
        const pubkey = await window.metaidwallet.getPublicKey();
        const {
          data: { nonce, template },
          code,
          message,
        } = await getNonce({ address, public_key: pubkey });
        if (code !== 0) {
          throw new Error(message);
        }
        const signString = template
          .replace("{{wallet_address}}", address)
          .replace("{{nonce}}", nonce);
        const sigResp = await window.metaidwallet.signMessage({
          message: signString,
          encoding: "base64",
        });
        if (sigResp.status) {
          throw new Error(sigResp.status);
        }
        const sig = sigResp.signature.signature;
        const {
          data,
          code: loginCode,
          message: loginMessage,
        } = await login({ address, public_key: pubkey, sign: sig });
        if (loginCode !== 0) {
          throw new Error(loginMessage);
        }
        set({ userInfo: data, isLogin: true });
      },
      refreshToken: async () => {
        const { refresh_token } = get().userInfo;
        if(refresh_token){
            
        }
      },
    }),
    {
      name: "bitmodel-user", // name of item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default the 'localStorage' is used
      partialize: (state) => ({ userInfo: state.userInfo }),
    }
  )
);
