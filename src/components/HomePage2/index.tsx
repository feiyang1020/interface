import { OverPack } from 'rc-scroll-anim';
import './index.less'
import QueueAnim from 'rc-queue-anim';
import flow from '@/assets/flow.png'
import flow2 from '@/assets/flow2.png'
import _guide from '@/assets/Group 70.png'
import _guide2 from '@/assets/Group 71.png'
import { Carousel, Row } from 'antd';
export default () => {
  return (
    <OverPack className="homePage2" replay>
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
        <div className="flowWrap" key='flow'>
          <div className="carousel">
            <Carousel autoplay autoplaySpeed={5000} infinite>
              <div className="imgWrap">
                <img src={flow} alt="" className='flow' />
              </div>
              <div className="imgWrap">
                <img src={flow2} alt="" className='flow' />
              </div>

            </Carousel>
          </div>
          <div className="actions">
            <img src={_guide} alt="" className='action' />
            <img src={_guide2} alt="" className='action' />
          </div>

        </div>

      </QueueAnim>
    </OverPack>
  );
};
