import {
  ThemeProvider,
  experimental_extendTheme as extendTheme,
  Experimental_CssVarsProvider as CssVarsProvider
} from '@mui/material/styles';

const theme = extendTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          padding: "8px 16px",
          background: "#fff"
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          '&:hover': {
            boxShadow: "none",
          }
        }
      }
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: 0
        }
      }
    }
  },
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