import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2A5AEE',
    }
  },
});

export {theme, ThemeProvider};