import React, {FC, useEffect, useState} from 'react';
import "./scss/Main.scss";
import EnvelopeSidebar from '../components/envelope/EnvelopeSidebar';
import {Container, Grid, Paper, Typography} from '@mui/material';
import Transactions from '../components/transaction/Transactions';
import {CategoryItem, EnvelopeItem} from '../types';
import {getTransactionById} from '../utils/transactionsHelper';
import {useParams} from 'react-router-dom';
import DetailTransaction from '../components/detailTransaction/DetailTransaction';
import { useTypedSelector } from "../hooks/useTypedSelector";
import {TransactionsItem} from "../types/transactions";

const Main: FC = () => {
  const params = useParams();
  const transactions = useTypedSelector(state => state.transactions);
  const {user} = useTypedSelector(state => state.userInfo);
  const [envelopes, setEnvelopes] = useState<EnvelopeItem[]>([]);//testEnvelopes
  const [categories, setCategories] = useState<CategoryItem[]>([]);//testCategories
  const [selectedTransactionId, setSelectedTransactionId] = useState<string>('');
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionsItem | undefined>();
  const selectedEnvelopeName = params.id as string;

  useEffect(() => {
    setSelectedTransaction(getTransactionById(selectedTransactionId, transactions.transactions));
  }, [selectedTransactionId, transactions]);

  return (
    <Container>
      <Grid container className="main-content" columnSpacing={2} rowSpacing={2} mt={2}>
        <Grid item md={12} lg={3}>
          <EnvelopeSidebar
            envelopes={user.envelopes}
            setEnvelopes={setEnvelopes}
            isTransactionsLoading={transactions.isLoading}
          />
        </Grid>
        <Grid item xs={12} md={8} lg={6}>
          <Transactions
            transactions={transactions}
            categories={user.categories}
            userId={user._id}
            currentEnvelope={selectedEnvelopeName}
            selectedTransactionId={selectedTransactionId}
            setSelectedTransactionId={setSelectedTransactionId}
          />
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          {
            selectedTransaction
            ? <DetailTransaction
                transaction={selectedTransaction}
                envelopes={user.envelopes}
                categories={user.categories}
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
