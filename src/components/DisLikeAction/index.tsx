import { DislikeFilled, LikeFilled } from "@ant-design/icons";
import './index.less'
import { useState } from "react";
import { useModel } from "umi";
import { cancleHateModel, cancleLikeModel, hateModel, likeModel } from "@/services/api";
import { message } from "antd";
type Props = { model: API.ModelItem, handleLike: (id: number) => void; handleDislike: (id: number) => void; }
export default ({ model, handleLike, handleDislike }: Props) => {
    const { connected, connect } = useModel('global')
    const [isLike, setIsLike] = useState<boolean>(Boolean(model.is_hate));
    const [likeCount, setLikeCount] = useState<number>(model.hate);
    const onLike = async (id: number) => {
        if (!connected) {
            connect()
            return;
        };
        setIsLike(true)
        setLikeCount(likeCount + 1)
        try {
           
            await hateModel({ id });

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
        setIsLike(false)
        setLikeCount(likeCount - 1)
        try {
            // handleDislike && handleDislike(id)
            await cancleHateModel({ id });

        } catch (e: any) {
            console.log(e);
            message.error(e.message);
            setIsLike(true)
            setLikeCount(likeCount + 1)
        }
    };

    return <div className="hateWrap" onClick={(e) => { e.stopPropagation(); isLike ? onDislike(model.id) : onLike(model.id) }}>
        <DislikeFilled className={`${isLike ? 'likeIcon isLike' : 'likeIcon disLike'}`} style={{ color: isLike ? '#fb9a33' : '#fff' }} /> {likeCount}
    </div>
}