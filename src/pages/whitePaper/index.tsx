import { ROADMAP_EVENTS } from "@/components/HomePage6/RoodMap"
import { Button, Timeline } from "antd"
import _Roadmap from '@/assets/slider.png'
import bgCard from '@/assets/bg_card.png'
import bg4 from "@/assets/bg4.png";
import bg2 from "@/assets/bg-2@2x (1).png";
import "./index.less"
import { DownloadOutlined } from "@ant-design/icons";
import Content from "./Content";

export default () => {

    return <div className="whitePaperPage">
        <img className='bgCard' src={bgCard} alt="" />
        <img src={bg4} alt="" className="bg4" />
        <div className="headerWrap">


            <div className="titleWrap">
                <div className="title">
                Bitmodel White Paper
                </div>
                <div className="subTitle">
                    Learn more about the value of Bitmodel
                </div>
            </div>
            <div className="iconWrap">
                <img src={bg2} alt="" className="mask" />
                <img src={_Roadmap} alt="" className="icon" />
            </div>
        </div>
        <div style={{ margin: ' 0 auto', zIndex: 4, width: 800, maxWidth: '100vw' }}>
            <Content />
        </div>


    </div>
}