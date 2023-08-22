import React, {FC, useEffect, useState} from 'react';
import "./scss/Main.scss";
import EnvelopeSidebar from '../components/envelope/EnvelopeSidebar';
import {Container, Grid, Paper, Typography} from '@mui/material';
import Transactions from '../components/transaction/Transactions';
import {getTransactionById} from '../utils/transactionsHelper';
import {useParams} from 'react-router-dom';
import DetailTransaction from '../components/detailTransaction/DetailTransaction';
import { useTypedSelector } from "../hooks/useTypedSelector";
import {TransactionsItem} from "../types/transactions";
import {EnvelopeItem} from "../types/envelopes";
import {getCurrentEnvelope} from "../utils/envelopeHelper";

const Main: FC = () => {
  const params = useParams();
  const transactions = useTypedSelector(state => state.transactions);
  const userInfo = useTypedSelector(state => state.userInfo);
  const {user} = userInfo;
  const [selectedTransactionId, setSelectedTransactionId] = useState<string>('');
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionsItem | undefined>();
  const currentEnvelopeName = params.id as string;
  const [currentEnvelope, setCurrentEnvelope] = useState<EnvelopeItem | undefined>();

  useEffect(() => {
    setSelectedTransaction(getTransactionById(selectedTransactionId, transactions.transactions));
  }, [selectedTransactionId, transactions]);

  useEffect(() => {
    setCurrentEnvelope(getCurrentEnvelope(currentEnvelopeName, user.envelopes));
  }, [currentEnvelopeName]);

  return (
    <Container>
      <Grid container className="main-content" columnSpacing={2} rowSpacing={2} mt={2}>
        <Grid item xs={12} sm={6} md={6} lg={3} order={{ sm: 1, lg: 1 }}>
          <EnvelopeSidebar
            envelopes={user.envelopes}
            userInfo={userInfo}
            isTransactionsLoading={transactions.isLoading}
          />
        </Grid>
        <Grid item xs={12} md={12} lg={6} order={{ sm: 3, lg: 2 }}>
          <Transactions
            transactions={transactions}
            user={user}
            currentEnvelope={currentEnvelope}
            selectedTransactionId={selectedTransactionId}
            setSelectedTransactionId={setSelectedTransactionId}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={3} order={{ sm: 2, lg: 3 }}>
          {
            selectedTransaction
            ? <DetailTransaction
                transaction={selectedTransaction}
                envelopes={user.envelopes}
                categories={user.categories}
                currentEnvelope={currentEnvelope}
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
