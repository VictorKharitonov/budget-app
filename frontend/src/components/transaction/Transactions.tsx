import React, {FC, useState} from 'react';
import {CategoryItem, TransactionsItem} from '../../types';
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
  Paper, TableSortLabel
} from '@mui/material';
import {TransactionFilter, Transactions as TransactionType} from "../../types/transactions";
import TransactionsToolBar from "./TransactionsToolBar";
import {SubmitHandler, useForm} from "react-hook-form";

type Order = 'asc' | 'desc';

interface Column {
  id: 'date' | 'amount' | 'type' | 'category';
  label: string;
  format?: (value: any) => string | React.ReactNode;
}

const columns: readonly Column[] = [
  {
    id: 'date',
    label: 'Date',
    format: (value: number) => new Date(value).toLocaleDateString('en-CA')
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
  transactions: TransactionType,
  categories: CategoryItem[],
  selectedTransactionId: string,
  setSelectedTransactionId: (id: string) => void,
  isPagination?: boolean,
  isFilter?: boolean,
  rowsPerPageOptions?: number[],
  perPage?: number
}

const Transactions: FC<TransactionsProps> = (
  {
    transactions,
    categories,
    selectedTransactionId,
    setSelectedTransactionId,
    isPagination = false,
    isFilter = false,
    rowsPerPageOptions = [],
    perPage = 10
  }
) => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(perPage);
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof TransactionsItem>('date');
  const { transactions: content } = transactions;
  const filterForm = useForm<TransactionFilter>({
    defaultValues: {
      date: null,
      categories: [],
      type: '',
    },
  })

  const handleRequestFilter: SubmitHandler<TransactionFilter> = (data: TransactionFilter) => {
    let date = data.date === null ? null : data.date.valueOf();
    data = {...data, date: date};
    console.log(data);
  }

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof TransactionsItem,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const selectTransaction = (e: React.MouseEvent<HTMLTableRowElement>, id: string) => {
    setSelectedTransactionId(id);
  };

  const isSelectedTransaction = (id: string): boolean => selectedTransactionId === id;

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
        {
          isFilter &&
          <TransactionsToolBar
            categories={categories}
            form={filterForm}
            handleRequestFilter={handleRequestFilter}
          />
        }
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  className={cl.transactionsTableCell}
                >
                  {
                    isFilter
                    ? <TableSortLabel
                        active={orderBy === column.id}
                        direction={orderBy === column.id ? order : 'asc'}
                        onClick={(e) => handleRequestSort(e, column.id)}
                      >
                        {column.label}
                      </TableSortLabel>
                    : column.label
                  }

                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {content.length > 0
              ? content
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((transaction) => {
                  const isSelected: boolean = isSelectedTransaction(transaction.id);
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={transaction.id}
                      onClick={(e) => selectTransaction(e, transaction.id)}
                      selected={isSelected}
                    >
                      {columns.map((column) => {
                        const value = transaction[column.id];
                        return (
                          <TableCell key={column.id} className={cl.transactionsTableCell}>
                            {
                              column.format
                              ? column.format(value)
                              : value
                            }
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
          count={content.length}
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
