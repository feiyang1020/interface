import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, ConfigProvider } from "antd";

export default () => {
  return (
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
        shape="round"
        icon={<ArrowRightOutlined />}
        iconPosition="end"
      >
        Sign up
      </Button>
    </ConfigProvider>
  );
};
