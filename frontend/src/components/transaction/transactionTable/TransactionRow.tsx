import React, { FC, memo } from 'react';
import { TableCell, TableRow } from '@mui/material';
import cl from '../scss/Transactions.module.scss';
import { Column, TransactionsItem } from '../../../types/transactions';

interface TransactionRowProps {
  onClick: (id: string) => void;
  transaction: TransactionsItem;
  isSelected: boolean;
  columns: readonly Column[];
}

const TransactionRow: FC<TransactionRowProps> = ({ onClick, transaction, isSelected, columns }) => {
  return (
    <TableRow hover role="checkbox" tabIndex={-1} onClick={() => onClick(transaction._id)} selected={isSelected}>
      {columns.map(column => {
        const value = transaction[column.id];
        return (
          <TableCell key={column.id} className={cl.transactionsTableCell}>
            {column.format ? column.format(value) : value}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export default memo(TransactionRow);
