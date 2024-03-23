import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../navBar/NavBar';
import { CssVarsProvider, theme } from '../../theme';
import { Box } from '@mui/material';

const Layout: FC = () => {
  return (
    <CssVarsProvider theme={theme}>
      <NavBar />
      <Box component="main">
        <Outlet />
      </Box>
    </CssVarsProvider>
  );
};

export default Layout;
