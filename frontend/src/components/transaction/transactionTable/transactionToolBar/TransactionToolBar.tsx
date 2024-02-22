import React, { FC, memo, useState } from 'react';
import { Box, IconButton, Toolbar, Typography } from '@mui/material';
import Icons from '../../../ui/Icons';
import cl from '../../scss/Transactions.module.scss';
import { User } from '../../../../types/user';
import Filter from './TransactionFilter';
import { IFilter } from '../../../../types/transactions';

interface TransactionToolBarProps {
  envelopeName: string | undefined;
  user: User;
  setFilterParams: (params: IFilter[] | null) => void;
}

const TransactionToolBar: FC<TransactionToolBarProps> = ({ envelopeName, user, setFilterParams }) => {
  const [isFilterShow, setIsFilterShow] = useState(false);

  return (
    <Toolbar className={cl.toolBarContainer}>
      <Box className={cl.toolBarHeader}>
        <Typography variant="h6" component="h2" className={cl.toolBarTitle}>
          {envelopeName}
        </Typography>
        <IconButton onClick={() => setIsFilterShow(!isFilterShow)}>
          <Icons.FilterListIcon />
        </IconButton>
      </Box>
      {isFilterShow && <Filter setFilterParams={setFilterParams} categories={user.categories} />}
    </Toolbar>
  );
};

export default memo(TransactionToolBar);
