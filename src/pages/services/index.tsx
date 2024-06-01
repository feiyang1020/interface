import { useCallback, useEffect, useState } from "react";
import "./index.less";
import Waterfall from "react-silky-waterfall";
import type { ItemData, ItemExtraNodeProps } from "react-silky-waterfall";
import { getModelList } from "@/services/api";
import Masonry from "react-masonry-css";
import InfiniteScroll from "@/components/InfiniteScroll";
import { Button, ConfigProvider } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";
const breakpointColumnsObj = {
  default: 6,
  1100: 4,
  700: 2,
  500: 1,
};
const items: API.ModelItem[] = [
  {
    id: 0,
    name: "string",
    description: "string",
    author_id: 2,
    author_nickname: "author_nickname",
    tags: [],
    cover:
      "https://i.pinimg.com/564x/85/80/b0/8580b0f7f5096726cb2d58b9858de18e.jpg",
    file_path: "string",
  },
  {
    id: 2,
    name: "string",
    description: "string",
    author_id: 2,
    author_nickname: "author_nickname",
    tags: [],
    cover:
      "https://i.pinimg.com/564x/e9/f8/81/e9f881a60efafacbd4180151516d2519.jpg",
    file_path: "string",
  },
  {
    id: 3,
    name: "string",
    description: "string",
    author_id: 2,
    author_nickname: "author_nickname",
    tags: [],
    cover:
      "https://i.pinimg.com/564x/ca/97/f2/ca97f2a09e10ffdfe973f5f299ab611d.jpg",
    file_path: "string",
  },
  {
    id: 777,
    name: "string",
    description: "string",
    author_id: 2,
    author_nickname: "author_nickname",
    tags: [],
    cover:
      "https://i.pinimg.com/564x/e9/1f/dc/e91fdcd2b46e8ae923ff86c9ed0dec25.jpg",
    file_path: "string",
  },
  {
    id: 398,
    name: "string",
    description: "string",
    author_id: 2,
    author_nickname: "author_nickname",
    tags: [],
    cover:
      "https://i.pinimg.com/564x/3a/e3/10/3ae310dfc4a4e5f78fd7b986e47737a8.jpg",
    file_path: "string",
  },
  {
    id: 3787,
    name: "string",
    description: "string",
    author_id: 2,
    author_nickname: "author_nickname",
    tags: [],
    cover:
      "https://i.pinimg.com/736x/41/f5/ca/41f5ca1be5c8affacb6a9b452461174f.jpg",
    file_path: "string",
  },
  {
    id: 3678,
    name: "string",
    description: "string",
    author_id: 2,
    author_nickname: "author_nickname",
    tags: [],
    cover:
      "https://i.pinimg.com/564x/09/b8/0b/09b80bb73d15210c33b1ad6c37d2d1c9.jpg",
    file_path: "string",
  },
  {
    id: 356,
    name: "string",
    description: "string",
    author_id: 2,
    author_nickname: "author_nickname",
    tags: [],
    cover:
      "https://i.pinimg.com/564x/26/78/7b/26787be4447c4a7d24c6b74320d1409d.jpg",
    file_path: "string",
  },
  {
    id: 333,
    name: "string",
    description: "string",
    author_id: 2,
    author_nickname: "author_nickname",
    tags: [],
    cover:
      "https://i.pinimg.com/564x/2e/32/d5/2e32d578ec8f7551e3027aee631441be.jpg",
    file_path: "string",
  },
  {
    id: 13,
    name: "string",
    description: "string",
    author_id: 2,
    author_nickname: "author_nickname",
    tags: [],
    cover:
      "https://i.pinimg.com/564x/50/4d/f4/504df4bbda6e1c2d7e21bc9b38be6684.jpg",
    file_path: "string",
  },
];
export default () => {
  const [tag, setTag] = useState<string>();
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(20);
  const [loading, setLoading] = useState<boolean>(false);
  const [list, setList] = useState<API.ModelItem[]>([]);
  const fetchList = useCallback(async () => {
    setLoading(true);
    const { code, data } = await getModelList({
      page,
      page_size: size,
      tag: tag,
    });
    setLoading(false);
    if (code !== 0) return;
    setList((prev) => {
      return [...prev, ...items];
    });
  }, [page, size, tag]);

  useEffect(() => {
    fetchList();
  }, [fetchList]);
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
            onClick={() => {}}
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
            <div key={item.id} className="item">
              <img src={item.cover} alt={item.name} />
              <div className="item-info">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>Likes: {item.likes}</p>
                <p>Views: {item.views}</p>
                <p>Comments: {item.comments}</p>
                <p>Shares: {item.shares}</p>
              </div>
            </div>
          ))}
        </Masonry>
        <InfiniteScroll
          id="mason_grid"
          onMore={() => setPage((prev) => prev + 1)}
        />
      </div>
    </div>
  );
};
