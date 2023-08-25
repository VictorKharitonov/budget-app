import React, {FC} from 'react';
import {Skeleton, TableBody, TableCell, TableRow} from "@mui/material";
import cl from "./scss/Transactions.module.scss";
import {Transactions} from "../../types/transactions";
import {Column} from "./Transactions";

interface TransactionBodyProps {
  transactions: Transactions;
  page: number;
  rowsPerPage: number;
  isSelectedTransaction: (id: string) => boolean;
  selectTransaction: (e: React.MouseEvent<HTMLTableRowElement>, id: string) => void;
  columns: readonly Column[];
}

const tableSkeletonCell = Array.from({ length: 6 }, (_, i) => {
  return (
    <TableCell key={i}>
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
    </TableCell>
  );
})

const tableSkeletonRow = Array.from({ length: 10 }, (_, i) => {
  return (
    <TableRow key={i}>
      {tableSkeletonCell}
    </TableRow>
  );
})

const TransactionBody: FC<TransactionBodyProps> = ({transactions, isSelectedTransaction, page, rowsPerPage, selectTransaction, columns}) => {
  const {transactions: content, isSuccess, isLoading, error} = transactions;

  if (isLoading) {
    return (
      <TableBody>
        {tableSkeletonRow}
      </TableBody>
    )
  }

  if (isSuccess) {
    return (
      <TableBody>
        {
          content.length > 0
            ? content.map((transaction) => {
                const isSelected: boolean = isSelectedTransaction(transaction._id);
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={transaction._id}
                    onClick={(e) => selectTransaction(e, transaction._id)}
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
            : <TableRow>
                <TableCell>
                  Transactions is empty
                </TableCell>
              </TableRow>
        }
      </TableBody>
    );
  }

  return (
    <TableBody>
      <TableRow>
        <TableCell>
          {error}
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default TransactionBody;