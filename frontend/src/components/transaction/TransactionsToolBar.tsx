import React, {FC, useState} from 'react';
import {Box, Button, Grid, IconButton, Toolbar, Typography} from "@mui/material";
import Icons from "../ui/Icons";
import CustomDatePicker from "../ui/customDatePicker/CustomDatePicker";
import Select from "../ui/select/Select";
import {TransactionFilter} from "../../types/transactions";
import {SubmitHandler, UseFormReturn} from "react-hook-form";
import cl from "./scss/Transactions.module.scss";

interface TransactionsToolBarProps {
  envelopeName: string,
  categories: string[]
  form: UseFormReturn<TransactionFilter, any>,
  handleRequestFilter: SubmitHandler<TransactionFilter>
}

const TransactionsToolBar: FC<TransactionsToolBarProps> = ({envelopeName, categories, form, handleRequestFilter}) => {
  const [isFilterShow, setIsFilterShow] = useState(false);
  const {handleSubmit, control, reset} = form;

  return (
    <Toolbar className={cl.toolBarContainer}>
      <Box className={cl.toolBarHeader}>
        <Typography
          variant="h6"
          component="h2"
        >
          {envelopeName}
        </Typography>
        <IconButton onClick={() => setIsFilterShow(!isFilterShow)}>
          <Icons.FilterListIcon/>
        </IconButton>
      </Box>
      {isFilterShow &&
        <Box component="form" className={cl.toolBarForm}>
          <Grid container columnSpacing={1}>
            <Grid item xs={12} sm={6} md={3}>
              <CustomDatePicker
                name="date"
                label="Date"
                format="MM/DD/YYYY"
                control={control}
                onAccept={handleSubmit(handleRequestFilter)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Select
                name="categories"
                label="Categories"
                multiple={true}
                options={categories}
                control={control}
                onBlur={handleSubmit(handleRequestFilter)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Select
                name="type"
                label="Type"
                control={control}
                onBlur={handleSubmit(handleRequestFilter)}
                options={['income', 'expense']}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button onClick={reset} variant="contained" color="primary" size="large" fullWidth>
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