import React, { FC, memo } from 'react';
import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import cl from '../scss/Transactions.module.scss';
import { Column, TOderBy, TOrder } from '../../../types/transactions';

interface TransactionHeadProps {
  isFilter: boolean;
  columns: readonly Column[];
  orderBy: TOderBy;
  order: TOrder;
  setOrderBy: (val: TOderBy) => void;
  setOrder: (val: TOrder) => void;
}

const TransactionHead: FC<TransactionHeadProps> = ({ isFilter, columns, orderBy, order, setOrderBy, setOrder }) => {
  const handleRequestSort = (event: React.MouseEvent<unknown>, property: TOderBy) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <TableHead>
      <TableRow>
        {columns.map(column => (
          <TableCell key={column.id} className={cl.transactionsTableCell}>
            {isFilter ? (
              <TableSortLabel
                active={orderBy === column.id}
                direction={orderBy === column.id ? order : 'asc'}
                onClick={e => handleRequestSort(e, column.id)}
              >
                {column.label}
              </TableSortLabel>
            ) : (
              column.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default memo(TransactionHead);
