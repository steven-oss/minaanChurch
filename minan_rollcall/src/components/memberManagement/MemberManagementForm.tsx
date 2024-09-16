import { Button, Col, Form, FormProps, Input, Radio, Row, Select, Space } from "antd";
import React, { useEffect } from "react";

const { Option } = Select;

interface FieldType {
  username?: string;
  gender?: string;
  isAdult?: boolean;
  notes?: string;
  phone?: string;
}

interface Props {
  selectedMember: any;
  form:any;
}

export default function MemberManagementForm(props: Props) {
  const { selectedMember,form } = props;
console.log(selectedMember)

  useEffect(() => {
    if (selectedMember) {
      const [prefix, phoneNumber] = selectedMember.phone.split(' ');
      form.setFieldsValue({
        username: selectedMember.username,
        gender: selectedMember.gender,
        isAdult: selectedMember.isAdult ? true : false,
        notes: selectedMember.notes,
        prefix: prefix,
        phone: phoneNumber,
        address: selectedMember.address || {},
      });
    }else{
        form.resetFields();
    }
  }, [selectedMember, form]);

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="886">+886</Option>
      </Select>
    </Form.Item>
  );

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600, padding: '48px 0px' }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="姓名"
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
        labelCol={{ span: 7 }}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="性別"
        name="gender"
        rules={[{ required: true, message: 'Please select gender!' }]}
        labelCol={{ span: 7 }}
      >
        <Select placeholder="select your gender">
          <Option value="male">男</Option>
          <Option value="female">女</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="是否為成人"
        name="isAdult"
        rules={[{ required: true, message: 'Please select your is AdultOrNot!' }]}
        labelCol={{ span: 7 }}
      >
        <Radio.Group>
          <Radio value={true}> 是 </Radio>
          <Radio value={false}> 否 </Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item 
        label="地址"
        labelCol={{ span: 7 }}
        required
        >
       <Row gutter={8}>
        <Col span={12}>
        <Form.Item
            name={['address', 'city']}
            rules={[{ required: true, message: '城市是必填項' }]}
        >
            <Select placeholder="選擇城市" style={{ width: '100%' }}>
            <Option value="NewTaipei">新北市</Option>
            <Option value="Taoyuan">桃園市</Option>
            </Select>
        </Form.Item>
        </Col>
        <Col span={12}>
        <Form.Item
            name={['address', 'area']}
            rules={[{ required: true, message: '區域是必填項' }]}
        >
            <Select placeholder="選擇區域" style={{ width: '100%' }}>
            <Option value="Shulin">樹林區</Option>
            <Option value="Sindrum">新莊區</Option>
            </Select>
        </Form.Item>
        </Col>
    </Row>
    <Form.Item
        name={['address', 'street']}
        rules={[{ required: true, message: '街道是必填項' }]}
    >
        <Input placeholder="輸入街道名稱" />
    </Form.Item>
        </Form.Item>
    
      <Form.Item
        name="notes"
        label="標記(小筆記)"
        rules={[{ required: true, message: 'Please input Notes' }]}
        labelCol={{ span: 7 }}
      >
        <Input.TextArea showCount maxLength={100} />
      </Form.Item>

      <Form.Item
        name="phone"
        label="電話"
        rules={[{ required: true, message: 'Please input your phone number!' }]}
        labelCol={{ span: 7 }}
      >
        <Input addonBefore={prefixSelector} />
      </Form.Item>

      <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
        <Button type="primary" htmlType="submit">
          送出
        </Button>
      </Form.Item>
    </Form>
  );
}
