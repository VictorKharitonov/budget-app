import { createContext } from 'react';

export interface IAuthContext {
  isAuth: boolean;
  setIsAuth: (val: boolean) => void;
}

export const AuthContext = createContext<IAuthContext>({
  isAuth: false,
  setIsAuth: () => {}
});
