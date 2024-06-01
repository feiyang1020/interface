import { Link, Outlet, history, useLocation } from "umi";
import "./index.less";
import logo from "@/assets/logo@2x.png";

import {
  Collapse,
  CollapseProps,
  ConfigProvider,
  Dropdown,
  message,
  theme,
} from "antd";
import Footer from "@/components/Footer";
import SignUp from "@/components/SignUp";
import Nav, { MenuData } from "@/components/Nav";
import { useMemo, useState } from "react";

const _themes = {
  token: {
    wireframe: false,
    colorText: "rgba(255, 255, 255, 1)",
    colorPrimary: "#6e66fa",
    colorInfo: "rgba(110, 102, 250, 0.32)",
    colorSuccess: "#6e66fa",
    colorWarning: "#f7931a",
    borderRadius: 8,
    colorBgBase: "#080731",
    fontFamily: "Montserrat",
  },
  components: {
    Button: {
      colorPrimary: `linear-gradient(135deg, #B193CB, #60E4DE)`,
      colorPrimaryHover: `linear-gradient(135deg, #B193CB, #60E4DE)`,
      colorPrimaryActive: `linear-gradient(135deg, #B193CB, #60E4DE)`,
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
  },
};
export default function Layout() {
  const location = useLocation();
  const [showMenus, setShowMenus] = useState<boolean>(false);
  const onChange = (key: string | string[]) => {
    console.log(key);
  };
  const items: CollapseProps["items"] = useMemo(() => {
    return MenuData.map((item) => {
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
                  setShowMenus(false);
                  history.push(nav.link);
                }}
              >
                <img src={nav.icon} alt="" className="icon" />
                <div className="navText">
                  <div className="name">{item.title}</div>
                  <div className="sub">{item.desc}</div>
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
        <div className="header">
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
              placement="bottom"
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
                onClick={() => setShowMenus((prev) => !prev)}
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
      </div>
    </ConfigProvider>
  );
}
