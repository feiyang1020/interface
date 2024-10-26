import { ROADMAP_EVENTS } from "@/components/HomePage6/RoodMap"
import { Button, Tabs, TabsProps, Timeline } from "antd"
import _Roadmap from '@/assets/slider.png'
import bgCard from '@/assets/bg_card.png'
import bg4 from "@/assets/bg4.png";
import bg2 from "@/assets/bg-2@2x (1).png";
import "./index.less"
import { DownloadOutlined } from "@ant-design/icons";
import { Typography } from 'antd';
import TermsOfService from "./TermsOfService";
import PrivacyPolicy from "./PrivacyPolicy";
const { Title, Paragraph } = Typography;


const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Terms of Service',
        children: <TermsOfService />,
    },
    {
        key: '2',
        label: 'Privacy Policy',
        children: <PrivacyPolicy />,
    },
];


export default () => {

    return <div className="whitePaperPage">
        <img className='bgCard' src={bgCard} alt="" />
        <img src={bg4} alt="" className="bg4" />
        <div className="headerWrap">


            <div className="titleWrap">
                <div className="title">
                    Privacy
                </div>
                <div className="subTitle">
                    {/* Learn more about the value of Bitmodel */}
                </div>
            </div>
            <div className="iconWrap">
                <img src={bg2} alt="" className="mask" />
                <img src={_Roadmap} alt="" className="icon" />
            </div>
        </div>
        <Tabs defaultActiveKey="1" items={items} style={{ margin: ' 0 auto', zIndex: 4, width: 800, maxWidth: 'calc(100vw - 80px)' }} />




    </div>
}