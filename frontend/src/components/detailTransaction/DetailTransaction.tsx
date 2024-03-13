import React, { forwardRef, ForwardRefExoticComponent, RefAttributes, useState } from 'react';
import { Box, Button, Divider, Grid, Paper, Typography } from '@mui/material';
import Icons from '../ui/Icons';
import cl from './scss/DetailTransactions.module.scss';
import { EnvelopeItem } from '../../types/envelopes';
import DetailTransactionForm from './DetailTransactionForm';
import { deleteTransactionAction, updateTransactionAction } from '../../store/asyncActions/transaction';
import { TransactionsItem } from '../../types/transactions';
import { useTypedDispatch } from '../../hooks/index';
import { Link, useLocation } from 'react-router-dom';

interface DetailTransactionProps {
  transaction: TransactionsItem | undefined;
  envelopes: EnvelopeItem[];
  categories: string[];
  currentEnvelope: EnvelopeItem | undefined;
}

const DetailTransaction: ForwardRefExoticComponent<DetailTransactionProps & RefAttributes<HTMLDivElement>> = forwardRef(
  ({ transaction, envelopes, categories, currentEnvelope }, ref) => {
    const { pathname } = useLocation();
    const [isEditable, setIsEditable] = useState<boolean>(true);
    const dispatch = useTypedDispatch();
    const [isValidTransaction, setIsValidTransaction] = useState(true);

    const handleEditClick = () => {
      setIsEditable(!isEditable);
    };

    const updateTransaction = async (data: TransactionsItem) => {
      await dispatch(updateTransactionAction(data));
      setIsEditable(true);
    };

    const deleteTransaction = (data: TransactionsItem) => {
      dispatch(
        deleteTransactionAction({
          userId: data.userId,
          _id: data._id
        })
      );
    };

    if (!transaction) {
      return (
        <Paper ref={ref}>
          <Typography variant="body1" className={cl.detailTransactionEmpty}>
            Select transaction from table to view details
          </Typography>
        </Paper>
      );
    }

    return (
      <Box
        ref={ref}
        className={
          !isEditable ? [cl.detailTransaction, isValidTransaction ? cl.isValid : cl.isInvalid] : cl.detailTransaction
        }
      >
        <Grid container className={cl.detailHeader}>
          <Grid item>
            <Typography variant="body1">Detail</Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              disabled={currentEnvelope?.status === 'closed'}
              color="secondary"
              size="small"
              onClick={handleEditClick}
            >
              <Icons.EditIcon fontSize="small" />
              {!isEditable ? (
                <Typography variant="body1">Cancel</Typography>
              ) : (
                <Typography variant="body1">Edit</Typography>
              )}
            </Button>
          </Grid>
        </Grid>
        <Divider sx={{ mb: 2 }} />
        <DetailTransactionForm
          transaction={transaction}
          onUpdate={updateTransaction}
          onDelete={deleteTransaction}
          setIsValidTransaction={setIsValidTransaction}
          isEditable={isEditable}
          envelopes={envelopes}
          categories={categories}
        />
        {isEditable && (
          <Button
            component={Link}
            to={`${pathname}/${transaction?._id}`}
            target="_blank"
            state={{ transaction }}
            variant="contained"
            color="primary"
            size="small"
            fullWidth
          >
            <Typography variant="body1">Share</Typography>
          </Button>
        )}
      </Box>
    );
  }
);

export default DetailTransaction;
