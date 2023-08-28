import React, {FC, useEffect, useState} from 'react';
import {Alert, Box, Button, Divider, Grid, Typography} from '@mui/material';
import Icons from '../ui/Icons';
import cl from './scss/DetailTransactions.module.scss';
import {EnvelopeItem} from '../../types/envelopes';
import DetailTransactionForm from './DetailTransactionForm';
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {detailScheme} from "../../validations/detailValidation";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import {deleteTransactionAction} from "../../store/asyncActions/transaction/deleteTransactionAction";
import {updateTransactionAction} from "../../store/asyncActions/transaction/updateTransactionAction";
import {TransactionsItem} from "../../types/transactions";
import {useTypedSelector} from "../../hooks/useTypedSelector";

interface DetailProps {
  transaction: TransactionsItem | undefined;
  envelopes: EnvelopeItem[];
  categories: string[];
  currentEnvelope: EnvelopeItem | undefined;
}

const DetailTransaction: FC<DetailProps> = ({transaction, envelopes, categories, currentEnvelope}) => {
  const [isEditable, setIsEditable] = useState<boolean>(true);
  const dispatch = useTypedDispatch();
  const {isLoadingDelete, deleteError, isLoadingUpdate, updateError} = useTypedSelector(state => state.transactions);

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

  const updateTransaction: SubmitHandler<TransactionsItem> = async (data: TransactionsItem) => {
    data = {...data, date: data.date.valueOf()};
    await dispatch(updateTransactionAction(data));
    setIsEditable(true);
  };

  const deleteTransaction: SubmitHandler<TransactionsItem> = (data: TransactionsItem) => {
    dispatch(deleteTransactionAction({
      userId: data.userId,
      _id: data._id
    }));
  }

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
          <Button variant="contained" disabled={currentEnvelope?.status === 'closed'} color="secondary" size="small" onClick={handleEditClick}>
            <Icons.EditIcon fontSize="small"/>
            {
              !isEditable
                ? <Typography variant="body1">Cancel</Typography>
                : <Typography variant="body1">Edit</Typography>
            }
          </Button>
        </Grid>
      </Grid>
      <Divider sx={{mb: 2}}/>
      {
        deleteError &&
        <Alert severity="error" sx={{ mb: 2}}>{deleteError}</Alert>
      }
      {
        updateError &&
        <Alert severity="error" sx={{ mb: 2}}>{updateError}</Alert>
      }
      <DetailTransactionForm
        detailForm={detailForm}
        updateTransaction={updateTransaction}
        deleteTransaction={deleteTransaction}
        isEditable={isEditable}
        envelopes={envelopes}
        categories={categories}
        isLoadingDelete={isLoadingDelete}
        isLoadingUpdate={isLoadingUpdate}
      />
      {
        isEditable &&
        <Button variant="contained" color="primary" size="small" fullWidth>
          <Typography variant="body1">Share</Typography>
        </Button>
      }
    </Box>
  );
};

export default DetailTransaction;
