import { Button, Col, ConfigProvider, Form, Input, InputNumber, Modal, Row, Select, Space, message } from "antd";
import "./index.less";
import { createModel, createModelDepend, getModelList, s3STSForImage } from "@/services/api";
import { useState } from "react";
import S3UploadForm from "../S3Upload";
import UploadImage from "../S3Upload/UploadImage";
import { useModel } from "umi";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import DebounceSelect from "./DebounceSelect";
import ColorPicker from "./ColorPicker";
import MarkdownEditor from "../MdEditor";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from 'uuid';
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
  const uploadMardown = async (text = '') => {
    const blob = new Blob([text], { type: "text/markdown" });
    const file = new File([blob], "markdown-file.md", { type: "text/markdown" });
    try {

      const response = await s3STSForImage();
      const { access_key_id, access_secret, security_token, expire_time } =
        response.data.sts;
      const { prefix_path, bucket_name,region,location_host,endpoint } = response.data;
      const fileName = `${uuidv4()}.${file.name.split('.').pop()}`;
      const params = {
        Bucket: bucket_name,
        Key: `${prefix_path}/${fileName}`,
        Body: file,
      };
      const s3 = new S3Client({
        region,
        endpoint,
        credentials: {
          accessKeyId: access_key_id,
          secretAccessKey: access_secret,
          sessionToken: security_token,
        },
      });
      const putObjectCommand = new PutObjectCommand(params);
      const upload = await s3.send(putObjectCommand);
      const Location = `https://${location_host}/${prefix_path}/${fileName}`
      console.log("Upload response:", upload);
      return Location
    } catch (err) {
      console.error("Upload error:", err);
      message.error("Upload failed");

    }
  }
  const handleSubmit = async () => {
    const { name, describe, model, cover, type, tags = [], price, modelDependencyAndRevenueSharing = [], percent, url,background='#84D4FF' } = form.getFieldsValue();
    console.log(name, describe, model);
    await form.validateFields();
    const description = await uploadMardown(describe)
    try {
      const sums = modelDependencyAndRevenueSharing.reduce((a, b) => { return a + b.revenue }, percent);
      if (sums !== 100) {
        throw new Error('The sum of revenue sharing must be 100%');
      }
      setSubmitLoading(true);
      const depends = []
      for (let i = 0; i < modelDependencyAndRevenueSharing.length; i++) {
        const { revenue, name } = modelDependencyAndRevenueSharing[i];
        // const ret = await createModelDepend({
        //   url, name
        // });
        // if (ret.code !== 0) {
        //   throw new Error('Hugging Face URL is not valid');
        // }
        depends.push({ id: name.value, percent: revenue })
      }

      const ret = await createModel({
        url,
        name,
        percent,
        description: description,
        tags: tags,
        cover: cover,
        file_path: model,
        price: price,
        type: type,
        depends: depends,
        background
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
          validateTrigger='onChange'
          initialValues={{ price: 1 }}
          
        >


          {/* <Form.Item label="Hugging Face URL" name="url" rules={[{ required: true }, ({ setFieldValue, getFieldValue }) => ({
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
          </Form.Item> */}
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input !', whitespace: true }, { max: 50, message: 'The name must be less than 50 characters' }]}
            tooltip="Please name the model with an easy-to-remember name, no more than 50 English characters, numbers, or underscores."
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Describe"
            name="describe"
            rules={[{ required: true, message: 'Please input !', whitespace: true }]}
            tooltip='Please describe the basic information, uses, or key characteristics of the model, etc.'
          >
            {/* <Input.TextArea size="large" /> */}
            <MarkdownEditor />
          </Form.Item>
          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: 'Please select !', }]}
            tooltip=''
          >
            <Select
              placeholder="Select Type"
              allowClear
              size="large"
            >
              <Select.Option value={1}>Original</Select.Option>
              <Select.Option value={2}>Republish</Select.Option>
            </Select>
          </Form.Item>
          {/* <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: 'Please input !', }]}
            tooltip='Please set the desired revenue value.'
          >
            <InputNumber size="large" style={{ width: '100%' }} />
          </Form.Item> */}



          <Form.Item
            label="Revenue"
            name="percent"
            rules={[{ required: true, message: 'Please input !', }, { type: 'number', min: 0, max: 100, message: 'The value must be between 0 and 100' }]}
            tooltip='Please set the desired revenue share ratio and the Dependent Model. The total revenue is 100%.'
          >
            <InputNumber size="large" style={{ width: "100%" }} placeholder="revenue " suffix='%' />
          </Form.Item>
          <Row>
            <Col span={12}>

            </Col>
            {/* <Col span={12}>
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
            </Col> */}
          </Row>






          <Form.Item
            label="Dependent Model"
            tooltip='Please fill in other models that this model depends on. Only models that have been uploaded on this platform are allowed, as well as the proportion of revenue distribution. The total revenue is 100.'
          >
            <Form.List name="modelDependencyAndRevenueSharing" >
              {(fields, { add, remove, }) => (
                <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
                  {fields.map(({ key, name, ...restField }) => (
                    <Row key={key} gutter={[24, 24]}>
                      <Col span={12}>
                        <Form.Item
                          noStyle
                          {...restField}
                          name={[name, 'name']}


                          rules={[{ required: true },]}
                          wrapperCol={{ span: 12 }}
                        >
                          <DebounceSelect

                            showSearch
                            placeholder="Select"
                            fetchOptions={async (search) => {
                              const ret = await getModelList({
                                page: 1,
                                page_size: 10,
                                name: search,
                              });
                              if (ret.code === 0 && ret.data.list) {
                                return ret.data.list.map((item) => ({
                                  label: item.name,
                                  value: item.id,
                                }));
                              }
                              return []
                            }}

                            style={{ width: '100%' }}
                            size="large"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={10}>
                        <Form.Item
                          noStyle
                          {...restField}
                          name={[name, 'revenue']}



                        >
                          <InputNumber style={{ width: "100%" }} placeholder="revenue " suffix='%' size="large" />
                        </Form.Item>
                      </Col>
                      <Col span={2} style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>


                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Col>
                    </Row>
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
          <Form.Item label="Background" name="background" tooltip='Please select one as the default background color.' >
            <ColorPicker />
          </Form.Item>
          <Row>
            <Col span={12}>
              <Form.Item
                label="Model"
                name="model"
                labelCol={{ span: 12 }}
                wrapperCol={{ span: 12 }}
                rules={[{ required: true, message: 'Please upload !', }]}
                tooltip='Please upload the model ZIP file.'
              >
                <S3UploadForm />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Cover"
                name="cover"
                labelCol={{ span: 12 }}
                wrapperCol={{ span: 12 }}
                rules={[{ required: true, message: 'Please upload !', }]}
                tooltip='Please upload a model cover picture.'
              >
                <UploadImage />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal >
  );
};
