import { useMatch } from "umi";
import { useCallback, useEffect, useState } from "react";
import { getModel } from "@/services/api";
import { MdEditor, MdCatalog, MdPreview } from 'md-editor-rt';
import 'md-editor-rt/lib/preview.css';
import './index.less';
import { Avatar, Button, Card, Col, Divider, Row, Space, Spin } from "antd";
import { CloudDownloadOutlined, EyeOutlined } from "@ant-design/icons";
import coin from '@/assets/coin.png'


export default () => {

    const match = useMatch('/models/:id');
    const id = match!.params.id
    console.log(id);
    const [loading, setLoading] = useState<boolean>(true);
    const [model, setModel] = useState<API.ModelItem>();
    const _getModel = useCallback(async () => {
        if (!id) return
        setLoading(true)
        const { data } = await getModel({ id: Number(id) })
        if (!data) return
        const describe = data.description;
        // 判断describe是不是链接
        if (describe.includes('http')) {
            data.description = await fetch(describe).then(res => res.text());
            console.log(data.description);
        }
        setLoading(false)
        setModel(data)
    }, [id])
    useEffect(() => {
        _getModel()
    }, [_getModel]);
    const [id1] = useState('preview-only');
    const [scrollElement] = useState(document.documentElement);
    return <div className='modelPage'>
        <Spin spinning={loading}>

        </Spin>
        {model && <div className="modelPageContent">
            <div className="info">
                <div className="infoleft">
                    <div className="titleWrap">
                        <div className="title">
                            {model.name}
                        </div>
                        <div className="likeInfo">

                        </div>

                    </div>
                    <div className="time">
                        <span>{model.create_at}</span>
                    </div>
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
                <div className="download">
                    <Button block key="submit1" type="primary" iconPosition='end' > Download </Button>
                </div>
            </div>

            <Card style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 20, padding: 0 }} styles={{ body: { padding: 0 } }} bordered={false}>
                <Row style={{ padding: '0 0px 9px 28px' }}>
                    <Col md={18} sm={24}  style={{ borderRight: '1px solid #866D9B' }}>
                        <div className="descTitle">
                            Introduction
                        </div>

                        <MdPreview modelValue={model.description} theme="dark" language="en-US" />
                        <div className="descTitle">
                            Contribution flow
                        </div>
                        <div>
                            <Spin spinning={true}>
                            </Spin>
                        </div>
                    </Col>
                    <Col md={6} sm={24} style={{ display: 'flex', justifyContent: 'center' }}>
                        <div className="modelInfoLeft">
                            <Space size={10}>
                                <Avatar style={{ backgroundColor: '#8565F2', color: '#fff' }} size={34} src={model.uploader_avatar ? <img src={model.uploader_avatar} alt="avatar" /> : null} > {model.uploader_nickname || model.uploader_address.replace(/(\w{5})\w+(\w{4})/, "$2")}</Avatar>
                                <span className="nickname">
                                    {model.uploader_nickname || model.uploader_address.replace(/(\w{5})\w+(\w{5})/, "$1...$2")}
                                </span>
                            </Space>
                            <div className="coverWrap">
                                <img className="cover" src={model.cover} alt={model.name} />
                            </div>

                        </div>

                    </Col>
                </Row>

            </Card>



        </div>}
    </div>
}