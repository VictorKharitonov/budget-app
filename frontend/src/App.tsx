import React from 'react';
import './App.scss';
import {theme, CssVarsProvider} from './theme/index';
import {BrowserRouter as Router} from "react-router-dom";
import AppRouter from './components/AppRouter';

function App() {
  return (
    <Router>
      <CssVarsProvider theme={theme}>
        <AppRouter/>
      </CssVarsProvider>
    </Router>
  );
}

export default App;
