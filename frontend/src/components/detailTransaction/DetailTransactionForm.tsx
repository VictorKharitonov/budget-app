import React, {FC} from 'react';
import {Box, Button, Typography} from '@mui/material';
import {SubmitHandler, UseFormReturn} from 'react-hook-form';
import {CategoryItem, EnvelopeItem, TransactionsItem} from '../../types';
import Input from '../ui/input/Input';
import Select from '../ui/select/Select';
import CustomDatePicker from '../ui/customDatePicker/CustomDatePicker';

interface DetailTransactionFormProps {
  detailForm:  UseFormReturn<TransactionsItem, any>,
  updateTransaction: SubmitHandler<TransactionsItem>,
  isEditable: boolean,
  envelopes: EnvelopeItem[],
  categories: CategoryItem[]
}

const DetailTransactionForm: FC<DetailTransactionFormProps> = (
  {
    detailForm,
    updateTransaction,
    isEditable,
    envelopes,
    categories
  }
) => {
  const {handleSubmit, control, formState: { errors }} = detailForm;

  return (
    <Box component="form" onSubmit={handleSubmit(updateTransaction)}>
      <Select
        name="envelop"
        label="Envelope"
        control={control}
        multiple={true}
        errors={errors.envelop}
        options={envelopes}
        InputProps={{
          readOnly: isEditable,
        }}
      />
      <Select
        name="category"
        label="Category"
        control={control}
        multiple={true}
        errors={errors.category}
        options={categories}
        InputProps={{
          readOnly: isEditable,
        }}      />
      <Input
        name="amount"
        label="Amount"
        control={control}
        type="number"
        errors={errors.amount}
        InputProps={{
          readOnly: isEditable,
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
        multiline maxRows={4}
        errors={errors.description}
        InputProps={{
          readOnly: isEditable,
        }}
      />
      <Select
        name="type"
        label="Type"
        control={control}
        errors={errors.type}
        options={[
          {id: 'income', name: 'income'},
          {id: 'expense', name: 'expense'}
        ]}
        InputProps={{
          readOnly: isEditable,
        }}
      />
      {!isEditable &&
      <Button type="submit" variant="contained" color="success" size="small" sx={{mb: .5}} fullWidth>
        <Typography variant="body1">Save</Typography>
      </Button>
      }
    </Box>
  );
};

export default DetailTransactionForm;
