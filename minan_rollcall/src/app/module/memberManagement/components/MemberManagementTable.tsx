import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Typography } from '@material-ui/core';

interface Column {
  id: 'name' | 'isAdult' | 'notes';
  label: string;
}

const columns: Column[] = [
  { id: 'name', label: '姓名' },
  { id: 'isAdult', label: '是否為成人會員'},
  {
    id: 'notes',
    label: '標記(小筆記)'
  },
];

interface Data {
  name: string;
  isAdult: string;
  notes: string;
}

function createData(name: string, isAdult: string, notes: string): Data {
  return { name, isAdult, notes };
}

const rows = [
  createData('魏榮光', '是', '牧師'),
  createData('李孟芹', '是', '師母'),
  createData('魏蘿苡', '否', '牧師的女兒'),
];

const useStyles = makeStyles({
  root: {
    width: '100%',
    marginTop:'16px',
    padding:'16px'
  },
  container: {
    maxHeight: 440,
    marginTop:'16px'
  },
});

export default function MemberManagementTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root} elevation={3}>
      <Typography variant='h4'>會友管理</Typography>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.isAdult}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} >
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
