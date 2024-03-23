import React, { useCallback, useEffect, useState } from 'react';

const usePagination = (perPage: number, count: number) => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(perPage);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);

  useEffect(() => {
    if (count) {
      setIsLastPage((page + 1) * rowsPerPage >= count);
    }
  }, [count, page, rowsPerPage]);

  const handleChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }, []);

  return {
    page,
    rowsPerPage,
    isLastPage,
    handleChangePage,
    handleChangeRowsPerPage,
    count
  };
};

export default usePagination;
