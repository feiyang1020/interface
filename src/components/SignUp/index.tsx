import { ArrowRightOutlined } from "@ant-design/icons";
import { Avatar, Button, ConfigProvider, message } from "antd";
import { useModel } from "umi";

export default () => {
  const { connect, connected, userInfo, disConnect } = useModel("global");
  const handleLogin = async () => {
    try {
      await connect();
      message.success("Login success");
    } catch (err) {}
  };
  return (
    <>
      {connected ? (
        <Avatar onClick={disConnect}>{userInfo.id}</Avatar>
      ) : (
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
            onClick={handleLogin}
          >
            Sign up
          </Button>
        </ConfigProvider>
      )}
    </>
  );
};
