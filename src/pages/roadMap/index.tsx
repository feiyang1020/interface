import { ROADMAP_EVENTS } from "@/components/HomePage6/RoodMap"
import { Timeline } from "antd"
import _Roadmap from '@/assets/route_slices/Roadmap@2x.png'
import bgCard from '@/assets/bg_card.png'
import bg4 from "@/assets/bg4.png";
import "./index.less"


export default () => {
    return <div className="roadMapPage">
         <img className='bgCard' src={bgCard} alt="" />
         <img src={bg4} alt="" className="bg4" />
        <div className="headerWrap">


            <div className="titleWrap">
                <div className="title">
                    RoadMap
                </div>
                <div className="subTitle">
                    Follow and join us!
                </div>
            </div>
            <div className="icon">
                <img src={_Roadmap} alt="" />
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