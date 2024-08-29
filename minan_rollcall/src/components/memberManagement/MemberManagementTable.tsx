import React, { useState } from 'react';
import {  Table } from 'antd';
import type { TableProps } from 'antd';

interface DataType{
  key:number;
  name:string;
  isAdult:boolean;
  notes:string;
  action:any;
}
const columns: TableProps<DataType>['columns'] = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '是否為成人',
    dataIndex: 'isAdult',
    key: 'isAdult',
  },
  {
    title: '標記(小筆記)',
    dataIndex: 'notes',
    key: 'notes',
  },
  {
    title: '會友編輯',
    dataIndex: 'Action',
    key: 'action',
  },
];

const data: DataType[] = [
  {
    key: 1,
    name: '魏榮光',
    isAdult: true,
    notes: '牧師',
    action: ['nice', 'developer'],
  },
  {
    key: 2,
    name: '李孟芹',
    isAdult: true,
    notes: '師母',
    action: ['loser'],
  },
  {
    key: 3,
    name: '魏蘿苡',
    isAdult: false,
    notes: '牧師的女兒',
    action: ['cool', 'teacher'],
  },
];

interface Props{
  onButtonClick:(name:string)=>void;
}
export default function MemberManagementTable(props:Props) {
  return (
    <Table columns={columns} dataSource={data} />
  );
}
