import servicesIcon from "@/assets/servicesIcon.png";
import modelsIcon from "@/assets/models.png";
import { Button, Dropdown, Popover } from "antd";
import { ArrowRightOutlined, DownOutlined } from "@ant-design/icons";
import { history, useLocation } from "umi";
import "./index.less";
import { useState } from "react";
import _model from "@/assets/route_slices/Models@2x.png";
import _dataset from '@/assets/route_slices/Dataset@2x.png'
import _api from '@/assets/route_slices/API@2x.png'
import _linkWallet from '@/assets/route_slices/Link Wallet & ldentity Verification@2x.png'
import _manage from "@/assets/route_slices/Manage@2x.png";
import _Develop from '@/assets/route_slices/Develop@2x.png'
import _whitePaper from '@/assets/route_slices/White Paper@2x.png'
import _Roadmap from '@/assets/route_slices/Roadmap@2x.png'
export const MenuData = [
  {
    title: "Services ",
    desc: "Inspire BitModel community to share AI ecosystem resources.",
    link: "/",
    icon: servicesIcon,
    children: [
      {
        title: "Models",
        link: "/services",
        desc: "Find any popular model here",
        icon: _model,
        disabled: false,
      },
      {
        title: "Dataset",
        link: "/models",
        desc: "Share training data or selected digital content",
        icon: _dataset,
        disabled: true,
      },
      {
        title: "API",
        link: "/models",
        desc: "Experience interesting AI studios",
        icon: _api,
        disabled: true,
      },
    ],
  },
  {
    title: "Contributors  ",
    desc: "Build, share, and benefit from BitModel AI ecosystem",
    link: "/",
    icon: servicesIcon,
    children: [
      {
        title: "Link Wallet & Identity Verification",
        link: "/Link",
        desc: "Pay or receive benefit from BitModel contribution flow",
        icon: _linkWallet,
        disabled: true,
      },
      {
        title: "Manage",
        link: "/Manage",
        desc: "Check income by your AI assets ",
        icon: _manage,
        disabled: true,
      },
      {
        title: "Develop",
        link: "/Develop",
        desc: "Share your model, data or computing resource",
        icon: _Develop,
        disabled: true,
      },
    ],
  },
  {
    title: "Resources ",
    desc: "Find rich information about BitModel",
    link: "/",
    icon: servicesIcon,
    children: [
      {
        title: "White Paper",
        link: "/WhitePaper",
        desc: "Learn more about the value of BitModel ",
        icon: _whitePaper,
        disabled: true,
      },

      {
        title: "Roadmap",
        link: "/Roadmap",
        desc: "Follow and join us!",
        icon: _Roadmap,
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
                {/* <div className="link">
                  <a href={item.link}>Learn More</a>{" "}
                  <ArrowRightOutlined className="arrow" />
                </div> */}
                <div className="nav">
                  <img src={item.icon} alt="" className="navIcon" />
                </div>
              </div>
              <div className="navs">
                {item.children.map((nav) => (
                  <div
                    className={`btnWrap ${nav.disabled ? "disabaled" : ""} ${path === nav.link ? "active" : ""}`}
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
