import React, { useRef, useState } from "react";
import HomePage1 from "@/components/HomePage1";
import "./index.less";
import HomePage2 from "@/components/HomePage2";
import HomePage3 from "@/components/HomePage3";
import HomePage4 from "@/components/HomePage4";
import HomePage5 from "@/components/HomePage5";
import HomePage6 from "@/components/HomePage6";
import HomePage7 from "@/components/HomePage7";
import HomePage8 from "@/components/HomePage8";
import bg3 from "@/assets/bg-3.png";
import bg4 from "@/assets/bg4.png";
export default function App() {
  return (
    <div className="indexPage animation-slide-bottom">
      <HomePage1 />
      <div className="page23">
        <HomePage2 />
        <img src={bg3} alt="" className="bg3" />
      </div>

      <div className="page34">
        <HomePage3 />
        <HomePage4 />
        <HomePage5 />
        <img src={bg3} alt="" className="bg3" />
        <img src={bg4} alt="" className="bg4" />
      </div>


      <HomePage6 />
      {/* <HomePage7 /> */}
      <HomePage8 />
    </div>
  );
}
