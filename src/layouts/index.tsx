import { Link, Outlet, history, useLocation } from "umi";
import "./index.less";
import logo from "@/assets/logo@2x.png";

import { ConfigProvider, message, theme } from "antd";
import Footer from "@/components/Footer";
import SignUp from "@/components/SignUp";
import Nav from "@/components/Nav";

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
    Segmented: {
      trackBg: "rgba(110, 102, 250, 0.32)",
      itemSelectedBg: "rgb(110, 102, 250)",
      fontSize: 13,
    },
    Card: {
      colorBgContainer: "#1A185F",
    },
    Modal: {
      contentBg: "#1b185d",
      headerBg: "#1b185d",
    },
    Input: {
      activeBorderColor: "rgb(110, 102, 250)",
      colorBgContainer: "rgb(8, 7, 49)",
    },
  },
};
export default function Layout() {
  const location = useLocation();
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
