import { Form, Input, Modal, message } from "antd";
import "./index.less";
import { createModel } from "@/services/api";
import { useState } from "react";
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
  const [form] = Form.useForm();
  const [submiting,setSubmitLoading] = useState<boolean>(false)
  const handleSubmit = async () => {
    const { name, describe } = form.getFieldsValue();
    setSubmitLoading(true)
    const ret = await createModel({
      name,
      description: describe,
      tags: [],
      cover:
        "https://i.pinimg.com/564x/40/25/35/402535e88054445efb753c70d7f46dc4.jpg",
      file_path:
        "https://i.pinimg.com/564x/40/25/35/402535e88054445efb753c70d7f46dc4.jpg",
    });
    if(ret.code===0){
      message.success('success');
      onClose()
    }
    setSubmitLoading(true)
  };
  return (
    <Modal
      open={open}
      onCancel={onClose}
      closable={false}
      className="publishPage"
      onOk={handleSubmit}
      confirmLoading={submiting}
    >
      <div className="FormWrap">
        <Form
          {...formItemLayout}
          variant="filled"
          style={{ maxWidth: 600 }}
          form={form}
        >
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
