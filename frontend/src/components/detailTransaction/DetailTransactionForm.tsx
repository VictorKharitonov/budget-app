import React, {FC, useEffect} from 'react';
import {Box, Button, MenuItem, Typography, TextField} from '@mui/material';
import {LocalizationProvider, DatePicker} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import {CategoryItem, EnvelopeItem, TransactionsItem} from '../../types';
import {getTransactionById} from '../../utils/transactionsHelper';
import {detailScheme} from '../../validations/detailValidation';
import Input from '../ui/input/Input';
import Select from '../ui/select/Select';
import CustomDatePicker from '../ui/customDatePicker/CustomDatePicker';

interface DetailTransactionFormProps {
  detailTransaction: TransactionsItem,
  latestTransactions: TransactionsItem[],
  setLatestTransactions: (transactions: TransactionsItem[]) => void,
  isEditable: boolean,
  envelopes: EnvelopeItem[],
  categories: CategoryItem[]
}

const DetailTransactionForm: FC<DetailTransactionFormProps> = (
  {
    detailTransaction,
    latestTransactions,
    setLatestTransactions,
    isEditable,
    envelopes,
    categories
  }
) => {
  const {handleSubmit, control, reset, formState: {errors}} = useForm<TransactionsItem>({
    defaultValues: detailTransaction,
    resolver: yupResolver(detailScheme),
  });

  useEffect(() => {
    reset(detailTransaction);
  }, [detailTransaction]);

  const updateTransaction: SubmitHandler<TransactionsItem> = (data: TransactionsItem) => {
    data = {...data, date: data.date.valueOf()};

    if (getTransactionById(data.id, latestTransactions)) {
      setLatestTransactions(
        [...latestTransactions].map(transaction => transaction.id === data.id ? data : transaction)
      );
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(updateTransaction)}>
      <Select
        name="category"
        control={control}
        multiple={true}
        errors={errors.category}
        options={categories}
        InputProps={{
          readOnly: isEditable,
        }}      />
      <Select
        name="envelop"
        control={control}
        multiple={true}
        errors={errors.envelop}
        options={envelopes}
        InputProps={{
          readOnly: isEditable,
        }}
      />
      <Input
        name="amount"
        control={control}
        type="number"
        errors={errors.amount}
        InputProps={{
          readOnly: isEditable,
        }}
      />
      <CustomDatePicker
        name="date"
        control={control}
        format="YYYY-MM-DD"
        errors={errors.date}
        readOnly={isEditable}
     />
      <Input
        name="description"
        control={control}
        multiline maxRows={4}
        errors={errors.description}
        InputProps={{
          readOnly: isEditable,
        }}      />
      <Select
        name="type"
        control={control}
        errors={errors.type}
        options={[
          {id: 'income', name: 'income'},
          {id: 'expense', name: 'expense'}
        ]}
        InputProps={{
          readOnly: isEditable,
        }}      />
      {!isEditable &&
      <Button type="submit" variant="contained" color="success" size="small" sx={{mb: .5}} fullWidth>
        <Typography variant="body1">Save</Typography>
      </Button>
      }
    </Box>
  );
};

export default DetailTransactionForm;
