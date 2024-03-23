import React, { FC, useContext, useEffect, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import cl from './AppRouter.module.scss';
import { privateRoutes, publicRoutes } from '../../router';
import { CircularProgress, Container } from '@mui/material';
import { fetchUserByChatIdAction } from '../../store/asyncActions';
import { AuthContext, IAuthContext } from '../../context';
import { useTypedSelector, useTypedDispatch } from '../../hooks/index';
import Layout from '../layout/Layout';

const AppRouter: FC = () => {
  const dispatch = useTypedDispatch();
  const { user, isLoading, error } = useTypedSelector(state => state.userInfo);
  const { isAuth } = useContext<IAuthContext>(AuthContext);

  useEffect(() => {
    if (isAuth && !user.chatId) {
      dispatch(fetchUserByChatIdAction(Number(localStorage.getItem('chatId'))));
    }
  }, [dispatch, isAuth, user.chatId]);

  if (isLoading) {
    return (
      <Container>
        <div className={cl.loader}>
          <CircularProgress color="primary" />
        </div>
      </Container>
    );
  }

  if (isAuth && error) {
    return (
      <Container>
        <div>{error}</div>
      </Container>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {isAuth
          ? privateRoutes.map(route => (
              <Route
                path={route.path}
                element={<Suspense fallback={<CircularProgress color="primary" />}>{route.element}</Suspense>}
                key={route.path}
              />
            ))
          : publicRoutes.map(route => <Route path={route.path} element={route.element} key={route.path} />)}
      </Route>
    </Routes>
  );
};

export default AppRouter;
