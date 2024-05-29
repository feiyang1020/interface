import { BITMODEL_USER_KEY } from "@/config";
import useIntervalAsync from "@/hooks/useIntervalAsync";
import { getNonce, login, refreshToken } from "@/services/api";
import { getJsonItem, setJsonItem } from "@/utils/utils";
import { useCallback, useEffect, useState } from "react";
import { useModel } from "umi";
export type Network = "mainnet" | "testnet";
type WalletName = "metalet";
const { metaidwallet } = window;
const checkExtension = () => {
  if (!window.metaidwallet) {
    window.open(
      "https://chromewebstore.google.com/detail/metalet/lbjapbcmmceacocpimbpbidpgmlmoaao"
    );
    return false;
  }
  return true;
};
export const initUser = {
  id: 0,
  nickname: "",
  email: "",
  jwt_token: "",
  refresh_token: "",
};

export default () => {
  const [walletName, setWalletName] = useState<WalletName>("metalet");
  const [mvcAddress, setMVCAddress] = useState<string>();
  const [btcAddress, setBTCAddress] = useState<string>();
  const [loginModalShow, setLoginModalShow] = useState<boolean>(false);
  const [network, setNetwork] = useState<Network>("testnet");
  const [connected, setConnected] = useState<boolean>(false);
  const [userBal, setUserBal] = useState<Record<string, any>>({});
  const [userInfo, setUserInfo] = useState<API.UserInfo>(
    getJsonItem(BITMODEL_USER_KEY) || initUser
  );

  const connect = async () => {
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
    setJsonItem(BITMODEL_USER_KEY, data);
    setUserInfo(data);
    await init();
  };

  const disConnect = async () => {
    if (!checkExtension()) return;
    const ret = await window.metaidwallet.disconnect();
    if (ret.status === "canceled") return;
    setConnected(false);
    setMVCAddress("");
    setBTCAddress("");
    setUserBal({});
  };

  const init = useCallback(async () => {
    console.log("init", walletName, window.metaidwallet);
    if (walletName === "metalet" && window.metaidwallet) {
      const isConnected = await window.metaidwallet.isConnected();
      console.log("init", isConnected);

      if (isConnected === true) {
        const _mvc = await window.metaidwallet.getAddress();
        const { network } = await window.metaidwallet.getNetwork();
        const btcAddress = await window.metaidwallet.btc.getAddress();
        setConnected(true);
        setMVCAddress(_mvc);
        setNetwork(network);
        setBTCAddress(btcAddress);
      }
    }
  }, [walletName]);
  useEffect(() => {
    //
    setTimeout(() => {
      init();
    }, 500);
  }, [init]);

  useEffect(() => {
    const handleAccountChange = (newAccount: any) => {
      init();
    };
    const handleNetChange = (network: string) => {
      init();
    };
    if (walletName === "metalet" && window.metaidwallet && connected) {
      window.metaidwallet.on("accountsChanged", handleAccountChange);
      window.metaidwallet.on("networkChanged", handleNetChange);
    }

    return () => {
      if (walletName === "metalet" && window.metaidwallet && connected) {
        window.metaidwallet.removeListener(
          "accountsChanged",
          handleAccountChange
        );
        window.metaidwallet.removeListener("networkChanged", handleNetChange);
      }
    };
  }, [walletName, connected]);

  const _refreshToken = useCallback(async () => {
    if (connected) {
      const user = getJsonItem(BITMODEL_USER_KEY);
      const { code, data, message } = await refreshToken({
        refresh_token: user.refresh_token,
      });
      if (code === 0) {
        setJsonItem(BITMODEL_USER_KEY, {
          ...user,
          jwt_token: data.jwt_token,
        });
        setUserInfo((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            jwt_token: data.jwt_token,
          };
        });
      }
    }
  }, [connected]);
  const updateToken = useIntervalAsync(_refreshToken, 600000);

  return {
    mvcAddress,
    btcAddress,
    network,
    connected,
    connect,
    userBal,
    setLoginModalShow,
    loginModalShow,
    disConnect,
    updateToken,
  };
};
