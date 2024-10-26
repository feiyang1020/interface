import { Col, Row } from "antd";
import { OverPack } from "rc-scroll-anim";
import QueueAnim from "rc-queue-anim";
import logo from "@/assets/logo@2x.png";
import footerBg from "@/assets/footerbg.png";
import "./index.less";
import bgfooter from '@/assets/bg_foooter.png'
import SignUp from "../SignUp";
import { MenuData } from "../Nav";
const data = [
  {
    title: "Services",
    children: [
      { name: "Models", href: "#" },
      { name: "Dataset", href: "#" },
      { name: "API", href: "#" },
    ],
  },
  {
    title: "Services2",
    children: [
      { name: "Models", href: "#" },
      { name: "Dataset", href: "#" },
      { name: "API", href: "#" },
      { name: "API2", href: "#" },
    ],
  },
  {
    title: "Service3",
    children: [
      { name: "Models", href: "#" },
      { name: "Dataset", href: "#" },
      { name: "API", href: "#" },
      { name: "API2", href: "#" },
    ],
  },
  {
    title: "Service4",
    children: [
      { name: "Models", href: "#" },
      { name: "Dataset", href: "#" },
      { name: "API", href: "#" },
      { name: "API2", href: "#" },
    ],
  },
];

export default () => {
  return (
    <div className="footerWrap">
      <div className="bg-footer-wrap">
        <img className="bg-footer" src={bgfooter} alt="" />
      </div>

      <Row className="row navlink">
        <Col xs={24} md={6} className="infoWrap">
          <img src={logo} alt="" className="logo" />
          <div className="info">
            April 10-11, 2024 <br />
            Paris, France
          </div>
        </Col>
        {MenuData.filter((item)=>!item.onlyShowInHeader).map((item) => {
          return <Col xs={24} md={6} className="navWrap" key={item.title}>
            <div className="navTitle">{item.title}</div>
            <div className="navs">
              {item.children.map((nav) => {
                return <div className="navItem" key={nav.title}>
                  <a href={nav.disabled?'':nav.link}>{nav.title}</a>
                </div>
              })
              }
            </div>
          </Col>
        })}

      </Row>
      <Row justify="center" className="row">
        <div className="SignButton">
          <SignUp showLogined={false} />
        </div>
      </Row>
      <Row className=""  justify="center">
        <Col xs={24} md={12} className="Copyright"> ©2024 Copyright  Bitmodel</Col>

      </Row>
      <Row className="bgWrap">
        <img src={footerBg} alt="" className="footerBg" />
      </Row>
    </div>
  );
};
