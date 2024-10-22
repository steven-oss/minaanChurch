import React, { useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Box, TablePagination } from '@mui/material';
import MemberManagementButton from './MemberManagementButton.tsx';
import { DataPagination, DataType, MembersResponse } from '../../pages/memberManagement/MemberManagementScreen.tsx';

interface Column {
  title: string;
  dataIndex?: keyof DataType;
  render?: (record: DataType) => React.ReactNode;
}

interface Props {
  onEditButton: (key: number) => void;
  searchText: string;
  // filteredData: DataType[];
  data: DataType[];
  setPage: (page: number) => void;
  page: number;
  pagination:DataPagination;
}

export default function MemberManagementTable(props: Props) {
  const { onEditButton, searchText, data, setPage, page,pagination } = props;
  const [rowsPerPage, setRowsPerPage] = useState(5); 

  // 表格的列定義
  const columns: Column[] = [
    { title: '姓名', dataIndex: 'username' },
    { title: '性別', dataIndex: 'gender' },
    { 
      title: '是否為成人', 
      render: (record: DataType) => (record.isAdult ? '是' : '否') 
    },
    { title: '標記(小筆記)', dataIndex: 'notes' },
    { 
      title: '住址', 
      render: (record: DataType) => (typeof record.street === 'string' ? record.street : '地址格式錯誤') 
    }, // 渲染地址，如果地址是字符串
    { title: '電話', dataIndex: 'phone' },
    { 
      title: '會友編輯', 
      render: (record: DataType) => (
        <MemberManagementButton actionName="編輯" onClick={() => onEditButton(record.id)} />
      ) 
    },
  ];

  // 分頁變更處理
  const handleChangePage = (event: unknown, newPage: number) => {
    console.log(newPage)
    setPage(newPage);
  };

  // 行數變更處理
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
console.log(data)
  // 計算要顯示的數據
  // const currentData = searchText ? data : data;
  // const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell key={index}>{column.title}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((record) => (
            <TableRow key={record.id}>
              {columns.map((column, index) => (
                <TableCell key={index}>
                  {column.render ? column.render(record) : record[column.dataIndex as keyof DataType]}
                </TableCell>
              ))}
            </TableRow>
          ))}
          {data.length === 0 && (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                沒有找到匹配的數據
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={pagination.totalMembers}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}
