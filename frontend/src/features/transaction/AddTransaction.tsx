import React, { FC, useCallback, useState } from 'react';
import cl from '../../components/navBar/scss/navBar.module.scss';
import { Alert, Button, Typography } from '@mui/material';
import Icons from '../../components/ui/Icons';
import CustomModal from '../../components/ui/modal/CustomModal';
import { TransactionForm } from '../../components/transaction';
import { useTypedDispatch, useTypedSelector } from '../../hooks';
import { TransactionsItem } from '../../types/transactions';
import { createTransactionAction } from '../../store/asyncActions/transaction';

interface AddTransactionProps {
  className: string | undefined;
}

const AddTransaction: FC<AddTransactionProps> = ({ className }) => {
  const dispatch = useTypedDispatch();
  const { user, isLoading } = useTypedSelector(state => state.userInfo);
  const { isLoadingCreate, createError } = useTypedSelector(state => state.transactions);
  const [modal, setModal] = useState(false);

  const createTransaction = useCallback(
    (data: TransactionsItem) => {
      dispatch(createTransactionAction(data));
    },
    [dispatch]
  );

  return (
    <>
      <Button
        disabled={isLoading && !user.envelopes.length}
        variant="contained"
        size="small"
        className={cl.transactionBtn}
        onClick={() => setModal(true)}
      >
        <Typography variant="body1" className={className}>
          Transaction
        </Typography>
        <Icons.AddCircleIcon />
      </Button>
      <CustomModal title="Transaction" modal={modal} setModal={setModal}>
        {createError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Some thing went wrong
          </Alert>
        )}
        <TransactionForm
          userId={user._id}
          envelopes={user.envelopes}
          onSubmit={createTransaction}
          isLoading={isLoadingCreate}
        />
      </CustomModal>
    </>
  );
};

export default AddTransaction;
