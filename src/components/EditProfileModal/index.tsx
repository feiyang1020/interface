import { Button, Col, ConfigProvider, Form, Input, InputNumber, Modal, Row, Select, message } from "antd";
import "./index.less";
import { createModel, editProfile } from "@/services/api";
import { useEffect, useState } from "react";
import S3UploadForm from "../S3Upload";
import UploadImage from "../S3Upload/UploadImage";
import { useModel } from "umi";
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

export type EidtProfileProps = {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};
export default ({ open, onClose, onSuccess }: EidtProfileProps) => {
  const { userInfo } = useModel('global')
  const [form] = Form.useForm();
  const [submiting, setSubmitLoading] = useState<boolean>(false)
  const handleSubmit = async () => {
    const valid = await form.validateFields();
    const { nickname, email, avatar } = form.getFieldsValue();
    console.log(nickname, email, avatar, form.getFieldsValue(), valid);
    setSubmitLoading(true)
    const ret = await editProfile({
      nickname, email, avatar
    });
    setSubmitLoading(false)
    if (ret.code === 0) {
      message.success('success');
      onSuccess && onSuccess()
      onClose()
    }
  };
  useEffect(() => {
    if (userInfo) {
      form.setFieldsValue(userInfo)
    }
  }, [userInfo])
  return (
    <Modal
      open={open}
      width={620}
      onCancel={onClose}
      closable={false}
      className="publishPage"
      onOk={handleSubmit}
      confirmLoading={submiting}
      styles={{ mask: { 'backdropFilter': 'blur(20px)' } }}
      footer={[

        <Button key="submit" type="primary" size='large' loading={submiting} shape="round" onClick={handleSubmit}>
          Submit
        </Button>,
        <ConfigProvider
          theme={{
            components: {
              Button: {
                colorPrimary: `rgba(255,255,255,0.2)`,
                colorPrimaryHover: `rgba(255,255,255,0.3)`,
                colorPrimaryActive: `rgba(255,255,255,0.3)`,
                lineWidth: 0,
              },
            },
          }}
        >
          <Button
            size='large'
            onClick={onClose}
            shape="round"
            type="primary"
          >
            Cancel
          </Button> </ConfigProvider>,
      ]}

    >
      <div className="FormWrap">
        <Form
          {...formItemLayout}
          variant="filled"
          style={{ maxWidth: 600 }}
          form={form}
          initialValues={{ userInfo }}
        >
          <Form.Item
            name="nickname"
            label="Nickname"
            tooltip="What do you want others to call you?"
            rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Avatar" name="avatar" >
            <UploadImage />
          </Form.Item>


        </Form>
      </div>
    </Modal>
  );
};
