import React, { useState } from 'react';
import { Col, Row, Table, Input } from 'antd';
import type { TableProps } from 'antd';
import RollCallListCheckbox from './RollCallListCheckbox.tsx';
import RollCallListButton from './RollCallListButton.tsx';

interface DataType {
  key: number;
  name: string;
  notes: string;
}

interface Props{
    onChangeCheck:(key:number)=>void
    onBackPage:()=>void;
}
export default function RollCallListTable(props:Props) {
  const {onChangeCheck,onBackPage} = props;
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
        title: '標記(小筆記)',
        dataIndex: 'notes',
        key: 'notes',
    },
    {
      title: '簽到',
      dataIndex: 'Action',
      key: 'action',
      render: (_, record) => (
        <RollCallListCheckbox onChange={() => onChangeCheck(record.key)} />
      ),
    },
  ];

  // 原始數據
  const data: DataType[] = [
    {
      key: 1,
      name: '魏榮光',
      notes: '牧師',
    },
    {
      key: 2,
      name: '李孟芹',
      notes: '師母',
    },
    {
      key: 3,
      name: '魏蘿苡',
      notes: '牧師的女兒',
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
    <>
      {/* 搜索框 */}
      <Row style={{ marginBottom: 16 }}>
        <Col span={24}>
            <Row justify="space-between" align="middle">
                <Col>
                    <Input.Search
                        placeholder="搜尋會友"
                        onSearch={handleSearch}
                        onChange={(e) => handleSearch(e.target.value)} // 即時更新
                        allowClear
                        style={{ width: '100%' }} // Optional: ensure the input takes full width
                    />
                </Col>
                <Col>
                    <RollCallListButton actionName="返回" onClick={onBackPage} />
                </Col>
            </Row>
        </Col>
    </Row>

      {/* 表格 */}
      <Table columns={columns} dataSource={searchText ? filteredData : data} />
    </>
  );
}
