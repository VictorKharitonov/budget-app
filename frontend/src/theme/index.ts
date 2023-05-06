import {
  ThemeProvider,
  experimental_extendTheme as extendTheme,
  Experimental_CssVarsProvider as CssVarsProvider
} from '@mui/material/styles';

const theme = extendTheme({
  cssVarPrefix: 'ba',
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#2A5AEE',
        }
      },
    }
  }
});

export {theme, ThemeProvider, CssVarsProvider};