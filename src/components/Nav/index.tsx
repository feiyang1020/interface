import servicesIcon from "@/assets/servicesIcon.png";
import modelsIcon from "@/assets/models.png";
import { Button, Dropdown, DropdownProps, Popover } from "antd";
import { ArrowRightOutlined, DownOutlined } from "@ant-design/icons";
import { history, useLocation } from "umi";
import "./index.less";
import { useEffect, useState } from "react";
import _model from "@/assets/route_slices/Models@2x.png";
import _dataset from '@/assets/route_slices/Dataset@2x.png'
import _api from '@/assets/route_slices/API@2x.png'
import _linkWallet from '@/assets/route_slices/Link Wallet & ldentity Verification@2x.png'
import _manage from "@/assets/route_slices/Manage@2x.png";
import _Develop from '@/assets/route_slices/Develop@2x.png'
import _whitePaper from '@/assets/route_slices/White Paper@2x.png'
import _Roadmap from '@/assets/route_slices/Roadmap@2x.png'
import _Services from '@/assets/route_slices/services.png'
import _Contributors from '@/assets/route_slices/contributors.png'
import _Resources from '@/assets/route_slices/resources 1.png'
export const MenuData = [
  {
    title: "Models",
    link: "/models",
    desc: "Find any popular model here",
    icon: _model,
    disabled: false,
    children: [],
    onlyShowInHeader: true,
  },
  {
    title: "Services",
    desc: "Inspire Bitmodel community to share AI ecosystem resources.",
    link: "/",
    icon: _Services,
    children: [
      {
        title: "Models",
        link: "/models",
        desc: "Find any popular model here",
        icon: _model,
        disabled: false,
      },
      {
        title: "Dataset",
        link: "/dataset",
        desc: "Share training data or selected digital content",
        icon: _dataset,
        disabled: true,
      },
      {
        title: "API",
        link: "/api",
        desc: "Experience interesting AI studios",
        icon: _api,
        disabled: true,
      },
    ],
  },
  {
    title: "Contributors",
    desc: "Build, share, and benefit from Bitmodel AI ecosystem",
    link: "/",
    icon: _Contributors,
    children: [
      {
        title: "Link Wallet & Identity Verification",
        link: "/Link",
        desc: "Pay or receive benefit from Bitmodel contribution flow",
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
    title: "Resources",
    desc: "Find rich information about Bitmodel",
    link: "/",
    icon: _Resources,
    children: [
      {
        title: "White Paper",
        link: "/whitePaper",
        desc: "Learn more about the value of Bitmodel ",
        icon: _whitePaper,
        disabled: false,
      },

      {
        title: "Roadmap",
        link: "/roadmap",
        desc: "Follow and join us!",
        icon: _Roadmap,
        disabled: false,
      },
      {
        title: "Privacy",
        link: "/privacy",
        desc: "Learn more about the value of Bitmodel ",
        icon: _whitePaper,
        disabled: false,
      },

    ],
  },
];

export default () => {
  const location = useLocation();
  const path = location.pathname;
  const [curMenu, setCurMenu] = useState<string>();
  const handleOpenChange: DropdownProps['onOpenChange'] = (nextOpen, info) => {
    if (info.source === 'trigger' || nextOpen) {
      setCurMenu(undefined);
    }
  };

  useEffect(() => {
    if (path) {  // 可以排除不需要置顶的页面
      if (document?.documentElement || document?.body) {
        document.documentElement.scrollTop = document.body.scrollTop = 0;  // 切换路由时手动置顶
      }
    }
  }, [path]);
  return (
    <div className="navWrap">
      {MenuData.map((item) => (
        <>
          {item.onlyShowInHeader ? <div className={`nav ${path === item.link ? "active" : ""}`} onClick={() => {
            history.push(item.link)
          }}>
            {item.title}
          </div> :

            <Dropdown
              key={item.title}
              // open={curMenu === item.title}
              onOpenChange={handleOpenChange}
              placement="bottom"
              trigger={["click",'hover']}
              dropdownRender={() => (
                <div className="navDetail">
                  <div className="desc">
                    <div className="title">{item.title}</div>
                    <div className="subtitle">{item.desc}</div>
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
            </Dropdown>}</>
      ))}
    </div>
  );
};
