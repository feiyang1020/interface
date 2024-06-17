import { useModel } from 'umi';
import './index.less'
import { Avatar, Button, Col, Row } from 'antd';
import { EditFilled } from '@ant-design/icons';
import EditProfileModal from '@/components/EditProfileModal';
import { useState } from 'react';
export default function App() {
    const { connected, userInfo, init } = useModel('global');
    const [editVisiable, setEditVisiable] = useState<boolean>(false)
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

                </div>
            </div>
            <EditProfileModal open={editVisiable} onClose={() => setEditVisiable(false)} onSuccess={() => {
                init();
                setEditVisiable(false)
            }} />
        </div>

    );
}