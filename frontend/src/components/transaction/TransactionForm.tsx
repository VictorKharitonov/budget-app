import React, { FC, memo, useEffect } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { EnvelopeItem } from '../../types/envelopes';
import { SubmitHandler, useForm } from 'react-hook-form';
import Select from '../ui/select/Select';
import Input from '../ui/input/Input';
import { TransactionsItem } from '../../types/transactions';
import { currency, paymentTypes } from '../../constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { transactionScheme } from '../../validations/transactionValidation';

interface TransactionFormProps {
  userId: string;
  envelopes: EnvelopeItem[];
  onSubmit: (data: TransactionsItem) => void;
  isLoading: boolean;
}

const TransactionForm: FC<TransactionFormProps> = ({ userId, envelopes, onSubmit, isLoading }) => {
  const envelopesArr = envelopes.map(envelope => envelope.name);

  const defaultTransaction: Omit<TransactionsItem, '_id'> = {
    userId: '',
    categories: [],
    amount: 0,
    currency: '',
    description: '',
    date: Date.now(),
    type: 'income',
    envelopes: []
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<TransactionsItem>({
    defaultValues: defaultTransaction,
    resolver: yupResolver(transactionScheme)
  });

  const handleSubmitForm: SubmitHandler<TransactionsItem> = async (data: TransactionsItem) => {
    data = { ...data, userId: userId };
    onSubmit(data);
    reset();
  };

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return (
    <Box component="form" onSubmit={handleSubmit(handleSubmitForm)}>
      <Select name="currency" label="Currency" control={control} errors={errors.currency} options={currency} />
      <Select
        name="envelopes"
        label="Envelope"
        control={control}
        multiple={true}
        errors={errors.envelopes}
        options={envelopesArr}
      />
      <Input name="categories" label="Category" control={control} errors={errors.categories} />
      <Input name="amount" label="Amount" control={control} type="number" errors={errors.amount} />
      <Input
        name="description"
        label="Description"
        control={control}
        multiline
        maxRows={4}
        errors={errors.description}
      />
      <Select name="type" label="Type" control={control} errors={errors.type} options={paymentTypes} />
      <Button
        type="submit"
        variant="contained"
        color="success"
        size="small"
        endIcon={isLoading && <CircularProgress color="secondary" size={16} />}
        fullWidth
      >
        <Typography variant="body1">Save</Typography>
      </Button>
    </Box>
  );
};

export default memo(TransactionForm);
