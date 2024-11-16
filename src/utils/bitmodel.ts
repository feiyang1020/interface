import { BITMODEL_TOKEN_CODEHASH, BITMODEL_TOKEN_GENESIS } from "@/config";
import { claimModelReward, getAssetInfo, getMVCTokenBal, getRelayAddress } from "@/services/api";
import { Decimal } from "decimal.js";


export const fetchUserClaimableTokenInfo = async (id: number) => {
  const data = await getAssetInfo({ id });
  const {
    deployInfo: {
      modelAsset: {
        tokenLockAddress: { owner },
      },
    },
  } = data;
  console.log(owner, 'owner');
  const tokens = await getMVCTokenBal({ address: owner });
  const token = tokens.data.list.find(
    (item: any) => item.genesis === BITMODEL_TOKEN_GENESIS
  );
  let balance = 0;
  if (token) {
    balance = new Decimal(token.confirmed).dividedBy(Math.pow(10, token.decimal)).toNumber();
  }
  return {
    balance,
    deployInfo: data.deployInfo,
  };
};



export const claimToken = async (modelId: number) => {

  const { address: relayAddr } = await getRelayAddress();
  if (!relayAddr) throw new Error('relay address not found');
  const res = await window.metaidwallet.transfer({
    broadcast: false,
    tasks: [
      {
        type: 'space',
        receivers: [{ address: relayAddr, amount: "1000000" }],
      },
    ],
  }).catch((err) => {
    if (typeof err === 'string' && err.includes('Insufficient balance')) {
      throw new Error('Insufficient space balance');
    }
    throw new Error(err);
  });
  console.log(res);
  const { txHex } = res.res[0];

  const ret = await claimModelReward({
    feeTxHex: txHex,
    modelId: String(modelId),
    codeHash: BITMODEL_TOKEN_CODEHASH,
    genesis: BITMODEL_TOKEN_GENESIS
  })
  if (ret && ret.txidList) {
    return ret.txidList
  }
  throw new Error('claim failed')




};
