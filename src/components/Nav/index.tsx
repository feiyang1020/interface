import servicesIcon from "@/assets/servicesIcon.png";
import modelsIcon from "@/assets/models.png";
import { Button, Dropdown, Popover } from "antd";
import { ArrowRightOutlined, DownOutlined } from "@ant-design/icons";
import "./index.less";
const data = [
  {
    title: "Services ",
    desc: "BitModel   Valuing Every Contribution to AGl",
    link: "/",
    icon: servicesIcon,
    children: [
      {
        title: "Models",
        link: "/models",
        desc: "BitModel   Valuing Every Contribution to AGl",
        icon: modelsIcon,
        disabled: false,
      },
      {
        title: "Dataset",
        link: "/models",
        desc: "BitModel   Valuing Every Contribution to AGl",
        icon: modelsIcon,
        disabled: true,
      },
      {
        title: "Models",
        link: "/models",
        desc: "BitModel   Valuing Every Contribution to AGl",
        icon: modelsIcon,
        disabled: true,
      },
    ],
  },
  {
    title: "Contributors  ",
    desc: "BitModel   Valuing Every Contribution to AGl",
    link: "/",
    icon: servicesIcon,
    children: [
      {
        title: "Models",
        link: "/models",
        desc: "BitModel   Valuing Every Contribution to AGl",
        icon: modelsIcon,
        disabled: false,
      },
      {
        title: "Dataset",
        link: "/models",
        desc: "BitModel   Valuing Every Contribution to AGl",
        icon: modelsIcon,
        disabled: true,
      },
      {
        title: "Models",
        link: "/models",
        desc: "BitModel   Valuing Every Contribution to AGl",
        icon: modelsIcon,
        disabled: true,
      },
    ],
  },
  {
    title: "Resources ",
    desc: "BitModel   Valuing Every Contribution to AGl",
    link: "/",
    icon: servicesIcon,
    children: [
      {
        title: "Models",
        link: "/models",
        desc: "BitModel   Valuing Every Contribution to AGl",
        icon: modelsIcon,
        disabled: false,
      },
      {
        title: "Dataset",
        link: "/models",
        desc: "BitModel   Valuing Every Contribution to AGl",
        icon: modelsIcon,
        disabled: true,
      },
      {
        title: "Models",
        link: "/models",
        desc: "BitModel   Valuing Every Contribution to AGl",
        icon: modelsIcon,
        disabled: true,
      },
    ],
  },
];

export default () => {
  return (
    <div className="navWrap">
      {data.map((item) => (
        <Dropdown
          key={item.title}
          placement="bottom"
          dropdownRender={() => (
            <div className="navDetail">
              <div className="desc">
                <div className="title">{item.title}</div>
                <div className="subtitle">{item.desc}</div>
                <div className="link">
                  <a href={item.link}>Learn More</a> <ArrowRightOutlined className="arrow"/>
                </div>
                <div className="nav">
                  <img src={item.icon} alt="" className="navIcon" />
                </div>
              </div>
              <div className="navs">
                {item.children.map((nav) => (
                  <div className="btnWrap" key={nav.title}>
                    <img src={nav.icon} alt="" className="icon" />
                    <div className="navText">
                      <div className="name">{item.title}</div>
                      <div className="sub">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        >
          <div className="nav">
            {item.title}
            <DownOutlined className="icon" />
          </div>
        </Dropdown>
      ))}
    </div>
  );
};
