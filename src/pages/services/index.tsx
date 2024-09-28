import { useCallback, useEffect, useState } from "react";
import "./index.less";
import Waterfall from "react-silky-waterfall";
import type { ItemData, ItemExtraNodeProps } from "react-silky-waterfall";
import { cancleLikeModel, checkLikeAndDownload, getModelList, getTagList, likeModel } from "@/services/api";
import Masonry from "react-masonry-css";
import InfiniteScroll from "@/components/InfiniteScroll";
import { Button, Carousel, Col, ConfigProvider, Row, Spin, message } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";
import PublishModal from "@/components/PublishModal";
import { buyModel } from "@/utils/order";
import ModelCard from "@/components/ModelCard";
import { useModel } from "umi";
import ModelModal from "@/components/ModelModal";
import { downloadFile } from "@/utils/dowmload";
import flow from '@/assets/flow.png'
const breakpointColumnsObj = {
  default: 5,
  1500: 4,
  1100: 2,
  700: 2,
  500: 1,
};
export default () => {
  const { connected, mvcAddress, initializing, connect } = useModel('global')
  const [uploadVisiable, setUploadVisiable] = useState<boolean>(false)
  const [detailVisiable, setDetailVisiable] = useState<boolean>(false);
  const [curModel, setCurModel] = useState<API.ModelItem>();
  const [tag, setTag] = useState<string>();
  const [tags, setTags] = useState<API.Tag[]>([]);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(20);
  const [loading, setLoading] = useState<boolean>(true);
  const [list, setList] = useState<API.ModelItem[]>([]);
  const getTags = useCallback(async () => {
    const { data } = await getTagList()
    setTags(data.list)
  }, [])
  const fetchList = useCallback(async () => {
    if (initializing) return;
    // setLoading(true);
    const { code, data } = await getModelList({
      page,
      page_size: size,
      tag: tag,
    });
    let _list: API.ModelItem[] = data.list || [];
    if (connected && _list.length) {
      const { data: { list = [] } } = await checkLikeAndDownload({ model_ids: _list.map((item) => item.id).join(",") });
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
    if (code !== 0 || data.total <= page * size) {
      setIsEnd(true);
    }
    setList((prev) => {
      if (page === 1) { return [..._list]; }
      return [...prev, ..._list];
    });
    setLoading(false);
  }, [page, size, tag, connected, initializing]);

  useEffect(() => {
    fetchList();

  }, [fetchList]);
  useEffect(() => { getTags() }, [getTags]);

  const handleBuy = async (id: number) => {
    if (!connected) {
      connect();
      return
    };
    try {
      const find = list.find((item) => item.id === id);
      if (!find) return;
      if (find.price !== 0) {
        const { data: { list: checkList } } = await checkLikeAndDownload({ model_ids: String(id) });
        if (!checkList[0].is_download) {
          await buyModel(id);
        }
      }


      if (find) {
        const file = new URL(find.file_path);
        console.log(file.pathname);
        await downloadFile(id, decodeURIComponent(file.pathname.slice(1)));
        message.success('Download success');
      }

      setPage(1);
      fetchList();
    } catch (e: any) {
      console.log(e);
      message.error(e.message);
    }
  };
  const handleLike = async (id: number) => {
    console.log('handleLike', id);
    if (!connected) {
      connect();
      return
    };
    try {


      setList(list.map((item) => {
        if (item.id === id) {
          return { ...item, is_like: 1, like: item.like + 1 }
        }
        return item
      }))
      if (curModel && curModel.id === id) {
        setCurModel({ ...curModel, is_like: 1, like: curModel.like + 1 })
      }
      // message.success('success');
    } catch (e: any) {
      console.log(e);
      // message.error(e.message);
    }
  }

  const handleCanelLike = async (id: number) => {
    if (!connected) {
      connect();
      return
    };
    try {
      // await cancleLikeModel({ id });
      // setPage(1);
      // fetchList();
      setList(list.map((item) => {
        if (item.id === id) {
          return { ...item, is_like: 0, like: item.like - 1 }
        }
        return item
      }))
      if (curModel && curModel.id === id) {
        setCurModel({ ...curModel, is_like: 0, like: curModel.like - 1 })
      }
      // message.success('cancel success');
    } catch (e: any) {
      console.log(e);
      // message.error(e.message);
    }
  }
  return (
    <div className="servicesPage animation-slide-bottom">
      <div className="pageTitle">Services</div>
      <Carousel autoplay autoplaySpeed={10000}>
        <div className="imgWrap">
          <img src={flow} alt="" className='flow' />
        </div>
        <div className="imgWrap">
          <img src={flow} alt="" className='flow' />
        </div>

      </Carousel>
      <div className="uploadBtn">

        <Button
          type="primary"
          shape="round"
          icon={<CloudUploadOutlined />}
          iconPosition="start"
          onClick={() => { setUploadVisiable(true) }}
        >
          Upload
        </Button>

      </div>
      <Spin spinning={loading || initializing} tip="Loading...">
        <div className="ListWraper">
          <Row gutter={[24,24]}>
            {list.map((item,index) => (
              <Col key={item.id} xs={24} sm={24} md={index>1?8:12} >
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
              </Col>
            ))}
          </Row>

          <InfiniteScroll
            id="mason_grid"
            onMore={() => {
              if (!isEnd && !loading && !initializing) {
                console.log('onMore', isEnd, loading, initializing);
                setPage((prev) => prev + 1)
              }
            }}
          />
          {isEnd && <div style={{ margin: '0  auto', width: "100%", textAlign: 'center' }}>No more data</div>}
        </div>
      </Spin>
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
