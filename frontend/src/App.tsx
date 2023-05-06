import React from 'react';
import Main from "./pages/Main";
import './App.scss';
import {theme, ThemeProvider, CssVarsProvider} from './theme/index';

function App() {
  return (
    <CssVarsProvider theme={theme}>
      <Main/>
    </CssVarsProvider>
  );
}

export default App;
