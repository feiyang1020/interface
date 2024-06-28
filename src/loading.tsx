import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import React from "react";
import logo from "@/assets/logo@2x.png";
import "./global.less";

const antIcon = (
  <LoadingOutlined style={{ fontSize: 24, color: "#8565F2" }} spin />
);

const App: React.FC = () => {
  // 
  return (
    <div className="init_loading" style={{ background: "#000" }}>
      <img src={logo} alt="" className="logo" />
      <Spin indicator={antIcon} />
    </div>
  );
};

export default App;
