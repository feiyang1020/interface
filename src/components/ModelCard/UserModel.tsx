import { Avatar, Button, Card, Image, message, Space } from "antd"
import {
    LikeOutlined,
    LikeFilled,
    EyeOutlined,
    CloudDownloadOutlined,
    DollarOutlined,
    DislikeFilled,
    DislikeOutlined
} from '@ant-design/icons';
import './index.less'
import coin from '@/assets/coin.png'
import LikeAction from "../LikeAction";
import defaultBg from '@/assets/default.png'
import { getRadomColor } from "../PublishModal/ColorPicker";
import DisLikeAction from "../DisLikeAction";
import { hexToRgba } from "@/utils/utils";
import { useCallback, useEffect, useState } from "react";
import { claimToken, fetchUserClaimableTokenInfo } from "@/utils/bitmodel";
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
    const [loading, setLoading] = useState<boolean>(true);
    const [claimInfo, setClaimInfo] = useState<any>({
        balance: 0,
        deployInfo: {}
    });
    const _getClaimInfo = useCallback(async () => {
        const { id } = model;
        const data = await fetchUserClaimableTokenInfo(id);
        setClaimInfo(data);
        setLoading(false);

    }, [model])

    useEffect(() => {
        _getClaimInfo()
    }, [_getClaimInfo])

    const handleClaim = async () => {
        console.log('claim');
        // if (claimInfo.balance === 0) return;
        setLoading(true);
        try {
            await claimToken(model.id)
            await _getClaimInfo()
        } catch (e) {
            console.log(e);
            message.error(e.message)
        }

        setLoading(false);
    }

    return <Card onClick={() => onPreview(model)} style={{ background: model.background.indexOf('linear') > -1 ? model.background : getRadomColor(), borderColor: '#636363' }} className="modelCardWrap">
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
                            <LikeOutlined /> {model.like}
                        </div>
                        <div className="itemText">
                            <DislikeOutlined /> {model.hate}
                        </div>
                        <div className="itemText">
                            <EyeOutlined /> {model.click}
                        </div>
                        <div className="itemText">
                            <CloudDownloadOutlined /> {model.download}
                        </div>
                        <div className="itemText">
                            <img src={coin} alt="" /> {new Decimal(model.price).div(1e8).toString()}
                        </div>
                    </div>


                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 4, marginTop: 12 }}>
                    <div className="cliamable" style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'nowrap', whiteSpace: 'nowrap' }}>
                        Your Contribution:  <img src={coin} alt="" width={16} height={16} />{claimInfo.balance}
                    </div>
                    <Button loading={loading}  disabled={claimInfo.balance===0} style={{ height: 24, fontSize: 8 }} type='primary' onClick={(e) => { e.stopPropagation(); handleClaim() }} > Claim </Button>
                </div>


            </div>
        </div>
    </Card>
}