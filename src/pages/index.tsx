import yayJpg from '../assets/yay.jpg';
import * as _secp256k1 from "tiny-secp256k1";
import { fromHex, toHex } from "uint8array-tools";
import { UnspentOutput, txHelpers } from '@unisat/wallet-sdk';
const EMPTY_BUFFER = new Uint8Array(0);
function toUint8Array(value) {
  if (typeof value !== "string") return value;
  if (value.match(/^\d{1,20}$/)) return parseInt(value);
  const data = fromHex(value);
  return toHex(data) === value ? data : EMPTY_BUFFER;
}
const a=async()=>{
  txHelpers.sendRunes()
}
export default function HomePage() {
  return (
    <div>
      <h2>Yay! Welcome to umi!</h2>
      <p>
        <img src={yayJpg} width="388" />
      </p>
      <p>
        To get started, edit <code>pages/index.tsx</code> and save to reload.
      </p>
    </div>
  );
}
