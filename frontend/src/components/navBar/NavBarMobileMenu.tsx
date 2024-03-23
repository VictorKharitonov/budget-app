import React, { FC } from 'react';
import cl from './scss/navBar.module.scss';
import { Box, Button, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import Icons from '../ui/Icons';
import CustomBreadCrumbs from '../ui/customBreadCrumbs/CustomBreadCrumbs';
import AddTransaction from '../../features/transaction/AddTransaction';
import { Link } from 'react-router-dom';
import { useNavMenu } from '../../hooks';

interface NavBarMobileMenuProps {
  isAuth: boolean;
  userName: string;
  logout: () => void;
  pathNames: string[];
}

const NavBarMobileMenu: FC<NavBarMobileMenuProps> = ({ isAuth, userName, logout, pathNames }) => {
  const { anchorElNav, handleCloseNavMenu, handleOpenNavMenu } = useNavMenu();

  return (
    <Box className={cl.navMenu}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
      >
        <Icons.MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
      >
        {isAuth && (
          <MenuItem>
            <Typography className={cl.userId} variant="h6">
              {userName}
            </Typography>
          </MenuItem>
        )}
        {pathNames.length > 0 && (
          <MenuItem onClick={handleCloseNavMenu}>
            <CustomBreadCrumbs color="black" pathNames={pathNames} />
          </MenuItem>
        )}
        {isAuth && (
          <MenuItem>
            <AddTransaction className={cl.transactionBtnText} />
          </MenuItem>
        )}
        <MenuItem onClick={handleCloseNavMenu}>
          <Box color="primary" className={cl.authContainer}>
            {isAuth ? (
              <Button onClick={logout} variant="contained" fullWidth={true}>
                Logout
              </Button>
            ) : (
              <Button component={Link} to="/sign-in" variant="contained" fullWidth={true}>
                Login
              </Button>
            )}
          </Box>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default NavBarMobileMenu;
