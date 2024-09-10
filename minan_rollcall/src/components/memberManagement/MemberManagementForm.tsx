import { Button, Checkbox, Form, FormProps, Input, Radio, Select } from "antd";
import React from "react";

const { Option } = Select;

interface FieldType{
    username?: string;
    notes?: string;
    remember?: string;
}

export default function MemberManagementForm(){
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

    return(
        <Form  
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ 
                maxWidth: 600,
                padding: '48px 0px',
            }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
             <Form.Item<FieldType>
                label="姓名"
                name="username"
                rules={[{ required: true, message: 'Please input your Username!' }]}
                style={{width:'90%'}}
                >
            <Input />
            </Form.Item>
            <Form.Item
                label="性別"
                name="gender"
                rules={[{ required: true, message: 'Please select gender!' }]}
                style={{width:'90%'}}
            >
                <Select placeholder="select your gender">
                <Option value="male">男</Option>
                <Option value="female">女</Option>
                </Select>
            </Form.Item>
            <Form.Item label="是否為成人" name="isAdult" rules={[{ required: true, message: 'Please select your is AdultOrNot!' }]} style={{width:'90%'}}>
                <Radio.Group>
                    <Radio value="true"> 是 </Radio>
                    <Radio value="false"> 否 </Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item
                name="notes"
                label="標記(小筆記)"
                rules={[{ required: true, message: 'Please input Notes' }]}
                style={{width:'90%'}}
            >
                <Input.TextArea showCount maxLength={100} />
            </Form.Item>
            <Form.Item
                name="phone"
                label="電話"
                rules={[{ required: true, message: 'Please input your phone number!' }]}
                style={{ width: '90%' }} 
            >
                <Input addonBefore={prefixSelector} />
            </Form.Item>
            <Form.Item style={{display:'flex',justifyContent:'center'}}>
                <Button type="primary" htmlType="submit">
                    送出
                </Button>
            </Form.Item>
        </Form>
    );
}