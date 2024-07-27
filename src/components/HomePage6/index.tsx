

import { useState } from "react";
import "./index.less";
import RoodMap from "./RoodMap";

export default () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <div className="homePage6">
      <div className="pageTitle">Roadmap</div>
      <div className="pageSubTitle">
        BitModel, Cherishing Every Contribution to AI
      </div>
      <RoodMap />
    </div>
  );
};
