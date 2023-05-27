import React, {FC, useEffect, useState} from 'react';
import Envelope from '../components/envelope/Envelop';
import {Container, Grid, Paper, Typography} from '@mui/material';
import Transactions from '../components/transaction/Transactions';
import {CategoryItem, EnvelopeItem, TransactionsItem} from '../types';
import {testCategories, testEnvelopes, testTransactions} from '../mock';
import useFilter from '../hooks/useFilter';
import {getLatestTransactions, getTransactionById} from '../utils/transactionsHelper';
import {useParams} from 'react-router-dom';
import {getEnvelopeNameById} from '../utils/envelopesHelper';
import DetailTransaction from '../components/detailTransaction/DetailTransaction';

const Main: FC = () => {
  const params = useParams();
  const [transactions, setTransactions] = useState<TransactionsItem[]>(testTransactions);
  const [envelopes, setEnvelopes] = useState<EnvelopeItem[]>(testEnvelopes);
  const [categories, setCategories] = useState<CategoryItem[]>(testCategories);
  const [selectedTransactionId, setSelectedTransactionId] = useState<string>('');
  const selectedEnvelopeName: string = getEnvelopeNameById(envelopes, params.id);
  const filterTransactionsByEnvelopeName = useFilter<TransactionsItem>(selectedEnvelopeName, transactions, ['envelop']);
  const [latestTransactions, setLatestTransactions] = useState<TransactionsItem[]>(getLatestTransactions(filterTransactionsByEnvelopeName) || []);
  const selectedTransaction = getTransactionById(selectedTransactionId, latestTransactions);
  const [detailTransaction, setDetailTransaction] = useState<TransactionsItem | undefined>();

  useEffect(() => {
    setDetailTransaction(selectedTransaction);
  }, [selectedTransactionId]);

  useEffect(() => {
    setLatestTransactions(getLatestTransactions(filterTransactionsByEnvelopeName));
  }, [filterTransactionsByEnvelopeName])

  return (
    <Container>
      <Grid container spacing={1} mt={2}>
        <Grid item xs={12} md={3}>
          <Envelope
            envelopes={envelopes}
            setEnvelopes={setEnvelopes}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Transactions
            transactions={latestTransactions}
            selectedTransactionId={selectedTransactionId}
            setSelectedTransactionId={setSelectedTransactionId}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          {
            detailTransaction
            ? <DetailTransaction
                detailTransaction={detailTransaction}
                latestTransactions={latestTransactions}
                setLatestTransactions={setLatestTransactions}
                envelopes={envelopes}
                categories={categories}
              />
            : <Paper>
                <Typography variant="body1" sx={{p: 2}}>Select transaction from table to view details</Typography>
              </Paper>
          }
        </Grid>
      </Grid>
    </Container>
  );
};

export default Main;
