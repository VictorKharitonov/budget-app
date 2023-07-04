import React, {FC, useEffect, useState} from 'react';
import {Container, Grid, Paper, ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import Transactions from "../components/transaction/Transactions";
import DetailTransaction from "../components/detailTransaction/DetailTransaction";
import {getTransactionById} from "../utils/transactionsHelper";
import {TransactionsItem} from "../types/transactions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import './scss/DetailEnvelope.scss';


const DetailEnvelope: FC = () => {
  const params = useParams();
  const transactions = useTypedSelector(state => state.transactions);
  const { user } = useTypedSelector(state => state.userInfo);
  const [selectedTransactionId, setSelectedTransactionId] = useState<string>('');
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionsItem | undefined>();
  const [status, setStatus] = useState('open');
  const currentEnvelope = params.id as string;

  const handleChangeStatus = (event: React.MouseEvent<HTMLElement>, newStatus: string) => {
    if (newStatus !== null) {
      setStatus(newStatus);
    }
  };

  useEffect(() => {
    setSelectedTransaction(getTransactionById(selectedTransactionId, transactions.transactions));
  }, [selectedTransactionId, transactions]);

  return (
    <Container>
      <ToggleButtonGroup
        color="primary"
        value={status}
        exclusive
        onChange={handleChangeStatus}
        size="small"
        className="toggle-group"
      >
        <ToggleButton value="open" color="success" className="toggle-group__btn">Open</ToggleButton>
        <ToggleButton value="closed" color="error" className="toggle-group__btn">Closed</ToggleButton>
        <ToggleButton value="frozen" color="info" className="toggle-group__btn">Frozen</ToggleButton>
      </ToggleButtonGroup>
      <Grid container className="detail-envelope-container" columnSpacing={2} rowSpacing={2} mb={4}>
        <Grid item xs={12} md={8} lg={8}>
          <Transactions
            transactions={transactions}
            categories={user.categories}
            userId={user._id}
            currentEnvelope={currentEnvelope}
            selectedTransactionId={selectedTransactionId}
            setSelectedTransactionId={setSelectedTransactionId}
            isPagination={true}
            isFilter={true}
            perPage={10}
            rowsPerPageOptions={[25, 50, 100]}
          />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
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

export default DetailEnvelope;