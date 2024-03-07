import React, { FC, useEffect, useRef, useState } from 'react';
import cl from './scss/Transactions.module.scss';
import { TableContainer, Table, Paper } from '@mui/material';
import { IFilter, TOderBy, TOrder, Transactions as TransactionType } from '../../types/transactions';
import { EnvelopeItem } from '../../types/envelopes';
import { User } from '../../types/user';
import { useTypedSelector, useTypedDispatch, usePagination } from '../../hooks';
import { columns, TransactionBody, TransactionHead, TransactionPagination, TransactionsToolBar } from './index';
import { envelopeInfoAction } from '../../store/asyncActions';
import { fetchEnvelopeTransactionsAction, clearTransactionsAction } from '../../store/asyncActions/transaction';
import { useParams } from 'react-router-dom';

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
  const { envelopeInfo, isLoading: paginationLoading } = useTypedSelector(state => state.envelopeInfo);
  const { page, rowsPerPage, isLastPage, handleChangeRowsPerPage, handleChangePage, count } = usePagination(
    perPage,
    envelopeInfo?.documentsCount || 0
  );
  const [order, setOrder] = useState<TOrder>('desc');
  const [orderBy, setOrderBy] = useState<TOderBy>('date');
  const [filterParams, setFilterParams] = useState<IFilter[] | null>(null);
  const { isLoading, isDeleteSuccess, isCreateSuccess } = transactions;
  const rowsPerPageOptionsRef = useRef<number[]>(rowsPerPageOptions);
  const params = useParams<string>();

  useEffect(() => {
    if (!isPagination || !currentEnvelope) {
      return;
    }

    const fetchEnvelopeInfo = dispatch(
      envelopeInfoAction({
        userId: user._id,
        envelopeName: currentEnvelope.name
      })
    );

    return () => {
      fetchEnvelopeInfo.abort();
    };
  }, [dispatch, isPagination, currentEnvelope, user._id]);

  useEffect(() => {
    dispatch(clearTransactionsAction(user.envelopes.length));

    if (!currentEnvelope || !params.id) {
      return;
    }

    const fetchEnvelopeTransactions = dispatch(
      fetchEnvelopeTransactionsAction({
        userId: user._id,
        envelope: currentEnvelope.name || params.id,
        limit: rowsPerPage,
        offset: page * rowsPerPage,
        sort: {
          field: orderBy,
          value: order
        },
        filter: filterParams
      })
    );

    return () => {
      fetchEnvelopeTransactions.abort();
    };
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
      {isPagination && !paginationLoading && (
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
