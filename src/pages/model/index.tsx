import { useMatch } from "umi";
import { useCallback, useEffect, useState } from "react";
import { getModel } from "@/services/api";
import { MdEditor, MdCatalog, MdPreview } from 'md-editor-rt';
import 'md-editor-rt/lib/preview.css';
import './index.less';
import { Card, Col, Divider, Row, Spin } from "antd";


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
            {
                model.name
            }
            <Card style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 20, padding: 0 }} styles={{ body: { padding: 0 } }} bordered={false}>
                <Row style={{padding:'0 28px'}}>
                    <Col span={18} style={{ borderRight: '1px solid #866D9B' }}>
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
                    <Col span={6}>
                        
                        
                    </Col>
                </Row>

            </Card>



        </div>}
    </div>
}