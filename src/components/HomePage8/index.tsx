import "./index.less";
import { Button, ConfigProvider } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import bgCard from '@/assets/bg_card.png'

export default () => {
  return (
    <div className="homePage8">
      <div className="actions">
        <img className='bgCard' src={bgCard} alt="" />
        <div className="info">
          It's time to join the thousands of creators, artists, and developers
          using MVC.
        </div>
        <ConfigProvider
          theme={{
            components: {
              Button: {
                primaryShadow: "0 0px 0 rgba(0, 0, 0, 0)",
                colorPrimary: `rgba(255, 255, 255, 0.40)`,
                colorPrimaryHover: `linear-gradient(270deg, #B193CB, #60E4DE)`,
                colorPrimaryActive: `linear-gradient(270deg, #B193CB, #60E4DE)`,
                lineWidth: 0,
              },
            },
          }}
        >
          <div className="buttons">
            <Button
              type="primary"
              size="large"
              shape="round"
              icon={<ArrowRightOutlined />}
              iconPosition="end"
            >
              Data set
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
        </ConfigProvider>
      </div>
    </div>
  );
};
