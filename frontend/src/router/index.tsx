import * as React from "react";
import {Navigate} from "react-router-dom";

import Main from '../pages/Main';

interface Routes {
  path: string,
  element: React.ReactNode | null
}

export const routes: Routes[] = [
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
  }
];