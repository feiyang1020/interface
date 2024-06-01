import { Form, Input, Modal } from "antd";
import "./index.less";
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

export type PublishProps = {
  open: boolean;
  onClose: () => void;
};
export default ({ open, onClose }: PublishProps) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      closable={false}
      className="publishPage"
    >
      <div className="FormWrap">
        <Form {...formItemLayout} variant="filled" style={{ maxWidth: 600 }}>
          <Form.Item label="Name" name="name">
            <Input size="large" />
          </Form.Item>
          <Form.Item label="Describe" name="describe">
            <Input.TextArea size="large" />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};
