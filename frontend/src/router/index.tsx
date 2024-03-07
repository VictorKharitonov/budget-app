import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { Main, DetailEnvelope, Login, TransactionShare, NotFound } from '../pages';

interface Routes {
  path: string;
  element: React.ReactNode | null;
}

export const privateRoutes: Routes[] = [
  {
    path: '/',
    element: <Navigate to="/envelope" replace />
  },
  {
    path: '/envelope',
    element: <Main />
  },
  {
    path: '/envelope/:id',
    element: <Main />
  },
  {
    path: '/envelope/:id/detail',
    element: <DetailEnvelope />
  },
  {
    path: 'envelope/:id/:transactionId',
    element: <TransactionShare />
  },
  {
    path: 'envelope/:id/detail/:transactionId',
    element: <TransactionShare />
  },
  {
    path: 'sign-in',
    element: <Navigate to="/envelope" replace />
  },
  {
    path: '*',
    element: <NotFound />
  }
];

export const publicRoutes: Routes[] = [
  {
    path: '*',
    element: <Navigate to="/sign-in" replace />
  },
  {
    path: '/sign-in',
    element: <Login />
  }
];
