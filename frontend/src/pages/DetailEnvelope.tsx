import React, {FC, useEffect, useState} from 'react';
import {Container, Grid, Paper, ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import {CategoryItem, EnvelopeItem, TransactionsItem} from "../types";
import {testCategories, testEnvelopes, testTransactions} from "../mock";
import Transactions from "../components/transaction/Transactions";
import DetailTransaction from "../components/detailTransaction/DetailTransaction";
import {getTransactionById} from "../utils/transactionsHelper";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useTypedDispatch } from "../hooks/useTypedDispatch";
import { getTransactions } from "../store/reducers/transactionsSlice"
import './scss/DetailEnvelope.scss';


const DetailEnvelope: FC = () => {
  const params = useParams();
  const transactions = useTypedSelector(state => state.transactions);
  const dispatch = useTypedDispatch();
  const [envelopes, setEnvelopes] = useState<EnvelopeItem[]>(testEnvelopes);
  const [categories, setCategories] = useState<CategoryItem[]>(testCategories);
  const [selectedTransactionId, setSelectedTransactionId] = useState<string>('');
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionsItem | undefined>();
  const [status, setStatus] = useState('open');

  const handleChangeStatus = (event: React.MouseEvent<HTMLElement>, newStatus: string) => {
    if (newStatus !== null) {
      setStatus(newStatus);
    }
  };

  useEffect(() => {
    dispatch(getTransactions());
  }, [])

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
            categories={categories}
            selectedTransactionId={selectedTransactionId}
            setSelectedTransactionId={setSelectedTransactionId}
            isPagination={true}
            isFilter={true}
            perPage={50}
            rowsPerPageOptions={[25, 50, 100]}
          />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
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

export default DetailEnvelope;