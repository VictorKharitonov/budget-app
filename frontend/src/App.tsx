import React, {useState} from 'react';
import './App.scss';
import {theme, CssVarsProvider} from './theme/index';
import {BrowserRouter as Router} from "react-router-dom";
import AppRouter from './components/appRouter/AppRouter';
import NavBar from './components/ui/navBar/NavBar';
import {Provider} from "react-redux";
import {store} from "./store";
import { AuthContext } from './context/index';

function App() {
  const [isAuth, setIsAuth] = useState(Boolean(localStorage.getItem('chatId')));

  return (
    <Provider store={store}>
      <AuthContext.Provider value={{
        isAuth,
        setIsAuth,
      }}>
        <Router>
          <CssVarsProvider theme={theme}>
            <NavBar/>
            <AppRouter/>
          </CssVarsProvider>
        </Router>
      </AuthContext.Provider>
    </Provider>
  );
}

export default App;
