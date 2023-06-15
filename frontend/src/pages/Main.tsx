import React, {FC, useEffect, useState} from 'react';
import "./scss/Main.scss";
import EnvelopeSidebar from '../components/envelope/EnvelopeSidebar';
import {Container, Grid, Paper, Typography} from '@mui/material';
import Transactions from '../components/transaction/Transactions';
import {CategoryItem, EnvelopeItem, TransactionsItem} from '../types';
import {testCategories, testEnvelopes} from '../mock';
import {getTransactionById} from '../utils/transactionsHelper';
import {useParams} from 'react-router-dom';
import {getEnvelopeNameById} from '../utils/envelopesHelper';
import DetailTransaction from '../components/detailTransaction/DetailTransaction';
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useTypedDispatch } from "../hooks/useTypedDispatch";
import { getLatestTransactions } from "../store/reducers/transactionsSlice";

const Main: FC = () => {
  const params = useParams();
  const transactions = useTypedSelector(state => state.transactions);
  const dispatch = useTypedDispatch();

  const [envelopes, setEnvelopes] = useState<EnvelopeItem[]>(testEnvelopes);
  const [categories, setCategories] = useState<CategoryItem[]>(testCategories);
  const [selectedTransactionId, setSelectedTransactionId] = useState<string>('');
  const selectedEnvelopeName: string = getEnvelopeNameById(envelopes, params.id);
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionsItem | undefined>();

  useEffect(() => {
    dispatch(getLatestTransactions(selectedEnvelopeName));
  }, [selectedEnvelopeName]);

  useEffect(() => {
    setSelectedTransaction(getTransactionById(selectedTransactionId, transactions.transactions));
  }, [selectedTransactionId, transactions.transactions]);

  return (
    <Container>
      <Grid container className="main-content" columnSpacing={2} rowSpacing={2} mt={2}>
        <Grid item md={12} lg={3}>
          <EnvelopeSidebar
            envelopes={envelopes}
            setEnvelopes={setEnvelopes}
          />
        </Grid>
        <Grid item xs={12} md={8} lg={6}>
          <Transactions
            transactions={transactions}
            categories={categories}
            selectedTransactionId={selectedTransactionId}
            setSelectedTransactionId={setSelectedTransactionId}
          />
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          {
            selectedTransaction
            ? <DetailTransaction
                transaction={selectedTransaction}
                envelopes={envelopes}
                categories={categories}
              />
            : <Paper>
                <Typography variant="body1" className="detail-transaction-empty">Select transaction from table to view details</Typography>
              </Paper>
          }
        </Grid>
      </Grid>
    </Container>
  );
};

export default Main;
