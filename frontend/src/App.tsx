import React from 'react';
import Main from "./pages/Main";
import './App.scss';
import {theme, ThemeProvider} from './Theme/index';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Main/>
    </ThemeProvider>
  );
}

export default App;
