import { useMatch } from "umi";
import { useCallback, useEffect, useState } from "react";
import { checkLikeAndDownload, getModel } from "@/services/api";
import { MdEditor, MdCatalog, MdPreview } from 'md-editor-rt';
import 'md-editor-rt/lib/preview.css';
import './index.less';
import { Avatar, Button, Card, Col, Grid, message, Row, Space, Spin } from "antd";
import { CloudDownloadOutlined, EyeOutlined } from "@ant-design/icons";
import coin from '@/assets/coin.png'
import { useModel } from "umi";
import { buyModel } from "@/utils/order";
import { downloadFile } from "@/utils/dowmload";
import Flow from "@/components/Flow";
import Decimal from "decimal.js";
const { useBreakpoint } = Grid;


export default () => {
    const { connected, mvcAddress, initializing, connect } = useModel('global')
    const match = useMatch('/models/:id');
    const id = match!.params.id
    const { md } = useBreakpoint()
    const [loading, setLoading] = useState<boolean>(true);
    const [model, setModel] = useState<API.ModelItem>();
    const [submitting, setSubmitting] = useState<boolean>(false);
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

    const handleBuy = async () => {
        if (!connected) {
            connect();
            return
        };
        setSubmitting(true);
        try {
            if (!model) throw new Error('Model not found');
            if (model.price !== 0) {
                const { data: { list: checkList } } = await checkLikeAndDownload({ model_ids: String(id) });
                if (!checkList[0].is_download) {
                    await buyModel(model.id);
                }
            }
            const file = new URL(model.file_path);
            console.log(file.pathname);
            await downloadFile(model.id, decodeURIComponent(model.file_path));
            message.success('Download success');

        } catch (e: any) {
            console.log(e);
            message.error(e.message);
        }
        setSubmitting(false);
    };
    return <div className='modelPage'>
        <Spin spinning={submitting}  fullscreen />
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
                        <div className="itemText" onClick={(e) => { e.stopPropagation(); }}>
                            <CloudDownloadOutlined /> {model.download}
                        </div>
                        <div className="itemText">
                            <img src={coin} alt="" /> {new Decimal(model.price).div(1e8).toString()}
                        </div>
                    </div>

                </div>
                <div className="download">
                    <Button block key="submit1" type="primary" iconPosition='end' onClick={handleBuy} loading={submitting}> Download </Button>
                </div>
            </div>

            <Card style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 20, padding: 0 }} styles={{ body: { padding: 0 } }} bordered={false}>
                <Row style={{ padding: md ? '0 0px 9px 28px' : 24, flexDirection: md ? 'row' : 'column-reverse' }}>
                    <Col xl={18} md={18} xs={24} style={{ borderRight: md ? '1px solid #866D9B' : 'none' }}>
                        <div className="descTitle">
                            Introduction
                        </div>

                        <MdPreview modelValue={model.description} theme="dark" language="en-US" />
                        <div className="descTitle">
                            Contribution flow
                        </div>
                        <div className="flowWrap">
                            <Flow model_id={model.id} />
                        </div>
                    </Col>
                    <Col xl={6} md={6} style={{ display: 'flex', justifyContent: 'center' }}>
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