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
        <div className="title" key='title2'>
          Valuing Every Contri-

        </div>
        <div className="title" key='title3'>

          bution to <span>AGl</span>
        </div>
        <div className="subTitle" key='subTitle'>
          BitModel, Valuing Every Contribution to AGI
        </div>

        <div className="buttons" key='btns'>
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  colorPrimary: `linear-gradient(135deg, #B193CB, #60E4DE)`,
                  colorPrimaryHover: `linear-gradient(135deg, #B193CB, #60E4DE)`,
                  colorPrimaryActive: `linear-gradient(135deg, #B193CB, #60E4DE)`,
                  lineWidth: 0,
                },
              },
            }}
          >
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
          </ConfigProvider>
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  colorPrimary: `rgba(255,255,255,0.2)`,
                  colorPrimaryHover: `rgba(255,255,255,0.3)`,
                  colorPrimaryActive: `rgba(255,255,255,0.3)`,
                  lineWidth: 0,
                },
              },
            }}
          >
            <Button
              type="primary"
              size="large"
              shape="round"
              icon={<ArrowRightOutlined />}
              iconPosition="end"
            >
              Data set
            </Button>
          </ConfigProvider>
        </div>
      </QueueAnim>
    </div>
  );
};
