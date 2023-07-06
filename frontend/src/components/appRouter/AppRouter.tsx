import React, {FC, useContext, useEffect, useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import cl from './AppRouter.module.scss';
import {privateRoutes, publicRoutes} from '../../router';
import {Box, CircularProgress, Container} from "@mui/material";
import {useTypedDispatch} from "../../hooks/useTypedDispatch";
import {fetchUserByChatId} from "../../store/asyncActions/fetchUserByChatIdAction";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {AuthContext, IAuthContext} from "../../context";

const AppRouter: FC = () => {
  const dispatch = useTypedDispatch();
  const {user, isLoading, error} = useTypedSelector(state => state.userInfo);
  const {isAuth} = useContext<IAuthContext>(AuthContext);

  useEffect(() => {
    if (isAuth && !user.chatId) {
      dispatch(fetchUserByChatId(Number(localStorage.getItem('chatId'))));
    }
  }, [isAuth]);

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
    )
  }

  return (
    <Box component="main">
      <Routes>
        {
          isAuth
            ? privateRoutes.map(route => <Route path={route.path} element={route.element} key={route.path}/>)
            : publicRoutes.map(route => <Route path={route.path} element={route.element} key={route.path}/>)
        }
      </Routes>
    </Box>
  );
};

export default AppRouter;