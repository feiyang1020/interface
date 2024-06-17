import onchain from "@/assets/onchain.png";
import "./index.less";
export default () => {
  return (
    <div className="homePage3">
      <div className="pageTitle">BitModel Protocol</div>
      <div className="pageSubTitle">
        We have opened BitModel's core functions of solving AI problems based on
        blockchain to the community in the form of a protocol. The community can
        develop various AI applications based on Bitcoin principles based on the
        BitModel protocol.
      </div>
      <div className="imgWrap">
        <img src={onchain} alt="" />
      </div>

    </div>
  );
};
