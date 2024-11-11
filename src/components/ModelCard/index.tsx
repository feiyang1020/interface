import { Avatar, Card, Image, Space } from "antd"
import {
    LikeOutlined,
    LikeFilled,
    EyeOutlined,
    CloudDownloadOutlined,
    DollarOutlined
} from '@ant-design/icons';
import './index.less'
import coin from '@/assets/coin.png'
import LikeAction from "../LikeAction";
import defaultBg from '@/assets/default.png'
import { getRadomColor } from "../PublishModal/ColorPicker";
import DisLikeAction from "../DisLikeAction";
import { hexToRgba } from "@/utils/utils";
import Decimal from "decimal.js";
type Props = {
    model: API.ModelItem,
    onBuy: (modelId: number) => void,
    onPreview: (model: API.ModelItem) => void,
    onLike: (modelId: number) => void,
    onDislike: (modelId: number) => void,
    onHate: (modelId: number) => void,
    onHateCancel: (modelId: number) => void,
    bgColor?: string
}
export default ({ model, onLike, onBuy, onDislike, onPreview, onHate, onHateCancel, bgColor = "linear-gradient(180deg, #bb40c5 0%, #4451b6 100%)" }: Props) => {
    return <Card onClick={() => onPreview(model)} style={{
        background:
            model.background.indexOf('linear') > -1 ? model.background : getRadomColor(), borderColor: '#636363'
    }} className="modelCardWrap"  >
        <div className="modelCard">
            <img className="cover" src={model.cover || defaultBg} alt={model.name} />
            <div className="info">
                <div>
                    <Space size={10}>
                        <Avatar style={{ backgroundColor: '#8565F2', color: '#fff' }} size={34} src={model.uploader_avatar ? <img src={model.uploader_avatar} alt="avatar" /> : null} > {model.uploader_nickname || model.uploader_address.replace(/(\w{5})\w+(\w{4})/, "$2")}</Avatar>
                        <span className="nickname">
                            {model.uploader_nickname || model.uploader_address.replace(/(\w{5})\w+(\w{5})/, "$1...$2")}
                        </span>
                    </Space>
                    <div className="modelName">{model.name}</div>
                    <div className="date">{model.create_at}</div>
                </div>
                <div className="footerInfo">

                    <div className="item right">
                        <div className="itemText">
                            <EyeOutlined /> {model.click}
                        </div>
                        <div className="itemText" onClick={(e) => { e.stopPropagation(); onBuy(model.id) }}>
                            <CloudDownloadOutlined /> {model.download}
                        </div>
                        <div className="itemText">
                            <img src={coin} alt="" /> {new Decimal(model.price).div(1e8).toString()}
                        </div>
                    </div>
                    <div className="likes">
                        <LikeAction model={model} handleLike={onLike} handleDislike={onDislike} />
                        <DisLikeAction model={model} handleLike={onHate} handleDislike={onHateCancel} />
                    </div>
                </div>

            </div>
        </div>
    </Card>
}