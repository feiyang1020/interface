import { useMatch } from "umi";
import { useCallback, useEffect, useState } from "react";
import { getModel } from "@/services/api";
import { MdEditor, MdCatalog, MdPreview } from 'md-editor-rt';
import 'md-editor-rt/lib/preview.css';
import './index.less';


export default () => {

    const match = useMatch('/models/:id');
    const id = match!.params.id
    console.log(id);
    const [loading, setLoading] = useState<boolean>(true);
    const [model, setModel] = useState<API.ModelItem>();
    const _getModel = useCallback(async () => {
        if (!id) return
        const { data } = await getModel({ id: Number(id) })
        if (!data) return
        const describe = data.description;
        // 判断describe是不是链接
        if (describe.includes('http')) {
            data.description = await fetch(describe).then(res => res.text());
            console.log(data.description);
        }
        setModel(data)
    }, [id])
    useEffect(() => {
        _getModel()
    }, [_getModel]);
    const [id1] = useState('preview-only');
    const [scrollElement] = useState(document.documentElement);
    return <div className='roadMapWrap'>
        {model && <div className='roadMapContent'>
            {
                model.name
            }

            <MdPreview modelValue={model.description} theme="dark" language="en-US" />

        </div>}
    </div>
}