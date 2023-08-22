import React, {FC} from 'react';
import {Box, Button, CircularProgress, Typography} from "@mui/material";
import {EnvelopeItem} from "../../types/envelopes";
import {SubmitHandler, UseFormReturn} from "react-hook-form";
import Select from "../ui/select/Select";
import Input from "../ui/input/Input";
import {TransactionsItem} from "../../types/transactions";

interface TransactionFormProps {
  transactionForm:  UseFormReturn<TransactionsItem, any>,
  envelopes: EnvelopeItem[],
  createTransaction: SubmitHandler<TransactionsItem>,
  isLoading: boolean,
}

const TransactionForm: FC<TransactionFormProps> = ({ transactionForm, envelopes, createTransaction, isLoading}) => {
  const {handleSubmit, control, formState: {errors}} = transactionForm;
  const envelopesArr = envelopes.map(envelope => envelope.name);

  return (
    <Box component="form" onSubmit={handleSubmit(createTransaction)}>
      <Select
        name="envelopes"
        label="Envelope"
        control={control}
        multiple={true}
        errors={errors.envelopes}
        options={envelopesArr}
      />
      <Input
        name="categories"
        label="Category"
        control={control}
        errors={errors.categories}
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
        options={['income', 'expenses']}
      />
      <Button
        type="submit"
        variant="contained"
        color="success"
        size="small"
        endIcon={
          isLoading && <CircularProgress color="secondary" size={16}/>
        }
        fullWidth
      >
        <Typography variant="body1">Save</Typography>
      </Button>
    </Box>
  );
};

export default TransactionForm;
