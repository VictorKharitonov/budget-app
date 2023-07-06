import * as React from "react";
import {Navigate} from "react-router-dom";

import Main from '../pages/Main';
import DetailEnvelope from "../pages/DetailEnvelope";
import Login from "../pages/Login";

interface Routes {
  path: string,
  element: React.ReactNode | null
}

export const privateRoutes: Routes[] = [
  {
    path: '/',
    element: <Navigate to="/envelope" replace/>
  },
  {
    path: '/envelope',
    element: <Main/>
  },
  {
    path: '/envelope/:id',
    element: <Main/>
  },
  {
    path: '/envelope/:id/detail',
    element: <DetailEnvelope/>
  },
  {
    path: '*',
    element: <Navigate to="/envelope" replace/>
  },
];

export const publicRoutes: Routes[] = [
  {
    path: '*',
    element: <Navigate to="/sign-in" replace/>
  },
  {
    path: '/sign-in',
    element: <Login/>
  },
];