import { Timeline } from 'antd'
import './roadMap.less'
import { ClockCircleOutlined } from '@ant-design/icons'
const EVENTS = [
    {
        date: '2023-04-15',
        title: 'Version 1.0: ',
        description: 'Model Information Stored in BitModel Blockchain',
        image: 'https://i.pinimg.com/564x/d7/db/fc/d7dbfcfb52340d0dd2e5bcf089f3efeb.jpg'
    },
    {
        date: '2023-12-28',
        title: 'Version 2.0',
        description: 'BitModel supports IMI',
        image: 'https://i.pinimg.com/564x/d7/db/fc/d7dbfcfb52340d0dd2e5bcf089f3efeb.jpg'
    },
    {
        date: '2024-02-16',
        title: 'Version 3.0',
        description: 'BitModel supports AI Model Inference',
        image: 'https://i.pinimg.com/564x/d7/db/fc/d7dbfcfb52340d0dd2e5bcf089f3efeb.jpg'
    },
    {
        date: '2024-04-25',
        title: 'Version 4.0',
        description: 'BitModel Ecosystem for hardware and generated content',
        image: 'https://i.pinimg.com/564x/d7/db/fc/d7dbfcfb52340d0dd2e5bcf089f3efeb.jpg'
    },
    {
        date: '2024-04-30',
        title: 'Version 5.0',
        description: 'BitModel supports IMO',
        image: 'https://i.pinimg.com/564x/d7/db/fc/d7dbfcfb52340d0dd2e5bcf089f3efeb.jpg'
    }
];
export default () => {
    return <div className='roadMapWrap'>

        <div className="roadMap">

            {EVENTS.map((item, index) => {
                return <div className={`timeline-item ${index % 2 === 0 ? 'timeline-item-bottom' : 'timeline-item-top'}`} >
                    <div className='item-card' style={{ backgroundImage: item.image ? `url(${item.image})` : '' }}>

                        <div className="item-content">
                            <div className='title'>
                                {item.title}
                            </div>
                            <div className='description'>
                                {item.description}
                            </div>
                        </div>


                    </div>

                </div>
            })}



        </div>
    </div>
}