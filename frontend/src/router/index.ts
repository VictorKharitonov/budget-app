import {FC} from 'react';

import Main from '../pages/Main';

interface Routes {
  path: string,
  element: FC
}

export const routes: Routes[] = [
  {
    path: '/',
    element: Main
  },
  {
    path: '/envelope/:id',
    element: Main
  }
];