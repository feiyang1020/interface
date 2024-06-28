import { OverPack } from 'rc-scroll-anim';
import './index.less'
import QueueAnim from 'rc-queue-anim';
export default () => {
  return (
    <OverPack className="homePage2" replay style={{height:'20vh'}}>
      <QueueAnim
        className="home2Case"
        type="bottom"
        key="home2Case"
        ease="easeOutQuart"
        leaveReverse
      >
        <div className="pageTitle" key='title'>Contribution Flow</div>
        <div className="pageSubTitle" key='subtitle'>
          We have opened BitModel's core functions of solving AI problems based on
          blockchain to the community in the form of a protocol. The community can
          develop various AI applications based on Bitcoin principles based on the
          BitModel protocol.
        </div>
      </QueueAnim>
    </OverPack>
  );
};
