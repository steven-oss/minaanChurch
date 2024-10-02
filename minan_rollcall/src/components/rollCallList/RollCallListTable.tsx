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

interface DataType {
  key: number;
  name: string;
  notes: string;
}

interface Props {
  onChangeCheck: (key: number) => void;
  onBackPage: () => void;
}

export default function RollCallListTable(props: Props) {
  const { onChangeCheck, onBackPage } = props;
  const [searchText, setSearchText] = useState(''); // Store search text
  const [filteredData, setFilteredData] = useState<DataType[]>([]); // Store filtered data
  const [page, setPage] = useState(0); // Current page state
  const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page state

  // Original data
  const data: DataType[] = [
    { key: 1, name: '魏榮光', notes: '牧師' },
    { key: 2, name: '李孟芹', notes: '師母' },
    { key: 3, name: '魏蘿苡', notes: '牧師的女兒' },
    { key: 4, name: '張三', notes: '朋友' },
    { key: 5, name: '李四', notes: '同學' },
    { key: 6, name: '王五', notes: '鄰居' },
    // Add more data as needed for pagination
  ];

  // Define column configurations
  const columns = [
    { id: 'name', label: '姓名' },
    { id: 'notes', label: '標記(小筆記)' },
    { id: 'action', label: '簽到' },
  ];

  // Handle search input change
  const handleSearch = (value: string) => {
    setSearchText(value);

    const filtered = data.filter((item) =>
      Object.keys(item).some((key) =>
        String(item[key as keyof DataType]).toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredData(filtered); // Update filtered data
    setPage(0); // Reset page when filtering
  };

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
        {/* Search and Button Row */}
        <Grid container spacing={2} alignItems="center" sx={{ mb: 1 }}>
          <Grid item xs={8}>
            <TextField
              label="搜尋會友"
              variant="outlined"
              value={searchText}
              onChange={(e) => handleSearch(e.target.value)} // Update search on change
            />
          </Grid>
          <Grid item xs={4}>
            <Grid container justifyContent="flex-end">
              <Button variant="contained" color="primary" onClick={onBackPage}>
                返回
              </Button>
            </Grid>
          </Grid>
        </Grid>

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
