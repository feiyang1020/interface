import { Swiper, SwiperSlide   } from "swiper/react";
import { Navigation } from 'swiper/modules';
import bg from "@/assets/servicesIcon.png";
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/navigation';

import "./index.less";
import { Tooltip, Grid } from "antd";
import { useEffect, useMemo, useRef } from "react";
import _H from '@/assets/chain/高性能高并发处理能力 1.png'
import _L from '@/assets/chain/低手续费动态扩容 1.png'
import _J from '@/assets/chain/LAYER_智能合约 1.png'
import _K from '@/assets/chain/结构多维立体 1.png'
import _M from '@/assets/chain/分布式身份1.png'
import _N from '@/assets/chain/去中心化和安全性.png'
const { useBreakpoint } = Grid;
const data = [
  {
    bg: _H,
    title: "High performance on parallel processing",
    subTitle:
      "Using an optimized UTXO architecture, Bitmodel  is capable of handling a high transaction throughput, which is critical for running AI models and smart contracts for a wide range of applications. Thanks to such an advantage, Bitmodel well matches the computing efficiency of AI systems and ensures fast response of blockchain-based AI services.",
  },
  {
    bg: _J,
    title: "Layer-1 smart contract",
    subTitle:
      "Bitmodel enjoys a neat implementation of layer-1 smart contract, which naturally supports automation, validation, and execution of AI models without involving additional efforts. Such an advantage simplifies the transcation process and thereby saves the cost.",
  },
  {
    bg: _M,
    title: "Decentralized identity",
    subTitle:
      "As a built-in function, Bitmodel allows users to share a unified on-chain identity across various applications. Such a feature facilitates the decentralized identity authentication and the protection of data properties on Bitmodel.",
  },
  {
    bg: _N,
    title: "Decentralization and security",
    subTitle:
      "Bitmodel adopts the POW consensus mechanism and SHA-256 mining algorithm, same as Bitcoin, ensuring the decentralization and security of the network. Benefiting from such a design, Bitmodel well protects the security and immutability of AI models, and hence guarantees the transparency and the verifiability of user contributions and serving history.",
  },
  {
    bg: _L,
    title: "Low transaction fee and dynamic scalability",
    subTitle:
      "One of the goals of Bitmodel is to keep low transaction fee along with the number of users increaseing, or even realize unlimiated scaling. Leveraging such a design, Bitmodel aims to maintain a low-cost yet high-permance AI ecosystem, encouraging the entire community to contribute to and take advantage of open-sourced AI.",
  },
  {
    bg: _K,
    title: "Support of complex AI applications",
    subTitle:
      "The serving efficiency and the smart contract design of Bitmodel make it a practical platform to build complex AI applications, which may incorporate models from various domains, including natural language processing, computer vision, multi-modality, etc.",
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
      <div className="pageTitle">Bitmodel Blockchain</div>
      <div className="pageSubTitle">
      Built upon blockchain techniques, Bitmodel serves as a general solution to tracing the contributions to AI, i.e., contribution flows. 
      </div>
      <div className="swiperWrap">
        <Swiper
          slidesPerView={curPerView}
          spaceBetween={30}
          centeredSlides={true}
          className="mySwiper"
          ref={swiperRef}
          modules={[Navigation]}
          // navigation={true}
          navigation= {{
            
            enabled: true,
          }}
         
        >
          {data.map((item) => (
            <SwiperSlide key={item.title}>
              <div className="card">

                <div className="cardTitle">{item.title}</div>

                <div className="cardIcon">
                  <img src={item.bg} alt="" />
                </div>


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
