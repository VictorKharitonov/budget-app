import React, { FC } from 'react';
import cl from './scss/Transactions.module.scss';
import { Card, CardContent, Divider, Typography } from '@mui/material';
import { TransactionsItem } from '../../types/transactions';
import dayjs from 'dayjs';

interface transactionCardProps {
  transaction: TransactionsItem;
}

const TransactionCard: FC<transactionCardProps> = ({ transaction }) => {
  return (
    <Card className={cl.card}>
      <CardContent className={cl.cardContent}>
        <Typography color="text.secondary" variant="body2">
          Envelopes:
        </Typography>
        <Typography variant="body1" className={cl.cardContentValue}>
          {transaction.envelopes.join(', ')}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography color="text.secondary" variant="body2">
          Categories:
        </Typography>
        <Typography variant="body1" className={cl.cardContentValue}>
          {transaction.categories.join(', ')}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography color="text.secondary" variant="body2">
          Currency:
        </Typography>
        <Typography variant="body1" className={cl.cardContentValue}>
          {transaction.currency}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography color="text.secondary" variant="body2">
          Amount:
        </Typography>
        <Typography variant="body1" className={cl.cardContentValue}>
          {transaction.amount}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography color="text.secondary" variant="body2">
          Date:
        </Typography>
        <Typography variant="body1" className={cl.cardContentValue}>
          {dayjs(transaction.date).format('YYYY-MM-DD HH:mm:ss')}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography color="text.secondary" variant="body2">
          Description:
        </Typography>
        <Typography variant="body1" className={cl.cardContentValue}>
          {transaction.description}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography color="text.secondary" variant="body2">
          Type:
        </Typography>
        <Typography variant="body1" className={cl.cardContentValue}>
          {transaction.type}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TransactionCard;
