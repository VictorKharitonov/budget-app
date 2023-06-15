import React from 'react';
import './App.scss';
import {theme, CssVarsProvider} from './theme/index';
import {BrowserRouter as Router} from "react-router-dom";
import AppRouter from './components/AppRouter';
import NavBar from './components/ui/navBar/NavBar';

function App() {
  return (
    <Router>
      <CssVarsProvider theme={theme}>
        <NavBar/>
        <AppRouter/>
      </CssVarsProvider>
    </Router>
  );
}

export default App;
