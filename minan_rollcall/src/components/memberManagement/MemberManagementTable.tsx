import React, { useState } from 'react';
import { Col, Row, Table, Input } from 'antd';
import type { TableProps } from 'antd';
import MemberManagementButton from './MemberManagementButton.tsx';

interface DataType {
  key: number;
  name: string;
  sex: string;
  isAdult: boolean;
  notes: string;
  address: string;
  phone: string;
}

interface Props {
  onEditButton: (key: number) => void;
}

export default function MemberManagementTable(props: Props) {
  const { onEditButton } = props;
  const [searchText, setSearchText] = useState(''); // 存儲搜尋文字
  const [filteredData, setFilteredData] = useState<DataType[]>([]); // 存儲篩選後的數據

  // 表格的列定義
  const columns: TableProps<DataType>['columns'] = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '性別',
      dataIndex: 'sex',
      key: 'sex',
    },
    {
      title: '是否為成人',
      dataIndex: 'isAdult',
      key: 'isAdult',
      render: (isAdult: boolean) => (isAdult ? '是' : '否'),
    },
    {
      title: '標記(小筆記)',
      dataIndex: 'notes',
      key: 'notes',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '電話',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '會友編輯',
      dataIndex: 'Action',
      key: 'action',
      render: (_, record) => (
        <MemberManagementButton actionName='編輯' onClick={() => onEditButton(record.key)} />
      ),
    },
  ];

  // 原始數據
  const data: DataType[] = [
    {
      key: 1,
      name: '魏榮光',
      sex: '男',
      isAdult: true,
      notes: '牧師',
      address: '新北市',
      phone: '123456789',
    },
    {
      key: 2,
      name: '李孟芹',
      sex: '女',
      isAdult: true,
      notes: '師母',
      address: '新北市',
      phone: '123456789',
    },
    {
      key: 3,
      name: '魏蘿苡',
      sex: '女',
      isAdult: false,
      notes: '牧師的女兒',
      address: '新北市',
      phone: '123456789',
    },
  ];

  // 當輸入框改變時觸發的函數
  const handleSearch = (value: string) => {
    setSearchText(value);

    const filtered = data.filter((item) =>
      Object.keys(item).some((key) =>
        String(item[key as keyof DataType]).toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredData(filtered); // 更新篩選後的數據
  };

  return (
    <div>
      {/* 搜索框 */}
      <Row style={{ marginBottom: 16 }}>
        <Col span={8}>
          <Input.Search
            placeholder="搜尋會友"
            onSearch={handleSearch}
            onChange={(e) => handleSearch(e.target.value)} // 即時更新
            allowClear
          />
        </Col>
      </Row>
      {/* 表格 */}
      <Table columns={columns} dataSource={searchText ? filteredData : data} />
    </div>
  );
}
