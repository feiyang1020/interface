import { useModel } from 'umi';
import './index.less'
import { Avatar, Button, Col, Empty, Row, message } from 'antd';
import { DatabaseOutlined, EditFilled, LineChartOutlined } from '@ant-design/icons';
import EditProfileModal from '@/components/EditProfileModal';
import { useCallback, useEffect, useState } from 'react';
import { cancleLikeModel, checkLikeAndDownload, getModelList, getTagList, likeModel } from '@/services/api';
import { buyModel } from '@/utils/order';
import { downloadFile } from '@/utils/dowmload';
import ModelModal from '@/components/ModelModal';
import InfiniteScroll from '@/components/InfiniteScroll';
import Masonry from 'react-masonry-css';
import ModelCard from '@/components/ModelCard';
import IncomeAnalysis from './components/IncomeAnalysis';
const breakpointColumnsObj = {
    default: 5,
    1500: 4,
    1100: 3,
    700: 2,
    500: 1,
};
export default function App() {
    const { connected, userInfo, init } = useModel('global');
    const [editVisiable, setEditVisiable] = useState<boolean>(false);
    const [detailVisiable, setDetailVisiable] = useState<boolean>(false);
    const [curModel, setCurModel] = useState<API.ModelItem>();
    const [tag, setTag] = useState<string>();
    const [tab, setTab] = useState<string>('models');
    const [tags, setTags] = useState<API.Tag[]>([]);
    const [isEnd, setIsEnd] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [size, setSize] = useState<number>(20);
    const [loading, setLoading] = useState<boolean>(false);
    const [list, setList] = useState<API.ModelItem[]>([]);
    const [total, setTotal] = useState<number>(0);
    const getTags = useCallback(async () => {
        const { data } = await getTagList()
        setTags(data.list)
    }, [])
    const fetchList = useCallback(async () => {
        if (!connected) return;
        if (!userInfo.id) return;
        setLoading(true);
        const { code, data } = await getModelList({
            page,
            page_size: size,
            tag: tag,
            uploader_id: String(userInfo.id)
        });
        setLoading(false);
        if (code !== 0 || !data.list) {
            setIsEnd(true);
            return;
        }
        setTotal(data.total)
        console.log(connected, 'connected');
        let _list: API.ModelItem[] = data.list;
        if (connected) {
            const { data: { list = [] } } = await checkLikeAndDownload({ model_ids: data.list.map((item) => item.id).join(",") });
            if (list) {
                _list = _list.map((model: API.ModelItem) => {
                    const _item = list.find((i) => i.model_id === model.id);
                    if (_item) {
                        return { ...model, ..._item };
                    }
                    return model;
                });
            }

        }
        setList((prev) => {
            if (page === 1) { return [..._list]; }
            return [...prev, ..._list];
        });
    }, [page, size, tag, connected, userInfo]);

    useEffect(() => {
        fetchList();

    }, [fetchList]);
    useEffect(() => { getTags() }, [getTags]);

    const handleBuy = async (id: number) => {
        try {
            const { data: { list: checkList } } = await checkLikeAndDownload({ model_ids: String(id) });
            if (!checkList[0].is_download) {
                await buyModel(id);
            }
            const find = list.find((item) => item.id === id);
            if (find) {
                const file = new URL(find.file_path);
                console.log(file.pathname);
                await downloadFile(id, decodeURIComponent(file.pathname.slice(1)));
            }

            setPage(1);
            fetchList();
        } catch (e: any) {
            console.log(e);
            message.error(e.message);
        }
    };
    const handleLike = async (id: number) => {
        try {
            await likeModel({ id });
            setPage(1);
            await fetchList();
            if (curModel && curModel.id === id) {
                setCurModel({ ...curModel, is_like: 1, like: curModel.like + 1 })
            }
            message.success('success');
        } catch (e: any) {
            console.log(e);
            message.error(e.message);
        }
    }

    const handleCanelLike = async (id: number) => {
        try {
            await cancleLikeModel({ id });
            setPage(1);
            fetchList();
            if (curModel && curModel.id === id) {
                setCurModel({ ...curModel, is_like: 0, like: curModel.like - 1 })
            }
            message.success('cancel success');
        } catch (e: any) {
            console.log(e);
            message.error(e.message);
        }
    }
    if (!connected) return <></>
    return (
        <div className="profilePage animation-slide-bottom">
            <div className='contentWrap'>
                <div className="profile">
                    <Avatar style={{ width: 72, height: 72 }} src={userInfo.avatar ? <img src={userInfo.avatar}></img> : null}>{userInfo.nickname || 'Unnamed'}</Avatar>
                    <div className="name">
                        {userInfo.nickname || 'Unnamed'}
                    </div>
                    <div className="address">
                        {userInfo.address.replace(/(\w{5})\w+(\w{4})/, "$1...$2")}
                    </div>
                    <Button type="primary" shape="round" size='large' block icon={<EditFilled />} onClick={() => setEditVisiable(true)}> Edit Profile</Button>
                </div>
                <div className="card">
                    <div className="tabs" >
                        <Button size='large' type={tab === 'models' ? 'primary' : 'text'} className='tab' onClick={() => { setTab('models') }}>
                            <DatabaseOutlined /> Models <span className='num'>{total}</span>
                        </Button>
                        <Button size='large' type={tab === 'inc&Exp' ? 'primary' : 'text'} className='tab' onClick={() => { setTab('inc&Exp') }}>
                            <LineChartOutlined /> Income & Expense
                        </Button>

                    </div>
                    {tab === 'models' && <div className="ListWraper">
                        <Masonry
                            breakpointCols={breakpointColumnsObj}
                            className="my-masonry-grid"
                            columnClassName="my-masonry-grid_column"
                        >
                            {list.map((item) => (
                                <ModelCard
                                    key={item.id}
                                    model={item}
                                    onLike={(id) => {
                                        handleLike(id);
                                    }}
                                    onDislike={(id) => {
                                        handleCanelLike(id);
                                    }}
                                    onBuy={(id) => {
                                        handleBuy(id);
                                    }}
                                    onPreview={(model) => { setCurModel(model); setDetailVisiable(true) }}
                                />
                            ))}
                        </Masonry>
                        <InfiniteScroll
                            id="mason_grid"
                            onMore={() => { !isEnd && setPage((prev) => prev + 1) }}
                        />
                        {isEnd && list.length > 0 && <div style={{ margin: '0  auto', width: "100%", textAlign: 'center' }}>No more data</div>}
                        {isEnd && list.length === 0 && <Empty></Empty>}
                    </div>}
                    {tab === 'inc&Exp' && <IncomeAnalysis />}



                </div>
            </div>
            <EditProfileModal open={editVisiable} onClose={() => setEditVisiable(false)} onSuccess={() => {
                init();
                setEditVisiable(false)
            }} />
            <ModelModal model={curModel} open={detailVisiable} onLike={(id) => {
                handleLike(id);
            }}
                onDislike={(id) => {
                    handleCanelLike(id);
                }}
                onBuy={(id) => {
                    handleBuy(id);
                }}
                onClose={() => { setDetailVisiable(false) }}
            ></ModelModal>
        </div>

    );
}