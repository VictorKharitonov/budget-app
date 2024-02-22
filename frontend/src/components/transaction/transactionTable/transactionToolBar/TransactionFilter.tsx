import React, { FC, memo } from 'react';
import cl from '../../scss/Transactions.module.scss';
import { Box, Button, Grid, Typography } from '@mui/material';
import CustomDatePicker from '../../../ui/customDatePicker/CustomDatePicker';
import Select from '../../../ui/select/Select';
import { paymentTypes } from '../../../../constants';
import { IFilter, ITransactionFilter } from '../../../../types/transactions';
import { SubmitHandler, useForm } from 'react-hook-form';

interface TransactionFilterProps {
  setFilterParams: (params: IFilter[] | null) => void;
  categories: string[];
}

const TransactionFilter: FC<TransactionFilterProps> = ({ setFilterParams, categories }) => {
  const defaultFilterValues: ITransactionFilter = {
    date: null,
    categories: [],
    type: ''
  };

  const { handleSubmit, control, reset, setValue } = useForm<ITransactionFilter>({
    defaultValues: defaultFilterValues
  });

  const filterTransactions: SubmitHandler<ITransactionFilter> = (data: ITransactionFilter) => {
    let date = data.date === null ? null : data.date.valueOf();
    let modifyData: IFilter[] = [];
    data = { ...data, date: date };

    for (let filterParam in data) {
      let filterField = filterParam as keyof ITransactionFilter;
      let filterValue = data[filterField];

      if (filterValue) {
        modifyData.push({ field: filterField, value: filterValue });
      }
    }

    setFilterParams(modifyData);
  };

  const handleResetFilterForm = () => {
    reset(defaultFilterValues);
    setFilterParams(null);
  };

  const handleFilterOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, handleSubmit: any) => {
    setValue(e.target.name as keyof ITransactionFilter, e.target.value);
    handleSubmit();
  };

  return (
    <Box component="form" className={cl.toolBarForm}>
      <Grid container columnSpacing={1}>
        <Grid item xs={12} sm={6} md={3}>
          <CustomDatePicker
            name="date"
            label="Date"
            format="YYYY/MM/DD"
            control={control}
            onAccept={handleSubmit(filterTransactions)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Select
            name="categories"
            label="Categories"
            multiple={true}
            options={categories}
            control={control}
            onChange={e => handleFilterOnChange(e, handleSubmit(filterTransactions))}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Select
            name="type"
            label="Type"
            control={control}
            onChange={e => handleFilterOnChange(e, handleSubmit(filterTransactions))}
            options={paymentTypes}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button onClick={handleResetFilterForm} variant="contained" color="primary" size="large" fullWidth>
            <Typography variant="body1">Reset</Typography>
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default memo(TransactionFilter);
