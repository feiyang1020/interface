import { BITMODEL_TOKEN_CODEHASH, BITMODEL_TOKEN_GENESIS } from "@/config";
import { getAssetInfo, getMVCTokenBal } from "@/services/api";
import { MvcProvider } from "token-core-ts";
import { MvcWallet } from "token-core-ts";
import { bsv as mvc } from "scrypt-ts";
import ECPairFactory, { SignerAsync } from "ecpair";
import * as ecc from "@bitcoin-js/tiny-secp256k1-asmjs";
import { API_TARGET } from "meta-contract";
import {
  ModelAsset,
  ModelAssetExt,
  ModelAssetRoleOp,
  ModelAssetTokenLock,
  UniqueData,
  UniqueDataExt,
} from "bitmodel-core";
import { BitModel } from "bitmodel-core";
import modelAsset from "bitmodel-core/artifacts/modelAsset.json";
import modelAssetTokenLock from "bitmodel-core/artifacts/modelAssetTokenLock.json";
import uniqueData from "bitmodel-core/artifacts/uniqueData.json";
import { PrivateKey } from "mvc-std-lib";

const ECPair = ECPairFactory(ecc);

export const fetchUserClaimableTokenInfo = async (id: number) => {
  const data = await getAssetInfo({ id });
  const {
    deployInfo: {
      modelAsset: {
        tokenLockAddress: { owner },
      },
    },
  } = data;
  console.log(owner);
  const tokens = await getMVCTokenBal({ address: owner });
  const token = tokens.data.list.find(
    (item: any) => item.genesis === BITMODEL_TOKEN_GENESIS
  );
  let balance = 0;
  if (token) {
    balance = token.confirmed;
  }
  return {
    balance,
    deployInfo: data.deployInfo,
  };
};

const _initLoadArtifact = () => {
  ModelAsset.loadArtifact(modelAsset);
  ModelAssetTokenLock.loadArtifact(modelAssetTokenLock);
  UniqueData.loadArtifact(uniqueData);
};


export const claimToken = async (deployInfo: any) => {
  const _mvcAddress = await window.metaidwallet.getAddress();
  const network = mvc.Networks.testnet;
  const wif = "L1EmDSV5hqPAvGg4NUWLauTFSvXDsDNXkf22Q9CQftipeJG3ZpX2"; //new PrivateKey().toString();
  // console.log(wif,'wif');
  const signer = ECPair.fromWIF(wif);
  console.log(API_TARGET.CYBER3);
  const mvcProviderNoBroadcast = new MvcProvider(
    API_TARGET.CYBER3,
    network,
    1000,
    false
  );
  console.log(mvcProviderNoBroadcast);
  const mvcProviderBroadcast = new MvcProvider(
    API_TARGET.CYBER3,
    network,
    1000,
    true
  );
  const mvcWalletNoBroadcast = new MvcWallet(
    signer as unknown as SignerAsync,
    network,
    mvcProviderNoBroadcast
  );
  const mvcWalletBroadcast = new MvcWallet(
    signer as unknown as SignerAsync,
    network,
    mvcProviderBroadcast
  );
  const adminAddress = await mvcWalletNoBroadcast.getDefaultAddress();
  console.log(adminAddress.toString(), "adminAddress");
  //   const transferRes: any = await window.metaidwallet.transfer({
  //     broadcast: true,
  //     tasks: [
  //         {
  //             type: 'space',
  //             receivers: [{ address: adminAddress.toString(), amount: '10000' }],
  //         },
  //     ],
  // }).catch((err: any) => {
  //     console.log(err)
  //     throw new Error(err as any)
  // })
  // console.log(transferRes, 'transferRes');
  _initLoadArtifact();
  const txStore = new Map();
  for (const broadcastHex of deployInfo.broadcastHexList) {
    const tx = new mvc.Transaction(broadcastHex);
    txStore.set(tx.hash, tx);
  }
  console.log(txStore, "txStore");
  const uniqueDataExt = new UniqueDataExt(
    mvcWalletBroadcast,
    deployInfo.uniqueData,
    txStore
  );
  const modelAssetExt = new ModelAssetExt(
    mvcWalletBroadcast,
    deployInfo.modelAsset,
    txStore
  );
  const bitModel = new BitModel(uniqueDataExt, modelAssetExt);
  const op = ModelAssetRoleOp.Owner;
  const { address } = await bitModel.modelAssetExt.getLockContractInfo(op);
  console.log(address.toString());
  const ftUtxoList = await mvcProviderBroadcast.api.getFungibleTokenUnspents(
    BITMODEL_TOKEN_CODEHASH,
    BITMODEL_TOKEN_GENESIS,
    address.toString()
  );
  console.log(ftUtxoList, "ftUtxoList");
  const feeUtxoList = await mvcWalletBroadcast.listUnspent(
    await mvcWalletBroadcast.getDefaultAddress()
  );
  console.log(feeUtxoList, "feeUtxoList");
  console.log(await bitModel.uniqueDataExt.getTxPreTx(bitModel.uniqueDataExt.contract));
  const txInfo = await bitModel.modelAssetExt.transferClaim(
    mvcWalletNoBroadcast,
    op,
    BITMODEL_TOKEN_CODEHASH,
    BITMODEL_TOKEN_GENESIS,
    ftUtxoList,
    feeUtxoList,
    mvcProviderBroadcast.api,
    _mvcAddress
  );
  console.log(txInfo, "txInfo");
};
