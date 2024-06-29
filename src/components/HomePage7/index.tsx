import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./index.less";
import { Button, ConfigProvider } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import bg2 from "@/assets/bg2.png";
import { useEffect, useRef } from "react";
export default () => {
  const swiperRef = useRef(null);
  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      // 这里设置初始滑动到第三个滑块（索引为 2）
      // swiperRef.current.swiper.slideTo(3, 0); // 第一个参数是滑块索引，第二个参数是滑动动画持续时间（毫秒）
    }
  }, []);
  return (
    <div className="homePage7">
      <img src={bg2} alt="" className="bg2" />
      <div className="pageTitle">
        Join our
        <br />
        flourishing community
      </div>
      <div className="pageSubTitle"></div>
      <div className="swiperWrap">
        <Swiper
          watchSlidesProgress={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          className="mySwiper2"
          ref={swiperRef}
          autoplay
        >
          <SwiperSlide>Slide 1</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
          <SwiperSlide>Slide 5</SwiperSlide>
          <SwiperSlide>Slide 6</SwiperSlide>
          <SwiperSlide>Slide 7</SwiperSlide>
          <SwiperSlide>Slide 8</SwiperSlide>
          <SwiperSlide>Slide 9</SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};
