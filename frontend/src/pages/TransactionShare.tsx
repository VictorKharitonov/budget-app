import React, { FC, useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { fetchEnvelopeTransactions } from '../store/asyncActions/transaction/fetchEnvelopeTransactionsAction';
import { useTypedDispatch } from '../hooks/useTypedDispatch';
import cl from './scss/TransactionShare.module.scss';
import TransactionCard from '../components/transaction/TransactionCard';

const TransactionShare: FC = () => {
  const dispatch = useTypedDispatch();
  const { id, transactionId } = useParams();
  const { transactions, isLoading, error } = useTypedSelector(state => state.transactions);
  const { user } = useTypedSelector(state => state.userInfo);

  useEffect(() => {
    if (user._id) {
      dispatch(
        fetchEnvelopeTransactions({
          userId: user._id,
          envelope: id!!,
          limit: 1,
          offset: 0,
          filter: [
            {
              field: '_id',
              value: transactionId!!
            }
          ]
        })
      );
    }
  }, [dispatch, id, transactionId, user._id]);

  if (isLoading) {
    return (
      <Container>
        <Box className={cl.cardWrapper}>
          <Typography variant="body1">Loading...</Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Box className={cl.cardWrapper}>
          <Typography variant="body1">{error}</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      {!isLoading && transactions[0] && (
        <Box className={cl.cardWrapper}>
          <TransactionCard transaction={transactions[0]} />
        </Box>
      )}
    </Container>
  );
};

export default TransactionShare;
