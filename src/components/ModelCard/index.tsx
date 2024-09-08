import { Avatar, Image, Space } from "antd"
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
type Props = {
    model: API.ModelItem,
    onBuy: (modelId: number) => void,
    onPreview: (model: API.ModelItem) => void,
    onLike: (modelId: number) => void,
    onDislike: (modelId: number) => void,
}
export default ({ model, onLike, onBuy, onDislike, onPreview }: Props) => {
    return <div className="modelCard" onClick={() => onPreview(model)}>
        <img className="cover" src={model.cover||defaultBg}  alt={model.name}  />
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
                <LikeAction model={model} handleLike={onLike} handleDislike={onDislike} />
                <div className="item right">
                    <div className="itemText">
                        <EyeOutlined /> {model.click}
                    </div>
                    <div className="itemText" onClick={(e) => { e.stopPropagation(); onBuy(model.id) }}>
                        <CloudDownloadOutlined /> {model.download}
                    </div>
                    <div className="itemText">
                        <img src={coin} alt="" /> {model.price}
                    </div>
                </div>
            </div>

        </div>
    </div>
}