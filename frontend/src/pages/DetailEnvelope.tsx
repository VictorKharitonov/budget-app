import React, {FC, useEffect, useState} from 'react';
import {
  Alert,
  Box,
  Button, CircularProgress,
  Container,
  Grid,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from "@mui/material";
import {useParams} from "react-router-dom";
import Transactions from "../components/transaction/Transactions";
import DetailTransaction from "../components/detailTransaction/DetailTransaction";
import {getTransactionById} from "../utils/transactionsHelper";
import {TransactionsItem} from "../types/transactions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useTypedDispatch} from "../hooks/useTypedDispatch";
import {useNavigate} from "react-router-dom";
import './scss/DetailEnvelope.scss';
import {EnvelopeItem} from "../types/envelopes";
import Icons from "../components/ui/Icons";
import {updateUserInfo} from "../store/asyncActions/updateUserInfoAction";
import {getCurrentEnvelope} from "../utils/envelopeHelper";


const DetailEnvelope: FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const transactions = useTypedSelector(state => state.transactions);
  const {user, errorUpdate} = useTypedSelector(state => state.userInfo);
  const [selectedTransactionId, setSelectedTransactionId] = useState<string>('');
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionsItem | undefined>();
  const currentEnvelopeName = params.id as string;
  const [currentEnvelope, setCurrentEnvelope] = useState<EnvelopeItem | undefined>(getCurrentEnvelope(currentEnvelopeName, user.envelopes));
  const [status, setStatus] = useState<string>('');
  const [updateEnvelopeLoading, setUpdateEnvelopeLoading] = useState<boolean>(false);
  const [deleteEnvelopeLoading, setDeleteEnvelopeLoading] = useState<boolean>(false);

  const removeEnvelope = () => {
    setDeleteEnvelopeLoading(true)
    const envelopesAfterRemove = [...user.envelopes].filter(envelope => envelope.name !== currentEnvelope?.name);
    dispatch(updateUserInfo({
      userId: user._id,
      envelopes: envelopesAfterRemove,
      categories: user.categories
    })).finally(() => setDeleteEnvelopeLoading(false));
  };

  const updateEnvelopeStatus = (status: string) => {
    setUpdateEnvelopeLoading(true);
    const updatedEnvelopes: EnvelopeItem[] = [...user.envelopes].map(
      envelope => envelope.name === currentEnvelopeName
        ? {
            ...envelope,
            status,
          } as EnvelopeItem
        : envelope
    );
    dispatch(updateUserInfo({
      userId: user._id,
      envelopes: updatedEnvelopes,
      categories: user.categories
    })).finally(() => setUpdateEnvelopeLoading(false));
  };

  const handleChangeStatus = (event: React.MouseEvent<HTMLElement>, newStatus: string) => {
    if (newStatus !== null) {
      setStatus(newStatus);
      updateEnvelopeStatus(newStatus);
    }
  };

  useEffect(() => {
    const changedEnvelope = getCurrentEnvelope(currentEnvelopeName, user.envelopes);

    if (!changedEnvelope) {
      navigate('/envelope');
    }

    if (changedEnvelope?.status !== currentEnvelope?.status) {
      setCurrentEnvelope(changedEnvelope);
    }
  }, [user.envelopes]);

  useEffect(() => {
    if (currentEnvelope) {
      setStatus(currentEnvelope.status)
    }
  }, [currentEnvelope]);

  useEffect(() => {
    setSelectedTransaction(getTransactionById(selectedTransactionId, transactions.transactions));
  }, [selectedTransactionId, transactions]);

  return (
    <Container>
      {
        errorUpdate &&
        <Alert severity="error" sx={{mt: 2}}>{errorUpdate}</Alert>
      }
      <Box>
        <ToggleButtonGroup
          disabled={updateEnvelopeLoading}
          color="primary"
          value={status}
          exclusive
          onChange={handleChangeStatus}
          size="small"
          className="toggle-group"
          sx={{mr: 1}}
        >
          <ToggleButton value="open" color="success" className="toggle-group__btn">Open</ToggleButton>
          <ToggleButton value="closed" color="error" className="toggle-group__btn">Closed</ToggleButton>
          <ToggleButton value="frozen" color="info" className="toggle-group__btn">Frozen</ToggleButton>
        </ToggleButtonGroup>
        <Button
          variant="outlined"
          startIcon={
            deleteEnvelopeLoading
              ? <CircularProgress color="primary" size={20}/>
              : <Icons.DeleteIcon/>
          }
          onClick={removeEnvelope}
        >
          Delete
        </Button>
      </Box>
      <Grid container className="detail-envelope-container" columnSpacing={2} rowSpacing={2} mb={4}>
        <Grid item xs={12} md={8} lg={8}>
          <Transactions
            transactions={transactions}
            user={user}
            currentEnvelope={currentEnvelope}
            selectedTransactionId={selectedTransactionId}
            setSelectedTransactionId={setSelectedTransactionId}
            isPagination={true}
            isFilter={true}
            perPage={25}
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

export default DetailEnvelope;
