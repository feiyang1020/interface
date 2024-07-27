import { ROADMAP_EVENTS } from "@/components/HomePage6/RoodMap"
import { Button, Timeline } from "antd"
import _Roadmap from '@/assets/slider.png'
import bgCard from '@/assets/bg_card.png'
import bg4 from "@/assets/bg4.png";
import bg2 from "@/assets/bg-2@2x (1).png";
import "./index.less"
import { DownloadOutlined } from "@ant-design/icons";


export default () => {
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = window.location.origin + '/BitModel-White-Paper-2.0.pdf';
        link.download = 'BitModel-White-Paper-2.0.pdf';
        console.log(link)
        link.click();
    };
    return <div className="whitePaperPage">
        <img className='bgCard' src={bgCard} alt="" />
        <img src={bg4} alt="" className="bg4" />
        <div className="headerWrap">


            <div className="titleWrap">
                <div className="title">
                    White Paper
                </div>
                <div className="subTitle">
                    Learn more about the value of BitModel
                </div>
            </div>
            <div className="iconWrap">
                <img src={bg2} alt="" className="mask" />
                <img src={_Roadmap} alt="" className="icon" />
            </div>
        </div>
        <div className="whitePaperContent">

        </div>

        <Button block key="submit1" type="primary" style={{ width: 397, height: 88, fontSize: 27, margin: '0 auto', borderRadius: 44, zIndex: 1000 }} onClick={handleDownload} iconPosition='end' icon={<DownloadOutlined />}> Download </Button>

    </div>
}