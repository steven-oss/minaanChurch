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

interface Props {
  onChangeCheck: (key: number) => void;
  setPage:(newPage:number)=>void;
  page:number;
  searchText:string;
  filteredData:DataType[];
  data:DataType[];
}

export default function RollCallListTable(props: Props) {
  const { onChangeCheck,setPage,searchText,filteredData,data,page } = props;
  const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page state


  // Define column configurations
  const columns = [
    { id: 'name', label: '姓名' },
    { id: 'notes', label: '標記(小筆記)' },
    { id: 'action', label: '簽到' },
  ];

  // Handle page change
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page on change
  };

  const displayedData = searchText ? filteredData : data; // Determine which data to display
  const paginatedData = displayedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage); // Get data for the current page

  return (
    <>
      <Box>
        {/* Table */}
        <TableContainer >
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id}>{column.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((record) => (
                <TableRow key={record.key}>
                  {columns.map((column) => (
                    <TableCell key={column.id}>
                      {column.id === 'action' ? (
                        <RollCallListCheckbox onChange={() => onChangeCheck(record.key)} />
                      ) : (
                        record[column.id as keyof DataType] // Dynamically access the value
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination Controls */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={displayedData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </>
  );
}
