import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CustomBreadCrumbs from "../customBreadCrumbs/CustomBreadCrumbs";
import cl from './scss/navBar.module.scss';
import {Button, IconButton, Menu, MenuItem} from "@mui/material";
import {Link, useLocation} from "react-router-dom";
import Logo from "../../../images/logo.png";
import Icons from '../Icons';
import {getPathNames} from "../../../utils/stringHelper";
import {FC} from "react";

const NavBar: FC = () => {
  const location = useLocation();
  const pathNames: string[] = getPathNames(location);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" className={cl.navBar}>
      <Container>
        <Toolbar disableGutters>
          <Box className={cl.navMenu}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <Icons.MenuIcon/>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              <MenuItem>
                <Typography className={cl.userId} variant="h6">
                  test
                </Typography>
              </MenuItem>
              {pathNames.length > 0 &&
                <MenuItem onClick={handleCloseNavMenu}>
                    <CustomBreadCrumbs color="black" pathNames={pathNames}/>
                </MenuItem>
              }
              <MenuItem onClick={handleCloseNavMenu}>
                <Button component={Link} to="/Sign-up" variant="contained">Sign Up</Button>
              </MenuItem>
            </Menu>
          </Box>
          <Box className={cl.logoContainer} component={Link} to="/envelope">
            <img src={Logo} height="60px" width="60px" alt="logo"/>
            <Typography variant="h4" className={cl.logoText}>
              Budget
            </Typography>
          </Box>
          <Typography className={cl.userId} variant="h6">
            test
          </Typography>
          <Box className={cl.breadCrumbsContainer}>
            <CustomBreadCrumbs color="black" pathNames={pathNames}/>
          </Box>
          <Box color="primary" className={cl.authContainer}>
            <Button component={Link} to="/sign-in" variant="contained">Login</Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;