import { Chip } from '@mui/material';
import cl from '../scss/Transactions.module.scss';
import React from 'react';
import { Column } from '../../../types/transactions';

const columns: readonly Column[] = [
  {
    id: 'date',
    label: 'Date',
    format: (value: number) => new Date(value).toLocaleDateString('en-CA')
  },
  {
    id: 'amount',
    label: 'Amount',
    format: (value: number) => value.toFixed(2)
  },
  {
    id: 'type',
    label: 'Type',
    format: (value: string) => (
      <Chip className={cl.types} label={value} color={value === 'income' ? 'success' : 'error'} size="small" />
    )
  },
  {
    id: 'categories',
    label: 'Categories',
    format: (value: string[]) => value.join(', ')
  },
  {
    id: 'currency',
    label: 'Currency',
    format: (value: string) => value
  },
  {
    id: 'description',
    label: 'Description',
    format: (value: string) => value
  }
];

export default columns;
