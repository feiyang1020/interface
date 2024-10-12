import { Link, Outlet, history, useLocation, useModel } from "umi";
import "./index.less";
import logo from "@/assets/logo@2x.png";

import {
  Collapse,
  CollapseProps,
  ConfigProvider,
  Dropdown,
  DropdownProps,
  message,
  theme,
} from "antd";
import Footer from "@/components/Footer";
import SignUp from "@/components/SignUp";
import Nav, { MenuData } from "@/components/Nav";
import { useEffect, useMemo, useState } from "react";
import LoginModal from "@/components/LoginModal";

const _themes = {
  token: {
    wireframe: false,
    colorText: "rgba(255, 255, 255, 1)",
    colorPrimary: "rgb(133, 101, 242)",
    colorInfo: "rgba(110, 102, 250, 0.32)",
    colorSuccess: "#6e66fa",
    colorWarning: "#f7931a",
    borderRadius: 8,
    colorBgBase: "#080731",
    fontFamily: "Montserrat",
  },
  components: {
    Button: {
      primaryShadow: "0 0px 0 rgba(0, 0, 0, 0)",
      colorPrimary: `rgba(255, 255, 255, 0.40)`,
      colorPrimaryHover: `linear-gradient(270deg, #B193CB, #60E4DE)`,
      colorPrimaryActive: `linear-gradient(270deg, #B193CB, #60E4DE)`,
      lineWidth: 0,
    },
    Segmented: {
      trackBg: "rgba(110, 102, 250, 0.32)",
      itemSelectedBg: "rgb(110, 102, 250)",
      fontSize: 13,
    },
    Card: {
      colorBgContainer: "#1A185F",
    },
    Modal: {
      contentBg: "rgba(255, 255, 255, 0)",
      headerBg: "rgba(255, 255, 255, 0)",
      colorBgMask: "rgba(0, 0, 0, 0)",
      titleColor: "rgba(0, 0, 0, 0)",
      boxShadow: "      none",
    },
    Input: {
      activeBorderColor: "rgb(110, 102, 250)",
      colorBgContainer: "rgb(8, 7, 49)",
    },
    Collapse: {
      colorBorder: "rgba(255, 255, 255, 0.2)",
    },
    "Upload": {
      "colorPrimary": "rgba(110, 102, 250, 0)",
      "colorPrimaryHover": "rgba(154, 145, 255, 0)",
      "colorPrimaryBorder": "rgba(231, 227, 255, 0)"
    },
    "Table": {
      "borderColor": "rgba(240, 240, 240, 0)",
      "colorBgContainer": "rgba(8, 7, 49, 0)"
    },
    "Message": {
      "zIndexPopup": 201000
    }
  },
};
export default function Layout() {
  const location = useLocation();
  const { loginModalShow, setLoginModalShow } = useModel('global')
  const [showMenus, setShowMenus] = useState<boolean>(false);

  const onChange = (key: string | string[]) => {
    console.log(key);
  };
  const [isShow, setIsShow] = useState(false)

  const handleOpenChange: DropdownProps['onOpenChange'] = (nextOpen, info) => {
    if (info.source === 'trigger' || nextOpen) {
      setShowMenus(false);
    }
  };

  useEffect(() => {
    // 监听
    window.addEventListener('scroll', handleScroll)
    // 销毁
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsShow(true)
    } else {
      setIsShow(false)
    }
  }



  const items: CollapseProps["items"] = useMemo(() => {
    return MenuData.filter((item) => !item.onlyShowInHeader).map((item) => {
      return {
        key: item.title,
        label: item.title,
        children: (
          <div className="navs">
            {item.children.map((nav, index) => (
              <div
                className={`btnWrap ${nav.disabled ? "disabaled" : ""}`}
                key={index}
                onClick={() => {
                  if (!nav.disabled) {
                    setShowMenus(false);
                    history.push(nav.link);
                  }

                }}
              >
                <img src={nav.icon} alt="" className="icon" />
                <div className="navText">
                  <div className="name">{nav.title}</div>
                  <div className="sub">{nav.desc}</div>
                </div>
              </div>
            ))}
          </div>
        ),
      };
    });
  }, []);
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        ..._themes,
      }}
    >
      <div className="page">
        <div className="header" style={{ background: isShow ? '#08082a' : 'transparent' }}>
          <div className="headerwrap">
            <img
              src={logo}
              alt=""
              className="logo"
              onClick={() => history.push("/")}
            />
            <Nav />
            <div className="signup">
              <SignUp />
            </div>
            <Dropdown
              overlayClassName="menuOverlay"
              placement="bottom"
              overlayStyle={{ top: 50, left: 0, right: 0 }}
              onOpenChange={handleOpenChange}
              dropdownRender={() => (
                <div className="menuWrap">
                  <Collapse
                    bordered={false}
                    onChange={onChange}
                    items={items}
                  ></Collapse>
                </div>
              )}
              open={showMenus}
            >
              <div
                className="menus"
                onClick={(e) => {
                  !showMenus &&
                    setShowMenus(true)
                }}
              >
                <div className="line1"></div>
                <div className="line2"></div>
              </div>
            </Dropdown>
          </div>
        </div>

        <div className="content">
          <Outlet />
        </div>

        <Footer />
        <LoginModal
          show={loginModalShow}
          onClose={() => setLoginModalShow(false)}
        />
      </div >
    </ConfigProvider >
  );
}
