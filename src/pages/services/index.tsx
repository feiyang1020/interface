import { useCallback, useEffect, useState } from "react";
import "./index.less";
import Waterfall from "react-silky-waterfall";
import type { ItemData, ItemExtraNodeProps } from "react-silky-waterfall";
import { cancleLikeModel, checkLikeAndDownload, getModelList, getTagList, likeModel } from "@/services/api";
import Masonry from "react-masonry-css";
import InfiniteScroll from "@/components/InfiniteScroll";
import { Button, ConfigProvider, message } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";
import PublishModal from "@/components/PublishModal";
import { buyModel } from "@/utils/order";
import ModelCard from "@/components/ModelCard";
import { useModel } from "umi";
import ModelModal from "@/components/ModelModal";
const breakpointColumnsObj = {
  default: 6,
  1500: 5,
  1100: 4,
  700: 2,
  500: 1,
};
export default () => {
  const { connected, mvcAddress } = useModel('global')
  const [uploadVisiable, setUploadVisiable] = useState<boolean>(false)
  const [detailVisiable, setDetailVisiable] = useState<boolean>(false);
  const [curModel, setCurModel] = useState<API.ModelItem>();
  const [tag, setTag] = useState<string>();
  const [tags, setTags] = useState<API.Tag[]>([]);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(20);
  const [loading, setLoading] = useState<boolean>(false);
  const [list, setList] = useState<API.ModelItem[]>([]);
  const getTags = useCallback(async () => {
    const { data } = await getTagList()
    setTags(data.list)
  }, [])
  const fetchList = useCallback(async () => {
    setLoading(true);
    const { code, data } = await getModelList({
      page,
      page_size: size,
      tag: tag,
    });
    setLoading(false);
    if (code !== 0 || !data.list) {
      setIsEnd(true);
      return;
    }
    console.log(connected, 'connected');
    let _list: API.ModelItem[] = data.list;
    if (connected) {
      const { data: { list } } = await checkLikeAndDownload({ model_ids: data.list.map((item) => item.id).join(",") });
      _list = _list.map((model: API.ModelItem) => {
        const _item = list.find((i) => i.model_id === model.id);
        if (_item) {
          return { ...model, ..._item };
        }
        return model;
      });
    }
    setList((prev) => {
      if (page === 1) { return [..._list]; }
      return [...prev, ..._list];
    });
  }, [page, size, tag, connected]);

  useEffect(() => {
    fetchList();

  }, [fetchList]);
  useEffect(() => { getTags() }, [getTags]);

  const handleBuy = async (id: number) => {
    try{
     
      await buyModel(id);
      setPage(1);
      fetchList();
    }catch(e:any){
      console.log(e);
      message.error(e.message);
    }
  };
  const handleLike = async (id: number) => {
    try{
      await likeModel({  id });
      setPage(1);
      fetchList();
      message.success('success');
    }catch(e:any){
      console.log(e);
      message.error(e.message);
    }
  }

  const handleCanelLike = async (id: number) => {
    try{
      await cancleLikeModel({  id });
      setPage(1);
      fetchList();
      message.success('cancel success');
    }catch(e:any){
      console.log(e);
      message.error(e.message);
    }
  }
  return (
    <div className="servicesPage animation-slide-bottom">
      <div className="pageTitle">Services</div>
      <div className="uploadBtn">
        <ConfigProvider
          theme={{
            components: {
              Button: {
                colorPrimary: `linear-gradient(135deg, #B193CB, #60E4DE)`,
                colorPrimaryHover: `linear-gradient(135deg, #B193CB, #60E4DE)`,
                colorPrimaryActive: `linear-gradient(135deg, #B193CB, #60E4DE)`,
                lineWidth: 0,
              },
            },
          }}
        >
          <Button
            type="primary"
            shape="round"
            icon={<CloudUploadOutlined />}
            iconPosition="start"
            onClick={() => { setUploadVisiable(true) }}
          >
            Upload
          </Button>
        </ConfigProvider>
      </div>
      <div className="ListWraper">
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
        {isEnd && <div style={{ margin: '0  auto', width: "100%", textAlign: 'center' }}>No more data</div>}
      </div>
      <PublishModal open={uploadVisiable} onClose={() => { setUploadVisiable(false) }} onSuccess={() => { setPage(1) }} tags={tags} />
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
};
