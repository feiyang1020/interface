
import metalet from "@/assets/metalet.png";
import "./index.less";
import { Button, Modal, message } from "antd";
import { useModel } from "umi";
import { useMemo, useState } from "react";
import { isMobile } from "@/utils/utils";
import { CopyToClipboard } from 'react-copy-to-clipboard';
type Props = {
  show: boolean;
  onClose: () => void;
};
export default ({ show, onClose }: Props) => {
  const { handleLogin } = useModel('global');
  const [loading, setLoading] = useState<boolean>(false);
  const isInstalled = useMemo(() => {
    return !!window.metaidwallet
  }, []);
  const mobile = useMemo(() => {
    return isMobile()
  }, [])
  const handleConnect = async () => {
    try {
      if (!window.metaidwallet) {
        window.open(
          "https://chromewebstore.google.com/detail/metalet/lbjapbcmmceacocpimbpbidpgmlmoaao"
        );
        return;
      }
      setLoading(true);
      await handleLogin();
      onClose();
    } catch (err: any) {
      message.error(err.message || 'unknown error');
    }
    setLoading(false);
  };
  return (
    <Modal
      title="Connect Wallet"
      width={530}
      open={show}
      onCancel={onClose}
      closable
      className="walletModal"
      footer={null}
      maskClosable={true}
      zIndex={2010}
      styles={{ mask: { 'backdropFilter': 'blur(20px)' } }}
    >
      {mobile ? <div className="walletWrap">
        <div className="name">Sorry!</div><div className="tip">
          Please visit the PC version at: bitmodel.ai
        </div>
        <CopyToClipboard text={window.location.href
        } onCopy={() => { message.success('Copied') }} >
          <Button shape="round" size='large' style={{ width: 263 }} type="primary" block>

            Copy Link
          </Button>
        </CopyToClipboard>
      </div> : <div className="walletWrap">
        <img src={metalet} alt="" className="walletLogo" />
        <div className="name">
          Metalat Wallet
        </div>
        {!isInstalled && <div className="tip">It looks like you don't have a wallet installed yet. Please install the Metalat wallet.</div>}
        <Button shape="round" size='large' style={{ width: 263 }} type="primary" loading={loading} onClick={handleConnect} block>

          <span>{isInstalled ? 'Connect' : 'Install Wallet Now'}</span>
        </Button>
      </div>}
      <div>

      </div>

    </Modal>
  );
};
