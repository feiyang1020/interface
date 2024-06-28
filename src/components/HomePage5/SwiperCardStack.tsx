import React, { useLayoutEffect, useRef } from "react";
import Swiper from "swiper";
import bg from "@/assets/servicesIcon.png";
import {
  Navigation,
  Pagination,
  A11y,
  EffectCreative,
  EffectCards,
  EffectFlip,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-creative";

import "./index.less";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

Swiper.use([Navigation, Pagination, EffectCreative]);

type Props = {
  className?: string;
  children: React.ReactNode;
};

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

const MainSlide = ({ className = "", children }: Props) => {
  return (
    <div className={`swiper-slide   ${className || ""}`}>
      <div className="header-swiper-shadow " />
      {children}
    </div>
  );
};

export default () => {
  const isMobile = useRef(false);
  const swiperMain = useRef<any>(null);
  const pagination = {
    clickable: true,
    renderBullet: function (index:number, className:string) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };
  const getCreativeTranslates = () => {
    const w = window.innerWidth;
    isMobile.current = w < 768;
    return {
      prev: {
        translate: w < 768 ? ["-120%", 0, 0] : [0, -30, -1],
        scale: w < 768 ? 1 : 0.97,
      },
      next: {
        translate: w < 768 ? [0, -30, -1] : ["120%", 0, 0],
        scale: w < 768 ? 0.97 : 1,
      },
    };
  };

  const createSwipers = () => {
    const { prev, next } = getCreativeTranslates();
    swiperMain.current = new Swiper(".header-swiper-main", {
      slidesPerView: 1,
      effect: "creative",
      grabCursor: true,
      watchSlidesProgress: true,
      centeredSlides:true,

      creativeEffect: {
        perspective: true,
        limitProgress: 5,
        prev: {
          shadow: false,
          translate: prev.translate,
          rotate: [0, 0, 0],
          scale: prev.scale,
        },
        next: {
          shadow: false,
          translate: next.translate,
          scale: next.scale,
        },
      },
      speed: 300,
      observer: true,
      observeParents: true,
      pagination: {
        el: ".header-swiper-main .swiper-pagination",
        clickable: true,
        horizontalClass:'eeee',
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + "</span>";
        },
      },

      on: {
        setTranslate(s) {
          const slides = s.slides;
          slides.forEach((slideEl:any) => {
            const progress = slideEl.progress;
            const shadowEl = slideEl.querySelector(".header-swiper-shadow");
            const isM = isMobile.current;
            const setShadowOpacity = isM ? progress < 0 : progress > 0;
            if (!shadowEl) return;
            if (setShadowOpacity) {
              const perSlide = 1 / (slides.length - 1);
              shadowEl.style.opacity = perSlide * Math.abs(progress);
            } else {
              shadowEl.style.opacity = 0;
            }
          });
        },
        setTransition(s, duration) {
          const slides = s.slides;
          slides.forEach((slideEl:any) => {
            const shadowEl = slideEl.querySelector(".header-swiper-shadow");
            shadowEl.style.transitionDuration = `${duration}ms`;
          });
        },
      },
    });
    swiperMain.current.slideTo(2, 0)
  };

  const onResize = () => {
    if (swiperMain.current && swiperMain.current.params) {
      const { prev, next } = getCreativeTranslates();
      Object.assign(swiperMain.current.params.creativeEffect.prev, prev);
      Object.assign(swiperMain.current.params.creativeEffect.next, next);
    }
  };

  const destroySwipers = () => {
    if (swiperMain.current) swiperMain.current.destroy();
  };

  useLayoutEffect(() => {
    createSwipers();
    window.addEventListener("resize", onResize);
    return () => {
      destroySwipers();
      window.removeEventListener("resize", onResize);
    };
  });
  
  return (
    <div className="swiper header-swiper-main " style={{ overflow: "visible" }}>
      <div className="swiper-pagination"></div>
      <div className="swiper-wrapper">
        {data.map((item) => (
          <MainSlide key={item.title}>
            <div className="left">
              <div className="title">{item.title}</div>
              <div className="subTitle">{item.subTitle}</div>
            </div>

            <img src={item.bg} alt="" className="icon" />
          </MainSlide>
        ))}
      </div>
    </div>
  );
};
