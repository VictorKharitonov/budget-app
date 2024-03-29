import React, { FC, useRef } from 'react';
import cl from './scss/Main.module.scss';
import EnvelopeSidebar from '../components/envelope/EnvelopeSidebar';
import { Container, Grid } from '@mui/material';
import Transactions from '../components/transaction/Transactions';
import DetailTransaction from '../components/detailTransaction/DetailTransaction';
import { useTypedSelector, useEnvelope, useScroll } from '../hooks/index';

const Main: FC = () => {
  const transactions = useTypedSelector(state => state.transactions);
  const { user } = useTypedSelector(state => state.userInfo);
  const { currentEnvelope } = useEnvelope(user);
  const detailTransactionRef = useRef<HTMLDivElement>(null);
  const scrollToDetail = useScroll(detailTransactionRef);

  return (
    <Container>
      <Grid container className={cl.mainContent} columnSpacing={2} rowSpacing={2} mt={2} mb={4}>
        <Grid item xs={12} sm={6} md={6} lg={3} order={{ sm: 1, lg: 1 }}>
          <EnvelopeSidebar user={user} />
        </Grid>
        <Grid item xs={12} md={12} lg={6} order={{ sm: 3, lg: 2 }}>
          <Transactions
            transactions={transactions}
            user={user}
            currentEnvelope={currentEnvelope}
            scrollTo={scrollToDetail}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={3} order={{ sm: 2, lg: 3 }}>
          <DetailTransaction
            transaction={transactions.selectedTransaction}
            envelopes={user.envelopes}
            categories={user.categories}
            currentEnvelope={currentEnvelope}
            ref={detailTransactionRef}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Main;
