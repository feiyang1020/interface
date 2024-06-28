import servicesIcon from "@/assets/servicesIcon.png";
import modelsIcon from "@/assets/models.png";
import { Button, Dropdown, Popover } from "antd";
import { ArrowRightOutlined, DownOutlined } from "@ant-design/icons";
import { history,useLocation } from "umi";
import "./index.less";
import { useState } from "react";
export const MenuData = [
  {
    title: "Services ",
    desc: "BitModel   Valuing Every Contribution to AGl",
    link: "/",
    icon: servicesIcon,
    children: [
      {
        title: "Models",
        link: "/services",
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
        title: "API",
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
        title: "Link Wallet & Identity Verification",
        link: "/Link",
        desc: "BitModel   Valuing Every Contribution to AGl",
        icon: modelsIcon,
        disabled: true,
      },
      {
        title: "Manage",
        link: "/Manage",
        desc: "BitModel   Valuing Every Contribution to AGl",
        icon: modelsIcon,
        disabled: true,
      },
      {
        title: "Develop",
        link: "/Develop",
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
        title: "Roadmap",
        link: "/Roadmap",
        desc: "BitModel   Valuing Every Contribution to AGl",
        icon: modelsIcon,
        disabled: true,
      },

    ],
  },
];

export default () => {
  const location = useLocation();
  const path = location.pathname;
  const [curMenu, setCurMenu] = useState<string>();
  return (
    <div className="navWrap">
      {MenuData.map((item) => (
        <Dropdown
          key={item.title}
          open={curMenu === item.title}
          placement="bottom"
          dropdownRender={() => (
            <div className="navDetail">
              <div className="desc">
                <div className="title">{item.title}</div>
                <div className="subtitle">{item.desc}</div>
                <div className="link">
                  <a href={item.link}>Learn More</a>{" "}
                  <ArrowRightOutlined className="arrow" />
                </div>
                <div className="nav">
                  <img src={item.icon} alt="" className="navIcon" />
                </div>
              </div>
              <div className="navs">
                {item.children.map((nav) => (
                  <div
                    className={`btnWrap ${nav.disabled ? "disabaled" : ""} ${path === nav.link? "active" : ""}`}
                    key={nav.title}
                    onClick={() => {
                      if (!nav.disabled) {
                        setCurMenu(undefined)
                        history.push(nav.link)
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
            </div>
          )}
        >
          <div className="nav" onClick={() => {
            if (curMenu !== item.title) {
              setCurMenu(item.title)
            } else {
              setCurMenu(undefined)

            }
          }}>
            {item.title}
            <DownOutlined className="icon" />
          </div>
        </Dropdown>
      ))}
    </div>
  );
};
