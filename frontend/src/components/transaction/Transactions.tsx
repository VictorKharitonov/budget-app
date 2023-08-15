import React, {FC, useEffect, useState} from 'react';
import cl from './scss/Transactions.module.scss';
import {Chip, TableRow, TablePagination, TableHead, TableContainer, TableCell, Table, Paper, TableSortLabel} from '@mui/material';
import {TransactionFilter, Transactions as TransactionType, TransactionsItem} from "../../types/transactions";
import TransactionsToolBar from "./TransactionsToolBar";
import {SubmitHandler, useForm} from "react-hook-form";
import TransactionBody from "./TransactionBody";
import {useFetch} from "../../hooks/useFetch";
import {getEnvelopeInfo} from "../../Api/budgetApi";
import {EnvelopeItem, EnvelopesInfo} from "../../types/envelopes";
import {fetchEnvelopeTransactions} from "../../store/asyncActions/transaction/fetchEnvelopeTransactionsAction";
import {useTypedDispatch} from "../../hooks/useTypedDispatch";
import {User} from "../../types/user";

type Order = 'asc' | 'desc';

export interface Column {
  id: 'date' | 'amount' | 'type' | 'categories';
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
    format: (value: number) => value?.toFixed(2),
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
    id: 'categories',
    label: 'Categories',
    format: (value: string[]) => value.join(', '),
  }
];

interface TransactionsProps {
  transactions: TransactionType,
  selectedTransactionId: string,
  user: User,
  currentEnvelope: EnvelopeItem | undefined,
  setSelectedTransactionId: (id: string) => void,
  isPagination?: boolean,
  isFilter?: boolean,
  rowsPerPageOptions?: number[],
  perPage?: number
}

const Transactions: FC<TransactionsProps> = ({user, transactions, selectedTransactionId, setSelectedTransactionId, isPagination = false, isFilter = false, rowsPerPageOptions = [], perPage = 10, currentEnvelope}) => {
  const dispatch = useTypedDispatch();
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(perPage);
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof TransactionsItem>('date');
  const [envelopeInfo, setEnvelopeInfo] = useState<EnvelopesInfo | undefined>();
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const {transactions: content, isSuccess, isLoading, isDeleteSuccess, isCreateSuccess} = transactions;

  const {fetch: requestEnvelopeInfo} = useFetch(async () => {
    if (currentEnvelope) {
      const envelopeInfo = await getEnvelopeInfo(user._id, currentEnvelope.name);
      setEnvelopeInfo(envelopeInfo);
    }
  });

  useEffect(() => {
    if (envelopeInfo) {
      setIsLastPage((page + 1) * rowsPerPage >= envelopeInfo.documentsCount);
    }
  }, [envelopeInfo]);

  useEffect(() => {
    if (isPagination && isSuccess) {
      requestEnvelopeInfo();
    }

    if (currentEnvelope) {
      dispatch(fetchEnvelopeTransactions({
        userId: user._id,
        envelope: currentEnvelope.name,
        limit: rowsPerPage,
        offset: page * rowsPerPage
      }));
    }
  }, [page, rowsPerPage, currentEnvelope?.name, isSuccess, isDeleteSuccess, isCreateSuccess]);

  const handleRequestFilter: SubmitHandler<TransactionFilter> = (data: TransactionFilter) => {
    let date = data.date === null ? null : data.date.valueOf();
    data = {...data, date: date};
  }

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof TransactionsItem) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const filterForm = useForm<TransactionFilter>({
    defaultValues: {
      date: null,
      categories: [],
      type: '',
    },
  })

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
          isFilter && currentEnvelope &&
          <TransactionsToolBar
              user={user}
              envelopeName={currentEnvelope.name}
              filterForm={filterForm}
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
          <TransactionBody
            transactions={transactions}
            page={page}
            rowsPerPage={rowsPerPage}
            isSelectedTransaction={isSelectedTransaction}
            selectTransaction={selectTransaction}
            columns={columns}
          />
        </Table>
      </TableContainer>
      {
        isPagination && envelopeInfo &&
        <TablePagination
            rowsPerPageOptions={rowsPerPageOptions}
            component="div"
            count={envelopeInfo.documentsCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            showFirstButton={true}
            showLastButton={true}
            nextIconButtonProps={{disabled: isLoading || isLastPage}}
        />
      }
    </Paper>
  );
};

export default Transactions;
