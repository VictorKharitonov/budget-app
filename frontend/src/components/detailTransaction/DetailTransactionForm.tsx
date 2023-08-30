import React, {FC} from 'react';
import {Box, Button, CircularProgress, Grid, Typography} from '@mui/material';
import {SubmitHandler, UseFormReturn} from 'react-hook-form';
import {EnvelopeItem} from '../../types/envelopes';
import Input from '../ui/input/Input';
import Select from '../ui/select/Select';
import CustomDatePicker from '../ui/customDatePicker/CustomDatePicker';
import {TransactionsItem} from "../../types/transactions";
import {currency, paymentTypes} from "../../constants";

interface DetailTransactionFormProps {
  detailForm:  UseFormReturn<TransactionsItem, any>;
  updateTransaction: SubmitHandler<TransactionsItem>;
  deleteTransaction: SubmitHandler<TransactionsItem>;
  isEditable: boolean;
  envelopes: EnvelopeItem[];
  categories: string[];
  isLoadingDelete: boolean;
  isLoadingUpdate: boolean;
}

const DetailTransactionForm: FC<DetailTransactionFormProps> = (
  {
    detailForm,
    updateTransaction,
    deleteTransaction,
    isEditable,
    envelopes,
    categories,
    isLoadingDelete,
    isLoadingUpdate
  }
) => {
  const {handleSubmit, control, formState: { errors }} = detailForm;

  let envelopesArr: string[] = envelopes.map(envelope => envelope.name);

  return (
    <Box component="form">
      <Select
        name="envelopes"
        label="Envelope"
        control={control}
        multiple={true}
        errors={errors.envelopes}
        options={envelopesArr}
        InputProps={{
          readOnly: isEditable,
        }}
      />
      <Select
        name="categories"
        label="Category"
        control={control}
        multiple={true}
        errors={errors.categories}
        options={categories}
        InputProps={{
          readOnly: isEditable,
        }}
      />
      <Select
        name="currency"
        label="Currency"
        control={control}
        errors={errors.currency}
        options={currency}
        InputProps={{
          readOnly: isEditable,
        }}
      />
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
        options={paymentTypes}
        InputProps={{
          readOnly: isEditable,
        }}
      />
      {!isEditable &&
        <Grid container spacing={1}>
          <Grid item md={6}>
            <Button
              onClick={handleSubmit(updateTransaction)}
              disabled={isLoadingUpdate || isLoadingDelete}
              type="submit"
              variant="contained"
              endIcon={
                isLoadingUpdate && <CircularProgress color="primary" size={16}/>
              }
              color="success"
              size="small"
              fullWidth
            >
                <Typography variant="body1">Save</Typography>
            </Button>
          </Grid>
            <Grid item md={6}>
              <Button
                onClick={handleSubmit(deleteTransaction)}
                disabled={isLoadingDelete || isLoadingUpdate}
                type="submit"
                variant="contained"
                endIcon={
                  isLoadingDelete && <CircularProgress color="primary" size={16}/>
                }
                color="error"
                size="small"
                fullWidth
              >
                  <Typography variant="body1">Delete</Typography>
              </Button>
            </Grid>
        </Grid>
      }
    </Box>
  );
};

export default DetailTransactionForm;
