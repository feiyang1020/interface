import { Timeline } from 'antd'
import './roadMap.less'
import { ClockCircleOutlined, UpOutlined } from '@ant-design/icons'
import v1 from '@/assets/Mask group.png'
import v2 from '@/assets/Mask group (1).png'
import v5 from '@/assets/a7ea21d220ae1a87c300eda27ba338af.jpg'
export const ROADMAP_EVENTS = [
    {
        date: '2023-04-15',
        title: '1.0',
        description: 'BitModel for open-sourced models with contribution flows',
        image: v1,
        className: 'bgImage'
    },
    {
        date: '2023-12-28',
        title: '2.0',
        description: 'BitModel supports Initial Model Investing (IMI) ',
        image: v2,
        className: 'bgImage contentRow'
    },
    {
        date: '2024-02-16',
        title: '3.0',
        description: 'BitModel supports model inference',
        image: '',
        className: 'linearGradient'
    },
    {
        date: '2024-04-25',
        title: '4.0',
        description: 'BitModel ecosystem for generated content',
        image: '',
        className: ''
    },
    {
        date: '2024-04-30',
        title: '5.0',
        description: 'BitModel supports IMO and launches the main network. ',
        image: v5,
        className: 'bgImage contentRow opacity'
    }
];
export default () => {
    return <div className='roadMapWrap'>

        <div className="roadMap">

            {ROADMAP_EVENTS.map((item, index) => {
                return <div className={`timeline-item ${index % 2 === 0 ? 'timeline-item-bottom' : 'timeline-item-top'}`} >
                    <div className="line">
                        <div className="arrow">
                            <UpOutlined />
                        </div>
                    </div>
                    <div className={`item-card ${item.className}`} >

                        <div className="item-content">
                            <div className='titleWrap'>
                                <div className="title">
                                    {item.title}
                                </div>

                                <div className="subtitle">
                                    version
                                </div>
                            </div>
                            <div className='description'>
                                {item.description}
                            </div>
                        </div>
                        {
                            item.image && <div className='image'>
                                <img src={item.image} alt="" />
                            </div>
                        }


                    </div>

                </div>
            })}



        </div>
    </div>
}