import React, { FC, useCallback, useEffect, useState } from 'react';
import { Alert, Box, Button, CircularProgress, Container, Grid, Paper, Typography } from '@mui/material';
import Transactions from '../components/transaction/Transactions';
import DetailTransaction from '../components/detailTransaction/DetailTransaction';
import { useTypedSelector, useTypedDispatch, useEnvelope } from '../hooks/index';
import { useNavigate } from 'react-router-dom';
import cl from './scss/DetailEnvelope.module.scss';
import { EnvelopeItem } from '../types/envelopes';
import Icons from '../components/ui/Icons';
import { updateUserInfoAction } from '../store/asyncActions';
import { getCurrentEnvelope } from '../utils/envelopeHelper';
import EnvelopeStatusBar from '../components/envelope/envelopeStatusBar';
import { clearTransactionsAction } from '../store/reducers/transactionsSlice';

const DetailEnvelope: FC = () => {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const transactions = useTypedSelector(state => state.transactions);
  const { user, errorUpdate } = useTypedSelector(state => state.userInfo);
  const { currentEnvelope, setCurrentEnvelope } = useEnvelope(user);
  const [updateEnvelopeLoading, setUpdateEnvelopeLoading] = useState<boolean>(false);
  const [deleteEnvelopeLoading, setDeleteEnvelopeLoading] = useState<boolean>(false);

  const removeEnvelope = async () => {
    setDeleteEnvelopeLoading(true);
    const envelopesAfterRemove = [...user.envelopes].filter(envelope => envelope.name !== currentEnvelope?.name);
    await dispatch(
      updateUserInfoAction({
        userId: user._id,
        envelopes: envelopesAfterRemove,
        categories: user.categories
      })
    );
    dispatch(clearTransactionsAction());
    setDeleteEnvelopeLoading(false);
  };

  const updateEnvelopeStatus = useCallback(
    async (status: string) => {
      setUpdateEnvelopeLoading(true);
      const updatedEnvelopes: EnvelopeItem[] = user.envelopes.map(envelope =>
        envelope.name === currentEnvelope?.name
          ? ({
              ...envelope,
              status
            } as EnvelopeItem)
          : envelope
      );
      await dispatch(
        updateUserInfoAction({
          userId: user._id,
          envelopes: updatedEnvelopes,
          categories: user.categories
        })
      );
      setUpdateEnvelopeLoading(false);
    },
    [currentEnvelope?.name, dispatch, user._id, user.categories, user.envelopes]
  );

  useEffect(() => {
    if (!currentEnvelope) {
      return;
    }

    const changedEnvelope = getCurrentEnvelope(currentEnvelope.name, user.envelopes);

    if (!changedEnvelope) {
      navigate('/envelope');
    }

    if (changedEnvelope?.status !== currentEnvelope.status) {
      setCurrentEnvelope(changedEnvelope);
    }
  }, [currentEnvelope, navigate, setCurrentEnvelope, user.envelopes]);

  return (
    <Container>
      {errorUpdate && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {errorUpdate}
        </Alert>
      )}
      <Box>
        <EnvelopeStatusBar
          isLoading={updateEnvelopeLoading}
          onChange={updateEnvelopeStatus}
          currentEnvelope={currentEnvelope}
        />
        <Button
          variant="outlined"
          startIcon={deleteEnvelopeLoading ? <CircularProgress color="primary" size={20} /> : <Icons.DeleteIcon />}
          onClick={removeEnvelope}
        >
          Delete
        </Button>
      </Box>
      <Grid container className={cl.detailEnvelopeContainer} columnSpacing={2} rowSpacing={2} mb={4}>
        <Grid item xs={12} md={8} lg={8}>
          <Transactions
            transactions={transactions}
            user={user}
            currentEnvelope={currentEnvelope}
            isPagination={true}
            isFilter={true}
            perPage={25}
            rowsPerPageOptions={[25, 50, 100]}
          />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          {transactions.selectedTransaction ? (
            <DetailTransaction
              transaction={transactions.selectedTransaction}
              envelopes={user.envelopes}
              categories={user.categories}
              currentEnvelope={currentEnvelope}
            />
          ) : (
            <Paper>
              <Typography variant="body1" className={cl.detailTransactionEmpty}>
                Select transaction from table to view details
              </Typography>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default DetailEnvelope;
