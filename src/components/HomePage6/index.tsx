

import "./index.less";
const events = [
  { date: "2023-12-28", title: "BitModel 纯文本样式", content: "BREAKPOINT" },
  { date: "2024-02-16", title: "BitModel BREAK", content: "BREAKPOINT" },
  {
    date: "2024-04-25",
    title: "BitModel BREAK 图文样式",
    content: "BREAKPOINT",
  },
  { date: "2024-04-30", title: "BitModel BREAK", content: "BREAKPOINT" },
  // { date: "2024-05-31", title: "BitModel BREAK", content: "BREAKPOINT" },
  // { date: "2024-07-31", title: "BitModel BREAK", content: "BREAKPOINT" },
];
export default () => {
  return (
    <div className="homePage6">
      <div className="pageTitle">RoadMap</div>
      <div className="pageSubTitle">
        BitModel, Cherishing Every Contribution to AGl
      </div>
      <div className="warp">
        {/* <VerticalTimeline layout="1-column">
          {events.map((event, index) => (
            <VerticalTimelineElement
              key={index}
              date={event.date}
              iconStyle={{
                background: "rgba(255, 255, 255, .3)",
                color: "rgba(255, 255, 255, .3)",
              }}
            >
              <div className="card">
                <h3 className="vertical-timeline-element-title">
                  {event.title}
                </h3>
                <p>{event.content}</p>
              </div>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline> */}
      </div>
    </div>
  );
};
