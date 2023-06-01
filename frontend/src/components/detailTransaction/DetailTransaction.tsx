import React, {FC, useEffect, useState} from 'react';
import { Box, Button, Divider, Grid, Typography } from '@mui/material';

import Icons from '../ui/Icons';
import cl from './scss/DetailTransactions.module.scss';
import {CategoryItem, EnvelopeItem, TransactionsItem} from '../../types';
import DetailTransactionForm from './DetailTransactionForm';
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {detailScheme} from "../../validations/detailValidation";
import {getTransactionById} from "../../utils/transactionsHelper";

interface DetailProps {
  transaction: TransactionsItem | undefined,
  latestTransactions: TransactionsItem[],
  setLatestTransactions: (transactions: TransactionsItem[]) => void,
  envelopes: EnvelopeItem[],
  categories: CategoryItem[],
}

const DetailTransaction: FC<DetailProps> = (
  {
    transaction,
    latestTransactions,
    setLatestTransactions,
    envelopes,
    categories
  }
) => {
  const [isEditable, setIsEditable] = useState<boolean>(true);

  const detailForm = useForm<TransactionsItem>({
    defaultValues: transaction,
    resolver: yupResolver(detailScheme),
    mode: "onChange"
  });

  const {reset, formState: {isValid}} = detailForm;

  const handleEditClick = () => {
    setIsEditable(!isEditable);
  };

  useEffect(() => {
    reset(transaction);
  }, [transaction, isEditable]);

  const updateTransaction: SubmitHandler<TransactionsItem> = (data: TransactionsItem) => {
    data = {...data, date: data.date.valueOf()};
    setIsEditable(true);

    if (getTransactionById(data.id, latestTransactions)) {
      setLatestTransactions(
        [...latestTransactions].map(transaction => transaction.id === data.id ? data : transaction)
      );
    }
  };

  return (
    <Box className={
      !isEditable
        ? [cl.detailTransaction, isValid ? cl.isValid : cl.isInvalid]
        : cl.detailTransaction
    }>
      <Grid container className={cl.detailHeader}>
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
        detailForm={detailForm}
        updateTransaction={updateTransaction}
        isEditable={isEditable}
        envelopes={envelopes}
        categories={categories}
      />
      {isEditable &&
        <Button variant="contained" color="primary" size="small" fullWidth>
          <Typography variant="body1">Share</Typography>
        </Button>
      }
    </Box>
  );
};

export default DetailTransaction;
