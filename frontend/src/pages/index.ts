import { lazy } from 'react';

const Main = lazy(() => import('../pages/Main'));
const DetailEnvelope = lazy(() => import('../pages/DetailEnvelope'));
const Login = lazy(() => import('../pages/Login'));
const TransactionShare = lazy(() => import('../pages/TransactionShare'));
const NotFound = lazy(() => import('../pages/NotFound'));

export { Main, DetailEnvelope, Login, TransactionShare, NotFound };
