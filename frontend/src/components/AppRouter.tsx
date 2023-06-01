import React, {FC} from 'react';
import { Routes, Route } from 'react-router-dom';
import {routes} from '../router';
import {Box} from "@mui/material";

const AppRouter: FC = () => {
  return (
    <Box component="main">
      <Routes>
          {routes.length &&
            routes.map(route => <Route path={route.path} element={route.element} key={route.path}/>)
          }
        </Routes>
    </Box>
  );
};

export default AppRouter;