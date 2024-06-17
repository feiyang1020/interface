import { Col, Row } from "antd";
import { OverPack } from "rc-scroll-anim";
import QueueAnim from "rc-queue-anim";
import logo from "@/assets/logo@2x.png";
import footerBg from "@/assets/footerbg.png";
import "./index.less";
import bgfooter from '@/assets/bg_foooter.png'
import SignUp from "../SignUp";
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
        <Col {...{ xs: 24, sm: 24, md: 24, lg: 9, xl: 9, xxl: 8 }} className="infoWrap">
          <img src={logo} alt="" className="logo" />
          <div className="info">
            April 10-11, 2024 <br />
            Paris, France
          </div>
        </Col>
        {data.map((item, index) => (
          <Col span={4} className="block" key={item.title}>
            <div className="blockTitle">{item.title}</div>
            {item.children.map((child) => (
              <div key={child.name} className="link">
                <a href={child.href} target="_blank">
                  {child.name}
                </a>
              </div>
            ))}
          </Col>
        ))}
      </Row>
      <Row justify="end" className="row">
        <div className="SignButton">
          <SignUp />
        </div>
      </Row>
      <Row className="bgWrap">
        <img src={footerBg} alt="" className="footerBg" />
      </Row>
    </div>
  );
};
