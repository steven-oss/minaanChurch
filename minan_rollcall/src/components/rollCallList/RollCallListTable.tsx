import React, { useState } from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Grid,
  Box,
  TablePagination,
} from '@mui/material';
import RollCallListCheckbox from './RollCallListCheckbox.tsx';
import { DataType } from '../../pages/rollCallList/RollCallListWorshipScreen.tsx';
import { DataPagination } from '../../pages/memberManagement/MemberManagementScreen.tsx';
import { Column } from '../memberManagement/MemberManagementTable.tsx';

interface Props {
  onChangeCheck: (key: number) => void;
  data:any;
  page:number;
  pagination:DataPagination;
  rowsPerPage:number;
  onChangePage:(event:unknown,page:number)=>void;
  onChangeRowsPerPage:(event:React.ChangeEvent<HTMLInputElement>)=>void;
}

export default function RollCallListTable(props: Props) {
  const { onChangeCheck,data,page,pagination,rowsPerPage,onChangePage,onChangeRowsPerPage } = props;

  const columns: Column[] = [
    { title: '姓名', dataIndex: 'username' },
    { title: '標記(小筆記)', dataIndex: 'notes' },
    { title:'簽到',dataIndex:'check'}
  ];
  return (
    <>
      <Box>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column,index) => (
                  <TableCell key={index}>{column.title}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((record) => (
                <TableRow key={record.id}>
                  {columns.map((column,index) => (
                    <TableCell key={index}>
                      {column.title === '簽到' ? (
                        <RollCallListCheckbox onChange={() => onChangeCheck(record.id)} checked={record.check}/>
                      ) : (
                        record[column.dataIndex as keyof DataType] // Dynamically access the value
                      )}
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
        {/* Pagination Controls */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={pagination.totalMembers}
          rowsPerPage={rowsPerPage}
          page={pagination.totalMembers > 0 ? page : 0} // 確保當沒有成員時，頁數設為 0
          onPageChange={onChangePage}
          onRowsPerPageChange={onChangeRowsPerPage}
        />
      </Box>
    </>
  );
}
