import nekyReport from "./utils/collect.js";
nekyReport.init({
    url: "https://api-dev.bitmodel.ai/api/pub/event_tracking.gif", //采集地址，采用发送一张1x1的图片带上参数进行数据采集
    isClick: true, //是否全量点击，监听整个页面所有的点击事件
    uid: "", //采集用户的ID，默认为空，用户数据也可在后续的回调中带上
    channel: '',
    clickAttr: {},
    version: "1.0.1",
});