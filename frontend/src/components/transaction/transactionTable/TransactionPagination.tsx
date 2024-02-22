import React, { FC, memo } from 'react';
import { TablePagination } from '@mui/material';

interface TransactionPaginationProps {
  rowsPerPageOptions: number[];
  count: number;
  rowsPerPage: number;
  page: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  isLastPage: boolean;
}

const TransactionPagination: FC<TransactionPaginationProps> = ({
  rowsPerPage,
  rowsPerPageOptions,
  count,
  page,
  onRowsPerPageChange,
  isLastPage,
  onPageChange,
  isLoading
}) => {
  return (
    <TablePagination
      rowsPerPageOptions={rowsPerPageOptions}
      component="div"
      count={count}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
      showFirstButton={true}
      showLastButton={true}
      nextIconButtonProps={{ disabled: isLoading || isLastPage }}
    />
  );
};

export default memo(TransactionPagination);
