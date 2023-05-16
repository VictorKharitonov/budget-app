import React, {FC, useState} from 'react';
import {TransactionsItem} from '../../types';
import cl from './scss/Transactions.module.scss';
import {
  Chip,
  Typography,
  TableRow,
  TablePagination,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Paper
} from '@mui/material';

interface Column {
  id: 'date' | 'amount' | 'type' | 'category';
  label: string;
  format?: (value: any) => string | React.ReactNode;
}

const columns: readonly Column[] = [
  {
    id: 'date',
    label: 'Date'
  },
  {
    id: 'amount',
    label: 'Amount',
    format: (value: number) => value.toFixed(2),
  },
  {
    id: 'type',
    label: 'Type',
    format: (value: string) =>
      <Chip
        className={cl.types}
        label={value}
        color={value === 'income' ? 'success' : 'error'}
        size="small"
      />
  },
  {
    id: 'category',
    label: 'Categories',
    format: (value: string[]) => value.join(', '),
  }
];

interface TransactionsProps {
  transactions: TransactionsItem[],
  isPagination?: boolean,
  rowsPerPageOptions?: number[],
  perPage?: number
}

const Transactions: FC<TransactionsProps> = ({
  transactions,
  isPagination = false,
  rowsPerPageOptions = [],
  perPage = 10
}) => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(perPage);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={cl.transactionsLayout}>
      <TableContainer className={cl.transactionsContainer}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  className={cl.transactionsTableCell}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.length > 0
              ? transactions
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((transaction) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={transaction.id}>
                      {columns.map((column) => {
                        const value = transaction[column.id];
                        return (
                          <TableCell key={column.id} className={cl.transactionsTableCell}>
                            {column.format
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })
              : <Typography variant="body1" sx={{mt: 1, p: 2}}>Transactions is empty</Typography>
            }
          </TableBody>
        </Table>
      </TableContainer>
      {
        isPagination &&
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={transactions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      }
    </Paper>
  );
};

export default Transactions;