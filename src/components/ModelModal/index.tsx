import { Avatar, Button, Col, ConfigProvider, Modal, Row, Space } from "antd"
import {
    LikeOutlined,
    LikeFilled,
    EyeOutlined,
    CloudDownloadOutlined,
    DollarOutlined
} from '@ant-design/icons';
import './index.less'
import coin from '@/assets/coin.png'
import { useModel } from "umi";
import LikeAction from "../LikeAction";
type Props = {
    open: boolean,
    onClose: () => void,
    model: API.ModelItem | undefined,
    onBuy: (modelId: number) => void,
    onLike: (modelId: number) => void,
    onDislike: (modelId: number) => void,
}
export default ({ model, open, onClose, onLike, onBuy, onDislike }: Props) => {
    const { connected, connect } = useModel('global')
    if (!model || !open) return <></>
    return <Modal
        open={open}
        width={620}
        onCancel={onClose}
        closable={false}
        styles={{ mask: { 'backdropFilter': 'blur(20px)' } }}
        footer={null}
    > <Row className="modelModal">
            <Col md={12} span={24}>
                <img src={model.cover} alt={model.name} />
            </Col>

            <Col className="info">
                <div>
                <Space size={10}>
                    <Avatar style={{ backgroundColor: '#8565F2', color: '#fff' }} size={34} src={model.uploader_avatar ? <img src={model.uploader_avatar} alt="avatar" /> : null} > {model.uploader_nickname || model.uploader_address.replace(/(\w{5})\w+(\w{4})/, "$2")}</Avatar>
                    <span className="nickname">
                        {model.uploader_nickname || model.uploader_address.replace(/(\w{5})\w+(\w{5})/, "$1...$2")}
                    </span>
                </Space>
                    <div className="modelName">{model.name}</div>
                    <div className="modelDes">{model.description}</div>
                    <div className="date">{model.create_at}</div>
                </div>
                <div className="bottom">
                    <ConfigProvider
                        theme={{
                            components: {
                                Button: {
                                    primaryShadow: "0 0px 0 rgba(0, 0, 0, 0)",
                                    colorPrimary: `rgba(255, 255, 255, 0.40)`,
                                    colorPrimaryHover: `linear-gradient(270deg, #B193CB, #60E4DE)`,
                                    colorPrimaryActive: `linear-gradient(270deg, #B193CB, #60E4DE)`,
                                    lineWidth: 0,
                                },
                            },
                        }}
                    >
                        {
                            connected ? <Button type="primary" shape="round" size='large' block style={{ marginBottom: 40 }} onClick={() => { onBuy(model.id) }}>Download</Button> : <Button type="primary" shape="round" size='large' block style={{ marginBottom: 40 }} onClick={connect}>Connect</Button>
                        }

                    </ConfigProvider>


                    <div className="footerInfo">
                        <LikeAction model={model}  handleLike={onLike} handleDislike={onDislike}/>
                        <div className="item right">
                            <div className="itemText">
                                <EyeOutlined /> {model.click}
                            </div>
                            <div className="itemText" onClick={() => { onBuy(model.id) }}>
                                <CloudDownloadOutlined /> {model.download}
                            </div>
                            <div className="itemText">
                                <img src={coin} alt="" /> {model.price}
                            </div>
                        </div>
                    </div>
                </div>

            </Col></Row>
    </Modal>
}