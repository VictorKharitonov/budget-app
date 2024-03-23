import React, { useState } from 'react';
import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/appRouter/AppRouter';
import { Provider } from 'react-redux';
import { store } from './store';
import { AuthContext } from './context';

function App() {
  const [isAuth, setIsAuth] = useState(Boolean(localStorage.getItem('chatId')));

  return (
    <Provider store={store}>
      <AuthContext.Provider
        value={{
          isAuth,
          setIsAuth
        }}
      >
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </AuthContext.Provider>
    </Provider>
  );
}

export default App;
