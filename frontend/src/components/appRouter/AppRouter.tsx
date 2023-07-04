import React, {FC, useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import cl from './AppRouter.module.scss';
import {routes} from '../../router';
import {Box, CircularProgress, Container} from "@mui/material";
import {useTypedDispatch} from "../../hooks/useTypedDispatch";
import {fetchUserByChatId} from "../../store/asyncActions/fetchUserByChatIdAction";
import {useTypedSelector} from "../../hooks/useTypedSelector";

const AppRouter: FC = () => {
  const dispatch = useTypedDispatch();
  const {user, isSuccess, isLoading, error} = useTypedSelector(state => state.userInfo);

  useEffect(() => {
    dispatch(fetchUserByChatId(1472184514));
  }, []);

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

  if (isSuccess) {
    return (
      <Box component="main">
        <Routes>
          {
            routes.length &&
            routes.map(route => <Route path={route.path} element={route.element} key={route.path}/>)
          }
        </Routes>
      </Box>
    );
  }

  if (error) {
    return (
      <Box component="main">
        <Container>
          <div>{error}</div>
        </Container>
      </Box>
    )
  }
};

export default AppRouter;