import {
  ThemeProvider,
  experimental_extendTheme as extendTheme,
  Experimental_CssVarsProvider as CssVarsProvider
} from '@mui/material/styles';

const theme = extendTheme({
  typography: {
    button: {
      textTransform: 'none'
    }
  },
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
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          background: "#2A5AEE",
          color: "#ffffff",
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "#fff",
        },
      }
    },
  },
  cssVarPrefix: 'ba',
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#2A5AEE",
        },
        secondary: {
          main: "#E6E9F0",
        },
        success: {
          main: "#00c9a7",
          contrastText: "#ffffff"
        },
        error: {
          main: "#de4437"
        }
      },
    }
  }
});

export {theme, ThemeProvider, CssVarsProvider};