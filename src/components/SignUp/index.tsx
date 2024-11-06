import { ArrowRightOutlined, DownOutlined, LoginOutlined, RightOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, ConfigProvider, Dropdown, Space, message } from "antd";
import { useModel, history } from "umi";
import coin from '@/assets/coin.png'
import { isMobile } from "@/utils/utils";
import { useState } from "react";
import { BITMODEL_TOKEN_GENESIS } from "@/config";

export default ({ showLogined = true }: { showLogined?: boolean }) => {
  const { connect, connected, userInfo, disConnect, userBal } = useModel("global");
  const [loading, setLoading] = useState<boolean>(false);

  const handleConnect = async () => {
    try {
      setLoading(true);
      await connect();
    } catch (e: any) {
      message.error(e.message);
    }
    setLoading(false);
  }

  return (
    <>
      {connected ? (<>
        {showLogined && <Dropdown
          arrow
          trigger={['click', 'hover']}
          overlayStyle={{ zIndex: 1999 }}
          dropdownRender={() => (
            <div className="walletInfo">
              <div className="bal" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                  <img src={coin} alt="" style={{ width: '18px', height: '18px' }} />
                  <div className="value" style={{ color: '#FFAE00' }}>{userBal[BITMODEL_TOKEN_GENESIS] || 0}</div>
                </div>

                <Button style={{ background: '#FFAE00', color: '#fff' }} shape='round' onClick={() => { window.open('https://mvcswap.com/#/swap/testnet-dexr') }}>Buy</Button>
              </div>
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
            <Avatar src={userInfo.avatar ? <img src={userInfo.avatar}></img> : null}>{userInfo.nickname || 'Unnamed'}</Avatar>
            <DownOutlined />
          </Space>
        </Dropdown>}
      </>


      ) : (

        <Button
          type="primary"
          shape="round"
          icon={<ArrowRightOutlined />}
          iconPosition="end"
          onClick={handleConnect}
        >
          Sign up
        </Button>

      )}
    </>
  );
};
