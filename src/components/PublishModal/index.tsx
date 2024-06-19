import { Button, Col, ConfigProvider, Form, Input, InputNumber, Modal, Row, Select, message } from "antd";
import "./index.less";
import { createModel } from "@/services/api";
import { useState } from "react";
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

export type PublishProps = {
  open: boolean;
  tags: API.Tag[];
  onClose: () => void;
  onSuccess?: () => void;
};
export default ({ open, onClose, onSuccess, tags = [] }: PublishProps) => {
  const [form] = Form.useForm();
  const { connected, connect } = useModel('global')
  const [submiting, setSubmitLoading] = useState<boolean>(false)
  const handleSubmit = async () => {
    const { name, describe, model, cover, type, tags, price } = form.getFieldsValue();
    console.log(name, describe, model);
    await form.validateFields();
    try {

      setSubmitLoading(true)
      const ret = await createModel({
        name,
        description: describe,
        tags: tags,
        cover: cover,
        file_path: model,
        price: price,
        type: type
      });
      if (ret.code === 0) {
        message.success('success');
        onSuccess && onSuccess()
        onClose()
      } else {
        throw new Error(ret.msg)
      }
    } catch (e) {
      console.error(e)
      message.error(e.message)
    }

    setSubmitLoading(false)
  };
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
        <>
          {
            connected ?
              <Button key="submit" type="primary" size='large' loading={submiting} shape="round" onClick={handleSubmit}> Submit</Button>
              : <Button key="submit" type="primary" size='large' loading={submiting} shape="round" onClick={connect}>Connect</Button>
          }
        </>
        ,
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
      ]
      }

    >
      <div className="FormWrap">
        <Form
          {...formItemLayout}
          variant="filled"
          style={{ maxWidth: 600 }}
          form={form}
        >
          <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}>
            <Input size="large" />
          </Form.Item>

          <Form.Item label="Describe" name="describe">
            <Input.TextArea size="large" />
          </Form.Item>
          <Row>
            <Col span={12}>
              <Form.Item label="Type" name="type" labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
                <Select
                  placeholder="Select Type"
                  allowClear
                  size="large"
                >
                  <Select.Option value={1}>Original</Select.Option>
                  <Select.Option value={2}>Republish</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Tags" name="tags" labelCol={{ span: 12 }} wrapperCol={{ span: 12 }} >
                <Select
                  placeholder="Select Tags"
                  mode="multiple"
                  allowClear
                  options={tags.map((tag) => ({
                    label: tag.name,
                    value: tag.id,
                  }))}
                  size="large"
                >

                </Select>
              </Form.Item>
            </Col>
          </Row>



          <Form.Item label="Price" name="price">
            <InputNumber size="large" style={{ width: '100%' }} />
          </Form.Item>
          <Row>
            <Col span={12}>
              <Form.Item label="model" name="model" labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
                <S3UploadForm />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="cover" name="cover" labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
                <UploadImage />
              </Form.Item>
            </Col>
          </Row>

          {/* <Form.Item label="cover" name="cover" labelCol={{span:12}}>
            <UploadImage />
          </Form.Item>
          <Form.Item label="model" name="model" labelCol={{span:12}}>
            <S3UploadForm />
          </Form.Item> */}
        </Form>
      </div>
    </Modal >
  );
};
