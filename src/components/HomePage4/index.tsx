import { Swiper, SwiperSlide } from "swiper/react";
import bg from "@/assets/servicesIcon.png";
import "swiper/css";
import "swiper/css/pagination";

import "./index.less";
import { Tooltip, Grid } from "antd";
import { useEffect, useMemo, useRef } from "react";
const { useBreakpoint } = Grid;
const data = [
  {
    bg: bg,
    title: "High performance and high concurrent processing capability",
    subTitle:
      " MVC adopts an optimized UTXO model and high-performance super nodes, which can handle millions of TPS (transactions per second), which is crucial for the data management of AI models and the execution of smart contracts. BitModel can take advantage of this feature of MVC to ensure that the calculation process of the AI model is carried out efficiently and quickly, thereby improving the response speed and processing capability of the entire AI system.",
  },
  {
    bg: bg,
    title: "Layer-1 smart contract (MetaContract)",
    subTitle:
      "MVC innovatively realizes the Layer-1 smart contract on the UTXO model, which means that BitModel can directly deploy and execute the smart contract at the basic infrastructure of MVC without additional solutions. This provides strong support for the automation, validation, and execution of the AI model, while also reducing transaction costs and complexity.）",
  },
  {
    bg: bg,
    title: "MetaID",
    subTitle:
      "MVC has built-in MetaID, which is a distributed identity protocol that allows users to use across applications under a unified identity. BitModel can use MetaID to ensure the identity authentication and data privacy of users and contributors of the AI model, while promoting the interconnection and interoperability of data.",
  },
  {
    bg: bg,
    title: "Decentralization and security",
    subTitle:
      "MVC adopts the same POW consensus mechanism and SHA-256 mining algorithm as Bitcoin, ensuring the decentralization and security of the network. BitModel can rely on this feature of MVC to protect the security and non-tamperability of the AI model, ensuring that the contribution and use records of the model are transparent and verifiable",
  },
  {
    bg: bg,
    title: "Low transaction fees and dynamic expansion",
    subTitle:
      "One of the design goals of MVC is to reduce transaction fees as the number of users increases, while having the ability to expand without limits. BitModel can take advantage of this advantage to reduce transaction costs, attract more users and developers to participate in the contribution and use of AI models, and at the same time ensure that as the scale of the application expands, the system can still maintain high performance.",
  },
  {
    bg: bg,
    title: "Support complex AI applications",
    subTitle:
      "The high performance and smart contract capabilities of MVC make it an ideal platform for building complex AI applications. BitModel can rely on these features of MVC to develop and deploy complex AI models, such as deep learning, natural language processing, etc., while ensuring the efficient operation and interoperability of these models.）",
  },
];
export default () => {
  const screens = useBreakpoint();
  const curPerView = useMemo(() => {
    const map = {
      xxl: 5,
      xl: 4,
      lg: 3,
      md: 2,
      sm: 1,
      xs: 1,
    };
    if (screens.xxl) return map.xxl;
    if (screens.xl) return map.xl;
    if (screens.lg) return map.lg;
    if (screens.md) return map.md;
    if (screens.sm) return map.sm;
    if (screens.xs) return map.xs;
    return 5;
  }, [screens]);
  const swiperRef = useRef<any>(null);
  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(1, 0);
    }
  }, []);
  return (
    <div className="homePage4">
      <div className="pageTitle">BitModel Blockchain</div>
      <div className="pageSubTitle">
        BitModel, Cherishing Every Contribution to AI
      </div>
      <div className="swiperWrap">
        <Swiper
          slidesPerView={curPerView}
          spaceBetween={30}
          centeredSlides={true}
          className="mySwiper"
          ref={swiperRef}
        >
          {data.map((item) => (
            <SwiperSlide key={item.title}>
              <div className="card">
                <Tooltip title={item.title}>
                  <div className="cardTitle">{item.title}</div>
                </Tooltip>
                <img src={item.bg} alt="" className="cardIcon" />
                <Tooltip title={item.subTitle}>
                  <div className="cardInfo">{item.subTitle}</div>
                </Tooltip>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
