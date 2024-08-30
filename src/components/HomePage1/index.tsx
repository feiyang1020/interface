import { Button, ConfigProvider } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import bg1 from "@/assets/bg.png";
import "./index.less";
import { history } from "umi";
import QueueAnim from "rc-queue-anim";
export default () => {
  return (
    <div className="homePage1">

      <QueueAnim delay={300} ease="easeOutQuart">
        <div className="title" key='title'>
          BitModel
        </div>
        <div className="title title2" key='title2'>
          Valuing Every Contribution to <span>AI</span>

        </div>
        {/* <div className="subTitle" key='subTitle'>
          BitModel, Valuing Every Contribution to AI
        </div> */}

        <div className="buttons" key='btns'>
          
            <Button
              type="primary"
              size="large"
              shape="round"
              icon={<ArrowRightOutlined />}
              iconPosition="end"
              onClick={() => { history.push('/services') }}
            >
              Model library
            </Button>
            <Button
              type="primary"
              size="large"
              shape="round"
              icon={<ArrowRightOutlined />}
              iconPosition="end"
            >
              Data set
            </Button>
          
        </div>
      </QueueAnim>
    </div>
  );
};
