import React, { FC, useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import cl from './AppRouter.module.scss';
import { privateRoutes, publicRoutes } from '../../router';
import { Box, CircularProgress, Container } from '@mui/material';
import { fetchUserByChatIdAction } from '../../store/asyncActions';
import { AuthContext, IAuthContext } from '../../context';
import { useTypedSelector, useTypedDispatch } from '../../hooks/index';

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
      <Box component="main">
        <Container>
          <div className={cl.loader}>
            <CircularProgress color="primary" />
          </div>
        </Container>
      </Box>
    );
  }

  if (isAuth && error) {
    return (
      <Box component="main">
        <Container>
          <div>{error}</div>
        </Container>
      </Box>
    );
  }

  return (
    <Box component="main">
      <Routes>
        {isAuth
          ? privateRoutes.map(route => <Route path={route.path} element={route.element} key={route.path} />)
          : publicRoutes.map(route => <Route path={route.path} element={route.element} key={route.path} />)}
      </Routes>
    </Box>
  );
};

export default AppRouter;
