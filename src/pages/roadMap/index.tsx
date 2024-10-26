import { ROADMAP_EVENTS } from "@/components/HomePage6/RoodMap"
import { Timeline } from "antd"
import _Roadmap from '@/assets/slider.png'
import bgCard from '@/assets/bg_card.png'
import bg4 from "@/assets/bg4.png";
import bg2 from "@/assets/bg-2@2x (1).png";
import "./index.less"


export default () => {
    return <div className="roadMapPage">
        <img className='bgCard' src={bgCard} alt="" />
        <img src={bg4} alt="" className="bg4" />
        <div className="headerWrap">


            <div className="titleWrap">
                <div className="title">
                    Roadmap
                </div>
                <div className="subTitle">
                    Bitmodel, Cherishing Every Contribution to AI
                </div>
            </div>
            <div className="iconWrap">
                <img src={bg2} alt="" className="mask"/>
                <img src={_Roadmap} alt="" className="icon" />
            </div>
        </div>

        <Timeline
            mode="alternate"
            items={ROADMAP_EVENTS.map((event, index) => {
                return {
                    key: index,
                    children: (
                        <div className="event">
                            <div className="title">Version {event.title}</div>
                            <div className="desc">{event.description}</div>
                        </div>
                    )
                }
            })

            }
        />
    </div>
}