import { LikeFilled } from "@ant-design/icons";
import './index.less'
import { useState } from "react";
import { useModel } from "umi";
import { cancleLikeModel, likeModel } from "@/services/api";
import { message } from "antd";
type Props = { model: API.ModelItem }
export default ({ model }: Props) => {
    const { connected } = useModel('global')
    const [isLike, setIsLike] = useState<boolean>(Boolean(model.is_like));
    const [likeCount, setLikeCount] = useState<number>(model.like);
    const onLike = async (id: number) => {
        if (!connected) return;
        setIsLike(true)
        setLikeCount(likeCount + 1)
        try {
            await likeModel({ id });

        } catch (e: any) {
            console.log(e);
            message.error(e.message);
            setIsLike(false)
            setLikeCount(likeCount - 1)
        }

    };
    const onDislike = async (id: number) => {
        if (!connected) return;
        setIsLike(false)
        setLikeCount(likeCount - 1)
        try {
            await cancleLikeModel({ id });
        } catch (e: any) {
            console.log(e);
            message.error(e.message);
            setIsLike(true)
            setLikeCount(likeCount + 1)
        }
    };
    return <div className="likeWrap" onClick={(e) => { e.stopPropagation(); isLike ? onDislike(model.id) : onLike(model.id) }}>
        <LikeFilled className={`${isLike ? 'likeIcon isLike' : 'likeIcon disLike'}`} style={{ color: isLike ? '#fb9a33' : '#fff' }} /> {likeCount}
    </div>
}