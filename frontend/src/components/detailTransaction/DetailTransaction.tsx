import React, {FC, useState} from 'react';
import {
  Box,
  Button,
  Divider,
  Grid,
  SelectChangeEvent,
  Typography
} from '@mui/material';
import Icons from '../ui/Icons';
import cl from './scss/DetailTransactions.module.scss';
import {CategoryItem, EnvelopeItem, TransactionsItem} from '../../types';
import DetailTransactionForm from './DetailTransactionForm';

interface DetailProps {
  detailTransaction: TransactionsItem,
  latestTransactions: TransactionsItem[],
  setLatestTransactions: (transactions: TransactionsItem[]) => void,
  envelopes: EnvelopeItem[],
  categories: CategoryItem[],
}

const DetailTransaction: FC<DetailProps> = (
  {
    detailTransaction,
    latestTransactions,
    setLatestTransactions,
    envelopes,
    categories
  }
) => {
  const [isEditable, setIsEditable] = useState<boolean>(true);

  const handleEditClick = () => {
    setIsEditable(!isEditable);
  };

  return (
    <Box className={cl.detailTransaction}>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        className={cl.detailHeader}
      >
        <Grid item>
          <Typography variant="body1">Detail</Typography>
        </Grid>
        <Grid item>
          <Button variant="contained" color="secondary" size="small" onClick={handleEditClick}>
            <Icons.EditIcon fontSize="small"/>
            {!isEditable
              ? <Typography variant="body1">Cancel</Typography>
              : <Typography variant="body1">Edit</Typography>
            }
          </Button>
        </Grid>
      </Grid>
      <Divider sx={{mb: 2}}/>
      <DetailTransactionForm
        detailTransaction={detailTransaction}
        latestTransactions={latestTransactions}
        setLatestTransactions={setLatestTransactions}
        isEditable={isEditable}
        envelopes={envelopes}
        categories={categories}
      />
      <Button variant="contained" color="primary" size="small" fullWidth>
        <Typography variant="body1">Share</Typography>
      </Button>
    </Box>
  );
};

export default DetailTransaction;
