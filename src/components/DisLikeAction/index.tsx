import { DislikeFilled, LikeFilled } from "@ant-design/icons";
import './index.less'
import { useState } from "react";
import { useModel } from "umi";
import { cancleLikeModel, likeModel } from "@/services/api";
import { message } from "antd";
type Props = { model: API.ModelItem, handleLike: (id: number) => void; handleDislike: (id: number) => void; }
export default ({ model, handleLike, handleDislike }: Props) => {
    const { connected, connect } = useModel('global')
    const [isLike, setIsLike] = useState<boolean>(Boolean(model.is_like));
    const [likeCount, setLikeCount] = useState<number>(model.like);
    const onLike = async (id: number) => {
        if (!connected) {
            connect()
            return;
        };
        // setIsLike(true)
        // setLikeCount(likeCount + 1)
        try {
            handleLike && handleLike(id)
            await likeModel({ id });

        } catch (e: any) {
            console.log(e);
            message.error(e.message);
            setIsLike(false)
            setLikeCount(likeCount - 1)
        }

    };
    const onDislike = async (id: number) => {
        if (!connected) {
            connect()
            return;
        };
        try {
            handleDislike && handleDislike(id)
            await cancleLikeModel({ id });

        } catch (e: any) {
            console.log(e);
            message.error(e.message);
            setIsLike(true)
            setLikeCount(likeCount + 1)
        }
    };

    return <div className="likeWrap" onClick={(e) => { e.stopPropagation(); model.is_like ? onDislike(model.id) : onLike(model.id) }}>
        <DislikeFilled className={`${model.is_like ? 'likeIcon isLike' : 'likeIcon disLike'}`} style={{ color: model.is_like ? '#fb9a33' : '#fff' }} /> {model.like}
    </div>
}