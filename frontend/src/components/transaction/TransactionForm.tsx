import React, {FC} from 'react';
import {Box, Button, Typography} from "@mui/material";
import {EnvelopeItem, TransactionsItem} from "../../types";
import {SubmitHandler, UseFormReturn} from "react-hook-form";
import Select from "../ui/select/Select";
import Input from "../ui/input/Input";

interface TransactionFormProps {
  transactionForm:  UseFormReturn<TransactionsItem, any>,
  envelopes: EnvelopeItem[],
  createTransaction: SubmitHandler<TransactionsItem>,
}

const TransactionForm: FC<TransactionFormProps> = ({ transactionForm, envelopes, createTransaction}) => {
  const {handleSubmit, control, formState: {errors}} = transactionForm;

  return (
    <Box component="form" onSubmit={handleSubmit(createTransaction)}>
      <Select
        name="envelop"
        label="Envelope"
        control={control}
        multiple={true}
        errors={errors.envelop}
        options={envelopes}
      />
      <Input
        name="category"
        label="Category"
        control={control}
        errors={errors.category}
      />
      <Input
        name="amount"
        label="Amount"
        control={control}
        type="number"
        errors={errors.amount}
      />
      <Input
        name="description"
        label="Description"
        control={control}
        multiline maxRows={4}
        errors={errors.description}
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
      />
      <Button type="submit" variant="contained" color="success" size="small" fullWidth>
        <Typography variant="body1">Save</Typography>
      </Button>
    </Box>
  );
};

export default TransactionForm;