import React, {FC} from 'react';
import { Routes, Route } from 'react-router-dom';
import {routes} from '../router';

const AppRouter: FC = () => {
  return (
      <Routes>
        {routes.length &&
          routes.map(route => <Route path={route.path} element={<route.element/>} key={route.path}/>)
        }
      </Routes>
  );
};

export default AppRouter;