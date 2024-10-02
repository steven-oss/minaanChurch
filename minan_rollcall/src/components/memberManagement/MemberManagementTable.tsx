import React, { useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, TextField, Box, TablePagination } from '@mui/material';
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

interface Column {
  title: string;
  dataIndex?: keyof DataType; // 使用 keyof DataType 確保 dataIndex 是有效的屬性
  render?: (record: DataType) => React.ReactNode; // render 函數，只接受 record 作為參數
}

interface Props {
  onEditButton: (key: number) => void;
}

export default function MemberManagementTable(props: Props) {
  const { onEditButton } = props;
  const [searchText, setSearchText] = useState(''); // 存儲搜尋文字
  const [filteredData, setFilteredData] = useState<DataType[]>([]); // 存儲篩選後的數據
  const [page, setPage] = useState(0); // 當前頁碼
  const [rowsPerPage, setRowsPerPage] = useState(5); // 每頁顯示的行數

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
    // 更多數據
    {
      key: 4,
      name: '陳明',
      sex: '男',
      isAdult: true,
      notes: '朋友',
      address: '新北市',
      phone: '987654321',
    },
    {
      key: 5,
      name: '張小雅',
      sex: '女',
      isAdult: false,
      notes: '學生',
      address: '新北市',
      phone: '123456789',
    },
    {
      key: 6,
      name: '王大明',
      sex: '男',
      isAdult: true,
      notes: '同事',
      address: '新北市',
      phone: '123456789',
    },
  ];

  // 表格的列定義
  const columns: Column[] = [
    { title: '姓名', dataIndex: 'name' },
    { title: '性別', dataIndex: 'sex' },
    { 
      title: '是否為成人', 
      render: (record: DataType) => (record.isAdult ? '是' : '否') 
    },
    { title: '標記(小筆記)', dataIndex: 'notes' },
    { title: '住址', dataIndex: 'address' },
    { title: '電話', dataIndex: 'phone' },
    { 
      title: '會友編輯', 
      render: (record: DataType) => (
        <MemberManagementButton actionName="編輯" onClick={() => onEditButton(record.key)} />
      ) 
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

  // 分頁變更處理
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // 行數變更處理
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // 重置頁碼
  };

  // 計算要顯示的數據
  const currentData = searchText ? filteredData : data;
  const paginatedData = currentData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box>
      {/* 搜索框 */}
      <TextField
        variant="outlined"
        placeholder="搜尋會友"
        onChange={(e) => handleSearch(e.target.value)} // 即時更新
        value={searchText}
        fullWidth
        margin="normal"
      />
      {/* 表格 */}
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell key={index}>{column.title}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedData.map((record) => (
            <TableRow key={record.key}>
              {columns.map((column, index) => (
                <TableCell key={index}>
                  {column.render ? column.render(record) : record[column.dataIndex!]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* 分頁組件 */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={currentData.length} // 總行數
        rowsPerPage={rowsPerPage} // 每頁顯示的行數
        page={page} // 當前頁碼
        onPageChange={handleChangePage} // 當前頁碼改變的處理函數
        onRowsPerPageChange={handleChangeRowsPerPage} // 每頁行數改變的處理函數
      />
    </Box>
  );
}
