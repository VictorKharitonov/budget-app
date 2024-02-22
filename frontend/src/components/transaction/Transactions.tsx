import React, { FC, useEffect, useRef, useState } from 'react';
import cl from './scss/Transactions.module.scss';
import { TableContainer, Table, Paper } from '@mui/material';
import { IFilter, TOderBy, TOrder, Transactions as TransactionType } from '../../types/transactions';
import { EnvelopeItem } from '../../types/envelopes';
import { User } from '../../types/user';
import { clearTransactionsAction } from '../../store/reducers/transactionsSlice';
import { useTypedSelector, useTypedDispatch, usePagination } from '../../hooks';
import { columns, TransactionBody, TransactionHead, TransactionPagination, TransactionsToolBar } from './index';
import { envelopeInfoAction } from '../../store/asyncActions';
import { fetchEnvelopeTransactionsAction } from '../../store/asyncActions/transaction';

interface TransactionsProps {
  transactions: TransactionType;
  user: User;
  currentEnvelope: EnvelopeItem | undefined;
  isPagination?: boolean;
  isFilter?: boolean;
  rowsPerPageOptions?: number[];
  perPage?: number;
}

const Transactions: FC<TransactionsProps> = ({
  user,
  transactions,
  isPagination = false,
  isFilter = false,
  rowsPerPageOptions = [],
  perPage = 10,
  currentEnvelope
}) => {
  const dispatch = useTypedDispatch();
  const { envelopeInfo } = useTypedSelector(state => state.envelopeInfo);
  const { page, rowsPerPage, isLastPage, handleChangeRowsPerPage, handleChangePage, count } = usePagination(
    perPage,
    envelopeInfo?.documentsCount || 0
  );
  const [order, setOrder] = useState<TOrder>('desc');
  const [orderBy, setOrderBy] = useState<TOderBy>('date');
  const [filterParams, setFilterParams] = useState<IFilter[] | null>(null);
  const { isLoading, isDeleteSuccess, isCreateSuccess } = transactions;
  const rowsPerPageOptionsRef = useRef<number[]>(rowsPerPageOptions);

  useEffect(() => {
    dispatch(clearTransactionsAction());

    if (isPagination && currentEnvelope) {
      dispatch(
        envelopeInfoAction({
          userId: user._id,
          envelopeName: currentEnvelope.name
        })
      );
    }

    if (currentEnvelope) {
      dispatch(
        fetchEnvelopeTransactionsAction({
          userId: user._id,
          envelope: currentEnvelope.name,
          limit: rowsPerPage,
          offset: page * rowsPerPage,
          sort: {
            field: orderBy,
            value: order
          },
          filter: filterParams
        })
      );
    }
    // eslint-disable-next-line
  }, [
    page,
    rowsPerPage,
    currentEnvelope?.name,
    isDeleteSuccess,
    isCreateSuccess,
    filterParams,
    isPagination,
    dispatch,
    user._id,
    orderBy,
    order
  ]);

  return (
    <Paper className={cl.transactionsLayout}>
      <TableContainer className={cl.transactionsContainer}>
        {isFilter && (
          <TransactionsToolBar user={user} envelopeName={currentEnvelope?.name} setFilterParams={setFilterParams} />
        )}
        <Table stickyHeader aria-label="sticky table">
          <TransactionHead
            isFilter={isFilter}
            columns={columns}
            orderBy={orderBy}
            order={order}
            setOrderBy={setOrderBy}
            setOrder={setOrder}
          />
          <TransactionBody transactions={transactions} columns={columns} />
        </Table>
      </TableContainer>
      {isPagination && (
        <TransactionPagination
          page={page}
          rowsPerPageOptions={rowsPerPageOptionsRef.current}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          count={count}
          isLastPage={isLastPage}
          isLoading={isLoading}
        />
      )}
    </Paper>
  );
};

export default Transactions;
