import { API_NET, API_TARGET, Api, mvc } from "meta-contract";
import { createOrder, orderCommit } from "@/services/api";
import { getTokenTxInput, getTokenTxOutput } from "./txCheck";

const txProof = async (txHex: string, genesis: string, codehash: string) => {
  const api = new Api(
    API_NET.TEST,
    API_TARGET.CYBER3,
    "https://mvcapi-testnet.cyber3.space"
  );
  const tx = new mvc.Transaction(txHex);
  const outputProof = getTokenTxOutput(codehash, genesis, tx);
  if (!outputProof) throw new Error("output not found");
  const inputProof = getTokenTxInput(genesis, tx, outputProof.index);
  let preTxHex = "";
  if (inputProof.inputIndex > -1) {
    const input = tx.inputs[inputProof.inputIndex];
    console.log(input);
    debugger;
    preTxHex = await api.getRawTxData(input.prevTxId.toString("hex"));
  }
  return {
    outputIndex: outputProof.index,
    inputProof: {
      index: inputProof.inputIndex,
      preTxHex: preTxHex,
    },
  };
};

export const buyModel = async (modelId: number) => {
  const {
    code,
    data: orderInfo,
    msg,
  } = await createOrder({ model_id: modelId });
  console.log(orderInfo,'orderInfo');
  if(code !== 0) throw new Error(msg);

  const transferResp = await window.metaidwallet
    .transfer({
      tasks: [
        {
          type: "token",
          genesis: orderInfo.genesis,
          codehash: orderInfo.code_hash,
          receivers: [
            {
              amount: orderInfo.amount,
              address: orderInfo.address,
            },
          ],
        },
      ],
      broadcast: false,
    })
    .catch((err) => {
      throw new Error(err);
    });
  if (transferResp.status) throw new Error(transferResp.status);
  console.log(transferResp);
  const routeCheckTxHex = transferResp.res[0].routeCheckTxHex;
  const txHex = transferResp.res[0].txHex;
  const proof = await txProof(txHex, orderInfo.genesis, orderInfo.code_hash);
  const commitResp = await orderCommit({
    order_id: orderInfo.id,
    payment_proof: {
      proof: proof,
      routeCheckTxHex,
      txHex,
    },
  });
};
