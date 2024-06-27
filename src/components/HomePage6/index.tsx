

import { useState } from "react";
import "./index.less";

const VALUES = ['2023-04-15', '2023-12-28', '2024-02-16', '2024-04-25', '2024-04-30'];
const EVENTS = [
  {
    date: '2023-04-15',
    title: 'BitModel BREAKPOINT',
    description: 'Event details...',
    image: 'https://i.pinimg.com/564x/d7/db/fc/d7dbfcfb52340d0dd2e5bcf089f3efeb.jpg'
  },
  {
    date: '2023-12-28',
    title: 'BitModel 纯文本样式',
    description: 'Event details...',
    image: 'https://i.pinimg.com/564x/d7/db/fc/d7dbfcfb52340d0dd2e5bcf089f3efeb.jpg'
  },
  {
    date: '2024-02-16',
    title: 'BitModel BREAKPOINT',
    description: 'Event details...',
    image: 'https://i.pinimg.com/564x/d7/db/fc/d7dbfcfb52340d0dd2e5bcf089f3efeb.jpg'
  },
  {
    date: '2024-04-25',
    title: 'BitModel BREAK 图文样式',
    description: 'Event details...',
    image: 'https://i.pinimg.com/564x/d7/db/fc/d7dbfcfb52340d0dd2e5bcf089f3efeb.jpg'
  },
  {
    date: '2024-04-30',
    title: 'BitModel BREAKPOINT',
    description: 'Event details...',
    image: 'https://i.pinimg.com/564x/d7/db/fc/d7dbfcfb52340d0dd2e5bcf089f3efeb.jpg'
  }
];
export default () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <div className="homePage6">
      <div className="pageTitle">RoadMap</div>
      <div className="pageSubTitle">
        BitModel, Cherishing Every Contribution to AGl
      </div>
      {/* <div className="warp">
        <HorizontalTimeline
          index={currentIndex}
          indexClick={(index:number) => setCurrentIndex(index)}
          values={VALUES}
          isKeyboardEnabled={false}
          styles={{
            background: 'rgba(255,255,255,0.3)',
            foreground: 'none',
            outline: 'rgba(255,255,255,0.3)'
          }}
          getLabel={(date:any) => {
            const event = EVENTS.find(e => e.date === date);
            return event ? event.title : date;
          }}
        />
        <div className="event-details">
          <img src={EVENTS[currentIndex].image} alt={EVENTS[currentIndex].title} className="event-image" />
          <div className="event-text">
            <h3>{EVENTS[currentIndex].title}</h3>
            <p>{EVENTS[currentIndex].description}</p>
          </div>
        </div>
      </div> */}
    </div>
  );
};
