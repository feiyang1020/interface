import { Button, Col, ConfigProvider, Form, Input, InputNumber, Modal, Row, Select, Space, message } from "antd";
import "./index.less";
import { createModel, createModelDepend } from "@/services/api";
import { useState } from "react";
import S3UploadForm from "../S3Upload";
import UploadImage from "../S3Upload/UploadImage";
import { useModel } from "umi";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { checkHfUrl } from "@/utils/utils";
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
    const { name, describe, model, cover, type, tags, price, modelDependencyAndRevenueSharing, percent, url } = form.getFieldsValue();
    console.log(name, describe, model);
    await form.validateFields();
    try {
      const sums = modelDependencyAndRevenueSharing.reduce((a, b) => { return a + b.revenue }, percent);
      if (sums !== 100) {
        throw new Error('The sum of revenue sharing must be 100%');
      }
      setSubmitLoading(true);
      const depends = []
      for (let i = 0; i < modelDependencyAndRevenueSharing.length; i++) {
        const { url, name } = modelDependencyAndRevenueSharing[i];
        const ret = await createModelDepend({
          url, name
        });
        if (ret.code !== 0) {
          throw new Error('Hugging Face URL is not valid');
        }
        depends.push({ id: ret.data.id, percent: modelDependencyAndRevenueSharing[i].revenue })
      }

      const ret = await createModel({
        url,
        name,
        percent,
        description: describe,
        tags: tags,
        cover: cover,
        file_path: model,
        price: price,
        type: type,
        depends: depends
      });
      if (ret.code === 0) {
        message.success('success');
        onSuccess && onSuccess()
        onClose()
      } else {
        throw new Error(ret.msg)
      }
    } catch (e: any) {
      console.error(e)
      message.error(e.message)
    }

    setSubmitLoading(false)
  };
  return (
    <Modal
      open={open}
      width={700}
      onCancel={onClose}
      closable={false}
      className="publishPage"
      onOk={handleSubmit}
      confirmLoading={submiting}
      styles={{ mask: { 'backdropFilter': 'blur(20px)', background: 'rgba(8, 8, 44, 0.5)', } }}
      footer={[
        connected ?
          <Button key="submit1" type="primary" size='large' loading={submiting} shape="round" onClick={handleSubmit}> Submit</Button>
          : <Button key="submit2" type="primary" size='large' loading={submiting} shape="round" onClick={connect}>Connect</Button>


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
          key='cancel1'
        >
          <Button
            size='large'
            onClick={onClose}
            shape="round"
            type="primary"
            key='cancel'
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

          <Form.Item label="Hugging Face URL" name="url" rules={[{ required: true }, ({ setFieldValue, getFieldValue }) => ({
            async validator(_, value) {
              if (!value) {
                return Promise.resolve();
              }

              const { isPass, name } = await checkHfUrl(value);
              if (!isPass) {
                return Promise.reject(new Error('Hugging Face URL is not valid'));
              }
              setFieldValue('name', name)

              return Promise.resolve();
            },
          })]}
            validateTrigger="onBlur">
            <Input size="large" />
          </Form.Item>
          <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input !', whitespace: true }]}>
            <Input size="large" disabled />
          </Form.Item>

          <Form.Item label="Describe" name="describe" rules={[{ required: true, message: 'Please input !', whitespace: true }]}>
            <Input.TextArea size="large" />
          </Form.Item>

          <Form.Item
            label="Revenue"
            name="percent"
            rules={[{ required: true, message: 'Please input !', }]}
          >
            <InputNumber style={{ width: "100%" }} placeholder="revenue " suffix='%' />
          </Form.Item>
          <Row>
            <Col span={12}>
              <Form.Item label="Type" name="type" labelCol={{ span: 12 }} wrapperCol={{ span: 12 }} rules={[{ required: true, message: 'Please select !', }]} >
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
              <Form.Item label="Tags" name="tags" labelCol={{ span: 12 }} wrapperCol={{ span: 12 }} rules={[{ required: true, message: 'Please select !', }]}>
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



          <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Please input !', }]}>
            <InputNumber size="large" style={{ width: '100%' }} />
          </Form.Item>
          <Row>
            <Col span={12}>
              <Form.Item label="model" name="model" labelCol={{ span: 12 }} wrapperCol={{ span: 12 }} rules={[{ required: true, message: 'Please upload !', }]}>
                <S3UploadForm />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="cover" name="cover" labelCol={{ span: 12 }} wrapperCol={{ span: 12 }} rules={[{ required: true, message: 'Please upload !', }]}>
                <UploadImage />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Dependent Model">
            <Form.List name="modelDependencyAndRevenueSharing" >
              {(fields, { add, remove, }) => (
                <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space key={key} >
                      <Form.Item
                        noStyle
                        {...restField}
                        name={[name, 'url']}


                        rules={[{ required: true }, ({ setFieldValue, getFieldValue }) => ({
                          async validator(_, value) {
                            if (!value) {
                              return Promise.resolve();
                            }
                            const values = getFieldValue('modelDependencyAndRevenueSharing');
                            const find = values.filter((item: any) => item.url === value);
                            if (find.length > 1) {
                              return Promise.reject(new Error('Hugging Face URL is duplicated'));
                            }
                            const { isPass, name } = await checkHfUrl(value);
                            if (!isPass) {
                              return Promise.reject(new Error('Hugging Face URL is not valid'));
                            }

                            Object.assign(values[key], { name })
                            setFieldValue('modelDependencyAndRevenueSharing', values)

                            return Promise.resolve();
                          },
                        })]}
                        validateTrigger="onBlur"
                      >
                        <Input placeholder="Hugging Face URL" />
                      </Form.Item>
                      <Form.Item
                        noStyle
                        {...restField}
                        name={[name, 'revenue']}



                      >
                        <InputNumber style={{ width: "100%" }} placeholder="revenue " suffix='%' />
                      </Form.Item>
                      <Form.Item
                        noStyle
                        {...restField}
                        name={[name, 'name']}

                      >
                        <Input placeholder="Model Name" disabled />
                      </Form.Item>

                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Add Dependency
                    </Button>
                  </Form.Item>
                </div>
              )}
            </Form.List>
          </Form.Item>
        </Form>
      </div>
    </Modal >
  );
};
