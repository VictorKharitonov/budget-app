import React from 'react';
import './App.scss';
import {theme, CssVarsProvider} from './theme/index';
import {BrowserRouter as Router} from "react-router-dom";
import AppRouter from './components/AppRouter';
import NavBar from './components/ui/navBar/NavBar';
import {Provider} from "react-redux";
import {store} from "./store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <CssVarsProvider theme={theme}>
          <NavBar/>
          <AppRouter/>
        </CssVarsProvider>
      </Router>
    </Provider>
  );
}

export default App;
