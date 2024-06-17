import { API_NET, OutputType, TxDecoder, mvc } from 'meta-contract';
import {
  getQueryGenesis,
  parseDataPart,
  updateScript,
} from 'meta-contract/dist/mcp02/contract-proto/token.proto';
import { getLockingScriptFromPreimage } from 'meta-contract/dist/common/tokenUtil';
import { toHex } from 'meta-contract/dist/scryptlib';

export const getTokenTxInput = (
  genesis: string,
  tx: mvc.Transaction,
  outputIndex: number,
) => {
  const tokenScript = tx.outputs[outputIndex].script;
  const curDataPartObj = parseDataPart(tokenScript.toBuffer());
  let inputIndex = -1;
  const input = tx.inputs.find(
    (input: mvc.Transaction.Input, index: number) => {
      const script = new mvc.Script(input.script);
      if (script.chunks.length > 0) {
        const lockingScriptBuf = getLockingScriptFromPreimage(
          script.chunks[0].buf,
        );
        if (lockingScriptBuf) {
          if (getQueryGenesis(lockingScriptBuf) == genesis) {
            // check pre script
            // return checkPreLockingScript(api, input, lockingScriptBuf);
            inputIndex = index;
            return input;
          }
          const dataPartObj = parseDataPart(lockingScriptBuf);
          dataPartObj.sensibleID = curDataPartObj.sensibleID;
          const newScriptBuf = updateScript(lockingScriptBuf, dataPartObj);
          const genesisHash = toHex(
            mvc.crypto.Hash.sha256ripemd160(newScriptBuf),
          );
          if (genesisHash == curDataPartObj.genesisHash) {
            // check pre script
            // return checkPreLockingScript(api, input, lockingScriptBuf);
            inputIndex = index;
            return index;
          }
        }
      }
    },
  );
  return { input, inputIndex };
};

export const getTokenTxOutput = (
  codehash: string,
  genesis: string,
  tx: mvc.Transaction,
) => {
  for (let i = 0; i < tx.outputs.length; i++) {
    const output = tx.outputs[i];
    const info = TxDecoder.decodeOutput(output, API_NET.MAIN);
    if (info.type === OutputType.SENSIBLE_FT) {
      if (
        info.data &&
        info.data.codehash === codehash &&
        info.data.genesis === genesis
      ) {
        return {
          output: output,
          index: i,
        };
      }
    }
  }
};
