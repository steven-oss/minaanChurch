import React, { useState } from 'react';
import {  Col, Row, Table } from 'antd';
import type { TableProps } from 'antd';
import MemberManagementButton from './MemberManagementButton.tsx';

interface DataType{
  key:number;
  name:string;
  sex:string;
  isAdult:boolean;
  notes:string;
  address:string;
  phone:string;
}

interface Props{
  onEditButton:(key:number)=>void;
}

export default function MemberManagementTable(props:Props) {
  const {onEditButton} = props;
  const columns: TableProps<DataType>['columns'] = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title:'性別',
      dataIndex:'sex',
      key:'sex'
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
      title:'住址',
      dataIndex:'address',
      key:'address'
    },
    {
      title:'電話',
      dataIndex:'phone',
      key:'phone'
    },
    {
      title: '會友編輯',
      dataIndex: 'Action',
      key: 'action',
      render: (_,record) => (
        <MemberManagementButton actionName='編輯' onClick={()=>onEditButton(record.key)}/>
      ),
    },
  ];
  
  const data: DataType[] = [
    {
      key: 1,
      name: '魏榮光',
      sex:'男',
      isAdult: true,
      notes: '牧師',
      address:'新北市',
      phone:'123456789',
    },
    {
      key: 2,
      name: '李孟芹',
      sex:'女',
      isAdult: true,
      notes: '師母',
      address:'新北市',
      phone:'123456789',
    },
    {
      key: 3,
      name: '魏蘿苡',
      sex:'女',
      isAdult: false,
      notes: '牧師的女兒',
      address:'新北市',
      phone:'123456789',
    },
  ];

  return (
      <Table columns={columns} dataSource={data} />
  );
}
