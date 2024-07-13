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
      "High performance on concurrent processing: Using an optimized UTXO model, MVC is capable of processing millions of transactions per second (TPS), which is critical for running AI models and smart contracts. Thanks to such an advantage, BitModel well matches the computing efficiency of AI systems and ensures fast response of Blockchain-based AI services.",
  },
  {
    bg: bg,
    title: "Layer-1 smart contract (MetaContract)",
    subTitle:
      "Layer-1 smart contract with MetaContract: MVC enjoys a neat implementation of Layer-1 smart contract, which naturally supports automation, validation, and execution of AI models without involving additional efforts. Such an advantage simplifies the transcation process and thereby saves the cost.",
  },
  {
    bg: bg,
    title: "MetaID",
    subTitle:
      "Distributed identity using MetaID: As a built-in function of MVC, MetaID allows users to share a unified identity across various applications. Such a feature facilitates the identity authentication and the privacy protection on BitModel.",
  },
  {
    bg: bg,
    title: "Decentralization and security",
    subTitle:
      "Decentralization and security: MVC adopts the POW consensus mechanism and SHA-256 mining algorithm, same as Bitcoin, ensuring the decentralization and security of the network. Benefiting from such a design, BitModel well protects the security and non-tamperability of AI models, and hence guarantees the transparency and the verifiability of user contributions and serving history.",
  },
  {
    bg: bg,
    title: "Low transaction fees and dynamic expansion",
    subTitle:
      "Low transaction fee and dynamic expansion: One of the goals of MVC is to keep low transaction fee along with the number of users increaseing, or even realize unlimiated expansion. Leveraging such a design, BitModel aims to maintain a low-cost yet high-permance AI ecosystem, encouraging the entire community to contribute to and take advantage of open-sourced AI.",
  },
  {
    bg: bg,
    title: "Support complex AI applications",
    subTitle:
      "Support of complex AI applications: The serving efficiency and the smart contract design of MVC make BitModel a practical platform to build complex AI applications, which may incorporate models from various domains, including natural language processing, computer vision, multi-modality, etc.",
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
      Built upon blockchain techniques, BitModel serves as a general solution to tracing the contributions to AI. We select MicrovisionChain (MVC) as the foundation of Web3, considering its advantages of xxx and xxx.
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

                <div className="cardTitle">{item.title}</div>

                <img src={item.bg} alt="" className="cardIcon" />

                <div className="cardInfo">{item.subTitle}</div>
                <div className="detail-wrapper">
                  <div className="detailTitle">{item.title}</div>
                  <div className="detailInfo">{item.subTitle}</div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
