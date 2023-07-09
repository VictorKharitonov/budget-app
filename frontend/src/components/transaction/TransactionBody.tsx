import React, {FC} from 'react';
import {TableBody, TableCell, TableRow, Typography} from "@mui/material";
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

const TransactionBody: FC<TransactionBodyProps> = ({transactions, isSelectedTransaction, page, rowsPerPage, selectTransaction, columns}) => {
  const {transactions: content, isSuccess, isLoading, error} = transactions;

  if (isLoading) {
    return (
      <TableBody>
        <TableRow>
          <TableCell>
            <Typography variant="body2">Loading...</Typography>
          </TableCell>
          <TableCell>
          </TableCell>
          <TableCell>
          </TableCell>
          <TableCell>
          </TableCell>
        </TableRow>
      </TableBody>
    );
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
                  <Typography variant="body2">Transactions is empty</Typography>
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
          <Typography variant="body2">{error}</Typography>
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default TransactionBody;