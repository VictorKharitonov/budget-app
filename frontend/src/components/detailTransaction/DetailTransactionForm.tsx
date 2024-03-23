import React, { FC, memo, useEffect } from 'react';
import { Alert, Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { EnvelopeItem } from '../../types/envelopes';
import Input from '../ui/input/Input';
import Select from '../ui/select/Select';
import CustomDatePicker from '../ui/customDatePicker/CustomDatePicker';
import { TransactionsItem } from '../../types/transactions';
import { currency, paymentTypes } from '../../constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { detailScheme } from '../../validations/detailValidation';
import { useTypedSelector } from '../../hooks';

interface DetailTransactionFormProps {
  transaction: TransactionsItem | undefined;
  onUpdate: (data: TransactionsItem) => Promise<void>;
  onDelete: (data: TransactionsItem) => void;
  setIsValidTransaction: (val: boolean) => void;
  isEditable: boolean;
  envelopes: EnvelopeItem[];
  categories: string[];
}

const DetailTransactionForm: FC<DetailTransactionFormProps> = ({
  transaction,
  onUpdate,
  onDelete,
  setIsValidTransaction,
  isEditable,
  envelopes,
  categories
}) => {
  const { isLoadingDelete, deleteError, isLoadingUpdate, updateError } = useTypedSelector(state => state.transactions);

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset
  } = useForm<TransactionsItem>({
    defaultValues: transaction,
    resolver: yupResolver(detailScheme),
    mode: 'onChange'
  });

  const handleUpdate: SubmitHandler<TransactionsItem> = async (data: TransactionsItem) => {
    data = { ...data, date: data.date.valueOf() };
    onUpdate(data);
  };

  const handleDelete: SubmitHandler<TransactionsItem> = async (data: TransactionsItem) => {
    data = { ...data, date: data.date.valueOf() };
    onDelete(data);
  };

  useEffect(() => {
    setIsValidTransaction(isValid);
  }, [isValid, setIsValidTransaction]);

  useEffect(() => {
    reset(transaction);
  }, [transaction, isEditable, reset]);

  let envelopesArr: string[] = envelopes.map(envelope => envelope.name);

  return (
    <>
      {deleteError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {deleteError}
        </Alert>
      )}
      {updateError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {updateError}
        </Alert>
      )}
      <Box component="form">
        <Select
          name="envelopes"
          label="Envelopes"
          control={control}
          multiple={true}
          errors={errors.envelopes}
          options={envelopesArr}
          InputProps={{
            readOnly: isEditable
          }}
        />
        <Select
          name="categories"
          label="Categories"
          control={control}
          multiple={true}
          errors={errors.categories}
          options={categories}
          InputProps={{
            readOnly: isEditable
          }}
        />
        <Select
          name="currency"
          label="Currency"
          control={control}
          errors={errors.currency}
          options={currency}
          InputProps={{
            readOnly: isEditable
          }}
        />
        <Input
          name="amount"
          label="Amount"
          control={control}
          type="number"
          errors={errors.amount}
          InputProps={{
            readOnly: isEditable
          }}
        />
        <CustomDatePicker
          name="date"
          label="Date"
          control={control}
          format="YYYY-MM-DD"
          errors={errors.date}
          readOnly={isEditable}
        />
        <Input
          name="description"
          label="Description"
          control={control}
          multiline
          maxRows={4}
          errors={errors.description}
          InputProps={{
            readOnly: isEditable
          }}
        />
        <Select
          name="type"
          label="Type"
          control={control}
          errors={errors.type}
          options={paymentTypes}
          InputProps={{
            readOnly: isEditable
          }}
        />
        {!isEditable && (
          <Grid container spacing={1}>
            <Grid item md={6}>
              <Button
                onClick={handleSubmit(handleUpdate)}
                disabled={isLoadingUpdate || isLoadingDelete}
                type="submit"
                variant="contained"
                endIcon={isLoadingUpdate && <CircularProgress color="primary" size={16} />}
                color="success"
                size="small"
                fullWidth
              >
                <Typography variant="body1">Save</Typography>
              </Button>
            </Grid>
            <Grid item md={6}>
              <Button
                onClick={handleSubmit(handleDelete)}
                disabled={isLoadingDelete || isLoadingUpdate}
                type="submit"
                variant="contained"
                endIcon={isLoadingDelete && <CircularProgress color="primary" size={16} />}
                color="error"
                size="small"
                fullWidth
              >
                <Typography variant="body1">Delete</Typography>
              </Button>
            </Grid>
          </Grid>
        )}
      </Box>
    </>
  );
};

export default memo(DetailTransactionForm);
