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
import _BVM from '@/assets/core_values/Bitcoin Virtual Machine.png'
import _MN from '@/assets/core_values/Model Network1.png'
import _R from '@/assets/core_values/Rationalizing the Contribution Mechanism of Artificial Intelligence.png.png'
import _D from '@/assets/core_values/Decentralized AGI Infrastructure.png'
import _C from '@/assets/core_values/Unified Custom Agent Development Framework.png'

Swiper.use([Navigation, Pagination, EffectCreative]);

type Props = {
  className?: string;
  children: React.ReactNode;
};

const data = [
  {
    bg: _BVM,
    title: "Bitcoin Virtual Machine（BVM）",
    subTitle:
      "As the foundation of BitModel, BVM provides a safe and decentralized environment to run scripts following the Bitcoin protocol. Compared with the Ethereum virtual machine (EVM), BVM enjoys stronger scalability, making it an ideal platform to deal with high-volume transactions and complex computing required by AGI. In addition, built with OP_PUSH_TX and MetaTxid, BVM naturally supports Turing-complete smart contracts. It is also noteworthy that, thanks to the discrete state in UTXO, the smart contracts implemented on BVM are more independent to each other than those implemented on EVM, and hence lead to higher performance on concurrent computing.",
  },
  {
    bg: _MN,
    title: "Model Network",
    subTitle:
      "BitModel aims to organize AI algorithms into a direcional graph, recording the reliance between various techniques. In this way, we are able to trace how a technique contributes to an AI service, making sure not only the customer-side models (e.g., ChatGPT and Stable Diffusion) but more importantly the underlying techniques (e.g., Transformer and Diffusion) could be adequately rewarded. Such an incentive mechanism is expected to inspire all levels of studies towards AGI, stimulate continuous development of high-quality models, and encourage community cooperation.",
  },
  {
    bg: _R,
    title: "Rationalizing the Contribution Mechanism of Artificial Intelligence",
    subTitle:
      "BitModel unifies different types of data based on the same blockchain-based infrastructure. In this way, we are able to develop the entire AI pipeline (e.g., data collection, algorithm design, model serving, etc.) on the blockchain, and further precisely quantify and monetize all kinds of contributions to AGI with the help of smart contracts. Such a design enables a healthy and sustainable AI ecosystem with a sound reward mechanism.",
  },
  {
    bg: _D ,
    title: "Decentralized AI Infrastructure",
    subTitle:
      "To address the issue of limited computation resources, our platform adopts a decentralized computing strategy, which is able to distribute model serving to scattered resources and hence improve the accessibility of large-scale AI models. Such a design encourages the contribution to and the application of AGI. The same strategy is also applicable to alleviating the problem of data scarcity.",
  },
  {
    bg: _C,
    title: "Unified Custom Agent Development Framework",
    subTitle:
      "Committed to support worldwide AI applications, our platform adopts a unified and standardized framework for Agent development, in which way we manage to build up a highly efficient AI ecosystem, maximize the practical value of AI models, and simplify the development of AI services.",
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
    renderBullet: function (index: number, className: string) {
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
      centeredSlides: true,

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
        horizontalClass: 'eeee',
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + "</span>";
        },
      },

      on: {
        setTranslate(s) {
          const slides = s.slides;
          slides.forEach((slideEl: any) => {
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
          slides.forEach((slideEl: any) => {
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
