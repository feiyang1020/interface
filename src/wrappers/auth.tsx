import { Spin } from 'antd';
import { Navigate, Outlet, useModel } from 'umi'

export default () => {
  const { connected, initializing } = useModel('global');
  if (initializing) {
    return <Spin spinning={initializing} fullscreen></Spin>
  }
  if (connected) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
}