import React, { FC, memo, useCallback } from 'react';
import { Skeleton, TableBody, TableCell, TableRow } from '@mui/material';
import { Column, Transactions } from '../../../types/transactions';
import { selectTransactionAction } from '../../../store/asyncActions/transaction';
import { useTypedDispatch } from '../../../hooks';
import { TransactionRow } from '../index';

interface TransactionBodyProps {
  transactions: Transactions;
  columns: readonly Column[];
  scrollTo?: () => void;
}

const tableSkeletonCell = Array.from({ length: 6 }, (_, i) => {
  return (
    <TableCell key={i}>
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
    </TableCell>
  );
});

const tableSkeletonRow = Array.from({ length: 10 }, (_, i) => {
  return <TableRow key={i}>{tableSkeletonCell}</TableRow>;
});

const TransactionBody: FC<TransactionBodyProps> = ({ transactions, columns, scrollTo }) => {
  const dispatch = useTypedDispatch();
  const { transactions: content, isLoading, error, selectedTransaction } = transactions;

  const isSelectedTransaction = (id: string): boolean => (selectedTransaction ? selectedTransaction._id === id : false);

  const selectTransaction = useCallback(
    (id: string) => {
      dispatch(selectTransactionAction(id));
      if (scrollTo) {
        scrollTo();
      }
    },
    [dispatch, scrollTo]
  );

  if (isLoading) {
    return <TableBody>{tableSkeletonRow}</TableBody>;
  }

  if (error) {
    return (
      <TableBody>
        <TableRow>
          <TableCell>{error}</TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {content.length > 0 ? (
        content.map(transaction => {
          const isSelected: boolean = isSelectedTransaction(transaction._id);
          return (
            <TransactionRow
              key={transaction._id}
              onClick={selectTransaction}
              transaction={transaction}
              isSelected={isSelected}
              columns={columns}
            />
          );
        })
      ) : (
        <TableRow>
          <TableCell>Transactions is empty</TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};

export default memo(TransactionBody);
