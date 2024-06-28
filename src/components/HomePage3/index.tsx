import onchain from "@/assets/onchain.png";
import "./index.less";
import { OverPack } from "rc-scroll-anim";
import QueueAnim from "rc-queue-anim";

export default () => {
  return (
    <OverPack className="homePage3" replay style={{height:'calc(100vh - 64px)'}} >
      <QueueAnim
        className="homePage3"
        type="bottom"
        key="home2Case"
        ease="easeOutQuart"
        leaveReverse
      >
        <div className="pageTitle" key='t1'>BitModel Protocol</div>
        <div className="pageSubTitle" key='t2'>
          We have opened BitModel's core functions of solving AI problems based on
          blockchain to the community in the form of a protocol. The community can
          develop various AI applications based on Bitcoin principles based on the
          BitModel protocol.
        </div>
        <div className="imgWrap" key='t3'>
          <img src={onchain} alt="" />
        </div>
       
      </QueueAnim>
      
    </OverPack>
  );
};
