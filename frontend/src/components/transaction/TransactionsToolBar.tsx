import React, {FC, useState} from 'react';
import {Box, Button, Grid, IconButton, Toolbar, Typography} from "@mui/material";
import Icons from "../ui/Icons";
import CustomDatePicker from "../ui/customDatePicker/CustomDatePicker";
import Select from "../ui/select/Select";
import {TransactionFilter} from "../../types/transactions";
import {SubmitHandler, UseFormReturn} from "react-hook-form";
import cl from "./scss/Transactions.module.scss";
import {User} from "../../types/user";
import {Filter} from "../../store/asyncActions/transaction/fetchEnvelopeTransactionsAction";
import {paymentTypes} from "../../constants";

interface TransactionsToolBarProps {
  envelopeName: string;
  user: User;
  filterForm: UseFormReturn<TransactionFilter>;
  defaultValues: TransactionFilter;
  setFilterParams: (params: Filter[] | null) => void;
  handleRequestFilter: SubmitHandler<TransactionFilter>;
}

const TransactionsToolBar: FC<TransactionsToolBarProps> = ({envelopeName, user, filterForm, defaultValues, setFilterParams, handleRequestFilter}) => {
  const [isFilterShow, setIsFilterShow] = useState(false);
  const {handleSubmit, control, reset, setValue} = filterForm;

  const handleResetFilterForm = () => {
    reset(defaultValues);
    setFilterParams(null);
  };

  const handleFilterOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, handleSubmit: any) => {
    setValue(e.target.name as keyof TransactionFilter, e.target.value);
    handleSubmit();
  }

  return (
    <Toolbar className={cl.toolBarContainer}>
      <Box className={cl.toolBarHeader}>
       <Typography
          variant="h6"
          component="h2"
          className={cl.toolBarTitle}
        >
          {envelopeName}
        </Typography>
        <IconButton onClick={() => setIsFilterShow(!isFilterShow)}>
          <Icons.FilterListIcon/>
        </IconButton>
      </Box>
      {isFilterShow &&
        <Box component="form" className={cl.toolBarForm} >
          <Grid container columnSpacing={1}>
            <Grid item xs={12} sm={6} md={3}>
              <CustomDatePicker
                name="date"
                label="Date"
                format="YYYY/MM/DD"
                control={control}
                onAccept={handleSubmit(handleRequestFilter)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Select
                name="categories"
                label="Categories"
                multiple={true}
                options={user.categories}
                control={control}
                onChange={(e) => handleFilterOnChange(e, handleSubmit(handleRequestFilter))}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Select
                name="type"
                label="Type"
                control={control}
                onChange={(e) => handleFilterOnChange(e, handleSubmit(handleRequestFilter))}
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
      }
    </Toolbar>
  );
};

export default TransactionsToolBar;
