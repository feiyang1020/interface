import { ArrowRightOutlined, DownOutlined, LoginOutlined, RightOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, ConfigProvider, Dropdown, Space, message } from "antd";
import { useModel,history } from "umi";

export default () => {
  const { connect, connected, userInfo, disConnect } = useModel("global");
  const handleLogin = async () => {
    try {
      await connect();
      message.success("Login success");
    } catch (err) { }
  };
  return (
    <>
      {connected ? (

        <Dropdown
          arrow
          dropdownRender={() => (
            <div className="walletInfo">

              <div className="links">
                <div
                  className="item forsale"
                  onClick={() => {
                    history.push("/profile");
                  }}
                >
                  <UserOutlined />
                  <div className="path">Your profile</div>

                </div>
                <div
                  className="item forsale"
                  onClick={disConnect}
                >
                  <LoginOutlined />
                  <div className="path">Log Out</div>

                </div>
              </div>

            </div>
          )}
          placement="bottomRight"
        >
          <Space style={{ cursor: 'pointer' }}>
            <Avatar src={userInfo.avatar?<img src={userInfo.avatar}></img>:null}>{userInfo.nickname||'Unnamed'}</Avatar>
            <DownOutlined />
          </Space>
        </Dropdown>

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
