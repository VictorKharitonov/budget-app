import React, {FC, useState} from 'react';
import Envelope from '../components/envelope/Envelop';
import {Container, Grid} from '@mui/material';
import Transactions from '../components/transaction/Transactions';
import {EnvelopeItem, TransactionsItem} from '../types';
import {testEnvelopes, testTransactions} from '../mock';
import useFilter from '../hooks/useFilter';
import {getLatestTransactions} from '../utils/transactionsHelper';
import {useParams} from 'react-router-dom';
import {getEnvelopeNameById} from '../utils/envelopesHelper';

const Main: FC = () => {
  const params = useParams();
  const [transactions, setTransactions] = useState<TransactionsItem[]>(testTransactions);
  const [envelopes, setEnvelopes] = useState<EnvelopeItem[]>(testEnvelopes);
  const selectedEnvelopeName: string = getEnvelopeNameById(envelopes, params.id);
  const filterTransactionsByName = useFilter<TransactionsItem>(selectedEnvelopeName, transactions, ['envelop']);
  const latestTransactions: TransactionsItem[] = getLatestTransactions(filterTransactionsByName);

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
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Main;