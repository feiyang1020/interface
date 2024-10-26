import onchain from "@/assets/onchain.png";
import "./index.less";
import { OverPack } from "rc-scroll-anim";
import QueueAnim from "rc-queue-anim";

export default () => {
  return (
    <OverPack className="homePage3" replay style={{ height: 'calc(100vh - 64px)' }} >
      <QueueAnim
        className="homePage3"
        type="bottom"
        key="home3Case"
        ease="easeOutQuart"
        leaveReverse
      >
        <div className="pageTitle" key='t1'>Bitmodel Protocol</div>
        <div className="pageSubTitle" key='t2'>
        Illustration of the proposed Bitmodel protocol, which is primarily designed to trace the contributions to AI products/services. We will open-source the core functions of Bitmodel, which are built upon blockchain techniques, to facilitate the community in developing AI applications following Bitcoin principles.
        </div>
        <div className="imgWrap" key='t3'>
          <img src={onchain} alt="" />
        </div>

      </QueueAnim>

    </OverPack>
  );
};
